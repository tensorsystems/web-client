import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FileUploaderComponent, } from "../components/FileUploaderComponent";
import { XIcon } from "@heroicons/react/outline";
import { Route, Switch, useHistory, useParams, useRouteMatch, } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import { useNotificationDispatch } from "../notification";
import { ProfileTabs } from "./ProfileTabs";
import { Tabs } from "../components/Tabs";
import ReactLoading from "react-loading";
import { useForm } from "react-hook-form";
import { getFileUrl } from "../util";
const customStyles = {
    content: {
        top: "10%",
        left: "10%",
        right: "10%",
        bottom: "10%",
        padding: 40,
        border: "none",
        backgroundColor: "white",
        borderRadius: 20,
        zIndex: 20,
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(40px)",
        zIndex: 20,
    },
};
const GET_USER = gql `
  query User($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      active
      createdAt
      userTypes {
        id
        title
      }
      signature {
        id
        size
        hash
        fileName
        extension
        contentType
        createdAt
      }
      profilePic {
        id
        size
        hash
        fileName
        extension
        contentType
        createdAt
      }
    }
  }
`;
const UPDATE_USER = gql `
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      id
    }
  }
`;
const CHANGE_PASSWORD = gql `
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id
    }
  }
`;
export default function ProfilePage() {
    const { profileId } = useParams();
    const notifDispatch = useNotificationDispatch();
    const history = useHistory();
    const [signatures, setSignatures] = useState();
    const [profilePictures, setProfilePictures] = useState();
    const [tabValue, setTabValue] = useState("Files");
    const match = useRouteMatch();
    const { data } = useQuery(GET_USER, {
        variables: {
            id: profileId,
        },
    });
    const { register, handleSubmit, reset } = useForm();
    const [updateUser, updateUserResult] = useMutation(UPDATE_USER, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "User info updated successfully",
                variant: "success",
            });
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
    const [changePassword, changePasswordResult] = useMutation(CHANGE_PASSWORD, {
        onCompleted(data) {
            reset();
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Password changed successfully",
                variant: "success",
            });
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
        var _a, _b, _c, _d;
        const user = data === null || data === void 0 ? void 0 : data.user;
        if (user === null || user === void 0 ? void 0 : user.signature) {
            const fileUrl = getFileUrl({
                baseUrl: process.env.REACT_APP_SERVER_URL,
                fileName: user === null || user === void 0 ? void 0 : user.signature.fileName,
                hash: user === null || user === void 0 ? void 0 : user.signature.hash,
                extension: user === null || user === void 0 ? void 0 : user.signature.extension,
            });
            const sig = {
                id: user === null || user === void 0 ? void 0 : user.signature.id,
                fileUrl: fileUrl,
                name: (_a = user === null || user === void 0 ? void 0 : user.signature.fileName) !== null && _a !== void 0 ? _a : "",
                size: user === null || user === void 0 ? void 0 : user.signature.size,
                createdAt: user === null || user === void 0 ? void 0 : user.signature.createdAt,
                contentType: (_b = user === null || user === void 0 ? void 0 : user.signature.contentType) !== null && _b !== void 0 ? _b : "",
            };
            setSignatures([sig]);
        }
        if (user === null || user === void 0 ? void 0 : user.profilePic) {
            const fileUrl = getFileUrl({
                baseUrl: process.env.REACT_APP_SERVER_URL,
                fileName: user === null || user === void 0 ? void 0 : user.profilePic.fileName,
                hash: user === null || user === void 0 ? void 0 : user.profilePic.hash,
                extension: user === null || user === void 0 ? void 0 : user.profilePic.extension,
            });
            const profilePic = {
                id: user === null || user === void 0 ? void 0 : user.profilePic.id,
                fileUrl: fileUrl,
                name: (_c = user === null || user === void 0 ? void 0 : user.profilePic.fileName) !== null && _c !== void 0 ? _c : "",
                size: user === null || user === void 0 ? void 0 : user.profilePic.size,
                createdAt: user === null || user === void 0 ? void 0 : user.profilePic.createdAt,
                contentType: (_d = user === null || user === void 0 ? void 0 : user.profilePic.contentType) !== null && _d !== void 0 ? _d : "",
            };
            setProfilePictures([profilePic]);
        }
    }, [data === null || data === void 0 ? void 0 : data.user]);
    const handleSignatureChange = (change) => {
        setSignatures(change);
    };
    const handleProfilePictureChange = (change) => {
        setProfilePictures(change);
    };
    const onFileSubmit = () => {
        let user = {
            id: data === null || data === void 0 ? void 0 : data.user.id,
            firstName: data === null || data === void 0 ? void 0 : data.user.firstName,
            lastName: data === null || data === void 0 ? void 0 : data.user.lastName,
            email: data === null || data === void 0 ? void 0 : data.user.email,
            userTypeIds: data === null || data === void 0 ? void 0 : data.user.userTypes.map((e) => e === null || e === void 0 ? void 0 : e.id),
            active: (data === null || data === void 0 ? void 0 : data.user.active) === true,
        };
        if ((data === null || data === void 0 ? void 0 : data.user) &&
            signatures &&
            signatures.length > 0 &&
            signatures[0].fileObject) {
            const file = {
                file: signatures[0].fileObject,
                name: signatures[0].name,
            };
            user.signature = file;
        }
        if ((data === null || data === void 0 ? void 0 : data.user) &&
            profilePictures &&
            profilePictures.length > 0 &&
            profilePictures[0].fileObject) {
            const file = {
                file: profilePictures[0].fileObject,
                name: profilePictures[0].name,
            };
            user.profilePic = file;
        }
        updateUser({
            variables: {
                input: user,
            },
        });
    };
    const onChangePassword = (input) => {
        changePassword({
            variables: {
                input,
            },
        });
    };
    return (_jsx("div", { children: _jsxs(Modal, Object.assign({ isOpen: true, onAfterOpen: () => { }, onRequestClose: () => { }, style: customStyles }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between" }, { children: [_jsx("p", Object.assign({ className: "text-4xl font-bold text-gray-800" }, { children: `${data === null || data === void 0 ? void 0 : data.user.firstName} ${data === null || data === void 0 ? void 0 : data.user.lastName}` }), void 0),
                        _jsx("button", Object.assign({ type: "button", onClick: () => {
                                history.goBack();
                            } }, { children: _jsx(XIcon, { className: "w-10 h-10 text-gray-700" }, void 0) }), void 0)] }), void 0),
                _jsx("hr", { className: "border-teal-500 mt-5" }, void 0),
                _jsxs("div", Object.assign({ className: "flex mt-5 space-x-3" }, { children: [_jsx("p", Object.assign({ className: "material-icons text-teal-800" }, { children: "work" }), void 0),
                        _jsx("p", Object.assign({ className: "font-semibold" }, { children: data === null || data === void 0 ? void 0 : data.user.userTypes.map((e) => e === null || e === void 0 ? void 0 : e.title).join(", ") }), void 0)] }), void 0),
                _jsxs("div", Object.assign({ className: "flex mt-2 space-x-3" }, { children: [_jsx("p", Object.assign({ className: "material-icons text-teal-800" }, { children: "mail" }), void 0),
                        _jsx("p", Object.assign({ className: "font-semibold" }, { children: data === null || data === void 0 ? void 0 : data.user.email }), void 0)] }), void 0),
                _jsxs("div", Object.assign({ className: "flex mt-2 space-x-3" }, { children: [_jsx("p", Object.assign({ className: "material-icons text-teal-800" }, { children: "schedule" }), void 0),
                        _jsx("p", Object.assign({ className: "font-semibold" }, { children: (data === null || data === void 0 ? void 0 : data.user.createdAt) &&
                                format(parseISO(data === null || data === void 0 ? void 0 : data.user.createdAt), "MMM d, y") }), void 0)] }), void 0),
                _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx("ul", Object.assign({ className: "list-reset flex border-b" }, { children: _jsx(Tabs, { value: tabValue, onChange: (value) => setTabValue(value), tabs: ProfileTabs }, void 0) }), void 0) }), void 0),
                _jsxs(Switch, { children: [_jsx(Route, Object.assign({ path: `${match.path}/files` }, { children: _jsxs("div", Object.assign({ className: "mt-5" }, { children: [_jsxs("div", { children: [_jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700 mt-5" }, { children: "Your signature" }), void 0),
                                            _jsx(FileUploaderComponent, { multiSelect: false, accept: "image", values: signatures, onAdd: handleSignatureChange, onDelete: () => setSignatures([]) }, void 0)] }, void 0),
                                    _jsxs("div", Object.assign({ className: "col-span-2 sm:col-span-2 mt-10" }, { children: [_jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Profile Picture" }), void 0),
                                            _jsx(FileUploaderComponent, { multiSelect: false, accept: "image", values: profilePictures, onAdd: handleProfilePictureChange, onDelete: () => setProfilePictures([]) }, void 0)] }), void 0),
                                    _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("button", Object.assign({ type: "button", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none", onClick: () => onFileSubmit() }, { children: updateUserResult.loading ? (_jsx(ReactLoading, { type: "cylon", color: "white", height: 30, width: 30, className: "inline-block" }, void 0)) : (_jsx("p", { children: "Save" }, void 0)) }), void 0) }), void 0)] }), void 0) }), void 0),
                        _jsx(Route, Object.assign({ path: `${match.path}/password` }, { children: _jsxs("form", Object.assign({ className: "mt-5", onSubmit: handleSubmit(onChangePassword) }, { children: [_jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { required: true, type: "password", ref: register({ required: true }), name: "previousPassword", placeholder: "Old password", className: "border rounded-md w-full border-gray-200" }, void 0) }), void 0),
                                    _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { required: true, type: "password", ref: register({ required: true }), name: "password", placeholder: "New password", className: "border rounded-md w-full border-gray-200" }, void 0) }), void 0),
                                    _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { required: true, type: "password", ref: register({ required: true }), name: "confirmPassword", placeholder: "Confirm new password", className: "border rounded-md w-full border-gray-200" }, void 0) }), void 0),
                                    _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none" }, { children: changePasswordResult.loading ? (_jsx(ReactLoading, { type: "cylon", color: "white", height: 30, width: 30, className: "inline-block" }, void 0)) : (_jsx("p", { children: "Change password" }, void 0)) }), void 0) }), void 0)] }), void 0) }), void 0)] }, void 0)] }), void 0) }, void 0));
}
