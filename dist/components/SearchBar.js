import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useLazyQuery } from "@apollo/client";
import { parseISO } from "date-fns";
import { debounce } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBarAppointments from "./SearchBarAppointments";
import SearchBarMedications from "./SearchBarMedications";
import ReactLoading from "react-loading";
const SEARCH = gql `
  query SearchPatient($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      patients {
        id
        firstName
        lastName
        phoneNo
      }

      providers {
        id
        firstName
        lastName
      }
    }
  }
`;
export const SearchBar = ({ searchFocused, setSearchFocused, onAddPage, }) => {
    var _a, _b, _c, _d, _e, _f;
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const searchQuery = useLazyQuery(SEARCH);
    useEffect(() => {
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
    const debouncer = useCallback(debounce((_searchVal) => {
        setDebouncedSearchTerm(_searchVal);
    }, 500), []);
    const handlePatientClick = (patient) => {
        if (patient !== undefined) {
            setSearchFocused(false);
            setSearchTerm("");
            const page = {
                title: `Patient - ${patient === null || patient === void 0 ? void 0 : patient.firstName} ${patient === null || patient === void 0 ? void 0 : patient.lastName}`,
                cancellable: true,
                route: `/patients/${patient === null || patient === void 0 ? void 0 : patient.id}/appointments`,
                icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0) }), void 0)),
            };
            onAddPage(page);
            history.replace(`/patients/${patient === null || patient === void 0 ? void 0 : patient.id}/appointments`);
        }
    };
    const handleProviderClick = (user) => {
        setSearchFocused(false);
        setSearchTerm("");
        const page = {
            title: `Appointments`,
            cancellable: true,
            route: `/appointments?userId=${user.id}`,
            icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }, void 0) }), void 0)),
        };
        onAddPage(page);
        history.replace(`/appointments?userId=${user.id}`);
    };
    const hasPatients = ((_b = (_a = searchQuery[1].data) === null || _a === void 0 ? void 0 : _a.search.patients.length) !== null && _b !== void 0 ? _b : 0) > 0;
    const hasProviders = ((_d = (_c = searchQuery[1].data) === null || _c === void 0 ? void 0 : _c.search.providers.length) !== null && _d !== void 0 ? _d : 0) > 0;
    return (_jsxs("div", { children: [_jsx("div", Object.assign({ className: "relative z-20" }, { children: _jsx("input", { type: "search", className: "bg-gray-600 focus:bg-white focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-300 h-10 w-full px-4 rounded-md sm:text-sm block border-none", placeholder: "Search", "aria-haspopup": "listbox", "aria-expanded": "false", autoComplete: "off", value: searchTerm, onFocus: () => setSearchFocused(true), onBlur: () => {
                        setSearchFocused(false);
                        setSearchTerm("");
                    }, onChange: (evt) => {
                        setSearchTerm(evt.target.value);
                        debouncer(evt.target.value);
                    } }, void 0) }), void 0),
            searchQuery[1].loading && (_jsx("div", Object.assign({ className: "origin-top-left mt-4 absolute z-20 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-center py-10" }, { children: _jsx("p", Object.assign({ className: "text-gray-700 animate-pulse tracking-wider" }, { children: "Searching..." }), void 0) }), void 0)),
            (hasPatients || hasProviders) && searchFocused && (_jsxs("div", Object.assign({ className: "origin-top-left mt-4 absolute z-20 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4" }, { children: [hasPatients && (_jsx("div", { children: _jsx(PatientResults, { patients: (_e = searchQuery[1].data) === null || _e === void 0 ? void 0 : _e.search.patients, onClick: (e) => handlePatientClick(e) }, void 0) }, void 0)),
                    hasProviders && (_jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx(ProviderResults, { providers: (_f = searchQuery[1].data) === null || _f === void 0 ? void 0 : _f.search.providers, onClick: (e) => handleProviderClick(e) }, void 0) }), void 0))] }), void 0))] }, void 0));
};
const SEARCH_ITEM_DETAILS = gql `
  query SearchItemDetails(
    $appointmentFilter: AppointmentFilter
    $medicalPrescriptionFilter: MedicalPrescriptionFilter
    $page: PaginationInput!
  ) {
    appointments(filter: $appointmentFilter, page: $page) {
      totalCount
      edges {
        node {
          id
          checkInTime
          visitType {
            id
            title
          }
          appointmentStatus {
            id
            title
          }
          providerName
        }
      }
    }

    searchMedicalPrescriptions(
      filter: $medicalPrescriptionFilter
      page: $page
    ) {
      totalCount
      edges {
        node {
          id
          medication
          sig
          refill
          generic
          substitutionAllowed
          directionToPatient
          history
          status
          prescribedDate
        }
      }
    }

    currentDateTime
  }
`;
function PatientResults({ patients, onClick, }) {
    var _a, _b, _c, _d;
    const searchItemDetailsQuery = useLazyQuery(SEARCH_ITEM_DETAILS);
    const [isHovered, setIsHovered] = useState({ hovered: false, id: null });
    const debouncedHandleMouseEnter = debounce((hoverId) => setIsHovered({ hovered: true, id: hoverId }), 500);
    const handlOnMouseLeave = () => {
        setIsHovered({ hovered: false, id: null });
        debouncedHandleMouseEnter.cancel();
    };
    useEffect(() => {
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
    const appointmentsLength = (_b = (_a = searchItemDetailsQuery[1].data) === null || _a === void 0 ? void 0 : _a.appointments.edges.length) !== null && _b !== void 0 ? _b : 0;
    const medicalPrescriptionsLength = (_d = (_c = searchItemDetailsQuery[1].data) === null || _c === void 0 ? void 0 : _c.searchMedicalPrescriptions.edges.length) !== null && _d !== void 0 ? _d : 0;
    return (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-gray-600 text-lg font-semibold" }, { children: "Patients" }), void 0), patients === null || patients === void 0 ? void 0 : patients.map((e) => {
                var _a, _b, _c;
                return (_jsx("div", Object.assign({ onMouseDown: (evt) => {
                        onClick(e);
                    }, onMouseEnter: () => {
                        debouncedHandleMouseEnter(e === null || e === void 0 ? void 0 : e.id);
                    }, onMouseLeave: () => {
                        handlOnMouseLeave();
                    } }, { children: _jsx("div", Object.assign({ role: "menu", "area-orientation": "vertical", "area-labelledby": "header-search" }, { children: _jsxs("div", Object.assign({ className: "mt-3 bg-gray-50 rounded-lg cursor-pointer group hover:bg-gray-600 hover:text-white" }, { children: [_jsxs("div", Object.assign({ className: "flex px-3 py-3 items-center " }, { children: [_jsxs("div", Object.assign({ className: "flex flex-grow" }, { children: [_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0) }), void 0),
                                                _jsxs("div", Object.assign({ className: "flex-col ml-4" }, { children: [_jsx("p", Object.assign({ className: "text-lg text-gray-900 group-hover:text-white font-bold" }, { children: `${e === null || e === void 0 ? void 0 : e.firstName} ${e === null || e === void 0 ? void 0 : e.lastName}` }), void 0),
                                                        _jsx("p", Object.assign({ className: "text-sm text-gray-500 group-hover:text-gray-100" }, { children: e === null || e === void 0 ? void 0 : e.phoneNo }), void 0)] }), void 0)] }), void 0),
                                        _jsx("div", { children: _jsx("p", Object.assign({ className: "font-semibold group-hover:text-white" }, { children: e === null || e === void 0 ? void 0 : e.id }), void 0) }, void 0)] }), void 0),
                                isHovered.id === (e === null || e === void 0 ? void 0 : e.id) && searchItemDetailsQuery[1].loading && (_jsx("div", Object.assign({ className: "pl-14 pr-4 pb-5" }, { children: _jsx(ReactLoading, { type: "cylon", color: "white", height: 30, width: 30, className: "inline-block" }, void 0) }), void 0)),
                                isHovered.id === (e === null || e === void 0 ? void 0 : e.id) &&
                                    (appointmentsLength > 0 || medicalPrescriptionsLength > 0) && (_jsxs("div", Object.assign({ className: "pl-14 pr-4 pb-5" }, { children: [_jsx("hr", {}, void 0),
                                        appointmentsLength > 0 && (_jsxs("div", Object.assign({ className: "mt-2" }, { children: [_jsx("p", Object.assign({ className: "font-light" }, { children: "Appointments" }), void 0),
                                                _jsx("div", { className: "mt-2" }, void 0),
                                                _jsx("div", Object.assign({ className: "pl-10 " }, { children: _jsx(SearchBarAppointments, { appointments: (_a = searchItemDetailsQuery[1].data) === null || _a === void 0 ? void 0 : _a.appointments.edges.map((e) => e === null || e === void 0 ? void 0 : e.node), currentDateTime: parseISO((_b = searchItemDetailsQuery[1].data) === null || _b === void 0 ? void 0 : _b.currentDateTime) }, void 0) }), void 0)] }), void 0)),
                                        medicalPrescriptionsLength > 0 && (_jsxs("div", Object.assign({ className: "mt-2" }, { children: [_jsx("p", Object.assign({ className: "font-light mt-2" }, { children: "Medications" }), void 0),
                                                _jsx("div", { className: "mt-2" }, void 0),
                                                _jsx("div", Object.assign({ className: "pl-10 " }, { children: _jsx(SearchBarMedications, { medicalPrescriptions: (_c = searchItemDetailsQuery[1].data) === null || _c === void 0 ? void 0 : _c.searchMedicalPrescriptions.edges.map((e) => e === null || e === void 0 ? void 0 : e.node) }, void 0) }), void 0)] }), void 0))] }), void 0))] }), void 0) }), void 0) }), e === null || e === void 0 ? void 0 : e.id));
            })] }, void 0));
}
function ProviderResults({ providers, onClick, }) {
    return (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-gray-600 text-lg font-semibold" }, { children: "Doctors" }), void 0), providers === null || providers === void 0 ? void 0 : providers.map((e) => (_jsx("div", Object.assign({ onMouseDown: (evt) => {
                    onClick(e);
                } }, { children: _jsx("div", Object.assign({ role: "menu", "area-orientation": "vertical", "area-labelledby": "header-search" }, { children: _jsx("div", Object.assign({ className: "mt-3" }, { children: _jsxs("div", Object.assign({ className: "flex px-3 py-3 bg-gray-100 rounded-lg cursor-pointer items-center group hover:bg-teal-400 hover:text-white" }, { children: [_jsxs("div", Object.assign({ className: "flex flex-grow" }, { children: [_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0) }), void 0),
                                        _jsx("div", Object.assign({ className: "flex-col ml-4" }, { children: _jsx("p", Object.assign({ className: "text-lg text-gray-900 group-hover:text-white font-bold" }, { children: `Dr. ${e === null || e === void 0 ? void 0 : e.firstName} ${e === null || e === void 0 ? void 0 : e.lastName}` }), void 0) }), void 0)] }), void 0),
                                _jsx("div", {}, void 0)] }), void 0) }), void 0) }), void 0) }), e === null || e === void 0 ? void 0 : e.id)))] }, void 0));
}
