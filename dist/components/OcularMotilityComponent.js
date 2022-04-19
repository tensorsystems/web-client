import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import AutocompleteInput from "./AutocompleteInput";
import { AppointmentContext } from "../_context/AppointmentContext";
import { OcularMotilityOdDiagram } from "./OcularMotilityDiagram/OcularMotilityOdDiagram";
import { OcularMotilityOsDiagram } from "./OcularMotilityDiagram/OcularMotilityOsDiagram";
export const OcularMotilityComponent = ({ register, control, setValue, values, onChange, }) => {
    const { patientChartLocked } = React.useContext(AppointmentContext);
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-y-2 gap-x-4 justify-items-stretch" }, { children: [_jsx("div", { className: "col-span-1" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-stretch" }, { children: _jsx(OcularMotilityOdDiagram, { register: register, values: values, readOnly: patientChartLocked[0], setValue: setValue, onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-stretch" }, { children: _jsx(OcularMotilityOsDiagram, { register: register, values: values, readOnly: patientChartLocked[0], onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-500 tracking-wide" }, { children: "Distance" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("input", { type: "text", name: "distance", ref: register, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-500 tracking-wide" }, { children: "Near" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("input", { type: "text", name: "near", ref: register, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-500 tracking-wide" }, { children: "Ocular Motility" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightOcularMotility", field: "right_ocular_motility", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftOcularMotility", field: "left_ocular_motility", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-500 tracking-wide" }, { children: "Note" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("textarea", { name: "ocularMotilityNote", ref: register, rows: 2, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: onChange }, void 0) }), void 0)] }), void 0));
};
