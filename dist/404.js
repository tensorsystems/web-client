import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useHistory } from "react-router-dom";
import fourOfour from "./404.svg";
export const Component404 = () => {
    const history = useHistory();
    return (_jsxs("div", { children: [_jsxs("div", Object.assign({ className: "text-center" }, { children: [_jsx("p", Object.assign({ className: "text-4xl font-semibold" }, { children: "Oops! That's an error" }), void 0),
                    _jsx("p", Object.assign({ className: "text-2xl font-light" }, { children: "The page you are looking for does not exist" }), void 0),
                    _jsx("button", Object.assign({ type: "button", className: "px-10 py-4 bg-gradient-to-r from-green-400 to-blue-500 transform hover:scale-110 text-white rounded-md shadow-lg mt-5", onClick: () => {
                            history.replace("/");
                        } }, { children: "Back to home" }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "mt-8" }, { children: _jsx("img", { className: "w-full h-auto", src: fourOfour, alt: "404" }, void 0) }), void 0)] }, void 0));
};
