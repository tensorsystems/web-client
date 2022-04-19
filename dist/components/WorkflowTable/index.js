import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { formatDistance, parseISO } from "date-fns";
import debounce from "lodash-es/debounce";
import { useCallback, useEffect, useState } from "react";
import { RssIcon } from "@heroicons/react/outline";
import Modal from "../Modal";
import { TablePagination } from "../TablePagination";
import { useNotificationDispatch } from "../../notification";
import "./index.css";
import cn from "classnames";
import { Menu, Transition } from "@headlessui/react";
const GET_APPOINTMENTS = gql `
  query GetUserAppointments(
    $page: PaginationInput!
    $searchTerm: String
    $visitType: String
    $subscriptions: Boolean
  ) {
    getUserAppointments(
      page: $page
      searchTerm: $searchTerm
      visitType: $visitType
      subscriptions: $subscriptions
    ) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          queueId
          queueName
          visitType {
            title
          }
          patient {
            id
            firstName
            lastName
          }
          patientChart {
            id
          }
          checkInTime
          checkedInTime
        }
      }
    }
  }
`;
const DELETE_FROM_QUEUE = gql `
  mutation DeleteFromQueue($patientQueueId: ID!, $appointmentId: ID!) {
    deleteFromQueue(
      patientQueueId: $patientQueueId
      appointmentId: $appointmentId
    ) {
      id
    }
  }
`;
export const WorkflowTable = ({ onAppointmentClick, }) => {
    var _a;
    const notifDispatch = useNotificationDispatch();
    const [showSubscriptions, setShowSubscriptions] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(searchTerm.length > 0);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [referralModel, setReferralModel] = useState({
        open: false,
        appointmentId: null,
    });
    const [visitType, setVisitType] = useState("All");
    const [deleteFromQueue, setDeleteFromQueue] = useState({
        openConfirmationDialog: false,
        confirmation: false,
        patientQueueId: undefined,
        appointmentId: undefined,
    });
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 20,
    });
    const { data, refetch } = useQuery(GET_APPOINTMENTS, {
        variables: {
            page: paginationInput,
            subscriptions: showSubscriptions,
            searchTerm: debouncedSearchTerm.length > 0 ? debouncedSearchTerm : undefined,
            visitType: visitType,
        },
        pollInterval: 10000,
    });
    useEffect(() => {
        if (deleteFromQueue.confirmation &&
            deleteFromQueue.patientQueueId &&
            deleteFromQueue.appointmentId) {
            removeFromQueue({
                variables: {
                    patientQueueId: deleteFromQueue.patientQueueId,
                    appointmentId: deleteFromQueue.appointmentId,
                },
            });
        }
    }, [deleteFromQueue]);
    useEffect(() => {
        refetch();
    }, [paginationInput, debouncedSearchTerm, showSubscriptions, visitType]);
    const [removeFromQueue] = useMutation(DELETE_FROM_QUEUE, {
        onCompleted(data) {
            setDeleteFromQueue({
                openConfirmationDialog: false,
                confirmation: false,
                patientQueueId: undefined,
                appointmentId: undefined,
            });
            refetch();
        },
        onError(error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.getUserAppointments.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePrevClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const debouncer = useCallback(debounce((_searchVal) => {
        setDebouncedSearchTerm(_searchVal);
    }, 1000), []);
    const handleDeletePatientQueue = (patientQueueId, appointmentId) => {
        setDeleteFromQueue({
            openConfirmationDialog: true,
            confirmation: false,
            patientQueueId,
            appointmentId,
        });
    };
    return (_jsxs("div", Object.assign({ className: "shadow  border-b border-gray-200 sm:rounded-lg" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center justify-between px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: [_jsx("p", { children: "Workflow" }, void 0),
                    _jsxs("div", Object.assign({ className: "flex justify-end space-x-4 items-center" }, { children: [_jsx("div", Object.assign({ className: "flex items-center justify-center z-10" }, { children: _jsx("div", Object.assign({ className: "relative inline-block text-left" }, { children: _jsx(Menu, { children: ({ open }) => (_jsxs(_Fragment, { children: [_jsx("span", Object.assign({ className: "rounded-md shadow-sm" }, { children: _jsxs(Menu.Button, Object.assign({ className: "inline-flex justify-center w-full px-4 py-1 shadow-sm bg-white text-gray-700 text-sm font-medium leading-5  transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-gray-500 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" }, { children: [_jsx("span", { children: visitType === "All" ? "All Visit Types" : visitType }, void 0),
                                                            _jsx("svg", Object.assign({ className: "w-5 h-5 ml-2 -mr-1", viewBox: "0 0 20 20", fill: "currentColor" }, { children: _jsx("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }, void 0) }), void 0)] }), void 0) }), void 0),
                                                _jsx(Transition, Object.assign({ show: open, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" }, { children: _jsx(Menu.Items, Object.assign({ static: true, className: "absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none px-2" }, { children: _jsxs("div", Object.assign({ className: "py-1" }, { children: [_jsx(Menu.Item, { children: _jsx("a", Object.assign({ href: "#", className: `${visitType === "All"
                                                                            ? "bg-teal-400 text-white"
                                                                            : "text-gray-700"} flex justify-between w-full px-3 py-2 text-sm leading-5 text-left hover:bg-teal-500 hover:text-white rounded-md`, onClick: () => setVisitType("All") }, { children: "All" }), void 0) }, void 0),
                                                                _jsx(Menu.Item, { children: _jsx("a", Object.assign({ href: "#", className: `${visitType === "Outpatient"
                                                                            ? "bg-teal-400 text-white"
                                                                            : "text-gray-700"} flex justify-between w-full px-3 py-2 text-sm leading-5 text-left hover:bg-teal-500 hover:text-white rounded-md`, onClick: () => setVisitType("Outpatient") }, { children: "Outpatient" }), void 0) }, void 0),
                                                                _jsx(Menu.Item, { children: _jsx("a", Object.assign({ href: "#", className: `${visitType === "Surgeries"
                                                                            ? "bg-teal-400 text-white"
                                                                            : "text-gray-700"} flex justify-between w-full px-3 py-2 text-sm leading-5 text-left hover:bg-teal-500 hover:text-white rounded-md`, onClick: () => setVisitType("Surgeries") }, { children: "Surgeries" }), void 0) }, void 0),
                                                                _jsx(Menu.Item, { children: _jsx("a", Object.assign({ href: "#", className: `${visitType === "Treatments"
                                                                            ? "bg-teal-400 text-white"
                                                                            : "text-gray-700"} flex justify-between w-full px-3 py-2 text-sm leading-5 text-left hover:bg-teal-500 hover:text-white rounded-md`, onClick: () => setVisitType("Treatments") }, { children: "Treatments" }), void 0) }, void 0),
                                                                _jsx(Menu.Item, { children: _jsx("a", Object.assign({ href: "#", className: `${visitType === "Post-Ops"
                                                                            ? "bg-teal-400 text-white"
                                                                            : "text-gray-700"} flex justify-between w-full px-3 py-2 text-sm leading-5 text-left hover:bg-teal-500 hover:text-white rounded-md`, onClick: () => setVisitType("Post-Ops") }, { children: "Post-Ops" }), void 0) }, void 0)] }), void 0) }), void 0) }), void 0)] }, void 0)) }, void 0) }), void 0) }), void 0),
                            _jsxs("button", Object.assign({ type: "button", className: cn("flex items-center space-x-1 px-1 py-1 rounded-md transform hover:scale-105 shadow-md", {
                                    "bg-teal-500 text-white ": showSubscriptions,
                                    "bg-gray-400 text-gray-100": !showSubscriptions,
                                }), onClick: () => setShowSubscriptions(!showSubscriptions) }, { children: [_jsx(RssIcon, { className: cn("h-5 w-auto", {}) }, void 0),
                                    _jsx("span", { children: showSubscriptions ? "Subscriptions" : "All Appointments" }, void 0)] }), void 0),
                            showSearch && (_jsx("input", { autoFocus: true, type: "search", placeholder: "Search", value: searchTerm, onChange: (evt) => {
                                    setSearchTerm(evt.target.value);
                                    debouncer(evt.target.value);
                                }, onBlur: () => setShowSearch(false), className: "px-2 py-1 border border-gray-200 rounded-md shadow-inner" }, void 0)),
                            !showSearch && (_jsx("button", Object.assign({ type: "button", onClick: () => setShowSearch(true) }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-5 w-5" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }, void 0) }), void 0) }), void 0))] }), void 0)] }), void 0),
            _jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsx("thead", { children: _jsxs("tr", Object.assign({ className: "bg-gray-100" }, { children: [_jsx("th", {}, void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Patient" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Visit Type" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Checked-In" }), void 0),
                                _jsx("th", { scope: "col", className: "px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, void 0)] }), void 0) }, void 0),
                    _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.getUserAppointments.edges.map((e) => {
                            var _a;
                            return (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 cursor-pointer" }, { children: [_jsx("td", Object.assign({ className: "queue-container shadow-inner  bg-teal-700" }, { children: _jsx("span", Object.assign({ className: "queue-text text-white font-bold tracking-wide text-sm" }, { children: e === null || e === void 0 ? void 0 : e.node.queueName }), void 0) }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4", onClick: () => {
                                            (e === null || e === void 0 ? void 0 : e.node) && onAppointmentClick(e.node);
                                        } }, { children: _jsxs("div", Object.assign({ className: "flex items-center" }, { children: [_jsx("div", Object.assign({ className: "flex-shrink-0 h-10 w-10" }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-10 w-10 text-gray-600" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0) }), void 0) }), void 0),
                                                _jsx("div", Object.assign({ className: "ml-4" }, { children: _jsx("div", Object.assign({ className: "text-sm font-medium text-gray-900" }, { children: `${e === null || e === void 0 ? void 0 : e.node.patient.firstName} ${e === null || e === void 0 ? void 0 : e.node.patient.lastName}` }), void 0) }), void 0)] }), void 0) }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-600", onClick: () => {
                                            (e === null || e === void 0 ? void 0 : e.node) && onAppointmentClick(e.node);
                                        } }, { children: _jsx("span", Object.assign({ className: "px-1 inline-flex leading-5" }, { children: (_a = e === null || e === void 0 ? void 0 : e.node.visitType) === null || _a === void 0 ? void 0 : _a.title }), void 0) }), void 0),
                                    _jsx("td", Object.assign({ onClick: () => {
                                            (e === null || e === void 0 ? void 0 : e.node) && onAppointmentClick(e.node);
                                        }, className: "px-6 py-4 text-sm text-gray-600" }, { children: _jsx("span", Object.assign({ className: "text-green-700" }, { children: (e === null || e === void 0 ? void 0 : e.node.checkedInTime) &&
                                                formatDistance(parseISO(e === null || e === void 0 ? void 0 : e.node.checkedInTime), new Date(), {
                                                    addSuffix: true,
                                                }) }), void 0) }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-600" }, { children: _jsx("button", Object.assign({ type: "button", onClick: () => e.node.queueId &&
                                                e.node.id &&
                                                handleDeletePatientQueue(e.node.queueId, e.node.id) }, { children: _jsx("span", Object.assign({ className: "material-icons hover:text-red-600 transform hover:scale-125" }, { children: "logout" }), void 0) }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                        }) }), void 0)] }), void 0),
            _jsx(TablePagination, { totalCount: (_a = data === null || data === void 0 ? void 0 : data.getUserAppointments.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePrevClick }, void 0),
            _jsx(Modal, { open: false, title: "Referral", description: _jsx("p", Object.assign({ className: "text-sm text-gray-500" }, { children: "This patient was referred to you by a provider. Would you like a blank page or prefer the notes automatically copied from the previous provider?" }), void 0), positive: "Blank Page", negative: "Copy Notes", onNegativeClick: () => { }, onPositiveClick: () => { }, onClose: () => { } }, void 0),
            _jsx(Modal, { open: deleteFromQueue.openConfirmationDialog, title: "Confirmation", description: _jsx("p", Object.assign({ className: "text-sm text-gray-500" }, { children: "Remove this patient from your queue?" }), void 0), positive: "Continue", negative: "Cancel", onNegativeClick: () => {
                    setDeleteFromQueue({
                        openConfirmationDialog: false,
                        confirmation: false,
                        patientQueueId: undefined,
                        appointmentId: undefined,
                    });
                }, onPositiveClick: () => {
                    setDeleteFromQueue(Object.assign(Object.assign({}, deleteFromQueue), { confirmation: true }));
                }, onClose: () => {
                    setDeleteFromQueue({
                        openConfirmationDialog: false,
                        confirmation: false,
                        patientQueueId: undefined,
                        appointmentId: undefined,
                    });
                } }, void 0)] }), void 0));
};
