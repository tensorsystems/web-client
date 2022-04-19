import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { OrdersToolbar } from "../components/OrdersToolbar";
import { useBottomSheetDispatch } from "../bottomsheet";
import { useLocation } from "react-router-dom";
import { SurgicalOrdersTable } from "../components/SurgicalOrdersTable";
import CompleteSurgicalOrderForm from "../components/CompleteSurgicalOrderForm";
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
function useRouterQuery() {
    return new URLSearchParams(useLocation().search);
}
export const SurgicalOrdersPage = () => {
    var _a, _b, _c;
    const query = useRouterQuery();
    const queryUserId = query.get("userId");
    const queryStatus = query.get("status");
    const bottomSheetDispatch = useBottomSheetDispatch();
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 20,
    });
    const [filter, setFilter] = useState({
        date: new Date(),
        userId: queryUserId === null ? "all" : queryUserId,
        status: queryStatus === null ? "all" : queryStatus,
        searchTerm: "",
    });
    const { data, refetch } = useQuery(SEARCH_SURGICAL_ORDERS, {
        variables: {
            page: paginationInput,
            filter: {
                orderedById: filter.userId === "all" ? undefined : filter.userId,
                status: filter.status === "all" ? undefined : filter.status,
            },
            searchTerm: ((_a = filter.searchTerm) === null || _a === void 0 ? void 0 : _a.length) === 0 ? undefined : filter.searchTerm,
            date: filter.date,
        },
        pollInterval: 10000,
    });
    useEffect(() => {
        refetch();
    }, [filter, paginationInput]);
    const handleClear = () => {
        setFilter({
            date: new Date(),
            userId: "all",
            status: "all",
            orderType: "SURGICAL_PROCEDURE",
        });
    };
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
                }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onRefresh: () => { } }, void 0)),
        });
    };
    return (_jsxs("div", Object.assign({ className: "h-screen" }, { children: [_jsx(OrdersToolbar, { filter: filter, onClear: handleClear, onChange: setFilter }, void 0),
            _jsx(SurgicalOrdersTable, { totalCount: (_b = data === null || data === void 0 ? void 0 : data.searchSurgicalOrders.totalCount) !== null && _b !== void 0 ? _b : 0, orders: (_c = data === null || data === void 0 ? void 0 : data.searchSurgicalOrders.edges.map((e) => e.node)) !== null && _c !== void 0 ? _c : [], onNext: handleNextClick, onPrev: handlePrevClick, onItemClick: handleOrderClick }, void 0)] }), void 0));
};
