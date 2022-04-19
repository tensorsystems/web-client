import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { AppointmentContext } from "../_context/AppointmentContext";
export const VisualAcuityForm = ({ register, onChange }) => {
    const { patientChartLocked } = React.useContext(AppointmentContext);
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-y-4 gap-x-6 justify-items-stretch" }, { children: [_jsx("div", Object.assign({ className: "text-sm text-gray-400 tracking-wider justify-self-center" }, { children: "Distance" }), void 0),
            _jsx("div", {}, void 0),
            _jsx("div", {}, void 0),
            _jsx("div", {}, void 0),
            _jsx("div", {}, void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Uncorrected" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightDistanceUncorrected", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftDistanceUncorrected", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Pinhole" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightDistancePinhole", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftDistancePinhole", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Corrected" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightDistanceCorrected", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftDistanceCorrected", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "text-sm text-gray-400 tracking-wider justify-self-center" }, { children: "Near" }), void 0),
            _jsx("div", {}, void 0),
            _jsx("div", {}, void 0),
            _jsx("div", {}, void 0),
            _jsx("div", {}, void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Uncorrected" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightNearUncorrected", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftNearUncorrected", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Pinhole" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightNearPinhole", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftNearPinhole", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Corrected" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "rightNearCorrected", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "leftNearCorrected", ref: register, disabled: patientChartLocked[0], className: "border-gray-300 rounded-lg shadow-sm w-full h-9", onChange: onChange }, void 0) }), void 0)] }), void 0));
};
