import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Switch } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import PhysicalExamCategoryList from "../../components/PhysicalExamCategoryList";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import { AppointmentContext } from "../../_context/AppointmentContext";
const AUTO_SAVE_INTERVAL = 1000;
const SAVE_PHYSICAL_EXAM_FINDING = gql `
  mutation SavePhysicalExamFinding($input: PhysicalExamFindingInput!) {
    savePhysicalExamFinding(input: $input) {
      id
    }
  }
`;
const UPDATE_PHYSICAL_EXAM_FINDING = gql `
  mutation UpdatePhysicalExamFinding($input: PhysicalExamFindingUpdateInput!) {
    updatePhysicalExamFinding(input: $input) {
      id
    }
  }
`;
const DELETE_PHYSICAL_EXAM_FINDING = gql `
  mutation DeletePhysicalExamFinding($id: ID!) {
    deletePhysicalExamFinding(id: $id)
  }
`;
const PHYSICAL_EXAM_FINDINGS = gql `
  query PhyscialExamFindings(
    $page: PaginationInput!
    $filter: PhysicalExamFindingFilter
  ) {
    physicalExamFindings(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          abnormal
          examCategory {
            id
            title
          }
          examCategoryId
          patientChartId
          note
        }
      }
    }
  }
`;
const GeneralExamination = ({ patientChartId }) => {
    var _a;
    const notifDispatch = useNotificationDispatch();
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { data, refetch } = useQuery(PHYSICAL_EXAM_FINDINGS, {
        variables: {
            page: { page: 0, size: 100 },
            filter: { patientChartId },
        },
    });
    const [savePhysicalExamFinding] = useMutation(SAVE_PHYSICAL_EXAM_FINDING, {
        onCompleted(data) {
            refetch();
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
    const [updatePhysicalExamFinding] = useMutation(UPDATE_PHYSICAL_EXAM_FINDING, {
        onCompleted(data) {
            setModified(false);
            setShowExitPrompt(false);
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
    const [deletePhysicalExamFinding] = useMutation(DELETE_PHYSICAL_EXAM_FINDING, {
        onCompleted(data) {
            setModified(false);
            setShowExitPrompt(false);
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
    const handleChange = (note, e) => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            updatePhysicalExamFinding({
                variables: {
                    input: {
                        id: e.id,
                        examCategoryId: e.examCategoryId,
                        patientChartId: e.patientChartId,
                        abnormal: e.abnormal,
                        note: note,
                    },
                },
            });
        }, AUTO_SAVE_INTERVAL));
    };
    const handleDeletePhysicalExamFinding = (id) => {
        if (id) {
            deletePhysicalExamFinding({
                variables: {
                    id,
                },
            });
        }
    };
    return (_jsxs("div", { children: [_jsx(Prompt, { when: false, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "w-1/3" }, { children: _jsx(PhysicalExamCategoryList, { onItemClick: (examCategoryId) => {
                                savePhysicalExamFinding({
                                    variables: {
                                        input: {
                                            examCategoryId: examCategoryId,
                                            patientChartId: patientChartId,
                                            abnormal: true,
                                        },
                                    },
                                });
                            } }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("div", Object.assign({ className: "grid grid-rows-2 gap-y-5" }, { children: _jsxs("div", Object.assign({ className: "row-span-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Pertinent Findings" }), void 0),
                                    _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                                    ((_a = data === null || data === void 0 ? void 0 : data.physicalExamFindings.edges.length) !== null && _a !== void 0 ? _a : 0) === 0 && (_jsx("div", Object.assign({ className: "bg-gray-100 mt-5 flex h-44 rounded-sm shadow-inner" }, { children: _jsxs("div", Object.assign({ className: "m-auto flex space-x-1 text-gray-500" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "inbox" }), void 0),
                                                _jsx("p", Object.assign({ className: "text-center" }, { children: "Nothing here yet" }), void 0)] }), void 0) }), void 0)),
                                    _jsx("ul", { children: data === null || data === void 0 ? void 0 : data.physicalExamFindings.edges.map((e) => {
                                            var _a;
                                            return (_jsxs("li", Object.assign({ className: "rounded-lg shadow-lg py-3 px-3 bg-white mt-4" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-3" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-2 items-center" }, { children: [(e === null || e === void 0 ? void 0 : e.node.abnormal) ? (_jsx("span", Object.assign({ className: "material-icons text-yellow-600" }, { children: "add_circle" }), void 0)) : (_jsx("span", Object.assign({ className: "material-icons text-green-600" }, { children: "remove_circle" }), void 0)),
                                                                            _jsx("span", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light " }, { children: e === null || e === void 0 ? void 0 : e.node.examCategory.title }), void 0)] }), void 0),
                                                                    _jsx("div", { children: _jsx(TrashIcon, { className: "h-6 w-6 text-red-400 transform hover:scale-110 cursor-pointer", onClick: () => !patientChartLocked[0] &&
                                                                                handleDeletePhysicalExamFinding(e === null || e === void 0 ? void 0 : e.node.id) }, void 0) }, void 0)] }), void 0),
                                                            _jsx("div", { children: _jsxs(Switch, Object.assign({ disabled: patientChartLocked[0], checked: e === null || e === void 0 ? void 0 : e.node.abnormal, onChange: (value) => {
                                                                        updatePhysicalExamFinding({
                                                                            variables: {
                                                                                input: {
                                                                                    id: e === null || e === void 0 ? void 0 : e.node.id,
                                                                                    examCategoryId: e === null || e === void 0 ? void 0 : e.node.examCategoryId,
                                                                                    patientChartId: e === null || e === void 0 ? void 0 : e.node.patientChartId,
                                                                                    note: e === null || e === void 0 ? void 0 : e.node.note,
                                                                                    abnormal: value,
                                                                                },
                                                                            },
                                                                        });
                                                                    }, className: `${(e === null || e === void 0 ? void 0 : e.node.abnormal) ? "bg-yellow-600" : "bg-gray-200"} relative inline-flex items-center h-6 rounded-full w-11` }, { children: [_jsx("span", Object.assign({ className: "sr-only" }, { children: "Abnormal" }), void 0),
                                                                        _jsx("span", { className: `${(e === null || e === void 0 ? void 0 : e.node.abnormal) ? "translate-x-6"
                                                                                : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full` }, void 0)] }), void 0) }, void 0)] }), void 0),
                                                    _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("div", { children: _jsx("textarea", { name: "note", rows: 3, className: "p-3 block w-full sm:text-md border-gray-200 border rounded-md", disabled: patientChartLocked[0], defaultValue: (_a = e === null || e === void 0 ? void 0 : e.node.note) !== null && _a !== void 0 ? _a : "", onChange: (evt) => handleChange(evt.target.value, e.node) }, void 0) }, void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                                        }) }, void 0)] }), void 0) }), void 0) }), void 0)] }), void 0)] }, void 0));
};
export default GeneralExamination;
