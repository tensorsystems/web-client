import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useContext, useState } from "react";
import { AppointmentContext } from "../_context/AppointmentContext";
import { BookmarkIcon as BookmarkSolidIcon, } from "@heroicons/react/solid";
import { BookmarkIcon as BookmarkOutlineIcon, } from "@heroicons/react/outline";
const EXAM_CATEGORIES = gql `
  query ExamCategories($page: PaginationInput!) {
    examCategories(page: $page) {
      totalCount
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
const PhysicalExamCategoryList = ({ onItemClick }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFavorites, setShowFavorites] = useState(true);
    const { patientChartLocked } = useContext(AppointmentContext);
    const { data } = useQuery(EXAM_CATEGORIES, {
        variables: {
            page: { page: 1, size: 200 },
        },
    });
    const handleItemClick = (examCategoryId) => {
        if (examCategoryId !== undefined) {
            onItemClick(examCategoryId);
        }
    };
    return (_jsx("div", Object.assign({ className: "overflow-x-scroll rounded-lg shadow-xl" }, { children: _jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsxs("thead", { children: [_jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 4, className: "px-4 py-2 bg-teal-700 text-left text-xs text-gray-50 uppercase tracking-wider" }, { children: _jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", { children: "Exam Category" }, void 0),
                                        _jsx("div", { children: _jsx("button", Object.assign({ type: "button", onClick: () => setShowFavorites(!showFavorites) }, { children: showFavorites ? (_jsx(BookmarkSolidIcon, { className: "h-5 w-5 text-white" }, void 0)) : (_jsx(BookmarkOutlineIcon, { className: "h-5 w-5 text-white" }, void 0)) }), void 0) }, void 0)] }), void 0) }), void 0) }, void 0),
                        _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: 3 }, { children: _jsx("input", { type: "search", name: "search", placeholder: "Search", className: "w-full sm:text-md border-none", onChange: (evt) => setSearchTerm(evt.target.value.trim()) }, void 0) }), void 0) }, void 0)] }, void 0),
                _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-2" }, { children: data === null || data === void 0 ? void 0 : data.examCategories.edges.map((e) => (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 border-t cursor-pointer", onClick: () => !patientChartLocked[0] && (e === null || e === void 0 ? void 0 : e.node.id) &&
                            handleItemClick(e === null || e === void 0 ? void 0 : e.node.id) }, { children: [_jsx("td", Object.assign({ className: "pl-4 pt-1" }, { children: _jsx("span", Object.assign({ className: "material-icons text-yellow-600" }, { children: "add_circle" }), void 0) }), void 0),
                            _jsx("td", Object.assign({ className: "pl-4 px-4 py-4 text-sm font-light text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.node.title }), void 0),
                            _jsx("td", Object.assign({ className: "px-3" }, { children: _jsx("span", Object.assign({ className: "material-icons text-teal-700 transform hover:scale-110" }, { children: "keyboard_arrow_right" }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0) }), void 0));
};
export default PhysicalExamCategoryList;
