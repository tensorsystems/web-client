import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { format, parseISO } from "date-fns";
import classNames from "classnames";
import { PatientTabs } from "./PatientTabs";
import { AppointmentForm } from "../../components/AppointmentForm";
import { PatientBasicInfo } from "../../components/PatientBasicInfo";
import { PatientContactInfo } from "../../components/PatientContactInfo";
import { PatientEmergencyContactInfo } from "../../components/PatientEmergencyContactInfo";
import { parseJwt } from "../../util";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { PatientDocuments } from "../../components/PatientDocuments";
import { CalendarIcon, LoginIcon } from "@heroicons/react/outline";
import CheckInForm from "../../components/CheckInForm";
import PatientOrders from "./PatientOrders";
import { Tabs } from "../../components/Tabs";
import { TablePagination } from "../../components/TablePagination";
export const GET_DATA = gql `
  query Data(
    $patientId: ID!
    $appointmentSearchInput: AppointmentSearchInput!
    $page: PaginationInput!
    $checkedIn: Boolean!
  ) {
    patient(id: $patientId) {
      id
      firstName
      lastName
      dateOfBirth
      gender
      idNo
      occupation
      martialStatus
      memo
      phoneNo
      phoneNo2
      homePhone
      region
      credit
      creditCompany
      city
      subCity
      kebele
      woreda
      email
      houseNo
      emergencyContactRel
      emergencyContactName
      emergencyContactMemo
      emergencyContactPhone
      emergencyContactPhone2
      paperRecord
      cardNo
      paperRecordDocument {
        id
        contentType
        fileName
        extension
        hash
        size
      }
      documents {
        id
        contentType
        fileName
        extension
        hash
        size
      }
    }

    patientsAppointmentToday(patientId: $patientId, checkedIn: $checkedIn) {
      id
    }

    searchAppointments(input: $appointmentSearchInput, page: $page) {
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
          firstName
          lastName
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
export const PatientDetailsPage = ({ patientId, onUpdateTab, onAddPage }) => {
    var _a, _b;
    const match = useRouteMatch();
    const [tabValue, setTabValue] = useState("Appointments");
    const bottomSheetDispatch = useBottomSheetDispatch();
    const history = useHistory();
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 10,
    });
    const { data, loading, refetch } = useQuery(GET_DATA, {
        variables: {
            patientId: patientId,
            appointmentSearchInput: {
                patientId,
            },
            page: paginationInput,
            checkedIn: false,
        },
    });
    useEffect(() => {
        if ((data === null || data === void 0 ? void 0 : data.patient) && onUpdateTab) {
            const page = {
                title: `Patient - ${data.patient.firstName} ${data.patient.lastName}`,
                route: `/patients/${data.patient.id}`,
                icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }, void 0) }), void 0)),
            };
            onUpdateTab(page);
        }
    }, [data]);
    const handleAppointmentClick = (appointment) => {
        if (data === null || data === void 0 ? void 0 : data.patient) {
            const token = sessionStorage.getItem("accessToken");
            if (token !== null) {
                const claim = parseJwt(token);
                const userType = claim.UserType;
                if (userType.includes("Receptionist")) {
                    bottomSheetDispatch({
                        type: "show",
                        snapPoint: 1000,
                        children: (_jsx(AppointmentForm, { patientId: data === null || data === void 0 ? void 0 : data.patient.id, updateId: appointment.id, onSuccess: () => refetch(), onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                    });
                }
                else {
                    const page = {
                        title: `Appointment - ${appointment.firstName} ${appointment.lastName}`,
                        cancellable: true,
                        route: `/appointments/${appointment.id}/patient-dashboard`,
                        icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0) }), void 0)),
                    };
                    if (onAddPage) {
                        onAddPage(page);
                        history.push(`/appointments/${appointment.id}/patient-dashboard`);
                    }
                }
            }
        }
    };
    const handleEditClick = () => {
        history.push(`/update-patient?patientId=${data === null || data === void 0 ? void 0 : data.patient.id}`);
    };
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.searchAppointments.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    return (_jsxs("div", { children: [_jsx(PatientBasicInfo, { data: data === null || data === void 0 ? void 0 : data.patient, loading: loading, onEditClick: handleEditClick }, void 0),
            _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("ul", Object.assign({ className: "list-reset flex border-b" }, { children: _jsx(Tabs, { value: tabValue, onChange: (value) => setTabValue(value), tabs: PatientTabs }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "" }, { children: _jsxs(Switch, { children: [_jsx(Route, Object.assign({ path: `${match.path}/appointments` }, { children: _jsxs("div", Object.assign({ className: "bg-white p-4" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-4" }, { children: [_jsx("button", Object.assign({ type: "button", className: "bg-teal-700 hover:bg-teal-800 p-3 text-white rounded-md", onClick: () => {
                                                            if (data === null || data === void 0 ? void 0 : data.patient) {
                                                                bottomSheetDispatch({
                                                                    type: "show",
                                                                    snapPoint: 1000,
                                                                    children: (_jsx(AppointmentForm, { patientId: data === null || data === void 0 ? void 0 : data.patient.id, onSuccess: () => refetch(), onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                                                                });
                                                            }
                                                        } }, { children: _jsxs("div", Object.assign({ className: "flex items-center space-x-2 tracking-wide" }, { children: [_jsx(CalendarIcon, { className: "h-4 w-4" }, void 0),
                                                                _jsx("div", { children: "New appointment" }, void 0)] }), void 0) }), void 0),
                                                    ((_a = data === null || data === void 0 ? void 0 : data.patientsAppointmentToday) === null || _a === void 0 ? void 0 : _a.id.toString()) !== "0" && (_jsx("button", Object.assign({ type: "button", className: "bg-yellow-700 hover:bg-yellow-800 p-3 text-white rounded-md", onClick: () => {
                                                            if (data === null || data === void 0 ? void 0 : data.patientsAppointmentToday) {
                                                                bottomSheetDispatch({
                                                                    type: "show",
                                                                    snapPoint: 1000,
                                                                    children: (_jsx(CheckInForm, { appointmentId: data === null || data === void 0 ? void 0 : data.patientsAppointmentToday.id, onSuccess: () => {
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
                                                                                        }, onCancel: () => bottomSheetDispatch({
                                                                                            type: "hide",
                                                                                        }) }, void 0)),
                                                                                });
                                                                            }
                                                                        } }, void 0)),
                                                                });
                                                            }
                                                        } }, { children: _jsxs("div", Object.assign({ className: "flex items-center space-x-2 tracking-wide" }, { children: [_jsx(LoginIcon, { className: "h-4 w-4" }, void 0),
                                                                _jsx("div", { children: "Check-In Now" }, void 0)] }), void 0) }), void 0))] }), void 0),
                                            _jsxs("div", Object.assign({ className: "mt-6" }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200 shadow-lg" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Provider" }), void 0),
                                                                        _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Check In Date" }), void 0),
                                                                        _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Visit Type" }), void 0),
                                                                        _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Payment" }), void 0),
                                                                        _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Status" }), void 0)] }, void 0) }, void 0),
                                                            _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.searchAppointments.edges.map((e) => {
                                                                    var _a, _b, _c, _d, _e;
                                                                    return (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 cursor-pointer", onClick: () => {
                                                                            handleAppointmentClick(e === null || e === void 0 ? void 0 : e.node);
                                                                        } }, { children: [_jsxs("td", Object.assign({ className: "px-6 py-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm text-gray-900" }, { children: `Dr. ${e === null || e === void 0 ? void 0 : e.node.providerName}` }), void 0),
                                                                                    _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: e === null || e === void 0 ? void 0 : e.node.room.title }), void 0)] }), void 0),
                                                                            _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: format(parseISO(e === null || e === void 0 ? void 0 : e.node.checkInTime.split("T")[0]), "MMM d, y") }), void 0),
                                                                            _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.node.visitType.title }), void 0),
                                                                            _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: ((_a = e === null || e === void 0 ? void 0 : e.node.payments.length) !== null && _a !== void 0 ? _a : 0) > 0
                                                                                    ? `${e === null || e === void 0 ? void 0 : e.node.payments.map((p) => p === null || p === void 0 ? void 0 : p.billing.item).join(", ")} (${e === null || e === void 0 ? void 0 : e.node.payments.map((p) => p === null || p === void 0 ? void 0 : p.invoiceNo).join(", ")})`
                                                                                    : "" }), void 0),
                                                                            _jsx("td", Object.assign({ className: "px-6 py-4" }, { children: _jsx("span", Object.assign({ className: classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                                                        "bg-yellow-100 text-yellow-800": ((_b = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _b === void 0 ? void 0 : _b.title) ===
                                                                                            "Scheduled online" || "Scheduled",
                                                                                    }, {
                                                                                        "bg-green-100 text-green-800": ((_c = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _c === void 0 ? void 0 : _c.title) ===
                                                                                            "Checked-In",
                                                                                    }, {
                                                                                        "bg-red-100 text-red-800": ((_d = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _d === void 0 ? void 0 : _d.title) ===
                                                                                            "Checked-Out",
                                                                                    }) }, { children: (_e = e === null || e === void 0 ? void 0 : e.node.appointmentStatus) === null || _e === void 0 ? void 0 : _e.title }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                                                                }) }), void 0)] }), void 0),
                                                    _jsx(TablePagination, { totalCount: (_b = data === null || data === void 0 ? void 0 : data.searchAppointments.totalCount) !== null && _b !== void 0 ? _b : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0)] }), void 0) }), void 0),
                                _jsx(Route, Object.assign({ path: `${match.path}/orders` }, { children: (data === null || data === void 0 ? void 0 : data.patient.id) && (_jsx(PatientOrders, { patientId: data === null || data === void 0 ? void 0 : data.patient.id }, void 0)) }), void 0),
                                _jsx(Route, Object.assign({ path: `${match.path}/contact-information` }, { children: _jsx("div", Object.assign({ className: "bg-white p-4" }, { children: _jsx(PatientContactInfo, { data: data === null || data === void 0 ? void 0 : data.patient, loading: loading }, void 0) }), void 0) }), void 0),
                                _jsx(Route, Object.assign({ path: `${match.path}/emergency-contact` }, { children: _jsx("div", Object.assign({ className: "bg-white p-4" }, { children: _jsx(PatientEmergencyContactInfo, { data: data === null || data === void 0 ? void 0 : data.patient, loading: loading }, void 0) }), void 0) }), void 0),
                                _jsx(Route, Object.assign({ path: `${match.path}/documents` }, { children: _jsx("div", Object.assign({ className: "bg-white p-4" }, { children: _jsx(PatientDocuments, { data: data === null || data === void 0 ? void 0 : data.patient, loading: loading }, void 0) }), void 0) }), void 0)] }, void 0) }), void 0)] }), void 0)] }, void 0));
};
