import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
const SAVE_LIFESTYLE = gql `
  mutation SaveLifestyle($input: LifestyleInput!) {
    saveLifestyle(input: $input) {
      id
    }
  }
`;
const GET_LIFESTYLE_TYPES = gql `
  query LifestyleTypes($page: PaginationInput!) {
    lifestyleTypes(page: $page) {
      totalCount
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
export const SaveLifestyleForm = ({ patientHistoryId, onSuccess, onCancel, onSaveChange }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm();
    const [save, { error }] = useMutation(SAVE_LIFESTYLE, {
        onCompleted(data) {
            onSaveChange && onSaveChange(false);
            onSuccess();
        },
        onError(error) {
            onSaveChange && onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const { data } = useQuery(GET_LIFESTYLE_TYPES, {
        variables: { page: { page: 0, size: 20 } },
    });
    const onSubmit = (data) => {
        if (patientHistoryId !== undefined) {
            data.patientHistoryId = patientHistoryId;
            onSaveChange && onSaveChange(true);
            save({ variables: { input: data } });
        }
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Add Lifestyle" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Lifestyle" }), void 0),
                                _jsx("select", Object.assign({ id: "title", name: "title", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: data === null || data === void 0 ? void 0 : data.lifestyleTypes.edges.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.node.title }, { children: e === null || e === void 0 ? void 0 : e.node.title }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Status" }), void 0),
                                _jsxs("select", Object.assign({ id: "description", name: "description", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "Current" }, { children: "Current" }), void 0),
                                        _jsx("option", Object.assign({ value: "Quit" }, { children: "Quit" }), void 0),
                                        _jsx("option", Object.assign({ value: "Never" }, { children: "Never" }), void 0),
                                        _jsx("option", Object.assign({ value: "NA" }, { children: "N/A" }), void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "note", className: "block text-sm font-medium text-gray-700" }, { children: "Note" }), void 0),
                                _jsx("input", { type: "text", name: "note", id: "note", ref: register(), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
