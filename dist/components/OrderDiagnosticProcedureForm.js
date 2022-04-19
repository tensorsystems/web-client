import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
const ORDER_DIAGNOSTIC_PROCEDURE = gql `
  mutation OrderDiagnosticProcedure($input: OrderDiagnosticProcedureInput!) {
    orderDiagnosticProcedure(input: $input) {
      id
    }
  }
`;
export const OrderDiagnosticProcedureForm = ({ diagnosticProcedureType, patientChartId, appointmentId, patientId, onSuccess, onCancel, }) => {
    var _a;
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            billingId: (_a = diagnosticProcedureType === null || diagnosticProcedureType === void 0 ? void 0 : diagnosticProcedureType.billings[0]) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    const [orderDiagnosticProcedure, { error }] = useMutation(ORDER_DIAGNOSTIC_PROCEDURE, {
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
            appointmentId && (diagnosticProcedureType === null || diagnosticProcedureType === void 0 ? void 0 : diagnosticProcedureType.id)) {
            data.patientChartId = patientChartId;
            data.patientId = patientId;
            data.appointmentId = appointmentId;
            data.diagnosticProcedureTypeId = diagnosticProcedureType === null || diagnosticProcedureType === void 0 ? void 0 : diagnosticProcedureType.id;
            orderDiagnosticProcedure({ variables: { input: data } });
        }
    };
    const selectedBillingId = watch("billingId");
    const selectedBilling = diagnosticProcedureType === null || diagnosticProcedureType === void 0 ? void 0 : diagnosticProcedureType.billings.find((e) => {
        if ((e === null || e === void 0 ? void 0 : e.id) === undefined || selectedBillingId === undefined)
            return false;
        return e.id.toString() === selectedBillingId.toString();
    });
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider text-teal-800" }, { children: `Order ${diagnosticProcedureType === null || diagnosticProcedureType === void 0 ? void 0 : diagnosticProcedureType.title}` }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "billingId", className: "block text-sm font-medium text-gray-700" }, { children: "Billing" }), void 0),
                                _jsx("select", Object.assign({ id: "billingId", name: "billingId", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: diagnosticProcedureType === null || diagnosticProcedureType === void 0 ? void 0 : diagnosticProcedureType.billings.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.id }, { children: e === null || e === void 0 ? void 0 : e.item }), e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsxs("table", Object.assign({ className: "table-fixed w-full" }, { children: [_jsx("thead", { children: _jsxs("tr", Object.assign({ className: "bg-gray-50" }, { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Procedure" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Billing" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Price" }), void 0)] }), void 0) }, void 0),
                                    _jsx("tbody", { children: _jsxs("tr", Object.assign({ className: "border-t" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: diagnosticProcedureType === null || diagnosticProcedureType === void 0 ? void 0 : diagnosticProcedureType.title }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: selectedBilling &&
                                                        `${selectedBilling === null || selectedBilling === void 0 ? void 0 : selectedBilling.item} (${selectedBilling === null || selectedBilling === void 0 ? void 0 : selectedBilling.code})` }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: selectedBilling && `ETB ${selectedBilling === null || selectedBilling === void 0 ? void 0 : selectedBilling.price}` }), void 0)] }), void 0) }, void 0)] }), void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("textarea", { name: "receptionNote", placeholder: "Reception Note", rows: 2, ref: register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-24 w-full" }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("textarea", { name: "orderNote", placeholder: "Order Note", rows: 2, ref: register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-24 w-full" }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
