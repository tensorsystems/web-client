import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Footer } from "./footer";
import { Header } from "../../components/Header";
import { Actionbar } from "../../components/ActionBar";
import classNames from "classnames";
export const MainLayout = ({ children, onPageSelect, onAddPage, }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (_jsxs("div", { children: [_jsxs("div", Object.assign({ className: "sticky top-0 z-20" }, { children: [_jsx("div", { children: _jsx(Header, { searchFocused: isFocused, setSearchFocused: setIsFocused, onChangePage: onPageSelect, onAddPage: onAddPage }, void 0) }, void 0),
                    _jsx("div", { className: classNames("fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10 cursor-pointer", { hidden: !isFocused }) }, void 0),
                    _jsx("div", { children: _jsx(Actionbar, { onPageSelect: onPageSelect }, void 0) }, void 0)] }), void 0),
            _jsx("main", Object.assign({ className: "bg-gray-200 z-10" }, { children: _jsx("div", Object.assign({ className: "mx-auto max-w-full py-2 sm:px-6 lg:px-8" }, { children: _jsx("div", Object.assign({ className: "px-4 py-2 sm:px-0" }, { children: _jsx("div", { children: children }, void 0) }), void 0) }), void 0) }), void 0),
            _jsx(Footer, {}, void 0)] }, void 0));
};
