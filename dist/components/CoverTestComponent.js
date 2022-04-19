import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import AutocompleteInput from "./AutocompleteInput";
import { AppointmentContext } from "../_context/AppointmentContext";
export const CoverTestComponent = ({ register, control, setValue, onChange, }) => {
    const { patientChartLocked } = React.useContext(AppointmentContext);
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-y-2 gap-x-4 justify-items-stretch" }, { children: [_jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Cover Test" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightCoverTest", field: "right_cover_test", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftCoverTest", field: "left_cover_test", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Note" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("textarea", { name: "coverTestNote", ref: register, rows: 2, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: onChange }, void 0) }), void 0)] }), void 0));
};
