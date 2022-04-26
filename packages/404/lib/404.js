var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useHistory } from "react-router-dom";
import fourOfour from "./404.svg";
export var Component404 = function () {
    var history = useHistory();
    return (_jsxs("div", { children: [_jsxs("div", __assign({ className: "text-center" }, { children: [_jsx("p", __assign({ className: "text-4xl font-semibold" }, { children: "Oops! That's an error" })), _jsx("p", __assign({ className: "text-2xl font-light" }, { children: "The page you are looking for does not exist" })), _jsx("button", __assign({ type: "button", className: "px-10 py-4 bg-gradient-to-r from-green-400 to-blue-500 transform hover:scale-110 text-white rounded-md shadow-lg mt-5", onClick: function () {
                            history.replace("/");
                        } }, { children: "Back to home" }))] })), _jsx("div", __assign({ className: "mt-8" }, { children: _jsx("img", { className: "w-full h-auto", src: fourOfour, alt: "404" }) }))] }));
};
