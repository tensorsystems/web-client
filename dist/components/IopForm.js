import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { AppointmentContext } from "../_context/AppointmentContext";
export const IopForm = ({ register, onChange }) => {
    const { patientChartLocked } = React.useContext(AppointmentContext);
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-y-4 gap-x-6 justify-items-stretch" }, { children: [_jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Non-Contact" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightNoncontact", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftNoncontact", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Applanation" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightApplanation", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftApplanation", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Tonopen" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightTonopen", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftTonopen", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Digital" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightDigital", ref: register, className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftDigital", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0)] }), void 0));
};
