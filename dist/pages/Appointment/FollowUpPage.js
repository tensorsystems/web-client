import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { OrderFollowUpForm } from "../../components/OrderFollowUpForm";
import { useNotificationDispatch } from "../../notification";
const GET_FOLLOW_UP_ORDER = gql `
  query FollowUpOrder($patientChartId: ID!) {
    followUpOrder(patientChartId: $patientChartId) {
      status
      createdAt
      followUps {
        id
        receptionNote
        status
      }
    }
  }
`;
const CANCEL_ORDER = gql `
  mutation DeleteFollowUp($id: ID!) {
    deleteFollowUp(id: $id)
  }
`;
export const FollowUpPage = ({ patientChartId, patientId, }) => {
    var _a;
    const notifDispatch = useNotificationDispatch();
    const bottomSheetDispatch = useBottomSheetDispatch();
    const { data, refetch, error } = useQuery(GET_FOLLOW_UP_ORDER, {
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
    return (_jsxs("div", Object.assign({ className: "rounded-lg shadow-lg border border-gray-100 py-3 px-3 bg-white" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", Object.assign({ className: "text-2xl tracking-wider text-gray-800 font-light" }, { children: "Follow-Ups" }), void 0),
                    _jsxs("button", Object.assign({ className: "border border-teal-800 text-teal-800 px-3 py-1 rounded-lg flex space-x-1 items-center", onClick: () => {
                            bottomSheetDispatch({
                                type: "show",
                                snapPoint: 0,
                                children: (_jsx(OrderFollowUpForm, { patientChartId: patientChartId, patientId: patientId, onSuccess: () => {
                                        refetch();
                                        notifDispatch({
                                            type: "show",
                                            notifTitle: "Success",
                                            notifSubTitle: "Follow-Up ordered successfully",
                                            variant: "success",
                                        });
                                        bottomSheetDispatch({ type: "hide" });
                                    }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                            });
                        } }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                            _jsx("p", { children: "Order Follow-Up" }, void 0)] }), void 0)] }), void 0),
            ((_a = data === null || data === void 0 ? void 0 : data.followUpOrder.followUps.length) !== null && _a !== void 0 ? _a : 0) === 0 ||
                (error === null || error === void 0 ? void 0 : error.message) === "record not found" ? (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 h-32 flex rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                        _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)) : (_jsx("div", Object.assign({ className: "mt-4" }, { children: _jsxs("table", Object.assign({ className: "table-auto divide-y divide-gray-200 mt-4 w-full shadow-lg rounded-lg" }, { children: [_jsx("thead", Object.assign({ className: "bg-teal-700" }, { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Ordered Date" }), void 0),
                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Reception Note" }), void 0),
                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Status" }), void 0),
                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Action" }), void 0)] }, void 0) }), void 0),
                        _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.followUpOrder.followUps.map((e) => (_jsxs("tr", { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: format(parseISO(data === null || data === void 0 ? void 0 : data.followUpOrder.createdAt), "MMM d, y") }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.receptionNote }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.status }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e.status === "ORDERED" && (_jsxs("button", Object.assign({ className: "border border-red-600 text-red-800 px-2 text-sm py-1 rounded-lg flex space-x-1 items-center", onClick: () => {
                                                if (e === null || e === void 0 ? void 0 : e.id) {
                                                    cancelOrder({ variables: { id: e === null || e === void 0 ? void 0 : e.id } });
                                                }
                                            } }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "close" }), void 0),
                                                _jsx("p", { children: "Cancel order" }, void 0)] }), void 0)) }), void 0)] }, e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), void 0) }), void 0))] }), void 0));
};
