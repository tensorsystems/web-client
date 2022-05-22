import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import SystemSymptomsList from "../../components/SystemSymptomsList";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import { AppointmentContext } from "../../_context/AppointmentContext";
const AUTO_SAVE_INTERVAL = 1000;
const UPDATE_PATIENT_HISTORY = gql `
  mutation UpdatePatientHistory($input: PatientHistoryUpdateInput!) {
    updatePatientHistory(input: $input) {
      id
    }
  }
`;
const REVIEW_OF_SYSTEMS = gql `
  query ReviewOfSystems(
    $page: PaginationInput!
    $filter: ReviewOfSystemFilter
  ) {
    reviewOfSystems(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          systemSymptom {
            id
            title
            system {
              id
              title
            }
          }
          note
        }
      }
    }
  }
`;
const SAVE_REVIEW_OF_SYSTEM = gql `
  mutation SaveReviewOfSystem($input: ReviewOfSystemInput!) {
    saveReviewOfSystem(input: $input) {
      id
    }
  }
`;
const DELETE_REVIEW_OF_SYSTEM = gql `
  mutation DeleteReviewOfSystem($id: ID!) {
    deleteReviewOfSystem(id: $id)
  }
`;
const ReviewOfSystemsPage = ({ patientHistory }) => {
    var _a, _b;
    const notifDispatch = useNotificationDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { register, getValues, setValue } = useForm({
        defaultValues: {
            id: patientHistory === null || patientHistory === void 0 ? void 0 : patientHistory.id,
            reviewOfSystemsNote: patientHistory === null || patientHistory === void 0 ? void 0 : patientHistory.reviewOfSystemsNote,
        },
    });
    useEffect(() => {
        if (patientHistory === null || patientHistory === void 0 ? void 0 : patientHistory.reviewOfSystemsNote) {
            setValue("reviewOfSystemsNote", patientHistory.reviewOfSystemsNote);
        }
    }, [patientHistory === null || patientHistory === void 0 ? void 0 : patientHistory.reviewOfSystemsNote]);
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const reviewOfSystemQuery = useQuery(REVIEW_OF_SYSTEMS, {
        variables: {
            page: { page: 0, size: 100 },
            filter: { patientHistoryId: patientHistory === null || patientHistory === void 0 ? void 0 : patientHistory.id },
        },
    });
    const [saveReviewOfSystem] = useMutation(SAVE_REVIEW_OF_SYSTEM, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "ROS saved successfully",
                variant: "success",
            });
            reviewOfSystemQuery.refetch();
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
    const [updatePatientHistory] = useMutation(UPDATE_PATIENT_HISTORY, {
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
    const handleReviewOfSystemClick = (systemSymptomId) => {
        if ((patientHistory === null || patientHistory === void 0 ? void 0 : patientHistory.id) !== undefined) {
            saveReviewOfSystem({
                variables: {
                    input: {
                        systemSymptomId: systemSymptomId,
                        patientHistoryId: patientHistory === null || patientHistory === void 0 ? void 0 : patientHistory.id,
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
            if ((patientHistory === null || patientHistory === void 0 ? void 0 : patientHistory.id) !== undefined && !isEmpty) {
                const input = Object.assign(Object.assign({}, data), { id: patientHistory.id });
                updatePatientHistory({
                    variables: {
                        input,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const [deleteReviewOfSystem] = useMutation(DELETE_REVIEW_OF_SYSTEM, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "ROS deleted successfully",
                variant: "success",
            });
            reviewOfSystemQuery.refetch();
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
    return (_jsxs("div", { children: [_jsx(Prompt, { when: false, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "w-1/3" }, { children: _jsx(SystemSymptomsList, { onItemClick: (systemSymptomId) => handleReviewOfSystemClick(systemSymptomId) }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsxs("div", Object.assign({ className: "grid grid-rows-2 gap-y-5" }, { children: [_jsxs("div", Object.assign({ className: "row-span-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Positive Findings" }), void 0),
                                        _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                                        ((_a = reviewOfSystemQuery.data) === null || _a === void 0 ? void 0 : _a.reviewOfSystems.edges.length) === 0 && (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 min-h-screen flex rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                                    _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)),
                                        _jsx("ul", Object.assign({ className: "overflow-auto" }, { children: (_b = reviewOfSystemQuery.data) === null || _b === void 0 ? void 0 : _b.reviewOfSystems.edges.map((e) => (_jsxs("li", Object.assign({ className: "flex justify-between py-4 px-2" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-3 items-center" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-yellow-600" }, { children: "add_circle" }), void 0), " ", _jsxs("div", { children: [_jsx("p", Object.assign({ className: "font-semibold text-gray-700" }, { children: e === null || e === void 0 ? void 0 : e.node.systemSymptom.title }), void 0),
                                                                    _jsx("p", Object.assign({ className: "text-gray-500 text-sm" }, { children: e === null || e === void 0 ? void 0 : e.node.systemSymptom.system.title }), void 0)] }, void 0)] }), void 0),
                                                    _jsx("div", { children: _jsx("div", Object.assign({ className: "flex items-center space-x-2" }, { children: _jsx("button", Object.assign({ type: "button", disabled: patientChartLocked[0], className: "material-icons text-gray-700", onClick: () => {
                                                                    if ((e === null || e === void 0 ? void 0 : e.node.id) !== undefined) {
                                                                        deleteReviewOfSystem({
                                                                            variables: {
                                                                                id: e === null || e === void 0 ? void 0 : e.node.id,
                                                                            },
                                                                        });
                                                                    }
                                                                } }, { children: "delete" }), void 0) }), void 0) }, void 0)] }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
                                _jsxs("div", Object.assign({ className: "row-span-1 h-full bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Free Text Note" }), void 0),
                                        _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                                        _jsx("textarea", { name: "reviewOfSystemsNote", rows: 3, ref: register, disabled: patientChartLocked[0], className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-44 w-full", onChange: handleChanges }, void 0)] }), void 0)] }), void 0) }), void 0)] }), void 0)] }, void 0));
};
export default ReviewOfSystemsPage;
