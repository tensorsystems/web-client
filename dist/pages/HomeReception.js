import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { StatCard } from "../components/StatCard";
import classNames from "classnames";
import { useBottomSheetDispatch } from "../bottomsheet";
import { TablePagination } from "../components/TablePagination";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import CheckInForm from "../components/CheckInForm";
import { AppointmentForm } from "../components/AppointmentForm";
import { debounce } from "lodash-es";
const HOME_STATS = gql `
  query HomeStats {
    receptionHomeStats {
      scheduled
      checkedIn
      checkedOut
    }
  }
`;
const HomeReception = ({ onAddPage }) => {
    var _a, _b, _c;
    const history = useHistory();
    const { data } = useQuery(HOME_STATS);
    const handleStatClick = (status) => {
        const page = {
            title: `Appointments`,
            cancellable: true,
            route: `/appointments`,
            icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0) }), void 0)),
        };
        onAddPage(page);
        history.push(`/appointments?status=${status}`);
    };
    return (_jsxs("div", Object.assign({ className: "h-full mb-20" }, { children: [_jsxs("div", Object.assign({ className: "md:flex md:space-x-6" }, { children: [_jsx(StatCard, { title: "Scheduled", figure: (_a = data === null || data === void 0 ? void 0 : data.receptionHomeStats.scheduled) !== null && _a !== void 0 ? _a : 0, onClick: () => {
                            handleStatClick("Scheduled");
                        } }, void 0),
                    _jsx(StatCard, { title: "Checked in", figure: (_b = data === null || data === void 0 ? void 0 : data.receptionHomeStats.checkedIn) !== null && _b !== void 0 ? _b : 0, onClick: () => {
                            handleStatClick("Checked-In");
                        } }, void 0),
                    _jsx(StatCard, { title: "Checked out", figure: (_c = data === null || data === void 0 ? void 0 : data.receptionHomeStats.scheduled) !== null && _c !== void 0 ? _c : 0, onClick: () => {
                            handleStatClick("Checked-Out");
                        } }, void 0)] }), void 0),
            _jsx(PatientsTable, {}, void 0)] }), void 0));
};
const TODAYS_APPOINTMENTS = gql `
  query Appointments($page: PaginationInput!, $searchTerm: String) {
    findTodaysAppointments(page: $page, searchTerm: $searchTerm) {
      totalCount
      edges {
        node {
          id
          checkInTime
          credit
          userId
          providerName
          visitType {
            id
            title
          }
          room {
            id
            title
          }
          appointmentStatus {
            id
            title
          }
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
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
const PatientsTable = () => {
    var _a;
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 10,
    });
    const bottomSheetDispatch = useBottomSheetDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(searchTerm.length > 0);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const { data, refetch } = useQuery(TODAYS_APPOINTMENTS, {
        variables: {
            page: paginationInput,
            searchTerm: debouncedSearchTerm.length > 0 ? debouncedSearchTerm : undefined,
        },
        pollInterval: 10000,
    });
    useEffect(() => {
        refetch();
    }, [paginationInput, debouncedSearchTerm]);
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.findTodaysAppointments.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const debouncer = useCallback(debounce((_searchVal) => {
        setDebouncedSearchTerm(_searchVal);
    }, 1000), []);
    return (_jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center justify-between px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-t" }, { children: [_jsx("p", { children: "Todays Appointments" }, void 0),
                    _jsxs("div", Object.assign({ className: "flex justify-end space-x-4 items-center" }, { children: [showSearch && (_jsx("input", { autoFocus: true, type: "search", placeholder: "Search", value: searchTerm, onChange: (evt) => {
                                    setSearchTerm(evt.target.value);
                                    debouncer(evt.target.value);
                                }, onBlur: () => setShowSearch(false), className: "px-2 py-1 border border-gray-200 rounded-md shadow-inner" }, void 0)),
                            !showSearch && (_jsx("button", Object.assign({ type: "button", onClick: () => setShowSearch(true) }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-5 w-5" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }, void 0) }), void 0) }), void 0))] }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "flex flex-col" }, { children: _jsx("div", Object.assign({ className: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, { children: _jsx("div", Object.assign({ className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" }, { children: _jsxs("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200" }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Patient" }), void 0),
                                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Phone Number" }), void 0),
                                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Provider" }), void 0),
                                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Visit Type" }), void 0),
                                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Payment" }), void 0),
                                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Status" }), void 0)] }, void 0) }, void 0),
                                        _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.findTodaysAppointments.edges.map((e) => {
                                                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                                return (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 cursor-pointer", onClick: () => {
                                                        let form;
                                                        if ((e === null || e === void 0 ? void 0 : e.node.appointmentStatus.title) === "Scheduled") {
                                                            form = (_jsx(CheckInForm, { appointmentId: e.node.id, onSuccess: () => {
                                                                    refetch();
                                                                }, onReschedule: (appointmentId, patientId) => {
                                                                    bottomSheetDispatch({ type: "hide" });
                                                                    if (appointmentId !== undefined &&
                                                                        patientId !== undefined) {
                                                                        bottomSheetDispatch({
                                                                            type: "show",
                                                                            snapPoint: 1000,
                                                                            children: (_jsx(AppointmentForm, { patientId: patientId, updateId: appointmentId, onSuccess: () => {
                                                                                    refetch();
                                                                                }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                                                                        });
                                                                    }
                                                                } }, void 0));
                                                        }
                                                        else {
                                                            return;
                                                        }
                                                        bottomSheetDispatch({
                                                            type: "show",
                                                            snapPoint: 0,
                                                            children: form,
                                                        });
                                                    } }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4" }, { children: _jsxs("div", Object.assign({ className: "flex items-center" }, { children: [_jsx("div", Object.assign({ className: "flex-shrink-0 h-10 w-10" }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-10 w-10 text-gray-600" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0) }), void 0) }), void 0),
                                                                    _jsxs("div", Object.assign({ className: "ml-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm font-medium text-gray-900" }, { children: `${(_a = e === null || e === void 0 ? void 0 : e.node.patient) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = e === null || e === void 0 ? void 0 : e.node.patient) === null || _b === void 0 ? void 0 : _b.lastName}` }), void 0),
                                                                            _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: (_c = e === null || e === void 0 ? void 0 : e.node.patient) === null || _c === void 0 ? void 0 : _c.id }), void 0)] }), void 0)] }), void 0) }), void 0),
                                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: (_d = e === null || e === void 0 ? void 0 : e.node.patient) === null || _d === void 0 ? void 0 : _d.phoneNo }), void 0),
                                                        _jsxs("td", Object.assign({ className: "px-6 py-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm text-gray-900" }, { children: `Dr. ${e === null || e === void 0 ? void 0 : e.node.providerName}` }), void 0),
                                                                _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: e === null || e === void 0 ? void 0 : e.node.room.title }), void 0)] }), void 0),
                                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.node.visitType.title }), void 0),
                                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: ((_e = e === null || e === void 0 ? void 0 : e.node.payments.length) !== null && _e !== void 0 ? _e : 0) > 0
                                                                ? `${e === null || e === void 0 ? void 0 : e.node.payments.map((p) => p === null || p === void 0 ? void 0 : p.billing.item).join(", ")} (${e === null || e === void 0 ? void 0 : e.node.payments.map((p) => p === null || p === void 0 ? void 0 : p.invoiceNo).join(", ")})`
                                                                : "" }), void 0),
                                                        _jsx("td", Object.assign({ className: "px-6 py-4" }, { children: _jsx("span", Object.assign({ className: classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                                    "bg-yellow-100 text-yellow-800": ((_f = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _f === void 0 ? void 0 : _f.title) ===
                                                                        "Scheduled online" || "Scheduled",
                                                                }, {
                                                                    "bg-green-100 text-green-800": ((_g = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _g === void 0 ? void 0 : _g.title) ===
                                                                        "Checked-In",
                                                                }, {
                                                                    "bg-red-100 text-red-800": ((_h = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _h === void 0 ? void 0 : _h.title) ===
                                                                        "Checked-Out",
                                                                }) }, { children: (_j = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _j === void 0 ? void 0 : _j.title }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                                            }) }), void 0)] }), void 0),
                                _jsx(TablePagination, { totalCount: (_a = data === null || data === void 0 ? void 0 : data.findTodaysAppointments.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0) }), void 0) }), void 0) }), void 0)] }), void 0));
};
export default HomeReception;
