import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNotificationDispatch } from "../../notification";
import { DiagnosticProcedureTypes } from "../../components/DiagnosticProcedureTypes";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { DiagnosticProcedureStatus, } from "../../models/models";
import classnames from "classnames";
import { OrderDiagnosticProcedureForm } from "../../components/OrderDiagnosticProcedureForm";
import { AppointmentContext } from "../../_context/AppointmentContext";
import DiagnosticProcedureComponent from "../../components/DiagnosticProcedureComponent";
export const GET_DIAGNOSTIC_PROCEDURE_ORDER = gql `
  query DiagnosticProcedureOrder($patientChartId: ID!) {
    diagnosticProcedureOrder(patientChartId: $patientChartId) {
      status
      createdAt
      diagnosticProcedures {
        id
        orderNote
        generalText
        rightDistanceSubjectiveSph
        leftDistanceSubjectiveSph
        rightDistanceSubjectiveCyl
        leftDistanceSubjectiveCyl
        rightDistanceSubjectiveAxis
        leftDistanceSubjectiveAxis
        rightNearSubjectiveSph
        leftNearSubjectiveSph
        rightNearSubjectiveCyl
        leftNearSubjectiveCyl
        rightNearSubjectiveAxis
        leftNearSubjectiveAxis
        rightDistanceObjectiveSph
        leftDistanceObjectiveSph
        rightDistanceObjectiveCyl
        leftDistanceObjectiveCyl
        rightDistanceObjectiveAxis
        leftDistanceObjectiveAxis
        rightNearObjectiveSph
        leftNearObjectiveSph
        rightNearObjectiveCyl
        leftNearObjectiveCyl
        rightNearObjectiveAxis
        leftNearObjectiveAxis
        rightDistanceFinalSph
        leftDistanceFinalSph
        rightDistanceFinalCyl
        leftDistanceFinalCyl
        rightDistanceFinalAxis
        leftDistanceFinalAxis
        rightNearFinalSph
        leftNearFinalSph
        rightNearFinalCyl
        leftNearFinalCyl
        rightNearFinalAxis
        leftNearFinalAxis
        rightVisualAcuity
        leftVisualAcuity
        farPd
        nearPd
        status
        patientChartId
        diagnosticProcedureTypeTitle
        diagnosticProcedureType {
          id
          title
        }
        images {
          id
          size
          hash
          fileName
          extension
          contentType
          createdAt
        }
        documents {
          id
          size
          hash
          fileName
          extension
          contentType
          createdAt
        }
        payments {
          id
          status
          invoiceNo
        }
      }
    }
  }
`;
const CANCEL_ORDER = gql `
  mutation DeleteDiagnosticProcedure($id: ID!) {
    deleteDiagnosticProcedure(id: $id)
  }
`;
const DiagnosticProcedurePage = ({ patientId, appointmentId, patientChart, medicalDepartment }) => {
    var _a;
    const notifDispatch = useNotificationDispatch();
    const bottomSheetDispatch = useBottomSheetDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { data, refetch, error } = useQuery(GET_DIAGNOSTIC_PROCEDURE_ORDER, {
        variables: {
            patientChartId: patientChart.id,
        },
    });
    console.log(data);
    const [isOrderExpanded, setIsOrderExpanded] = useState(false);
    useEffect(() => {
        if (data &&
            data.diagnosticProcedureOrder.diagnosticProcedures.length > 0 &&
            data.diagnosticProcedureOrder.diagnosticProcedures.every((e) => e === null || e === void 0 ? void 0 : e.payments.every((i) => i.status === "PAID"))) {
            setIsOrderExpanded(true);
        }
        else {
            setIsOrderExpanded(false);
        }
    }, [data]);
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
    const handleProcedureClick = (item) => {
        if (patientChart === null || patientChart === void 0 ? void 0 : patientChart.id) {
            bottomSheetDispatch({
                type: "show",
                snapPoint: 0,
                children: (_jsx(OrderDiagnosticProcedureForm, { patientId: patientId, patientChartId: patientChart.id, appointmentId: appointmentId, diagnosticProcedureType: item, onSuccess: () => {
                        refetch();
                        notifDispatch({
                            type: "show",
                            notifTitle: "Success",
                            notifSubTitle: "Procedure ordered successfully",
                            variant: "success",
                        });
                        bottomSheetDispatch({ type: "hide" });
                    }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
            });
        }
    };
    return (_jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "w-1/3", hidden: isOrderExpanded }, { children: _jsx(DiagnosticProcedureTypes, { onItemClick: handleProcedureClick }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "flex-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-4" }, { children: [_jsx("div", { children: _jsx("button", Object.assign({ type: "button", onClick: () => setIsOrderExpanded(!isOrderExpanded) }, { children: isOrderExpanded ? (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }, void 0) }), void 0)) : (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }, void 0) }), void 0)) }), void 0) }, void 0),
                            _jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Diagnostic Procedures" }), void 0)] }), void 0),
                    _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                    (((_a = data === null || data === void 0 ? void 0 : data.diagnosticProcedureOrder.diagnosticProcedures.length) !== null && _a !== void 0 ? _a : 0) ===
                        0 ||
                        (error === null || error === void 0 ? void 0 : error.message) === "record not found") && (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 flex h-44 rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)),
                    (error === null || error === void 0 ? void 0 : error.message) !== "record not found" && (data === null || data === void 0 ? void 0 : data.diagnosticProcedureOrder.diagnosticProcedures.map((e, i) => (_jsxs("div", Object.assign({ className: classnames("rounded-lg shadow-lg py-3 px-3 bg-white", {
                            "mt-5": i !== 0,
                            "border-l-4 border-teal-600": (e === null || e === void 0 ? void 0 : e.status) === DiagnosticProcedureStatus.Completed,
                        }) }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", Object.assign({ className: "text-2xl tracking-wider text-gray-800 font-light" }, { children: e === null || e === void 0 ? void 0 : e.diagnosticProcedureType.title }), void 0),
                                    !(e === null || e === void 0 ? void 0 : e.payments.every((e) => e.status === "PAID")) && (_jsxs("button", Object.assign({ className: "border border-red-600 text-red-800 px-2 text-sm py-1 rounded-lg flex space-x-1 items-center", onClick: () => {
                                            if (e === null || e === void 0 ? void 0 : e.id) {
                                                cancelOrder({ variables: { id: e === null || e === void 0 ? void 0 : e.id } });
                                            }
                                        } }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "close" }), void 0),
                                            _jsx("p", { children: "Cancel order" }, void 0)] }), void 0))] }), void 0),
                            e.orderNote.length > 0 && (_jsxs("div", Object.assign({ className: "mt-4 flex space-x-2 items-center" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-yellow-600" }, { children: "bookmark" }), void 0),
                                    _jsx("input", { disabled: true, type: "text", name: "orderNote", id: "orderNote", value: e.orderNote, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md bg-gray-100" }, void 0)] }), void 0)),
                            _jsx("div", Object.assign({ className: "mt-8" }, { children: _jsx(DiagnosticProcedureComponent, { values: e, readOnly: patientChartLocked[0], onRefersh: () => {
                                        refetch();
                                    } }, void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.id))))] }), void 0)] }), void 0));
};
export default DiagnosticProcedurePage;
