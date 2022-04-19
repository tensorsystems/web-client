import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppointmentStatusTable } from "../../components/AppointmentStatusAdminTable";
import { ChiefComplaintTypesTable } from "../../components/ChiefComplaintTypesAdminTable";
import { DiagnosisTable } from "../../components/DiagnosisAdminTable";
import ExamCategoryAdminTable from "../../components/ExamCategoryAdminTable";
import ExamFindingAdminTable from "../../components/ExamFindingAdminTable";
import { LifestyleTypesTable } from "../../components/LifestyleTypeAdminTable";
import { PastIllnessTypesTable } from "../../components/PastIllnessTypeAdminTable";
import { RoomsTable } from "../../components/RoomsAdminTable";
import SystemAdminTable from "../../components/SystemAdminTable";
import SystemSymptomAdminTable from "../../components/SystemSymptomAdminTable";
import { UserTypesTable } from "../../components/UserTypeAdminTable";
import { VisitTypesTable } from "../../components/VisitTypesAdminTable";
export const LookupsAdminPage = () => {
    return (_jsx("div", Object.assign({ className: "flex-grow h-full" }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-4" }, { children: [_jsx("div", Object.assign({ className: "w-full" }, { children: _jsx(RoomsTable, {}, void 0) }), void 0),
                _jsx("div", { children: _jsx(VisitTypesTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(ChiefComplaintTypesTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(DiagnosisTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(AppointmentStatusTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(UserTypesTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(PastIllnessTypesTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(LifestyleTypesTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(SystemAdminTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(SystemSymptomAdminTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(ExamCategoryAdminTable, {}, void 0) }, void 0),
                _jsx("div", { children: _jsx(ExamFindingAdminTable, {}, void 0) }, void 0)] }), void 0) }), void 0));
};
