import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import corneaImage from "../../img/cornea.png";
import { SketchTool } from "../SketchTool";
import AutocompleteInput from "../AutocompleteInput";
import { AppointmentContext } from "../../_context/AppointmentContext";
import { SketchDiagram } from "../SketchDiagram";
import { SketchField, Tools } from "react-sketch2";
import "./index.css";
export const SlitLampExamComponent = ({ register, control, setValue, rightCorneaSketchRef, leftCorneaSketchRef, rightLensSketchRef, leftLensSketchRef, rightCorneaSketch, leftCorneaSketch, rightLensSketch, leftLensSketch, onSketchChange, onChange, }) => {
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [selectedLineWeight, setSelectedLineWeight] = useState(3);
    const [showSketchTool, setShowSketchTool] = useState(false);
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-y-2 gap-x-4 justify-items-stretch" }, { children: [_jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Conjuctiva" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightConjunctiva", field: "right_conjunctiva", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftConjunctiva", field: "left_conjunctiva", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "col-span-1 justify-items-stretch text-center" }, { children: [_jsx("button", Object.assign({ type: "button", className: "material-icons text-teal-700", onClick: () => setShowSketchTool(!showSketchTool) }, { children: "settings" }), void 0),
                    _jsx("div", Object.assign({ className: "relative z-20", hidden: !showSketchTool }, { children: _jsx("div", Object.assign({ className: "absolute right-0" }, { children: _jsx(SketchTool, { selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, onColorChange: setSelectedColor, onLineWeightChange: setSelectedLineWeight }, void 0) }), void 0) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx(SketchDiagram, { alt: "Right Cornea", refValue: rightCorneaSketchRef, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "18em", height: "11rem", image: corneaImage, imageClassname: "w-64 h-48", value: rightCorneaSketch, readOnly: patientChartLocked[0], onChange: () => !patientChartLocked[0] && onSketchChange() }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx(SketchDiagram, { alt: "Left Cornea", refValue: leftCorneaSketchRef, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "18em", height: "11rem", image: corneaImage, imageClassname: "w-64 h-48", value: leftCorneaSketch, readOnly: patientChartLocked[0], onChange: () => !patientChartLocked[0] && onSketchChange() }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", { className: "text-gray-600 tracking-wide" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                        setValue("rightCorneaSketch", "");
                        rightCorneaSketchRef.current.clear();
                        onSketchChange();
                    } }, { children: "Clear" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                        setValue("leftCorneaSketch", "");
                        leftCorneaSketchRef.current.clear();
                        onSketchChange();
                    } }, { children: "Clear" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Cornea" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightCornea", field: "right_cornea", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftCornea", field: "left_cornea", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Sclera" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightSclera", field: "right_sclera", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftSclera", field: "left_sclera", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Anterior Chamber" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightAnteriorChamber", field: "right_anterior_chamber", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftAnteriorChamber", field: "left_anterior_chamber", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Iris" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightIris", field: "right_iris", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftIris", field: "left_iris", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: [_jsx("button", Object.assign({ type: "button", className: "material-icons text-teal-700", onClick: () => setShowSketchTool(!showSketchTool) }, { children: "settings" }), void 0),
                    _jsx("div", Object.assign({ className: "relative z-20", hidden: !showSketchTool }, { children: _jsx("div", Object.assign({ className: "absolute right-0" }, { children: _jsx(SketchTool, { selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, onColorChange: setSelectedColor, onLineWeightChange: setSelectedLineWeight }, void 0) }), void 0) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("div", Object.assign({ className: "outer-circle" }, { children: _jsx("div", Object.assign({ className: "inner-circle" }, { children: _jsx(SketchField, { ref: rightLensSketchRef, width: "150px", height: "150px", className: "sketch-field", tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: rightLensSketch, disabled: patientChartLocked[0], onChange: () => !patientChartLocked[0] && onSketchChange() }, void 0) }), void 0) }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("div", Object.assign({ className: "outer-circle" }, { children: _jsx("div", Object.assign({ className: "inner-circle" }, { children: _jsx(SketchField, { ref: leftLensSketchRef, width: "150px", height: "150px", className: "sketch-field", tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: leftLensSketch, disabled: patientChartLocked[0], onChange: () => !patientChartLocked[0] && onSketchChange() }, void 0) }), void 0) }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", { className: "text-gray-600 tracking-wide" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                        setValue("rightLensSketch", "");
                        rightLensSketchRef.current.clear();
                        onSketchChange();
                    } }, { children: "Clear" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-center" }, { children: _jsx("button", Object.assign({ className: "text-gray-500 text-sm", onClick: () => {
                        setValue("leftLensSketch", "");
                        leftLensSketchRef.current.clear();
                        onSketchChange();
                    } }, { children: "Clear" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Lens" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightLens", field: "right_lens", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftLens", field: "left_lens", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Vitreos" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "rightVitreos", field: "right_vitreos", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx(AutocompleteInput, { type: "text", name: "leftVitreos", field: "left_vitreos", uri: "postgres.public.opthalmology_exams", register: register, control: control, setFormValue: setValue, disabled: patientChartLocked[0], onInputChange: onChange }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-500 tracking-wide" }, { children: "Note" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("textarea", { name: "slitLampExamNote", ref: register, rows: 2, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: onChange }, void 0) }), void 0)] }), void 0));
};
