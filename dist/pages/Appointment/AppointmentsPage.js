import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TablePagination } from "../../components/TablePagination";
import { useHistory, useLocation } from "react-router-dom";
import { parseJwt } from "../../util";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { AppointmentForm } from "../../components/AppointmentForm";
const TOOLBAR_LOOKUPS = gql `
  query ToolbarLookups($userTypeTitle: String!) {
    appointmentStatuses(page: { page: 0, size: 20 }) {
      edges {
        node {
          id
          title
        }
      }
    }
    visitTypes(page: { page: 0, size: 20 }) {
      edges {
        node {
          id
          title
        }
      }
    }
    getByUserTypeTitle(input: $userTypeTitle) {
      id
      firstName
      lastName
    }
  }
`;
const APPOINTMENT_SEARCH = gql `
  query SearchAppointments(
    $input: AppointmentSearchInput!
    $page: PaginationInput!
  ) {
    searchAppointments(input: $input, page: $page) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          providerName
          checkInTime
          checkedInTime
          checkedOutTime
          patient {
            id
            firstName
            lastName
            phoneNo
          }
          payments {
            id
            invoiceNo
            status
            billing {
              id
              item
              code
              price
            }
          }
          room {
            id
            title
          }
          visitType {
            id
            title
          }
          appointmentStatus {
            id
            title
          }
        }
      }
    }
  }
`;
function useRouterQuery() {
    return new URLSearchParams(useLocation().search);
}
export const AppointmentsPage = ({ onAddPage }) => {
    var _a;
    const query = useRouterQuery();
    const queryUserId = query.get("userId");
    const queryStatusId = query.get("statusId");
    const queryStatus = query.get("status");
    const queryVisitTypeId = query.get("visitTypeId");
    const history = useHistory();
    const bottomSheetDispatch = useBottomSheetDispatch();
    const [filter, setFilter] = useState({
        checkInTime: new Date(),
        userId: queryUserId === null ? "all" : queryUserId,
        appointmentStatusId: queryStatusId === null ? "all" : queryStatusId,
        visitTypeId: queryVisitTypeId === null ? "all" : queryVisitTypeId,
    });
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 20,
    });
    const { data, refetch } = useQuery(APPOINTMENT_SEARCH, {
        variables: {
            input: {
                checkInTime: filter.checkInTime,
                userId: filter.userId === "all" ? undefined : filter.userId,
                appointmentStatusId: filter.appointmentStatusId === "all"
                    ? undefined
                    : filter.appointmentStatusId,
                visitTypeId: filter.visitTypeId === "all" ? undefined : filter.visitTypeId,
                searchTerm: ((_a = filter.searchTerm) === null || _a === void 0 ? void 0 : _a.length) === 0 ? undefined : filter.searchTerm,
            },
            page: paginationInput,
        },
    });
    const queryToolbarLookup = useQuery(TOOLBAR_LOOKUPS, {
        variables: {
            userTypeTitle: "Physician",
        },
    });
    useEffect(() => {
        var _a;
        if (((_a = queryToolbarLookup.data) === null || _a === void 0 ? void 0 : _a.appointmentStatuses) && queryStatus !== null) {
            const status = queryToolbarLookup.data.appointmentStatuses.edges.find((e) => (e === null || e === void 0 ? void 0 : e.node.title) === queryStatus);
            if (status) {
                setFilter(Object.assign(Object.assign({}, filter), { appointmentStatusId: status.node.id.toString() }));
            }
        }
    }, [queryStatus]);
    useEffect(() => {
        refetch();
    }, [filter, paginationInput]);
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.searchAppointments.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePrevClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleClear = () => {
        setFilter({
            checkInTime: new Date(),
            userId: "all",
            appointmentStatusId: "all",
            visitTypeId: "all",
            searchTerm: undefined,
        });
    };
    const handleAppointmentClick = (appointment) => {
        const token = sessionStorage.getItem("accessToken");
        if (token !== null) {
            const claim = parseJwt(token);
            const userType = claim.UserType;
            if (userType.includes("Receptionist")) {
                if (appointment.patient.id) {
                    bottomSheetDispatch({
                        type: "show",
                        snapPoint: 1000,
                        children: (_jsx(AppointmentForm, { patientId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.id, updateId: appointment.id, onSuccess: () => refetch(), onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                    });
                }
            }
            else {
                const page = {
                    title: `Appointment - ${appointment.patient.firstName} ${appointment.patient.lastName}`,
                    cancellable: true,
                    route: `/appointments/${appointment.id}/patient-dashboard`,
                    icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0) }), void 0)),
                };
                onAddPage(page);
                history.replace(`/appointments/${appointment.id}/patient-dashboard`);
            }
        }
    };
    return (_jsxs("div", Object.assign({ className: "h-full" }, { children: [_jsx(Toolbar, { filter: filter, lookup: queryToolbarLookup, onClear: handleClear, onChange: (input) => {
                    setFilter(input);
                } }, void 0),
            _jsx(AppointmentsTable, { filter: filter, data: data === null || data === void 0 ? void 0 : data.searchAppointments, onSelect: handleAppointmentClick, onNext: handleNextClick, onPrev: handlePrevClick }, void 0)] }), void 0));
};
const Toolbar = ({ filter, lookup, onChange, onClear, }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const handleChange = (evt) => {
        const value = evt.target.value;
        const newValue = Object.assign(Object.assign({}, filter), { [evt.target.name]: value === "all" ? undefined : value });
        onChange(newValue);
    };
    return (_jsxs("div", Object.assign({ className: "flex bg-white w-full h-16 p-4 mt-4 rounded-md shadow-md justify-between items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center text-gray-700" }, { children: [_jsx("input", { type: "date", id: "checkInTime", name: "checkInTime", value: format(filter === null || filter === void 0 ? void 0 : filter.checkInTime, "yyyy-MM-dd"), className: "border-l-2 border-gray-200 rounded-md", onChange: (evt) => {
                            if (filter !== undefined) {
                                const value = evt.target.value;
                                const newValue = Object.assign(Object.assign({}, filter), { checkInTime: new Date(value) });
                                onChange(newValue);
                            }
                        } }, void 0),
                    _jsxs("select", Object.assign({ name: "userId", className: "ml-6 border-l-2 border-gray-200 rounded-md", value: (_a = filter === null || filter === void 0 ? void 0 : filter.userId) !== null && _a !== void 0 ? _a : "all", onChange: handleChange }, { children: [_jsx("option", Object.assign({ value: "all" }, { children: "All Doctors" }), void 0), (_b = lookup === null || lookup === void 0 ? void 0 : lookup.data) === null || _b === void 0 ? void 0 : _b.getByUserTypeTitle.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.id }, { children: `Dr. ${e === null || e === void 0 ? void 0 : e.firstName} ${e === null || e === void 0 ? void 0 : e.lastName}` }), e === null || e === void 0 ? void 0 : e.id)))] }), void 0),
                    _jsxs("select", Object.assign({ className: "ml-6 border-l-2 border-gray-200 rounded-md", name: "appointmentStatusId", value: (_c = filter === null || filter === void 0 ? void 0 : filter.appointmentStatusId) !== null && _c !== void 0 ? _c : "all", onChange: handleChange }, { children: [_jsx("option", Object.assign({ value: "all" }, { children: "All Statuses" }), void 0), (_d = lookup === null || lookup === void 0 ? void 0 : lookup.data) === null || _d === void 0 ? void 0 : _d.appointmentStatuses.edges.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.node.id }, { children: e === null || e === void 0 ? void 0 : e.node.title }), e === null || e === void 0 ? void 0 : e.node.id)))] }), void 0),
                    _jsxs("select", Object.assign({ className: "ml-6 border-l-2 border-gray-200 rounded-md", name: "visitTypeId", value: (_e = filter === null || filter === void 0 ? void 0 : filter.visitTypeId) !== null && _e !== void 0 ? _e : "all", onChange: handleChange }, { children: [_jsx("option", Object.assign({ value: "all" }, { children: "All visit types" }), void 0), (_f = lookup === null || lookup === void 0 ? void 0 : lookup.data) === null || _f === void 0 ? void 0 : _f.visitTypes.edges.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.node.id }, { children: e === null || e === void 0 ? void 0 : e.node.title }), e === null || e === void 0 ? void 0 : e.node.id)))] }), void 0),
                    _jsx("div", Object.assign({ className: "ml-6 border-l-2 p-1 pl-6" }, { children: _jsx("button", Object.assign({ onClick: onClear, className: "uppercase text-white tracking-wider text-sm rounded-md bg-teal-600 hover:bg-teal-700 px-6 py-2" }, { children: "Clear" }), void 0) }), void 0)] }), void 0),
            _jsx("div", { children: _jsxs("div", Object.assign({ className: "relative mx-auto text-gray-600" }, { children: [_jsx("input", { className: "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none", type: "search", name: "searchTerm", placeholder: "Search", value: (_g = filter === null || filter === void 0 ? void 0 : filter.searchTerm) !== null && _g !== void 0 ? _g : "", onChange: (evt) => {
                                const value = evt.target.value;
                                const newValue = Object.assign(Object.assign({}, filter), { [evt.target.name]: value.length === 0 ? null : value });
                                onChange(newValue);
                            } }, void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "absolute right-0 top-0 mt-3 mr-4" }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }, void 0) }), void 0) }), void 0)] }), void 0) }, void 0)] }), void 0));
};
const AppointmentsTable = ({ data, onNext, onPrev, onSelect, }) => {
    var _a;
    return (_jsx("div", Object.assign({ className: "flex flex-col mt-4" }, { children: _jsx("div", Object.assign({ className: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, { children: _jsx("div", Object.assign({ className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" }, { children: _jsxs("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Patient" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Phone Number" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Room" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Visit Type" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Payment" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Status" }), void 0)] }, void 0) }, void 0),
                                _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.edges.map((e) => {
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                                        return (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 cursor-pointer", onClick: () => (e === null || e === void 0 ? void 0 : e.node) && onSelect(e === null || e === void 0 ? void 0 : e.node) }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4" }, { children: _jsxs("div", Object.assign({ className: "flex items-center" }, { children: [_jsx("div", Object.assign({ className: "flex-shrink-0 h-10 w-10" }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-10 w-10 text-gray-600" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0) }), void 0) }), void 0),
                                                            _jsxs("div", Object.assign({ className: "ml-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm font-medium text-gray-900" }, { children: `${(_a = e === null || e === void 0 ? void 0 : e.node.patient) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = e === null || e === void 0 ? void 0 : e.node.patient) === null || _b === void 0 ? void 0 : _b.lastName}` }), void 0),
                                                                    _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: (_c = e === null || e === void 0 ? void 0 : e.node.patient) === null || _c === void 0 ? void 0 : _c.id }), void 0)] }), void 0)] }), void 0) }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: (_d = e === null || e === void 0 ? void 0 : e.node.patient) === null || _d === void 0 ? void 0 : _d.phoneNo }), void 0),
                                                _jsxs("td", Object.assign({ className: "px-6 py-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.node.userId }), void 0),
                                                        _jsx("div", Object.assign({ className: "text-sm text-gray-900" }, { children: (_e = e === null || e === void 0 ? void 0 : e.node.room) === null || _e === void 0 ? void 0 : _e.title }), void 0)] }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: (_f = e === null || e === void 0 ? void 0 : e.node.visitType) === null || _f === void 0 ? void 0 : _f.title }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: ((_g = e === null || e === void 0 ? void 0 : e.node.payments.length) !== null && _g !== void 0 ? _g : 0) > 0
                                                        ? `${e === null || e === void 0 ? void 0 : e.node.payments.map((p) => p === null || p === void 0 ? void 0 : p.billing.item).join(", ")} (${e === null || e === void 0 ? void 0 : e.node.payments.map((p) => p === null || p === void 0 ? void 0 : p.invoiceNo).join(", ")})`
                                                        : "" }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4" }, { children: _jsx("span", Object.assign({ className: classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                            "bg-yellow-100 text-yellow-800": ((_h = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _h === void 0 ? void 0 : _h.title) ===
                                                                "Scheduled online" || "Scheduled",
                                                        }, {
                                                            "bg-green-100 text-green-800": ((_j = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _j === void 0 ? void 0 : _j.title) === "Checked In",
                                                        }, {
                                                            "bg-red-100 text-red-800": ((_k = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _k === void 0 ? void 0 : _k.title) ===
                                                                "Checked Out",
                                                        }) }, { children: (_l = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _l === void 0 ? void 0 : _l.title }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                                    }) }), void 0)] }), void 0),
                        _jsx(TablePagination, { totalCount: (_a = data === null || data === void 0 ? void 0 : data.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: onNext, onPrevious: onPrev }, void 0)] }), void 0) }), void 0) }), void 0) }), void 0));
};
