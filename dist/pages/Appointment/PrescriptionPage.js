import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { AddMedicalPrescriptionForm } from "../../components/AddMedicalPrescriptionForm";
import { UpdateMedicalPrescriptionForm } from "../../components/UpdateMedicationForm";
import { useNotificationDispatch } from "../../notification";
import { FavoriteMedicationList } from "../../components/FavoriteMedicationList";
import { MedicationTable } from "../../components/MedicationTable";
import { AddEyeGlassPrescriptionForm } from "../../components/AddEyeGlassPrescriptionForm";
import { EyeGlassTable } from "../../components/EyeGlassTable";
import { UpdateEyewearPrescriptionForm } from "../../components/UpdateEyeGlassPrescriptionForm";
import { AppointmentContext } from "../../_context/AppointmentContext";
import { useReactToPrint } from "react-to-print";
import { parseJwt, } from "../../util";
import MedicalPrescriptionPrint from "../../components/MedicalPrescriptionPrint";
import EyewearPrescriptionPrint from "../../components/EyewearPrescriptionPrint";
const GET_DATA = gql `
  query GetData($patientChartId: ID!, $appointmentId: ID!, $userId: ID!) {
    medicationPrescriptionOrder(patientChartId: $patientChartId) {
      id
      pharmacyId
      firstName
      lastName
      phoneNo
      userName
      status
      createdAt
      medicalPrescriptions {
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

    eyewearPrescriptionOrder(patientChartId: $patientChartId) {
      id
      eyewearShopId
      firstName
      lastName
      phoneNo
      userName
      createdAt
      eyewearPrescriptions {
        id
        glass
        plastic
        singleVision
        photoChromatic
        glareFree
        scratchResistant
        bifocal
        progressive
        twoSeparateGlasses
        highIndex
        tint
        blueCut
        prescribedDate
        history
        status
      }
    }

    refraction(patientChartId: $patientChartId) {
      id
      rightDistanceSubjectiveSph
      leftDistanceSubjectiveSph
      rightDistanceSubjectiveCyl
      leftDistanceSubjectiveCyl
      rightDistanceSubjectiveAxis
      leftDistanceSubjectiveAxis
      rightNearSubjectiveSph
      leftNearSubjectiveSph
      rightNearSubjectiveCyl
      leftNearSubjectiveCyl
      rightNearSubjectiveAxis
      leftNearSubjectiveAxis
      rightDistanceObjectiveSph
      leftDistanceObjectiveSph
      rightDistanceObjectiveCyl
      leftDistanceObjectiveCyl
      rightDistanceObjectiveAxis
      leftDistanceObjectiveAxis
      rightNearObjectiveSph
      leftNearObjectiveSph
      rightNearObjectiveCyl
      leftNearObjectiveCyl
      rightNearObjectiveAxis
      leftNearObjectiveAxis
      rightDistanceFinalSph
      leftDistanceFinalSph
      rightDistanceFinalCyl
      leftDistanceFinalCyl
      rightDistanceFinalAxis
      leftDistanceFinalAxis
      rightNearFinalSph
      leftNearFinalSph
      rightNearFinalCyl
      leftNearFinalCyl
      rightNearFinalAxis
      leftNearFinalAxis
      rightVisualAcuity
      leftVisualAcuity
      farPd
      nearPd
    }

    appointment(id: $appointmentId) {
      patient {
        id
        firstName
        lastName
        dateOfBirth
        gender
        city
        subCity
        woreda
        phoneNo
      }
      providerName
    }

    user(id: $userId) {
      id
      firstName
      lastName
      signature {
        id
        size
        hash
        fileName
        extension
        contentType
        createdAt
      }
    }
  }
`;
const FAVORITE_MEDICATIONS = gql `
  query UserFavoriteMedications($page: PaginationInput!, $searchTerm: String) {
    userFavoriteMedications(page: $page, searchTerm: $searchTerm) {
      totalCount
      edges {
        node {
          id
          medication
          sig
          rxCui
          synonym
          tty
          language
          refill
          generic
          substitutionAllowed
          directionToPatient
          userId
        }
      }
      pageInfo {
        totalPages
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
export const PrescriptionPage = ({ patientChartId, appointmentId, patientId, isEdit = true, }) => {
    var _a, _b, _c, _d, _e;
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [showPrintButton, setShowPrintButton] = useState(false);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [prescriptionType, setPrescriptionType] = useState("Medication");
    useEffect(() => { }, [prescriptionType]);
    const token = sessionStorage.getItem("accessToken");
    const claim = parseJwt(token);
    const { data, refetch } = useQuery(GET_DATA, {
        variables: {
            patientChartId: patientChartId,
            appointmentId: appointmentId,
            userId: claim.ID,
        },
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 20,
    });
    const favoriteMedicationsQuery = useQuery(FAVORITE_MEDICATIONS, {
        variables: { page: paginationInput, searchTerm },
    });
    useEffect(() => {
        favoriteMedicationsQuery.refetch();
    }, [paginationInput, searchTerm]);
    const handleNextClick = () => {
        var _a, _b;
        const totalPages = (_b = (_a = favoriteMedicationsQuery.data) === null || _a === void 0 ? void 0 : _a.userFavoriteMedications.pageInfo.totalPages) !== null && _b !== void 0 ? _b : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const [update] = useMutation(UPDATE_MEDICATION_PRESCRIPTION, {
        onCompleted(data) {
            refetch();
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Prescription has been updated successfully",
                variant: "success",
            });
            favoriteMedicationsQuery.refetch();
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
        favoriteMedicationsQuery.refetch();
        bottomSheetDispatch({
            type: "show",
            snapPoint: 0,
            children: (_jsx(AddMedicalPrescriptionForm, { patientId: patientId, patientChartId: patientChartId, history: false, onSuccess: () => {
                    bottomSheetDispatch({ type: "hide" });
                    notifDispatch({
                        type: "show",
                        notifTitle: "Success",
                        notifSubTitle: "Prescription has been saved successfully",
                        variant: "success",
                    });
                    refetch();
                    favoriteMedicationsQuery.refetch();
                }, onPrescribeAnother: onPrescribeAnother, onCancel: () => bottomSheetDispatch({ type: "hide" }), title: "Prescribe Medication" }, void 0)),
        });
    };
    return (_jsxs("div", Object.assign({ className: "flex space-x-6" }, { children: [_jsx("div", Object.assign({ className: "w-1/3", hidden: prescriptionType === "Eyewear" }, { children: _jsx(FavoriteMedicationList, { userFavoriteMedications: (_a = favoriteMedicationsQuery.data) === null || _a === void 0 ? void 0 : _a.userFavoriteMedications, refetch: () => favoriteMedicationsQuery.refetch(), handleNextClick: handleNextClick, handlePreviousClick: handlePreviousClick, setSearchTerm: setSearchTerm, onItemClick: (item) => {
                        bottomSheetDispatch({
                            type: "show",
                            snapPoint: 0,
                            children: (_jsx(AddMedicalPrescriptionForm, { patientId: patientId, patientChartId: patientChartId, values: item, history: false, onSuccess: () => {
                                    bottomSheetDispatch({ type: "hide" });
                                    notifDispatch({
                                        type: "show",
                                        notifTitle: "Success",
                                        notifSubTitle: "Medication has been saved successfully",
                                        variant: "success",
                                    });
                                    refetch();
                                    favoriteMedicationsQuery.refetch();
                                }, onCancel: () => {
                                    favoriteMedicationsQuery.refetch();
                                    bottomSheetDispatch({ type: "hide" });
                                }, onPrescribeAnother: () => {
                                    favoriteMedicationsQuery.refetch();
                                    onPrescribeAnother();
                                }, title: "Prescribe Medication" }, void 0)),
                        });
                    } }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "flex-1 " }, { children: [_jsxs("div", Object.assign({ className: "bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsxs("select", Object.assign({ name: "prescriptionType", value: prescriptionType, onChange: (evt) => evt.target.value === "Medication"
                                    ? setPrescriptionType("Medication")
                                    : setPrescriptionType("Eyewear"), className: "mt-1 text-2xl text-gray-600 font-bold bg-gray-50 border-none" }, { children: [_jsx("option", Object.assign({ value: "Medication" }, { children: "Medication" }), void 0),
                                    _jsx("option", Object.assign({ value: "Eyewear" }, { children: "Eyewear" }), void 0)] }), void 0),
                            _jsx("hr", { className: "mt-4 mb-4" }, void 0),
                            _jsx("div", Object.assign({ className: "flex justify-end" }, { children: _jsxs("button", Object.assign({ disabled: patientChartLocked[0], onClick: () => {
                                        if (prescriptionType === "Medication") {
                                            bottomSheetDispatch({
                                                type: "show",
                                                snapPoint: 0,
                                                children: (_jsx(AddMedicalPrescriptionForm, { patientId: patientId, patientChartId: patientChartId, history: false, onSuccess: () => {
                                                        bottomSheetDispatch({ type: "hide" });
                                                        notifDispatch({
                                                            type: "show",
                                                            notifTitle: "Success",
                                                            notifSubTitle: "Prescription has been saved successfully",
                                                            variant: "success",
                                                        });
                                                        refetch();
                                                        favoriteMedicationsQuery.refetch();
                                                    }, onPrescribeAnother: onPrescribeAnother, onCancel: () => bottomSheetDispatch({ type: "hide" }), title: "Prescribe Medication" }, void 0)),
                                            });
                                        }
                                        else {
                                            bottomSheetDispatch({
                                                type: "show",
                                                snapPoint: 0,
                                                children: (_jsx(AddEyeGlassPrescriptionForm, { patientId: patientId, patientChartId: patientChartId, refraction: data === null || data === void 0 ? void 0 : data.refraction, onSuccess: () => {
                                                        bottomSheetDispatch({ type: "hide" });
                                                        notifDispatch({
                                                            type: "show",
                                                            notifTitle: "Success",
                                                            notifSubTitle: "Prescription has been saved successfully",
                                                            variant: "success",
                                                        });
                                                        refetch();
                                                    }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                                            });
                                        }
                                    }, className: "border border-teal-600 text-teal-800 px-3 py-1 rounded-lg flex space-x-1 items-center" }, { children: [_jsx("div", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                                        _jsx("p", { children: "Add" }, void 0)] }), void 0) }), void 0),
                            prescriptionType === "Medication" && (_jsx(MedicationTable, { items: (_c = (_b = data === null || data === void 0 ? void 0 : data.medicationPrescriptionOrder) === null || _b === void 0 ? void 0 : _b.medicalPrescriptions) !== null && _c !== void 0 ? _c : [], onUpdate: (item, value) => {
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
                                    var _a;
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
                                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }), values: item, pharmacyIdValue: (_a = data === null || data === void 0 ? void 0 : data.medicationPrescriptionOrder) === null || _a === void 0 ? void 0 : _a.pharmacyId }, void 0)),
                                    });
                                }, onPrint: () => {
                                    if (appointmentId) {
                                        window.open(`${process.env.REACT_APP_SERVER_URL}/pdf_medical_prescription?appointmentId=${appointmentId}`);
                                    }
                                } }, void 0)),
                            prescriptionType === "Eyewear" && (_jsx(EyeGlassTable, { items: (_e = (_d = data === null || data === void 0 ? void 0 : data.eyewearPrescriptionOrder) === null || _d === void 0 ? void 0 : _d.eyewearPrescriptions) !== null && _e !== void 0 ? _e : [], onUpdate: (item, value) => {
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
                                    var _a;
                                    bottomSheetDispatch({
                                        type: "show",
                                        snapPoint: 0,
                                        children: (_jsx(UpdateEyewearPrescriptionForm, { onUpdateSuccess: () => {
                                                bottomSheetDispatch({ type: "hide" });
                                                notifDispatch({
                                                    type: "show",
                                                    notifTitle: "Success",
                                                    notifSubTitle: "Prescription has been updated successfully",
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
                                            }, onCancel: () => bottomSheetDispatch({ type: "hide" }), values: item, refraction: data === null || data === void 0 ? void 0 : data.refraction, eyewearShopIdValue: (_a = data === null || data === void 0 ? void 0 : data.eyewearPrescriptionOrder) === null || _a === void 0 ? void 0 : _a.eyewearShopId }, void 0)),
                                    });
                                }, onPrint: (item) => {
                                    if (appointmentId) {
                                        window.open(`${process.env.REACT_APP_SERVER_URL}/pdf_eyeglass_prescription?appointmentId=${appointmentId}`);
                                    }
                                } }, void 0))] }), void 0),
                    prescriptionType === "Medication" && (data === null || data === void 0 ? void 0 : data.medicationPrescriptionOrder) && (_jsx(MedicalPrescriptionPrint, { patient: data === null || data === void 0 ? void 0 : data.appointment.patient, medicalPrescriptionOrder: data === null || data === void 0 ? void 0 : data.medicationPrescriptionOrder, user: data === null || data === void 0 ? void 0 : data.user }, void 0)),
                    prescriptionType === "Eyewear" && (data === null || data === void 0 ? void 0 : data.refraction) &&
                        data.eyewearPrescriptionOrder && (_jsx(EyewearPrescriptionPrint, { patient: data === null || data === void 0 ? void 0 : data.appointment.patient, user: data.user, refraction: data.refraction, eyewearPrescriptionOrder: data === null || data === void 0 ? void 0 : data.eyewearPrescriptionOrder }, void 0))] }), void 0)] }), void 0));
};
