import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { AppointmentContext } from "../_context/AppointmentContext";
import { BookmarkIcon as BookmarkSolidIcon, ChevronRightIcon, } from "@heroicons/react/solid";
import { BookmarkIcon as BookmarkOutlineIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon, } from "@heroicons/react/outline";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
import { useEffect } from "react";
import classnames from "classnames";
const SYSTEM_SYMPTOMS = gql `
  query SystemSymptoms($page: PaginationInput!, $searchTerm: String) {
    systemSymptoms(page: $page, searchTerm: $searchTerm) {
      totalCount
      edges {
        node {
          id
          title
          systemId
          system {
            id
            title
          }
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
const SystemSymptomsList = ({ onItemClick }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFavorites, setShowFavorites] = useState(true);
    const [systemSymptoms, setSystemSymptoms] = useState([]);
    const [systemsListExpand, setSystemsListExpand] = useState([]);
    const { patientChartLocked } = useContext(AppointmentContext);
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 200,
    });
    const { data, refetch } = useQuery(SYSTEM_SYMPTOMS, {
        variables: {
            page: paginationInput,
            searchTerm,
        },
    });
    const handleItemClick = (systemSymptomId) => {
        if (systemSymptomId !== undefined) {
            onItemClick(systemSymptomId);
        }
    };
    useEffect(() => {
        if (data === null || data === void 0 ? void 0 : data.systemSymptoms) {
            const result = data === null || data === void 0 ? void 0 : data.systemSymptoms.edges.map((e) => e.node);
            const s = Object.entries(_.groupBy(result, "system.title"));
            setSystemSymptoms(s);
            const listExpand = s
                .map((e) => e[0])
                .map((e) => ({ system: e, expand: false }));
            setSystemsListExpand(listExpand);
        }
    }, [data === null || data === void 0 ? void 0 : data.systemSymptoms]);
    useEffect(() => {
        refetch();
    }, [searchTerm]);
    const handleExpandChange = (systemTitle) => {
        const item = systemsListExpand.find((e) => e.system === systemTitle);
        const index = systemsListExpand.findIndex((e) => e.system === systemTitle);
        const result = [
            ...systemsListExpand.slice(0, index),
            {
                system: item.system,
                expand: !item.expand,
            },
            ...systemsListExpand.slice(index + 1),
        ];
        setSystemsListExpand(result);
    };
    return (_jsx("div", Object.assign({ className: "overflow-hidden rounded-lg shadow-xl" }, { children: _jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsxs("thead", { children: [_jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 2, className: "px-4 py-2 bg-teal-700 text-left text-xs text-gray-50 uppercase tracking-wider" }, { children: _jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", { children: "System Symptoms" }, void 0),
                                        _jsx("div", { children: _jsx("button", Object.assign({ type: "button", onClick: () => { } }, { children: showFavorites ? (_jsx(BookmarkSolidIcon, { className: "h-5 w-5 text-white" }, void 0)) : (_jsx(BookmarkOutlineIcon, { className: "h-5 w-5 text-white" }, void 0)) }), void 0) }, void 0)] }), void 0) }), void 0) }, void 0),
                        _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: 2 }, { children: _jsx("div", Object.assign({ className: "flex space-x-1" }, { children: _jsx("input", { type: "search", name: "search", placeholder: "Search", value: searchTerm, className: "w-full sm:text-md border-none outline-none focus:outline-none focus:ring-0", onChange: (evt) => setSearchTerm(evt.target.value) }, void 0) }), void 0) }), void 0) }, void 0)] }, void 0),
                _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-1" }, { children: systemSymptoms.map((systemSymptom, index) => {
                        let items = [
                            _jsx("tr", Object.assign({ className: "hover:bg-gray-100 bg-gray-100 border-t" }, { children: _jsx("td", Object.assign({ className: "px-6 py-2 uppercase text-sm text-gray-700 font-semibold", colSpan: 2 }, { children: systemSymptom[0] }), void 0) }), systemSymptom[0]),
                        ];
                        let symptoms = [];
                        const expand = systemsListExpand.find((e) => e.system === systemSymptom[0]).expand;
                        if (expand) {
                            symptoms = systemSymptom[1];
                        }
                        else {
                            symptoms = systemSymptom[1].slice(0, 5);
                        }
                        symptoms.forEach((symptom) => {
                            items.push(_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 border-t cursor-pointer", onClick: () => !patientChartLocked[0] && handleItemClick(symptom.id) }, { children: [_jsx("td", Object.assign({ className: "px-6 py-3 text-sm text-gray-900" }, { children: symptom.title }), void 0),
                                    _jsx("td", Object.assign({ className: "p-2 cursor-pointer" }, { children: _jsx(ChevronRightIcon, { className: "h-6 w-6 text-gray-500" }, void 0) }), void 0)] }), symptom.id));
                        });
                        if (systemSymptom[1].length > 5) {
                            items.push(_jsxs("tr", Object.assign({ className: classnames("bg-white border-t cursor-pointer", {
                                    "hover:bg-blue-50": !expand,
                                    "hover:bg-yellow-50": expand,
                                }), onClick: () => handleExpandChange(systemSymptom[0]) }, { children: [_jsxs("td", Object.assign({ className: classnames("px-6 py-2 text-sm flex space-x-2 items-center", {
                                            "text-blue-600": !expand,
                                            "text-yellow-600": expand,
                                        }) }, { children: [expand ? (_jsx(ChevronDoubleUpIcon, { className: "h-5 w-5" }, void 0)) : (_jsx(ChevronDoubleDownIcon, { className: "h-5 w-5" }, void 0)),
                                            expand ? _jsx("p", { children: "Collapse" }, void 0) : _jsx("p", { children: "View all" }, void 0)] }), void 0),
                                    _jsx("td", {}, void 0)] }), systemSymptom[0] + "-view-all"));
                        }
                        return items;
                    }) }), void 0)] }), void 0) }), void 0));
};
export default SystemSymptomsList;
