import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CirclePicker } from "react-color";
export const SketchTool = ({ selectedColor, selectedLineWeight, onColorChange, onLineWeightChange, }) => {
    return (_jsxs("div", Object.assign({ className: "bg-white p-4 shadow-md w-48" }, { children: [_jsx("p", { children: "Color" }, void 0),
            _jsx(CirclePicker, { colors: ["#000000", "#FF0000 ", "#0000FF", "#008000", "#D2691E"], circleSize: 20, color: selectedColor, onChange: (value) => onColorChange(value.hex) }, void 0),
            _jsx("p", Object.assign({ className: "mt-3" }, { children: `Line Weight (${selectedLineWeight})` }), void 0),
            _jsx("input", { value: selectedLineWeight, type: "range", max: 20, onChange: (evt) => onLineWeightChange(evt.target.value) }, void 0)] }), void 0));
};
