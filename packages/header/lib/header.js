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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/*
  Copyright 2021 Kidus Tiliksew

  This file is part of Tensor EMR.

  Tensor EMR is free software: you can redistribute it and/or modify
  it under the terms of the version 2 of GNU General Public License as published by
  the Free Software Foundation.

  Tensor EMR is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { isLoggedInVar } from "@tensoremr/cache";
import Logo from "./logo.png";
import HeaderSearchBar from "./header-search-bar";
import { useHistory } from "react-router-dom";
import { parseJwt } from "@tensoremr/util";
import { Menu, Transition } from "@headlessui/react";
export var Header = function (_a) {
    var searchFocused = _a.searchFocused, setSearchFocused = _a.setSearchFocused, onChangePage = _a.onChangePage, onAddPage = _a.onAddPage;
    var _b = useState(false), isNavBarOpen = _b[0], setNavBarOpen = _b[1];
    var history = useHistory();
    var client = useApolloClient();
    var onProfileClick = function (evt) {
        evt.preventDefault();
        var token = sessionStorage.getItem("accessToken");
        var claim = parseJwt(token);
        history.push("/profile/".concat(claim.ID));
    };
    return (_jsx("div", __assign({ className: "bg-gray-200" }, { children: _jsx("nav", __assign({ className: "bg-gray-800" }, { children: _jsx("div", __assign({ className: "mx-auto px-6 py-1" }, { children: _jsxs("div", __assign({ className: "flex items-center justify-between h-16" }, { children: [_jsx("div", __assign({ className: "flex items-center" }, { children: _jsx("div", { children: _jsx("img", { className: "h-auto w-44", src: Logo }) }) })), _jsx("div", __assign({ className: "flex-1 relative container mx-auto" }, { children: _jsx(HeaderSearchBar, { searchFocused: searchFocused, setSearchFocused: setSearchFocused, onChangePage: onChangePage, onAddPage: onAddPage }) })), _jsx("div", { children: _jsxs("div", __assign({ className: "ml-4 flex items-center md:ml-6" }, { children: [_jsx("button", __assign({ className: "p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700", "aria-label": "Notifications" }, { children: _jsx("svg", __assign({ className: "h-6 w-6", stroke: "currentColor", fill: "none", viewBox: "0 0 24 24" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) })) })), _jsx("div", __assign({ className: "ml-3 relative z-50" }, { children: _jsx(Menu, { children: function (_a) {
                                                var open = _a.open;
                                                return (_jsxs(_Fragment, { children: [_jsx("span", __assign({ className: "rounded-md shadow-sm" }, { children: _jsx(Menu.Button, __assign({ className: "inline-flex justify-center text-white mt-1" }, { children: _jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) })) })) })), _jsx(Transition, __assign({ show: open, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" }, { children: _jsx(Menu.Items, __assign({ static: true, className: "absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" }, { children: _jsxs("div", __assign({ className: "py-1" }, { children: [_jsx(Menu.Item, { children: function (_a) {
                                                                                var active = _a.active;
                                                                                return (_jsx("a", __assign({ href: "#", className: "".concat(active
                                                                                        ? "bg-gray-100 text-gray-900"
                                                                                        : "text-gray-700", " flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"), onClick: onProfileClick }, { children: "Your profile" })));
                                                                            } }), _jsx(Menu.Item, { children: function (_a) {
                                                                                var active = _a.active;
                                                                                return (_jsx("a", __assign({ href: "#", className: "".concat(active
                                                                                        ? "bg-gray-100 text-gray-900"
                                                                                        : "text-gray-700", " flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"), onClick: function () {
                                                                                        client.cache.gc();
                                                                                        sessionStorage.removeItem("accessToken");
                                                                                        isLoggedInVar(false);
                                                                                    } }, { children: "Sign out" })));
                                                                            } })] })) })) }))] }));
                                            } }) }))] })) })] })) })) })) })));
};
