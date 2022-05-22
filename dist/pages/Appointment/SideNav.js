import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from "react-router-dom";
import { NavItem } from "../../components/NavItem";
export const SideNav = ({ soapType, medicalDepartment, userType, locked, }) => {
    const { search } = useLocation();
    return (_jsxs("div", Object.assign({ className: "bg-white rounded-lg py-2 px-2 shadow-lg" }, { children: [_jsx(NavItem, { route: `patient-dashboard${search}`, label: "Patient Dashboard", icon: "dashboard", subItem: false }, void 0),
            _jsx("hr", { className: "mt-1" }, void 0),
            _jsx(NavItem, { route: "subjective", label: "Subjective", status: locked ? "locked" : "pending_actions", subItem: false, disabled: true }, void 0),
            _jsx(NavItem, { route: `history${search}`, label: "History", icon: "history", subItem: true, status: "locked", disabled: userType === "Receptionist" }, void 0),
            soapType === "regular" && (_jsx(NavItem, { route: `chief-complaints${search}`, label: "Chief Complaints", icon: "format_list_bulleted", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            soapType === "regular" && medicalDepartment === "General Medicine" && (_jsx(NavItem, { route: `ros${search}`, label: "Review of Systems", icon: "accessibility", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            _jsx(NavItem, { route: `past-medications-allergies${search}`, label: "Past Med & Allergies", icon: "local_pharmacy", subItem: true, disabled: userType === "Receptionist" }, void 0),
            _jsx(NavItem, { route: "objective", label: "Objective", status: locked ? "locked" : "pending_actions", subItem: false, disabled: true }, void 0),
            _jsx(NavItem, { route: `vital-signs${search}`, label: "Vital Signs", icon: "show_chart", subItem: true, disabled: userType === "Receptionist" }, void 0),
            soapType === "regular" && (_jsx(NavItem, { route: `examination${search}`, label: "Physical Examination", icon: "find_in_page", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            soapType === "regular" && (_jsx(NavItem, { route: `diagnostics${search}`, label: "Diagnostic Procedure", icon: "airline_seat_recline_normal", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            soapType === "regular" && (_jsx(NavItem, { route: `labratory${search}`, label: "Labratory", icon: "biotech", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            soapType === "surgical" && (_jsx(NavItem, { route: `pre-op${search}`, label: "Pre-Operation", icon: "format_list_numbered", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            soapType === "surgical" && (_jsx(NavItem, { route: `pre-anesthetic${search}`, label: "Preanesthetic Evaluation", icon: "verified", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            soapType === "surgical" && (_jsx(NavItem, { route: `intra-op${search}`, label: "Intra-Operation", icon: "airline_seat_flat", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            soapType === "treatment" && (_jsx(NavItem, { route: `tx-objective${search}`, label: "Treatment", icon: "healing", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            _jsx(NavItem, { route: "assessment", label: "Assessment", status: locked ? "locked" : "pending_actions", subItem: false, disabled: true }, void 0),
            _jsx(NavItem, { route: `diagnosis${search}`, label: "Diagnosis", icon: "fact_check", subItem: true, disabled: userType === "Receptionist" }, void 0),
            _jsx(NavItem, { route: `differential-diagnosis${search}`, label: "Differential Diagnosis", icon: "live_help", subItem: true, disabled: userType === "Receptionist" }, void 0),
            _jsx(NavItem, { route: "plan", label: "Plan", status: locked ? "locked" : "pending_actions", subItem: false, disabled: true }, void 0),
            soapType === "regular" && medicalDepartment === "Ophthalmology" && (_jsx(NavItem, { route: `surgery${search}`, label: "Surgery", icon: "airline_seat_flat", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            soapType === "regular" && (_jsx(NavItem, { route: `tx-plan${search}`, label: "Treatments", icon: "healing", subItem: true, disabled: userType === "Receptionist" }, void 0)),
            _jsx(NavItem, { route: `rx${search}`, label: "eRx", icon: "local_pharmacy", subItem: true, disabled: userType === "Receptionist" }, void 0),
            _jsx(NavItem, { route: `follow-up${search}`, label: "Follow-Ups", icon: "next_plan", subItem: true, disabled: userType === "Receptionist" }, void 0),
            _jsx(NavItem, { route: `referral${search}`, label: "Referral", icon: "send", subItem: true, disabled: userType === "Receptionist" }, void 0),
            _jsx("hr", { className: "mt-1" }, void 0),
            _jsx(NavItem, { route: `medical-certificate${search}`, label: "Medical Certificate", icon: "receipt_long", status: "locked", subItem: false, disabled: userType === "Receptionist" }, void 0),
            _jsx(NavItem, { route: `summary${search}`, label: "Summary", icon: "card_membership", status: "locked", subItem: false, disabled: userType === "Receptionist" }, void 0)] }), void 0));
};
