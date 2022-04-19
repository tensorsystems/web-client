import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { TablePagination } from "../../components/TablePagination";
import { useNotificationDispatch } from "../../notification";
import classnames from "classnames";
export const PAYMENT_WAIVERS = gql `
  query PaymentWaivers($page: PaginationInput!) {
    paymentWaivers(page: $page) {
      totalCount
      edges {
        node {
          id
          patient {
            id
            firstName
            lastName
          }
          user {
            id
            firstName
            lastName
          }
          payment {
            id
            billing {
              id
              item
              code
              price
            }
          }
          approved
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
const APPROVE_PAYMENT_WAIVER = gql `
  mutation ApprovePaymentWaiver($id: ID!, $approve: Boolean!) {
    approvePaymentWaiver(id: $id, approve: $approve) {
      id
    }
  }
`;
const ROWS_PER_PAGE = 20;
export const PaymentWaiversPage = () => {
    var _a;
    const bottomSheetDispatch = useBottomSheetDispatch();
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: ROWS_PER_PAGE,
    });
    const { data, refetch } = useQuery(PAYMENT_WAIVERS, {
        variables: { page: paginationInput },
    });
    useEffect(() => {
        refetch();
    }, [paginationInput]);
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.paymentWaivers.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleRequestClick = (paymentWaiver) => {
        bottomSheetDispatch({
            type: "show",
            snapPoint: 500,
            children: (_jsx(HandleWaiverForm, { paymentWaiver: paymentWaiver, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSuccess: () => {
                    refetch();
                    bottomSheetDispatch({ type: "hide" });
                } }, void 0)),
        });
    };
    return (_jsx("div", Object.assign({ className: "w-full" }, { children: _jsx("div", Object.assign({ className: "overflow-x-auto" }, { children: _jsxs("div", Object.assign({ className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" }, { children: [_jsxs("table", Object.assign({ className: "min-w-full divide-y divide-gray-200" }, { children: [_jsxs("thead", { children: [_jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 6, className: "px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Payment waiver requests" }), void 0) }, void 0),
                                    _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: 6 }, { children: _jsx("input", { type: "text", name: "search", placeholder: "Search", className: "p-3 pl-4 block w-full sm:text-md border-gray-300" }, void 0) }), void 0) }, void 0),
                                    _jsxs("tr", Object.assign({ className: "bg-gray-50" }, { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Patient" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Billing" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Code" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Price" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Requested by" }), void 0),
                                            _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" }, { children: "Status" }), void 0)] }), void 0)] }, void 0),
                            _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.paymentWaivers.edges.map((value) => (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100", onClick: () => {
                                        (value === null || value === void 0 ? void 0 : value.node) && handleRequestClick(value.node);
                                    } }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${value === null || value === void 0 ? void 0 : value.node.patient.firstName} ${value === null || value === void 0 ? void 0 : value.node.patient.lastName}` }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${value === null || value === void 0 ? void 0 : value.node.payment.billing.item}` }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${value === null || value === void 0 ? void 0 : value.node.payment.billing.code}` }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `ETB ${value === null || value === void 0 ? void 0 : value.node.payment.billing.price}` }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${value === null || value === void 0 ? void 0 : value.node.user.firstName} ${value === null || value === void 0 ? void 0 : value.node.user.lastName}` }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: _jsx("span", Object.assign({ className: classnames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                    "bg-yellow-100 text-yellow-800": !(value === null || value === void 0 ? void 0 : value.node.approved),
                                                }, {
                                                    "bg-green-100 text-green-800": value === null || value === void 0 ? void 0 : value.node.approved,
                                                }) }, { children: (value === null || value === void 0 ? void 0 : value.node.approved) ? "Approved" : "Not approved" }), void 0) }), void 0)] }), value === null || value === void 0 ? void 0 : value.node.id))) }), void 0)] }), void 0),
                    _jsx(TablePagination, { totalCount: (_a = data === null || data === void 0 ? void 0 : data.paymentWaivers.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0) }), void 0) }), void 0));
};
export const HandleWaiverForm = ({ paymentWaiver, onSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const [updatePaymentWaiver] = useMutation(APPROVE_PAYMENT_WAIVER, {
        onCompleted(data) {
            onSuccess();
        },
        onError(error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const onApprove = () => {
        updatePaymentWaiver({
            variables: {
                id: paymentWaiver.id,
                approve: true,
            },
        });
    };
    const onReject = () => {
        updatePaymentWaiver({
            variables: {
                id: paymentWaiver.id,
                approve: false,
            },
        });
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl text-teal-700 font-semibold tracking-wider" }, { children: "Payment waiver request" }), void 0),
                        _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsxs("table", Object.assign({ className: "table-fixed w-full" }, { children: [_jsx("thead", { children: _jsxs("tr", Object.assign({ className: "bg-gray-50" }, { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Patient" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Billing" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Price" }), void 0),
                                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" }, { children: "Requested by" }), void 0)] }), void 0) }, void 0),
                                    _jsx("tbody", { children: _jsxs("tr", Object.assign({ className: "border-t" }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${paymentWaiver === null || paymentWaiver === void 0 ? void 0 : paymentWaiver.patient.firstName} ${paymentWaiver === null || paymentWaiver === void 0 ? void 0 : paymentWaiver.patient.lastName}` }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${paymentWaiver === null || paymentWaiver === void 0 ? void 0 : paymentWaiver.payment.billing.item} (${paymentWaiver === null || paymentWaiver === void 0 ? void 0 : paymentWaiver.payment.billing.code})` }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: paymentWaiver === null || paymentWaiver === void 0 ? void 0 : paymentWaiver.payment.billing.price }), void 0),
                                                _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${paymentWaiver === null || paymentWaiver === void 0 ? void 0 : paymentWaiver.user.firstName} ${paymentWaiver === null || paymentWaiver === void 0 ? void 0 : paymentWaiver.user.lastName}` }), void 0)] }), void 0) }, void 0)] }), void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-5 flex space-x-3" }, { children: [_jsx("button", Object.assign({ type: "button", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none", onClick: onApprove }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Approve" }), void 0) }), void 0),
                                _jsx("button", Object.assign({ type: "button", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none", onClick: onReject }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Reject" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0));
};
