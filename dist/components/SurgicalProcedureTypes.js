import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { TablePagination } from "./TablePagination";
import { AppointmentContext } from "../_context/AppointmentContext";
const SURGICAL_PROCEDURE_TYPES = gql `
  query SurgicalProcedureTypes($page: PaginationInput!, $searchTerm: String) {
    surgicalProcedureTypes(page: $page, searchTerm: $searchTerm) {
      totalCount
      edges {
        node {
          id
          title
          billings {
            id
            item
            code
            price
          }
          supplies {
            id
            title
            billings {
              id
              item
              code
              price
            }
          }
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
export const SurgicalProcedureTypes = ({ onItemClick }) => {
    var _a;
    const [searchTerm, setSearchTerm] = useState("");
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 20,
    });
    const { data, refetch } = useQuery(SURGICAL_PROCEDURE_TYPES, {
        variables: { page: paginationInput, searchTerm },
    });
    const { patientChartLocked } = React.useContext(AppointmentContext);
    useEffect(() => {
        refetch();
    }, [paginationInput, searchTerm]);
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.surgicalProcedureTypes.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleItemClick = (item) => {
        onItemClick(item);
    };
    return (_jsxs("div", Object.assign({ className: "overflow-hidden rounded-lg shadow-xl" }, { children: [_jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsxs("thead", { children: [_jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 2, className: "px-4 py-2 bg-teal-700 text-left text-xs text-gray-50 uppercase tracking-wider" }, { children: "Surgical procedures list" }), void 0) }, void 0),
                            _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: 2 }, { children: _jsx("input", { type: "search", name: "search", placeholder: "Search", className: "block w-full sm:text-md border-none", onChange: (evt) => setSearchTerm(evt.target.value.trim()) }, void 0) }), void 0) }, void 0)] }, void 0),
                    _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-1" }, { children: data === null || data === void 0 ? void 0 : data.surgicalProcedureTypes.edges.map((e) => (_jsxs("tr", Object.assign({ onClick: () => !patientChartLocked[0] && (e === null || e === void 0 ? void 0 : e.node) && handleItemClick(e === null || e === void 0 ? void 0 : e.node), className: "hover:bg-gray-100 border-t cursor-pointer" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-5 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.node.title }), void 0),
                                _jsx("td", Object.assign({ className: "p-2" }, { children: _jsx("span", Object.assign({ className: "material-icons" }, { children: "keyboard_arrow_right" }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
            _jsx(TablePagination, { totalCount: (_a = data === null || data === void 0 ? void 0 : data.surgicalProcedureTypes.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0));
};
