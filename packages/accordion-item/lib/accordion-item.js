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
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import "./accordion-item.css";
export var AccordionItem = function (_a) {
    var title = _a.title, children = _a.children, open = _a.open, className = _a.className, headerColor = _a.headerColor, background = _a.background, onHeadingClick = _a.onHeadingClick;
    var headerClassName = headerColor === undefined
        ? "bg-gray-100 hover:bg-gray-200 text-black"
        : headerColor;
    var backgroundClassName = background === undefined ? "bg-gray-50 p-4 shadow-md" : background;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsxs("div", __assign({ className: "flex flex-row justify-between cursor-pointer p-2 rounded-lg rounded-b-none shadow-lg ".concat(headerClassName), onClick: function () { return onHeadingClick && onHeadingClick(!open); } }, { children: [_jsx("div", { children: title }), _jsx("div", { children: open ? (_jsx("div", __assign({ className: "material-icons" }, { children: "expand_less" }))) : (_jsx("div", __assign({ className: "material-icons" }, { children: "expand_more" }))) })] })), _jsx(Transition.Root, __assign({ show: open, as: Fragment, appear: true, enter: "ease-in-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" }, { children: _jsx("div", __assign({ className: backgroundClassName }, { children: children })) }))] })));
};
