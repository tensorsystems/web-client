import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { TablePagination } from "./TablePagination";
import { gql, useLazyQuery } from "@apollo/client";
import debounce from "lodash-es/debounce";
const GET_PROVIDER_ORDERS = gql `
  query ProviderOrders($page: PaginationInput!, $searchTerm: String) {
    providerOrders(page: $page, searchTerm: $searchTerm) {
      totalCount
      edges {
        node {
          id
          firstName
          lastName
          phoneNo
          patientId
          appointmentId
          status
          orderType
          status
          payments {
            id
            invoiceNo
            status
            billing {
              id
              item
              code
              price
              credit
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
export const ProviderOrdersTable = ({ onOrderClick }) => {
    var _a, _b, _c;
    const [showSearch, setShowSearch] = useState(false);
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 5,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const orderQuery = useLazyQuery(GET_PROVIDER_ORDERS, {
        variables: {
            page: paginationInput,
        },
        pollInterval: 30000,
    });
    useEffect(() => {
        orderQuery[0]({
            variables: {
                page: paginationInput,
            },
        });
    }, []);
    useEffect(() => {
        orderQuery[0]({
            variables: {
                page: paginationInput,
                searchTerm: debouncedSearchTerm.length > 0 ? debouncedSearchTerm : undefined,
            },
        });
    }, [debouncedSearchTerm, paginationInput]);
    const debouncer = useCallback(debounce((_searchVal) => {
        setDebouncedSearchTerm(_searchVal);
    }, 1000), []);
    const handleNextClick = () => {
        var _a, _b;
        const totalPages = (_b = (_a = orderQuery[1].data) === null || _a === void 0 ? void 0 : _a.providerOrders.pageInfo.totalPages) !== null && _b !== void 0 ? _b : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleOrderClick = (e) => {
        const isPendingPayments = e === null || e === void 0 ? void 0 : e.node.payments.some((p) => p.status === "NOTPAID");
        if (!isPendingPayments && e) {
            onOrderClick(e.node);
        }
    };
    return (_jsxs("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg " }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsx("thead", { children: _jsxs("tr", Object.assign({ className: "border-purple-700 border-l-4" }, { children: [_jsx("th", Object.assign({ scope: "col", colSpan: 1, className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Your Orders" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", colSpan: 2, className: "px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: _jsxs("div", Object.assign({ className: "flex justify-end" }, { children: [showSearch && (_jsx("input", { autoFocus: true, type: "search", placeholder: "Search", value: searchTerm, onChange: (evt) => {
                                                    setSearchTerm(evt.target.value.trim());
                                                    debouncer(evt.target.value.trim());
                                                }, onBlur: () => setShowSearch(false), className: "px-2 py-1 border border-gray-200 rounded-md shadow-inner" }, void 0)),
                                            !showSearch && (_jsx("button", Object.assign({ type: "button", onClick: () => setShowSearch(true) }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-5 w-5" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }, void 0) }), void 0) }), void 0))] }), void 0) }), void 0)] }), void 0) }, void 0),
                    _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: (_a = orderQuery[1].data) === null || _a === void 0 ? void 0 : _a.providerOrders.edges.map((e) => {
                            const isPendingPayments = e === null || e === void 0 ? void 0 : e.node.payments.some((p) => p.status === "NOTPAID");
                            return (_jsxs("tr", Object.assign({ className: classnames("hover:bg-gray-100 cursor-pointer", {}), onClick: () => handleOrderClick(e) }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4" }, { children: _jsxs("div", Object.assign({ className: "flex items-center" }, { children: [_jsx("div", Object.assign({ className: "flex-shrink-0 h-10 w-10" }, { children: _jsxs("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: classnames("h-10 w-10 text-gray-600", {
                                                            "text-red-500": (e === null || e === void 0 ? void 0 : e.node.status) === "ORDERED" && isPendingPayments,
                                                            "text-yellow-500": (e === null || e === void 0 ? void 0 : e.node.status) === "ORDERED" && !isPendingPayments,
                                                            "text-green-500": (e === null || e === void 0 ? void 0 : e.node.status) === "COMPLETED",
                                                        }) }, { children: [_jsx("path", { d: "M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" }, void 0),
                                                            _jsx("path", { d: "M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" }, void 0)] }), void 0) }), void 0),
                                                _jsxs("div", Object.assign({ className: "ml-4" }, { children: [_jsxs("div", Object.assign({ className: "text-sm font-medium text-gray-900" }, { children: [`${e === null || e === void 0 ? void 0 : e.node.firstName} ${e === null || e === void 0 ? void 0 : e.node.lastName}`, " (", e === null || e === void 0 ? void 0 : e.node.id, ")"] }), void 0),
                                                        _jsxs("div", Object.assign({ className: "text-sm text-gray-500" }, { children: [(e === null || e === void 0 ? void 0 : e.node.status) === "ORDERED" && isPendingPayments && (_jsx("p", { children: "Pending Payments" }, void 0)),
                                                                (e === null || e === void 0 ? void 0 : e.node.status) === "ORDERED" && !isPendingPayments && (_jsx("p", { children: "Pending Results" }, void 0)),
                                                                (e === null || e === void 0 ? void 0 : e.node.status) === "COMPLETED" && _jsx("p", { children: "Completed" }, void 0)] }), void 0)] }), void 0)] }), void 0) }), void 0),
                                    _jsx("td", Object.assign({ colSpan: 2, className: "px-6 py-4 text-sm text-gray-700 font-semibold" }, { children: e === null || e === void 0 ? void 0 : e.node.payments.map((e) => e.billing.item).join(", ") }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                        }) }), void 0)] }), void 0),
            _jsx(TablePagination, { totalCount: (_c = (_b = orderQuery[1].data) === null || _b === void 0 ? void 0 : _b.providerOrders.totalCount) !== null && _c !== void 0 ? _c : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0));
};
const statusText = (status) => {
    if (status === "PAID")
        return "Payment confirmed";
    if (status === "NOTPAID")
        return "Not paid";
    if (status === "COMPLETED")
        return "Order completed";
};
