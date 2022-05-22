import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useBottomSheetDispatch } from "../bottomsheet";
import { useNotificationDispatch } from "../notification";
import { TablePagination } from "./TablePagination";
const DIAGNOSIS = gql `
  query Diagnoses($page: PaginationInput!) {
    diagnoses(page: $page) {
      totalCount
      edges {
        node {
          id
          title
          code
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
const ROWS_PER_PAGE = 5;
export const DiagnosisTable = () => {
    var _a;
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: ROWS_PER_PAGE,
    });
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const { data, refetch } = useQuery(DIAGNOSIS, {
        variables: { page: paginationInput },
    });
    useEffect(() => {
        refetch();
    }, [paginationInput]);
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.diagnoses.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    return (_jsx("div", Object.assign({ className: "flex flex-col" }, { children: _jsx("div", Object.assign({ className: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, { children: _jsx("div", Object.assign({ className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" }, { children: _jsxs("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsxs("thead", { children: [_jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-700 text-left text-sm font-medium text-gray-50 uppercase tracking-wider" }, { children: "Diagnosis" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-700 text-gray-100 text-right" }, { children: _jsx("button", Object.assign({ onClick: () => bottomSheetDispatch({
                                                            type: "show",
                                                            snapPoint: 500,
                                                            children: (_jsx(AddDiagnosisForm, { onSuccess: () => {
                                                                    bottomSheetDispatch({ type: "hide" });
                                                                    notifDispatch({
                                                                        type: "show",
                                                                        notifTitle: "Success",
                                                                        notifSubTitle: "Diagnosis has been saved successfully",
                                                                        variant: "success",
                                                                    });
                                                                    refetch();
                                                                }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                                                        }), className: "uppercase bg-gray-800 hover:bg-gray-900 py-1 px-2 rounded-md text-sm" }, { children: _jsxs("div", Object.assign({ className: "flex items-center" }, { children: [_jsx("div", { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-6 w-6" }, { children: _jsx("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }, void 0) }), void 0) }, void 0),
                                                                _jsx("div", Object.assign({ className: "font-semibold" }, { children: "Add" }), void 0)] }), void 0) }), void 0) }), void 0)] }, void 0),
                                        _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: 2 }, { children: _jsx("input", { type: "text", name: "search", id: "diangosis-search", placeholder: "Search", className: "p-1 pl-4 block w-full sm:text-md border-gray-300" }, void 0) }), void 0) }, void 0)] }, void 0),
                                _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.diagnoses.edges.map((value) => (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: value === null || value === void 0 ? void 0 : value.node.fullDescription }), void 0),
                                            _jsx("td", Object.assign({ className: "px-6 py-4 text-right text-sm font-medium" }, { children: _jsx("button", Object.assign({ className: "text-indigo-600 hover:text-indigo-900", onClick: () => {
                                                        bottomSheetDispatch({
                                                            type: "show",
                                                            snapPoint: 500,
                                                            children: (_jsx(UpdateDiagnosisForm, { onUpdateSuccess: () => {
                                                                    bottomSheetDispatch({ type: "hide" });
                                                                    notifDispatch({
                                                                        type: "show",
                                                                        notifTitle: "Success",
                                                                        notifSubTitle: "Diagnosis has been updated successfully",
                                                                        variant: "success",
                                                                    });
                                                                    refetch();
                                                                }, onDeleteSuccess: () => {
                                                                    bottomSheetDispatch({ type: "hide" });
                                                                    notifDispatch({
                                                                        type: "show",
                                                                        notifTitle: "Success",
                                                                        notifSubTitle: "Diagnosis has been deleted successfully",
                                                                        variant: "success",
                                                                    });
                                                                    refetch();
                                                                }, onCancel: () => bottomSheetDispatch({ type: "hide" }), values: value === null || value === void 0 ? void 0 : value.node }, void 0)),
                                                        });
                                                    } }, { children: "Edit" }), void 0) }), void 0)] }), value === null || value === void 0 ? void 0 : value.node.id))) }), void 0)] }), void 0),
                        _jsx(TablePagination, { totalCount: (_a = data === null || data === void 0 ? void 0 : data.diagnoses.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0) }), void 0) }), void 0) }), void 0));
};
const SAVE_DIAGNOSIS = gql `
  mutation SaveDiagnosis($input: DiagnosisInput!) {
    saveDiagnosis(input: $input) {
      id
      title
    }
  }
`;
const AddDiagnosisForm = ({ onSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm();
    const [save, { error }] = useMutation(SAVE_DIAGNOSIS, {
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
        save({ variables: { input: data } });
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4", style: { height: "300px" } }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Add diagnosis" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Title" }), void 0),
                                _jsx("input", { type: "text", name: "title", id: "title", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
const UPDATE_DIAGNOSIS = gql `
  mutation UpdateDiagnosis($input: DiagnosisUpdateInput!) {
    updateDiagnosis(input: $input) {
      id
      title
    }
  }
`;
const DELETE_DIGANOSIS = gql `
  mutation DeleteDiagnosis($id: ID!) {
    deleteDiagnosis(id: $id)
  }
`;
const UpdateDiagnosisForm = ({ values, onUpdateSuccess, onDeleteSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: values === null || values === void 0 ? void 0 : values.id,
            fullDescription: values === null || values === void 0 ? void 0 : values.fullDescription,
        },
    });
    const [save, { error }] = useMutation(UPDATE_DIAGNOSIS, {
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
    const [deleteDiagnosis] = useMutation(DELETE_DIGANOSIS, {
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
        if ((values === null || values === void 0 ? void 0 : values.id) !== undefined) {
            data.id = values === null || values === void 0 ? void 0 : values.id;
            save({ variables: { input: data } });
        }
    };
    const onDeleteSubmit = (data) => {
        deleteDiagnosis({ variables: { id: data.id } });
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4", style: { height: "300px" } }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Update diagnosis" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Title" }), void 0),
                                _jsx("input", { type: "text", name: "title", id: "title", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "flex space-x-5" }, { children: [_jsx("button", Object.assign({ type: "button", onClick: handleSubmit(onUpdateSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0),
                                _jsx("button", Object.assign({ type: "submit", onClick: handleSubmit(onDeleteSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Delete" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0));
};
