import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
const SAVE_PATIENT_ENCOUNTER_LIMIT = gql `
  mutation SavePatientEncounterLimit($input: PatientEncounterLimitInput!) {
    savePatientEncounterLimit(input: $input) {
      id
    }
  }
`;
const GET_PROVIDERS = gql `
  query Providers($input: String!) {
    getByUserTypeTitle(input: $input) {
      id
      firstName
      lastName
    }
  }
`;
export const AddPatientEncounterLimitForm = ({ onSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm();
    const { data } = useQuery(GET_PROVIDERS, {
        variables: {
            input: "Physician",
        },
    });
    const [save, { error }] = useMutation(SAVE_PATIENT_ENCOUNTER_LIMIT, {
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
                input: data,
            },
        });
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Add Patient Encounter Limit" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "userId", className: "block text-sm font-medium text-gray-700" }, { children: "Physician" }), void 0),
                                _jsx("select", Object.assign({ required: true, name: "userId", ref: register, className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: data === null || data === void 0 ? void 0 : data.getByUserTypeTitle.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.id }, { children: `Dr. ${e === null || e === void 0 ? void 0 : e.firstName} ${e === null || e === void 0 ? void 0 : e.lastName}` }), e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4 flex space-x-4 w-full items-stretch" }, { children: [_jsxs("div", Object.assign({ className: "flex-1" }, { children: [_jsx("label", Object.assign({ htmlFor: "dailyLimit", className: "block text-sm font-medium text-gray-700" }, { children: "Daily Limit" }), void 0),
                                        _jsx("input", { required: true, type: "number", name: "dailyLimit", ref: register, className: "p-1 pl-4 w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                                _jsxs("div", Object.assign({ className: "flex-1" }, { children: [_jsx("label", Object.assign({ htmlFor: "overbook", className: "block text-sm font-medium text-gray-700" }, { children: "Overbook" }), void 0),
                                        _jsx("input", { required: true, type: "number", name: "overbook", ref: register, className: "p-1 pl-4 w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
