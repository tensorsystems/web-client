import { jsx as _jsx } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { format, subMonths, subYears } from "date-fns";
import { parseISO } from "date-fns/esm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Component404 } from "../components/404/404";
import { PatientRegistrationContactInfoForm } from "../components/PatientRegistrationContactInfoForm";
import { PatientRegistrationDemographicForm } from "../components/PatientRegistrationDemographicForm";
import { PatientRegistrationDocumentsForm } from "../components/PatientRegistrationDocumentsForm";
import { PatientRegistrationEmergencyInfoForm } from "../components/PatientRegistrationEmergencyInfoForm";
import { PatientRegistrationLayout } from "../components/PatientRegistrationLayout";
import { useNotificationDispatch } from "../notification";
import { formatDate, getFileUrl } from "../util";
const PATIENT_DETAILS = gql `
  query PatientDetails($id: ID!) {
    patient(id: $id) {
      id
      firstName
      lastName
      dateOfBirth
      gender
      idNo
      occupation
      martialStatus
      memo
      phoneNo
      phoneNo2
      homePhone
      region
      credit
      creditCompany
      city
      subCity
      kebele
      woreda
      email
      houseNo
      emergencyContactRel
      emergencyContactName
      emergencyContactMemo
      emergencyContactPhone
      emergencyContactPhone2
      paperRecord
      cardNo
      paperRecordDocument {
        id
        contentType
        fileName
        extension
        hash
        size
      }
      documents {
        id
        contentType
        fileName
        extension
        hash
        size
      }
    }
  }
`;
const UPDATE_PATIENT = gql `
  mutation UpdatePatient($input: PatientUpdateInput!) {
    updatePatient(input: $input) {
      id
    }
  }
`;
function useRouterQuery() {
    return new URLSearchParams(useLocation().search);
}
export const UpdatePatientPage = ({ onAddPage }) => {
    const query = useRouterQuery();
    const queryPatientId = query.get("patientId");
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            paperRecord: false,
        },
    });
    const { data, refetch } = useQuery(PATIENT_DETAILS, {
        variables: {
            id: queryPatientId,
        },
    });
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (data === null || data === void 0 ? void 0 : data.patient) {
            const patient = data.patient;
            reset({
                firstName: patient.firstName,
                lastName: patient.lastName,
                dateOfBirth: format(parseISO(patient.dateOfBirth), "yyyy-MM-dd"),
                gender: patient.gender,
                idNo: patient.idNo,
                martialStatus: patient.martialStatus,
                occupation: patient.occupation,
                memo: patient.memo,
                phoneNo: patient.phoneNo,
                phoneNo2: patient.phoneNo2,
                homePhone: patient.homePhone,
                region: patient.region,
                woreda: patient.woreda,
                zone: patient.zone,
                kebele: patient.kebele,
                city: patient.city,
                subCity: patient.subCity,
                houseNo: patient.houseNo,
                email: patient.email,
                emergencyContactName: patient.emergencyContactName,
                emergencyContactRel: patient.emergencyContactRel,
                emergencyContactPhone: patient.emergencyContactPhone,
                emergencyContactPhone2: patient.emergencyContactPhone2,
                emergencyContactMemo: patient.emergencyContactMemo,
                paperRecord: patient.paperRecord,
                cardNo: patient.cardNo,
                credit: patient.credit,
                creditCompany: patient.creditCompany,
            });
            if (patient.paperRecordDocument) {
                const document = {
                    id: (_a = patient === null || patient === void 0 ? void 0 : patient.paperRecordDocument) === null || _a === void 0 ? void 0 : _a.id,
                    fileUrl: getFileUrl({
                        baseUrl: process.env.REACT_APP_SERVER_URL,
                        fileName: (_b = patient === null || patient === void 0 ? void 0 : patient.paperRecordDocument) === null || _b === void 0 ? void 0 : _b.fileName,
                        hash: (_c = patient === null || patient === void 0 ? void 0 : patient.paperRecordDocument) === null || _c === void 0 ? void 0 : _c.hash,
                        extension: (_d = patient === null || patient === void 0 ? void 0 : patient.paperRecordDocument) === null || _d === void 0 ? void 0 : _d.extension,
                    }),
                    name: (_f = (_e = patient === null || patient === void 0 ? void 0 : patient.paperRecordDocument) === null || _e === void 0 ? void 0 : _e.fileName) !== null && _f !== void 0 ? _f : "",
                    size: (_g = patient === null || patient === void 0 ? void 0 : patient.paperRecordDocument) === null || _g === void 0 ? void 0 : _g.size,
                    createdAt: (_h = patient === null || patient === void 0 ? void 0 : patient.paperRecordDocument) === null || _h === void 0 ? void 0 : _h.createdAt,
                    contentType: (_k = (_j = patient === null || patient === void 0 ? void 0 : patient.paperRecordDocument) === null || _j === void 0 ? void 0 : _j.contentType) !== null && _k !== void 0 ? _k : "",
                };
                setPaperRecordDocument([document]);
            }
            const otherDocuments = (_m = (_l = patient === null || patient === void 0 ? void 0 : patient.documents) === null || _l === void 0 ? void 0 : _l.map((e) => {
                var _a, _b;
                return ({
                    id: e === null || e === void 0 ? void 0 : e.id,
                    fileUrl: getFileUrl({
                        baseUrl: process.env.REACT_APP_SERVER_URL,
                        fileName: e === null || e === void 0 ? void 0 : e.fileName,
                        hash: e === null || e === void 0 ? void 0 : e.hash,
                        extension: e === null || e === void 0 ? void 0 : e.extension,
                    }),
                    name: (_a = e === null || e === void 0 ? void 0 : e.fileName) !== null && _a !== void 0 ? _a : "",
                    size: e === null || e === void 0 ? void 0 : e.size,
                    createdAt: e === null || e === void 0 ? void 0 : e.createdAt,
                    contentType: (_b = e === null || e === void 0 ? void 0 : e.contentType) !== null && _b !== void 0 ? _b : "",
                });
            })) !== null && _m !== void 0 ? _m : [];
            setPaperRecord(patient.paperRecord ? "Yes" : "No");
            setDocuments(otherDocuments);
        }
    }, [data, reset]);
    const [ageInput, setAgeInput] = useState("default");
    const [paperRecord, setPaperRecord] = useState("No");
    const [documents, setDocuments] = useState([]);
    const [paperRecordDocument, setPaperRecordDocument] = useState([]);
    const [update, { loading }] = useMutation(UPDATE_PATIENT, {
        onCompleted(data) {
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: `Patient updated has been saved successfully`,
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
        if (queryPatientId) {
            data.id = queryPatientId;
            update({ variables: { input: data } });
        }
    };
    if (queryPatientId === null || queryPatientId === undefined) {
        return (_jsx("div", { children: _jsx(Component404, {}, void 0) }, void 0));
    }
    const values = watch();
    return (_jsx("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: _jsx(PatientRegistrationLayout, { update: true, loading: loading, paperRecord: paperRecord === "Yes", similarPatients: undefined, demographic: _jsx(PatientRegistrationDemographicForm, { values: values, register: register, ageInput: ageInput, setAgeInput: setAgeInput }, void 0), contactInfo: _jsx(PatientRegistrationContactInfoForm, { register: register }, void 0), emergencyInfo: _jsx(PatientRegistrationEmergencyInfoForm, { register: register }, void 0), documents: _jsx(PatientRegistrationDocumentsForm, { register: register, paperRecord: paperRecord, setPaperRecord: setPaperRecord, documents: documents, setDocuments: handleDocumentsChange, onDocumentDelete: handleDocumentDelete, paperRecordDocument: paperRecordDocument, setPaperRecordDocument: handlePaperDocumentChange, onPaperRecordDocumentDelete: handlePaperDocumentDelete }, void 0) }, void 0) }), void 0));
};
