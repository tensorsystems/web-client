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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatDate } from "@tensoremr/util";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useBottomSheetDispatch, useNotificationDispatch } from "@tensoremr/components";
import { format, getDay, parseISO } from "date-fns";
import classnames from "classnames";
import _ from "lodash";
import { SHOULD_PAY_FOR_CONSULTATION } from "@tensoremr/api";
var APPOINTMENT_LOOKUPS = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query AppointmentLookups($page: PaginationInput!, $userTypeTitle: String!) {\n    rooms(page: $page) {\n      totalCount\n      edges {\n        node {\n          id\n          title\n        }\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n\n    visitTypes(page: $page) {\n      totalCount\n      edges {\n        node {\n          id\n          title\n        }\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n\n    consultationBillings {\n      id\n      item\n      code\n      price\n      credit\n      remark\n    }\n\n    appointmentStatuses(page: $page) {\n      totalCount\n      edges {\n        node {\n          id\n          title\n        }\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n\n    getByUserTypeTitle(input: $userTypeTitle) {\n      id\n      firstName\n      lastName\n    }\n  }\n"], ["\n  query AppointmentLookups($page: PaginationInput!, $userTypeTitle: String!) {\n    rooms(page: $page) {\n      totalCount\n      edges {\n        node {\n          id\n          title\n        }\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n\n    visitTypes(page: $page) {\n      totalCount\n      edges {\n        node {\n          id\n          title\n        }\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n\n    consultationBillings {\n      id\n      item\n      code\n      price\n      credit\n      remark\n    }\n\n    appointmentStatuses(page: $page) {\n      totalCount\n      edges {\n        node {\n          id\n          title\n        }\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n\n    getByUserTypeTitle(input: $userTypeTitle) {\n      id\n      firstName\n      lastName\n    }\n  }\n"])));
var GET_APPOINTMENT = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query GetAppointment($id: ID!) {\n    appointment(id: $id) {\n      id\n      checkInTime\n      checkedInTime\n      credit\n      userId\n      visitType {\n        id\n      }\n      room {\n        id\n      }\n    }\n  }\n"], ["\n  query GetAppointment($id: ID!) {\n    appointment(id: $id) {\n      id\n      checkInTime\n      checkedInTime\n      credit\n      userId\n      visitType {\n        id\n      }\n      room {\n        id\n      }\n    }\n  }\n"])));
var SEARCH_APPOINTMENTS = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  query SearchAppointments(\n    $input: AppointmentSearchInput!\n    $page: PaginationInput!\n  ) {\n    searchAppointments(input: $input, page: $page) {\n      totalCount\n      pageInfo {\n        totalPages\n      }\n      edges {\n        node {\n          id\n          providerName\n          checkInTime\n          checkedInTime\n          checkedOutTime\n          patient {\n            id\n            firstName\n            lastName\n            phoneNo\n          }\n          room {\n            id\n            title\n          }\n          visitType {\n            id\n            title\n          }\n          appointmentStatus {\n            id\n            title\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query SearchAppointments(\n    $input: AppointmentSearchInput!\n    $page: PaginationInput!\n  ) {\n    searchAppointments(input: $input, page: $page) {\n      totalCount\n      pageInfo {\n        totalPages\n      }\n      edges {\n        node {\n          id\n          providerName\n          checkInTime\n          checkedInTime\n          checkedOutTime\n          patient {\n            id\n            firstName\n            lastName\n            phoneNo\n          }\n          room {\n            id\n            title\n          }\n          visitType {\n            id\n            title\n          }\n          appointmentStatus {\n            id\n            title\n          }\n        }\n      }\n    }\n  }\n"])));
export var SAVE_APPOINTMENT = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  mutation SaveAppointment($input: AppointmentInput!) {\n    newAppointment(input: $input) {\n      id\n    }\n  }\n"], ["\n  mutation SaveAppointment($input: AppointmentInput!) {\n    newAppointment(input: $input) {\n      id\n    }\n  }\n"])));
var GET_PATIENT = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  query GetPatient($id: ID!) {\n    patient(id: $id) {\n      id\n      firstName\n      lastName\n    }\n  }\n"], ["\n  query GetPatient($id: ID!) {\n    patient(id: $id) {\n      id\n      firstName\n      lastName\n    }\n  }\n"])));
var GET_PATIENT_ENCOUNTER_LIMIT = gql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  query PatientEncounterLimit($userId: ID!) {\n    patientEncounterLimitByUser(userId: $userId) {\n      id\n      userId\n      mondayLimit\n      tuesdayLimit\n      wednesdayLimit\n      thursdayLimit\n      fridayLimit\n      saturdayLimit\n      sundayLimit\n      overbook\n    }\n  }\n"], ["\n  query PatientEncounterLimit($userId: ID!) {\n    patientEncounterLimitByUser(userId: $userId) {\n      id\n      userId\n      mondayLimit\n      tuesdayLimit\n      wednesdayLimit\n      thursdayLimit\n      fridayLimit\n      saturdayLimit\n      sundayLimit\n      overbook\n    }\n  }\n"])));
var UPDATE_APPOINTMENT = gql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  mutation UpdateAppointment($input: AppointmentUpdateInput!) {\n    updateAppointment(input: $input) {\n      id\n    }\n  }\n"], ["\n  mutation UpdateAppointment($input: AppointmentUpdateInput!) {\n    updateAppointment(input: $input) {\n      id\n    }\n  }\n"])));
export var AppointmentForm = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    var defaultValues = _a.defaultValues, patientId = _a.patientId, updateId = _a.updateId, onSuccess = _a.onSuccess, onCancel = _a.onCancel;
    var paginationInput = useState({
        page: 1,
        size: 1000,
    })[0];
    var _q = useForm({
        defaultValues: defaultValues,
    }), register = _q.register, handleSubmit = _q.handleSubmit, setValue = _q.setValue, watch = _q.watch, reset = _q.reset;
    var _r = useState(-1), dailyLimit = _r[0], setDailyLimit = _r[1];
    var appointmentInput = watch();
    var bottomSheetDispatch = useBottomSheetDispatch();
    var notifDispatch = useNotificationDispatch();
    var _s = useState(true), shouldPayForConsultation = _s[0], setShouldPayForConsultation = _s[1];
    useEffect(function () {
        setDefaultOrganizationDetails();
    }, []);
    var setDefaultOrganizationDetails = function () {
        var organizationDetailsSession = sessionStorage.getItem("organizationDetails");
        if (organizationDetailsSession) {
            var organizationDetails = JSON.parse(organizationDetailsSession);
            if (organizationDetails.defaultMedicalDepartment === "General Medicine") {
                setValue("medicalDepartment", "General Medicine");
            }
            else if (organizationDetails.defaultMedicalDepartment === "Ophthalmology") {
                setValue("medicalDepartment", "Ophthalmology");
            }
            else {
                setValue("medicalDepartment", "General Medicine");
            }
        }
    };
    var _t = useMutation(SAVE_APPOINTMENT, {
        onCompleted: function (data) {
            var _a, _b;
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "".concat((_a = patientQuery.data) === null || _a === void 0 ? void 0 : _a.patient.firstName, " ").concat((_b = patientQuery.data) === null || _b === void 0 ? void 0 : _b.patient.lastName, " has been scheduled successfully"),
                variant: "success",
            });
            bottomSheetDispatch({ type: "hide" });
            onSuccess();
        },
        onError: function (error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    }), save = _t[0], result = _t[1];
    var updateMutation = useMutation(UPDATE_APPOINTMENT, {
        onCompleted: function (data) {
            var _a, _b;
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "".concat((_a = patientQuery.data) === null || _a === void 0 ? void 0 : _a.patient.firstName, " ").concat((_b = patientQuery.data) === null || _b === void 0 ? void 0 : _b.patient.lastName, " has been scheduled successfully"),
                variant: "success",
            });
            bottomSheetDispatch({ type: "hide" });
            onSuccess();
        },
        onError: function (error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    var lookupQuery = useQuery(APPOINTMENT_LOOKUPS, {
        variables: {
            page: paginationInput,
            userTypeTitle: "Physician",
            patientId: patientId,
        },
    });
    var shouldPayForConsultationQuery = useLazyQuery(SHOULD_PAY_FOR_CONSULTATION, {
        fetchPolicy: "network-only",
    });
    useEffect(function () {
        if (appointmentInput.checkInTime) {
            shouldPayForConsultationQuery[0]({
                variables: {
                    patientId: patientId,
                    date: new Date(appointmentInput.checkInTime),
                },
            });
        }
    }, [appointmentInput.checkInTime]);
    useEffect(function () {
        var _a;
        if (shouldPayForConsultationQuery[1].called) {
            if ((_a = shouldPayForConsultationQuery[1].data) === null || _a === void 0 ? void 0 : _a.payForConsultation) {
                setShouldPayForConsultation(true);
            }
            else {
                setShouldPayForConsultation(false);
            }
        }
    }, [(_b = shouldPayForConsultationQuery[1].data) === null || _b === void 0 ? void 0 : _b.payForConsultation]);
    var patientQuery = useQuery(GET_PATIENT, {
        variables: { id: patientId },
    });
    var patientEncounterLimitQuery = useLazyQuery(GET_PATIENT_ENCOUNTER_LIMIT, {
        fetchPolicy: "network-only"
    });
    var patientEncounterLimit = (_c = patientEncounterLimitQuery[1].data) === null || _c === void 0 ? void 0 : _c.patientEncounterLimitByUser;
    var providerAppointmentsQuery = useLazyQuery(SEARCH_APPOINTMENTS, {
        fetchPolicy: "network-only"
    });
    useEffect(function () {
        if (appointmentInput.userId && appointmentInput.checkInTime) {
            providerAppointmentsQuery[0]({
                variables: {
                    page: { page: 0, size: 100 },
                    input: {
                        userId: appointmentInput.userId,
                        checkInTime: new Date(appointmentInput.checkInTime),
                    },
                },
            });
            patientEncounterLimitQuery[0]({
                variables: {
                    userId: appointmentInput.userId,
                },
            });
        }
    }, [appointmentInput.userId, appointmentInput.checkInTime]);
    var appointmentQuery = useLazyQuery(GET_APPOINTMENT, {
        fetchPolicy: "network-only",
    });
    useEffect(function () {
        if (updateId !== undefined) {
            appointmentQuery[0]({
                variables: { id: updateId },
            }).then(function (result) {
                var _a;
                var appointment = (_a = result.data) === null || _a === void 0 ? void 0 : _a.appointment;
                if (appointment) {
                    reset({
                        userId: appointment.userId,
                        roomId: appointment.room.id.toString(),
                        visitTypeId: appointment.visitType.id.toString(),
                        checkInTime: format(parseISO(appointment.checkInTime), "yyyy-MM-dd'T'HH:mm"),
                    });
                    setDefaultOrganizationDetails();
                }
            });
        }
    }, [updateId]);
    useEffect(function () {
        if (appointmentInput.checkInTime && patientEncounterLimit) {
            var checkInTime = parseISO(appointmentInput.checkInTime);
            var day = getDay(checkInTime);
            switch (day) {
                case 0:
                    setDailyLimit(patientEncounterLimit.sundayLimit);
                    break;
                case 1:
                    setDailyLimit(patientEncounterLimit.mondayLimit);
                    break;
                case 2:
                    setDailyLimit(patientEncounterLimit.tuesdayLimit);
                    break;
                case 3:
                    setDailyLimit(patientEncounterLimit.wednesdayLimit);
                    break;
                case 4:
                    setDailyLimit(patientEncounterLimit.thursdayLimit);
                    break;
                case 5:
                    setDailyLimit(patientEncounterLimit.fridayLimit);
                    break;
                case 6:
                    setDailyLimit(patientEncounterLimit.saturdayLimit);
                    break;
            }
        }
    }, [appointmentInput.checkInTime, patientEncounterLimit]);
    var handleCheckInTimeChange = function () {
        if (updateId !== undefined) {
            appointmentQuery[1].refetch();
        }
    };
    var onSubmit = function (input) {
        var _a;
        input.patientId = (_a = patientQuery.data) === null || _a === void 0 ? void 0 : _a.patient.id;
        input.checkInTime = formatDate(input.checkInTime);
        input.credit = false;
        input.emergency = input.emergency === "true";
        if (updateId !== undefined) {
            var updateInput = input;
            updateInput.id = updateId;
            updateMutation[0]({
                variables: { input: updateInput },
            });
        }
        else {
            save({ variables: { input: input } });
        }
    };
    var providerAppointments = (_d = providerAppointmentsQuery[1].data) === null || _d === void 0 ? void 0 : _d.searchAppointments;
    var scheduledToday = (_e = providerAppointments === null || providerAppointments === void 0 ? void 0 : providerAppointments.totalCount) !== null && _e !== void 0 ? _e : 0;
    var overbook = (_f = patientEncounterLimit === null || patientEncounterLimit === void 0 ? void 0 : patientEncounterLimit.overbook) !== null && _f !== void 0 ? _f : 0;
    var bookingLeft = dailyLimit - scheduledToday;
    var overbooked = dailyLimit < scheduledToday && scheduledToday < dailyLimit + overbook;
    var fullyBooked = scheduledToday >= dailyLimit + overbook;
    var isCheckedIn = !_.isEmpty((_g = appointmentQuery[1].data) === null || _g === void 0 ? void 0 : _g.appointment.checkedInTime);
    var showProviderStats = appointmentInput.userId !== undefined &&
        appointmentInput.userId.length > 0 &&
        appointmentInput.checkInTime !== undefined &&
        appointmentInput.checkInTime.length > 0;
    return (_jsx("div", __assign({ className: "container mx-auto w-1/2" }, { children: _jsxs("form", __assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("div", __assign({ className: "float-right" }, { children: _jsx("button", __assign({ onClick: onCancel }, { children: _jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })) })) })), _jsx("p", __assign({ className: "text-xl font-extrabold text-gray-800" }, { children: "Scheduling ".concat((_h = patientQuery.data) === null || _h === void 0 ? void 0 : _h.patient.firstName, " ").concat((_j = patientQuery.data) === null || _j === void 0 ? void 0 : _j.patient.lastName) })), _jsx("p", __assign({ className: "text-gray-500" }, { children: (_k = patientQuery.data) === null || _k === void 0 ? void 0 : _k.patient.id })), _jsxs("div", __assign({ className: "mt-8" }, { children: [_jsxs("div", __assign({ className: "mt-4" }, { children: [_jsx("label", __assign({ htmlFor: "emergency", className: "block text-sm font-medium text-gray-700" }, { children: "Emergency" })), _jsxs("select", __assign({ required: true, id: "emergency", name: "emergency", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", __assign({ value: "false" }, { children: "No" })), _jsx("option", __assign({ value: "true" }, { children: "Yes" }))] }))] })), _jsxs("div", __assign({ className: "mt-4" }, { children: [_jsx("label", __assign({ htmlFor: "checkInTime", className: "block text-sm font-medium text-gray-700" }, { children: "Check-In time" })), _jsx("input", { required: true, type: "datetime-local", name: "checkInTime", id: "checkInTime", ref: register({ required: true }), onChange: function () { return handleCheckInTimeChange(); }, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" })] })), _jsxs("div", __assign({ className: "mt-4" }, { children: [_jsx("label", __assign({ htmlFor: "provider", className: "block text-sm font-medium text-gray-700" }, { children: "Provider" })), _jsxs("select", __assign({ id: "userId", name: "userId", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", { value: undefined }), (_l = lookupQuery.data) === null || _l === void 0 ? void 0 : _l.getByUserTypeTitle.map(function (e) { return (_jsx("option", __assign({ value: e === null || e === void 0 ? void 0 : e.id }, { children: "Dr. ".concat(e === null || e === void 0 ? void 0 : e.firstName, " ").concat(e === null || e === void 0 ? void 0 : e.lastName) }), e === null || e === void 0 ? void 0 : e.id)); })] }))] })), showProviderStats && (_jsxs("div", __assign({ className: "mt-2" }, { children: [!overbooked && !fullyBooked && (_jsx("p", __assign({ className: "text-green-600 font-semibold" }, { children: "".concat(scheduledToday, " scheduled on this day, ").concat(bookingLeft, " left") }))), overbooked && !fullyBooked && (_jsx("p", __assign({ className: "text-yellow-500 font-semibold" }, { children: "Provider is overbooked with ".concat(scheduledToday, " patients") }))), fullyBooked && (_jsx("p", __assign({ className: "text-red-500 font-semibold" }, { children: "Provider is fully booked with ".concat(scheduledToday, " patients") })))] }))), _jsxs("div", __assign({ className: "mt-4" }, { children: [_jsx("label", __assign({ htmlFor: "roomId", className: "block text-sm font-medium text-gray-700" }, { children: "Room" })), _jsx("select", __assign({ id: "roomId", name: "roomId", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: (_m = lookupQuery.data) === null || _m === void 0 ? void 0 : _m.rooms.edges.map(function (e) { return (_jsx("option", __assign({ value: e === null || e === void 0 ? void 0 : e.node.id }, { children: e === null || e === void 0 ? void 0 : e.node.title }), e === null || e === void 0 ? void 0 : e.node.id)); }) }))] })), _jsxs("div", __assign({ className: "mt-4" }, { children: [_jsx("label", __assign({ htmlFor: "visitTypeId", className: "block text-sm font-medium text-gray-700" }, { children: "Visit Type" })), _jsx("select", __assign({ id: "visitTypeId", name: "visitTypeId", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: (_o = lookupQuery.data) === null || _o === void 0 ? void 0 : _o.visitTypes.edges.map(function (e) { return (_jsx("option", __assign({ value: e === null || e === void 0 ? void 0 : e.node.id }, { children: e === null || e === void 0 ? void 0 : e.node.title }), e === null || e === void 0 ? void 0 : e.node.id)); }) }))] })), _jsxs("div", __assign({ className: "mt-4" }, { children: [_jsx("label", __assign({ htmlFor: "medicalDepartment", className: "block text-sm font-medium text-gray-700" }, { children: "Medical Department" })), _jsxs("select", __assign({ required: true, id: "medicalDepartment", name: "medicalDepartment", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", __assign({ value: "General Medicine" }, { children: "General Medicine" })), _jsx("option", __assign({ value: "Ophthalmology" }, { children: "Ophthalmology" }))] }))] })), shouldPayForConsultation && (_jsxs("div", __assign({ className: "mt-4" }, { children: [_jsxs("div", { children: [_jsx("label", __assign({ htmlFor: "billingId", className: "block text-sm font-medium text-gray-700" }, { children: "Billing" })), _jsx("select", __assign({ id: "billingId", name: "billingId", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: (_p = lookupQuery.data) === null || _p === void 0 ? void 0 : _p.consultationBillings.map(function (e) { return (_jsx("option", __assign({ value: e === null || e === void 0 ? void 0 : e.id }, { children: "".concat(e === null || e === void 0 ? void 0 : e.item, " (").concat(e === null || e === void 0 ? void 0 : e.code, ") - ETB ").concat(e === null || e === void 0 ? void 0 : e.price) }), e === null || e === void 0 ? void 0 : e.id)); }) }))] }), _jsxs("div", __assign({ className: "mt-4" }, { children: [_jsx("label", __assign({ htmlFor: "invoiceNo", className: "block text-sm font-medium text-gray-700" }, { children: "Consultation Invoice" })), _jsx("input", { id: "invoiceNo", name: "invoiceNo", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" })] }))] }))), result.error && (_jsx("div", __assign({ className: "mt-4" }, { children: _jsxs("p", __assign({ className: "text-red-600" }, { children: ["Error: ", result === null || result === void 0 ? void 0 : result.error.message] })) }))), _jsx("div", __assign({ className: "py-3 mt-2 bg-gray-50 text-right" }, { children: _jsx("button", __assign({ type: "submit", disabled: fullyBooked || isCheckedIn, className: classnames("inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none", {
                                    "bg-gray-400": fullyBooked || isCheckedIn,
                                    "bg-teal-600 hover:bg-teal-700": !fullyBooked && !isCheckedIn,
                                }) }, { children: _jsx("span", __assign({ className: "ml-2" }, { children: "Schedule" })) })) }))] }))] })) })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
