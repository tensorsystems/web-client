import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { parseJwt } from "../../util";
import { PatientDetailsPage } from "./PatientDetailsPage";
import { PatientsPage } from "./PatientsPage";
export const PatientPage = ({ onUpdateTab, onAddPage }) => {
    const match = useRouteMatch();
    const [userType, setUserType] = useState("");
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token !== null) {
            const claim = parseJwt(token);
            setUserType(claim.UserType);
        }
    }, []);
    return (_jsxs(Switch, { children: [_jsx(Route, Object.assign({ path: `${match.path}/:patientId` }, { children: _jsx(PatientDetails, { userType: userType, onUpdateTab: onUpdateTab, onAddPage: onAddPage }, void 0) }), void 0),
            _jsx(Route, Object.assign({ path: match.path }, { children: _jsx(PatientsPage, { onAddPage: onAddPage }, void 0) }), void 0)] }, void 0));
};
const PatientDetails = ({ onUpdateTab, onAddPage }) => {
    const { patientId } = useParams();
    return (_jsx(PatientDetailsPage, { patientId: patientId, onUpdateTab: onUpdateTab, onAddPage: onAddPage }, void 0));
};
