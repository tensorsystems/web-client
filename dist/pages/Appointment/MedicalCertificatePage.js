import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";
import PrintFileHeader from "../../components/PrintFileHeader";
import { useReactToPrint } from "react-to-print";
import { gql, useMutation, useQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import useExitPrompt from "../../useExitPrompt";
import _ from "lodash";
import { useNotificationDispatch } from "../../notification";
import { Prompt } from "react-router-dom";
import { getPatientAge } from "../../util";
const AUTO_SAVE_INTERVAL = 1000;
const UPDATE_PATIENT_CHART = gql `
  mutation UpdatePatientChart($input: PatientChartUpdateInput!) {
    updatePatientChart(input: $input) {
      id
      rightSummarySketch
      leftSummarySketch
    }
  }
`;
const GET_DETAILS = gql `
  query GetPatientChart(
    $patientChartId: ID!
    $details: Boolean
    $page: PaginationInput!
    $filter: OrderFilterInput
  ) {
    patientChart(id: $patientChartId, details: $details) {
      id
      diagnosisNote
      stickieNote
      summaryNote
      medicalRecommendation
      sickLeave

      diagnosticProcedureOrder {
        status
        createdAt
        diagnosticProcedures {
          id
          diagnosticProcedureTypeTitle
          diagnosticProcedureType {
            title
          }
        }
      }

      labOrder {
        status
        createdAt
        labs {
          id
          labType {
            id
            title
          }
        }
      }

      diagnoses {
        id
        differential
        location
        categoryCode
        diagnosisCode
        fullCode
        fullDescription
      }
    }

    orders(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          user {
            id
            firstName
            lastName
          }
          firstName
          lastName
          phoneNo
          patientId
          emergency
          note
          status
          orderType
          payments {
            id
            invoiceNo
            status
            billing {
              id
              item
              code
              price
              credit
            }
          }
          createdAt
        }
      }
    }
  }
`;
export const MedicalCertificatePage = ({ appointment }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const notifDispatch = useNotificationDispatch();
    const [showPrintButton, setShowPrintButton] = useState(false);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { register, getValues } = useForm({
        defaultValues: {
            medicalRecommendation: appointment.patientChart.medicalRecommendation,
            sickLeave: appointment.patientChart.sickLeave,
        },
    });
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { data, refetch, error } = useQuery(GET_DETAILS, {
        variables: {
            patientChartId: appointment.patientChart.id,
            details: true,
            page: { page: 0, size: 50 },
            filter: {
                patientChartId: appointment.patientChart.id,
            },
        },
    });
    useEffect(() => {
        refetch();
    }, []);
    const getOrderTypeName = (orderType) => {
        switch (orderType) {
            case "FOLLOW_UP":
                return "Follow-Up";
            case "PATIENT_IN_HOUSE_REFERRAL":
                return "In-House Referral";
            case "PATIENT_OUTSOURCE_REFERRAL":
                return "Outsourced Referral";
            case "TREATMENT":
                return "Treatment";
            case "SURGICAL_PROCEDURE":
                return "Surgery";
            default:
                return "";
        }
    };
    const [updatePatientChart] = useMutation(UPDATE_PATIENT_CHART, {
        onCompleted() {
            setModified(false);
            setShowExitPrompt(false);
            refetch();
        },
        onError(error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const diagnosticProcedures = (_a = data === null || data === void 0 ? void 0 : data.patientChart.diagnosticProcedureOrder) === null || _a === void 0 ? void 0 : _a.diagnosticProcedures.map((e) => e.diagnosticProcedureType.title).join(", ");
    const labs = (_b = data === null || data === void 0 ? void 0 : data.patientChart.labOrder) === null || _b === void 0 ? void 0 : _b.labs.map((e) => e.labType.title.trim()).join(", ");
    const orders = (_c = data === null || data === void 0 ? void 0 : data.orders) === null || _c === void 0 ? void 0 : _c.edges.filter((e) => (e === null || e === void 0 ? void 0 : e.node.orderType) === "TREATMENT" ||
        (e === null || e === void 0 ? void 0 : e.node.orderType) === "SURGICAL_PROCEDURE").map((e) => `${e === null || e === void 0 ? void 0 : e.node.payments.map((p) => p.billing.item).join(", ")} (${getOrderTypeName(e === null || e === void 0 ? void 0 : e.node.orderType)})`).join(", ");
    let treatments = [];
    if ((_d = diagnosticProcedures === null || diagnosticProcedures === void 0 ? void 0 : diagnosticProcedures.length) !== null && _d !== void 0 ? _d : 0 > 0)
        treatments.push(diagnosticProcedures);
    if ((_e = labs === null || labs === void 0 ? void 0 : labs.length) !== null && _e !== void 0 ? _e : 0 > 0)
        treatments.push(labs);
    const handleChanges = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        const data = getValues();
        const isEmpty = _.values(data).every((v) => _.isEmpty(v));
        setTimer(setTimeout(() => {
            if ((appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id) !== undefined && !isEmpty) {
                const input = Object.assign(Object.assign({}, data), { id: appointment.patientChart.id });
                updatePatientChart({ variables: { input } });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    return (_jsx("div", Object.assign({ className: "bg-gray-500 p-4" }, { children: _jsxs("div", Object.assign({ className: "relative mt-5 text-sm", onMouseEnter: () => setShowPrintButton(true), onMouseLeave: () => setShowPrintButton(false) }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
                _jsxs("div", Object.assign({ className: "bg-white p-6 ", ref: componentRef }, { children: [_jsx(PrintFileHeader, { qrUrl: `http://${process.env.REACT_APP_SERVER_URL}/#/appointments/${appointment.id}/patient-dashboard` }, void 0),
                        _jsx("hr", { className: "border border-solid border-teal-500 bg-teal-400 mt-5" }, void 0),
                        _jsx("p", Object.assign({ className: "text-2xl text-gray-700 text-center mt-4" }, { children: "Medical Certificate" }), void 0),
                        _jsx(CertificateDetail, { title: "Patient", body: `${appointment.patient.firstName} ${appointment.patient.firstName}` }, void 0),
                        _jsx(CertificateDetail, { title: "Electronic ID", body: appointment.patient.id }, void 0),
                        _jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx(CertificateDetail, { title: "Age", body: appointment && getPatientAge(appointment === null || appointment === void 0 ? void 0 : appointment.patient.dateOfBirth) }, void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx(CertificateDetail, { title: "Gender", body: appointment.patient.gender }, void 0) }), void 0)] }), void 0),
                        _jsx(CertificateDetail, { title: "Diagnosis", body: (_g = (_f = data === null || data === void 0 ? void 0 : data.patientChart.diagnoses) === null || _f === void 0 ? void 0 : _f.map((e) => `${e === null || e === void 0 ? void 0 : e.fullDescription} ${(e === null || e === void 0 ? void 0 : e.location) && `(${e === null || e === void 0 ? void 0 : e.location})`} `).join(", ")) !== null && _g !== void 0 ? _g : "" }, void 0),
                        _jsx(CertificateDetail, { title: "Treatments/Procedures", body: treatments.join(", ") }, void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-full bg-gray-100 p-2" }, { children: "Recommendation" }), void 0),
                                _jsx("div", Object.assign({ className: "mt-1" }, { children: _jsx("textarea", { name: "medicalRecommendation", ref: register, rows: 2, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-none", onChange: handleChanges, placeholder: "Recommendations" }, void 0) }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-full bg-gray-100 p-2" }, { children: "Sick leave" }), void 0),
                                _jsx("div", Object.assign({ className: "mt-1" }, { children: _jsx("textarea", { name: "sickLeave", ref: register, rows: 1, placeholder: "Sick leave", className: "mt-1 p-1 pl-4 block w-full sm:text-md border-none", onChange: handleChanges }, void 0) }), void 0)] }), void 0),
                        _jsx(CertificateDetail, { title: "Date", body: appointment.checkedInTime &&
                                format(parseISO(appointment.checkedInTime), "MMM d, y") }, void 0),
                        _jsx(CertificateDetail, { title: "Provider", body: `Dr. ${appointment.providerName}` }, void 0)] }), void 0),
                _jsx(Transition.Root, Object.assign({ show: showPrintButton, as: Fragment, enter: "ease-in-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" }, { children: _jsx("div", Object.assign({ className: "absolute top-4 right-5" }, { children: _jsxs("button", Object.assign({ type: "button", className: "text-sm tracking-wide text-teal-800 hover:bg-teal-700 hover:text-white subpixel-antialiased px-5 py-2 rounded-lg flex items-center space-x-2 border", onClick: handlePrint }, { children: [_jsx("span", Object.assign({ className: "material-icons" }, { children: "print" }), void 0),
                                _jsx("div", { children: "Print this" }, void 0)] }), void 0) }), void 0) }), void 0)] }), void 0) }), void 0));
};
const CertificateDetail = ({ title, body, }) => {
    return (_jsxs("div", Object.assign({ className: "mt-3" }, { children: [_jsx("div", Object.assign({ className: "w-full bg-gray-100 p-2" }, { children: title }), void 0),
            _jsx("div", Object.assign({ className: "mt-1 ml-1" }, { children: body }), void 0)] }), void 0));
};
