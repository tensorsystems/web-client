import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ReferralType, } from "../models/models";
import { useNotificationDispatch } from "../notification";
import { parseJwt } from "../util";
const ORDER_REFERRAL = gql `
  mutation OrderReferral($input: OrderReferralInput!) {
    orderReferral(input: $input) {
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
export const OrderReferralForm = ({ patientChartId, patientId, onSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            type: ReferralType.PatientInHouseReferral,
        },
    });
    const token = sessionStorage.getItem("accessToken");
    const claim = token === null ? null : parseJwt(token);
    const { data } = useQuery(GET_PROVIDERS, {
        variables: {
            input: "Physician",
        },
    });
    const [orderReferral, { error }] = useMutation(ORDER_REFERRAL, {
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
        if (patientChartId && patientId) {
            data.patientId = patientId;
            data.patientChartId = patientChartId;
            data.type = orderValues.type;
            orderReferral({ variables: { input: data } });
        }
    };
    const orderValues = watch();
    const providers = (data === null || data === void 0 ? void 0 : data.getByUserTypeTitle) ? [...data.getByUserTypeTitle]
        : [];
    const reversedProviders = providers
        .reverse()
        .filter((e) => e.id !== claim.ID);
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider text-teal-800" }, { children: "Order referral" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "type", className: "block text-sm font-medium text-gray-700" }, { children: "Refer Type" }), void 0),
                                _jsxs("select", Object.assign({ required: true, name: "type", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: ReferralType.PatientInHouseReferral }, { children: "In-House Referral" }), void 0),
                                        _jsx("option", Object.assign({ value: ReferralType.PatientOutsourceReferral }, { children: "Outsource" }), void 0)] }), void 0)] }), void 0),
                        orderValues.type === ReferralType.PatientInHouseReferral && (_jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "referredToId", className: "block text-sm font-medium text-gray-700" }, { children: "Refer To" }), void 0),
                                _jsx("select", Object.assign({ required: true, name: "referredToId", ref: register({
                                        required: orderValues.type === ReferralType.PatientInHouseReferral,
                                    }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: reversedProviders.map((e) => (_jsx("option", Object.assign({ value: e === null || e === void 0 ? void 0 : e.id }, { children: `Dr. ${e === null || e === void 0 ? void 0 : e.firstName} ${e === null || e === void 0 ? void 0 : e.lastName}` }), e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), void 0)),
                        orderValues.type === ReferralType.PatientOutsourceReferral && (_jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "providerName", className: "block text-sm font-medium text-gray-700" }, { children: "Provider" }), void 0),
                                _jsx("input", { required: true, type: "text", name: "providerName", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0)),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "reason", className: "block text-sm font-medium text-gray-700" }, { children: "Reason" }), void 0),
                                _jsx("input", { type: "text", name: "reason", ref: register({ required: false }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "receptionNote", className: "block text-sm font-medium text-gray-700" }, { children: "Reception Note" }), void 0),
                                _jsx("input", { type: "text", name: "receptionNote", ref: register({ required: false }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
