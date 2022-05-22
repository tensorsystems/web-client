import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
const UPDATE_ALLERGY = gql `
  mutation UpdateAllergy($input: AllergyUpdateInput!) {
    updateAllergy(input: $input) {
      id
    }
  }
`;
const DELETE_ALLERGY = gql `
  mutation DeleteAllergy($id: ID!) {
    deleteAllergy(id: $id)
  }
`;
export const UpdateAllergyForm = ({ values, onUpdateSuccess, onDeleteSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: values,
    });
    const [update, { error }] = useMutation(UPDATE_ALLERGY, {
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
    const [deleteAllergy] = useMutation(DELETE_ALLERGY, {
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
        if (values === null || values === void 0 ? void 0 : values.id) {
            data.id = values.id;
            update({ variables: { input: data } });
        }
    };
    const onDeleteSubmit = () => {
        if (values === null || values === void 0 ? void 0 : values.id) {
            deleteAllergy({ variables: { id: values.id } });
        }
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Update Allergy" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Title" }), void 0),
                                _jsx("input", { type: "text", name: "title", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "issueSeverity", className: "block text-sm font-medium text-gray-700" }, { children: "Issue Severity" }), void 0),
                                _jsxs("select", Object.assign({ name: "issueSeverity", required: true, ref: register, className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "Mild" }, { children: "Mild" }), void 0),
                                        _jsx("option", Object.assign({ value: "Moderate" }, { children: "Moderate" }), void 0),
                                        _jsx("option", Object.assign({ value: "Moderate" }, { children: "Moderate" }), void 0),
                                        _jsx("option", Object.assign({ value: "Severe" }, { children: "Severe" }), void 0),
                                        _jsx("option", Object.assign({ value: "Life threatening" }, { children: "Life threatening" }), void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "issueReaction", className: "block text-sm font-medium text-gray-700" }, { children: "Issue Reaction" }), void 0),
                                _jsxs("select", Object.assign({ name: "issueReaction", required: true, ref: register, className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "Hives" }, { children: "Hives" }), void 0),
                                        _jsx("option", Object.assign({ value: "Nausea" }, { children: "Nausea" }), void 0),
                                        _jsx("option", Object.assign({ value: "Shortness of breath" }, { children: "Shortness of breath" }), void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "issueOutcome", className: "block text-sm font-medium text-gray-700" }, { children: "Issue Outcome" }), void 0),
                                _jsxs("select", Object.assign({ name: "issueOutcome", required: true, ref: register, className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "Resolved" }, { children: "Resolved" }), void 0),
                                        _jsx("option", Object.assign({ value: "Improved" }, { children: "Improved" }), void 0),
                                        _jsx("option", Object.assign({ value: "Status quo" }, { children: "Status quo" }), void 0),
                                        _jsx("option", Object.assign({ value: "Worse" }, { children: "Worse" }), void 0),
                                        _jsx("option", Object.assign({ value: "Pending follow-up" }, { children: "Pending follow-up" }), void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "issueOccurrence", className: "block text-sm font-medium text-gray-700" }, { children: "Issue Occurrence" }), void 0),
                                _jsxs("select", Object.assign({ name: "issueOccurrence", required: true, ref: register, className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "First" }, { children: "First" }), void 0),
                                        _jsx("option", Object.assign({ value: "Early Occurrence (<2 Mo)" }, { children: "Early Occurrence (<2 Mo)" }), void 0),
                                        _jsx("option", Object.assign({ value: "Late Occurrence (2-12 Mo)" }, { children: "Late Occurrence (2-12 Mo)" }), void 0),
                                        _jsx("option", Object.assign({ value: "Delayed Occurrence (>12 Mo)" }, { children: "Delayed Occurrence (>12 Mo)" }), void 0),
                                        _jsx("option", Object.assign({ value: "Chronic/Recurrent" }, { children: "Chronic/Recurrent" }), void 0),
                                        _jsx("option", Object.assign({ value: "Acute on Chronic" }, { children: "Acute on Chronic" }), void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "flex space-x-5" }, { children: [_jsx("button", Object.assign({ type: "button", onClick: handleSubmit(onUpdateSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0),
                                _jsx("button", Object.assign({ type: "submit", onClick: handleSubmit(onDeleteSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Delete" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0));
};
