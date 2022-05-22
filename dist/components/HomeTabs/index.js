import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import "./index.css";
export const HomeTabs = ({ pages, activeTab, onTabOpen, onClose, }) => {
    const color = "teal";
    return (_jsx(React.Fragment, { children: _jsx("div", Object.assign({ className: "w-full" }, { children: _jsx("ul", Object.assign({ className: "gap-2 w-full flex flex-wrap -m-1", role: "tablist" }, { children: pages.map((e) => (_jsx("li", Object.assign({ className: "-mb-px ml-2 flex-initial text-center" }, { children: _jsx("div", Object.assign({ className: "text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                            (activeTab === e.route
                                ? "text-white bg-" + color + "-600"
                                : "text-" + "gray" + "-600 bg-white"), "data-toggle": "tab", role: "tablist", onClick: () => {
                            onTabOpen(e.route);
                        } }, { children: _jsxs("div", Object.assign({ className: "flex justify-between items-center cursor-pointer" }, { children: [_jsxs("div", Object.assign({ className: "pl-12 uppercase tracking-wide flex flex-1 items-center" }, { children: [_jsx("div", { children: e.icon }, void 0),
                                        _jsx("div", Object.assign({ className: "pl-1 ml-1" }, { children: e.title }), void 0)] }), void 0),
                                _jsx("div", Object.assign({ className: "pl-12" }, { children: e.cancellable && activeTab === e.route && (_jsx("a", Object.assign({ onClick: (evt) => {
                                            evt.preventDefault();
                                            onClose(e.route);
                                        }, className: "items-center" }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", className: "h-4 w-4 fill-current", stroke: "currentColor" }, { children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }, void 0) }), void 0) }), void 0)) }), void 0)] }), void 0) }), void 0) }), e.route))) }), void 0) }), void 0) }, void 0));
};
