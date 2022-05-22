import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./index.css";
import cn from "classnames";
const ocularValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
export const OcularMotilityOdDiagram = ({ register, readOnly, values, setValue, onChange, }) => {
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-6 gap-2 justify-items-center" }, { children: [_jsx("div", Object.assign({ className: "col-span-2 justify-self-end" }, { children: _jsxs("select", Object.assign({ name: "rsr", ref: register, placeholder: "rsr", disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "RSR" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "rsr")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-2" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-start" }, { children: _jsxs("select", Object.assign({ name: "rio", ref: register, placeholder: "rio", disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "RIO" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "rio")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-2" }, void 0),
            _jsx("div", { className: "col-span-2 " }, void 0),
            _jsxs("div", Object.assign({ className: "col-span-2 justify-self-start" }, { children: [_jsx("label", Object.assign({ htmlFor: "toggle", className: cn("material-icons transform -scale-x-1 rotate-45 text-gray-500 cursor-pointer", {
                            "text-teal-400": values.rightFlick === true,
                        }) }, { children: "undo" }), void 0),
                    _jsx("input", { type: "checkbox", id: "toggle", style: {
                            position: "absolute",
                            left: "-100vw",
                        }, name: "rightFlick", ref: register, onChange: onChange }, void 0),
                    _jsx("div", { className: "control-me" }, void 0)] }), void 0),
            _jsx("div", { className: "col-span-1" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("div", { className: "top-half-circle" }, void 0) }), void 0),
            _jsx("div", { className: "col-span-1 " }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-end" }, { children: _jsxs("select", Object.assign({ name: "rlr", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "RLR" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "rlr")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-2" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-start" }, { children: _jsxs("select", Object.assign({ name: "rmr", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "RMR" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "rmr")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-1" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("div", { className: "bottom-half-circle" }, void 0) }), void 0),
            _jsx("div", { className: "col-span-1" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-end" }, { children: _jsxs("select", Object.assign({ name: "rir", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "RIR" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "rir")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-2" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-start" }, { children: _jsxs("select", Object.assign({ name: "rso", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "RSO" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "rso")))] }), void 0) }), void 0)] }), void 0));
};
