import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import { FileUploaderComponent, } from "../components/FileUploaderComponent";
import { gql, useMutation } from "@apollo/client";
const SIGN_UP = gql `
  mutation SignUp($input: UserInput!) {
    signup(input: $input) {
      id
    }
  }
`;
export const UserRegistrationForm = ({ onSuccess }) => {
    const notifDispatch = useNotificationDispatch();
    const [userTypes, setUserTypes] = useState([]);
    const [signatures, setSignatures] = useState();
    const [profilePictures, setProfilePictures] = useState();
    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const [signup] = useMutation(SIGN_UP, {
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
        if (signatures && (signatures === null || signatures === void 0 ? void 0 : signatures.length) > 0) {
            const file = {
                file: signatures[0].fileObject,
                name: signatures[0].name,
            };
            user.signature = file;
        }
        if (profilePictures && (profilePictures === null || profilePictures === void 0 ? void 0 : profilePictures.length) > 0) {
            const file = {
                file: profilePictures[0].fileObject,
                name: profilePictures[0].name,
            };
            user.profilePic = file;
        }
        signup({
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
    return (_jsx("div", { children: _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "mt-2 text-3xl text-gray-800 font-bold tracking-wide" }, { children: "Create Account" }), void 0),
                _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-16 mt-10" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-lg font-semibold tracking-wide text-gray-700 uppercase" }, { children: "Basic Information" }), void 0),
                                _jsx("hr", {}, void 0),
                                _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-6 mt-5" }, { children: [_jsxs("div", Object.assign({ className: "col-span-2 sm:col-span-2" }, { children: [_jsx("label", Object.assign({ htmlFor: "userTypeIds", className: "block text-sm font-medium text-gray-700" }, { children: "Account Type" }), void 0),
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
                                        _jsxs("div", Object.assign({ className: "col-span-1 sm:col-span-1" }, { children: [_jsx("label", Object.assign({ htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, { children: "Password" }), void 0),
                                                _jsx("input", { type: "password", name: "password", id: "password", required: true, ref: register({
                                                        required: true,
                                                        minLength: {
                                                            value: 6,
                                                            message: "Password must have at least 6 characters",
                                                        },
                                                    }), className: "mt-1 p-1 pl-4 block w-full sm:text-md bg-gray-100 border-gray-300 border rounded-md" }, void 0)] }), void 0),
                                        _jsxs("div", Object.assign({ className: "col-span-1 sm:col-span-1" }, { children: [_jsx("label", Object.assign({ htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700" }, { children: "Confirm Password" }), void 0),
                                                _jsx("input", { type: "password", name: "confirmPassword", id: "confirmPassword", required: true, ref: register({
                                                        validate: (value) => value === password.current ||
                                                            "The passwords do not match",
                                                    }), className: "mt-1 p-1 pl-4 block w-full sm:text-md bg-gray-100 border-gray-300 border rounded-md" }, void 0)] }), void 0),
                                        errors.password && _jsx("p", { children: errors.password.message }, void 0),
                                        _jsx("div", Object.assign({ className: "col-span-2 sm:col-span-2 py-3 mt-2 bg-gray-50 text-right" }, { children: _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Register" }), void 0) }), void 0) }), void 0)] }), void 0)] }, void 0),
                        _jsxs("div", Object.assign({ className: "px-7" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-lg font-semibold tracking-wide text-gray-700 uppercase" }, { children: "Documents" }), void 0),
                                        _jsx("hr", {}, void 0),
                                        _jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700 mt-5" }, { children: "Your signature" }), void 0),
                                        _jsx(FileUploaderComponent, { multiSelect: false, accept: "image", values: signatures, onAdd: handleSignatureChange, onDelete: () => setSignatures([]) }, void 0)] }, void 0),
                                _jsxs("div", Object.assign({ className: "col-span-2 sm:col-span-2 mt-10" }, { children: [_jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Profile Picture" }), void 0),
                                        _jsx(FileUploaderComponent, { multiSelect: false, accept: "image", values: profilePictures, onAdd: handleProfilePictureChange, onDelete: () => setProfilePictures([]) }, void 0)] }), void 0)] }), void 0)] }), void 0)] }), void 0) }, void 0));
};
