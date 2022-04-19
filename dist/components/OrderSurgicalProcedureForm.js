import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
const ORDER_SURGICAL_PROCEDURE = gql `
  mutation OrderSurgicalProcedure($input: OrderSurgicalInput!) {
    orderSurgicalProcedure(input: $input) {
      id
    }
  }
`;
export const OrderSurgicalProcedureForm = ({ surgicalProcedureType, patientChartId, appointmentId, patientId, onSuccess, onCancel, }) => {
    var _a, _b, _c;
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            billingId: (_a = surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.billings[0]) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    const [orderSurgicalProcedure, { error }] = useMutation(ORDER_SURGICAL_PROCEDURE, {
        onCompleted(data) {
            onSuccess();
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
    const onSubmit = (data) => {
        if (patientChartId &&
            patientId &&
            appointmentId && (surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.id)) {
            data.patientChartId = patientChartId;
            data.appointmentId = appointmentId;
            data.patientId = patientId;
            data.surgicalProcedureTypeId = surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.id;
            orderSurgicalProcedure({ variables: { input: data } });
        }
    };
    const selectedBillingId = watch("billingId");
    const selectedBilling = surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.billings.find((e) => {
        if ((e === null || e === void 0 ? void 0 : e.id) === undefined || selectedBillingId === undefined)
            return false;
        return e.id.toString() === selectedBillingId.toString();
    });
    const totalPrice = ((_b = selectedBilling === null || selectedBilling === void 0 ? void 0 : selectedBilling.price) !== null && _b !== void 0 ? _b : 0) +
        ((_c = surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.supplies.reduce((a, c) => { var _a; return a + ((_a = c === null || c === void 0 ? void 0 : c.billings.reduce((a, c) => { var _a; return a + ((_a = c === null || c === void 0 ? void 0 : c.price) !== null && _a !== void 0 ? _a : 0); }, 0)) !== null && _a !== void 0 ? _a : 0); }, 0)) !== null && _c !== void 0 ? _c : 0);
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider text-teal-800" }, { children: `Order ${surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.title}` }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "performOnEye", className: "block text-sm font-medium text-gray-700" }, { children: "Perform on" }), void 0),
                                _jsxs("select", Object.assign({ id: "performOnEye", name: "performOnEye", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "OU" }, { children: "OU" }), void 0),
                                        _jsx("option", Object.assign({ value: "OD" }, { children: "OD" }), void 0),
                                        _jsx("option", Object.assign({ value: "OS" }, { children: "OS" }), void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "billingId", className: "block text-sm font-medium text-gray-700" }, { children: "Billing" }), void 0),
                                _jsx("select", Object.assign({ id: "billingId", name: "billingId", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.billings.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.id }, { children: e === null || e === void 0 ? void 0 : e.item }), e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsxs("table", Object.assign({ className: "table-fixed w-full" }, { children: [_jsx("thead", { children: _jsxs("tr", Object.assign({ className: "bg-gray-50" }, { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Item" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Billing" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Price" }), void 0)] }), void 0) }, void 0),
                                    _jsxs("tbody", { children: [_jsxs("tr", Object.assign({ className: "border-t" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.title }), void 0),
                                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: selectedBilling &&
                                                            `${selectedBilling === null || selectedBilling === void 0 ? void 0 : selectedBilling.item} (${selectedBilling === null || selectedBilling === void 0 ? void 0 : selectedBilling.code})` }), void 0),
                                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: selectedBilling && (_jsxs("div", { children: [_jsxs("span", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: ["ETB", " "] }), void 0),
                                                                _jsx("span", { children: selectedBilling === null || selectedBilling === void 0 ? void 0 : selectedBilling.price.toLocaleString() }, void 0)] }, void 0)) }), void 0)] }), void 0), surgicalProcedureType === null || surgicalProcedureType === void 0 ? void 0 : surgicalProcedureType.supplies.map((s) => (_jsxs("tr", Object.assign({ className: "border-t" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: s === null || s === void 0 ? void 0 : s.title }), void 0),
                                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: s === null || s === void 0 ? void 0 : s.billings.map((b) => `${b === null || b === void 0 ? void 0 : b.item} (${b === null || b === void 0 ? void 0 : b.code})`).join(", ") }), void 0),
                                                    _jsxs("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: [_jsx("span", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "ETB " }), void 0),
                                                            _jsx("span", { children: s === null || s === void 0 ? void 0 : s.billings.reduce((a, c) => { var _a; return a + ((_a = c === null || c === void 0 ? void 0 : c.price) !== null && _a !== void 0 ? _a : 0); }, 0).toLocaleString() }, void 0)] }), void 0)] }), s === null || s === void 0 ? void 0 : s.id))), _jsxs("tr", Object.assign({ className: "border-t" }, { children: [_jsx("td", { className: "px-6 py-4 text-sm text-gray-900" }, void 0),
                                                    _jsx("td", { className: "px-6 py-4 text-sm text-gray-900" }, void 0),
                                                    _jsxs("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: [_jsx("span", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "ETB " }), void 0),
                                                            _jsx("span", { children: totalPrice.toLocaleString() }, void 0)] }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("textarea", { name: "receptionNote", placeholder: "Reception Note", rows: 2, ref: register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-24 w-full" }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("textarea", { name: "orderNote", placeholder: "Order Note", rows: 2, ref: register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-24 w-full" }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
