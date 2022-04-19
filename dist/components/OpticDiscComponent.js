import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { SketchTool } from "../components/SketchTool";
import AutocompleteInput from "./AutocompleteInput";
import { AppointmentContext } from "../_context/AppointmentContext";
import { SketchField, Tools } from "react-sketch2";
const cdrValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
export const OpticDiscComponent = ({ register, control, setValue, rightOpticDiscSketchRef, leftOpticDiscSketchRef, rightOpticDiscSketch, leftOpticDiscSketch, onSketchChange, onChange, }) => {
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [selectedLineWeight, setSelectedLineWeight] = useState(3);
    const [showSketchTool, setShowSketchTool] = useState(false);
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-y-2 gap-x-4 justify-items-stretch" }, { children: [_jsxs("div", Object.assign({ className: "col-span-1 justify-items-stretch text-center" }, { children: [_jsx("button", Object.assign({ type: "button", className: "material-icons text-teal-700", onClick: () => setShowSketchTool(!showSketchTool) }, { children: "settings" }), void 0),
                    _jsx("div", Object.assign({ className: "relative z-20", hidden: !showSketchTool }, { children: _jsx("div", Object.assign({ className: "absolute right-0" }, { children: _jsx(SketchTool, { selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, onColorChange: setSelectedColor, onLineWeightChange: setSelectedLineWeight }, void 0) }), void 0) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx(SketchField, { ref: rightOpticDiscSketchRef, width: "150px", height: "150px", style: {
                        border: "1px solid #7F7F7F",
                        borderRadius: "50%",
                    }, tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: rightOpticDiscSketch, disabled: patientChartLocked[0], onChange: () => !patientChartLocked[0] && onSketchChange() }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx(SketchField, { ref: leftOpticDiscSketchRef, width: "150px", height: "150px", style: {
                        border: "1px solid #7F7F7F",
                        borderRadius: "50%",
                    }, tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: leftOpticDiscSketch, disabled: patientChartLocked[0], onChange: () => !patientChartLocked[0] && onSketchChange() }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", { className: "text-gray-600 tracking-wide" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                        setValue("rightOpticDiscSketch", "");
                        rightOpticDiscSketchRef.current.clear();
                        onSketchChange();
                    } }, { children: "Clear" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                        setValue("leftOpticDiscSketch", "");
                        leftOpticDiscSketchRef.current.clear();
                        onSketchChange();
                    } }, { children: "Clear" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "CDR" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsxs("select", Object.assign({ name: "rightCdr", ref: register, disabled: patientChartLocked[0], className: "mt-1 block w-full py-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", onChange: onChange }, { children: [_jsx("option", {}, void 0),
                        cdrValues.map((e) => (_jsx("option", Object.assign({ value: e }, { children: e }), e)))] }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsxs("select", Object.assign({ name: "leftCdr", ref: register, disabled: patientChartLocked[0], className: "mt-1 block w-full py-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", onChange: onChange }, { children: [_jsx("option", {}, void 0),
                        cdrValues.map((e) => (_jsx("option", Object.assign({ value: e }, { children: e }), e)))] }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Optic Disc" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightOpticDisc", field: "right_optic_disc", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftOpticDisc", field: "left_optic_disc", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-500 tracking-wide" }, { children: "Note" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("textarea", { name: "opticDiscNote", ref: register, rows: 2, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: onChange }, void 0) }), void 0)] }), void 0));
};
