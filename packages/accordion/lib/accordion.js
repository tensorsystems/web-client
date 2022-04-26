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
import { useState } from "react";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, } from "react-accessible-accordion";
import classnames from "classnames";
import "./index.css";
export default function MyAccordion(_a) {
    var title = _a.title, content = _a.content, preExpand = _a.preExpand;
    var _b = useState(preExpand ? true : false), expanded = _b[0], setExpanded = _b[1];
    return (_jsx("div", { children: _jsx(Accordion, __assign({ allowZeroExpanded: true, className: "shadow-md rounded-md", preExpanded: preExpand ? ["my-accordion"] : [], onChange: function (value) {
                if (value.indexOf("my-accordion") !== -1) {
                    setExpanded(true);
                }
                else {
                    setExpanded(false);
                }
            } }, { children: _jsxs(AccordionItem, __assign({ uuid: "my-accordion" }, { children: [_jsx(AccordionItemHeading, { children: _jsx(AccordionItemButton, __assign({ className: "bg-gray-100 cursor-pointer p-4 w-full hover:bg-gray-200" }, { children: _jsxs("div", __assign({ className: "flex space-x-3" }, { children: [_jsx("div", { children: _jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: classnames("h-6 w-6", {
                                                "transform rotate-90": expanded,
                                            }) }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })) }), _jsx("p", __assign({ className: "font-semibold" }, { children: title }))] })) })) }), _jsx(AccordionItemPanel, { children: content })] })) })) }));
}
