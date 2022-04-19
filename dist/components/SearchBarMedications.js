import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format, parseISO } from "date-fns";
export default function SearchBarMedications(props) {
    const { medicalPrescriptions } = props;
    return (_jsx("table", Object.assign({ className: "w-full table text-sm border-l border-teal-500" }, { children: _jsx("tbody", Object.assign({ className: "divide-y divide-gray-200" }, { children: medicalPrescriptions === null || medicalPrescriptions === void 0 ? void 0 : medicalPrescriptions.map((e) => (_jsxs("tr", { children: [_jsx("td", Object.assign({ className: "px-4 py-3" }, { children: e === null || e === void 0 ? void 0 : e.medication }), void 0),
                    _jsx("td", Object.assign({ className: "px-4 py-3" }, { children: e === null || e === void 0 ? void 0 : e.sig }), void 0),
                    _jsx("td", Object.assign({ className: "px-4 py-3" }, { children: format(parseISO(e === null || e === void 0 ? void 0 : e.prescribedDate), "MMM d, y") }), void 0)] }, e === null || e === void 0 ? void 0 : e.id))) }), void 0) }), void 0));
}
