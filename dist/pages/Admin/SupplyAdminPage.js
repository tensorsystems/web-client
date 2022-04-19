import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { TablePagination } from "../../components/TablePagination";
import { useNotificationDispatch } from "../../notification";
import classnames from "classnames";
import { BILLINGS, SUPPLIES } from "../../api";
const ROWS_PER_PAGE = 20;
export const SupplyPage = () => {
    var _a;
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: ROWS_PER_PAGE,
    });
    const { data, refetch } = useQuery(SUPPLIES, {
        variables: {
            page: paginationInput,
            searchTerm: searchTerm.length === 0 ? undefined : searchTerm,
        },
    });
    useEffect(() => {
        refetch();
    }, [paginationInput, searchTerm]);
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.supplies.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleSearchTermChange = (evt) => {
        const value = evt.target.value;
        setSearchTerm(value);
    };
    return (_jsx("div", Object.assign({ className: "w-full" }, { children: _jsx("div", Object.assign({ className: "overflow-x-auto" }, { children: _jsxs("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsxs("thead", { children: [_jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", colSpan: 3, className: "px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Supplies" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-700 text-gray-100 text-right" }, { children: _jsx("button", Object.assign({ onClick: () => bottomSheetDispatch({
                                                        type: "show",
                                                        snapPoint: 0,
                                                        children: (_jsx(AddSupplyForm, { onSuccess: () => {
                                                                bottomSheetDispatch({ type: "hide" });
                                                                notifDispatch({
                                                                    type: "show",
                                                                    notifTitle: "Success",
                                                                    notifSubTitle: "Supply has been saved successfully",
                                                                    variant: "success",
                                                                });
                                                                refetch();
                                                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                                                    }), className: "uppercase bg-gray-800 hover:bg-gray-900 py-1 px-2 rounded-md text-sm" }, { children: _jsxs("div", Object.assign({ className: "flex items-center" }, { children: [_jsx("div", { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-6 w-6" }, { children: _jsx("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }, void 0) }), void 0) }, void 0),
                                                            _jsx("div", Object.assign({ className: "font-semibold" }, { children: "Add" }), void 0)] }), void 0) }), void 0) }), void 0)] }, void 0),
                                    _jsx("tr", Object.assign({ className: "bg-gray-100" }, { children: _jsx("th", Object.assign({ colSpan: 4 }, { children: _jsx("input", { type: "text", name: "search", placeholder: "Search", className: "p-3 pl-4 block w-full sm:text-md border-gray-300", onChange: handleSearchTermChange }, void 0) }), void 0) }), void 0),
                                    _jsxs("tr", Object.assign({ className: "bg-gray-100" }, { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Title" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Billings" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Status" }), void 0),
                                            _jsx("th", {}, void 0)] }), void 0)] }, void 0),
                            _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.supplies.edges.map((value) => (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: value === null || value === void 0 ? void 0 : value.node.title }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: value === null || value === void 0 ? void 0 : value.node.billings.map((e, i) => (_jsx("span", Object.assign({ className: classnames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800", {
                                                    "ml-2": i !== 0,
                                                }) }, { children: e === null || e === void 0 ? void 0 : e.item }), e === null || e === void 0 ? void 0 : e.id))) }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: _jsx("span", Object.assign({ className: classnames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                    "bg-yellow-100 text-yellow-800": (value === null || value === void 0 ? void 0 : value.node.active) === false,
                                                }, {
                                                    "bg-green-100 text-green-800": (value === null || value === void 0 ? void 0 : value.node.active) === true,
                                                }) }, { children: (value === null || value === void 0 ? void 0 : value.node.active) ? "Active" : "Inactive" }), void 0) }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-right text-sm font-medium" }, { children: _jsx("button", Object.assign({ onClick: () => {
                                                    bottomSheetDispatch({
                                                        type: "show",
                                                        snapPoint: 500,
                                                        children: (_jsx(UpdateSupplyForm, { onUpdateSuccess: () => {
                                                                bottomSheetDispatch({ type: "hide" });
                                                                notifDispatch({
                                                                    type: "show",
                                                                    notifTitle: "Success",
                                                                    notifSubTitle: "Supply has been updated successfully",
                                                                    variant: "success",
                                                                });
                                                                refetch();
                                                            }, onDeleteSuccess: () => {
                                                                bottomSheetDispatch({ type: "hide" });
                                                                notifDispatch({
                                                                    type: "show",
                                                                    notifTitle: "Success",
                                                                    notifSubTitle: "Supply has been deleted successfully",
                                                                    variant: "success",
                                                                });
                                                                refetch();
                                                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }), values: value === null || value === void 0 ? void 0 : value.node }, void 0)),
                                                    });
                                                }, className: "text-indigo-600 hover:text-indigo-900" }, { children: "Edit" }), void 0) }), void 0)] }), value === null || value === void 0 ? void 0 : value.node.id))) }), void 0)] }), void 0),
                    _jsx(TablePagination, { totalCount: (_a = data === null || data === void 0 ? void 0 : data.supplies.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0) }), void 0) }), void 0));
};
const SAVE_SUPPLY = gql `
  mutation SaveSupply($input: SupplyInput!) {
    saveSupply(input: $input) {
      id
    }
  }
`;
const AddSupplyForm = ({ onSuccess, onCancel }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            active: true,
        },
    });
    const { data } = useQuery(BILLINGS, {
        variables: { page: { page: 0, size: 1000 } },
    });
    const [save, { error }] = useMutation(SAVE_SUPPLY, {
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
        save({
            variables: {
                input: {
                    title: data.title,
                    active: data.active,
                    billingIds: data.billingIds,
                },
            },
        });
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Add Supply" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Title" }), void 0),
                                _jsx("input", { id: "title", type: "text", name: "title", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "billingIds", className: "block text-sm font-medium text-gray-700" }, { children: "Billings" }), void 0),
                                _jsx("select", Object.assign({ id: "billingIds", name: "billingIds", required: true, multiple: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: data === null || data === void 0 ? void 0 : data.billings.edges.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.node.id }, { children: e === null || e === void 0 ? void 0 : e.node.item }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "active", className: "block text-sm font-medium text-gray-700" }, { children: "Status" }), void 0),
                                _jsxs("select", Object.assign({ required: true, name: "active", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "true" }, { children: "Active" }), void 0),
                                        _jsx("option", Object.assign({ value: "false" }, { children: "Inactive" }), void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
const UPDATE_SUPPLY = gql `
  mutation UpdateSupply($input: SupplyUpdateInput!) {
    updateSupply(input: $input) {
      id
    }
  }
`;
const DELETE_SUPPLY = gql `
  mutation DeleteSupply($id: ID!) {
    deleteSupply(id: $id)
  }
`;
const UpdateSupplyForm = ({ values, onUpdateSuccess, onDeleteSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { data } = useQuery(BILLINGS, {
        variables: { page: { page: 0, size: 1000 } },
    });
    useEffect(() => {
        setValue("title", values === null || values === void 0 ? void 0 : values.title);
        setValue("active", values === null || values === void 0 ? void 0 : values.active);
        setValue("billingIds", values === null || values === void 0 ? void 0 : values.billings.map((e) => e === null || e === void 0 ? void 0 : e.id.toString()));
    }, [values, data]);
    const [save, { error }] = useMutation(UPDATE_SUPPLY, {
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
    const [deleteSupply] = useMutation(DELETE_SUPPLY, {
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
                    active: data.active,
                    billingIds: data.billingIds,
                },
            },
        });
    };
    const onDeleteSubmit = (data) => {
        var _a;
        const id = (_a = values === null || values === void 0 ? void 0 : values.id.toString()) !== null && _a !== void 0 ? _a : "";
        deleteSupply({ variables: { id: id } });
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Update Supply" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Title" }), void 0),
                                _jsx("input", { id: "title", type: "text", name: "title", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "billingIds", className: "block text-sm font-medium text-gray-700" }, { children: "Billings" }), void 0),
                                _jsx("select", Object.assign({ id: "billingIds", name: "billingIds", required: true, multiple: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: data === null || data === void 0 ? void 0 : data.billings.edges.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.node.id }, { children: e === null || e === void 0 ? void 0 : e.node.item }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "status", className: "block text-sm font-medium text-gray-700" }, { children: "Status" }), void 0),
                                _jsxs("select", Object.assign({ required: true, name: "status", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "true" }, { children: "Active" }), void 0),
                                        _jsx("option", Object.assign({ value: "false" }, { children: "Inactive" }), void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "flex space-x-5" }, { children: [_jsx("button", Object.assign({ type: "button", onClick: handleSubmit(onUpdateSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0),
                                _jsx("button", Object.assign({ type: "submit", onClick: handleSubmit(onDeleteSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Delete" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0));
};
