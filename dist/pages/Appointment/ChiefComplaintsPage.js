import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useNotificationDispatch } from "../../notification";
import { useForm } from "react-hook-form";
import { ChiefComplaintTypes } from "../../components/ChiefComplaintTypes";
import { AppointmentContext } from "../../_context/AppointmentContext";
import useExitPrompt from "../../useExitPrompt";
import { Prompt } from "react-router-dom";
import _ from "lodash";
import HpiComponent from "../../components/ChiefComplaintHpiComponent";
const AUTO_SAVE_INTERVAL = 1000;
const UPDATE_PATIENT_CHART = gql `
  mutation SavePatientChart($input: PatientChartUpdateInput!) {
    updatePatientChart(input: $input) {
      id
    }
  }
`;
const GET_DATA = gql `
  query PatientChiefComplaints(
    $page: PaginationInput!
    $filter: ChiefComplaintFilter
    $patientChartId: ID!
  ) {
    chiefComplaints(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          title
          hpiComponents {
            id
            title
            hpiComponentTypeId
          }
        }
      }
    }

    patientChart(id: $patientChartId) {
      chiefComplaintsNote
    }
  }
`;
const SAVE_CHIEF_COMPLAINT = gql `
  mutation SavePatientChiefComplaint($input: ChiefComplaintInput!) {
    savePatientChiefComplaint(input: $input) {
      id
    }
  }
`;
const DELETE_CHIEF_COMPLAINT = gql `
  mutation DeletePatientChiefComplaint($id: ID!) {
    deletePatientChiefComplaint(id: $id)
  }
`;
const UPDATE_CHIEF_COMPLAINT = gql `
  mutation UpdatePatientChiefComplaint($input: ChiefComplaintUpdateInput!) {
    updateChiefComplaint(input: $input) {
      id
      title
      hpiComponents {
        id
        title
        hpiComponentTypeId
      }
    }
  }
`;
const GET_HPI_COMPONENT_TYPES = gql `
  query HpiComponentTypes($page: PaginationInput!) {
    hpiComponentTypes(page: $page) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
export const ChiefComplaints = ({ patientChartId, onSaveChange }) => {
    const [hpiComponentState, setHpiComponentState] = useState([]);
    const notifDispatch = useNotificationDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { register, getValues, setValue } = useForm({
        defaultValues: {
            id: patientChartId,
        },
    });
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { data, refetch } = useQuery(GET_DATA, {
        variables: {
            page: { page: 0, size: 100 },
            filter: { patientChartId },
            patientChartId,
        },
    });
    useEffect(() => {
        if (data === null || data === void 0 ? void 0 : data.patientChart) {
            setValue("chiefComplaintsNote", data === null || data === void 0 ? void 0 : data.patientChart.chiefComplaintsNote);
        }
    }, [data]);
    useEffect(() => {
        refetch();
    }, []);
    const hpiComponentTypeQuery = useQuery(GET_HPI_COMPONENT_TYPES, {
        variables: { page: { page: 0, size: 100 } },
    });
    const [saveChiefComplaint] = useMutation(SAVE_CHIEF_COMPLAINT, {
        onCompleted(data) {
            onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Chief complaint saved successfully",
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
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const [deleteChiefComplaint] = useMutation(DELETE_CHIEF_COMPLAINT, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Chief complaint deleted successfully",
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
    const [updateChiefComplaint] = useMutation(UPDATE_CHIEF_COMPLAINT, {
        update: (cache, mutationResult) => {
            const chiefComplaint = mutationResult.data.updateChiefComplaint;
            const data = cache.readQuery({
                query: GET_DATA,
                variables: {
                    page: { page: 0, size: 100 },
                    filter: { patientChartId: patientChartId },
                },
            });
            if (data !== null) {
                cache.writeQuery({
                    query: GET_DATA,
                    variables: {
                        page: { page: 0, size: 100 },
                        filter: { patientChartId: patientChartId },
                    },
                    data: {
                        chiefComplaints: [...data.chiefComplaints.edges, chiefComplaint],
                    },
                });
            }
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
        onCompleted(data) {
            onSaveChange(false);
        },
    });
    const handleChiefComplaintClick = (title) => {
        if (patientChartId !== undefined) {
            onSaveChange(true);
            saveChiefComplaint({
                variables: {
                    input: {
                        title,
                        patientChartId: patientChartId,
                        hpiComponentIds: [],
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
    return (_jsxs("div", { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "w-1/3" }, { children: _jsx(ChiefComplaintTypes, { onItemClick: handleChiefComplaintClick }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsxs("div", Object.assign({ className: "grid grid-rows-2 gap-y-5" }, { children: [_jsxs("div", Object.assign({ className: "row-span-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "History of Present Illness" }), void 0),
                                        _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                                        (data === null || data === void 0 ? void 0 : data.chiefComplaints.edges.length) === 0 && (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 flex h-44 rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                                    _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)), data === null || data === void 0 ? void 0 : data.chiefComplaints.edges.map((e, i) => {
                                            var _a, _b, _c;
                                            const isEdit = (_a = hpiComponentState.find((e) => e.index === i)) === null || _a === void 0 ? void 0 : _a.edit;
                                            const isModified = (_b = hpiComponentState.find((e) => e.index === i)) === null || _b === void 0 ? void 0 : _b.modified;
                                            return (_jsxs("div", Object.assign({ className: classnames("rounded-lg shadow-lg border border-gray-100 py-3 px-3 bg-white", { "mt-5": i !== 0 }) }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", Object.assign({ className: "text-2xl tracking-wider text-gray-800 font-light" }, { children: e === null || e === void 0 ? void 0 : e.node.title }), void 0),
                                                            _jsxs("button", Object.assign({ className: classnames("border border-teal-600 px-3 py-1 rounded-lg flex space-x-1 items-center", {
                                                                    "text-teal-800": !isModified,
                                                                    "text-white bg-teal-800": isModified,
                                                                }), disabled: patientChartLocked[0], onClick: () => {
                                                                    if (isEdit) {
                                                                        var index = hpiComponentState.findIndex((e) => e.index === i);
                                                                        setHpiComponentState([
                                                                            ...hpiComponentState.slice(0, index),
                                                                            Object.assign({}, hpiComponentState[index], {
                                                                                index: i,
                                                                                edit: false,
                                                                                modified: false,
                                                                            }),
                                                                            ...hpiComponentState.slice(index + 1),
                                                                        ]);
                                                                    }
                                                                    else {
                                                                        var index = hpiComponentState.findIndex((e) => e.index === i);
                                                                        setHpiComponentState([
                                                                            ...hpiComponentState.slice(0, index),
                                                                            Object.assign({}, hpiComponentState[index], {
                                                                                index: i,
                                                                                edit: true,
                                                                                modified: false,
                                                                            }),
                                                                            ...hpiComponentState.slice(index + 1),
                                                                        ]);
                                                                    }
                                                                } }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: isEdit ? "list" : "edit" }), void 0),
                                                                    _jsx("p", { children: isEdit ? "List" : "Edit" }, void 0)] }), void 0)] }), void 0),
                                                    _jsxs("div", Object.assign({ className: "mt-5" }, { children: [isEdit && (_jsxs("div", { children: [_jsx(HpiComponent, { values: e === null || e === void 0 ? void 0 : e.node, onChange: (values, hpiComponentTypeId) => {
                                                                            if ((e === null || e === void 0 ? void 0 : e.node.id) !== undefined &&
                                                                                hpiComponentTypeId !== undefined &&
                                                                                values !== undefined) {
                                                                                const patientHpiComponents = e.node.hpiComponents
                                                                                    .filter((e) => (e === null || e === void 0 ? void 0 : e.hpiComponentTypeId) !==
                                                                                    hpiComponentTypeId)
                                                                                    .map((e) => e === null || e === void 0 ? void 0 : e.id);
                                                                                const selectedHpiComponents = values.map((e) => e === null || e === void 0 ? void 0 : e.node.id);
                                                                                const hpiComponentIds = [
                                                                                    ...patientHpiComponents,
                                                                                    ...selectedHpiComponents,
                                                                                ];
                                                                                updateChiefComplaint({
                                                                                    variables: {
                                                                                        input: {
                                                                                            id: e === null || e === void 0 ? void 0 : e.node.id,
                                                                                            hpiComponentIds: hpiComponentIds,
                                                                                        },
                                                                                    },
                                                                                });
                                                                            }
                                                                        } }, void 0),
                                                                    _jsx("div", Object.assign({ className: "text-center w-full p-1 text-sm bg-red-400 text-white rounded-b-md" }, { children: _jsx("button", Object.assign({ type: "button", onClick: () => {
                                                                                if ((e === null || e === void 0 ? void 0 : e.node.id) !== undefined) {
                                                                                    deleteChiefComplaint({
                                                                                        variables: { id: e === null || e === void 0 ? void 0 : e.node.id },
                                                                                    });
                                                                                }
                                                                            }, className: "" }, { children: "Delete Chief Complaint" }), void 0) }), void 0)] }, void 0)),
                                                            isEdit !== true && (e === null || e === void 0 ? void 0 : e.node.hpiComponents.length) === 0 && (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 h-32 flex rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                                                        _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)),
                                                            isEdit !== true && (e === null || e === void 0 ? void 0 : e.node.hpiComponents) &&
                                                                (e === null || e === void 0 ? void 0 : e.node.hpiComponents.length) > 0 && (_jsx("ul", { children: (_c = hpiComponentTypeQuery.data) === null || _c === void 0 ? void 0 : _c.hpiComponentTypes.edges.filter((t) => {
                                                                    const hpiComponentTypeIds = e.node.hpiComponents.map((e) => e === null || e === void 0 ? void 0 : e.hpiComponentTypeId);
                                                                    return hpiComponentTypeIds.includes(t === null || t === void 0 ? void 0 : t.node.id);
                                                                }).map((t) => {
                                                                    const hpiComponents = e === null || e === void 0 ? void 0 : e.node.hpiComponents.filter((e) => (e === null || e === void 0 ? void 0 : e.hpiComponentTypeId) === (t === null || t === void 0 ? void 0 : t.node.id));
                                                                    return (_jsxs("li", Object.assign({ className: "mt-2 pb-2" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-3 items-center" }, { children: [_jsx("span", Object.assign({ className: "material-icons md-16 text-yellow-600" }, { children: "add_circle" }), void 0), " ", _jsx("div", { children: _jsx("p", Object.assign({ className: "text-gray-700 text-lg" }, { children: t === null || t === void 0 ? void 0 : t.node.title }), void 0) }, void 0)] }), void 0),
                                                                            _jsx("ul", Object.assign({ className: "ml-10 mt-1 list-inside list-disc" }, { children: hpiComponents.map((e) => (_jsx("li", Object.assign({ className: "text-gray-800 font-light" }, { children: e === null || e === void 0 ? void 0 : e.title }), e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), t === null || t === void 0 ? void 0 : t.node.id));
                                                                }) }, void 0))] }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                                        })] }), void 0),
                                _jsxs("div", Object.assign({ className: "row-span-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Free Text Note" }), void 0),
                                        _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                                        _jsx("textarea", { name: "chiefComplaintsNote", rows: 3, ref: register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-44 w-full", disabled: patientChartLocked[0], onChange: handleChanges }, void 0)] }), void 0)] }), void 0) }), void 0)] }), void 0)] }, void 0));
};
