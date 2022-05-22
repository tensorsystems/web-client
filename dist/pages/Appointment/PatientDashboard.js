import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import classnames from "classnames";
import { format, isSameDay, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useBottomSheetDispatch } from "../../bottomsheet";
import AccordionItem from "../../components/AccordionItem";
import AllPatientDocuments from "../../components/AllPatientDocuments";
import { FileUploaderComponent, } from "../../components/FileUploaderComponent";
import { HistoryItemComponent } from "../../components/HistoryItemComponent";
import PositiveFindings from "../../components/PositiveFindings";
import { getFileUrl, getPatientAge } from "../../util";
import cn from "classnames";
import ProgressComponent from "../../components/ProgressComponent";
import ProgressVitalSigns from "../../components/ProgressVitalSigns";
import { vitalSignsFragment } from "../../api";
import ReactLoading from "react-loading";
import DiagnosticProcedureComponent from "../../components/DiagnosticProcedureComponent";
import { useLocation } from "react-router-dom";
const GET_DATA = gql `
  query GetData($patientHistoryId: ID!, $patientId: ID!) {
    pastIllnesses(patientHistoryId: $patientHistoryId) {
      id
      title
      description
    }
    pastInjuries(patientHistoryId: $patientHistoryId) {
      id
      description
      injuryDate
    }
    pastHospitalizations(patientHistoryId: $patientHistoryId) {
      id
      reason
      provider
      from
      to
    }
    pastSurgeries(patientHistoryId: $patientHistoryId) {
      id
      description
      surgeryDate
    }
    lifestyles(patientHistoryId: $patientHistoryId) {
      id
      title
      description
      note
    }
    familyIllnesses(patientHistoryId: $patientHistoryId) {
      id
      title
      description
    }
    patientHistory(id: $patientHistoryId) {
      reviewOfSystemsNote
    }
    reviewOfSystems(
      page: { page: 0, size: 1000 }
      filter: { patientHistoryId: $patientHistoryId }
    ) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          systemSymptom {
            id
            title
            system {
              id
              title
            }
          }
          note
        }
      }
    }

    getPatientFiles(patientId: $patientId) {
      id
      contentType
      fileName
      extension
      hash
      size
    }

    getPatientDiagnosticProcedureTitles(patientId: $patientId)
  }
`;
const GET_ALL_PATIENT_PROGRESS = gql `
  query GetAllProgress($appointmentId: ID!, $includeAll: Boolean!) {
    getProgressNotes(appointmentId: $appointmentId) {
      appointments {
        id
        providerName
        checkInTime
        patient {
          id
          firstName
          lastName
        }
        visitType {
          id
          title
        }
        patientChart @include(if: $includeAll) {
          id
          summaryNote
          locked
          diagnoses {
            id
            differential
            location
            categoryCode
            diagnosisCode
            fullCode
            fullDescription
          }

          vitalSigns {
            ...VitalSignsFragment
          }

          medicalPrescriptionOrder {
            id
            medicalPrescriptions {
              id
              medication
              synonym
              sig
              refill
              generic
              substitutionAllowed
              directionToPatient
              prescribedDate
              history
              status
            }
          }

          labOrder {
            id
            labs {
              id
              labTypeTitle
            }
          }

          diagnosticProcedureOrder {
            id
            diagnosticProcedures {
              id
              diagnosticProcedureTypeTitle
            }
          }

          surgicalProcedure {
            id
            surgicalProcedureTypeTitle
          }

          treatment {
            id
            treatmentTypeTitle
          }

          treatmentOrder {
            id
            treatments {
              id
              treatmentTypeTitle
            }
          }

          surgicalOrder {
            id
            surgicalProcedures {
              id
              surgicalProcedureTypeTitle
            }
          }

          referralOrder {
            id
            referrals {
              id
              referredToName
            }
          }

          followUpOrder {
            id
            followUps {
              id
              receptionNote
            }
          }
        }
      }
    }
  }
  ${vitalSignsFragment}
`;
const GET_VITAL_SIGNS_PROGRESS = gql `
  query GetProgression($patientId: ID!) {
    getVitalSignsProgress(patientId: $patientId) {
      appointments {
        id
        patientChart {
          vitalSigns {
            ...VitalSignsFragment
          }
        }
      }
    }
  }
  ${vitalSignsFragment}
`;
const GET_PATIENT_DIAGNOSTIC_PROGRESS = gql `
  query GetPatientDiagnosticProgress(
    $patientId: ID!
    $procedureTypeTitle: String!
  ) {
    getPatientDiagnosticProgress(
      patientId: $patientId
      procedureTypeTitle: $procedureTypeTitle
    ) {
      id
      patientChart {
        diagnosticProcedureOrder {
          diagnosticProcedures {
            id
            generalText
            rightDistanceSubjectiveSph
            leftDistanceSubjectiveSph
            rightDistanceSubjectiveCyl
            leftDistanceSubjectiveCyl
            rightDistanceSubjectiveAxis
            leftDistanceSubjectiveAxis
            rightNearSubjectiveSph
            leftNearSubjectiveSph
            rightNearSubjectiveCyl
            leftNearSubjectiveCyl
            rightNearSubjectiveAxis
            leftNearSubjectiveAxis
            rightDistanceObjectiveSph
            leftDistanceObjectiveSph
            rightDistanceObjectiveCyl
            leftDistanceObjectiveCyl
            rightDistanceObjectiveAxis
            leftDistanceObjectiveAxis
            rightNearObjectiveSph
            leftNearObjectiveSph
            rightNearObjectiveCyl
            leftNearObjectiveCyl
            rightNearObjectiveAxis
            leftNearObjectiveAxis
            rightDistanceFinalSph
            leftDistanceFinalSph
            rightDistanceFinalCyl
            leftDistanceFinalCyl
            rightDistanceFinalAxis
            leftDistanceFinalAxis
            rightNearFinalSph
            leftNearFinalSph
            rightNearFinalCyl
            leftNearFinalCyl
            rightNearFinalAxis
            leftNearFinalAxis
            rightVisualAcuity
            leftVisualAcuity
            farPd
            nearPd
            status
            images {
              id
              size
              hash
              fileName
              extension
              contentType
              createdAt
            }
            documents {
              id
              size
              hash
              fileName
              extension
              contentType
              createdAt
            }
            payments {
              id
              status
            }
            diagnosticProcedureTypeTitle
          }
        }
      }
    }
  }
`;
function useRouterQuery() {
    return new URLSearchParams(useLocation().search);
}
export const PatientDashboard = ({ appointment, onAppointmentReadOnlyClick }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    const [patientOpen, setPatientOpen] = useState(true);
    const bottomSheetDispatch = useBottomSheetDispatch();
    const [historyOpen, setHistoryOpen] = useState(false);
    const [documentsOpen, setDocumentsOpen] = useState(false);
    const [currentFindingsOpen, setCurrentFindingsOpen] = useState(true);
    const query = useRouterQuery();
    const readOnly = query.get("readOnly");
    const [progressType, setProgressType] = useState({
        title: "All",
        type: "ALL",
    });
    const [openedAppointments, setOpenedAppointments] = useState([]);
    const otherDocuments = (_b = (_a = appointment === null || appointment === void 0 ? void 0 : appointment.patient.documents) === null || _a === void 0 ? void 0 : _a.map((e) => {
        var _a, _b;
        return ({
            id: e === null || e === void 0 ? void 0 : e.id,
            fileUrl: getFileUrl({
                baseUrl: process.env.REACT_APP_SERVER_URL,
                fileName: e === null || e === void 0 ? void 0 : e.fileName,
                hash: e === null || e === void 0 ? void 0 : e.hash,
                extension: e === null || e === void 0 ? void 0 : e.extension,
            }),
            name: (_a = e === null || e === void 0 ? void 0 : e.fileName) !== null && _a !== void 0 ? _a : "",
            size: e === null || e === void 0 ? void 0 : e.size,
            createdAt: e === null || e === void 0 ? void 0 : e.createdAt,
            contentType: (_b = e === null || e === void 0 ? void 0 : e.contentType) !== null && _b !== void 0 ? _b : "",
        });
    })) !== null && _b !== void 0 ? _b : [];
    const paperRecordDocument = (appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) ? {
        id: (_c = appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) === null || _c === void 0 ? void 0 : _c.id,
        fileUrl: getFileUrl({
            baseUrl: process.env.REACT_APP_SERVER_URL,
            fileName: (_e = (_d = appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) === null || _d === void 0 ? void 0 : _d.fileName) !== null && _e !== void 0 ? _e : "",
            hash: (_g = (_f = appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) === null || _f === void 0 ? void 0 : _f.hash) !== null && _g !== void 0 ? _g : "",
            extension: (_j = (_h = appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) === null || _h === void 0 ? void 0 : _h.extension) !== null && _j !== void 0 ? _j : "",
        }),
        name: (_l = (_k = appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) === null || _k === void 0 ? void 0 : _k.fileName) !== null && _l !== void 0 ? _l : "",
        size: (_m = appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) === null || _m === void 0 ? void 0 : _m.size,
        createdAt: (_o = appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) === null || _o === void 0 ? void 0 : _o.createdAt,
        contentType: (_q = (_p = appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) === null || _p === void 0 ? void 0 : _p.contentType) !== null && _q !== void 0 ? _q : "",
    }
        : null;
    const progressNotesQuery = useQuery(GET_ALL_PATIENT_PROGRESS, {
        variables: {
            appointmentId: appointment.id,
            includeAll: true,
        },
    });
    const vitalSignsProgressQuery = useLazyQuery(GET_VITAL_SIGNS_PROGRESS);
    const diagnosticProgressQuery = useLazyQuery(GET_PATIENT_DIAGNOSTIC_PROGRESS);
    useEffect(() => {
        if (progressType.type === "VITAL_SIGNS") {
            if (appointment) {
                vitalSignsProgressQuery[0]({
                    variables: {
                        patientId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.id,
                    },
                });
            }
        }
        else if (progressType.type === "DIAGNOSTIC_PROCEDURE") {
            if (appointment) {
                diagnosticProgressQuery[0]({
                    variables: {
                        patientId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.id,
                        procedureTypeTitle: progressType.title,
                    },
                });
            }
        }
    }, [progressType]);
    const { data } = useQuery(GET_DATA, {
        variables: {
            patientHistoryId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.patientHistory.id,
            appointmentId: appointment === null || appointment === void 0 ? void 0 : appointment.id,
            patientId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.id,
        },
    });
    const hasPastIllnesses = (data === null || data === void 0 ? void 0 : data.pastIllnesses) && (data === null || data === void 0 ? void 0 : data.pastIllnesses.length) > 0;
    const hasPastInjuries = (data === null || data === void 0 ? void 0 : data.pastInjuries) && (data === null || data === void 0 ? void 0 : data.pastInjuries.length) > 0;
    const hasPastHospitalizations = (data === null || data === void 0 ? void 0 : data.pastHospitalizations) && (data === null || data === void 0 ? void 0 : data.pastHospitalizations.length) > 0;
    const hasPastSurgeries = (data === null || data === void 0 ? void 0 : data.pastSurgeries) && (data === null || data === void 0 ? void 0 : data.pastSurgeries.length) > 0;
    const hasLifestyles = (data === null || data === void 0 ? void 0 : data.lifestyles) && (data === null || data === void 0 ? void 0 : data.lifestyles.length) > 0;
    const hasFamilyIllnesses = (data === null || data === void 0 ? void 0 : data.familyIllnesses) && (data === null || data === void 0 ? void 0 : data.familyIllnesses.length) > 0;
    const hasHistory = hasPastIllnesses ||
        hasPastInjuries ||
        hasPastHospitalizations ||
        hasPastSurgeries ||
        hasLifestyles ||
        hasFamilyIllnesses;
    useEffect(() => {
        if (hasPastIllnesses) {
            setHistoryOpen(true);
        }
    }, [hasPastIllnesses]);
    const hasDocuments = (appointment === null || appointment === void 0 ? void 0 : appointment.patient.paperRecordDocument) ||
        otherDocuments.length > 0 ||
        ((_r = data === null || data === void 0 ? void 0 : data.getPatientFiles.length) !== null && _r !== void 0 ? _r : 0) > 0;
    useEffect(() => {
        if (hasDocuments) {
            setDocumentsOpen(true);
        }
    }, [hasDocuments]);
    const handleViewAllDocumentClick = () => {
        bottomSheetDispatch({
            type: "show",
            snapPoint: 500,
            children: (_jsx(AllPatientDocuments, { onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
        });
    };
    const handleAppointmentTitleClick = (appointmentId) => {
        if (!openedAppointments.includes(appointmentId.toString())) {
            setOpenedAppointments(openedAppointments.concat(appointmentId.toString()));
        }
    };
    const handleAppointmentClose = (appointmentId) => {
        const itemIdx = openedAppointments.findIndex((e) => e === appointmentId.toString());
        setOpenedAppointments([
            ...openedAppointments.splice(0, itemIdx),
            ...openedAppointments.slice(itemIdx + 1),
        ]);
    };
    const handleOpenFullChart = (appointment) => {
        onAppointmentReadOnlyClick(appointment);
    };
    const creditCompany = (appointment === null || appointment === void 0 ? void 0 : appointment.patient.creditCompany) ? `(${appointment.patient.creditCompany})`
        : ``;
    return (_jsxs("div", Object.assign({ className: "flex space-x-4" }, { children: [_jsxs("div", Object.assign({ className: "flex-1" }, { children: [_jsx(AccordionItem, Object.assign({ title: _jsxs("div", Object.assign({ className: "flex items-center space-x-3" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-gray-600" }, { children: "person_outline" }), void 0),
                                _jsx(AccordionTitle, { children: `${appointment === null || appointment === void 0 ? void 0 : appointment.patient.firstName} ${appointment === null || appointment === void 0 ? void 0 : appointment.patient.lastName}` }, void 0)] }), void 0), open: patientOpen, onHeadingClick: (isOpen) => setPatientOpen(isOpen) }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-3 gap-2" }, { children: [_jsxs("div", { children: [_jsx(DetailLabel, { label: "Visit Type" }, void 0),
                                        _jsx(DetailText, { text: appointment === null || appointment === void 0 ? void 0 : appointment.visitType.title }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Electronic ID" }, void 0),
                                        _jsx(DetailText, { text: appointment === null || appointment === void 0 ? void 0 : appointment.patient.id }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Age" }, void 0),
                                        _jsx(DetailText, { text: appointment && getPatientAge(appointment === null || appointment === void 0 ? void 0 : appointment.patient.dateOfBirth) }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Gender" }, void 0),
                                        _jsx(DetailText, { text: appointment === null || appointment === void 0 ? void 0 : appointment.patient.gender }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Region" }, void 0),
                                        _jsx(DetailText, { text: appointment === null || appointment === void 0 ? void 0 : appointment.patient.region }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Woreda" }, void 0),
                                        _jsx(DetailText, { text: appointment === null || appointment === void 0 ? void 0 : appointment.patient.woreda }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Zone" }, void 0),
                                        _jsx(DetailText, { text: appointment === null || appointment === void 0 ? void 0 : appointment.patient.zone }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Memo" }, void 0),
                                        _jsx(DetailText, { text: appointment === null || appointment === void 0 ? void 0 : appointment.patient.memo }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Provider" }, void 0),
                                        _jsx(DetailText, { text: `Dr. ${appointment === null || appointment === void 0 ? void 0 : appointment.providerName}` }, void 0)] }, void 0),
                                _jsxs("div", { children: [_jsx(DetailLabel, { label: "Credit" }, void 0),
                                        _jsx(DetailText, { text: (appointment === null || appointment === void 0 ? void 0 : appointment.patient.credit) ? `${creditCompany}` : `None`, className: appointment.patient.credit ? "text-red-600" : undefined }, void 0)] }, void 0)] }), void 0) }), void 0),
                    _jsxs("div", Object.assign({ className: "flex space-x-4 mt-4" }, { children: [_jsx(AccordionItem, Object.assign({ title: _jsxs("div", Object.assign({ className: "flex items-center space-x-3" }, { children: [hasHistory && (_jsx("span", { className: "rounded-full w-3 h-3 shadow-lg bg-red-500 flex items-center justify-center animate-pulse" }, void 0)),
                                        _jsx("span", Object.assign({ className: "material-icons text-gray-600" }, { children: "history" }), void 0),
                                        _jsx(AccordionTitle, { children: "History" }, void 0)] }), void 0), open: historyOpen, onHeadingClick: (isOpen) => setHistoryOpen(isOpen), className: "flex-1 flex flex-col" }, { children: _jsx("div", Object.assign({ className: classnames("bg-gray-50", {
                                        "rounded shadow-lg p-5": false,
                                    }) }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-2" }, { children: [_jsx("div", Object.assign({ hidden: !hasPastIllnesses }, { children: _jsx(HistoryItemComponent, { title: "Illnesses", items: data === null || data === void 0 ? void 0 : data.pastIllnesses.map((e) => (Object.assign(Object.assign({}, e), { subTitle: e === null || e === void 0 ? void 0 : e.description }))), isEdit: false, onAdd: () => { }, onUpdate: (item) => { }, onDelete: (id) => { } }, void 0) }), void 0),
                                            _jsx("div", Object.assign({ hidden: !hasPastHospitalizations }, { children: _jsx(HistoryItemComponent, { title: "Hospitalizations", items: data === null || data === void 0 ? void 0 : data.pastHospitalizations.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.reason, subTitle: e === null || e === void 0 ? void 0 : e.provider, subTitle2: (e === null || e === void 0 ? void 0 : e.from) && (e === null || e === void 0 ? void 0 : e.to) && (_jsx("p", Object.assign({ className: "text-gray-500 text-sm" }, { children: `From ${format(parseISO(e === null || e === void 0 ? void 0 : e.from), "dd/MM/yyyy")} to ${format(parseISO(e === null || e === void 0 ? void 0 : e.to), "dd/MM/yyyy")}` }), void 0)) }))), isEdit: false, onAdd: () => { }, onUpdate: (item) => { }, onDelete: () => { } }, void 0) }), void 0),
                                            _jsx("div", Object.assign({ hidden: !hasPastInjuries }, { children: _jsx(HistoryItemComponent, { title: "Injuries", items: data === null || data === void 0 ? void 0 : data.pastInjuries.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.description }))), isEdit: false, onAdd: () => { }, onUpdate: (item) => { }, onDelete: (id) => { } }, void 0) }), void 0),
                                            _jsx("div", Object.assign({ hidden: !hasPastSurgeries }, { children: _jsx(HistoryItemComponent, { title: "Surgeries", items: data === null || data === void 0 ? void 0 : data.pastSurgeries.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.description, subTitle: (e === null || e === void 0 ? void 0 : e.surgeryDate) &&
                                                            format(parseISO(e === null || e === void 0 ? void 0 : e.surgeryDate), "dd/MM/yyyy") }))), isEdit: false, onAdd: () => { }, onUpdate: (item) => { }, onDelete: (id) => { } }, void 0) }), void 0),
                                            _jsx("div", Object.assign({ hidden: !hasFamilyIllnesses }, { children: _jsx(HistoryItemComponent, { title: "Family Illness", items: data === null || data === void 0 ? void 0 : data.familyIllnesses.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.title, subTitle: e === null || e === void 0 ? void 0 : e.description }))), isEdit: false, onAdd: () => { }, onUpdate: (item) => { }, onDelete: (id) => { } }, void 0) }), void 0),
                                            _jsx("div", Object.assign({ hidden: !hasLifestyles }, { children: _jsx(HistoryItemComponent, { title: "Lifestyle", items: data === null || data === void 0 ? void 0 : data.lifestyles.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.title, subTitle: e === null || e === void 0 ? void 0 : e.description, subTitle2: e === null || e === void 0 ? void 0 : e.note }))), isEdit: false, onAdd: () => { }, onUpdate: (item) => { }, onDelete: (id) => { } }, void 0) }), void 0)] }), void 0) }), void 0) }), void 0),
                            _jsx(AccordionItem, Object.assign({ title: _jsxs("div", Object.assign({ className: "flex items-center space-x-3" }, { children: [hasDocuments && (_jsx("span", { className: "rounded-full w-3 h-3 shadow-lg bg-red-500 flex items-center justify-center animate-pulse" }, void 0)),
                                        _jsx("span", Object.assign({ className: "material-icons text-gray-600" }, { children: "description" }), void 0),
                                        _jsx(AccordionTitle, { children: "Documents" }, void 0)] }), void 0), open: documentsOpen, onHeadingClick: (isOpen) => setDocumentsOpen(isOpen), className: "flex-1 flex flex-col" }, { children: _jsxs("div", { children: [paperRecordDocument && (_jsxs("div", Object.assign({ className: "my-1" }, { children: [_jsx("p", Object.assign({ className: "text-lg text-gray-700" }, { children: "Paper Record" }), void 0),
                                                _jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx(FileUploaderComponent, { multiSelect: false, values: [paperRecordDocument], accept: "document" }, void 0) }), void 0)] }), void 0)),
                                        ((_s = data === null || data === void 0 ? void 0 : data.getPatientFiles.length) !== null && _s !== void 0 ? _s : 0) > 0 && (_jsx("div", { className: "my-1" }, void 0)),
                                        otherDocuments.length > 0 && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "mt-10 text-lg text-gray-700" }, { children: "Other documents" }), void 0),
                                                _jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx(FileUploaderComponent, { multiSelect: false, values: otherDocuments, accept: "document" }, void 0) }), void 0)] }, void 0)),
                                        paperRecordDocument === null && otherDocuments.length === 0 ? (_jsx("p", { children: "Nothing here yet" }, void 0)) : (_jsx("div", { children: false && (_jsxs("div", Object.assign({ className: "mt-4 text-blue-600 flex items-center space-x-1", onClick: () => handleViewAllDocumentClick() }, { children: [_jsx("p", Object.assign({ className: "underline  cursor-pointer" }, { children: "View all documents" }), void 0),
                                                    _jsx("span", Object.assign({ className: "material-icons" }, { children: "arrow_right_alt" }), void 0)] }), void 0)) }, void 0))] }, void 0) }), void 0)] }), void 0),
                    _jsx(AccordionItem, Object.assign({ title: _jsxs("div", Object.assign({ className: "flex items-center space-x-3" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-gray-600" }, { children: "find_in_page" }), void 0),
                                _jsx(AccordionTitle, { children: "Current findings" }, void 0)] }), void 0), className: "mt-4", open: currentFindingsOpen, onHeadingClick: (isOpen) => setCurrentFindingsOpen(isOpen) }, { children: (appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id) && (_jsx(PositiveFindings, { patientChartId: appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id }, void 0)) }), void 0)] }), void 0),
            !readOnly &&
                ((_u = (_t = progressNotesQuery.data) === null || _t === void 0 ? void 0 : _t.getProgressNotes.appointments.length) !== null && _u !== void 0 ? _u : 0) >
                    0 && (_jsx("div", Object.assign({ className: "w-2/5 bg-white shadow-md" }, { children: _jsxs("div", { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-3 rounded-t-md p-3" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-gray-600" }, { children: "timeline" }), void 0),
                                _jsx("div", { children: _jsx(AccordionTitle, { children: "Progress Timeline" }, void 0) }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "bg-white mt-2 px-2" }, { children: _jsxs("div", Object.assign({ className: "w-full flex flex-wrap -m-1" }, { children: [_jsx(ProgressChip, { title: "All", progressType: progressType, setProgressType: () => setProgressType({ title: "All", type: "ALL" }) }, void 0),
                                    _jsx(ProgressChip, { title: "Vital Signs", progressType: progressType, setProgressType: () => setProgressType({
                                            title: "Vital Signs",
                                            type: "VITAL_SIGNS",
                                        }) }, void 0), data === null || data === void 0 ? void 0 : data.getPatientDiagnosticProcedureTitles.map((e) => (_jsx(ProgressChip, { title: e, progressType: progressType, setProgressType: () => setProgressType({
                                            title: e,
                                            type: "DIAGNOSTIC_PROCEDURE",
                                        }) }, e)))] }), void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: progressNotesQuery.loading ? (_jsx("div", Object.assign({ className: "flex items-center justify-center my-4" }, { children: _jsx(ReactLoading, { type: "spinningBubbles", color: "gray", height: 40, width: 40, className: "inline-block" }, void 0) }), void 0)) : ((_w = (_v = progressNotesQuery.data) === null || _v === void 0 ? void 0 : _v.getProgressNotes) === null || _w === void 0 ? void 0 : _w.appointments.map((e) => {
                                var _a, _b;
                                return (_jsx("div", { children: e ? (_jsx(ProgressContainer, Object.assign({ appointment: e, onAppointmentClose: handleAppointmentClose, onAppointmentTitleClick: handleAppointmentTitleClick, onOpenFullChart: handleOpenFullChart, openPositiveFindings: openedAppointments.includes(e.id.toString()), isToday: (e === null || e === void 0 ? void 0 : e.id) === appointment.id }, { children: progressNotesQuery.loading ||
                                            vitalSignsProgressQuery[1].loading ? (_jsx("div", Object.assign({ className: "flex items-center justify-center my-4" }, { children: _jsx(ReactLoading, { type: "spinningBubbles", color: "gray", height: 40, width: 40, className: "inline-block" }, void 0) }), void 0)) : (_jsxs("div", { children: [progressType.type === "ALL" && (_jsx(Progress, { appointment: e, progressType: progressType }, void 0)),
                                                progressType.type === "VITAL_SIGNS" && (_jsx(Progress, { appointment: (_a = vitalSignsProgressQuery[1].data) === null || _a === void 0 ? void 0 : _a.getVitalSignsProgress.appointments.find((v) => { var _a, _b; return ((_a = v === null || v === void 0 ? void 0 : v.id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = e.id) === null || _b === void 0 ? void 0 : _b.toString()); }), progressType: progressType }, void 0)),
                                                progressType.type ===
                                                    "DIAGNOSTIC_PROCEDURE" && (_jsx(Progress, { appointment: (_b = diagnosticProgressQuery[1].data) === null || _b === void 0 ? void 0 : _b.getPatientDiagnosticProgress.find((d) => (d === null || d === void 0 ? void 0 : d.id.toString()) === e.id.toString()), progressType: progressType }, void 0))] }, void 0)) }), e === null || e === void 0 ? void 0 : e.id)) : (_jsx("div", {}, void 0)) }, e === null || e === void 0 ? void 0 : e.id));
                            })) }), void 0)] }, void 0) }), void 0))] }), void 0));
};
const ProgressContainer = ({ isToday, appointment, openPositiveFindings, onAppointmentTitleClick, onAppointmentClose, onOpenFullChart, children, }) => {
    const getVisitTypeTitle = (appointment) => {
        if (appointment.visitType.title === "Surgery") {
            return `${appointment.patientChart.surgicalProcedure.surgicalProcedureTypeTitle} Surgery`;
        }
        else if (appointment.visitType.title === "Treatment") {
            return `${appointment.patientChart.treatment.treatmentTypeTitle} Treatment`;
        }
        else {
            return appointment.visitType.title;
        }
    };
    const sameDay = isSameDay(new Date(), parseISO(appointment.checkInTime.split("T")[0]));
    return (_jsxs("div", Object.assign({ className: "rounded-lg shadow-xl bg-gray-50" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center space-x-2 bg-gray-100 p-4" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-sm" }, { children: sameDay
                                    ? "Today"
                                    : format(parseISO(appointment.checkInTime.split("T")[0]), "MMM d, y") }), void 0),
                            _jsxs("div", Object.assign({ className: "flex space-x-1 cursor-pointer", onClick: () => {
                                    if (openPositiveFindings) {
                                        onAppointmentClose(appointment.id);
                                    }
                                    else {
                                        onAppointmentTitleClick(appointment.id);
                                    }
                                } }, { children: [_jsx("p", Object.assign({ className: "material-icons md-18 text-teal-800" }, { children: openPositiveFindings ? "close_fullscreen" : "aspect_ratio" }), void 0),
                                    _jsx("p", Object.assign({ className: "text-sm underline text-teal-600" }, { children: openPositiveFindings ? "Close" : "Expand" }), void 0)] }), void 0)] }, void 0),
                    _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-sm text-right" }, { children: getVisitTypeTitle(appointment) }), void 0),
                            _jsx("p", Object.assign({ className: "text-sm text-teal-600 text-right" }, { children: `Dr. ${appointment.providerName}` }), void 0)] }, void 0)] }), void 0),
            openPositiveFindings ? (_jsxs("div", Object.assign({ className: "shadow-lg p-4 bg-teal-50" }, { children: [_jsx(PositiveFindings, { patientChartId: appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id }, void 0),
                    _jsx("div", Object.assign({ className: "flex mt-4" }, { children: _jsxs("button", Object.assign({ type: "button", onClick: () => onOpenFullChart(appointment), className: "flex space-x-1 items-center text-blue-600 text-sm transform hover:scale-105" }, { children: [_jsx("p", Object.assign({ className: "material-icons" }, { children: "open_in_new" }), void 0),
                                _jsx("p", Object.assign({ className: "underline" }, { children: "Open full chart" }), void 0)] }), void 0) }), void 0)] }), void 0)) : (_jsx("div", Object.assign({ className: "py-1 px-4" }, { children: children }), void 0))] }), void 0));
};
const Progress = ({ appointment, progressType }) => {
    var _a, _b, _c;
    if (appointment) {
        if (progressType.type === "ALL") {
            return _jsx(ProgressComponent, { patientChart: appointment.patientChart }, void 0);
        }
        else if (progressType.type === "VITAL_SIGNS") {
            return (_jsx(ProgressVitalSigns, { vitalSigns: appointment.patientChart.vitalSigns, showEmpty: true }, void 0));
        }
        else if (progressType.type === "DIAGNOSTIC_PROCEDURE") {
            return (_jsxs("div", { children: [((_b = (_a = appointment.patientChart.diagnosticProcedureOrder) === null || _a === void 0 ? void 0 : _a.diagnosticProcedures.length) !== null && _b !== void 0 ? _b : 0) === 0 && (_jsx("div", Object.assign({ className: "flex justify-center items-center my-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-1 text-gray-400" }, { children: [_jsx("span", Object.assign({ className: "material-icons" }, { children: "hourglass_empty" }), void 0),
                                _jsx("p", { children: "Empty" }, void 0)] }), void 0) }), void 0)), (_c = appointment.patientChart.diagnosticProcedureOrder) === null || _c === void 0 ? void 0 : _c.diagnosticProcedures.map((e) => (_jsx("div", Object.assign({ className: "mt-3" }, { children: _jsx(DiagnosticProcedureComponent, { readOnly: true, values: e, onRefersh: () => { } }, void 0) }), void 0)))] }, void 0));
        }
    }
    return _jsx("div", {}, void 0);
};
const ProgressChip = ({ title, progressType, setProgressType }) => {
    return (_jsx("button", Object.assign({ onClick: () => setProgressType({
            title: "Vital Signs",
            type: "VITAL_SIGNS",
        }), className: cn("items-center rounded-full m-1 transform hover:scale-105 px-4 py-1 shadow-lg tracking-wide", {
            "bg-gradient-to-r from-teal-500 to-teal-600 text-teal-200": progressType.title === title,
            "bg-gray-50 text-teal-600": progressType.title !== title,
        }) }, { children: _jsx("p", Object.assign({ className: "text-xs font-semibold" }, { children: title.toUpperCase() }), void 0) }), void 0));
};
const AccordionTitle = ({ children }) => {
    return _jsx("p", Object.assign({ className: "text-lg text-gray-700" }, { children: children }), void 0);
};
const DetailLabel = ({ label }) => {
    return _jsx("p", Object.assign({ className: "font-semibold text-gray-700" }, { children: label }), void 0);
};
const DetailText = ({ text, className }) => {
    const cn = className ? className : "text-teal-600";
    return _jsx("p", Object.assign({ className: cn }, { children: text }), void 0);
};
