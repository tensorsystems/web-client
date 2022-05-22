import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { formatDate } from "../util";
import { useNotificationDispatch } from "../notification";
import { subMonths, subYears } from "date-fns/esm";
import { useHistory } from "react-router-dom";
import { PatientRegistrationLayout } from "../components/PatientRegistrationLayout";
import { PatientRegistrationDemographicForm } from "../components/PatientRegistrationDemographicForm";
import { PatientRegistrationContactInfoForm } from "../components/PatientRegistrationContactInfoForm";
import { PatientRegistrationEmergencyInfoForm } from "../components/PatientRegistrationEmergencyInfoForm";
import { PatientRegistrationDocumentsForm } from "../components/PatientRegistrationDocumentsForm";
import { AppointmentForm } from "../components/AppointmentForm";
import { useBottomSheetDispatch } from "../bottomsheet";
import { useEffect } from "react";
import { newPatientCache } from "../cache";
const SAVE_PATIENT = gql `
  mutation SavePatient($input: PatientInput!) {
    savePatient(input: $input) {
      id
      idNo
      firstName
      lastName
    }
  }
`;
const FIND_SIMILAR_PATIENTS = gql `
  query FindSimilarPatients($input: SimilarPatientsInput!) {
    findSimilarPatients(input: $input) {
      byName {
        id
        firstName
        lastName
        phoneNo
      }

      byPhone {
        id
        firstName
        lastName
        phoneNo
      }
    }
  }
`;
const NEW_PATIENT_CACHE = gql `
  query NewPatientCache {
    newPatientCache @client {
      firstName
      lastName
    }
  }
`;
export const NewPatientPage = ({ onAddPage }) => {
    var _a;
    const history = useHistory();
    const notifDispatch = useNotificationDispatch();
    const bottomSheetDispatch = useBottomSheetDispatch();
    const newPatientCacheQuery = useQuery(NEW_PATIENT_CACHE);
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            paperRecord: false,
        },
    });
    const values = watch();
    useEffect(() => {
        newPatientCache(values);
    }, [values]);
    useEffect(() => {
        var _a;
        const cache = (_a = newPatientCacheQuery.data) === null || _a === void 0 ? void 0 : _a.newPatientCache;
        if (cache) {
            reset(cache);
        }
    }, []);
    const [ageInput, setAgeInput] = useState("default");
    const [paperRecord, setPaperRecord] = useState("No");
    const [scheduleOnSave, setScheduleSave] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [paperRecordDocument, setPaperRecordDocument] = useState([]);
    const [similarPatientSearched, setSimilarPatientSearched] = useState(false);
    const findSimilarPatientsQuery = useLazyQuery(FIND_SIMILAR_PATIENTS);
    const [save, { loading }] = useMutation(SAVE_PATIENT, {
        onCompleted(data) {
            const patient = data.savePatient;
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: `Patient ${patient.firstName} ${patient.lastName} has been saved successfully`,
                variant: "success",
            });
            resetAll();
            if (scheduleOnSave) {
                bottomSheetDispatch({
                    type: "show",
                    snapPoint: 1000,
                    children: (_jsx(AppointmentForm, { patientId: patient === null || patient === void 0 ? void 0 : patient.id, onSuccess: () => { }, onCancel: () => {
                            bottomSheetDispatch({ type: "hide" });
                        } }, void 0)),
                });
            }
            else {
                const page = {
                    title: `Patient - ${patient === null || patient === void 0 ? void 0 : patient.firstName} ${patient === null || patient === void 0 ? void 0 : patient.lastName}`,
                    cancellable: true,
                    route: `/patients/${patient === null || patient === void 0 ? void 0 : patient.id}/appointments`,
                    icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0) }), void 0)),
                };
                onAddPage(page);
                history.replace(`/patients/${patient === null || patient === void 0 ? void 0 : patient.id}/appointments`);
            }
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
    const resetAll = () => {
        reset();
        setAgeInput("default");
        setPaperRecord("No");
        setDocuments([]);
        setPaperRecordDocument([]);
        setScheduleSave(false);
    };
    const handleDocumentsChange = (files) => {
        setDocuments(files);
    };
    const handlePaperDocumentChange = (files) => {
        setPaperRecordDocument(files);
    };
    const handleDocumentDelete = (index) => {
        setDocuments(documents.filter((_, i) => i !== index));
    };
    const handlePaperDocumentDelete = () => {
        setPaperRecordDocument([]);
    };
    const handlePatientClick = (id, firstName, lastName) => {
        const page = {
            title: `Patient - ${firstName} ${lastName}`,
            cancellable: true,
            route: `/patients/${id}/appointments`,
            icon: (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0) }), void 0)),
        };
        onAddPage(page);
        history.replace(`/patients/${id}/appointments`);
    };
    const onSubmit = (data) => {
        let dateOfBirth;
        if (ageInput === "default") {
            dateOfBirth = formatDate(data.dateOfBirth);
        }
        else if (ageInput === "manual") {
            dateOfBirth = subYears(new Date(), data.dateOfBirth);
        }
        else if (ageInput === "months") {
            dateOfBirth = subMonths(new Date(), data.dateOfBirth);
        }
        data.dateOfBirth = dateOfBirth;
        if (paperRecord === "Yes") {
            data.paperRecord = true;
        }
        else {
            data.paperRecord = false;
        }
        data.credit = data.credit === "true";
        if (paperRecordDocument.length > 0 &&
            paperRecordDocument[0].fileObject !== undefined) {
            const file = {
                file: paperRecordDocument[0].fileObject,
                name: paperRecordDocument[0].name,
            };
            data.paperRecordDocument = file;
        }
        if (documents.length > 0) {
            const files = documents
                .filter((e) => e.fileObject !== undefined)
                .map((e) => ({
                file: e.fileObject,
                name: e.name,
            }));
            data.documents = files;
        }
        const firstName = data.firstName.charAt(0).toUpperCase() +
            data.firstName.slice(1).toLowerCase();
        const lastName = data.lastName.charAt(0).toUpperCase() +
            data.lastName.slice(1).toLowerCase();
        data.firstName = firstName;
        data.lastName = lastName;
        save({ variables: { input: data } });
    };
    const similarPatients = (_a = findSimilarPatientsQuery[1].data) === null || _a === void 0 ? void 0 : _a.findSimilarPatients;
    return (_jsx("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: _jsx(PatientRegistrationLayout, { update: false, loading: loading, paperRecord: paperRecord === "Yes", migrationAlert: paperRecord === "Yes" && paperRecordDocument.length > 0
                ? "Paper record will be automatically be migrated to the system"
                : undefined, similarPatients: similarPatients, onPatientClick: handlePatientClick, demographic: _jsx(PatientRegistrationDemographicForm, { values: values, register: register, ageInput: ageInput, setAgeInput: setAgeInput }, void 0), contactInfo: _jsx(PatientRegistrationContactInfoForm, { register: register }, void 0), emergencyInfo: _jsx(PatientRegistrationEmergencyInfoForm, { register: register }, void 0), documents: _jsx(PatientRegistrationDocumentsForm, { register: register, paperRecord: paperRecord, setPaperRecord: setPaperRecord, documents: documents, setDocuments: handleDocumentsChange, onDocumentDelete: handleDocumentDelete, paperRecordDocument: paperRecordDocument, setPaperRecordDocument: handlePaperDocumentChange, onPaperRecordDocumentDelete: handlePaperDocumentDelete }, void 0) }, void 0) }), void 0));
};
