import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import gql from "graphql-tag";
import { useState } from "react";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { TablePagination } from "../../components/TablePagination";
import { SurgicalOrderStatus, } from "../../models/models";
import { useNotificationDispatch } from "../../notification";
import cn from "classnames";
import CompleteSurgicalOrderForm from "../../components/CompleteSurgicalOrderForm";
const SEARCH_SURGICAL_ORDERS = gql `
  query SearchSurgicalOrders(
    $page: PaginationInput!
    $filter: SurgicalOrderFilter
    $date: Time
    $searchTerm: String
  ) {
    searchSurgicalOrders(
      page: $page
      filter: $filter
      date: $date
      searchTerm: $searchTerm
    ) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          firstName
          lastName
          phoneNo
          userName
          patientId
          orderedBy {
            id
            firstName
            lastName
            userTypes {
              title
            }
          }
          surgicalProcedures {
            id
            receptionNote
            surgicalProcedureType {
              title
            }
            payments {
              id
              status
              invoiceNo
              billing {
                id
                item
                code
                price
                credit
              }
            }
          }
          status
          createdAt
        }
      }
    }
  }
`;
const PatientSurgicalOrders = ({ patientId, }) => {
    var _a;
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 20,
    });
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const { data, refetch } = useQuery(SEARCH_SURGICAL_ORDERS, {
        variables: {
            page: paginationInput,
            filter: {
                patientId,
            },
        },
    });
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.searchSurgicalOrders.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePrevClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleOrderClick = (order) => {
        bottomSheetDispatch({
            type: "show",
            snapPoint: 0,
            children: (_jsx(CompleteSurgicalOrderForm, { selectedOrder: order, onSuccess: () => {
                    refetch();
                    notifDispatch({
                        type: "show",
                        notifTitle: "Success",
                        notifSubTitle: "Receipt printed successfully",
                        variant: "success",
                    });
                    bottomSheetDispatch({ type: "hide" });
                }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onRefresh: () => {
                    refetch();
                } }, void 0)),
        });
    };
    return (_jsxs("div", { children: [_jsxs("table", Object.assign({ className: "w-full divide-y divide-gray-200 shadow-md rounded-md" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Date" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Ordered By" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Payments" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Status" }), void 0)] }, void 0) }, void 0),
                    _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.searchSurgicalOrders.edges.map((e) => {
                            var _a, _b, _c;
                            const payments = e.node.surgicalProcedures
                                .map((p) => p.payments)
                                .flat();
                            return (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 bg-gray-50 cursor-pointer", onClick: () => e.node && handleOrderClick(e.node) }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4" }, { children: format(parseISO(e === null || e === void 0 ? void 0 : e.node.createdAt), "MMM d, y") }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4" }, { children: `${((_a = e === null || e === void 0 ? void 0 : e.node.orderedBy) === null || _a === void 0 ? void 0 : _a.userTypes.some((t) => (t === null || t === void 0 ? void 0 : t.title) === "Physician")) ? "Dr. "
                                            : ""} ${(_b = e.node.orderedBy) === null || _b === void 0 ? void 0 : _b.firstName} ${(_c = e.node.orderedBy) === null || _c === void 0 ? void 0 : _c.lastName}` }), void 0),
                                    _jsxs("td", Object.assign({ className: "px-6 py-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm text-gray-900" }, { children: payments
                                                    .map((p) => `${p === null || p === void 0 ? void 0 : p.billing.item} (${p === null || p === void 0 ? void 0 : p.billing.code})`)
                                                    .join(", ") }), void 0),
                                            _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: `ETB ${payments.reduce((a, c) => a + ((c === null || c === void 0 ? void 0 : c.billing) ? c === null || c === void 0 ? void 0 : c.billing.price : 0), 0)}` }), void 0)] }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-teal-700 tracking-wide font-semibold" }, { children: _jsx("span", Object.assign({ className: cn("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                "bg-yellow-100 text-yellow-800": (e === null || e === void 0 ? void 0 : e.node.status) === SurgicalOrderStatus.Ordered ||
                                                    payments.some((e) => e.status === "NOTPAID" ||
                                                        e.status === "PAYMENT_WAIVER_REQUESTED"),
                                            }, {
                                                "bg-green-100 text-green-800": payments.every((e) => e.status === "PAID"),
                                            }) }, { children: e === null || e === void 0 ? void 0 : e.node.status }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                        }) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "" }, { children: _jsx(TablePagination, { color: "bg-gray-50 shadow-md", totalCount: (_a = data === null || data === void 0 ? void 0 : data.searchSurgicalOrders.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePrevClick }, void 0) }), void 0)] }, void 0));
};
export default PatientSurgicalOrders;
