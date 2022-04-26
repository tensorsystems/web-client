/*
  Copyright 2021 Kidus Tiliksew

  This file is part of Tensor EMR.

  Tensor EMR is free software: you can redistribute it and/or modify
  it under the terms of the version 2 of GNU General Public License as published by
  the Free Software Foundation.

  Tensor EMR is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { formatDate } from "../util";
import { useNotificationDispatch } from "../notification";
import {
  PatientInput,
  MutationSavePatientArgs,
  FileUpload,
  Query,
  QueryFindSimilarPatientsArgs,
} from "../models/models";
import { subMonths, subYears } from "date-fns/esm";
import { FileUploader } from "../components/FileUploaderComponent";
import { Page } from "../models/page";
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

const SAVE_PATIENT = gql`
  mutation SavePatient($input: PatientInput!) {
    savePatient(input: $input) {
      id
      idNo
      firstName
      lastName
    }
  }
`;

const FIND_SIMILAR_PATIENTS = gql`
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

const NEW_PATIENT_CACHE = gql`
  query NewPatientCache {
    newPatientCache @client {
      firstName
      lastName
    }
  }
`;

interface Props {
  onAddPage: (page: Page) => void;
}

export const NewPatientPage: React.FC<Props> = ({ onAddPage }) => {
  const history = useHistory();
  const notifDispatch = useNotificationDispatch();
  const bottomSheetDispatch = useBottomSheetDispatch();

  const newPatientCacheQuery = useQuery(NEW_PATIENT_CACHE);

  const { register, handleSubmit, reset, watch } = useForm<PatientInput>({
    defaultValues: {
      paperRecord: false,
    },
  });

  const values = watch();

  useEffect(() => {
    newPatientCache(values);
  }, [values]);

  useEffect(() => {
    const cache = newPatientCacheQuery.data?.newPatientCache;
    if (cache) {
      reset(cache);
    }
  }, []);

  const [ageInput, setAgeInput] = useState<"default" | "manual" | "months">(
    "default"
  );

  const [paperRecord, setPaperRecord] = useState<"Yes" | "No">("No");
  const [scheduleOnSave, setScheduleSave] = useState<boolean>(false);

  const [documents, setDocuments] = useState<Array<FileUploader>>([]);
  const [paperRecordDocument, setPaperRecordDocument] = useState<
    Array<FileUploader>
  >([]);

  const [similarPatientSearched, setSimilarPatientSearched] =
    useState<boolean>(false);

  const findSimilarPatientsQuery = useLazyQuery<
    Query,
    QueryFindSimilarPatientsArgs
  >(FIND_SIMILAR_PATIENTS);

  const [save, { loading }] = useMutation<any, MutationSavePatientArgs>(
    SAVE_PATIENT,
    {
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
            children: (
              <AppointmentForm
                patientId={patient?.id}
                onSuccess={() => {}}
                onCancel={() => {
                  bottomSheetDispatch({ type: "hide" });
                }}
              />
            ),
          });
        } else {
          const page: Page = {
            title: `Patient - ${patient?.firstName} ${patient?.lastName}`,
            cancellable: true,
            route: `/patients/${patient?.id}/appointments`,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            ),
          };

          onAddPage(page);
          history.replace(`/patients/${patient?.id}/appointments`);
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
    }
  );

  const resetAll = () => {
    reset();
    setAgeInput("default");
    setPaperRecord("No");
    setDocuments([]);
    setPaperRecordDocument([]);
    setScheduleSave(false);
  };

  const handleDocumentsChange = (files: Array<FileUploader>) => {
    setDocuments(files);
  };

  const handlePaperDocumentChange = (files: Array<FileUploader>) => {
    setPaperRecordDocument(files);
  };

  const handleDocumentDelete = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handlePaperDocumentDelete = () => {
    setPaperRecordDocument([]);
  };

  const handlePatientClick = (
    id: string,
    firstName: string,
    lastName: string
  ) => {
    const page: Page = {
      title: `Patient - ${firstName} ${lastName}`,
      cancellable: true,
      route: `/patients/${id}/appointments`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    };

    onAddPage(page);
    history.replace(`/patients/${id}/appointments`);
  };

  const onSubmit = (data: any) => {
    // if (!similarPatientSearched) {
    //   findSimilarPatientsQuery[0]({
    //     variables: {
    //       input: {
    //         firstName: data.firstName,
    //         lastName: data.lastName,
    //         phoneNo: data.phoneNo,
    //       },
    //     },
    //   })
    //     .then((result) => {
    //       console.log("Data", result);
    //       const similarPatients = result.data?.findSimilarPatients;

    //       if(similarPatients?.byName.length === 0 && similarPatients.byPhone.length === 0) {
    //         setSimilarPatientSearched(true);
    //         handleSubmit(onSubmit)();
    //       }

    //       setSimilarPatientSearched(true);
    //     })
    //     .catch((error) => {
    //       notifDispatch({
    //         type: "show",
    //         notifTitle: "Error",
    //         notifSubTitle: error.message,
    //         variant: "failure",
    //       });
    //       setSimilarPatientSearched(true);
    //     });
    //   return;
    // }

    let dateOfBirth;
    if (ageInput === "default") {
      dateOfBirth = formatDate(data.dateOfBirth);
    } else if (ageInput === "manual") {
      dateOfBirth = subYears(new Date(), data.dateOfBirth);
    } else if (ageInput === "months") {
      dateOfBirth = subMonths(new Date(), data.dateOfBirth);
    }
    data.dateOfBirth = dateOfBirth;

    if (paperRecord === "Yes") {
      data.paperRecord = true;
    } else {
      data.paperRecord = false;
    }

    data.credit = data.credit === "true";

    if (
      paperRecordDocument.length > 0 &&
      paperRecordDocument[0].fileObject !== undefined
    ) {
      const file: FileUpload = {
        file: paperRecordDocument[0].fileObject,
        name: paperRecordDocument[0].name,
      };

      data.paperRecordDocument = file;
    }

    if (documents.length > 0) {
      const files: Array<FileUpload> = documents
        .filter((e) => e.fileObject !== undefined)
        .map((e) => ({
          file: e.fileObject,
          name: e.name,
        }));

      data.documents = files;
    }

    const firstName =
      data.firstName.charAt(0).toUpperCase() +
      data.firstName.slice(1).toLowerCase();

    const lastName =
      data.lastName.charAt(0).toUpperCase() +
      data.lastName.slice(1).toLowerCase();

    data.firstName = firstName;
    data.lastName = lastName;

    save({ variables: { input: data } });
  };

  const similarPatients = findSimilarPatientsQuery[1].data?.findSimilarPatients;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PatientRegistrationLayout
        update={false}
        loading={loading}
        paperRecord={paperRecord === "Yes"}
        migrationAlert={
          paperRecord === "Yes" && paperRecordDocument.length > 0
            ? "Paper record will be automatically be migrated to the system"
            : undefined
        }
        similarPatients={similarPatients}
        onPatientClick={handlePatientClick}
        demographic={
          <PatientRegistrationDemographicForm
            values={values}
            register={register}
            ageInput={ageInput}
            setAgeInput={setAgeInput}
          />
        }
        contactInfo={<PatientRegistrationContactInfoForm register={register} />}
        emergencyInfo={
          <PatientRegistrationEmergencyInfoForm register={register} />
        }
        documents={
          <PatientRegistrationDocumentsForm
            register={register}
            paperRecord={paperRecord}
            setPaperRecord={setPaperRecord}
            documents={documents}
            setDocuments={handleDocumentsChange}
            onDocumentDelete={handleDocumentDelete}
            paperRecordDocument={paperRecordDocument}
            setPaperRecordDocument={handlePaperDocumentChange}
            onPaperRecordDocumentDelete={handlePaperDocumentDelete}
          />
        }
      />
    </form>
  );
};
