import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
const GET_PROVIDERS = gql `
  query Providers($input: String!) {
    getByUserTypeTitle(input: $input) {
      id
      firstName
      lastName
    }
  }
`;
export const PrescriptionOrdersToolbar = ({ date, onDateChange, status, onStatusChange, searchTerm, onSearchTermChange, onClear, }) => {
    const { data } = useQuery(GET_PROVIDERS, {
        variables: {
            input: "Physician",
        },
    });
    return (_jsxs("div", Object.assign({ className: "flex bg-white w-full h-16 p-4 rounded-md shadow-md justify-between items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center text-gray-700" }, { children: [_jsx("input", { type: "date", name: "date", className: "border-l-1 border-gray-100 rounded-md", value: format(date, "yyyy-MM-dd"), onChange: (evt) => {
                            const value = evt.target.value;
                            onDateChange(new Date(value));
                        } }, void 0),
                    _jsxs("select", Object.assign({ name: "status", value: status !== null && status !== void 0 ? status : "all", className: "ml-6 border-l-1 border-gray-100 rounded-md", onChange: (evt) => {
                            onStatusChange(evt.target.value);
                        } }, { children: [_jsx("option", Object.assign({ value: "all" }, { children: "All statuses" }), void 0),
                            _jsx("option", Object.assign({ value: "ORDERED" }, { children: "Ordered" }), void 0),
                            _jsx("option", Object.assign({ value: "COMPLETED" }, { children: "Completed" }), void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "ml-6 border-l-2 p-1 pl-6" }, { children: _jsx("button", Object.assign({ onClick: onClear, className: "uppercase text-white tracking-wider text-sm rounded-md bg-teal-600 px-6 py-2" }, { children: "Clear" }), void 0) }), void 0)] }), void 0),
            _jsx("div", { children: _jsxs("div", Object.assign({ className: "relative mx-auto text-gray-600" }, { children: [_jsx("input", { className: "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none", type: "search", name: "searchTerm", placeholder: "Search", value: searchTerm, onChange: (evt) => onSearchTermChange(evt.target.value.trim()) }, void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "absolute right-0 top-0 mt-3 mr-4" }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }, void 0) }), void 0) }), void 0)] }), void 0) }, void 0)] }), void 0));
};
