import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import Select from "react-select";
import { BILLINGS, SUPPLIES } from "../api";
const UPDATE_TREATMENT_TYPE = gql `
  mutation UpdateTreatmentType($input: TreatmentTypeUpdateInput!) {
    updateTreatmentType(input: $input) {
      id
    }
  }
`;
const DELETE_TREATMENT_TYPE = gql `
  mutation DeleteTreatmentType($id: ID!) {
    deleteTreatmentType(id: $id)
  }
`;
export const UpdateTreatmentTypeForm = ({ values, onUpdateSuccess, onDeleteSuccess, onCancel, }) => {
    var _a, _b;
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const [selectedBillings, setSelectedBillings] = useState([]);
    const [selectedSupplies, setSelectedSupplies] = useState([]);
    const billingQuery = useQuery(BILLINGS, {
        variables: { page: { page: 0, size: 1000 } },
    });
    const supplyQuery = useQuery(SUPPLIES, {
        variables: { page: { page: 0, size: 1000 } },
    });
    useEffect(() => {
        const billings = values === null || values === void 0 ? void 0 : values.billings.map((e) => ({
            value: e === null || e === void 0 ? void 0 : e.id,
            label: e === null || e === void 0 ? void 0 : e.item,
        }));
        if (billings) {
            setSelectedBillings(billings);
        }
        const supplies = values === null || values === void 0 ? void 0 : values.supplies.map((e) => ({
            value: e === null || e === void 0 ? void 0 : e.id,
            label: e === null || e === void 0 ? void 0 : e.title,
        }));
        if (supplies) {
            setSelectedSupplies(supplies);
        }
        setValue("title", values === null || values === void 0 ? void 0 : values.title);
        setValue("active", values === null || values === void 0 ? void 0 : values.active);
    }, [values, billingQuery.data]);
    const [save, { error }] = useMutation(UPDATE_TREATMENT_TYPE, {
        onCompleted(data) {
            onUpdateSuccess();
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
    const [deleteTreatmentType] = useMutation(DELETE_TREATMENT_TYPE, {
        onCompleted(data) {
            onDeleteSuccess();
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
    const onUpdateSubmit = (data) => {
        var _a;
        const id = (_a = values === null || values === void 0 ? void 0 : values.id.toString()) !== null && _a !== void 0 ? _a : "";
        save({
            variables: {
                input: {
                    id: id,
                    title: data.title,
                    active: data.active === "true",
                    billingIds: selectedBillings.map((e) => e.value),
                    supplyIds: selectedSupplies.map((e) => e.value),
                },
            },
        });
    };
    const onDeleteSubmit = (data) => {
        var _a;
        const id = (_a = values === null || values === void 0 ? void 0 : values.id.toString()) !== null && _a !== void 0 ? _a : "";
        deleteTreatmentType({ variables: { id: id } });
    };
    const billings = (_a = billingQuery.data) === null || _a === void 0 ? void 0 : _a.billings.edges.map((e) => ({
        value: e === null || e === void 0 ? void 0 : e.node.id,
        label: e === null || e === void 0 ? void 0 : e.node.item,
    }));
    const supplies = (_b = supplyQuery.data) === null || _b === void 0 ? void 0 : _b.supplies.edges.map((e) => ({
        value: e === null || e === void 0 ? void 0 : e.node.id,
        label: e === null || e === void 0 ? void 0 : e.node.title,
    }));
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Update Treatment Type" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Title" }), void 0),
                                _jsx("input", { id: "title", type: "text", name: "title", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx(Select, { isMulti: true, placeholder: "Billings", options: billings, value: selectedBillings, onChange: (values) => {
                                    setSelectedBillings(values.map((e) => e));
                                } }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx(Select, { isMulti: true, placeholder: "Supplies", options: supplies, value: selectedSupplies, onChange: (values) => {
                                    setSelectedSupplies(values.map((e) => e));
                                } }, void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "status", className: "block text-sm font-medium text-gray-700" }, { children: "Status" }), void 0),
                                _jsxs("select", Object.assign({ required: true, id: "status", name: "status", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "true" }, { children: "Active" }), void 0),
                                        _jsx("option", Object.assign({ value: "false" }, { children: "Inactive" }), void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "flex space-x-5" }, { children: _jsx("button", Object.assign({ type: "button", onClick: handleSubmit(onUpdateSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0) }), void 0)] }, void 0)] }), void 0) }), void 0));
};
