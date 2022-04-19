import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import { NavLink, useHistory, useLocation, useRouteMatch, } from "react-router-dom";
export const NavItem = ({ route, label, completed, subItem, icon, disabled, notifs, status }) => {
    const match = useRouteMatch();
    const { search } = useLocation();
    const history = useHistory();
    const fullRoute = `${match.url}/${route}`;
    const location = `${history.location.pathname}${search}`;
    const selected = fullRoute === location;
    function BuildIcon() {
        if (subItem) {
            return _jsx("span", Object.assign({ className: "material-icons text-gray-600" }, { children: icon }), void 0);
        }
        else {
            return (_jsx("div", { children: icon === undefined ? (_jsxs("div", Object.assign({ className: "material-icons text-teal-800" }, { children: [status === "success" && "check", status === "warning" && "warning", status === "locked" && "lock", status === "pending_actions" && "pending_actions"] }), void 0)) : (_jsx("span", Object.assign({ className: "material-icons" }, { children: icon }), void 0)) }, void 0));
        }
    }
    return (_jsx(NavLink, Object.assign({ to: disabled ? "#" : `${match.url}/${route}`, className: classNames({
            "pointer-events-none": disabled,
        }), activeClassName: "bg-teal-100 text-teal-800" }, { children: _jsx("div", Object.assign({ className: classNames("px-3 py-1 rounded-md", {
                "ml-12": subItem,
                "bg-teal-100": selected,
                "text-green-700": completed,
            }) }, { children: _jsxs("div", Object.assign({ className: classNames("font-sans w-full text-left focus:outline-none flex justify-between space-x-3 items-center", {
                    "text-teal-800": selected,
                    "text-gray-700": !selected,
                }) }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-2 items-center" }, { children: [_jsx(BuildIcon, {}, void 0),
                            subItem ? (_jsx("p", Object.assign({ className: "text-gray-600" }, { children: label }), void 0)) : (_jsx("p", Object.assign({ className: "text-lg font-semibold" }, { children: label }), void 0))] }), void 0),
                    notifs !== undefined && notifs > 0 && (_jsx("div", Object.assign({ className: "bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center shadow-inner" }, { children: notifs }), void 0))] }), void 0) }), void 0) }), void 0));
};
