import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { NavItem } from "../../components/NavItem";
import PatientDiagnosticOrders from "./PatientDiagnosticOrders";
import PatientFollowUpOrders from "./PatientFollowUpOrders";
import PatientLabratoryOrders from "./PatientLabratoryOrders";
import PatientReferralOrders from "./PatientReferralOrders";
import PatientSurgicalOrders from "./PatientSurgicalOrders";
import PatientTreatmentOrders from "./PatientTreatmentOrders";
const GET_COUNT = gql `
  query GetCount($patientId: ID!) {
    getPatientOrderCount(patientId: $patientId) {
      diagnosticProcedureOrders
      labOrders
      treatmentOrders
      surgicalOrders
      referralOrders
      followUpOrders
    }
  }
`;
const PatientOrders = ({ patientId }) => {
    var _a, _b, _c, _d, _e, _f;
    const match = useRouteMatch();
    const { data } = useQuery(GET_COUNT, {
        variables: {
            patientId,
        },
    });
    return (_jsxs("div", Object.assign({ className: "flex" }, { children: [_jsxs("div", Object.assign({ className: "bg-white rounded-lg py-2 px-4 shadow-lg" }, { children: [_jsx(NavItem, { route: "diagnostic-orders", label: "Digranostic procedures", icon: "airline_seat_recline_normal", completed: false, subItem: false, notifs: (_a = data === null || data === void 0 ? void 0 : data.getPatientOrderCount.diagnosticProcedureOrders) !== null && _a !== void 0 ? _a : undefined }, void 0),
                    _jsx(NavItem, { route: "labratory-orders", label: "Labratory", icon: "biotech", completed: false, subItem: false, notifs: (_b = data === null || data === void 0 ? void 0 : data.getPatientOrderCount.labOrders) !== null && _b !== void 0 ? _b : undefined }, void 0),
                    _jsx(NavItem, { route: "surgery-orders", label: "Surgery", icon: "airline_seat_flat", completed: false, subItem: false, notifs: (_c = data === null || data === void 0 ? void 0 : data.getPatientOrderCount.surgicalOrders) !== null && _c !== void 0 ? _c : undefined }, void 0),
                    _jsx(NavItem, { route: "treatment-orders", label: "Treatments", icon: "healing", completed: false, subItem: false, notifs: (_d = data === null || data === void 0 ? void 0 : data.getPatientOrderCount.treatmentOrders) !== null && _d !== void 0 ? _d : undefined }, void 0),
                    _jsx(NavItem, { route: "followup-orders", label: "Follow-Ups", icon: "next_plan", completed: false, subItem: false, notifs: (_e = data === null || data === void 0 ? void 0 : data.getPatientOrderCount.followUpOrders) !== null && _e !== void 0 ? _e : undefined }, void 0),
                    _jsx(NavItem, { route: "referral-orders", label: "Referrals", icon: "send", completed: false, subItem: false, notifs: (_f = data === null || data === void 0 ? void 0 : data.getPatientOrderCount.referralOrders) !== null && _f !== void 0 ? _f : undefined }, void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "px-6 py-1 flex-1" }, { children: _jsxs(Switch, { children: [_jsx(Route, Object.assign({ path: `${match.path}/diagnostic-orders` }, { children: _jsx(PatientDiagnosticOrders, { patientId: patientId }, void 0) }), void 0),
                        _jsx(Route, Object.assign({ path: `${match.path}/labratory-orders` }, { children: _jsx(PatientLabratoryOrders, { patientId: patientId }, void 0) }), void 0),
                        _jsx(Route, Object.assign({ path: `${match.path}/surgery-orders` }, { children: _jsx(PatientSurgicalOrders, { patientId: patientId }, void 0) }), void 0),
                        _jsx(Route, Object.assign({ path: `${match.path}/treatment-orders` }, { children: _jsx(PatientTreatmentOrders, { patientId: patientId }, void 0) }), void 0),
                        _jsx(Route, Object.assign({ path: `${match.path}/followup-orders` }, { children: _jsx(PatientFollowUpOrders, { patientId: patientId }, void 0) }), void 0),
                        _jsx(Route, Object.assign({ path: `${match.path}/referral-orders` }, { children: _jsx(PatientReferralOrders, { patientId: patientId }, void 0) }), void 0),
                        _jsx(Route, Object.assign({ path: `${match.path}` }, { children: _jsx(PatientDiagnosticOrders, { patientId: patientId }, void 0) }), void 0)] }, void 0) }), void 0)] }), void 0));
};
export default PatientOrders;
