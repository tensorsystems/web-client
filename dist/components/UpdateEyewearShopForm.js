import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
const UPDATE_EYEWEAR_SHOP = gql `
  mutation UpdateEyewearShop($input: EyewearShopUpdateInput!) {
    updateEyewearShop(input: $input) {
      id
    }
  }
`;
export const UpdateEyewearShopForm = ({ values, onUpdateSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: values,
    });
    const [update, { error }] = useMutation(UPDATE_EYEWEAR_SHOP, {
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
    const onSubmit = (data) => {
        if (values === null || values === void 0 ? void 0 : values.id) {
            update({
                variables: {
                    input: {
                        id: values === null || values === void 0 ? void 0 : values.id,
                        title: data.title,
                        address: data.address,
                        region: data.region,
                        country: data.country,
                        phone: data.phone,
                        inHouse: data.inHouse === "true",
                        active: data.active === "true",
                    },
                },
            });
        }
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Update eyewear shop details" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, { children: "Title" }), void 0),
                                _jsx("input", { required: true, type: "text", name: "title", ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "address", className: "block text-sm font-medium text-gray-700" }, { children: "Address" }), void 0),
                                _jsx("input", { required: true, type: "text", name: "address", ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "region", className: "block text-sm font-medium text-gray-700" }, { children: "Region" }), void 0),
                                _jsx("input", { required: true, type: "text", name: "region", ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "country", className: "block text-sm font-medium text-gray-700" }, { children: "Country" }), void 0),
                                _jsx("input", { required: true, type: "text", name: "country", ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "phone", className: "block text-sm font-medium text-gray-700" }, { children: "Phone" }), void 0),
                                _jsx("input", { required: true, type: "text", name: "phone", ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "inHouse", className: "block text-sm font-medium text-gray-700" }, { children: "In-House" }), void 0),
                                _jsxs("select", Object.assign({ required: true, name: "inHouse", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "true" }, { children: "Yes" }), void 0),
                                        _jsx("option", Object.assign({ value: "false" }, { children: "No" }), void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "active", className: "block text-sm font-medium text-gray-700" }, { children: "Active" }), void 0),
                                _jsxs("select", Object.assign({ required: true, name: "active", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "true" }, { children: "Yes" }), void 0),
                                        _jsx("option", Object.assign({ value: "false" }, { children: "No" }), void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
