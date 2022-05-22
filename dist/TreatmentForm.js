import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TreatmentForm = ({ register, locked, handleChange }) => {
    return (_jsxs("div", { children: [_jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "note", className: "block text-sm font-medium text-gray-700" }, { children: "Treatment Note" }), void 0),
                    _jsx("textarea", { name: "note", ref: register, rows: 3, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md", onChange: handleChange }, void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "result", className: "block text-sm font-medium text-gray-700" }, { children: "Result" }), void 0),
                    _jsx("textarea", { name: "result", ref: register, rows: 3, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md", onChange: handleChange }, void 0)] }), void 0)] }, void 0));
};
export default TreatmentForm;
