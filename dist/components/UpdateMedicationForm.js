import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import Select from "react-select";
const UPDATE_MEDICATION_PRESCRIPTION = gql `
  mutation UpdateMedicationPrescription(
    $input: MedicalPrescriptionUpdateInput!
  ) {
    updateMedicationPrescription(input: $input) {
      id
    }
  }
`;
const DELETE_MEDICAL_PRESCRIPTION = gql `
  mutation DeleteMedicalPrescription($id: ID!) {
    deleteMedicalPrescription(id: $id)
  }
`;
const PHARMACIES = gql `
  query Pharmacies($page: PaginationInput!) {
    pharmacies(page: $page) {
      totalCount
      edges {
        node {
          id
          title
          address
          region
          country
          phone
          inHouse
          active
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
export const UpdateMedicalPrescriptionForm = ({ values, pharmacyIdValue, onUpdateSuccess, onDeleteSuccess, onCancel }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: values,
    });
    const { data } = useQuery(PHARMACIES, {
        variables: {
            page: { page: 1, size: 1000 },
        },
    });
    const [selectedPharmacy, setSelectedPharmacy] = useState();
    useEffect(() => {
        var _a;
        if (pharmacyIdValue) {
            const pharmacy = (_a = data === null || data === void 0 ? void 0 : data.pharmacies.edges.find((e) => (e === null || e === void 0 ? void 0 : e.node.id) === pharmacyIdValue)) === null || _a === void 0 ? void 0 : _a.node;
            const value = {
                value: pharmacy === null || pharmacy === void 0 ? void 0 : pharmacy.id,
                label: `${pharmacy === null || pharmacy === void 0 ? void 0 : pharmacy.title} - ${pharmacy === null || pharmacy === void 0 ? void 0 : pharmacy.address}, ${pharmacy === null || pharmacy === void 0 ? void 0 : pharmacy.region}, ${pharmacy === null || pharmacy === void 0 ? void 0 : pharmacy.country} ${(pharmacy === null || pharmacy === void 0 ? void 0 : pharmacy.inHouse) ? "(In-House)" : ""}`,
            };
            setSelectedPharmacy(value);
        }
    }, [values, data]);
    const [update, { error }] = useMutation(UPDATE_MEDICATION_PRESCRIPTION, {
        onCompleted(data) {
            onUpdateSuccess();
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
    const [deleteMedicalPrescription] = useMutation(DELETE_MEDICAL_PRESCRIPTION, {
        onCompleted(data) {
            onDeleteSuccess();
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
    const onUpdateSubmit = (data) => {
        if ((values === null || values === void 0 ? void 0 : values.id) !== undefined) {
            data.id = values.id;
            data.generic = data.generic === "true";
            data.substitutionAllowed = data.substitutionAllowed === "true";
            data.pharmacyId = selectedPharmacy.value;
            update({ variables: { input: data } });
        }
    };
    const onDeleteSubmit = (data) => {
        if ((values === null || values === void 0 ? void 0 : values.id) !== undefined) {
            deleteMedicalPrescription({ variables: { id: values === null || values === void 0 ? void 0 : values.id } });
        }
    };
    const pharmacies = data === null || data === void 0 ? void 0 : data.pharmacies.edges.map((e) => ({
        value: e === null || e === void 0 ? void 0 : e.node.id,
        label: `${e === null || e === void 0 ? void 0 : e.node.title} - ${e === null || e === void 0 ? void 0 : e.node.address}, ${e === null || e === void 0 ? void 0 : e.node.region}, ${e === null || e === void 0 ? void 0 : e.node.country} ${(e === null || e === void 0 ? void 0 : e.node.inHouse) ? "(In-House)" : ""}`,
    }));
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Update Medical Prescription" }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx(Select, { placeholder: "Pharmacy", options: pharmacies, value: selectedPharmacy, onChange: (value) => {
                                    setSelectedPharmacy(value);
                                } }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("hr", {}, void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "medication", className: "block text-sm font-medium text-gray-700" }, { children: "Medication" }), void 0),
                                _jsx("input", { type: "text", name: "medication", id: "medication", ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "sig", className: "block text-sm font-medium text-gray-700" }, { children: "Sig" }), void 0),
                                _jsx("input", { type: "text", name: "sig", id: "sig", ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "refill", className: "block text-sm font-medium text-gray-700" }, { children: "Refill" }), void 0),
                                _jsx("select", Object.assign({ id: "refill", name: "refill", ref: register, className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [0, 1, 2, 3, 4, 5].map((e) => (_jsx("option", Object.assign({ value: e }, { children: e }), e))) }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "generic", className: "block text-sm font-medium text-gray-700" }, { children: "Generic" }), void 0),
                                _jsxs("select", Object.assign({ id: "generic", name: "generic", ref: register, className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "true" }, { children: "Yes" }), void 0),
                                        _jsx("option", Object.assign({ value: "false" }, { children: "No" }), void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "substitutionAllowed", className: "block text-sm font-medium text-gray-700" }, { children: "Substitution Allowed" }), void 0),
                                _jsxs("select", Object.assign({ id: "substitutionAllowed", name: "substitutionAllowed", ref: register, className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "false" }, { children: "No" }), void 0),
                                        _jsx("option", Object.assign({ value: "true" }, { children: "Yes" }), void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "directionToPatient", className: "block text-sm font-medium text-gray-700" }, { children: "Direction To Patient" }), void 0),
                                _jsx("textarea", { rows: 3, name: "directionToPatient", id: "directionToPatient", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("input", { type: "checkbox", id: "favorite", name: "favorite" }, void 0),
                                _jsx("label", Object.assign({ className: "ml-2 text-sm", htmlFor: "favorite" }, { children: "Save to favorites" }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "flex space-x-5" }, { children: [_jsx("button", Object.assign({ type: "button", onClick: handleSubmit(onUpdateSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0),
                                _jsx("button", Object.assign({ type: "submit", onClick: handleSubmit(onDeleteSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Delete" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0) }), void 0));
};
