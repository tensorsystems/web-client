import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { AppointmentContext } from "../_context/AppointmentContext";
export const HistoryItemComponent = ({ title, items, isEdit, onAdd, onUpdate, onDelete, }) => {
    const { patientChartLocked } = React.useContext(AppointmentContext);
    return (_jsxs("div", Object.assign({ className: "rounded-lg shadow-lg border border-gray-100 p-1" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", Object.assign({ className: "tracking-wider font-bold text-gray-800" }, { children: title }), void 0),
                    isEdit && (_jsxs("button", Object.assign({ className: "border border-teal-800 text-teal-800 px-3 py-1 rounded-lg flex space-x-1 items-center", onClick: () => onAdd(), disabled: patientChartLocked[0] }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                            _jsx("div", { children: "Add" }, void 0)] }), void 0))] }), void 0),
            items && items.length === 0 ? (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 h-32 flex rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                        _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)) : (_jsx("ul", Object.assign({ className: "mt-3" }, { children: items &&
                    items.map((e) => (_jsxs("li", Object.assign({ className: "flex justify-between border-t border-gray-200 py-2 px-2" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-3" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-yellow-600" }, { children: "add_circle" }), void 0), " ", _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-gray-700 break-words" }, { children: e === null || e === void 0 ? void 0 : e.title }), void 0),
                                            _jsx("div", Object.assign({ className: "text-gray-500 text-sm" }, { children: e === null || e === void 0 ? void 0 : e.subTitle }), void 0),
                                            _jsx("div", Object.assign({ className: "text-gray-500 text-sm" }, { children: e === null || e === void 0 ? void 0 : e.subTitle2 }), void 0)] }, void 0)] }), void 0),
                            _jsx("div", { children: isEdit && (_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("button", Object.assign({ type: "button", className: "material-icons text-gray-700", onClick: () => (e === null || e === void 0 ? void 0 : e.id) && onUpdate(e) }, { children: "create" }), void 0),
                                        _jsx("button", Object.assign({ type: "button", className: "material-icons text-gray-700", onClick: () => {
                                                if (e.id) {
                                                    onDelete(e.id);
                                                }
                                            } }, { children: "delete" }), void 0)] }), void 0)) }, void 0)] }), e === null || e === void 0 ? void 0 : e.id))) }), void 0))] }), void 0));
};
