var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import { debounce } from "lodash-es";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import classnames from 'classnames';
var SEARCH = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query SearchPatient($searchTerm: String!) {\n    search(searchTerm: $searchTerm) {\n      patients {\n        id\n        firstName\n        lastName\n        phoneNo\n      }\n\n      providers {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"], ["\n  query SearchPatient($searchTerm: String!) {\n    search(searchTerm: $searchTerm) {\n      patients {\n        id\n        firstName\n        lastName\n        phoneNo\n      }\n\n      providers {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"])));
var HeaderSearchBar = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var searchFocused = _a.searchFocused, setSearchFocused = _a.setSearchFocused, onAddPage = _a.onAddPage;
    var history = useHistory();
    var _h = useState(""), searchTerm = _h[0], setSearchTerm = _h[1];
    var _j = useState(""), debouncedSearchTerm = _j[0], setDebouncedSearchTerm = _j[1];
    var searchQuery = useLazyQuery(SEARCH);
    useEffect(function () {
        if (debouncedSearchTerm.trim().length > 0) {
            searchQuery[0]({
                variables: {
                    searchTerm: debouncedSearchTerm,
                },
            });
        }
        else {
            searchQuery[0]({
                variables: {
                    searchTerm: "",
                },
            });
        }
    }, [debouncedSearchTerm]);
    var debouncer = useCallback(debounce(function (_searchVal) {
        setDebouncedSearchTerm(_searchVal);
    }, 500), []);
    var handlePatientClick = function (patient) {
        if (patient !== undefined) {
            setSearchFocused(false);
            setSearchTerm("");
            var page = {
                title: "Patient - ".concat(patient === null || patient === void 0 ? void 0 : patient.firstName, " ").concat(patient === null || patient === void 0 ? void 0 : patient.lastName),
                cancellable: true,
                route: "/patients/".concat(patient === null || patient === void 0 ? void 0 : patient.id, "/appointments"),
                icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }))),
            };
            onAddPage(page);
            history.replace("/patients/".concat(patient === null || patient === void 0 ? void 0 : patient.id, "/appointments"));
        }
    };
    var handleProviderClick = function (user) {
        setSearchFocused(false);
        setSearchTerm("");
        var page = {
            title: "Appointments",
            cancellable: true,
            route: "/appointments?userId=".concat(user.id),
            icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }))),
        };
        onAddPage(page);
        history.replace("/appointments?userId=".concat(user.id));
    };
    var hasPatients = ((_c = (_b = searchQuery[1].data) === null || _b === void 0 ? void 0 : _b.search.patients.length) !== null && _c !== void 0 ? _c : 0) > 0;
    var hasProviders = ((_e = (_d = searchQuery[1].data) === null || _d === void 0 ? void 0 : _d.search.providers.length) !== null && _e !== void 0 ? _e : 0) > 0;
    return (_jsxs("div", { children: [_jsx("div", __assign({ className: "relative z-20" }, { children: _jsx("input", { type: "search", className: "bg-gray-600 focus:bg-white focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-300 h-10 w-full px-4 rounded-md sm:text-sm block border-none", placeholder: "Search", "aria-haspopup": "listbox", "aria-expanded": "false", autoComplete: "off", value: searchTerm, onFocus: function () { return setSearchFocused(true); }, onBlur: function () {
                        setSearchFocused(false);
                        setSearchTerm("");
                    }, onChange: function (evt) {
                        setSearchTerm(evt.target.value);
                        debouncer(evt.target.value);
                    } }) })), searchQuery[1].loading && (_jsx("div", __assign({ className: "origin-top-left mt-4 absolute z-20 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-center py-10" }, { children: _jsx("p", __assign({ className: "text-gray-700 animate-pulse tracking-wider" }, { children: "Searching..." })) }))), (hasPatients || hasProviders) && searchFocused && (_jsxs("div", __assign({ className: "origin-top-left mt-4 absolute z-20 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4" }, { children: [hasPatients && (_jsx("div", { children: _jsx(PatientResults, { patients: (_f = searchQuery[1].data) === null || _f === void 0 ? void 0 : _f.search.patients, onClick: function (e) { return handlePatientClick(e); } }) })), hasProviders && (_jsx("div", __assign({ className: "mt-2" }, { children: _jsx(ProviderResults, { providers: (_g = searchQuery[1].data) === null || _g === void 0 ? void 0 : _g.search.providers, onClick: function (e) { return handleProviderClick(e); } }) })))] })))] }));
};
var SEARCH_ITEM_DETAILS = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query SearchItemDetails(\n    $appointmentFilter: AppointmentFilter\n    $medicalPrescriptionFilter: MedicalPrescriptionFilter\n    $page: PaginationInput!\n  ) {\n    appointments(filter: $appointmentFilter, page: $page) {\n      totalCount\n      edges {\n        node {\n          id\n          checkInTime\n          visitType {\n            id\n            title\n          }\n          appointmentStatus {\n            id\n            title\n          }\n          providerName\n        }\n      }\n    }\n\n    searchMedicalPrescriptions(\n      filter: $medicalPrescriptionFilter\n      page: $page\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          medication\n          sig\n          refill\n          generic\n          substitutionAllowed\n          directionToPatient\n          history\n          status\n          prescribedDate\n        }\n      }\n    }\n\n    currentDateTime\n  }\n"], ["\n  query SearchItemDetails(\n    $appointmentFilter: AppointmentFilter\n    $medicalPrescriptionFilter: MedicalPrescriptionFilter\n    $page: PaginationInput!\n  ) {\n    appointments(filter: $appointmentFilter, page: $page) {\n      totalCount\n      edges {\n        node {\n          id\n          checkInTime\n          visitType {\n            id\n            title\n          }\n          appointmentStatus {\n            id\n            title\n          }\n          providerName\n        }\n      }\n    }\n\n    searchMedicalPrescriptions(\n      filter: $medicalPrescriptionFilter\n      page: $page\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          medication\n          sig\n          refill\n          generic\n          substitutionAllowed\n          directionToPatient\n          history\n          status\n          prescribedDate\n        }\n      }\n    }\n\n    currentDateTime\n  }\n"])));
function PatientResults(_a) {
    var _b, _c, _d, _e;
    var patients = _a.patients, onClick = _a.onClick;
    var searchItemDetailsQuery = useLazyQuery(SEARCH_ITEM_DETAILS);
    var _f = useState({ hovered: false, id: null }), isHovered = _f[0], setIsHovered = _f[1];
    var debouncedHandleMouseEnter = debounce(function (hoverId) { return setIsHovered({ hovered: true, id: hoverId }); }, 500);
    var handlOnMouseLeave = function () {
        setIsHovered({ hovered: false, id: null });
        debouncedHandleMouseEnter.cancel();
    };
    useEffect(function () {
        if (isHovered.hovered) {
            searchItemDetailsQuery[0]({
                variables: {
                    appointmentFilter: {
                        patientId: isHovered.id,
                    },
                    medicalPrescriptionFilter: {
                        patientId: isHovered.id,
                        status: "Active",
                    },
                    page: { page: 1, size: 5 },
                },
            });
        }
    }, [isHovered]);
    var appointmentsLength = (_c = (_b = searchItemDetailsQuery[1].data) === null || _b === void 0 ? void 0 : _b.appointments.edges.length) !== null && _c !== void 0 ? _c : 0;
    var medicalPrescriptionsLength = (_e = (_d = searchItemDetailsQuery[1].data) === null || _d === void 0 ? void 0 : _d.searchMedicalPrescriptions.edges.length) !== null && _e !== void 0 ? _e : 0;
    return (_jsxs("div", { children: [_jsx("p", __assign({ className: "text-gray-600 text-lg font-semibold" }, { children: "Patients" })), patients === null || patients === void 0 ? void 0 : patients.map(function (e) {
                var _a, _b, _c;
                return (_jsx("div", __assign({ onMouseDown: function (evt) {
                        //evt.stopPropagation();
                        onClick(e);
                    }, onMouseEnter: function () {
                        debouncedHandleMouseEnter(e === null || e === void 0 ? void 0 : e.id);
                    }, onMouseLeave: function () {
                        handlOnMouseLeave();
                    } }, { children: _jsx("div", __assign({ role: "menu", "area-orientation": "vertical", "area-labelledby": "header-search" }, { children: _jsxs("div", __assign({ className: "mt-3 bg-gray-50 rounded-lg cursor-pointer group hover:bg-gray-600 hover:text-white" }, { children: [_jsxs("div", __assign({ className: "flex px-3 py-3 items-center " }, { children: [_jsxs("div", __assign({ className: "flex flex-grow" }, { children: [_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) })), _jsxs("div", __assign({ className: "flex-col ml-4" }, { children: [_jsx("p", __assign({ className: "text-lg text-gray-900 group-hover:text-white font-bold" }, { children: "".concat(e === null || e === void 0 ? void 0 : e.firstName, " ").concat(e === null || e === void 0 ? void 0 : e.lastName) })), _jsx("p", __assign({ className: "text-sm text-gray-500 group-hover:text-gray-100" }, { children: e === null || e === void 0 ? void 0 : e.phoneNo }))] }))] })), _jsx("div", { children: _jsx("p", __assign({ className: "font-semibold group-hover:text-white" }, { children: e === null || e === void 0 ? void 0 : e.id })) })] })), isHovered.id === (e === null || e === void 0 ? void 0 : e.id) && searchItemDetailsQuery[1].loading && (_jsx("div", __assign({ className: "pl-14 pr-4 pb-5" }, { children: _jsx(ReactLoading, { type: "cylon", color: "white", height: 30, width: 30, className: "inline-block" }) }))), isHovered.id === (e === null || e === void 0 ? void 0 : e.id) &&
                                    (appointmentsLength > 0 || medicalPrescriptionsLength > 0) && (_jsxs("div", __assign({ className: "pl-14 pr-4 pb-5" }, { children: [_jsx("hr", {}), appointmentsLength > 0 && (_jsxs("div", __assign({ className: "mt-2" }, { children: [_jsx("p", __assign({ className: "font-light" }, { children: "Appointments" })), _jsx("div", { className: "mt-2" }), _jsx("div", __assign({ className: "pl-10 " }, { children: _jsx(SearchBarAppointments, { appointments: (_a = searchItemDetailsQuery[1].data) === null || _a === void 0 ? void 0 : _a.appointments.edges.map(function (e) { return e === null || e === void 0 ? void 0 : e.node; }), currentDateTime: parseISO((_b = searchItemDetailsQuery[1].data) === null || _b === void 0 ? void 0 : _b.currentDateTime) }) }))] }))), medicalPrescriptionsLength > 0 && (_jsxs("div", __assign({ className: "mt-2" }, { children: [_jsx("p", __assign({ className: "font-light mt-2" }, { children: "Medications" })), _jsx("div", { className: "mt-2" }), _jsx("div", __assign({ className: "pl-10 " }, { children: _jsx(SearchBarMedications, { medicalPrescriptions: (_c = searchItemDetailsQuery[1].data) === null || _c === void 0 ? void 0 : _c.searchMedicalPrescriptions.edges.map(function (e) { return e === null || e === void 0 ? void 0 : e.node; }) }) }))] })))] })))] })) })) }), e === null || e === void 0 ? void 0 : e.id));
            })] }));
}
function ProviderResults(_a) {
    var providers = _a.providers, onClick = _a.onClick;
    return (_jsxs("div", { children: [_jsx("p", __assign({ className: "text-gray-600 text-lg font-semibold" }, { children: "Doctors" })), providers === null || providers === void 0 ? void 0 : providers.map(function (e) { return (_jsx("div", __assign({ onMouseDown: function (evt) {
                    onClick(e);
                } }, { children: _jsx("div", __assign({ role: "menu", "area-orientation": "vertical", "area-labelledby": "header-search" }, { children: _jsx("div", __assign({ className: "mt-3" }, { children: _jsxs("div", __assign({ className: "flex px-3 py-3 bg-gray-100 rounded-lg cursor-pointer items-center group hover:bg-teal-400 hover:text-white" }, { children: [_jsxs("div", __assign({ className: "flex flex-grow" }, { children: [_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) })), _jsx("div", __assign({ className: "flex-col ml-4" }, { children: _jsx("p", __assign({ className: "text-lg text-gray-900 group-hover:text-white font-bold" }, { children: "Dr. ".concat(e === null || e === void 0 ? void 0 : e.firstName, " ").concat(e === null || e === void 0 ? void 0 : e.lastName) })) }))] })), _jsx("div", {})] })) })) })) }), e === null || e === void 0 ? void 0 : e.id)); })] }));
}
function SearchBarAppointments(props) {
    var appointments = props.appointments;
    return (_jsx("table", __assign({ className: "w-full table text-sm border-l border-teal-500" }, { children: _jsx("tbody", __assign({ className: "divide-y divide-gray-200" }, { children: appointments === null || appointments === void 0 ? void 0 : appointments.map(function (e) {
                var _a, _b, _c, _d;
                return (_jsxs("tr", { children: [_jsx("td", __assign({ className: "px-4 py-3" }, { children: e === null || e === void 0 ? void 0 : e.visitType.title })), _jsx("td", __assign({ className: "px-4 py-3" }, { children: format(parseISO(e === null || e === void 0 ? void 0 : e.checkInTime.split("T")[0]), "MMM d, y") })), _jsx("td", __assign({ className: "px-4 py-3" }, { children: "Dr. ".concat(e === null || e === void 0 ? void 0 : e.providerName) })), _jsx("td", __assign({ className: "px-4 py-3" }, { children: _jsx("span", __assign({ className: classnames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                    "bg-yellow-100 text-yellow-800": ((_a = e === null || e === void 0 ? void 0 : e.appointmentStatus) === null || _a === void 0 ? void 0 : _a.title) === "Scheduled online" ||
                                        "Scheduled",
                                }, {
                                    "bg-green-100 text-green-800": ((_b = e === null || e === void 0 ? void 0 : e.appointmentStatus) === null || _b === void 0 ? void 0 : _b.title) === "Checked-In",
                                }, {
                                    "bg-red-100 text-red-800": ((_c = e === null || e === void 0 ? void 0 : e.appointmentStatus) === null || _c === void 0 ? void 0 : _c.title) === "Checked-Out",
                                }) }, { children: (_d = e === null || e === void 0 ? void 0 : e.appointmentStatus) === null || _d === void 0 ? void 0 : _d.title })) }))] }, e === null || e === void 0 ? void 0 : e.id));
            }) })) })));
}
function SearchBarMedications(props) {
    var medicalPrescriptions = props.medicalPrescriptions;
    return (_jsx("table", __assign({ className: "w-full table text-sm border-l border-teal-500" }, { children: _jsx("tbody", __assign({ className: "divide-y divide-gray-200" }, { children: medicalPrescriptions === null || medicalPrescriptions === void 0 ? void 0 : medicalPrescriptions.map(function (e) { return (_jsxs("tr", { children: [_jsx("td", __assign({ className: "px-4 py-3" }, { children: e === null || e === void 0 ? void 0 : e.medication })), _jsx("td", __assign({ className: "px-4 py-3" }, { children: e === null || e === void 0 ? void 0 : e.sig })), _jsx("td", __assign({ className: "px-4 py-3" }, { children: format(parseISO(e === null || e === void 0 ? void 0 : e.prescribedDate), "MMM d, y") }))] }, e === null || e === void 0 ? void 0 : e.id)); }) })) })));
}
export default HeaderSearchBar;
var templateObject_1, templateObject_2;
