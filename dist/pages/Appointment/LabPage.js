import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNotificationDispatch } from "../../notification";
import { LabTypesComponent } from "../../components/LabTypes";
import classnames from "classnames";
import { LabComponent } from "../../components/LabComponent";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { LabStatus, } from "../../models/models";
import { OrderLabForm } from "../../components/OrderLabForm";
import { AppointmentContext } from "../../_context/AppointmentContext";
const GET_LAB_ORDER = gql `
  query LabOrder($patientChartId: ID!) {
    labOrder(patientChartId: $patientChartId) {
      status
      createdAt
      labs {
        id
        orderNote
        generalText
        status
        labType {
          id
          title
        }
        cbcWbcActive
        cbcWbcResults
        cbcWbcDate
        cbcHgbActive
        cbcHgbResults
        cbcHgbDate
        cbcHctActive
        cbcHctResults
        cbcHctDate
        cbcEsrActive
        cbcEsrResults
        cbcEsrDate
        cbcBloodGroupActive
        cbcBloodGroupResults
        cbcBloodGroupDate
        cbcRhActive
        cbcRhResults
        cbcRhDate
        cbcBloodFilmActive
        cbcBloodFilmResults
        cbcBloodFilmDate
        cbcPltActive
        cbcPltResults
        cbcPltDate
        liverCoagulationPtActive
        liverCoagulationPtResults
        liverCoagulationPtDate
        liverCoagulationPttActive
        liverCoagulationPttResults
        liverCoagulationPttDate
        liverCoagulationInrActive
        liverCoagulationInrResults
        liverCoagulationInrDate
        liverAstsgotActive
        liverAstsgotResults
        liverAstsgotDate
        liverAltsgptActive
        liverAltsgptResults
        liverAltsgptDate
        liverAlpActive
        liverAlpResults
        liverAlpDate
        renalCrActive
        renalCrResults
        renalCrDate
        renalBunActive
        renalBunResults
        renalBunDate
        thyroidFreeT3Active
        thyroidFreeT3Results
        thyroidFreeT3Date
        thyroidTotalT4Active
        thyroidTotalT4Results
        thyroidTotalT4Date
        thyroidTshActive
        thyroidTshResults
        thyroidTshDate
        electrolytesNaPlusActive
        electrolytesNaPlusResults
        electrolytesNaPlusDate
        electrolytesKPlusActive
        electrolytesKPlusResults
        electrolytesKPlusDate
        electrolytesClMinusActive
        electrolytesClMinusResults
        electrolytesClMinusDate
        electrolytesCa2PlusActive
        electrolytesCa2PlusResults
        electrolytesCa2PlusDate
        electrolytesMg2PlusActive
        electrolytesMg2PlusResults
        electrolytesMg2PlusDate
        electrolytesPMinusActive
        electrolytesPMinusResults
        electrolytesPMinusDate
        stoolConsistencyActive
        stoolConsistencyResults
        stoolConsistencyDate
        stoolOpActive
        stoolOpResults
        stoolOpDate
        stoolConcentrationActive
        stoolConcentrationResults
        stoolConcentrationDate
        stoolOccultBloodActive
        stoolOccultBloodResults
        stoolOccultBloodDate
        microscopyEpitCellsActive
        microscopyEpitCellsResults
        microscopyEpitCellsDate
        microscopyWbcActive
        microscopyWbcResults
        microscopyWbcDate
        microscopyRbcActive
        microscopyRbcResults
        microscopyRbcDate
        microscopyCastsActive
        microscopyCastsResults
        microscopyCastsDate
        microscopyCrystalsActive
        microscopyCrystalsResults
        microscopyCrystalsDate
        microscopyBacteriaActive
        microscopyBacteriaResults
        microscopyBacteriaDate
        microscopyHcgActive
        microscopyHcgResults
        microscopyHcgDate
        urinalysisColorActive
        urinalysisColorResults
        urinalysisColorDate
        urinalysisAppearanceActive
        urinalysisAppearanceResults
        urinalysisAppearanceDate
        urinalysisPhActive
        urinalysisPhResults
        urinalysisPhDate
        urinalysisSgActive
        urinalysisSgResults
        urinalysisSgDate
        urinalysisProteinActive
        urinalysisProteinResults
        urinalysisProteinDate
        urinalysisGlucoseActive
        urinalysisGlucoseResults
        urinalysisGlucoseDate
        urinalysisLeukocyteActive
        urinalysisLeukocyteResults
        urinalysisLeukocyteDate
        urinalysisKetoneActive
        urinalysisKetoneResults
        urinalysisKetoneDate
        urinalysisBilirubinActive
        urinalysisBilirubinResults
        urinalysisBilirubinDate
        urinalysisUrobilingenActive
        urinalysisUrobilingenResults
        urinalysisUrobilingenDate
        urinalysisBloodActive
        urinalysisBloodResults
        urinalysisBloodDate
        serologyVdrlActive
        serologyVdrlResults
        serologyVdrlDate
        serologyWidalHActive
        serologyWidalHResults
        serologyWidalHDate
        serologyWidalOActive
        serologyWidalOResults
        serologyWidalODate
        serologyWeilFelixActive
        serologyWeilFelixResults
        serologyWeilFelixDate
        serologyHbsAgActive
        serologyHbsAgResults
        serologyHbsAgDate
        serologyHcvAbActive
        serologyHcvAbResults
        serologyHcvAbDate
        serologyAsoActive
        serologyAsoResults
        serologyAsoDate
        serologyRfActive
        serologyRfResults
        serologyRfDate
        serologyHpayloryAgActive
        serologyHpayloryAgResults
        serologyHpayloryAgDate
        serologyHpyloryAbActive
        serologyHpyloryAbResults
        serologyHpyloryAbDate
        bacterologySampleActive
        bacterologySampleResults
        bacterologySampleDate
        bacterologyKohActive
        bacterologyKohResults
        bacterologyKohDate
        bacterologyGramStainActive
        bacterologyGramStainResults
        bacterologyGramStainDate
        bacterologyWetFilmActive
        bacterologyWetFilmResults
        bacterologyWetFilmDate
        bacterologyAfb1Active
        bacterologyAfb1Results
        bacterologyAfb1Date
        bacterologyAfb2Active
        bacterologyAfb2Results
        bacterologyAfb2Date
        bacterologyAfb3Active
        bacterologyAfb3Results
        bacterologyAfb3Date
        bacterologyCultureActive
        bacterologyCultureResults
        bacterologyCultureDate
        chemistryFbsRbsActive
        chemistryFbsRbsResults
        chemistryFbsRbsDate
        chemistrySgotActive
        chemistrySgotResults
        chemistrySgotDate
        chemistrySgptActive
        chemistrySgptResults
        chemistrySgptDate
        chemistryAlkalinePhosphatesActive
        chemistryAlkalinePhosphatesResults
        chemistryAlkalinePhosphatesDate
        chemistryBilirubinTotalActive
        chemistryBilirubinTotalResults
        chemistryBilirubinTotalDate
        chemistryBilirubinDirectActive
        chemistryBilirubinDirectResults
        chemistryBilirubinDirectDate
        chemistryUreaActive
        chemistryUreaResults
        chemistryUreaDate
        chemistryBunActive
        chemistryBunResults
        chemistryBunDate
        chemistryCreatnineActive
        chemistryCreatnineResults
        chemistryCreatnineDate
        chemistryUricAcidActive
        chemistryUricAcidResults
        chemistryUricAcidDate
        chemistryTotalProteinActive
        chemistryTotalProteinResults
        chemistryTotalProteinDate
        chemistryTriglyceridesActive
        chemistryTriglyceridesResults
        chemistryTriglyceridesDate
        chemistryCholestrolActive
        chemistryCholestrolResults
        chemistryCholestrolDate
        chemistryHdlActive
        chemistryHdlResults
        chemistryHdlDate
        chemistryLdlActive
        chemistryLdlResults
        chemistryLdlDate
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
        }
      }
    }
  }
`;
const CANCEL_ORDER = gql `
  mutation DeleteLab($id: ID!) {
    deleteLab(id: $id)
  }
`;
export const LabPage = ({ patientChart, appointmentId, patientId }) => {
    var _a;
    const notifDispatch = useNotificationDispatch();
    const bottomSheetDispatch = useBottomSheetDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { data, refetch, error } = useQuery(GET_LAB_ORDER, {
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
    const [isOrderExpanded, setIsOrderExpanded] = useState(false);
    useEffect(() => {
        if (data &&
            data.labOrder.labs.length > 0 &&
            data.labOrder.labs.every((e) => e === null || e === void 0 ? void 0 : e.payments.every((i) => i.status === "PAID"))) {
            setIsOrderExpanded(true);
        }
        else {
            setIsOrderExpanded(false);
        }
    }, [data]);
    const handleProcedureClick = (item) => {
        if (patientChart === null || patientChart === void 0 ? void 0 : patientChart.id) {
            bottomSheetDispatch({
                type: "show",
                snapPoint: 0,
                children: (_jsx(OrderLabForm, { patientId: patientId, patientChartId: patientChart.id, appointmentId: appointmentId, labType: item, onSuccess: () => {
                        refetch();
                        notifDispatch({
                            type: "show",
                            notifTitle: "Success",
                            notifSubTitle: "Lab ordered successfully",
                            variant: "success",
                        });
                        bottomSheetDispatch({ type: "hide" });
                    }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
            });
        }
    };
    return (_jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "w-1/3", hidden: isOrderExpanded }, { children: _jsx(LabTypesComponent, { onItemClick: handleProcedureClick }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "flex-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-4" }, { children: [_jsx("div", { children: _jsx("button", Object.assign({ type: "button", onClick: () => setIsOrderExpanded(!isOrderExpanded) }, { children: isOrderExpanded ? (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }, void 0) }), void 0)) : (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }, void 0) }), void 0)) }), void 0) }, void 0),
                            _jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Labs" }), void 0)] }), void 0),
                    _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                    (((_a = data === null || data === void 0 ? void 0 : data.labOrder.labs.length) !== null && _a !== void 0 ? _a : 0) === 0 ||
                        (error === null || error === void 0 ? void 0 : error.message) === "record not found") && (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 flex h-44 rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)),
                    (error === null || error === void 0 ? void 0 : error.message) !== "record not found" && (data === null || data === void 0 ? void 0 : data.labOrder.labs.map((e, i) => (_jsxs("div", Object.assign({ className: classnames("rounded-lg shadow-lg py-3 px-3 bg-white", {
                            "mt-5": i !== 0,
                            "border-l-2 border-teal-600": (e === null || e === void 0 ? void 0 : e.status) === LabStatus.Completed,
                        }) }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", Object.assign({ className: "text-2xl tracking-wider text-gray-800 font-light" }, { children: e === null || e === void 0 ? void 0 : e.labType.title }), void 0),
                                    !(e === null || e === void 0 ? void 0 : e.payments.every((e) => e.status === "PAID")) && (_jsxs("button", Object.assign({ className: "border border-red-600 text-red-800 px-2 text-sm py-1 rounded-lg flex space-x-1 items-center", onClick: () => {
                                            if (e === null || e === void 0 ? void 0 : e.id) {
                                                cancelOrder({ variables: { id: e === null || e === void 0 ? void 0 : e.id } });
                                            }
                                        } }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "close" }), void 0),
                                            _jsx("p", { children: "Cancel order" }, void 0)] }), void 0))] }), void 0),
                            e.orderNote.length > 0 && (_jsxs("div", Object.assign({ className: "mt-4 flex space-x-2 items-center" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-yellow-600" }, { children: "bookmark" }), void 0),
                                    _jsx("input", { disabled: true, type: "text", name: "orderNote", id: "orderNote", value: e.orderNote, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md bg-gray-100" }, void 0)] }), void 0)),
                            _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx(LabComponent, { values: e, readOnly: patientChartLocked[0], onRefresh: () => {
                                        refetch();
                                    } }, void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.id))))] }), void 0)] }), void 0));
};
