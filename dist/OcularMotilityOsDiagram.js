import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from "classnames";
const ocularValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
export const OcularMotilityOsDiagram = ({ register, readOnly, onChange, values, }) => {
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-6 gap-2 justify-items-center" }, { children: [_jsx("div", Object.assign({ className: "col-span-2 justify-self-end" }, { children: _jsxs("select", Object.assign({ name: "lio", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "LIO" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "lio")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-2" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-start" }, { children: _jsxs("select", Object.assign({ name: "lsr", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "LSR" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "lsr")))] }), void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "col-span-2 justify-self-end" }, { children: [_jsx("label", Object.assign({ htmlFor: "toggle-os", className: cn("material-icons transform -rotate-45 text-gray-500 cursor-pointer", {
                            "text-teal-400": values.leftFlick === true,
                        }) }, { children: "undo" }), void 0),
                    _jsx("input", { type: "checkbox", id: "toggle-os", style: {
                            position: "absolute",
                            left: "-100vw",
                        }, name: "leftFlick", ref: register, onChange: onChange }, void 0),
                    _jsx("div", { className: "control-me" }, void 0)] }), void 0),
            _jsx("div", { className: "col-span-2" }, void 0),
            _jsx("div", { className: "col-span-2 " }, void 0),
            _jsx("div", { className: "col-span-1" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("div", { className: "top-half-circle" }, void 0) }), void 0),
            _jsx("div", { className: "col-span-1" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-end" }, { children: _jsxs("select", Object.assign({ name: "lmr", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "LMR" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "lmr")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-2" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-start" }, { children: _jsxs("select", Object.assign({ name: "llr", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "LLR" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "llr")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-1" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("div", { className: "bottom-half-circle" }, void 0) }), void 0),
            _jsx("div", { className: "col-span-1" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-end" }, { children: _jsxs("select", Object.assign({ name: "lso", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "LSO" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "lso")))] }), void 0) }), void 0),
            _jsx("div", { className: "col-span-2" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-2 justify-self-start" }, { children: _jsxs("select", Object.assign({ name: "lir", ref: register, disabled: readOnly, className: "bg-gray-50 focus:outline-none border-none text-xs text-gray-500", onChange: onChange }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "LIR" }), void 0),
                        ocularValues.map((e) => (_jsx("option", Object.assign({ value: e + "" }, { children: e }), e + "lir")))] }), void 0) }), void 0)] }), void 0));
};
