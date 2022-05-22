import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format, parseISO } from "date-fns";
import classnames from "classnames";
import { LabOrderStatus } from "../models/models";
import { TablePagination } from "./TablePagination";
export const LabOrdersTable = ({ orders, onItemClick, totalCount, onNext, onPrev, }) => {
    return (_jsx("div", Object.assign({ className: "flex flex-col mt-4" }, { children: _jsx("div", Object.assign({ className: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, { children: _jsx("div", Object.assign({ className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" }, { children: _jsxs("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Patient" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Ordered By" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Items" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Status" }), void 0)] }, void 0) }, void 0),
                                _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: orders === null || orders === void 0 ? void 0 : orders.map((e) => {
                                        var _a, _b, _c;
                                        const payments = e.labs.map((p) => p.payments).flat();
                                        return (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 cursor-pointer", onClick: () => e && onItemClick(e) }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4" }, { children: _jsxs("div", Object.assign({ className: "flex items-center" }, { children: [_jsx("div", Object.assign({ className: "flex-shrink-0 h-10 w-10" }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-10 w-10 text-gray-600" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0) }), void 0) }), void 0),
                                                            _jsxs("div", Object.assign({ className: "ml-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm font-medium text-gray-900" }, { children: `${e.firstName} ${e.lastName}` }), void 0),
                                                                    _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: e.patientId }), void 0)] }), void 0)] }), void 0) }), void 0),
                                                _jsxs("td", Object.assign({ className: "px-6 py-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm text-gray-900" }, { children: `${((_a = e === null || e === void 0 ? void 0 : e.orderedBy) === null || _a === void 0 ? void 0 : _a.userTypes.some((t) => (t === null || t === void 0 ? void 0 : t.title) === "Physician")) ? "Dr. "
                                                                : ""} ${(_b = e.orderedBy) === null || _b === void 0 ? void 0 : _b.firstName} ${(_c = e.orderedBy) === null || _c === void 0 ? void 0 : _c.lastName}` }), void 0),
                                                        _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: format(parseISO(e.createdAt), "MMM d, y") }), void 0)] }), void 0),
                                                _jsxs("td", Object.assign({ className: "px-6 py-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm text-gray-900" }, { children: payments
                                                                .map((p) => `${p === null || p === void 0 ? void 0 : p.billing.item} (${p === null || p === void 0 ? void 0 : p.billing.code})`)
                                                                .join(", ") }), void 0),
                                                        _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: `ETB ${payments.reduce((a, c) => a + ((c === null || c === void 0 ? void 0 : c.billing) ? c === null || c === void 0 ? void 0 : c.billing.price : 0), 0)}` }), void 0)] }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-teal-700 tracking-wide font-semibold" }, { children: _jsx("span", Object.assign({ className: classnames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                            "bg-yellow-100 text-yellow-800": (e === null || e === void 0 ? void 0 : e.status) === LabOrderStatus.Ordered ||
                                                                payments.some((e) => e.status === "NOTPAID" ||
                                                                    e.status === "PAYMENT_WAIVER_REQUESTED"),
                                                        }, {
                                                            "bg-green-100 text-green-800": payments.every((e) => e.status === "PAID"),
                                                        }) }, { children: e.status }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.id));
                                    }) }), void 0)] }), void 0),
                        _jsx(TablePagination, { totalCount: totalCount, onNext: onNext, onPrevious: onPrev }, void 0)] }), void 0) }), void 0) }), void 0) }), void 0));
};
