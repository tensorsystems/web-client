import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useNotificationDispatch } from '../notification';
const UPDATE_BILLING = gql `
  mutation UpdateBilling($input: BillingInput!, $id: ID!) {
    updateBilling(input: $input, id: $id) {
      id
    }
  }
`;
const DELETE_BILLING = gql `
  mutation DeleteBilling($id: ID!) {
    deleteBilling(id: $id)
  }
`;
export const UpdateBillingForm = ({ values, onUpdateSuccess, onDeleteSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: values,
    });
    const [save, { error }] = useMutation(UPDATE_BILLING, {
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
    const [deleteBilling] = useMutation(DELETE_BILLING, {
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
                id: id,
                input: {
                    item: data.item,
                    code: data.code,
                    price: data.price,
                    remark: data.remark,
                    credit: data.credit === true,
                },
            },
        });
    };
    const onDeleteSubmit = (data) => {
        var _a;
        const id = (_a = values === null || values === void 0 ? void 0 : values.id.toString()) !== null && _a !== void 0 ? _a : "";
        deleteBilling({ variables: { id: id } });
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Update billing" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "item", className: "block text-sm font-medium text-gray-700" }, { children: "Item" }), void 0),
                                _jsx("input", { type: "text", name: "item", id: "item", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "code", className: "block text-sm font-medium text-gray-700" }, { children: "Code" }), void 0),
                                _jsx("input", { type: "text", name: "code", id: "code", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "price", className: "block text-sm font-medium text-gray-700" }, { children: "Price" }), void 0),
                                _jsx("input", { type: "number", name: "price", id: "price", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "remark", className: "block text-sm font-medium text-gray-700" }, { children: "Remark" }), void 0),
                                _jsx("input", { type: "text", name: "remark", id: "remark", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "credit", className: "block text-sm font-medium text-gray-700" }, { children: "Credit" }), void 0),
                                _jsxs("select", Object.assign({ id: "credit", name: "credit", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "false" }, { children: "No" }), void 0),
                                        _jsx("option", Object.assign({ value: "true" }, { children: "Yes" }), void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "flex space-x-5" }, { children: [_jsx("button", Object.assign({ type: "button", onClick: handleSubmit(onUpdateSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0),
                                _jsx("button", Object.assign({ type: "submit", onClick: handleSubmit(onDeleteSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Delete" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0));
};
