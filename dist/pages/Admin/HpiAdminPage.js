import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { HpiComponentTable } from "../../components/HpiComponentAdminTable";
import { HpiComponentTypeTable } from "../../components/HpiComponentTypeAdminTable";
export const HpiPage = () => {
    const [hpiComponentTypId, setHpiComponentTypeId] = useState();
    const onSelect = (id) => {
        if (id !== undefined) {
            setHpiComponentTypeId(id);
        }
    };
    return (_jsx(React.Fragment, { children: _jsx("div", Object.assign({ className: "w-full" }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-3 gap-10" }, { children: [_jsx("div", { children: _jsx(HpiComponentTypeTable, { hpiComponentTypId: hpiComponentTypId, onHpiComponentTypeSelect: onSelect }, void 0) }, void 0),
                    _jsx("div", Object.assign({ className: "col-span-2" }, { children: hpiComponentTypId === undefined ? (_jsx("div", Object.assign({ className: "flex h-full justify-center items-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-500 uppercase" }, { children: "Select Component Type" }), void 0) }), void 0)) : (_jsx(HpiComponentTable, { hpiComponentTypeId: hpiComponentTypId }, void 0)) }), void 0)] }), void 0) }), void 0) }, void 0));
};
