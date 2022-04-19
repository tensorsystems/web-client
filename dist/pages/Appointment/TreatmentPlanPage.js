import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useBottomSheetDispatch } from "../../bottomsheet";
import classnames from "classnames";
import { useNotificationDispatch } from "../../notification";
import { format, parseISO } from "date-fns";
import { TreatmentTypesComponent } from "../../components/TreatmentTypes";
import { TreatmentStatus, } from "../../models/models";
import OrderTreatmentForm from "../../components/OrderTreatmentForm";
const GET_PATIENT_TREATMENTS = gql `
  query TreatmentOrder($patientChartId: ID!) {
    treatmentOrder(patientChartId: $patientChartId) {
      id
      status
      createdAt
      userName
      orderedBy {
        id
        firstName
        lastName
      }
      treatments {
        id
        status
        treatmentType {
          title
        }
        payments {
          id
          status
        }
      }
    }
  }
`;
const CANCEL_ORDER = gql `
  mutation DeleteTreatment($id: ID!) {
    deleteTreatment(id: $id)
  }
`;
export const TreatmentPlanPage = ({ patientId, appointmentId, patientChart }) => {
    var _a, _b;
    const notifDispatch = useNotificationDispatch();
    const bottomSheetDispatch = useBottomSheetDispatch();
    const { data, refetch, error } = useQuery(GET_PATIENT_TREATMENTS, {
        variables: {
            patientChartId: patientChart.id,
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
    const handleTreatmentClick = (item) => {
        if (patientChart === null || patientChart === void 0 ? void 0 : patientChart.id) {
            bottomSheetDispatch({
                type: "show",
                snapPoint: 0,
                children: (_jsx(OrderTreatmentForm, { patientId: patientId, patientChartId: patientChart.id, appointmentId: appointmentId, treatmentType: item, onSuccess: () => {
                        refetch();
                        notifDispatch({
                            type: "show",
                            notifTitle: "Success",
                            notifSubTitle: "Treatment ordered successfully",
                            variant: "success",
                        });
                        bottomSheetDispatch({ type: "hide" });
                    }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
            });
        }
    };
    return (_jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "w-1/3" }, { children: _jsx(TreatmentTypesComponent, { onItemClick: handleTreatmentClick }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "flex-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Patient treatments" }), void 0),
                    _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                    (((_a = data === null || data === void 0 ? void 0 : data.treatmentOrder.treatments.length) !== null && _a !== void 0 ? _a : 0) === 0 ||
                        (error === null || error === void 0 ? void 0 : error.message) === "record not found") && (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 flex h-44 rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)),
                    ((_b = data === null || data === void 0 ? void 0 : data.treatmentOrder.treatments.length) !== null && _b !== void 0 ? _b : 0) > 0 &&
                        (error === null || error === void 0 ? void 0 : error.message) !== "record not found" && (_jsxs("table", Object.assign({ className: "table-auto divide-y divide-gray-200 mt-4 w-full shadow-lg rounded-lg" }, { children: [_jsx("thead", Object.assign({ className: "bg-teal-700" }, { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Treatment" }), void 0),
                                        _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Doctor" }), void 0),
                                        _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Order Date" }), void 0),
                                        _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Status" }), void 0),
                                        _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, void 0)] }, void 0) }), void 0),
                            _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.treatmentOrder.treatments.map((e, i) => (_jsxs("tr", Object.assign({ className: "cursor-pointer hover:bg-gray-100", onClick: () => { } }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.treatmentType.title }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: `${data === null || data === void 0 ? void 0 : data.treatmentOrder.userName}` }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: format(parseISO(data === null || data === void 0 ? void 0 : data.treatmentOrder.createdAt), "MMM d, y") }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: _jsxs("span", Object.assign({ className: classnames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                    "bg-yellow-100 text-yellow-800": (e === null || e === void 0 ? void 0 : e.status) === TreatmentStatus.Ordered,
                                                }, {
                                                    "bg-green-100 text-green-800": (e === null || e === void 0 ? void 0 : e.status) === TreatmentStatus.Completed,
                                                }) }, { children: [(e === null || e === void 0 ? void 0 : e.status) === TreatmentStatus.Ordered && "Ordered",
                                                    (e === null || e === void 0 ? void 0 : e.status) === TreatmentStatus.Completed && "Completed"] }), void 0) }), void 0),
                                        _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-gray-900" }, { children: !(e === null || e === void 0 ? void 0 : e.payments.every((e) => e.status === "PAID")) && (_jsx("button", Object.assign({ className: "border border-red-600 text-red-800 px-2 text-sm py-1 rounded-lg flex space-x-1 items-center", onClick: () => {
                                                    if (e === null || e === void 0 ? void 0 : e.id) {
                                                        cancelOrder({ variables: { id: e === null || e === void 0 ? void 0 : e.id } });
                                                    }
                                                } }, { children: _jsx("p", { children: "Cancel order" }, void 0) }), void 0)) }), void 0)] }), e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), void 0))] }), void 0)] }), void 0));
};