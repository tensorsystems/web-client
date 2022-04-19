import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import Select from "react-select";
const ORDER_LAB = gql `
  mutation OrderLab($input: OrderLabInput!) {
    orderLab(input: $input) {
      id
    }
  }
`;
export const OrderLabForm = ({ labType, patientChartId, appointmentId, patientId, onSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const [selectedBillings, setSelectedBillings] = useState([]);
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            billingIds: labType === null || labType === void 0 ? void 0 : labType.billings.map((e) => e === null || e === void 0 ? void 0 : e.id),
        },
    });
    const [orderLab, { error }] = useMutation(ORDER_LAB, {
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
        if (selectedBillings.length === 0) {
            alert("Select atleast one billing item");
            return;
        }
        if (patientChartId && patientId && appointmentId && (labType === null || labType === void 0 ? void 0 : labType.id)) {
            data.patientChartId = patientChartId;
            data.patientId = patientId;
            data.labTypeId = labType === null || labType === void 0 ? void 0 : labType.id;
            data.billingIds = selectedBillings.map((e) => e.value);
            orderLab({ variables: { input: data } });
        }
    };
    const billings = labType === null || labType === void 0 ? void 0 : labType.billings.map((e) => ({
        value: e === null || e === void 0 ? void 0 : e.id,
        label: e === null || e === void 0 ? void 0 : e.item,
        code: e === null || e === void 0 ? void 0 : e.code,
        price: e === null || e === void 0 ? void 0 : e.price,
    }));
    const total = selectedBillings.reduce((a, c) => { var _a; return a + ((_a = c === null || c === void 0 ? void 0 : c.price) !== null && _a !== void 0 ? _a : 0); }, 0);
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider text-teal-800" }, { children: `Order ${labType === null || labType === void 0 ? void 0 : labType.title}` }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx(Select, { isMulti: true, placeholder: "Billings", options: billings, onChange: (values) => {
                                    setSelectedBillings(values.map((e) => e));
                                } }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsxs("table", Object.assign({ className: "table-fixed w-full" }, { children: [_jsx("thead", { children: _jsxs("tr", Object.assign({ className: "bg-gray-50" }, { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Item" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Code" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Price" }), void 0)] }), void 0) }, void 0),
                                    _jsxs("tbody", { children: [selectedBillings.map((e, i) => (_jsxs("tr", Object.assign({ className: "border-t" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.label }), void 0),
                                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.code }), void 0),
                                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `ETB ${e === null || e === void 0 ? void 0 : e.price}` }), void 0)] }), i))),
                                            selectedBillings.length > 0 && (_jsxs("tr", { children: [_jsx("td", {}, void 0),
                                                    _jsx("td", {}, void 0),
                                                    _jsxs("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: ["Total: ", `ETB ${total}`] }), void 0)] }, void 0))] }, void 0)] }), void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("textarea", { name: "receptionNote", placeholder: "Reception Note", rows: 2, ref: register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-24 w-full" }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("textarea", { name: "orderNote", placeholder: "Order Note", rows: 2, ref: register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-24 w-full" }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
