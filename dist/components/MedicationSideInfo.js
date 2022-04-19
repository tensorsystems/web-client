import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@apollo/client";
import { MEDICATION_PRESCRIPTIONS } from "../api";
export const MedicationSideInfo = ({ patientId }) => {
    const { data } = useQuery(MEDICATION_PRESCRIPTIONS, {
        variables: {
            page: { page: 0, size: 20 },
            filter: { patientId, status: "Active" },
        },
    });
    return (_jsx("div", Object.assign({ className: "shadow overflow-hidden rounded-lg text-xs" }, { children: _jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsx("thead", { children: _jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 1, className: "px-3 py-2 bg-teal-700 text-left text-gray-50 uppercase tracking-wider" }, { children: "Active Medications" }), void 0) }, void 0) }, void 0),
                _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-2" }, { children: data === null || data === void 0 ? void 0 : data.searchMedicalPrescriptions.edges.map((e) => (_jsx("tr", Object.assign({ className: "text-gray-800" }, { children: _jsx("td", Object.assign({ className: "p-2" }, { children: e === null || e === void 0 ? void 0 : e.node.medication }), void 0) }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0) }), void 0));
};
