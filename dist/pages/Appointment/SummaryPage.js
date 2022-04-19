import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef } from "react";
import { Prompt } from "react-router-dom";
import circleImage from "../../img/circle.png";
import { SketchField, Tools } from "react-sketch2";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNotificationDispatch } from "../../notification";
import { AppointmentContext } from "../../_context/AppointmentContext";
import { format, parseISO } from "date-fns";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { AddAmendmentForm } from "../../components/AddAmendmentForm";
import useExitPrompt from "../../useExitPrompt";
import { useReactToPrint } from "react-to-print";
import PrintFileHeader from "../../components/PrintFileHeader";
import HistoryPrintComponent from "../../components/HistoryPrintComponent";
import PositiveFindingsPrint from "../../components/PositiveFindingsPrint";
import { ReviewOfSystemsPrintComponent } from "../../components/ReviewOfSystemsPrintComponent";
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
export const GET_DATA = gql `
  query GetData($filter: AmendmentFilter, $appointmentId: ID!) {
    amendments(filter: $filter) {
      id
      note
      createdAt
    }

    getProgressNotes(appointmentId: $appointmentId) {
      appointments {
        id
        patientChart {
          id
          summaryNote
          locked
        }
      }
    }
  }
`;
export const SummaryPage = ({ appointment }) => {
    var _a;
    const bottomSheetDispatch = useBottomSheetDispatch();
    const printSectionsForm = useForm({
        defaultValues: {
            showHistory: true,
            showChiefComplaints: true,
            showVitalSigns: true,
            showPhysicalExamination: true,
            showDiagnosticProcedures: false,
            showLabratory: false,
            showDiagnosis: true,
            showDifferentialDiagnosis: false,
            showSurgery: false,
            showTreatment: false,
            showPrescriptions: false,
        },
    });
    const { data, refetch } = useQuery(GET_DATA, {
        variables: {
            filter: {
                patientChartId: appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id,
            },
            appointmentId: appointment.id,
        },
    });
    const notifDispatch = useNotificationDispatch();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [showPrintButton, setShowPrintButton] = useState(false);
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const [selectedColor] = useState("#000000");
    const [selectedLineWeight] = useState(3);
    const rightSummarySketch = useRef(null);
    const leftSummarySketch = useRef(null);
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { register, getValues, setValue } = useForm({
        defaultValues: {
            id: appointment.patientChart.id,
            summaryNote: appointment.patientChart.summaryNote,
            leftSummarySketch: appointment.patientChart.leftSummarySketch,
            rightSummarySketch: appointment.patientChart.rightSummarySketch,
        },
    });
    const [updatePatientChart] = useMutation(UPDATE_PATIENT_CHART, {
        onCompleted() {
            setModified(false);
            setShowExitPrompt(false);
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
    const onSave = (data) => {
        updatePatientChart({ variables: { input: data } });
    };
    const handleChanges = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        const data = getValues();
        setTimer(setTimeout(() => {
            if ((appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id) !== undefined) {
                const input = Object.assign(Object.assign({}, data), { id: appointment.patientChart.id });
                onSave(input);
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const handleSketchChange = () => {
        if (patientChartLocked[0]) {
            return;
        }
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            if (appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id) {
                const currentValues = getValues();
                currentValues.id = appointment.patientChart.id;
                if (rightSummarySketch.current !== null) {
                    currentValues.rightSummarySketch = JSON.stringify(rightSummarySketch.current.toJSON());
                }
                if (leftSummarySketch.current !== null) {
                    currentValues.leftSummarySketch = JSON.stringify(leftSummarySketch.current.toJSON());
                }
                onSave(currentValues);
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const { showHistory, showChiefComplaints, showVitalSigns, showPhysicalExamination, showDiagnosticProcedures, showLabratory, showDiagnosis, showDifferentialDiagnosis, showSurgery, showTreatment, showPrescriptions, } = printSectionsForm.watch();
    const lastProgressNote = data === null || data === void 0 ? void 0 : data.getProgressNotes.appointments[(data === null || data === void 0 ? void 0 : data.getProgressNotes.appointments.length) - 1];
    return (_jsx("div", Object.assign({ className: "bg-gray-600" }, { children: _jsxs("div", Object.assign({ className: "w-full p-6" }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
                patientChartLocked[0] && (_jsxs("div", Object.assign({ className: "bg-yellow-50 border-4 border-yellow-400" }, { children: [_jsx("div", Object.assign({ className: "bg-yellow-400 p-1" }, { children: _jsxs("div", Object.assign({ className: "flex text-sm items-center space-x-2" }, { children: [_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0) }), void 0),
                                    _jsx("span", { children: "This patient chart has been locked" }, void 0)] }), void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "p-4" }, { children: _jsx("p", { children: "You may add amendments" }, void 0) }), void 0)] }), void 0)),
                _jsxs("div", Object.assign({ className: "mt-5 bg-white p-4" }, { children: [_jsxs("button", Object.assign({ type: "button", onClick: handlePrint, className: "flex space-x-2 items-center text-gray-600 hover:bg-teal-200 hover:text-teal-600 rounded-md px-4 py-2" }, { children: [_jsx("span", Object.assign({ className: "material-icons " }, { children: "print" }), void 0),
                                _jsx("p", Object.assign({ className: "text-lg font-light" }, { children: "Print" }), void 0)] }), void 0),
                        _jsx("hr", { className: "mt-2" }, void 0),
                        _jsxs("div", Object.assign({ className: " grid grid-cols-3 gap-3 mt-4" }, { children: [_jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showHistory", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "History" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showChiefComplaints", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Chief Complaint" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showVitalSigns", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Vital signs" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showPhysicalExamination", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Physical Examination" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showDiagnosticProcedures", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Diagnostic Procedures" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showLabratory", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Labratory" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showDiagnosis", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Diagnosis" }), void 0)] }), void 0),
                                appointment.visitType.title === "Surgery" && (_jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showSurgery", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Surgery" }), void 0)] }), void 0)),
                                appointment.visitType.title === "Treatment" && (_jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showTreatment", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Treatment" }), void 0)] }), void 0)),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "showPrescriptions", ref: printSectionsForm.register }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Prescriptions" }), void 0)] }), void 0)] }), void 0)] }), void 0),
                (appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id) && (_jsx("div", Object.assign({ className: "mt-5", onMouseEnter: () => setShowPrintButton(true), onMouseLeave: () => setShowPrintButton(false) }, { children: _jsxs("div", Object.assign({ className: "bg-white p-6", ref: componentRef }, { children: [_jsx(PrintFileHeader, { qrUrl: `http://${process.env.REACT_APP_SERVER_URL}/#/appointments/${appointment.id}/patient-dashboard` }, void 0),
                            _jsx("hr", { className: "border border-solid border-teal-500 bg-teal-400 mt-5" }, void 0),
                            _jsx("p", Object.assign({ className: "text-3xl text-gray-700 text-center mt-5" }, { children: "Visit Summary" }), void 0),
                            _jsx("hr", { className: "mt-5" }, void 0),
                            _jsxs("div", Object.assign({ className: "grid grid-rows-3 grid-flow-col mt-2" }, { children: [_jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Patient:" }), void 0), " ", _jsx("span", { children: `${appointment.patient.firstName} ${appointment.patient.lastName}` }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Age:" }), void 0), " ", _jsx("span", { children: appointment &&
                                                    getPatientAge(appointment === null || appointment === void 0 ? void 0 : appointment.patient.dateOfBirth) }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Gender:" }), void 0), " ", _jsx("span", { children: appointment.patient.gender }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Provider:" }), void 0), " ", _jsx("span", { children: `Dr. ${appointment.providerName}` }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Checked-In:" }), void 0), " ", _jsx("span", { children: appointment &&
                                                    format(parseISO(appointment === null || appointment === void 0 ? void 0 : appointment.checkedInTime), "Lo MMMM y") }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Visit:" }), void 0), " ", _jsx("span", { children: appointment.visitType.title }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Electronic ID:" }), void 0), " ", _jsx("span", { children: appointment.patient.id }, void 0)] }, void 0)] }), void 0),
                            _jsx("hr", { className: "mt-2" }, void 0),
                            showHistory && (_jsx("div", Object.assign({ className: "mt-5" }, { children: appointment.patient.patientHistory.id && (_jsx(HistoryPrintComponent, { patientHistoryId: appointment.patient.patientHistory.id }, void 0)) }), void 0)),
                            showHistory && (_jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx(ReviewOfSystemsPrintComponent, { patientHistoryId: appointment.patient.patientHistory.id }, void 0) }), void 0)),
                            _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx(PositiveFindingsPrint, { patientChartId: appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id, showHistory: showHistory, showChiefComplaints: showChiefComplaints, showVitalSigns: showVitalSigns, showPhysicalExamination: showPhysicalExamination, showDiagnosticProcedures: showDiagnosticProcedures, showLabratory: showLabratory, showDiagnosis: showDiagnosis, showDifferentialDiagnosis: showDifferentialDiagnosis, showSurgery: showSurgery, showTreatment: showTreatment, showPrescriptions: showPrescriptions }, void 0) }), void 0),
                            _jsxs("div", Object.assign({ className: "mt-5" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                                    _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Summary Notes" }), void 0),
                                            _jsx("hr", { className: "my-5" }, void 0),
                                            appointment.medicalDepartment === "Ophthalmology" && (_jsx("div", Object.assign({ className: "mt-2" }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-2 justify-items-center mt-10" }, { children: [_jsx("div", Object.assign({ className: "col-span-1" }, { children: "OD" }), void 0),
                                                        _jsx("div", Object.assign({ className: "col-span-1" }, { children: "OS" }), void 0),
                                                        _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("div", Object.assign({ className: "relative" }, { children: [_jsx("div", Object.assign({ className: "static top-0 left-0" }, { children: _jsx("img", { className: "w-60 h-52", src: circleImage, alt: "Right Retina" }, void 0) }), void 0),
                                                                    _jsx("div", Object.assign({ className: "absolute top-0 left-0" }, { children: _jsx(SketchField, { ref: rightSummarySketch, tool: Tools.Pencil, width: "15rem", height: "13rem", lineColor: selectedColor, lineWidth: selectedLineWeight, value: appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.rightSummarySketch, onChange: handleSketchChange }, void 0) }), void 0)] }), void 0) }), void 0),
                                                        _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("div", Object.assign({ className: "relative" }, { children: [_jsx("div", Object.assign({ className: "static top-0 left-0" }, { children: _jsx("img", { className: "w-60 h-52", src: circleImage, alt: "Right Retina" }, void 0) }), void 0),
                                                                    _jsx("div", Object.assign({ className: "absolute top-0 left-0" }, { children: _jsx(SketchField, { ref: leftSummarySketch, tool: Tools.Pencil, width: "15rem", height: "13rem", lineColor: selectedColor, lineWidth: selectedLineWeight, value: appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.leftSummarySketch, onChange: handleSketchChange }, void 0) }), void 0)] }), void 0) }), void 0),
                                                        _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                                                                    setValue("rightSummarySketch", "");
                                                                    rightSummarySketch.current.clear();
                                                                }, disabled: patientChartLocked[0] }, { children: "Clear" }), void 0) }), void 0),
                                                        _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", disabled: patientChartLocked[0], onClick: () => {
                                                                    setValue("leftSummarySketch", "");
                                                                    leftSummarySketch.current.clear();
                                                                } }, { children: "Clear" }), void 0) }), void 0)] }), void 0) }), void 0)),
                                            _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx("textarea", { rows: 10, ref: register, name: "summaryNote", className: "mt-3 p-4 block w-full sm:text-md bg-gray-100 border border-gray-200 rounded-md", disabled: patientChartLocked[0], onChange: handleChanges }, void 0) }), void 0)] }), void 0)] }), void 0),
                            patientChartLocked[0] && (_jsxs("div", Object.assign({ className: "px-5 py-5 rounded-sm mt-5" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", Object.assign({ className: "text-2xl tracking-wider text-gray-800 font-light" }, { children: "Amendments" }), void 0),
                                            _jsxs("button", Object.assign({ className: "border border-teal-800 text-teal-800 px-3 py-1 rounded-lg flex space-x-1 items-center", onClick: () => {
                                                    bottomSheetDispatch({
                                                        type: "show",
                                                        snapPoint: 0,
                                                        children: (_jsx(AddAmendmentForm, { patientChartId: appointment === null || appointment === void 0 ? void 0 : appointment.patientChart.id, onSuccess: () => {
                                                                refetch();
                                                                notifDispatch({
                                                                    type: "show",
                                                                    notifTitle: "Success",
                                                                    notifSubTitle: "Amendement added",
                                                                    variant: "success",
                                                                });
                                                                bottomSheetDispatch({ type: "hide" });
                                                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                                                    });
                                                } }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                                                    _jsx("p", { children: "Add Amendment" }, void 0)] }), void 0)] }), void 0),
                                    (data === null || data === void 0 ? void 0 : data.amendments.length) === 0 && (_jsx("div", Object.assign({ className: "bg-gray-50 mt-5 h-32 flex rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                                _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)),
                                    ((_a = data === null || data === void 0 ? void 0 : data.amendments.length) !== null && _a !== void 0 ? _a : 0) > 0 && (_jsx("div", Object.assign({ className: "mt-4" }, { children: _jsxs("table", Object.assign({ className: "table-auto divide-y divide-gray-200 mt-4 w-full shadow-lg rounded-lg" }, { children: [_jsx("thead", Object.assign({ className: "bg-teal-700" }, { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Note" }), void 0),
                                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Date" }), void 0)] }, void 0) }), void 0),
                                                _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.amendments.map((e) => (_jsxs("tr", { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.note }), void 0),
                                                            _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: format(parseISO(e === null || e === void 0 ? void 0 : e.createdAt), "MMM d, y") }), void 0)] }, e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), void 0) }), void 0))] }), void 0))] }), void 0) }), void 0)),
                lastProgressNote && lastProgressNote.patientChart.summaryNote && (_jsx("div", Object.assign({ className: "mt-5" }, { children: _jsxs("button", Object.assign({ type: "button", className: "flex space-x-2 items-center text-blue-600 bg-blue-50 p-2 rounded-md shadow-md transform hover:scale-105", onClick: () => {
                            setValue("summaryNote", lastProgressNote.patientChart.summaryNote);
                            handleChanges();
                        } }, { children: [_jsx("span", Object.assign({ className: "material-icons" }, { children: "content_copy" }), void 0),
                            _jsx("p", { children: "Copy Summary From Previous Chart" }, void 0)] }), void 0) }), void 0))] }), void 0) }), void 0));
};
