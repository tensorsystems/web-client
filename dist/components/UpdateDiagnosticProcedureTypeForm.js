import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import Select from "react-select";
import { BILLINGS } from "../api";
const UPDATE_DIAGNOSTIC_PROCEDURE_TYPE = gql `
  mutation UpdateDiagnosticProcedureType(
    $input: DiagnosticProcedureTypeUpdateInput!
  ) {
    updateDiagnosticProcedureType(input: $input) {
      id
    }
  }
`;
const DELETE_DIAGNOSTIC_PROCEDURE_TYPE = gql `
  mutation DeleteDiagnosticProcedureType($id: ID!) {
    deleteDiagnosticProcedureType(id: $id)
  }
`;
export const UpdateDiagnosticProcedureTypeForm = ({ values, onUpdateSuccess, onDeleteSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { data } = useQuery(BILLINGS, {
        variables: { page: { page: 0, size: 1000 } },
    });
    const [selectedBillings, setSelectedBillings] = useState([]);
    useEffect(() => {
        const billings = values === null || values === void 0 ? void 0 : values.billings.map((e) => ({
            value: e === null || e === void 0 ? void 0 : e.id,
            label: e === null || e === void 0 ? void 0 : e.item,
        }));
        if (billings) {
            setSelectedBillings(billings);
        }
        setValue("title", values === null || values === void 0 ? void 0 : values.title);
        setValue("active", values === null || values === void 0 ? void 0 : values.active);
    }, [values, data]);
    const [save, { error }] = useMutation(UPDATE_DIAGNOSTIC_PROCEDURE_TYPE, {
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
    const [deleteDiagnosticProcedureType] = useMutation(DELETE_DIAGNOSTIC_PROCEDURE_TYPE, {
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
                },
            },
        });
    };
    const onDeleteSubmit = (data) => {
        var _a;
        const id = (_a = values === null || values === void 0 ? void 0 : values.id.toString()) !== null && _a !== void 0 ? _a : "";
        deleteDiagnosticProcedureType({ variables: { id: id } });
    };
    const billings = data === null || data === void 0 ? void 0 : data.billings.edges.map((e) => ({
        value: e === null || e === void 0 ? void 0 : e.node.id,
        label: e === null || e === void 0 ? void 0 : e.node.item,
    }));
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Update Diagnostic Procedure" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Title" }), void 0),
                                _jsx("input", { required: true, id: "title", type: "text", name: "title", ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx(Select, { isMulti: true, placeholder: "Billings", options: billings, value: selectedBillings, onChange: (values) => {
                                    setSelectedBillings(values.map((e) => e));
                                } }, void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "active", className: "block text-sm font-medium text-gray-700" }, { children: "Status" }), void 0),
                                _jsxs("select", Object.assign({ required: true, name: "active", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "true" }, { children: "Active" }), void 0),
                                        _jsx("option", Object.assign({ value: "false" }, { children: "Inactive" }), void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "flex space-x-5" }, { children: [_jsx("button", Object.assign({ type: "button", onClick: handleSubmit(onUpdateSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0),
                                _jsx("button", Object.assign({ type: "submit", onClick: handleSubmit(onDeleteSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Delete" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0));
};
