import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { AddMedicalPrescriptionForm } from "../../components/AddMedicalPrescriptionForm";
import { UpdateMedicalPrescriptionForm } from "../../components/UpdateMedicationForm";
import { useNotificationDispatch } from "../../notification";
import { MedicationTable } from "../../components/MedicationTable";
import { AddAllergyForm } from "../../components/AddAllergyForm";
import { AllergyTable } from "../../components/AllergyTable";
import { UpdateAllergyForm } from "../../components/UpdateAllergyForm";
import { AppointmentContext } from "../../_context/AppointmentContext";
export const MedicationAllergiesPage = (props) => {
    return (_jsxs("div", Object.assign({ className: "" }, { children: [_jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx(PastMedications, Object.assign({}, props), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx(Allergies, { patientHistoryId: props.patientHistoryId }, void 0) }), void 0)] }), void 0));
};
const MEDICATION_PRESCRIPTIONS = gql `
  query SearchMedicalPrescriptions(
    $page: PaginationInput!
    $filter: MedicalPrescriptionFilter
  ) {
    searchMedicalPrescriptions(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          medication
          synonym
          sig
          refill
          generic
          substitutionAllowed
          directionToPatient
          prescribedDate
          history
          status
        }
      }
    }
  }
`;
const UPDATE_MEDICATION_PRESCRIPTION = gql `
  mutation UpdateMedicationPrescription(
    $input: MedicalPrescriptionUpdateInput!
  ) {
    updateMedicationPrescription(input: $input) {
      id
    }
  }
`;
const PastMedications = ({ patientChartId, patientId }) => {
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { data, refetch } = useQuery(MEDICATION_PRESCRIPTIONS, {
        variables: {
            page: { page: 0, size: 20 },
            filter: { patientId: patientId },
        },
    });
    const [update] = useMutation(UPDATE_MEDICATION_PRESCRIPTION, {
        onCompleted(data) {
            refetch();
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Medication has been updated successfully",
                variant: "success",
            });
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
    const onPrescribeAnother = () => {
        bottomSheetDispatch({ type: "hide" });
        notifDispatch({
            type: "show",
            notifTitle: "Success",
            notifSubTitle: "Prescription has been saved successfully",
            variant: "success",
        });
        refetch();
        bottomSheetDispatch({
            type: "show",
            snapPoint: 0,
            children: (_jsx(AddMedicalPrescriptionForm, { history: true, patientId: patientId, patientChartId: patientChartId, onSuccess: () => {
                    bottomSheetDispatch({ type: "hide" });
                    notifDispatch({
                        type: "show",
                        notifTitle: "Success",
                        notifSubTitle: "Medication has been saved successfully",
                        variant: "success",
                    });
                    refetch();
                }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onPrescribeAnother: onPrescribeAnother, title: "Add Past Medication" }, void 0)),
        });
    };
    return (_jsxs("div", Object.assign({ className: "flex-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text-gray-600 font-bold" }, { children: "Past Medications" }), void 0),
            _jsx("hr", { className: "mt-4 mb-4" }, void 0),
            _jsx("div", Object.assign({ className: "flex justify-end" }, { children: _jsxs("button", Object.assign({ disabled: patientChartLocked[0], onClick: () => bottomSheetDispatch({
                        type: "show",
                        snapPoint: 0,
                        children: (_jsx(AddMedicalPrescriptionForm, { history: true, patientId: patientId, patientChartId: patientChartId, onSuccess: () => {
                                bottomSheetDispatch({ type: "hide" });
                                notifDispatch({
                                    type: "show",
                                    notifTitle: "Success",
                                    notifSubTitle: "Medication has been saved successfully",
                                    variant: "success",
                                });
                                refetch();
                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onPrescribeAnother: onPrescribeAnother, title: "Add Past Medication" }, void 0)),
                    }), className: "border border-teal-600 text-teal-800 px-3 py-1 rounded-lg flex space-x-1 items-center" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                        _jsx("p", { children: "Add" }, void 0)] }), void 0) }), void 0),
            _jsx(MedicationTable, { items: data === null || data === void 0 ? void 0 : data.searchMedicalPrescriptions.edges.map((e) => e === null || e === void 0 ? void 0 : e.node), onUpdate: (item, value) => {
                    if (item.id !== undefined) {
                        update({
                            variables: {
                                input: {
                                    id: item.id,
                                    status: value,
                                },
                            },
                        });
                    }
                }, onEdit: (item) => {
                    bottomSheetDispatch({
                        type: "show",
                        snapPoint: 0,
                        children: (_jsx(UpdateMedicalPrescriptionForm, { onUpdateSuccess: () => {
                                bottomSheetDispatch({ type: "hide" });
                                notifDispatch({
                                    type: "show",
                                    notifTitle: "Success",
                                    notifSubTitle: "Medication has been updated successfully",
                                    variant: "success",
                                });
                                refetch();
                            }, onDeleteSuccess: () => {
                                bottomSheetDispatch({ type: "hide" });
                                notifDispatch({
                                    type: "show",
                                    notifTitle: "Success",
                                    notifSubTitle: "Medication has been deleted successfully",
                                    variant: "success",
                                });
                                refetch();
                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }), values: item, pharmacyIdValue: null }, void 0)),
                    });
                }, onPrint: () => { } }, void 0)] }), void 0));
};
const ALLERGIES = gql `
  query Allergies($page: PaginationInput!, $filter: AllergyFilter) {
    allergies(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          title
          issueSeverity
          issueReaction
          issueOutcome
          issueOccurrence
        }
      }
    }
  }
`;
const UPDATE_ALLERGY = gql `
  mutation UpdateAllergy($input: AllergyUpdateInput!) {
    updateAllergy(input: $input) {
      id
    }
  }
`;
const Allergies = ({ patientHistoryId, }) => {
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const { data, refetch } = useQuery(ALLERGIES, {
        variables: {
            page: { page: 0, size: 20 },
            filter: { patientHistoryId },
        },
    });
    return (_jsxs("div", Object.assign({ className: "flex-1 bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx("p", Object.assign({ className: "text-2xl text--600 font-bold" }, { children: "Allergies" }), void 0),
            _jsx("hr", { className: "mt-4 mb-4" }, void 0),
            _jsx("div", Object.assign({ className: "flex justify-end" }, { children: _jsxs("button", Object.assign({ disabled: patientChartLocked[0], onClick: () => bottomSheetDispatch({
                        type: "show",
                        snapPoint: 0,
                        children: (_jsx(AddAllergyForm, { patientHistoryId: patientHistoryId, onSuccess: () => {
                                bottomSheetDispatch({ type: "hide" });
                                notifDispatch({
                                    type: "show",
                                    notifTitle: "Success",
                                    notifSubTitle: "Medication has been saved successfully",
                                    variant: "success",
                                });
                                refetch();
                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                    }), className: "border border-teal-600 text-teal-800 px-3 py-1 rounded-lg flex space-x-1 items-center" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                        _jsx("p", { children: "Add" }, void 0)] }), void 0) }), void 0),
            _jsx(AllergyTable, { items: data === null || data === void 0 ? void 0 : data.allergies.edges, onEdit: (item) => {
                    bottomSheetDispatch({
                        type: "show",
                        snapPoint: 0,
                        children: (_jsx(UpdateAllergyForm, { onUpdateSuccess: () => {
                                bottomSheetDispatch({ type: "hide" });
                                notifDispatch({
                                    type: "show",
                                    notifTitle: "Success",
                                    notifSubTitle: "Allergy has been updated successfully",
                                    variant: "success",
                                });
                                refetch();
                            }, onDeleteSuccess: () => {
                                bottomSheetDispatch({ type: "hide" });
                                notifDispatch({
                                    type: "show",
                                    notifTitle: "Success",
                                    notifSubTitle: "Allergy has been deleted successfully",
                                    variant: "success",
                                });
                                refetch();
                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }), values: item }, void 0)),
                    });
                } }, void 0)] }), void 0));
};
