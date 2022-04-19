import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from "classnames";
import { useRouteMatch, useHistory, useLocation, NavLink, } from "react-router-dom";
export const Tabs = ({ tabs, value, onChange }) => {
    const match = useRouteMatch();
    const history = useHistory();
    const { search } = useLocation();
    return (_jsx("div", Object.assign({ className: "mb-3" }, { children: _jsx("ul", Object.assign({ className: "list-reset flex space-x-3 items-center" }, { children: tabs.map((e) => {
                const fullRoute = `${match.url}/${e.route}`;
                const location = `${history.location.pathname}${search}`;
                const selected = fullRoute === location;
                return (_jsx(NavLink, Object.assign({ to: `${match.url}/${e.route}`, className: "-mb-px", activeClassName: "bg-teal-100 text-teal-800" }, { children: _jsx("div", Object.assign({ className: cn("bg-gray-50 inline-block py-3 px-5 text-gray-800 rounded-sm", {
                            "border-r-2 font-bold text-teal-800 shadow-lg transform scale-y-110": selected,
                            "shadow-md": !selected,
                        }) }, { children: _jsxs("div", Object.assign({ className: "flex space-x-2 items-center" }, { children: [_jsx("div", { children: selected ? e.selectedIcon : e.icon }, void 0),
                                _jsx("div", { children: e.title }, void 0)] }), void 0) }), void 0) }), e.title));
            }) }), void 0) }), void 0));
};
