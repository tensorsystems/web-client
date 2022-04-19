import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppointmentContext } from "../_context/AppointmentContext";
import { useNotificationDispatch } from "../notification";
import { gql, useMutation } from "@apollo/client";
import useExitPrompt from "../useExitPrompt";
import { Prompt } from "react-router-dom";
import _ from "lodash";
const AUTO_SAVE_INTERVAL = 1000;
const UPDATE_PATIENT_CHART = gql `
  mutation SavePatientChart($input: PatientChartUpdateInput!) {
    updatePatientChart(input: $input) {
      id
    }
  }
`;
export const OtherVitalsForm = ({ patientChartId, values, }) => {
    const notifDispatch = useNotificationDispatch();
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { register, reset, getValues } = useForm({
        defaultValues: {
            id: patientChartId,
        },
    });
    const { patientChartLocked } = React.useContext(AppointmentContext);
    useEffect(() => {
        if (values !== undefined) {
            reset(values);
        }
    }, [values]);
    const [updatePatientChart] = useMutation(UPDATE_PATIENT_CHART, {
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
                const input = Object.assign(Object.assign({}, data), { id: patientChartId });
                updatePatientChart({
                    variables: {
                        input,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-5 justify-items-stretch" }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsx("div", Object.assign({ className: "col-span-1 justify-self-center" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Blood Pressure" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("input", { type: "text", name: "bloodPressure", ref: register, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md", onChange: handleChanges }, void 0) }), void 0)] }), void 0));
};
