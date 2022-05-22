import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import _ from "lodash";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import useExitPrompt from "../useExitPrompt";
const AUTO_SAVE_INTERVAL = 1000;
const UPDATE_PATIENT_CHART = gql `
  mutation UpdatePatientChart($input: PatientChartUpdateInput!) {
    updatePatientChart(input: $input) {
      id
    }
  }
`;
export const Stickie = ({ stickieNote, patientChartId }) => {
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { register, setValue, getValues } = useForm({
        defaultValues: {
            stickieNote: stickieNote,
        },
    });
    useEffect(() => {
        if (stickieNote) {
            setValue("stickieNote", stickieNote);
        }
    }, [stickieNote]);
    const notifDispatch = useNotificationDispatch();
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
    return (_jsxs("div", Object.assign({ className: "shadow overflow-hidden h-36 bg-yellow-200" }, { children: [_jsx("div", Object.assign({ className: "bg-yellow-300" }, { children: _jsx("p", Object.assign({ className: "text-xs text-gray-600 pl-2" }, { children: "Stickie" }), void 0) }), void 0),
            _jsx("textarea", { name: "stickieNote", ref: register, className: "w-full h-full bg-yellow-100 p-1 text-xs focus:outline-none border-none", onChange: handleChanges }, void 0)] }), void 0));
};
