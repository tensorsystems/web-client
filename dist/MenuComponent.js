import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import classnames from "classnames";
export default function (props) {
    const color = props.color ? props.color : "";
    const rounded = props.rounded ? props.rounded : "";
    return (_jsxs(Menu, Object.assign({ as: "div", className: "relative inline-block text-left" }, { children: [_jsx("div", { children: _jsxs(Menu.Button, Object.assign({ className: classnames("inline-flex justify-center w-full px-4 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75", {
                        "bg-teal-300 text-gray-600 hover:text-gray-800 bg-opacity-20 hover:bg-opacity-30": props.color === undefined,
                        [color]: props.color !== undefined,
                        "rounded-md": props.rounded === undefined,
                        [rounded]: props.rounded !== undefined,
                    }) }, { children: [props.title, _jsx(ChevronDownIcon, { className: "w-5 h-5 ml-2 -mr-1", "aria-hidden": "true" }, void 0)] }), void 0) }, void 0),
            _jsx(Transition, Object.assign({ as: Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" }, { children: _jsx(Menu.Items, Object.assign({ className: "absolute z-50 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, { children: props.menus }), void 0) }), void 0)] }), void 0));
}
