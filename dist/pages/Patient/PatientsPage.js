import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PatientsPage = ({}) => {
    return (_jsxs("div", Object.assign({ className: "h-screen" }, { children: [_jsx(Toolbar, {}, void 0),
            _jsx(PatientsTable, {}, void 0)] }), void 0));
};
const Toolbar = () => {
    return (_jsx("div", Object.assign({ className: "flex bg-white w-full h-16 p-4 mt-4 rounded-md shadow-md justify-between items-center" }, { children: _jsx("div", Object.assign({ className: "flex items-center text-gray-700" }, { children: _jsxs("div", Object.assign({ className: "relative mx-auto text-gray-600" }, { children: [_jsx("input", { className: "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none", type: "search", name: "searchTerm", placeholder: "Search", onChange: (evt) => { } }, void 0),
                    _jsx("button", Object.assign({ type: "submit", className: "absolute right-0 top-0 mt-3 mr-4" }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0) }), void 0));
};
const PatientsTable = () => {
    return (_jsx("div", Object.assign({ className: "flex flex-col mt-4" }, { children: _jsx("div", Object.assign({ className: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, { children: _jsx("div", Object.assign({ className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" }, { children: _jsx("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" }, { children: _jsx("table", { className: "min-w-full divide-y divide-gray-200" }, void 0) }), void 0) }), void 0) }), void 0) }), void 0));
};
