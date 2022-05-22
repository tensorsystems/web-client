import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar, accessToken } from "../cache";
import { useNotificationDispatch } from "../notification";
import { useHistory } from "react-router-dom";
import Logo from "../img/logo-dark.png";
import ReactLoading from "react-loading";
import classnames from "classnames";
export const LoginPage = () => {
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const notifDispatch = useNotificationDispatch();
    const [isLegacy, setIsLegacy] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [networkStatus, setNetworkStatus] = useState(false);
    useEffect(() => {
        if (isLoggedInVar() === true) {
            history.replace("/");
        }
    }, [isLoggedInVar()]);
    const [organizationDetails, setOrganizationDetails] = useState();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/organizationDetails`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
            setOrganizationDetails(data);
        })
            .catch((error) => { });
    }, []);
    const onSubmit = (data) => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_URL}/organizationDetails`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((organizationDetails) => {
            if (isLegacy) {
                fetch(`${process.env.REACT_APP_SERVER_URL}/legacy-login`, {
                    method: "POST",
                    body: JSON.stringify(data),
                })
                    .then((res) => {
                    if (!res.ok) {
                        throw res;
                    }
                    return res.json();
                })
                    .then((data) => {
                    setIsLoading(false);
                    sessionStorage.setItem("accessToken", data.token);
                    sessionStorage.setItem("organizationDetails", JSON.stringify(organizationDetails));
                    isLoggedInVar(true);
                    accessToken(data.token);
                })
                    .catch((error) => {
                    setIsLoading(false);
                    if (typeof error.json !== "function") {
                        notifDispatch({
                            type: "show",
                            notifTitle: "Error",
                            notifSubTitle: "Couldn't connect to the server",
                            variant: "failure",
                        });
                        return;
                    }
                    error.json().then((data) => {
                        notifDispatch({
                            type: "show",
                            notifTitle: "Error",
                            notifSubTitle: data.message,
                            variant: "failure",
                        });
                    });
                });
            }
            else {
                fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
                    method: "POST",
                    body: JSON.stringify(data),
                })
                    .then((res) => {
                    if (!res.ok) {
                        throw res;
                    }
                    return res.json();
                })
                    .then((result) => {
                    setIsLoading(false);
                    sessionStorage.setItem("accessToken", result.token);
                    sessionStorage.setItem("organizationDetails", JSON.stringify(organizationDetails));
                    isLoggedInVar(true);
                    accessToken(result.token);
                })
                    .catch((error) => {
                    setIsLoading(false);
                    if (typeof error.json !== "function") {
                        notifDispatch({
                            type: "show",
                            notifTitle: "Error",
                            notifSubTitle: "Couldn't connect to the server",
                            variant: "failure",
                        });
                        return;
                    }
                    error.json().then((data) => {
                        notifDispatch({
                            type: "show",
                            notifTitle: "Error",
                            notifSubTitle: data.message,
                            variant: "failure",
                        });
                    });
                });
            }
        })
            .catch((error) => { });
    };
    return (_jsx("div", Object.assign({ className: "h-screen w-screen bg-gray-600 p-16" }, { children: _jsx("div", Object.assign({ className: "h-full w-full bg-white rounded-lg shadow-xl p-5 overflow-auto bg-login bg-center bg-cover" }, { children: _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("div", { children: _jsx("img", { className: "h-auto w-44", src: Logo }, void 0) }, void 0),
                    _jsx("div", Object.assign({ className: "flex justify-center ml-16 mt-10" }, { children: _jsxs("div", Object.assign({ className: "px-7 flex-initial" }, { children: [_jsx("p", Object.assign({ className: "text-3xl text-gray-800 font-bold tracking-wide" }, { children: "Welcome Back" }), void 0),
                                _jsx("p", Object.assign({ className: "text-teal-500 font-semibold" }, { children: organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.name }), void 0),
                                _jsxs("div", Object.assign({ className: "mt-16 w-full z-20 " }, { children: [isLegacy && (_jsx("p", Object.assign({ className: "text-gray-400 font-semibold mt-6" }, { children: "Log in using your legacy account" }), void 0)),
                                        isLegacy && (_jsx("input", { className: "mt-3 p-3 border-none w-full rounded-md bg-gray-200 focus:bg-white focus:placeholder-gray-400", type: "text", placeholder: "Username", name: "username", id: "username", required: true, ref: register({ required: true }) }, void 0)),
                                        _jsx("input", { className: "mt-6 p-3 border-none w-full rounded-md bg-gray-200 focus:bg-white focus:placeholder-gray-400", type: "text", placeholder: "Email", name: "email", id: "email", required: true, ref: register({ required: true }) }, void 0),
                                        _jsx("input", { className: "mt-6 p-3 border-none w-full rounded-md bg-gray-200 focus:bg-white focus:placeholder-gray-400", type: "password", placeholder: "Password", name: "password", id: "password", required: true, ref: register({ required: true }) }, void 0)] }), void 0),
                                _jsx("div", Object.assign({ className: "mt-4 text-sm text-gray-600 flex justify-end" }, { children: _jsx("div", { children: isLegacy ? (_jsx("a", Object.assign({ href: "#", onClick: (evt) => {
                                                evt.preventDefault();
                                                setIsLegacy(false);
                                            } }, { children: "New Account?" }), void 0)) : (_jsx("div", {}, void 0)) }, void 0) }), void 0),
                                _jsxs("div", Object.assign({ className: "mt-10 flex" }, { children: [_jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("button", Object.assign({ className: classnames("p-3 tracking-wide text-white rounded-full w-full flex items-center justify-center", {
                                                    "bg-teal-600 hover:bg-teal-700": !isLoading,
                                                    "bg-gray-600": isLoading,
                                                }), type: "submit", disabled: isLoading }, { children: isLoading ? (_jsx(ReactLoading, { type: "cylon", color: "white", height: 30, width: 30, className: "inline-block" }, void 0)) : (_jsx("p", { children: "Login now" }, void 0)) }), void 0) }), void 0),
                                        _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("button", Object.assign({ className: "p-3 w-full text-gray-800 tracking-wide", type: "button", onClick: () => {
                                                    history.push("/register");
                                                } }, { children: "Create account" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0)] }), void 0) }), void 0) }), void 0));
};
