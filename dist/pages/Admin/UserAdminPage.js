import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useBottomSheetDispatch } from "../../bottomsheet";
import classnames from "classnames";
import { useNotificationDispatch } from "../../notification";
import { TablePagination } from "../../components/TablePagination";
import { UserRegistrationForm } from "../../components/UserRegistrationForm";
import { UserUpdateForm } from "../../components/UserUpdateForm";
const USERS = gql `
  query Users(
    $page: PaginationInput!
    $filter: UserFilter
    $searchTerm: String
  ) {
    users(page: $page, filter: $filter, searchTerm: $searchTerm) {
      totalCount
      edges {
        node {
          id
          firstName
          lastName
          email
          confirmed
          locked
          active
          userTypes {
            id
            title
          }
          signature {
            id
            size
            hash
            fileName
            extension
            contentType
          }
          profilePic {
            id
            size
            hash
            fileName
            extension
            contentType
          }
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
const ROWS_PER_PAGE = 20;
export const UserAdminPage = () => {
    var _a;
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: ROWS_PER_PAGE,
    });
    const { data, refetch } = useQuery(USERS, {
        variables: {
            page: paginationInput,
            searchTerm: searchTerm.length === 0 ? undefined : searchTerm,
        },
    });
    useEffect(() => {
        refetch();
    }, [paginationInput, searchTerm]);
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.users.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleSearchTermChange = (evt) => {
        const value = evt.target.value;
        setSearchTerm(value);
    };
    return (_jsx("div", Object.assign({ className: "w-full" }, { children: _jsx("div", Object.assign({ className: "overflow-x-auto" }, { children: _jsxs("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsxs("thead", { children: [_jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", colSpan: 3, className: "px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Users" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-700 text-gray-100 text-right" }, { children: _jsx("button", Object.assign({ onClick: () => bottomSheetDispatch({
                                                        type: "show",
                                                        snapPoint: 0,
                                                        children: (_jsx("div", Object.assign({ className: "px-10 py-4" }, { children: _jsxs("div", Object.assign({ className: "" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: () => {
                                                                                bottomSheetDispatch({ type: "hide" });
                                                                            } }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                                                                    _jsx(UserRegistrationForm, { onSuccess: () => {
                                                                            bottomSheetDispatch({ type: "hide" });
                                                                            notifDispatch({
                                                                                type: "show",
                                                                                notifTitle: "Success",
                                                                                notifSubTitle: "User has been saved successfully",
                                                                                variant: "success",
                                                                            });
                                                                            refetch();
                                                                        } }, void 0)] }), void 0) }), void 0)),
                                                    }), className: "uppercase bg-gray-800 hover:bg-gray-600 py-1 px-2 rounded-md text-sm" }, { children: _jsxs("div", Object.assign({ className: "flex items-center" }, { children: [_jsx("div", { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-6 w-6" }, { children: _jsx("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }, void 0) }), void 0) }, void 0),
                                                            _jsx("div", Object.assign({ className: "font-semibold" }, { children: "Add" }), void 0)] }), void 0) }), void 0) }), void 0)] }, void 0),
                                    _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: 4 }, { children: _jsx("input", { type: "text", name: "search", placeholder: "Search", className: "p-3 pl-4 block w-full sm:text-md border-gray-300", onChange: handleSearchTermChange }, void 0) }), void 0) }, void 0),
                                    _jsxs("tr", Object.assign({ className: "bg-gray-50" }, { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "User" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Email" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "User Type" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Status" }), void 0)] }), void 0)] }, void 0),
                            _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.users.edges.map((value) => (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 cursor-pointer", onClick: () => {
                                        bottomSheetDispatch({
                                            type: "show",
                                            snapPoint: 0,
                                            children: (_jsx("div", Object.assign({ className: "px-10 py-4" }, { children: _jsxs("div", Object.assign({ className: "" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: () => {
                                                                    bottomSheetDispatch({ type: "hide" });
                                                                } }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                                                        (value === null || value === void 0 ? void 0 : value.node) && (_jsx(UserUpdateForm, { values: value === null || value === void 0 ? void 0 : value.node, onSuccess: () => {
                                                                bottomSheetDispatch({ type: "hide" });
                                                                notifDispatch({
                                                                    type: "show",
                                                                    notifTitle: "Success",
                                                                    notifSubTitle: "User has been updated successfully",
                                                                    variant: "success",
                                                                });
                                                                refetch();
                                                            }, onResetSuccess: () => {
                                                                bottomSheetDispatch({ type: "hide" });
                                                                notifDispatch({
                                                                    type: "show",
                                                                    notifTitle: "Success",
                                                                    notifSubTitle: "Password successfully reset",
                                                                    variant: "success",
                                                                });
                                                                refetch();
                                                            } }, void 0))] }), void 0) }), void 0)),
                                        });
                                    } }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${value === null || value === void 0 ? void 0 : value.node.firstName} ${value === null || value === void 0 ? void 0 : value.node.lastName}` }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: value === null || value === void 0 ? void 0 : value.node.email }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: value === null || value === void 0 ? void 0 : value.node.userTypes.map((e) => e === null || e === void 0 ? void 0 : e.title).join(", ") }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: _jsx("span", Object.assign({ className: classnames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                    "bg-yellow-100 text-yellow-800": (value === null || value === void 0 ? void 0 : value.node.active) === false,
                                                }, {
                                                    "bg-green-100 text-green-800": (value === null || value === void 0 ? void 0 : value.node.active) === true,
                                                }) }, { children: (value === null || value === void 0 ? void 0 : value.node.active) ? "Active" : "Inactive" }), void 0) }), void 0)] }), value === null || value === void 0 ? void 0 : value.node.id))) }), void 0)] }), void 0),
                    _jsx(TablePagination, { totalCount: (_a = data === null || data === void 0 ? void 0 : data.users.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0) }), void 0) }), void 0));
};
