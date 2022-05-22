import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const InfoBlock = ({ title, body }) => {
    return (_jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("p", Object.assign({ className: "text-gray-400 text-sm" }, { children: title }), void 0),
            _jsx("p", Object.assign({ className: "text-gray-900 text-semibold text-lg" }, { children: body }), void 0)] }), void 0));
};
