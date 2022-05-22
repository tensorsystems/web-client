import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import TreatmentForm from "../../components/TreatmentForm";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import { AppointmentContext } from "../../_context/AppointmentContext";
const AUTO_SAVE_INTERVAL = 1000;
const SAVE_TREATMENT = gql `
  mutation SaveTreatment($input: TreatmentInput!) {
    saveTreatment(input: $input) {
      id
    }
  }
`;
const GET_TREATMENT = gql `
  query GetTreatment($patientChartId: ID!) {
    treatment(patientChartId: $patientChartId) {
      id
      note
      result
      treatmentType {
        id
        title
      }
    }
  }
`;
export const TreatmentObjectivePage = ({ patientChartId }) => {
    const notifDispatch = useNotificationDispatch();
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { register, getValues, reset } = useForm();
    const { data, refetch } = useQuery(GET_TREATMENT, {
        variables: {
            patientChartId,
        },
    });
    useEffect(() => {
        refetch();
    }, []);
    useEffect(() => {
        const treatment = data === null || data === void 0 ? void 0 : data.treatment;
        if (treatment !== undefined) {
            reset({
                note: treatment.note,
                result: treatment.result,
                patientChartId: treatment.patientChartId,
            });
        }
    }, [data === null || data === void 0 ? void 0 : data.treatment]);
    const [save] = useMutation(SAVE_TREATMENT, {
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
    const handleChange = () => {
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
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold" }, { children: data === null || data === void 0 ? void 0 : data.treatment.treatmentType.title }), void 0),
            _jsx("hr", { className: "mt-5" }, void 0),
            _jsx(TreatmentForm, { register: register, locked: patientChartLocked[0], handleChange: handleChange }, void 0)] }), void 0));
};
