import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import { FileUploaderComponent, } from "../components/FileUploaderComponent";
import { gql, useMutation } from "@apollo/client";
import { getFileUrl } from "../util";
const UPDATE_USER = gql `
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      id
    }
  }
`;
const RESET_PASSWORD = gql `
  mutation ResetPassword($id: ID!) {
    resetPassword(id: $id) {
      id
    }
  }
`;
export const UserUpdateForm = ({ values, onSuccess, onResetSuccess, }) => {
    const notifDispatch = useNotificationDispatch();
    const [userTypes, setUserTypes] = useState([]);
    const [signatures, setSignatures] = useState();
    const [profilePictures, setProfilePictures] = useState();
    const { register, handleSubmit, watch, reset } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    useEffect(() => {
        var _a, _b, _c, _d;
        reset({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            userTypeIds: values.userTypes.map((e) => e === null || e === void 0 ? void 0 : e.id.toString()),
            active: values.active,
        });
        if (values.signature) {
            const sig = {
                id: values === null || values === void 0 ? void 0 : values.signature.id,
                fileUrl: getFileUrl({
                    baseUrl: process.env.REACT_APP_SERVER_URL,
                    fileName: values === null || values === void 0 ? void 0 : values.signature.fileName,
                    hash: values === null || values === void 0 ? void 0 : values.signature.hash,
                    extension: values === null || values === void 0 ? void 0 : values.signature.extension,
                }),
                name: (_a = values === null || values === void 0 ? void 0 : values.signature.fileName) !== null && _a !== void 0 ? _a : "",
                size: values === null || values === void 0 ? void 0 : values.signature.size,
                createdAt: values === null || values === void 0 ? void 0 : values.signature.createdAt,
                contentType: (_b = values === null || values === void 0 ? void 0 : values.signature.contentType) !== null && _b !== void 0 ? _b : "",
            };
            setSignatures([sig]);
        }
        if (values.profilePic) {
            const profilePic = {
                id: values === null || values === void 0 ? void 0 : values.profilePic.id,
                fileUrl: getFileUrl({
                    baseUrl: process.env.REACT_APP_SERVER_URL,
                    fileName: values === null || values === void 0 ? void 0 : values.profilePic.fileName,
                    hash: values === null || values === void 0 ? void 0 : values.profilePic.hash,
                    extension: values === null || values === void 0 ? void 0 : values.profilePic.extension,
                }),
                name: (_c = values === null || values === void 0 ? void 0 : values.profilePic.fileName) !== null && _c !== void 0 ? _c : "",
                size: values === null || values === void 0 ? void 0 : values.profilePic.size,
                createdAt: values === null || values === void 0 ? void 0 : values.profilePic.createdAt,
                contentType: (_d = values === null || values === void 0 ? void 0 : values.profilePic.contentType) !== null && _d !== void 0 ? _d : "",
            };
            setProfilePictures([profilePic]);
        }
    }, [values, userTypes]);
    const [update, { error }] = useMutation(UPDATE_USER, {
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
    const [resetPassword] = useMutation(RESET_PASSWORD, {
        onCompleted(data) {
            onResetSuccess();
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
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/userTypes`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
            setUserTypes(data);
        })
            .catch((error) => {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        });
    }, []);
    const onSubmit = (user) => {
        user.id = values.id;
        if (signatures && (signatures === null || signatures === void 0 ? void 0 : signatures.length) > 0 && signatures[0].fileObject) {
            const file = {
                file: signatures[0].fileObject,
                name: signatures[0].name,
            };
            user.signature = file;
        }
        if (profilePictures &&
            (profilePictures === null || profilePictures === void 0 ? void 0 : profilePictures.length) > 0 &&
            profilePictures[0].fileObject) {
            const file = {
                file: profilePictures[0].fileObject,
                name: profilePictures[0].name,
            };
            user.profilePic = file;
        }
        user.active = user.active === "true";
        update({
            variables: {
                input: user,
            },
        });
    };
    const handleSignatureChange = (change) => {
        setSignatures(change);
    };
    const handleProfilePictureChange = (change) => {
        setProfilePictures(change);
    };
    return (_jsx("div", { children: _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "mt-2 text-3xl text-gray-800 font-bold tracking-wide" }, { children: "Update" }), void 0),
                _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-16 mt-10" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-lg font-semibold tracking-wide text-gray-700 uppercase" }, { children: "Basic Information" }), void 0),
                                _jsx("hr", {}, void 0),
                                _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-6 mt-5" }, { children: [_jsxs("div", Object.assign({ className: "col-span-2 sm:col-span-2" }, { children: [_jsx("label", Object.assign({ htmlFor: "active", className: "block text-sm font-medium text-gray-700" }, { children: "Status" }), void 0),
                                                _jsxs("select", Object.assign({ name: "active", required: true, ref: register({ required: true }), className: "mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "true" }, { children: "Active" }), void 0),
                                                        _jsx("option", Object.assign({ value: "false" }, { children: "Inactive" }), void 0)] }), void 0)] }), void 0),
                                        _jsxs("div", Object.assign({ className: "col-span-2 sm:col-span-2" }, { children: [_jsx("label", Object.assign({ htmlFor: "userTypeIds", className: "block text-sm font-medium text-gray-700" }, { children: "Account Type" }), void 0),
                                                _jsx("select", Object.assign({ name: "userTypeIds", required: true, multiple: true, ref: register({ required: true }), className: "mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: userTypes.map((e) => (_jsx("option", Object.assign({ value: e.ID }, { children: e.title }), e.ID))) }), void 0)] }), void 0),
                                        _jsxs("div", Object.assign({ className: "col-span-1 sm:col-span-1" }, { children: [_jsx("label", Object.assign({ htmlFor: "firstName", className: "block text-sm font-medium text-gray-700" }, { children: "First name" }), void 0),
                                                _jsx("input", { type: "text", name: "firstName", id: "firstName", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md bg-gray-100 border-gray-300 border rounded-md" }, void 0)] }), void 0),
                                        _jsxs("div", Object.assign({ className: "col-span-1 sm:col-span-1" }, { children: [_jsx("label", Object.assign({ htmlFor: "lastName", className: "block text-sm font-medium text-gray-700" }, { children: "Last name" }), void 0),
                                                _jsx("input", { type: "text", name: "lastName", id: "lastName", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md bg-gray-100 border-gray-300 border rounded-md" }, void 0)] }), void 0),
                                        _jsxs("div", Object.assign({ className: "col-span-2 sm:col-span-2" }, { children: [_jsx("label", Object.assign({ htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, { children: "Email" }), void 0),
                                                _jsx("input", { type: "email", name: "email", id: "email", required: true, ref: register({
                                                        required: true,
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address",
                                                        },
                                                    }), className: "mt-1 p-1 pl-4 block w-full sm:text-md bg-gray-100 border-gray-300 border rounded-md" }, void 0)] }), void 0),
                                        _jsx("div", Object.assign({ className: "col-span-2 sm:col-span-2" }, { children: error && (_jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0)) }), void 0),
                                        _jsx("div", Object.assign({ className: "col-span-1 sm:col-span-1" }, { children: _jsx("button", Object.assign({ type: "button", className: "inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", onClick: () => {
                                                    resetPassword({
                                                        variables: {
                                                            id: values.id,
                                                        },
                                                    });
                                                } }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Reset Password" }), void 0) }), void 0) }), void 0),
                                        _jsx("div", Object.assign({ className: "col-span-1 sm:col-span-1 bg-gray-50 text-right" }, { children: _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0) }), void 0)] }), void 0)] }, void 0),
                        _jsxs("div", Object.assign({ className: "px-7" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-lg font-semibold tracking-wide text-gray-700 uppercase" }, { children: "Documents" }), void 0),
                                        _jsx("hr", {}, void 0),
                                        _jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700 mt-5" }, { children: "Your signature" }), void 0),
                                        _jsx(FileUploaderComponent, { multiSelect: false, accept: "image", values: signatures, onAdd: handleSignatureChange, onDelete: () => setSignatures([]) }, void 0)] }, void 0),
                                _jsxs("div", Object.assign({ className: "col-span-2 sm:col-span-2 mt-10" }, { children: [_jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Profile Picture" }), void 0),
                                        _jsx(FileUploaderComponent, { multiSelect: false, accept: "image", values: profilePictures, onAdd: handleProfilePictureChange, onDelete: () => setProfilePictures([]) }, void 0)] }), void 0)] }), void 0)] }), void 0)] }), void 0) }, void 0));
};
