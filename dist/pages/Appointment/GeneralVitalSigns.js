import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import { AppointmentContext } from "../../_context/AppointmentContext";
import { InformationCircleIcon } from "@heroicons/react/solid";
import ReactTooltip from "react-tooltip";
import { differenceInMonths, parseISO } from "date-fns";
const AUTO_SAVE_INTERVAL = 1000;
const GET_VITAL_SIGNS = gql `
  query GetVitalSigns($filter: VitalSignsFilter!) {
    vitalSigns(filter: $filter) {
      id
      temperature
      pulse
      bloodPressureSystolic
      bloodPressureDiastolic
      respiratoryRate
      oxygenSaturation
      height
      weight
      bmi
    }
  }
`;
const UPDATE_VITAL_SIGNS = gql `
  mutation UpdateVitalSigns($input: VitalSignsUpdateInput!) {
    updateVitalSigns(input: $input) {
      id
    }
  }
`;
const GeneralVitalSigns = ({ patientChartId, patient }) => {
    const notifDispatch = useNotificationDispatch();
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { data, refetch } = useQuery(GET_VITAL_SIGNS, {
        variables: {
            filter: { patientChartId },
        },
    });
    useEffect(() => {
        refetch();
    }, []);
    const { register, getValues, setValue, watch, reset } = useForm();
    useEffect(() => {
        if (data === null || data === void 0 ? void 0 : data.vitalSigns) {
            reset({
                temperature: data === null || data === void 0 ? void 0 : data.vitalSigns.temperature,
                pulse: data === null || data === void 0 ? void 0 : data.vitalSigns.pulse,
                bloodPressureSystolic: data === null || data === void 0 ? void 0 : data.vitalSigns.bloodPressureSystolic,
                bloodPressureDiastolic: data === null || data === void 0 ? void 0 : data.vitalSigns.bloodPressureDiastolic,
                respiratoryRate: data === null || data === void 0 ? void 0 : data.vitalSigns.respiratoryRate,
                oxygenSaturation: data === null || data === void 0 ? void 0 : data.vitalSigns.oxygenSaturation,
                height: data === null || data === void 0 ? void 0 : data.vitalSigns.height,
                weight: data === null || data === void 0 ? void 0 : data.vitalSigns.weight,
                bmi: data === null || data === void 0 ? void 0 : data.vitalSigns.bmi,
            });
        }
    }, [data === null || data === void 0 ? void 0 : data.vitalSigns]);
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [updateVitalSigns] = useMutation(UPDATE_VITAL_SIGNS, {
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
    const handleChanges = (evt) => {
        var _a;
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        if (evt.target.name === "height" || evt.target.name === "weight") {
            const bmi = (_a = (formData.height &&
                formData.weight &&
                (formData.weight / formData.height / formData.height) * 10000)) !== null && _a !== void 0 ? _a : -1;
            if (bmi) {
                setValue("bmi", bmi);
            }
        }
        const values = getValues();
        const isEmpty = _.values(data).every((v) => _.isEmpty(v));
        setTimer(setTimeout(() => {
            if ((data === null || data === void 0 ? void 0 : data.vitalSigns.id) !== undefined && !isEmpty) {
                const input = {
                    id: data === null || data === void 0 ? void 0 : data.vitalSigns.id,
                    temperature: parseFloat(values.temperature),
                    pulse: values.pulse ? parseFloat(values.pulse) : null,
                    bloodPressureSystolic: values.bloodPressureSystolic
                        ? parseFloat(values.bloodPressureSystolic)
                        : undefined,
                    bloodPressureDiastolic: values.bloodPressureDiastolic
                        ? parseFloat(values.bloodPressureDiastolic)
                        : undefined,
                    respiratoryRate: values.respiratoryRate
                        ? parseFloat(values.respiratoryRate)
                        : undefined,
                    oxygenSaturation: values.oxygenSaturation
                        ? parseFloat(values.oxygenSaturation)
                        : undefined,
                    height: values.height ? parseFloat(values.height) : undefined,
                    weight: values.weight ? parseFloat(values.weight) : undefined,
                    bmi: values.bmi ? parseFloat(values.bmi) : undefined,
                };
                updateVitalSigns({
                    variables: {
                        input,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const ageInMonths = differenceInMonths(new Date(), parseISO(patient.dateOfBirth));
    const formData = watch();
    useEffect(() => {
        if (formData.height && formData.weight) {
        }
    }, [formData]);
    const temperatureNormal = formData.temperature &&
        formData.temperature > 36.1 &&
        formData.temperature < 37.2;
    let bpmNormal = true;
    if (formData.pulse) {
        if (ageInMonths <= 0) {
            bpmNormal = formData.pulse >= 100 && formData.pulse <= 160;
        }
        else if (ageInMonths > 0 && ageInMonths <= 5) {
            bpmNormal = formData.pulse >= 90 && formData.pulse <= 150;
        }
        else if (ageInMonths > 6 && ageInMonths < 12) {
            bpmNormal = formData.pulse >= 80 && formData.pulse <= 140;
        }
        else if (ageInMonths >= 12 && ageInMonths < 36) {
            bpmNormal = formData.pulse >= 80 && formData.pulse <= 130;
        }
        else if (ageInMonths >= 36 && ageInMonths < 60) {
            bpmNormal = formData.pulse >= 80 && formData.pulse <= 120;
        }
        else if (ageInMonths >= 60 && ageInMonths < 120) {
            bpmNormal = formData.pulse >= 70 && formData.pulse <= 100;
        }
        else if (ageInMonths >= 120 && ageInMonths < 168) {
            bpmNormal = formData.pulse >= 60 && formData.pulse <= 105;
        }
        else if (ageInMonths < 168) {
            bpmNormal = formData.pulse >= 60 && formData.pulse <= 100;
        }
    }
    const bloodPressureNormal = formData.bloodPressureDiastolic &&
        formData.bloodPressureSystolic &&
        formData.bloodPressureSystolic <= 120 &&
        formData.bloodPressureDiastolic <= 80;
    const rpmNormal = formData.respiratoryRate &&
        formData.respiratoryRate >= 12 &&
        formData.respiratoryRate <= 20;
    const oxygenSaturationNormal = formData.oxygenSaturation && formData.oxygenSaturation >= 90;
    const bmiNormal = formData.bmi && formData.bmi >= 18.5 && formData.bmi <= 24.9;
    return (_jsxs("div", Object.assign({ className: "container mx-auto bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold" }, { children: "Vital Signs" }), void 0),
            _jsx("hr", { className: "mt-5" }, void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-900 tracking-wide" }, { children: "Temperature" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "temperature", placeholder: "C\u00B0", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0),
                    formData.temperature && !temperatureNormal && (_jsxs("div", { children: [_jsx("div", Object.assign({ "data-tip": true, "data-for": "temperature" }, { children: _jsx(InformationCircleIcon, { className: "h-6 w-6 text-yellow-400" }, void 0) }), void 0),
                            _jsx(ReactTooltip, Object.assign({ id: "temperature", type: "warning" }, { children: "Abnormal" }), void 0)] }, void 0))] }), void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-900 tracking-wide" }, { children: "Pulse" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "pulse", placeholder: "bpm", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0),
                    formData.pulse && !bpmNormal && (_jsxs("div", { children: [_jsx("div", Object.assign({ "data-tip": true, "data-for": "pulse" }, { children: _jsx(InformationCircleIcon, { className: "h-6 w-6 text-yellow-400" }, void 0) }), void 0),
                            _jsx(ReactTooltip, Object.assign({ id: "pulse", type: "warning" }, { children: "Abnormal" }), void 0)] }, void 0))] }), void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-900 tracking-wide" }, { children: "Blood Pressure" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "bloodPressureSystolic", placeholder: "mmHg", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0),
                    _jsx("div", { children: "/" }, void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "bloodPressureDiastolic", placeholder: "mmHg", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0),
                    formData.bloodPressureDiastolic &&
                        formData.bloodPressureSystolic &&
                        !bloodPressureNormal && (_jsxs("div", { children: [_jsx("div", Object.assign({ "data-tip": true, "data-for": "bloodPressure" }, { children: _jsx(InformationCircleIcon, { className: "h-6 w-6 text-yellow-400" }, void 0) }), void 0),
                            _jsx(ReactTooltip, Object.assign({ id: "bloodPressure", type: "warning" }, { children: "Abnormal" }), void 0)] }, void 0))] }), void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-900 tracking-wide" }, { children: "Respiratory Rate" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "respiratoryRate", placeholder: "rpm", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0),
                    formData.respiratoryRate && !rpmNormal && (_jsxs("div", { children: [_jsx("div", Object.assign({ "data-tip": true, "data-for": "rpm" }, { children: _jsx(InformationCircleIcon, { className: "h-6 w-6 text-yellow-400" }, void 0) }), void 0),
                            _jsx(ReactTooltip, Object.assign({ id: "rpm", type: "warning" }, { children: "Abnormal" }), void 0)] }, void 0))] }), void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-900 tracking-wide" }, { children: "Oxygen Saturation" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "oxygenSaturation", placeholder: "%", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0),
                    formData.oxygenSaturation && !oxygenSaturationNormal && (_jsxs("div", { children: [_jsx("div", Object.assign({ "data-tip": true, "data-for": "oxygenSaturation" }, { children: _jsx(InformationCircleIcon, { className: "h-6 w-6 text-yellow-400" }, void 0) }), void 0),
                            _jsx(ReactTooltip, Object.assign({ id: "oxygenSaturation", type: "warning" }, { children: "Abnormal" }), void 0)] }, void 0))] }), void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-900 tracking-wide" }, { children: "Height" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "height", placeholder: "cm", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-900 tracking-wide" }, { children: "Weight" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "weight", placeholder: "kg", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-900 tracking-wide" }, { children: "BMI" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "bmi", placeholder: "BMI", ref: register, onChange: handleChanges, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0),
                    formData.height && formData.weight && !bmiNormal && (_jsxs("div", { children: [_jsx("div", Object.assign({ "data-tip": true, "data-for": "bmi" }, { children: _jsx(InformationCircleIcon, { className: "h-6 w-6 text-yellow-400" }, void 0) }), void 0),
                            _jsx(ReactTooltip, Object.assign({ id: "bmi", type: "warning" }, { children: "Abnormal" }), void 0)] }, void 0))] }), void 0)] }), void 0));
};
export default GeneralVitalSigns;
