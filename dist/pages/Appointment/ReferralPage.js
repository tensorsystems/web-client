import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { OrderReferralForm } from "../../components/OrderReferralForm";
import { useNotificationDispatch } from "../../notification";
const GET_REFERRAL_ORDER = gql `
  query ReferralOrder($patientChartId: ID!) {
    referralOrder(patientChartId: $patientChartId) {
      status
      createdAt
      orderedBy {
        id
        firstName
        lastName
      }
      referrals {
        id
        referralOrderId
        patientChartId
        reason
        referredToId
        referredToName
        status
        type
      }
    }
  }
`;
const CANCEL_ORDER = gql `
  mutation DeleteReferral($id: ID!) {
    deleteReferral(id: $id)
  }
`;
export const ReferralPage = ({ patientId, patientChartId, }) => {
    var _a;
    const notifDispatch = useNotificationDispatch();
    const bottomSheetDispatch = useBottomSheetDispatch();
    const { data, refetch, error } = useQuery(GET_REFERRAL_ORDER, {
        variables: {
            patientChartId,
        },
    });
    const [cancelOrder] = useMutation(CANCEL_ORDER, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Order cancelled successfully",
                variant: "success",
            });
            refetch();
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
    return (_jsxs("div", Object.assign({ className: "rounded-lg shadow-lg border border-gray-100 py-3 px-3 bg-white" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", Object.assign({ className: "text-2xl tracking-wider text-gray-800 font-light" }, { children: "Referrals" }), void 0),
                    _jsxs("button", Object.assign({ className: "border border-teal-800 text-teal-800 px-3 py-1 rounded-lg flex space-x-1 items-center", onClick: () => {
                            bottomSheetDispatch({
                                type: "show",
                                snapPoint: 0,
                                children: (_jsx(OrderReferralForm, { patientChartId: patientChartId, patientId: patientId, onSuccess: () => {
                                        refetch();
                                        notifDispatch({
                                            type: "show",
                                            notifTitle: "Success",
                                            notifSubTitle: "Referral ordered successfully",
                                            variant: "success",
                                        });
                                        bottomSheetDispatch({ type: "hide" });
                                    }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                            });
                        } }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                            _jsx("p", { children: "Order Referral" }, void 0)] }), void 0)] }), void 0),
            ((_a = data === null || data === void 0 ? void 0 : data.referralOrder.referrals.length) !== null && _a !== void 0 ? _a : 0) === 0 ||
                (error === null || error === void 0 ? void 0 : error.message) === "record not found" ? (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 h-32 flex rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                        _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)) : (_jsx("div", Object.assign({ className: "mt-4" }, { children: _jsxs("table", Object.assign({ className: "table-auto divide-y divide-gray-200 mt-4 w-full shadow-lg rounded-lg" }, { children: [_jsx("thead", Object.assign({ className: "bg-teal-700" }, { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Referred By" }), void 0),
                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Referred To" }), void 0),
                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Reason" }), void 0),
                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Referred Date" }), void 0),
                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Action" }), void 0)] }, void 0) }), void 0),
                        _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.referralOrder.referrals.map((e) => {
                                var _a, _b, _c, _d;
                                return (_jsxs("tr", { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `Dr. ${(_b = (_a = data === null || data === void 0 ? void 0 : data.referralOrder) === null || _a === void 0 ? void 0 : _a.orderedBy) === null || _b === void 0 ? void 0 : _b.firstName} ${(_d = (_c = data === null || data === void 0 ? void 0 : data.referralOrder) === null || _c === void 0 ? void 0 : _c.orderedBy) === null || _d === void 0 ? void 0 : _d.lastName}` }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.referredToName }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.reason }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: format(parseISO(data === null || data === void 0 ? void 0 : data.referralOrder.createdAt), "MMM d, y") }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e.status === "ORDERED" && (_jsxs("button", Object.assign({ className: "border border-red-600 text-red-800 px-2 text-sm py-1 rounded-lg flex space-x-1 items-center", onClick: () => {
                                                    if (e === null || e === void 0 ? void 0 : e.id) {
                                                        cancelOrder({ variables: { id: e === null || e === void 0 ? void 0 : e.id } });
                                                    }
                                                } }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "close" }), void 0),
                                                    _jsx("p", { children: "Cancel order" }, void 0)] }), void 0)) }), void 0)] }, e === null || e === void 0 ? void 0 : e.id));
                            }) }), void 0)] }), void 0) }), void 0))] }), void 0));
};
