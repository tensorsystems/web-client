import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import classnames from "classnames";
import { HistoryItemComponent } from "../../components/HistoryItemComponent";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { useNotificationDispatch } from "../../notification";
import { UpdatePastIllnessForm } from "../../components/UpdatePastIllnessForm";
import { SavePastIllnessForm } from "../../components/SavePastIllnessForm";
import { SavePastHospitalizationForm } from "../../components/SavePastHospitalizationForm";
import { UpdatePastHospitalizationForm } from "../../components/UpdatePastHospitalizationForm";
import { format, parseISO } from "date-fns";
import { SavePastInjuryForm } from "../../components/SavePastInjuryForm";
import { UpdatePastInjuryForm } from "../../components/UpdatePastInjuryForm";
import { SavePastSurgeryForm } from "../../components/SavePastSurgeryForm";
import { UpdatePastSurgeryForm } from "../../components/UpdatePastSurgeryForm";
import { SaveFamilyIllnessForm } from "../../components/SaveFamilyIllnessForm";
import { UpdateFamilyIllnessForm } from "../../components/UpdateFamilyIllnessForm";
import { SaveLifestyleForm } from "../../components/SaveLifestyleForm";
import { UpdateLifestyleForm } from "../../components/UpdateLifestyleForm";
import { FileUploaderComponent, } from "../../components/FileUploaderComponent";
import { getFileUrl } from "../../util";
const GET_HISTORY = gql `
  query GetHistory($patientHistoryId: ID!, $patientId: ID!) {
    pastIllnesses(patientHistoryId: $patientHistoryId) {
      id
      title
      description
    }
    pastInjuries(patientHistoryId: $patientHistoryId) {
      id
      description
      injuryDate
    }
    pastHospitalizations(patientHistoryId: $patientHistoryId) {
      id
      reason
      provider
      from
      to
    }
    pastSurgeries(patientHistoryId: $patientHistoryId) {
      id
      description
      surgeryDate
    }
    lifestyles(patientHistoryId: $patientHistoryId) {
      id
      title
      description
      note
    }
    familyIllnesses(patientHistoryId: $patientHistoryId) {
      id
      title
      description
    }
    patient(id: $patientId) {
      id
      paperRecordDocumentId
      paperRecordDocument {
        id
        size
        hash
        fileName
        extension
        contentType
        createdAt
      }
    }
    patientHistory(id: $patientHistoryId) {
      reviewOfSystemsNote
    }
    reviewOfSystems(
      page: { page: 0, size: 1000 }
      filter: { patientHistoryId: $patientHistoryId }
    ) {
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
const DELETE_PAST_ILLNESS = gql `
  mutation DeletePastIllness($id: ID!) {
    deletePastIllness(id: $id)
  }
`;
const DELETE_PAST_HOSPITALIZATION = gql `
  mutation DeleteHospitalization($id: ID!) {
    deletePastHospitalization(id: $id)
  }
`;
const DELETE_PAST_INJURY = gql `
  mutation DeletePastInjury($id: ID!) {
    deletePastInjury(id: $id)
  }
`;
const DELETE_PAST_SURGERY = gql `
  mutation DeletePastSurgery($id: ID!) {
    deletePastSurgery(id: $id)
  }
`;
const DELETE_FAMILY_ILLNESS = gql `
  mutation DeleteFamillyIllness($id: ID!) {
    deleteFamilyIllness(id: $id)
  }
`;
const DELETE_LIFESTYLE = gql `
  mutation DeleteLifestyle($id: ID!) {
    deleteLifestyle(id: $id)
  }
`;
export const HistoryPage = ({ isEdit = true, appointment, showPaperRecord = true, onSaveChange, onHasHistoryChange, }) => {
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const [paperRecordDocuments, setPaperRecordDocuments] = useState([]);
    const { data, refetch } = useQuery(GET_HISTORY, {
        variables: {
            patientHistoryId: appointment.patient.patientHistory.id,
            patientId: appointment.patient.id,
        },
    });
    useEffect(() => {
        var _a, _b;
        const paperRecordDocument = data === null || data === void 0 ? void 0 : data.patient.paperRecordDocument;
        if (paperRecordDocument) {
            const record = {
                id: paperRecordDocument.id,
                fileUrl: getFileUrl({
                    baseUrl: process.env.REACT_APP_SERVER_URL,
                    fileName: paperRecordDocument.fileName,
                    hash: paperRecordDocument.hash,
                    extension: paperRecordDocument.extension,
                }),
                name: (_a = paperRecordDocument.fileName) !== null && _a !== void 0 ? _a : "",
                size: paperRecordDocument.size,
                createdAt: paperRecordDocument.createdAt,
                contentType: (_b = paperRecordDocument.contentType) !== null && _b !== void 0 ? _b : "",
            };
            setPaperRecordDocuments([record]);
        }
    }, [data]);
    const history = data;
    const handleRefresh = () => {
        refetch();
    };
    const hasPastIllnesses = (history === null || history === void 0 ? void 0 : history.pastIllnesses) && (history === null || history === void 0 ? void 0 : history.pastIllnesses.length) > 0;
    const hasPastInjuries = (history === null || history === void 0 ? void 0 : history.pastInjuries) && (history === null || history === void 0 ? void 0 : history.pastInjuries.length) > 0;
    const hasPastHospitalizations = (history === null || history === void 0 ? void 0 : history.pastHospitalizations) && (history === null || history === void 0 ? void 0 : history.pastHospitalizations.length) > 0;
    const hasPastSurgeries = (history === null || history === void 0 ? void 0 : history.pastSurgeries) && (history === null || history === void 0 ? void 0 : history.pastSurgeries.length) > 0;
    const hasLifestyles = (history === null || history === void 0 ? void 0 : history.lifestyles) && (history === null || history === void 0 ? void 0 : history.lifestyles.length) > 0;
    const hasFamilyIllnesses = (history === null || history === void 0 ? void 0 : history.familyIllnesses) && (history === null || history === void 0 ? void 0 : history.familyIllnesses.length) > 0;
    const hasHistory = hasPastIllnesses ||
        hasPastInjuries ||
        hasPastHospitalizations ||
        hasPastSurgeries ||
        hasLifestyles ||
        hasFamilyIllnesses;
    useEffect(() => {
        onHasHistoryChange &&
            onHasHistoryChange(hasHistory === undefined ? false : hasHistory);
    }, [hasHistory]);
    const [deletePastIllness] = useMutation(DELETE_PAST_ILLNESS, {
        onCompleted(data) {
            onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Past Illness deleted successfully",
                variant: "success",
            });
            onSaveChange(false);
            handleRefresh();
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
    const [deletePastHospitalization] = useMutation(DELETE_PAST_HOSPITALIZATION, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Past Hospitalization deleted successfully",
                variant: "success",
            });
            onSaveChange(false);
            handleRefresh();
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
    const [deletePastInjury] = useMutation(DELETE_PAST_INJURY, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Past Injury deleted successfully",
                variant: "success",
            });
            onSaveChange(false);
            handleRefresh();
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
    const [deletePastSurgery] = useMutation(DELETE_PAST_SURGERY, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Past Injury deleted successfully",
                variant: "success",
            });
            onSaveChange(false);
            handleRefresh();
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
    const [deleteFamilyIllness] = useMutation(DELETE_FAMILY_ILLNESS, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Family Illness deleted successfully",
                variant: "success",
            });
            onSaveChange(false);
            handleRefresh();
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
    const [deleteLifestyle] = useMutation(DELETE_LIFESTYLE, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Lifestyle deleted successfully",
                variant: "success",
            });
            onSaveChange(false);
            handleRefresh();
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
    return (_jsxs("div", Object.assign({ className: classnames("bg-gray-50 p-2", {
            "rounded shadow-lg p-5": isEdit,
        }) }, { children: [_jsx("div", Object.assign({ className: "text-xl text-gray-600 font-semibold" }, { children: "History" }), void 0),
            _jsx("hr", { className: "mt-3" }, void 0),
            _jsx("div", Object.assign({ hidden: isEdit || hasHistory, className: "text-center text-gray-500 mt-5" }, { children: "Nothing here yet" }), void 0),
            (paperRecordDocuments === null || paperRecordDocuments === void 0 ? void 0 : paperRecordDocuments.length) > 0 && showPaperRecord && (_jsxs("div", Object.assign({ className: "mt-5" }, { children: [_jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Paper record" }), void 0),
                    _jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx(FileUploaderComponent, { multiSelect: false, accept: "image", values: paperRecordDocuments, disabled: true }, void 0) }), void 0)] }), void 0)),
            _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-3 mt-5" }, { children: [_jsx("div", Object.assign({ hidden: !isEdit && !hasPastIllnesses }, { children: _jsx(HistoryItemComponent, { title: "Illnesses", items: history === null || history === void 0 ? void 0 : history.pastIllnesses.map((e) => (Object.assign(Object.assign({}, e), { subTitle: e === null || e === void 0 ? void 0 : e.description }))), isEdit: isEdit, onAdd: () => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(SavePastIllnessForm, { patientHistoryId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.patientHistory.id, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Past Illness saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onUpdate: (item) => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(UpdatePastIllnessForm, { values: item, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Past Illness saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onDelete: (id) => {
                                onSaveChange(true);
                                deletePastIllness({ variables: { id } });
                            } }, void 0) }), void 0),
                    _jsx("div", Object.assign({ hidden: !isEdit && !hasPastHospitalizations }, { children: _jsx(HistoryItemComponent, { title: "Hospitalizations", items: history === null || history === void 0 ? void 0 : history.pastHospitalizations.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.reason, subTitle: e === null || e === void 0 ? void 0 : e.provider, subTitle2: (e === null || e === void 0 ? void 0 : e.from) && (e === null || e === void 0 ? void 0 : e.to) && (_jsx("p", Object.assign({ className: "text-gray-500 text-sm" }, { children: `From ${format(parseISO(e === null || e === void 0 ? void 0 : e.from), "dd/MM/yyyy")} to ${format(parseISO(e === null || e === void 0 ? void 0 : e.to), "dd/MM/yyyy")}` }), void 0)) }))), isEdit: isEdit, onAdd: () => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(SavePastHospitalizationForm, { patientHistoryId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.patientHistory.id, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Past Hospitalization saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onUpdate: (item) => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(UpdatePastHospitalizationForm, { values: item, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Past Hospitalization saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onDelete: (id) => {
                                onSaveChange(true);
                                deletePastHospitalization({ variables: { id } });
                            } }, void 0) }), void 0),
                    _jsx("div", Object.assign({ hidden: !isEdit && !hasPastInjuries }, { children: _jsx(HistoryItemComponent, { title: "Injuries", items: history === null || history === void 0 ? void 0 : history.pastInjuries.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.description }))), isEdit: isEdit, onAdd: () => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(SavePastInjuryForm, { patientHistoryId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.patientHistory.id, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Past Injury saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onUpdate: (item) => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(UpdatePastInjuryForm, { values: item, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Past Injuries saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onDelete: (id) => {
                                onSaveChange(true);
                                deletePastInjury({ variables: { id } });
                            } }, void 0) }), void 0),
                    _jsx("div", Object.assign({ hidden: !isEdit && !hasPastSurgeries }, { children: _jsx(HistoryItemComponent, { title: "Surgeries", items: history === null || history === void 0 ? void 0 : history.pastSurgeries.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.description, subTitle: (e === null || e === void 0 ? void 0 : e.surgeryDate) &&
                                    format(parseISO(e === null || e === void 0 ? void 0 : e.surgeryDate), "dd/MM/yyyy") }))), isEdit: isEdit, onAdd: () => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(SavePastSurgeryForm, { patientHistoryId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.patientHistory.id, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Past surgery saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onUpdate: (item) => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(UpdatePastSurgeryForm, { values: item, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Past surgery saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onDelete: (id) => {
                                onSaveChange(true);
                                deletePastSurgery({ variables: { id } });
                            } }, void 0) }), void 0),
                    _jsx("div", Object.assign({ hidden: !isEdit && !hasFamilyIllnesses }, { children: _jsx(HistoryItemComponent, { title: "Family Illness", items: history === null || history === void 0 ? void 0 : history.familyIllnesses.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.title, subTitle: e === null || e === void 0 ? void 0 : e.description }))), isEdit: isEdit, onAdd: () => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(SaveFamilyIllnessForm, { patientHistoryId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.patientHistory.id, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Family Illness saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onUpdate: (item) => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(UpdateFamilyIllnessForm, { values: item, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Family illness saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onDelete: (id) => {
                                onSaveChange(true);
                                deleteFamilyIllness({ variables: { id } });
                            } }, void 0) }), void 0),
                    _jsx("div", Object.assign({ hidden: !isEdit && !hasLifestyles }, { children: _jsx(HistoryItemComponent, { title: "Lifestyle", items: history === null || history === void 0 ? void 0 : history.lifestyles.map((e) => (Object.assign(Object.assign({}, e), { title: e === null || e === void 0 ? void 0 : e.title, subTitle: e === null || e === void 0 ? void 0 : e.description, subTitle2: e === null || e === void 0 ? void 0 : e.note }))), isEdit: isEdit, onAdd: () => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(SaveLifestyleForm, { patientHistoryId: appointment === null || appointment === void 0 ? void 0 : appointment.patient.patientHistory.id, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Lifestyle saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onUpdate: (item) => {
                                bottomSheetDispatch({
                                    type: "show",
                                    snapPoint: 500,
                                    children: (_jsx(UpdateLifestyleForm, { values: item, onSuccess: () => {
                                            bottomSheetDispatch({ type: "hide" });
                                            notifDispatch({
                                                type: "show",
                                                notifTitle: "Success",
                                                notifSubTitle: "Lifestyle saved successfully",
                                                variant: "success",
                                            });
                                            handleRefresh();
                                        }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onSaveChange: onSaveChange }, void 0)),
                                });
                            }, onDelete: (id) => {
                                onSaveChange(true);
                                deleteLifestyle({ variables: { id } });
                            } }, void 0) }), void 0)] }), void 0)] }), void 0));
};
