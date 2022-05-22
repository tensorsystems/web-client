import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { MainLayout } from "../layouts/main_layout";
import { HomeTabs } from "../components/HomeTabs";
import { useBottomSheetDispatch, useBottonSheetState } from "../bottomsheet";
import Sheet from "react-modal-sheet";
import { matchPath, Route, Switch, useHistory, useLocation, } from "react-router-dom";
import { HomePages } from "../pages";
import { NewPatientPage } from "./NewPatientPage";
import { DiagnosticOrdersPage } from "./DiagnosticOrdersPage";
import { PatientPage } from "./Patient";
import { parseJwt } from "../util";
import { AppointmentPage } from "./Appointment";
import { SurgicalOrdersPage } from "./SurgicalOrdersPage";
import { TreatmentOrdersPage } from "./TreatmentOrdersPage";
import { LabOrdersPage } from "./LabOrdersPage";
import { ChatsPage } from "./ChatsPage";
import { AdminHome } from "./Admin/Admin";
import { UpdatePatientPage } from "./UpdatePatientPage";
import { Component404 } from "../components/404/404";
import { ReferralOrdersPage } from "./ReferralOrdersPage";
import ProfilePage from "./ProfilePage";
import { PharmacyHome } from "./PharmacyHome";
import { EyeShopHome } from "./EyeShopeHome";
import HomeReception from "./HomeReception";
import HomeClinician from "./HomeClinician";
import PatientQueuePage from "./PatientQueuePage";
import FollowUpOrdersPage from "./FollowUpOrdersPage";
export const HomePage = () => {
    const history = useHistory();
    const location = useLocation();
    const [pages, setPages] = useState([HomePages[0]]);
    const [activeTab, setActiveTab] = useState("/");
    const [userType, setUserType] = useState();
    const bottomSheetDispatch = useBottomSheetDispatch();
    const { showBottomSheet, snapPoint, BottomSheetChildren } = useBottonSheetState();
    const handlePageSelect = (route) => {
        const existingPage = pages.find((e) => e.route === route);
        let page = HomePages.find((e) => { var _a, _b; return (_b = (_a = matchPath(route.charAt(0) === "/" ? route : `/${route}`, {
            path: e.route,
        })) === null || _a === void 0 ? void 0 : _a.isExact) !== null && _b !== void 0 ? _b : false; });
        if (existingPage === undefined && page !== undefined) {
            const newPages = pages.concat(page);
            setPages(newPages);
        }
        else {
            if (page !== undefined)
                setActiveTab(page.route);
        }
    };
    const handlePageAdd = (page) => {
        const existingPage = pages.find((e) => e.route === page.route);
        if (existingPage === undefined) {
            const newPages = pages.concat(page);
            setPages(newPages);
        }
        else {
            setActiveTab(page.route);
        }
    };
    const handleTabOpen = (route) => {
        setActiveTab(route);
        history.replace(route);
    };
    const handleTabClose = (route) => {
        const newPages = pages.filter((e) => e.route !== route);
        const lastIdx = newPages.length - 1;
        const lastRoute = newPages[lastIdx].route;
        setActiveTab(lastRoute);
        history.replace(lastRoute);
        setPages(newPages);
    };
    useEffect(() => {
        const sessionPagesString = sessionStorage.getItem("currentPages");
        const sessionActiveTabString = sessionStorage.getItem("activeTab");
        if (sessionPagesString !== null) {
            const sessionPages = JSON.parse(sessionPagesString);
            const newPages = sessionPages.map((e) => {
                const routePage = HomePages.find((page) => {
                    var _a;
                    return ((_a = matchPath(location.pathname.charAt(0) === "/"
                        ? location.pathname
                        : `/${location.pathname}`, {
                        path: page.match,
                        exact: true,
                    })) !== null && _a !== void 0 ? _a : false);
                });
                return {
                    title: e.title,
                    cancellable: e.cancellable,
                    route: e.route,
                    icon: routePage === null || routePage === void 0 ? void 0 : routePage.icon,
                    match: e.match,
                    notifs: e.notifs,
                };
            });
            setPages(newPages);
        }
        if (sessionActiveTabString !== null) {
            const sessionActiveTab = sessionActiveTabString;
            setActiveTab(sessionActiveTab);
        }
    }, []);
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token !== null) {
            const claim = parseJwt(token);
            if (claim.UserType.includes("Receptionist")) {
                setUserType("Receptionist");
            }
            else if (claim.UserType.includes("Physician") ||
                claim.UserType.includes("Nurse") ||
                claim.UserType.includes("Optometrist")) {
                setUserType("Clinician");
            }
            else if (claim.UserType.includes("Pharmacist")) {
                setUserType("Pharmacist");
            }
            else if (claim.UserType.includes("Optical Assistant")) {
                setUserType("Optical Assistant");
            }
        }
    }, []);
    useEffect(() => {
        const lastIdx = pages.length - 1;
        const lastRoute = pages[lastIdx].route;
        setActiveTab(lastRoute);
        history.replace(lastRoute);
    }, [pages]);
    useEffect(() => {
        sessionStorage.setItem("currentPages", JSON.stringify(pages));
    }, [pages]);
    useEffect(() => {
        sessionStorage.setItem("activeTab", activeTab);
    }, [activeTab]);
    const handleTabUpdate = (page) => {
    };
    return (_jsxs("div", { children: [_jsx(MainLayout, Object.assign({ onPageSelect: (route) => handlePageSelect(route), onAddPage: (page) => handlePageAdd(page) }, { children: _jsxs("div", { children: [_jsx(HomeTabs, { pages: pages, activeTab: activeTab, onTabOpen: (route) => handleTabOpen(route), onClose: (route) => handleTabClose(route) }, void 0),
                        _jsx("div", Object.assign({ className: "relative flex flex-col min-w-0 break-words w-full mb-6" }, { children: _jsx("div", Object.assign({ className: "px-2 py-5 flex-auto" }, { children: _jsx("div", Object.assign({ className: "tab-content tab-space" }, { children: _jsxs(Switch, { children: [_jsxs(Route, Object.assign({ exact: true, path: "/" }, { children: [userType === "Receptionist" && (_jsx(HomeReception, { onAddPage: (page) => handlePageAdd(page) }, void 0)),
                                                    userType === "Clinician" && (_jsx(HomeClinician, { onAddPage: (page) => handlePageAdd(page) }, void 0)),
                                                    userType === "Pharmacist" && _jsx(PharmacyHome, {}, void 0),
                                                    userType === "Optical Assistant" && _jsx(EyeShopHome, {}, void 0)] }), void 0),
                                            _jsx(Route, Object.assign({ path: "/profile/:profileId" }, { children: _jsx(ProfilePage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/new-patient" }, { children: _jsx(NewPatientPage, { onAddPage: (page) => handlePageAdd(page) }, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/update-patient" }, { children: _jsx(UpdatePatientPage, { onAddPage: (page) => handlePageAdd(page) }, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ path: "/patients" }, { children: _jsx(PatientPage, { onAddPage: handlePageAdd, onUpdateTab: handleTabUpdate }, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ path: "/appointments" }, { children: _jsx(AppointmentPage, { onUpdateTab: handleTabUpdate, onAddPage: (page) => handlePageAdd(page), onTabClose: (route) => handleTabClose(route) }, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ path: "/chats" }, { children: _jsx(ChatsPage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/lab-orders" }, { children: _jsx(LabOrdersPage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/diagnostic-orders" }, { children: _jsx(DiagnosticOrdersPage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/treatment-orders" }, { children: _jsx(TreatmentOrdersPage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/surgical-orders" }, { children: _jsx(SurgicalOrdersPage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/followup-orders" }, { children: _jsx(FollowUpOrdersPage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/referrals" }, { children: _jsx(ReferralOrdersPage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ exact: true, path: "/patient-queue" }, { children: _jsx(PatientQueuePage, {}, void 0) }), void 0),
                                            _jsx(Route, Object.assign({ path: "/admin" }, { children: _jsx(AdminHome, {}, void 0) }), void 0),
                                            _jsx(Route, { children: _jsx(Component404, {}, void 0) }, void 0)] }, void 0) }), void 0) }), void 0) }), void 0)] }, void 0) }), void 0),
            showBottomSheet && (_jsxs(Sheet, Object.assign({ isOpen: showBottomSheet, disableDrag: true, onClose: () => bottomSheetDispatch({ type: "hide" }), snapPoints: [snapPoint] }, { children: [_jsxs(Sheet.Container, Object.assign({ onUnmount: () => {
                            bottomSheetDispatch({ type: "hide" });
                        }, onViewportBoxUpdate: () => { } }, { children: [_jsx(Sheet.Header, { onViewportBoxUpdate: () => { } }, void 0),
                            _jsx(Sheet.Content, Object.assign({ onViewportBoxUpdate: () => { } }, { children: BottomSheetChildren }), void 0)] }), void 0),
                    _jsx(Sheet.Backdrop, { onUnmount: () => {
                            bottomSheetDispatch({ type: "hide" });
                        }, onViewportBoxUpdate: () => { } }, void 0)] }), void 0))] }, void 0));
};
