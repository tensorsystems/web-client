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
import { Link } from "react-router-dom";
import classnames from "classnames";
import { gql, useQuery } from "@apollo/client";
import { fromJS, Map } from "immutable";
import { parseJwt } from "@tensoremr/util";
export var GET_NOTIFS = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query GetNotifs {\n    notifs {\n      diagnosticProcedureOrders\n      labOrders\n      treatmentOrders\n      surgicalOrders\n      referralOrders\n      followUpOrders\n      paymentWaivers\n    }\n  }\n"], ["\n  query GetNotifs {\n    notifs {\n      diagnosticProcedureOrders\n      labOrders\n      treatmentOrders\n      surgicalOrders\n      referralOrders\n      followUpOrders\n      paymentWaivers\n    }\n  }\n"])));
var ACCESS_TOKEN = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query AccessToken {\n    accessToken @client\n  }\n"], ["\n  query AccessToken {\n    accessToken @client\n  }\n"])));
export var Actionbar = function (_a) {
    var onPageSelect = _a.onPageSelect;
    var actions = fromJS([
        Map({
            title: "Home",
            cancellable: false,
            route: "/",
            match: ["/"],
            icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }))),
        }),
        Map({
            title: "Patient Queue",
            cancellable: true,
            route: "/patient-queue",
            match: ["/patient-queue"],
            icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }))),
        }),
        Map({
            title: "Messages",
            route: "/chats",
            cancellable: true,
            match: ["/chats"],
            icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }))),
        }),
    ]);
    var _b = useState(actions), pages = _b[0], setPages = _b[1];
    var handleClick = function (route) {
        onPageSelect(route);
    };
    var data = useQuery(GET_NOTIFS, {
        pollInterval: 10000,
    }).data;
    var accessTokenQuery = useQuery(ACCESS_TOKEN);
    useEffect(function () {
        var _a;
        var token = (_a = accessTokenQuery.data) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (token) {
            var claim = parseJwt(token);
            var newPages = pages;
            var newPatientsIdx = newPages.findIndex(function (e) {
                return (e === null || e === void 0 ? void 0 : e.get("title")) === "New patient";
            });
            var appointmentsIdx = newPages.findIndex(function (e) {
                return (e === null || e === void 0 ? void 0 : e.get("title")) === "Appointments";
            });
            var patientsIdx = newPages.findIndex(function (e) {
                return (e === null || e === void 0 ? void 0 : e.get("title")) === "Patients";
            });
            var diagnosticIdx_1 = newPages.findIndex(function (e) {
                return (e === null || e === void 0 ? void 0 : e.get("title")) === "Diagnostic orders";
            });
            var labIdx_1 = newPages.findIndex(function (e) { return (e === null || e === void 0 ? void 0 : e.get("title")) === "Lab orders"; });
            var treatmentIdx_1 = newPages.findIndex(function (e) { return (e === null || e === void 0 ? void 0 : e.get("title")) === "Treatment orders"; });
            var surgicalIdx_1 = newPages.findIndex(function (e) { return (e === null || e === void 0 ? void 0 : e.get("title")) === "Surgical orders"; });
            var followupIdx_1 = newPages.findIndex(function (e) { return (e === null || e === void 0 ? void 0 : e.get("title")) === "Follow-Up orders"; });
            var referralIdx_1 = newPages.findIndex(function (e) { return (e === null || e === void 0 ? void 0 : e.get("title")) === "Referrals"; });
            var adminIdx_1 = newPages.findIndex(function (e) { return (e === null || e === void 0 ? void 0 : e.get("title")) === "Admin"; });
            if (claim.UserType.includes("Receptionist")) {
                if (newPatientsIdx === -1) {
                    newPages = newPages.push(fromJS({
                        title: "New patient",
                        route: "/new-patient",
                        cancellable: true,
                        match: ["/new-patient"],
                        icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }) }))),
                    }));
                }
                if (patientsIdx !== -1) {
                    newPages = newPages.push(fromJS({
                        title: "Patients",
                        route: "/patients",
                        cancellable: true,
                        match: ["/patients", "/patients/:patientId"],
                        icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }) }))),
                    }));
                }
                if (diagnosticIdx_1 === -1) {
                    newPages = newPages.push(fromJS({
                        title: "Diagnostic orders",
                        route: "/diagnostic-orders?status=ORDERED",
                        cancellable: true,
                        match: ["/diagnostic-orders"],
                        icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" }) }))),
                    }));
                }
                if (labIdx_1 === -1) {
                    newPages = newPages.push(fromJS({
                        title: "Lab orders",
                        route: "/lab-orders?status=ORDERED",
                        cancellable: true,
                        match: ["/lab-orders"],
                        icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" }) }))),
                    }));
                }
                if (treatmentIdx_1 === -1) {
                    newPages = newPages.push(fromJS({
                        title: "Treatment orders",
                        route: "/treatment-orders?status=ORDERED",
                        cancellable: true,
                        match: ["/treatment-orders"],
                        icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" }) }))),
                    }));
                }
                if (surgicalIdx_1 === -1) {
                    newPages = newPages.push(fromJS({
                        title: "Surgical orders",
                        route: "/surgical-orders?status=ORDERED",
                        cancellable: true,
                        match: ["/surgical-orders"],
                        icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" }) }))),
                    }));
                }
                if (followupIdx_1 === -1) {
                    newPages = newPages.push(fromJS({
                        title: "Follow-Up orders",
                        route: "/followup-orders?status=ORDERED",
                        cancellable: true,
                        match: ["/followup-orders"],
                        icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" }) }))),
                    }));
                }
                if (referralIdx_1 === -1) {
                    newPages = newPages.push(fromJS({
                        title: "Referrals",
                        route: "/referrals",
                        cancellable: true,
                        match: ["/referrals"],
                        icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" }) }))),
                    }));
                }
            }
            if ((claim.UserType.includes("Receptionist") ||
                claim.UserType.includes("Admin") ||
                claim.UserType.includes("Nurse") ||
                claim.UserType.includes("Physician")) &&
                appointmentsIdx === -1) {
                newPages = newPages.push(fromJS({
                    title: "Appointments",
                    route: "/appointments",
                    cancellable: true,
                    match: [
                        "/appointments",
                        "/appointments/:appointmentId",
                        "/appointments/:appointmentId/patient-details",
                        "/appointments/:appointmentId/history",
                        "/appointments/:appointmentId/chief-complaints",
                        "/appointments/:appointmentId/past-medications-allergies",
                        "/appointments/:appointmentId/vital-signs",
                        "/appointments/:appointmentId/examination",
                        "/appointments/:appointmentId/diagnostics",
                        "/appointments/:appointmentId/labratory",
                        "/appointments/:appointmentId/pre-op",
                        "/appointments/:appointmentId/intra-op",
                        "/appointments/:appointmentId/tx-objective",
                        "/appointments/:appointmentId/diagnosis",
                        "/appointments/:appointmentId/differential-diagnosis",
                        "/appointments/:appointmentId/surgery",
                        "/appointments/:appointmentId/tx-plan",
                        "/appointments/:appointmentId/rx",
                        "/appointments/:appointmentId/referral",
                        "/appointments/:appointmentId/summary",
                    ],
                    icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }))),
                }));
            }
            if (adminIdx_1 === -1 && claim.UserType.includes("Admin")) {
                newPages = newPages.push(fromJS({
                    title: "Admin",
                    route: "/admin",
                    cancellable: true,
                    match: [
                        "/admin",
                        "/admin/organization-details",
                        "/admin/lookups",
                        "/admin/user-admin",
                        "/admin/payment-waiver",
                        "/admin/patient-encounter-limit",
                        "/admin/billings",
                        "/admin/hpi",
                        "/admin/diagnostic-procedures",
                        "/admin/surgical-procedures",
                        "/admin/treatment-types",
                        "/admin/labratory-types",
                        "/admin/supplies",
                        "/admin/pharmacies",
                        "/admin/eyewear-shops",
                    ],
                    icon: (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" }) }))),
                }));
            }
            if (data === null || data === void 0 ? void 0 : data.notifs) {
                newPages = newPages.withMutations(function (ctx) {
                    if (diagnosticIdx_1 !== -1) {
                        ctx.setIn([diagnosticIdx_1, "notifs"], data.notifs.diagnosticProcedureOrders);
                    }
                    if (labIdx_1 !== -1) {
                        ctx.setIn([labIdx_1, "notifs"], data.notifs.labOrders);
                    }
                    if (treatmentIdx_1 !== -1) {
                        ctx.setIn([treatmentIdx_1, "notifs"], data.notifs.treatmentOrders);
                    }
                    if (surgicalIdx_1 !== -1) {
                        ctx.setIn([surgicalIdx_1, "notifs"], data.notifs.surgicalOrders);
                    }
                    if (followupIdx_1 !== -1) {
                        ctx.setIn([followupIdx_1, "notifs"], data.notifs.followUpOrders);
                    }
                    if (referralIdx_1 !== -1) {
                        ctx.setIn([referralIdx_1, "notifs"], data.notifs.referralOrders);
                    }
                    if (adminIdx_1 !== -1) {
                        ctx.setIn([adminIdx_1, "notifs"], data.notifs.paymentWaivers);
                    }
                });
            }
            setPages(newPages);
        }
    }, [accessTokenQuery.data, data]);
    return (_jsx("div", __assign({ className: "bg-gray-200" }, { children: _jsx("header", __assign({ className: "bg-white shadow" }, { children: _jsx("div", __assign({ className: "mx-auto py-2 px-4 sm:px-6 lg:px-8" }, { children: _jsx("div", __assign({ className: "gap-2 w-full flex flex-wrap -m-1 my-1" }, { children: pages.toJS().map(function (e, i) { return (_jsx(Link, __assign({ to: e.route, onClick: function () { return handleClick(e.route); } }, { children: _jsx(Chip, { action: e }, i) }), e.route)); }) })) })) })) })));
};
var Chip = function (_a) {
    var action = _a.action;
    return (_jsxs("button", __assign({ className: classnames("flex space-x-2 items-center bg-gray-200 h-10 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 transform hover:scale-105", {
            "px-3": !action.notifs,
            "px-2": action.notifs,
        }) }, { children: [_jsxs("div", __assign({ className: "flex space-x-1 items-center" }, { children: [_jsx("div", { children: action.icon }), _jsx("div", { children: action.title })] })), action.notifs !== undefined && action.notifs !== 0 && (_jsx("div", __assign({ className: "bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center shadow-inner" }, { children: action.notifs })))] })));
};
var templateObject_1, templateObject_2;
