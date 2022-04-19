import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import { IopForm } from "../../components/IopForm";
import { VisualAcuityForm } from "../../components/VisualAcuityForm";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import { AppointmentContext } from "../../_context/AppointmentContext";
import ReactLoading from "react-loading";
const AUTO_SAVE_INTERVAL = 1000;
const GET_VITAL_SIGNS = gql `
  query GetVitalSigns($filter: VitalSignsFilter!) {
    vitalSigns(filter: $filter) {
      id
      bloodPressureSystolic
      bloodPressureDiastolic
      rightDistanceUncorrected
      leftDistanceUncorrected
      rightDistancePinhole
      leftDistancePinhole
      rightDistanceCorrected
      leftDistanceCorrected
      rightNearUncorrected
      leftNearUncorrected
      rightNearPinhole
      leftNearPinhole
      rightNearCorrected
      leftNearCorrected
      rightApplanation
      leftApplanation
      rightTonopen
      leftTonopen
      rightDigital
      leftDigital
      rightNoncontact
      leftNoncontact
    }
  }
`;
const SAVE_VITAL_SIGNS = gql `
  mutation SaveVitalSigns($input: VitalSignsUpdateInput!) {
    updateVitalSigns(input: $input) {
      id
    }
  }
`;
const CREATE_VITAL_SIGNS = gql `
  mutation SaveVitalSigns($input: VitalSignsInput!) {
    saveVitalSigns(input: $input) {
      id
    }
  }
`;
const OphthalmologyVitalSigns = ({ patientChartId }) => {
    const notifDispatch = useNotificationDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { data, error, refetch, loading } = useQuery(GET_VITAL_SIGNS, {
        variables: { filter: { patientChartId } },
    });
    useEffect(() => {
        refetch();
    }, []);
    const [createVitalSigns] = useMutation(CREATE_VITAL_SIGNS, {
        onCompleted(data) {
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
    useEffect(() => {
        if ((error === null || error === void 0 ? void 0 : error.message) === "record not found" && patientChartId) {
            createVitalSigns({
                variables: {
                    input: {
                        patientChartId: patientChartId,
                    },
                },
            });
        }
    }, [error, patientChartId]);
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { register, getValues, reset } = useForm();
    useEffect(() => {
        if (data === null || data === void 0 ? void 0 : data.vitalSigns) {
            const vitalSignsForm = data === null || data === void 0 ? void 0 : data.vitalSigns;
            reset({
                rightDistanceUncorrected: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightDistanceUncorrected,
                leftDistanceUncorrected: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftDistanceUncorrected,
                rightDistancePinhole: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightDistancePinhole,
                leftDistancePinhole: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftDistancePinhole,
                rightDistanceCorrected: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightDistanceCorrected,
                leftDistanceCorrected: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftDistanceCorrected,
                rightNearUncorrected: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightNearUncorrected,
                leftNearUncorrected: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftNearUncorrected,
                rightNearPinhole: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightNearPinhole,
                leftNearPinhole: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftNearPinhole,
                rightNearCorrected: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightNearCorrected,
                leftNearCorrected: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftNearCorrected,
                rightNoncontact: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightNoncontact,
                leftNoncontact: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftNoncontact,
                rightApplanation: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightApplanation,
                leftApplanation: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftApplanation,
                rightTonopen: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightTonopen,
                leftTonopen: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftTonopen,
                rightDigital: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.rightDigital,
                leftDigital: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.leftDigital,
                bloodPressureSystolic: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.bloodPressureSystolic,
                bloodPressureDiastolic: vitalSignsForm === null || vitalSignsForm === void 0 ? void 0 : vitalSignsForm.bloodPressureDiastolic,
            });
        }
    }, [data]);
    const [save] = useMutation(SAVE_VITAL_SIGNS, {
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
        clearTimeout(timer);
        const values = getValues();
        const isEmpty = _.values(values).every((v) => _.isEmpty(v));
        if (!isEmpty) {
            setModified(true);
            setShowExitPrompt(true);
        }
        setTimer(setTimeout(() => {
            if ((data === null || data === void 0 ? void 0 : data.vitalSigns.id) !== undefined && !isEmpty) {
                const input = Object.assign(Object.assign({}, values), { bloodPressureSystolic: values.bloodPressureSystolic
                        ? parseFloat(values.bloodPressureSystolic)
                        : undefined, bloodPressureDiastolic: values.bloodPressureDiastolic
                        ? parseFloat(values.bloodPressureDiastolic)
                        : undefined, id: data === null || data === void 0 ? void 0 : data.vitalSigns.id });
                save({
                    variables: {
                        input,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    return (_jsxs("div", Object.assign({ className: "container mx-auto bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold" }, { children: "Vital Signs" }), void 0),
            _jsx("hr", { className: "mt-5" }, void 0),
            (error === null || error === void 0 ? void 0 : error.message) === "record not found" || loading ? (_jsx("div", Object.assign({ className: "flex justify-center mt-10 h-screen" }, { children: _jsx(ReactLoading, { type: "spinningBubbles", color: "gray", height: 70, width: 70, className: "inline-block" }, void 0) }), void 0)) : (_jsxs("div", Object.assign({ className: "grid grid-cols-6 gap-x-3 gap-y-7 mt-5" }, { children: [_jsx("div", { className: "col-span-1" }, void 0),
                    _jsx("div", Object.assign({ className: "col-span-5" }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-3 justify-items-center" }, { children: [_jsx("div", {}, void 0),
                                _jsx("div", Object.assign({ className: "col-span-2" }, { children: "OD" }), void 0),
                                _jsx("div", Object.assign({ className: "col-span-2" }, { children: "OS" }), void 0)] }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "Visual Acuity" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(VisualAcuityForm, { register: register, onChange: handleChange }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "IOP" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(IopForm, { register: register, onChange: handleChange }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "Other Vitals" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-8 items-center mt-4" }, { children: [_jsx("div", Object.assign({ className: "w-1/6" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide text-center" }, { children: "Blood Pressure" }), void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "bloodPressureSystolic", placeholder: "mmHg", ref: register, onChange: handleChange, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0),
                                _jsx("div", { children: "/" }, void 0),
                                _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("input", { type: "number", name: "bloodPressureDiastolic", placeholder: "mmHg", ref: register, onChange: handleChange, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md" }, void 0) }), void 0)] }), void 0) }), void 0)] }), void 0))] }), void 0));
};
export default OphthalmologyVitalSigns;
