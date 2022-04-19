import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import PreOpForm from "../../components/PreOpForm";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import { AppointmentContext } from "../../_context/AppointmentContext";
const AUTO_SAVE_INTERVAL = 1000;
const SAVE_SURGICAL_PROCEDURE = gql `
  mutation SaveSurgicalProcedure($input: SurgicalProcedureInput!) {
    saveSurgicalProcedure(input: $input) {
      id
    }
  }
`;
const GET_PRE_OP = gql `
  query GetPreop($patientChartId: ID!) {
    surgicalProcedure(patientChartId: $patientChartId) {
      id
      rightCorrected
      leftCorrected
      rightIop
      leftIop
      rightAnteriorSegment
      leftAnteriorSegment
      rightPosteriorSegment
      leftPosteriorSegment
      rightBiometry
      leftBiometry
      diabetes
      hpn
      asthma
      cardiacDisease
      allergies
      bloodPressure
      bloodSugar
      uriAnalysis
      surgicalProcedureType {
        id
        title
      }
    }
  }
`;
export const PreOpPage = ({ patientChartId }) => {
    var _a, _b;
    const notifDispatch = useNotificationDispatch();
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { data, refetch } = useQuery(GET_PRE_OP, {
        variables: {
            patientChartId,
        },
    });
    useEffect(() => {
        refetch();
    }, []);
    const { register, reset, getValues } = useForm({
        defaultValues: {
            patientChartId: patientChartId,
        },
    });
    const { patientChartLocked } = React.useContext(AppointmentContext);
    useEffect(() => {
        const surgicalProcedure = data === null || data === void 0 ? void 0 : data.surgicalProcedure;
        if (surgicalProcedure !== undefined) {
            reset({
                rightCorrected: surgicalProcedure.rightCorrected,
                leftCorrected: surgicalProcedure.leftCorrected,
                rightIop: surgicalProcedure.rightIop,
                leftIop: surgicalProcedure.leftIop,
                rightAnteriorSegment: surgicalProcedure.rightAnteriorSegment,
                leftAnteriorSegment: surgicalProcedure.leftAnteriorSegment,
                rightPosteriorSegment: surgicalProcedure.rightPosteriorSegment,
                leftPosteriorSegment: surgicalProcedure.leftPosteriorSegment,
                rightBiometry: surgicalProcedure.rightBiometry,
                leftBiometry: surgicalProcedure.leftBiometry,
                bloodPressure: surgicalProcedure.bloodPressure,
                bloodSugar: surgicalProcedure.bloodSugar,
                uriAnalysis: surgicalProcedure.uriAnalysis,
                diabetes: surgicalProcedure.diabetes,
                asthma: surgicalProcedure.asthma,
                hpn: surgicalProcedure.hpn,
                cardiacDisease: surgicalProcedure.cardiacDisease,
                allergies: surgicalProcedure.allergies,
            });
        }
    }, [data === null || data === void 0 ? void 0 : data.surgicalProcedure]);
    const [save] = useMutation(SAVE_SURGICAL_PROCEDURE, {
        onCompleted() {
            setModified(false);
            setShowExitPrompt(false);
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
    const handleChanges = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        const data = getValues();
        const isEmpty = _.values(data).every((v) => _.isEmpty(v));
        setTimer(setTimeout(() => {
            if (patientChartId !== undefined && !isEmpty) {
                const input = Object.assign(Object.assign({}, data), { patientChartId });
                save({
                    variables: {
                        input,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    return (_jsxs("div", Object.assign({ className: "container mx-auto bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold" }, { children: `${(_b = (_a = data === null || data === void 0 ? void 0 : data.surgicalProcedure) === null || _a === void 0 ? void 0 : _a.surgicalProcedureType) === null || _b === void 0 ? void 0 : _b.title} Pre-op` }), void 0),
            _jsx("hr", { className: "mt-5" }, void 0),
            _jsx(PreOpForm, { register: register, locked: patientChartLocked[0], handleChanges: handleChanges }, void 0)] }), void 0));
};
