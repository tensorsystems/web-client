import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ChiefComplaints } from "./ChiefComplaintsPage";
import { HistoryPage } from "./HistoryPage";
import { PatientDashboard } from "./PatientDashboard";
import OphthalmologyVitalSigns from "./OphthalmologyVitalSigns";
import { SideNav } from "./SideNav";
import OphthalmologyExamination from "./OphthalmologyExamination";
import { DiagnosisPage } from "./DiagnosisPage";
import { DifferentialDiagnosisPage } from "./DifferentialDiagnosisPage";
import { LabPage } from "./LabPage";
import { PrescriptionPage } from "./PrescriptionPage";
import { Route, Switch, useHistory, useLocation, useRouteMatch, } from "react-router-dom";
import { SurgeryPage } from "./SurgeryPage";
import { PreOpPage } from "./PreOpPage";
import { IntraOpPage } from "./IntraOpPage";
import { TreatmentPlanPage } from "./TreatmentPlanPage";
import { TreatmentObjectivePage } from "./TreatmentObjectivePage";
import { SummaryPage } from "./SummaryPage";
import { MedicationAllergiesPage } from "./MedicationAllergiesPage";
import { Stickie } from "../../components/StickieComponent";
import { VisionSideInfo } from "../../components/VisionSideInfo";
import { IopSideInfo } from "../../components/IopSideInfo";
import { MedicationSideInfo } from "../../components/MedicationSideInfo";
import { ReferralPage } from "./ReferralPage";
import ReactLoading from "react-loading";
import { Destination, } from "../../models/models";
import { parseJwt } from "../../util";
import { FollowUpPage } from "./FollowUpPage";
import { PreanestheticPage } from "./PreanestheticPage";
import Modal from "../../components/Modal";
import { useNotificationDispatch } from "../../notification";
import { AppointmentContext } from "../../_context/AppointmentContext";
import { MedicalCertificatePage } from "./MedicalCertificatePage";
import ReviewOfSystemsPage from "./ReviewOfSystemsPage";
import GeneralVitalSigns from "./GeneralVitalSigns";
import GeneralExamination from "./GeneralExamination";
import { useForm } from "react-hook-form";
import DiagnosticProcedurePage from "./DiagnosticProcedurePage";
import { format, parseISO } from "date-fns";
export const GET_APPOINTMENT = gql `
  query GetAppointment($id: ID!) {
    appointment(id: $id) {
      id
      checkedInTime
      emergency
      medicalDepartment
      queueId
      patient {
        id
        firstName
        lastName
        gender
        dateOfBirth
        city
        memo
        credit
        creditCompany
        woreda
        zone
        subCity
        region
        patientHistory {
          id
          reviewOfSystemsNote
        }
        paperRecordDocument {
          id
          contentType
          fileName
          extension
          hash
          size
        }
        documents {
          id
          contentType
          fileName
          extension
          hash
          size
        }
      }
      patientChart {
        id
        diagnosisNote
        differentialDiagnosisNote
        chiefComplaintsNote
        stickieNote
        summaryNote
        rightSummarySketch
        leftSummarySketch
        medicalRecommendation
        sickLeave
        bloodPressure
        locked
        lockedDate
        lockedById
        amendments {
          id
          note
          createdAt
        }
      }
      providerName
      visitType {
        id
        title
      }
      room {
        title
      }
      appointmentStatus {
        title
      }
      providerName
    }
  }
`;
const LOCK_PATIENT_CHART = gql `
  mutation LockPatientChart($id: ID!) {
    lockPatientChart(id: $id) {
      id
    }
  }
`;
const PUSH_PATIENT_QUEUE = gql `
  mutation PushPatientQueue(
    $patientQueueId: ID!
    $appointmentId: ID!
    $destination: Destination!
  ) {
    pushPatientQueue(
      patientQueueId: $patientQueueId
      appointmentId: $appointmentId
      destination: $destination
    ) {
      id
    }
  }
`;
const DELETE_FROM_QUEUE = gql `
  mutation DeleteFromQueue($patientQueueId: ID!, $appointmentId: ID!) {
    deleteFromQueue(
      patientQueueId: $patientQueueId
      appointmentId: $appointmentId
    ) {
      id
    }
  }
`;
const CHECK_OUT_PATIENT = gql `
  mutation CheckOutPatient($patientQueueId: ID!, $appointmentId: ID!) {
    checkOutPatient(
      patientQueueId: $patientQueueId
      appointmentId: $appointmentId
    ) {
      id
    }
  }
`;
function useRouterQuery() {
    return new URLSearchParams(useLocation().search);
}
export const AppointmentDetails = ({ appointmentId, onUpdateTab, onAddPage, onTabClose }) => {
    var _a;
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const query = useRouterQuery();
    const queryQueueId = query.get("queueId");
    const notifDispatch = useNotificationDispatch();
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(new Date());
    const [showRightBar, setShowRightBar] = useState(true);
    const [isReceptionist, setIsReceptionist] = useState(false);
    const [isNurse, setIsNurse] = useState(false);
    const [isPhysician, setIsPhysician] = useState(false);
    const [showQueueModel, setShowQueueModal] = useState(false);
    const [soapType, setSoapType] = useState("regular");
    const [showExampleAlert] = useState(false);
    const [userType, setUserType] = useState("");
    const [lockPatientChart, setLockPatientChart] = useState({
        openConfirmationDialog: false,
        confirmation: false,
    });
    const [progressTimelineOpen, setProgressTimelineOpen] = useState(false);
    const queueForm = useForm({
        defaultValues: {
            queue: "REMOVE_FROM_QUEUE",
        },
    });
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { data, refetch } = useQuery(GET_APPOINTMENT, {
        variables: { id: appointmentId },
        onCompleted(data) { },
    });
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        const claim = parseJwt(token);
        if (claim.UserType.includes("Receptionist")) {
            setIsReceptionist(true);
        }
        if (claim.UserType.includes("Nurse")) {
            setIsNurse(true);
        }
        if (claim.UserType.includes("Physician")) {
            setIsPhysician(true);
        }
    }, []);
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token !== null) {
            const claim = parseJwt(token);
            setUserType(claim.UserType);
        }
    }, []);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (location.pathname.length > 0) {
            const split = location.pathname.split("/");
            const path = split[split.length - 1];
            if (path === "patient-dashboard") {
                setShowRightBar(true);
            }
            else {
                setShowRightBar(false);
            }
        }
    }, [location.pathname]);
    useEffect(() => {
        if ((data === null || data === void 0 ? void 0 : data.appointment.visitType.title) === "Surgery") {
            setSoapType("surgical");
        }
        else if ((data === null || data === void 0 ? void 0 : data.appointment.visitType.title) === "Treatment") {
            setSoapType("treatment");
        }
        else {
            setSoapType("regular");
        }
    }, [data]);
    useEffect(() => {
        const patientChartId = data === null || data === void 0 ? void 0 : data.appointment.patientChart.id;
        if (patientChartId && lockPatientChart.confirmation) {
            lockPatientChartMutation({ variables: { id: patientChartId } });
        }
    }, [data === null || data === void 0 ? void 0 : data.appointment.patientChart, lockPatientChart]);
    useEffect(() => {
        var _a;
        if (data === null || data === void 0 ? void 0 : data.appointment.patientChart) {
            const locked = (_a = data === null || data === void 0 ? void 0 : data.appointment.patientChart.locked) !== null && _a !== void 0 ? _a : false;
            patientChartLocked[1](locked);
        }
    }, [data === null || data === void 0 ? void 0 : data.appointment.patientChart]);
    useEffect(() => {
    }, [data]);
    const [lockPatientChartMutation] = useMutation(LOCK_PATIENT_CHART, {
        onCompleted(data) {
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
    const [pushPatientQueue] = useMutation(PUSH_PATIENT_QUEUE, {
        onCompleted(data) {
            let route = `/appointments/${appointmentId}/patient-dashboard`;
            if (queryQueueId != null) {
                route = route + `?queueId=${queryQueueId}`;
            }
            setShowQueueModal(false);
            onTabClose(route);
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
    const [removeFromQueue] = useMutation(DELETE_FROM_QUEUE, {
        onCompleted() {
            let route = `/appointments/${appointmentId}/patient-dashboard`;
            if (queryQueueId != null) {
                route = route + `?queueId=${queryQueueId}`;
            }
            setShowQueueModal(false);
            onTabClose(route);
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
    const [checkOutPatient] = useMutation(CHECK_OUT_PATIENT, {
        onCompleted(data) {
            let route = `/appointments/${appointmentId}/patient-dashboard`;
            if (queryQueueId != null) {
                route = route + `?queueId=${queryQueueId}`;
            }
            setShowQueueModal(false);
            onTabClose(route);
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
    const handleSaveChange = (saving) => {
        if (saving) {
            setIsSaving(true);
        }
        else {
            setIsSaving(false);
            setLastSaved(new Date());
        }
    };
    const handleAppointmentClick = (appointment, readOnly) => {
        const checkInTime = format(parseISO(appointment.checkInTime.split("T")[0]), "MMM d, y");
        let route = `/appointments/${appointment.id}/patient-dashboard`;
        if (readOnly) {
            route = route + `?readOnly=true`;
        }
        const page = {
            title: `Appointment ${checkInTime} - ${appointment.patient.firstName} ${appointment.patient.lastName}`,
            cancellable: true,
            route: route,
            icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0) }), void 0)),
        };
        onAddPage(page);
        history.push(route);
    };
    const split = location.pathname.split("/");
    const path = split[split.length - 1];
    if ((data === null || data === void 0 ? void 0 : data.appointment) === undefined ||
        data.appointment.patientChart === undefined) {
        return (_jsx("div", Object.assign({ className: "flex justify-center mt-10 h-screen" }, { children: _jsx(ReactLoading, { type: "spinningBubbles", color: "gray", height: 70, width: 70, className: "inline-block" }, void 0) }), void 0));
    }
    return (_jsxs("div", Object.assign({ className: "mt-2" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-5" }, { children: [_jsx("div", Object.assign({ className: "flex-initial" }, { children: _jsxs("div", Object.assign({ className: "sticky", style: { top: "139px" } }, { children: [queryQueueId && (_jsx("div", Object.assign({ className: "bg-white hover:bg-gray-100 shadow-lg rounded-md px-3 py-2 mb-2" }, { children: _jsx("div", Object.assign({ className: "w-full" }, { children: _jsxs("button", Object.assign({ type: "button", className: "flex items-center justify-center space-x-2 rounded-md w-full", onClick: () => setShowQueueModal(true) }, { children: [_jsx("span", Object.assign({ className: "material-icons text-teal-500 animate-pulse" }, { children: "schedule" }), void 0),
                                                _jsx("span", Object.assign({ className: "text-gray-600" }, { children: `${data === null || data === void 0 ? void 0 : data.appointment.patient.firstName} ${data === null || data === void 0 ? void 0 : data.appointment.patient.lastName}` }), void 0)] }), void 0) }), void 0) }), void 0)),
                                _jsx("div", { children: _jsx(SideNav, { soapType: soapType, userType: userType, medicalDepartment: data.appointment.medicalDepartment === "General Medicine"
                                            ? "General Medicine"
                                            : "Ophthalmology", locked: (_a = data === null || data === void 0 ? void 0 : data.appointment.patientChart.locked) !== null && _a !== void 0 ? _a : false }, void 0) }, void 0)] }), void 0) }), void 0),
                    _jsxs("div", Object.assign({ className: "flex-1" }, { children: [showExampleAlert && (_jsxs("div", Object.assign({ className: " bg-yellow-50 border-4 border-yellow-400" }, { children: [_jsx("div", Object.assign({ className: "bg-yellow-400 p-1" }, { children: _jsxs("div", Object.assign({ className: "flex text-sm items-center space-x-2" }, { children: [_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0) }), void 0),
                                                _jsx("span", { children: "Surgical Fitness: This patient is not fit for surgery" }, void 0)] }), void 0) }), void 0),
                                    _jsxs("div", Object.assign({ className: "p-4" }, { children: [_jsx("p", { children: "This patients was designated unfit for surgery during Preanesthetic evaluation" }, void 0),
                                            _jsxs("div", Object.assign({ className: "mt-2 flex space-x-2" }, { children: [_jsx("button", Object.assign({ type: "button", className: "px-4 py-2 bg-green-600 rounded-sm text-white" }, { children: "Accept Recommendation" }), void 0),
                                                    _jsx("button", Object.assign({ type: "button", className: "px-4 py-2 bg-gray-200 rounded-sm" }, { children: "Decline" }), void 0)] }), void 0),
                                            _jsxs("div", Object.assign({ className: "mt-4 flex items-center space-x-5" }, { children: [_jsx("div", { children: "Acknowledge Reason" }, void 0),
                                                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("hr", {}, void 0) }), void 0)] }), void 0),
                                            _jsxs("div", Object.assign({ className: "mt-2 flex space-x-2 text-sm" }, { children: [_jsx("button", Object.assign({ type: "button", className: "px-2 py-1 bg-gray-200 rounded-sm text-gray-700 shadow-sm" }, { children: "Consider at next visit" }), void 0),
                                                    _jsx("button", Object.assign({ type: "button", className: "px-2 py-1 bg-gray-200 rounded-sm text-gray-700 shadow-sm" }, { children: "Consider in 3 months" }), void 0),
                                                    _jsx("button", Object.assign({ type: "button", className: "px-2 py-1 bg-gray-200 rounded-sm text-gray-700 shadow-sm" }, { children: "Not recommended" }), void 0),
                                                    _jsx("button", Object.assign({ type: "button", className: "px-2 py-1 bg-gray-200 rounded-sm text-gray-700 shadow-sm" }, { children: "Other" }), void 0)] }), void 0)] }), void 0)] }), void 0)),
                            _jsxs(Switch, { children: [_jsx(Route, Object.assign({ path: `${match.path}/history` }, { children: (data === null || data === void 0 ? void 0 : data.appointment) && (_jsx(HistoryPage, { appointment: data === null || data === void 0 ? void 0 : data.appointment, onSaveChange: handleSaveChange }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/past-medications-allergies` }, { children: _jsx(MedicationAllergiesPage, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id, patientHistoryId: data === null || data === void 0 ? void 0 : data.appointment.patient.patientHistory.id, patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id }, void 0) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/chief-complaints` }, { children: _jsx(ChiefComplaints, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id, onSaveChange: handleSaveChange }, void 0) }), void 0),
                                    _jsx(Route, Object.assign({ exact: false, path: `${match.path}/ros` }, { children: (data === null || data === void 0 ? void 0 : data.appointment.patient.patientHistory.id) && (_jsx(ReviewOfSystemsPage, { patientHistory: data === null || data === void 0 ? void 0 : data.appointment.patient.patientHistory }, void 0)) }), void 0),
                                    _jsxs(Route, Object.assign({ path: `${match.path}/vital-signs` }, { children: [(data === null || data === void 0 ? void 0 : data.appointment.medicalDepartment) === "Ophthalmology" && (data === null || data === void 0 ? void 0 : data.appointment.patientChart.id) && (_jsx(OphthalmologyVitalSigns, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id, onSaveChange: handleSaveChange }, void 0)),
                                            (data === null || data === void 0 ? void 0 : data.appointment.medicalDepartment) === "General Medicine" && (data === null || data === void 0 ? void 0 : data.appointment.patientChart.id) && (data === null || data === void 0 ? void 0 : data.appointment.patient) && (_jsx(GeneralVitalSigns, { patient: data === null || data === void 0 ? void 0 : data.appointment.patient, patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0))] }), void 0),
                                    _jsxs(Route, Object.assign({ path: `${match.path}/examination` }, { children: [(data === null || data === void 0 ? void 0 : data.appointment.medicalDepartment) === "Ophthalmology" && (data === null || data === void 0 ? void 0 : data.appointment.patientChart.id) && (_jsx(OphthalmologyExamination, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id, onSaveChange: handleSaveChange }, void 0)),
                                            (data === null || data === void 0 ? void 0 : data.appointment.medicalDepartment) === "General Medicine" && (data === null || data === void 0 ? void 0 : data.appointment.patientChart.id) && (_jsx(GeneralExamination, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0))] }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/diagnostics` }, { children: _jsx(DiagnosticProcedurePage, { patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id, patientChart: data === null || data === void 0 ? void 0 : data.appointment.patientChart, appointmentId: data === null || data === void 0 ? void 0 : data.appointment.id, medicalDepartment: data === null || data === void 0 ? void 0 : data.appointment.medicalDepartment }, void 0) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/labratory` }, { children: (data === null || data === void 0 ? void 0 : data.appointment.patientChart) && (_jsx(LabPage, { patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id, patientChart: data === null || data === void 0 ? void 0 : data.appointment.patientChart, appointmentId: data === null || data === void 0 ? void 0 : data.appointment.id }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/pre-op` }, { children: _jsx(PreOpPage, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/pre-anesthetic` }, { children: (data === null || data === void 0 ? void 0 : data.appointment.patientChart) && (_jsx(PreanestheticPage, { patientChartId: data.appointment.patientChart.id }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/intra-op` }, { children: (data === null || data === void 0 ? void 0 : data.appointment.patientChart) && (_jsx(IntraOpPage, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/tx-objective` }, { children: (data === null || data === void 0 ? void 0 : data.appointment.patientChart) && (_jsx(TreatmentObjectivePage, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/diagnosis` }, { children: _jsx(DiagnosisPage, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id, medicalDepartment: data === null || data === void 0 ? void 0 : data.appointment.medicalDepartment, onSaveChange: handleSaveChange }, void 0) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/differential-diagnosis` }, { children: _jsx(DifferentialDiagnosisPage, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id, medicalDepartment: data === null || data === void 0 ? void 0 : data.appointment.medicalDepartment, onSaveChange: handleSaveChange }, void 0) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/surgery` }, { children: (data === null || data === void 0 ? void 0 : data.appointment.patient.id) && (_jsx(SurgeryPage, { patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id, patientChart: data === null || data === void 0 ? void 0 : data.appointment.patientChart, appointmentId: data === null || data === void 0 ? void 0 : data.appointment.id }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/tx-plan` }, { children: (data === null || data === void 0 ? void 0 : data.appointment.patient.id) && (_jsx(TreatmentPlanPage, { patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id, patientChart: data === null || data === void 0 ? void 0 : data.appointment.patientChart, appointmentId: data === null || data === void 0 ? void 0 : data.appointment.id }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/rx` }, { children: (data === null || data === void 0 ? void 0 : data.appointment.patientChart.id) && (_jsx(PrescriptionPage, { appointmentId: data === null || data === void 0 ? void 0 : data.appointment.id, patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id, patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/follow-up` }, { children: _jsx(FollowUpPage, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id, patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id }, void 0) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/referral` }, { children: _jsx(ReferralPage, { patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id, patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/medical-certificate` }, { children: (data === null || data === void 0 ? void 0 : data.appointment) && (_jsx(MedicalCertificatePage, { appointment: data === null || data === void 0 ? void 0 : data.appointment }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/summary` }, { children: (data === null || data === void 0 ? void 0 : data.appointment) && (_jsx(SummaryPage, { appointment: data === null || data === void 0 ? void 0 : data.appointment }, void 0)) }), void 0),
                                    _jsx(Route, Object.assign({ path: `${match.path}/patient-dashboard` }, { children: _jsx(PatientDashboard, { appointment: data === null || data === void 0 ? void 0 : data.appointment, onAppointmentReadOnlyClick: (appointment) => handleAppointmentClick(appointment, true) }, void 0) }), void 0)] }, void 0)] }), void 0),
                    showRightBar && (_jsx("div", Object.assign({ className: "w-44" }, { children: _jsxs("div", Object.assign({ className: "sticky top-36" }, { children: [_jsx("div", { children: _jsx(Stickie, { stickieNote: data === null || data === void 0 ? void 0 : data.appointment.patientChart.stickieNote, patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0) }, void 0),
                                _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx(VisionSideInfo, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx(IopSideInfo, { patientChartId: data === null || data === void 0 ? void 0 : data.appointment.patientChart.id }, void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx(MedicationSideInfo, { patientId: data === null || data === void 0 ? void 0 : data.appointment.patient.id }, void 0) }), void 0)] }), void 0) }), void 0))] }), void 0),
            _jsx(Modal, { open: lockPatientChart.openConfirmationDialog, title: "Lock patient chart", description: _jsx("p", Object.assign({ className: "text-sm text-gray-500" }, { children: "You are about to lock this patient chart. Do you want to continue?" }), void 0), positive: "Continue", negative: "Cancel", onNegativeClick: () => {
                    setLockPatientChart({
                        openConfirmationDialog: false,
                        confirmation: false,
                    });
                }, onPositiveClick: () => {
                    setLockPatientChart({
                        openConfirmationDialog: false,
                        confirmation: true,
                    });
                }, onClose: () => {
                    setLockPatientChart({
                        openConfirmationDialog: false,
                        confirmation: false,
                    });
                } }, void 0),
            _jsx(Modal, { open: showQueueModel, title: `${data === null || data === void 0 ? void 0 : data.appointment.patient.firstName} ${data === null || data === void 0 ? void 0 : data.appointment.patient.lastName}`, description: _jsxs("div", Object.assign({ className: "mt-5 w-full" }, { children: [_jsx("div", Object.assign({ className: "border border-gray-300 p-2 rounded-md mt-2 w-full" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center w-full" }, { children: [_jsx("input", { type: "radio", name: "queue", value: "REMOVE_FROM_QUEUE", ref: queueForm.register({ required: true }) }, void 0),
                                    _jsx("span", Object.assign({ className: "ml-2" }, { children: "Remove from my queue" }), void 0)] }), void 0) }), void 0),
                        isPhysician && (_jsx("div", Object.assign({ className: "border border-gray-300 p-2 rounded-md mt-2 w-full" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center w-full" }, { children: [_jsx("input", { type: "radio", name: "queue", value: "CHECK_OUT", ref: queueForm.register({ required: true }) }, void 0),
                                    _jsx("span", Object.assign({ className: "ml-2" }, { children: "Check Out" }), void 0)] }), void 0) }), void 0)),
                        !isPhysician && (_jsx("div", Object.assign({ className: "border border-gray-300 p-2 rounded-md mt-2" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "radio", name: "queue", value: "SEND_TO_PHYSICIAN", ref: queueForm.register({ required: true }) }, void 0),
                                    _jsx("span", Object.assign({ className: "ml-2" }, { children: "Send Chart to Physician" }), void 0)] }), void 0) }), void 0))] }), void 0), positive: "Continue", negative: "Cancel", onNegativeClick: () => {
                    setShowQueueModal(false);
                }, onPositiveClick: () => {
                    const values = queueForm.getValues();
                    if (values.queue) {
                        if (values.queue === "SEND_TO_PHYSICIAN" && queryQueueId) {
                            pushPatientQueue({
                                variables: {
                                    patientQueueId: queryQueueId,
                                    appointmentId: appointmentId,
                                    destination: Destination.Physician,
                                },
                            });
                        }
                        else if (values.queue === "REMOVE_FROM_QUEUE" && queryQueueId) {
                            removeFromQueue({
                                variables: {
                                    patientQueueId: queryQueueId,
                                    appointmentId: appointmentId,
                                },
                            });
                        }
                        else if (values.queue === "CHECK_OUT" && queryQueueId) {
                            checkOutPatient({
                                variables: {
                                    patientQueueId: queryQueueId,
                                    appointmentId: appointmentId,
                                },
                            });
                        }
                    }
                }, onClose: () => {
                    setShowQueueModal(false);
                } }, void 0)] }), void 0));
};
const ClinicalDecisionSupport = () => {
    return (_jsxs("div", Object.assign({ className: "shadow overflow-hidden rounded-lg text-sm" }, { children: [_jsx("p", Object.assign({ className: "px-4 py-2 bg-teal-700 text-left text-gray-50 uppercase tracking-wider" }, { children: "CDS" }), void 0),
            _jsx("div", Object.assign({ className: "p-2 bg-white" }, { children: _jsxs("ul", { children: [_jsxs("li", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-10 text-yellow-400" }, { children: _jsx("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }, void 0) }), void 0),
                                _jsx("p", Object.assign({ className: "text" }, { children: "This is a test clinicial decision support system" }), void 0)] }), void 0),
                        _jsxs("li", Object.assign({ className: "flex items-center space-x-2 border-t mt-2" }, { children: [_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-10 text-yellow-400" }, { children: _jsx("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }, void 0) }), void 0),
                                _jsx("p", Object.assign({ className: "text" }, { children: "This is a test clinicial decision support system" }), void 0)] }), void 0)] }, void 0) }), void 0)] }), void 0));
};
const DiagnosisComponent = () => {
    return (_jsx("div", Object.assign({ className: "shadow overflow-hidden rounded-lg text-xs" }, { children: _jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsx("thead", { children: _jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 1, className: "px-3 py-2 bg-teal-700 text-left text-gray-50 uppercase tracking-wider" }, { children: "Diagnosis" }), void 0) }, void 0) }, void 0),
                _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-2" }, { children: _jsx("tr", Object.assign({ className: "text-gray-800" }, { children: _jsx("td", Object.assign({ className: "p-2" }, { children: "ARIC OU" }), void 0) }), void 0) }), void 0)] }), void 0) }), void 0));
};
