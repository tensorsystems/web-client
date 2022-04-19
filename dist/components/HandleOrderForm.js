import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import { Menu } from "@headlessui/react";
import { PencilIcon, SortAscendingIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useNotificationDispatch } from "../notification";
import MenuComponent from "./MenuComponent";
import classnames from "classnames";
const CONFIRM_PAYMENT = gql `
  mutation ConfirmPayment($id: ID!) {
    confirmPayment(id: $id) {
      id
    }
  }
`;
const CONFIRM_PAYMENT_BATCH = gql `
  mutation ConfirmPaymentBatch($ids: [ID!]!) {
    confirmPayments(ids: $ids)
  }
`;
const REQUEST_WAIVER = gql `
  mutation RequestPaymentWaiver($paymentId: ID!, $patientId: ID!) {
    requestPaymentWaiver(paymentId: $paymentId, patientId: $patientId) {
      id
    }
  }
`;
const REQUEST_WAIVER_BATCH = gql `
  mutation RequestPaymentWaivers($ids: [ID!]!, $patientId: ID!) {
    requestPaymentWaivers(ids: $ids, patientId: $patientId)
  }
`;
export const HandleOrderForm = ({ selectedOrder, onCancel, }) => {
    var _a, _b;
    const notifDispatch = useNotificationDispatch();
    const [order, setOrder] = useState(selectedOrder);
    const [errors, setErrors] = useState([]);
    const [confirmPayment, confirmPaymentResult] = useMutation(CONFIRM_PAYMENT, {
        onCompleted(data) {
            var _a, _b;
            const paymentId = data.confirmPayment.id;
            const paymentIdx = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.findIndex((e) => (e === null || e === void 0 ? void 0 : e.id) === paymentId);
            setOrder(Object.assign(Object.assign({}, order), { payments: [
                    ...order.payments.slice(0, paymentIdx),
                    Object.assign(Object.assign({}, order.payments[paymentIdx]), { status: "PAID" }),
                    ...(_b = order.payments) === null || _b === void 0 ? void 0 : _b.slice(paymentIdx + 1),
                ] }));
        },
        update: (cache, mutationResult) => {
            var _a;
            let payment = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.find((e) => (e === null || e === void 0 ? void 0 : e.id) === mutationResult.data.confirmPayment.id);
            if (payment) {
                cache.modify({
                    id: cache.identify(payment),
                    fields: {
                        status(cachedStatus) {
                            return "PAID";
                        },
                    },
                });
            }
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
    const [confirmPaymentBatch, confirmPaymentBatchResult] = useMutation(CONFIRM_PAYMENT_BATCH, {
        onCompleted(data) {
            const payments = order.payments;
            if (data.confirmPayments && payments.length > 0) {
                const newPayments = payments.map((e) => (Object.assign(Object.assign({}, e), { status: "PAID" })));
                setOrder(Object.assign(Object.assign({}, order), { payments: newPayments }));
            }
        },
        update: (cache, mutationResult) => {
            let payments = order.payments;
            if (mutationResult.data.confirmPayments && payments.length > 0) {
                payments.forEach((e) => {
                    cache.modify({
                        id: cache.identify(e),
                        fields: {
                            status(cachedStatus) {
                                return "PAID";
                            },
                        },
                    });
                });
            }
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
    const [requestWaiver, requestWaiverResult] = useMutation(REQUEST_WAIVER, {
        onCompleted(data) {
            var _a, _b;
            const paymentId = data.requestPaymentWaiver.id;
            const paymentIdx = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.findIndex((e) => (e === null || e === void 0 ? void 0 : e.id) === paymentId);
            setOrder(Object.assign(Object.assign({}, order), { payments: [
                    ...order.payments.slice(0, paymentIdx),
                    Object.assign(Object.assign({}, order.payments[paymentIdx]), { status: "PAYMENT_WAIVER_REQUESTED" }),
                    ...(_b = order.payments) === null || _b === void 0 ? void 0 : _b.slice(paymentIdx + 1),
                ] }));
        },
        update: (cache, mutationResult) => {
            var _a;
            let payment = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.find((e) => (e === null || e === void 0 ? void 0 : e.id) === mutationResult.data.requestPaymentWaiver.id);
            if (payment) {
                cache.modify({
                    id: cache.identify(payment),
                    fields: {
                        status(cachedStatus) {
                            return "PAYMENT_WAIVER_REQUESTED";
                        },
                    },
                });
            }
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
    const [requestWaiverBatch, requestWaiverBatchResult] = useMutation(REQUEST_WAIVER_BATCH, {
        onCompleted(data) {
            const payments = order.payments;
            if (data.requestPaymentWaivers && payments.length > 0) {
                const newPayments = payments.map((e) => (Object.assign(Object.assign({}, e), { status: "PAYMENT_WAIVER_REQUESTED" })));
                setOrder(Object.assign(Object.assign({}, order), { payments: newPayments }));
            }
        },
        update: (cache, mutationResult) => {
            let payments = order.payments;
            if (mutationResult.data.requestPaymentWaivers && payments.length > 0) {
                payments.forEach((e) => {
                    cache.modify({
                        id: cache.identify(e),
                        fields: {
                            status(cachedStatus) {
                                return "PAYMENT_WAIVER_REQUESTED";
                            },
                        },
                    });
                });
            }
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
    useEffect(() => {
        let newErrors = [];
        if (confirmPaymentResult.error)
            newErrors.push(confirmPaymentResult.error);
        if (confirmPaymentBatchResult.error)
            newErrors.push(confirmPaymentBatchResult.error);
        if (requestWaiverResult.error)
            newErrors.push(requestWaiverResult.error);
        if (requestWaiverBatchResult.error)
            newErrors.push(requestWaiverBatchResult.error);
        setErrors(newErrors);
    }, [
        confirmPaymentResult.error,
        confirmPaymentBatchResult.error,
        requestWaiverResult.error,
        requestWaiverBatchResult.error,
    ]);
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl text-teal-700 font-extrabold tracking-wider" }, { children: `Order for ${order.firstName} ${order.lastName}` }), void 0),
                        _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsxs("table", Object.assign({ className: "table-fixed w-full" }, { children: [_jsx("thead", { children: _jsxs("tr", Object.assign({ className: "bg-gray-50" }, { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Billing" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Code" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Price" }), void 0),
                                                _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, void 0)] }), void 0) }, void 0),
                                    _jsxs("tbody", { children: [(_a = order.payments) === null || _a === void 0 ? void 0 : _a.map((p) => (_jsxs("tr", Object.assign({ className: "border-t" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: p === null || p === void 0 ? void 0 : p.billing.item }), void 0),
                                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: p === null || p === void 0 ? void 0 : p.billing.code }), void 0),
                                                    _jsxs("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: [_jsx("span", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "ETB " }), void 0),
                                                            _jsx("span", { children: p === null || p === void 0 ? void 0 : p.billing.price.toLocaleString() }, void 0)] }), void 0),
                                                    _jsxs("td", Object.assign({ className: "px-6 py-4 text-sm" }, { children: [(p === null || p === void 0 ? void 0 : p.status) === "PAID" && (_jsx("p", Object.assign({ className: "text-green-700 uppercase font-semibold" }, { children: "Payment Confirmed" }), void 0)),
                                                            (p === null || p === void 0 ? void 0 : p.status) === "PAYMENT_WAIVER_REQUESTED" && (_jsx("p", Object.assign({ className: "text-yellow-700 uppercase font-semibold animate-pulse" }, { children: "Payment waiver requested" }), void 0)),
                                                            (p === null || p === void 0 ? void 0 : p.status) === "NOTPAID" && (_jsx(MenuComponent, { title: "Options", menus: _jsxs("div", Object.assign({ className: "px-1 py-1" }, { children: [_jsx(Menu.Item, { children: ({ active }) => (_jsxs("button", Object.assign({ className: `${active
                                                                                    ? "bg-teal-500 text-white"
                                                                                    : "text-gray-900"} group flex rounded-md items-center w-full px-2 py-2 text-sm`, type: "button", onClick: () => {
                                                                                    if (p === null || p === void 0 ? void 0 : p.id) {
                                                                                    }
                                                                                } }, { children: [_jsx(PencilIcon, { className: "w-5 h-5 mr-2 text-teal-700", "aria-hidden": "true" }, void 0), "Confirm Payment"] }), void 0)) }, void 0),
                                                                        _jsx(Menu.Item, { children: ({ active }) => (_jsxs("button", Object.assign({ className: `${active
                                                                                    ? "bg-teal-500 text-white"
                                                                                    : "text-gray-900"} group flex rounded-md items-center w-full px-2 py-2 text-sm`, type: "button", onClick: () => {
                                                                                    if ((p === null || p === void 0 ? void 0 : p.id) && order.patientId) {
                                                                                        requestWaiver({
                                                                                            variables: {
                                                                                                paymentId: p === null || p === void 0 ? void 0 : p.id,
                                                                                                patientId: order.patientId,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                } }, { children: [_jsx(SortAscendingIcon, { className: "w-5 h-5 mr-2 text-teal-700", "aria-hidden": "true" }, void 0), "Request Payment Waiver"] }), void 0)) }, void 0)] }), void 0) }, void 0))] }), void 0)] }), p === null || p === void 0 ? void 0 : p.id))), _jsxs("tr", Object.assign({ className: "border-t" }, { children: [_jsx("td", { className: "px-6 py-4 text-sm text-gray-900" }, void 0),
                                                    _jsx("td", { className: "px-6 py-4 text-sm text-gray-900" }, void 0),
                                                    _jsxs("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: [_jsxs("span", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: ["Total: ETB", " "] }), void 0),
                                                            _jsx("span", { children: (_b = order.payments) === null || _b === void 0 ? void 0 : _b.reduce((a, c) => a + ((c === null || c === void 0 ? void 0 : c.billing) ? c === null || c === void 0 ? void 0 : c.billing.price : 0), 0).toLocaleString() }, void 0)] }), void 0),
                                                    _jsxs("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: [order.payments.every((e) => e.status === "PAID") && (_jsx("p", Object.assign({ className: "text-green-700 uppercase font-semibold" }, { children: "Payments Confirmed" }), void 0)),
                                                            order.payments.every((e) => e.status === "PAYMENT_WAIVER_REQUESTED") && (_jsx("p", Object.assign({ className: "text-yellow-700 uppercase font-semibold animate-pulse" }, { children: "Payment waiver requested" }), void 0)),
                                                            order.payments.some((e) => e.status === "NOTPAID") && (_jsx(MenuComponent, { title: "Options", menus: _jsxs("div", Object.assign({ className: "px-1 py-1" }, { children: [_jsx(Menu.Item, Object.assign({ disabled: !order.payments.some((e) => e.status === "NOTPAID") }, { children: ({ active, disabled }) => (_jsxs("button", Object.assign({ className: classnames("group flex rounded-md items-center w-full px-2 py-2 text-sm", {
                                                                                    "bg-teal-500 text-white": active,
                                                                                    "text-gray-900": !active && !disabled,
                                                                                    "text-gray-500  ": disabled,
                                                                                }), type: "button", onClick: () => {
                                                                                    var _a;
                                                                                    const paymentIds = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.map((e) => e === null || e === void 0 ? void 0 : e.id);
                                                                                    confirmPaymentBatch({
                                                                                        variables: {
                                                                                            ids: paymentIds,
                                                                                        },
                                                                                    });
                                                                                } }, { children: [_jsx(PencilIcon, { className: classnames("w-5 h-5 mr-2", {
                                                                                            "text-teal-700": !disabled,
                                                                                            "text-gray-500": disabled,
                                                                                        }), "aria-hidden": "true" }, void 0), "Confirm all payments"] }), void 0)) }), void 0),
                                                                        _jsx(Menu.Item, Object.assign({ disabled: !order.payments.some((e) => e.status === "NOTPAID") }, { children: ({ active, disabled }) => (_jsxs("button", Object.assign({ className: classnames("group flex rounded-md items-center w-full px-2 py-2 text-sm", {
                                                                                    "bg-teal-500 text-white": active,
                                                                                    "text-gray-900": !active && !disabled,
                                                                                    "text-gray-500  ": disabled,
                                                                                }), type: "button", onClick: () => {
                                                                                    var _a;
                                                                                    const paymentIds = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.map((e) => e === null || e === void 0 ? void 0 : e.id);
                                                                                    requestWaiverBatch({
                                                                                        variables: {
                                                                                            ids: paymentIds,
                                                                                            patientId: order.patientId,
                                                                                        },
                                                                                    });
                                                                                } }, { children: [_jsx(SortAscendingIcon, { className: classnames("w-5 h-5 mr-2", {
                                                                                            "text-teal-700": !disabled,
                                                                                            "text-gray-500": disabled,
                                                                                        }) }, void 0), "Request payment waiver"] }), void 0)) }), void 0)] }), void 0) }, void 0))] }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: errors.length > 0 &&
                                errors.map((e) => (_jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", e === null || e === void 0 ? void 0 : e.message] }), void 0))) }), void 0)] }, void 0)] }), void 0) }), void 0));
};
