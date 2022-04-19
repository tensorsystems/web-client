import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { SketchTool } from "../components/SketchTool";
import AutocompleteInput from "./AutocompleteInput";
import { AppointmentContext } from "../_context/AppointmentContext";
import { SketchField, Tools } from "react-sketch2";
export const FunduscopyComponent = ({ register, control, setValue, rightRetinaSketchRef, leftRetinaSketchRef, rightRetinaSketch, leftRetinaSketch, onSketchChange, onChange, }) => {
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [selectedLineWeight, setSelectedLineWeight] = useState(3);
    const [showSketchTool, setShowSketchTool] = useState(false);
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-y-2 gap-x-4 justify-items-stretch" }, { children: [_jsxs("div", Object.assign({ className: "col-span-1 text-center" }, { children: [_jsx("button", Object.assign({ type: "button", className: "material-icons text-teal-700", onClick: () => setShowSketchTool(!showSketchTool) }, { children: "settings" }), void 0),
                    _jsx("div", Object.assign({ className: "relative z-20", hidden: !showSketchTool }, { children: _jsx("div", Object.assign({ className: "absolute right-0" }, { children: _jsx(SketchTool, { selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, onColorChange: setSelectedColor, onLineWeightChange: setSelectedLineWeight }, void 0) }), void 0) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx(SketchField, { ref: rightRetinaSketchRef, width: "200px", height: "200px", style: {
                        border: "1px solid #7F7F7F",
                        borderRadius: "50%",
                    }, tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: rightRetinaSketch, disabled: patientChartLocked[0], onChange: () => !patientChartLocked[0] && onSketchChange() }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx(SketchField, { ref: leftRetinaSketchRef, width: "200px", height: "200px", style: {
                        border: "1px solid #7F7F7F",
                        borderRadius: "50%",
                    }, tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: leftRetinaSketch, disabled: patientChartLocked[0], onChange: () => !patientChartLocked[0] && onSketchChange() }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", { className: "text-gray-600 tracking-wide" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                        setValue("rightRetinaSketch", "");
                        rightRetinaSketchRef.current.clear();
                        onSketchChange();
                    } }, { children: "Clear" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                        setValue("leftRetinaSketch", "");
                        leftRetinaSketchRef.current.clear();
                        onSketchChange();
                    } }, { children: "Clear" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Retina" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightRetina", field: "right_retina", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftRetina", field: "left_retina", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-500 tracking-wide" }, { children: "Note" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("textarea", { name: "funduscopyNote", ref: register, rows: 2, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: onChange }, void 0) }), void 0)] }), void 0));
};
