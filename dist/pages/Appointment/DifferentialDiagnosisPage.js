import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../../notification";
import { DiagnosisList } from "../../components/DiagnosisList";
import { AppointmentContext } from "../../_context/AppointmentContext";
import { Prompt } from "react-router-dom";
import useExitPrompt from "../../useExitPrompt";
const AUTO_SAVE_INTERVAL = 1000;
const GET_DATA = gql `
  query PatientDiagnoses(
    $page: PaginationInput!
    $filter: PatientDiagnosisFilter
    $patientChartId: ID!
  ) {
    patientDiagnoses(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          fullDescription
          location
        }
      }
    }

    patientChart(id: $patientChartId) {
      differentialDiagnosisNote
    }
  }
`;
const SAVE_PATIENT_DIAGNOSIS = gql `
  mutation SavePatientDiagnosis($input: PatientDiagnosisInput!) {
    savePatientDiagnosis(input: $input) {
      id
    }
  }
`;
const DELETE_PATIENT_DIAGNOSIS = gql `
  mutation DeletePatientDiagnosis($id: ID!) {
    deletePatientDiagnosis(id: $id)
  }
`;
const UPDATE_PATIENT_CHART = gql `
  mutation UpdatePatientChart($input: PatientChartUpdateInput!) {
    updatePatientChart(input: $input) {
      id
    }
  }
`;
export const DifferentialDiagnosisPage = ({ patientChartId, medicalDepartment, onSaveChange }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, getValues, setValue } = useForm({
        defaultValues: {
            id: patientChartId,
        },
    });
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { data, refetch } = useQuery(GET_DATA, {
        variables: {
            page: { page: 0, size: 100 },
            filter: {
                patientChartId,
                differential: true,
            },
            patientChartId,
        },
    });
    useEffect(() => {
        if (data === null || data === void 0 ? void 0 : data.patientChart) {
            setValue("differentialDiagnosisNote", data === null || data === void 0 ? void 0 : data.patientChart.differentialDiagnosisNote);
        }
    }, [data]);
    useEffect(() => {
        refetch();
    }, []);
    const [savePatientDiagnosis] = useMutation(SAVE_PATIENT_DIAGNOSIS, {
        onCompleted(data) {
            onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Differential diagnosis saved successfully",
                variant: "success",
            });
            refetch();
        },
        onError(error) {
            onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const [updatePatientChart] = useMutation(UPDATE_PATIENT_CHART, {
        onCompleted() {
            setModified(false);
            setShowExitPrompt(false);
        },
        onError(error) {
            onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const [deletePatientDiagnosis] = useMutation(DELETE_PATIENT_DIAGNOSIS, {
        onCompleted(data) {
            onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Differential Diagnosis deleted successfully",
                variant: "success",
            });
            refetch();
        },
        onError(error) {
            onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const handleDiagnosisClick = (diagnosisId, location) => {
        if (patientChartId) {
            onSaveChange(true);
            savePatientDiagnosis({
                variables: {
                    input: {
                        diagnosisId,
                        patientChartId: patientChartId,
                        location: location,
                        differential: true,
                    },
                },
            });
        }
    };
    const handleChanges = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        const data = getValues();
        setTimer(setTimeout(() => {
            if (patientChartId) {
                const input = Object.assign(Object.assign({}, data), { id: patientChartId });
                updatePatientChart({
                    variables: {
                        input,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    return (_jsxs("div", { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "w-1/3" }, { children: _jsx(DiagnosisList, { medicalDepartment: medicalDepartment, onItemClick: handleDiagnosisClick }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsxs("div", Object.assign({ className: "grid grid-rows-2 gap-y-5" }, { children: [_jsxs("div", Object.assign({ className: "row-span-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Differential Diagnosis" }), void 0),
                                        _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                                        (data === null || data === void 0 ? void 0 : data.patientDiagnoses.edges.length) === 0 && (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 flex h-44 rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                                    _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)),
                                        _jsx("ul", Object.assign({ className: "overflow-auto" }, { children: data === null || data === void 0 ? void 0 : data.patientDiagnoses.edges.map((e, i) => (_jsxs("li", Object.assign({ className: "flex justify-between py-4 px-2" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-3" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-teal-800" }, { children: "check_circle" }), void 0), " ", _jsxs("div", { children: [_jsx("p", Object.assign({ className: "font-semibold text-gray-700" }, { children: e === null || e === void 0 ? void 0 : e.node.fullDescription }), void 0),
                                                                    _jsx("p", Object.assign({ className: "text-gray-500 text-sm" }, { children: e === null || e === void 0 ? void 0 : e.node.location }), void 0)] }, void 0)] }), void 0),
                                                    _jsx("div", { children: _jsx("div", Object.assign({ className: "flex items-center space-x-2" }, { children: _jsx("button", Object.assign({ type: "button", disabled: patientChartLocked[0], className: "material-icons text-gray-700", onClick: () => {
                                                                    if ((e === null || e === void 0 ? void 0 : e.node.id) !== undefined) {
                                                                        onSaveChange(true);
                                                                        deletePatientDiagnosis({
                                                                            variables: { id: e === null || e === void 0 ? void 0 : e.node.id },
                                                                        });
                                                                    }
                                                                } }, { children: "delete" }), void 0) }), void 0) }, void 0)] }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
                                _jsxs("div", Object.assign({ className: "row-span-1 h-full bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Note" }), void 0),
                                        _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                                        _jsx("textarea", { name: "differentialDiagnosisNote", rows: 3, ref: register, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-44 w-full", onChange: handleChanges }, void 0)] }), void 0)] }), void 0) }), void 0)] }), void 0)] }, void 0));
};
