import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from "classnames";
import { format, parseISO } from "date-fns";
export default function SearchBarAppointments(props) {
    const { appointments, currentDateTime } = props;
    return (_jsx("table", Object.assign({ className: "w-full table text-sm border-l border-teal-500" }, { children: _jsx("tbody", Object.assign({ className: "divide-y divide-gray-200" }, { children: appointments === null || appointments === void 0 ? void 0 : appointments.map((e) => {
                var _a, _b, _c, _d;
                return (_jsxs("tr", { children: [_jsx("td", Object.assign({ className: "px-4 py-3" }, { children: e === null || e === void 0 ? void 0 : e.visitType.title }), void 0),
                        _jsx("td", Object.assign({ className: "px-4 py-3" }, { children: format(parseISO(e === null || e === void 0 ? void 0 : e.checkInTime.split("T")[0]), "MMM d, y") }), void 0),
                        _jsx("td", Object.assign({ className: "px-4 py-3" }, { children: `Dr. ${e === null || e === void 0 ? void 0 : e.providerName}` }), void 0),
                        _jsx("td", Object.assign({ className: "px-4 py-3" }, { children: _jsx("span", Object.assign({ className: classnames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                    "bg-yellow-100 text-yellow-800": ((_a = e === null || e === void 0 ? void 0 : e.appointmentStatus) === null || _a === void 0 ? void 0 : _a.title) === "Scheduled online" ||
                                        "Scheduled",
                                }, {
                                    "bg-green-100 text-green-800": ((_b = e === null || e === void 0 ? void 0 : e.appointmentStatus) === null || _b === void 0 ? void 0 : _b.title) === "Checked-In",
                                }, {
                                    "bg-red-100 text-red-800": ((_c = e === null || e === void 0 ? void 0 : e.appointmentStatus) === null || _c === void 0 ? void 0 : _c.title) === "Checked-Out",
                                }) }, { children: (_d = e === null || e === void 0 ? void 0 : e.appointmentStatus) === null || _d === void 0 ? void 0 : _d.title }), void 0) }), void 0)] }, e === null || e === void 0 ? void 0 : e.id));
            }) }), void 0) }), void 0));
}
