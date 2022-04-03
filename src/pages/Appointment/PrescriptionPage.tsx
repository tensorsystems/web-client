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

import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { AddMedicalPrescriptionForm } from "../../components/AddMedicalPrescriptionForm";
import { UpdateMedicalPrescriptionForm } from "../../components/UpdateMedicationForm";
import { useNotificationDispatch } from "../../notification";
import { FavoriteMedicationList } from "../../components/FavoriteMedicationList";
import { MedicationTable } from "../../components/MedicationTable";
import {
  EyewearPrescription,
  MedicalPrescription,
  MutationUpdateMedicationPrescriptionArgs,
  PaginationInput,
  Query,
  QueryUserFavoriteMedicationsArgs,
} from "../../models/models";
import { AddEyeGlassPrescriptionForm } from "../../components/AddEyeGlassPrescriptionForm";
import { EyeGlassTable } from "../../components/EyeGlassTable";
import { UpdateEyewearPrescriptionForm } from "../../components/UpdateEyeGlassPrescriptionForm";
import { AppointmentContext } from "../../_context/AppointmentContext";
import { useReactToPrint } from "react-to-print";
import {
  parseJwt,
} from "../../util";
import MedicalPrescriptionPrint from "../../components/MedicalPrescriptionPrint";
import EyewearPrescriptionPrint from "../../components/EyewearPrescriptionPrint";

const GET_DATA = gql`
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

const FAVORITE_MEDICATIONS = gql`
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

const UPDATE_MEDICATION_PRESCRIPTION = gql`
  mutation UpdateMedicationPrescription(
    $input: MedicalPrescriptionUpdateInput!
  ) {
    updateMedicationPrescription(input: $input) {
      id
    }
  }
`;

interface Props {
  appointmentId: string | undefined;
  patientId: string | undefined;
  patientChartId: string;
  isEdit?: boolean;
}

export const PrescriptionPage: React.FC<Props> = ({
  patientChartId,
  appointmentId,
  patientId,
  isEdit = true,
}) => {
  const bottomSheetDispatch = useBottomSheetDispatch();
  const notifDispatch = useNotificationDispatch();
  const { patientChartLocked } = React.useContext<any>(AppointmentContext);
  const [showPrintButton, setShowPrintButton] = useState<boolean>(false);
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [prescriptionType, setPrescriptionType] = useState<
    "Medication" | "Eyewear"
  >("Medication");

  useEffect(() => {}, [prescriptionType]);

  const token = sessionStorage.getItem("accessToken");
  const claim = parseJwt(token);

  const { data, refetch } = useQuery<Query, any>(GET_DATA, {
    variables: {
      patientChartId: patientChartId,
      appointmentId: appointmentId,
      userId: claim.ID,
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [paginationInput, setPaginationInput] = useState<PaginationInput>({
    page: 1,
    size: 20,
  });

  const favoriteMedicationsQuery = useQuery<
    Query,
    QueryUserFavoriteMedicationsArgs
  >(FAVORITE_MEDICATIONS, {
    variables: { page: paginationInput, searchTerm },
  });

  useEffect(() => {
    favoriteMedicationsQuery.refetch();
  }, [paginationInput, searchTerm]);

  const handleNextClick = () => {
    const totalPages =
      favoriteMedicationsQuery.data?.userFavoriteMedications.pageInfo
        .totalPages ?? 0;

    if (totalPages > paginationInput.page) {
      setPaginationInput({
        ...paginationInput,
        page: paginationInput.page + 1,
      });
    }
  };

  const handlePreviousClick = () => {
    if (paginationInput.page > 1) {
      setPaginationInput({
        ...paginationInput,
        page: paginationInput.page - 1,
      });
    }
  };

  const [update] = useMutation<any, MutationUpdateMedicationPrescriptionArgs>(
    UPDATE_MEDICATION_PRESCRIPTION,
    {
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
    }
  );

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
      children: (
        <AddMedicalPrescriptionForm
          patientId={patientId}
          patientChartId={patientChartId}
          history={false}
          onSuccess={() => {
            bottomSheetDispatch({ type: "hide" });
            notifDispatch({
              type: "show",
              notifTitle: "Success",
              notifSubTitle: "Prescription has been saved successfully",
              variant: "success",
            });
            refetch();
            favoriteMedicationsQuery.refetch();
          }}
          onPrescribeAnother={onPrescribeAnother}
          onCancel={() => bottomSheetDispatch({ type: "hide" })}
          title={"Prescribe Medication"}
        />
      ),
    });
  };

  return (
    <div className="flex space-x-6">
      <div className="w-1/3" hidden={prescriptionType === "Eyewear"}>
        <FavoriteMedicationList
          userFavoriteMedications={
            favoriteMedicationsQuery.data?.userFavoriteMedications
          }
          refetch={() => favoriteMedicationsQuery.refetch()}
          handleNextClick={handleNextClick}
          handlePreviousClick={handlePreviousClick}
          setSearchTerm={setSearchTerm}
          onItemClick={(item) => {
            bottomSheetDispatch({
              type: "show",
              snapPoint: 0,
              children: (
                <AddMedicalPrescriptionForm
                  patientId={patientId}
                  patientChartId={patientChartId}
                  values={item}
                  history={false}
                  onSuccess={() => {
                    bottomSheetDispatch({ type: "hide" });
                    notifDispatch({
                      type: "show",
                      notifTitle: "Success",
                      notifSubTitle: "Medication has been saved successfully",
                      variant: "success",
                    });
                    refetch();
                    favoriteMedicationsQuery.refetch();
                  }}
                  onCancel={() => {
                    favoriteMedicationsQuery.refetch();
                    bottomSheetDispatch({ type: "hide" });
                  }}
                  onPrescribeAnother={() => {
                    favoriteMedicationsQuery.refetch();
                    onPrescribeAnother();
                  }}
                  title={"Prescribe Medication"}
                />
              ),
            });
          }}
        />
      </div>

      <div className="flex-1 ">
        <div className="bg-gray-50 rounded shadow-lg p-5">
          <select
            name="prescriptionType"
            value={prescriptionType}
            onChange={(evt) =>
              evt.target.value === "Medication"
                ? setPrescriptionType("Medication")
                : setPrescriptionType("Eyewear")
            }
            className="mt-1 text-2xl text-gray-600 font-bold bg-gray-50 border-none"
          >
            <option value={"Medication"}>Medication</option>
            <option value={"Eyewear"}>Eyewear</option>
          </select>

          <hr className="mt-4 mb-4" />

          <div className="flex justify-end">
            <button
              disabled={patientChartLocked[0]}
              onClick={() => {
                if (prescriptionType === "Medication") {
                  bottomSheetDispatch({
                    type: "show",
                    snapPoint: 0,
                    children: (
                      <AddMedicalPrescriptionForm
                        patientId={patientId}
                        patientChartId={patientChartId}
                        history={false}
                        onSuccess={() => {
                          bottomSheetDispatch({ type: "hide" });
                          notifDispatch({
                            type: "show",
                            notifTitle: "Success",
                            notifSubTitle:
                              "Prescription has been saved successfully",
                            variant: "success",
                          });
                          refetch();
                          favoriteMedicationsQuery.refetch();
                        }}
                        onPrescribeAnother={onPrescribeAnother}
                        onCancel={() => bottomSheetDispatch({ type: "hide" })}
                        title={"Prescribe Medication"}
                      />
                    ),
                  });
                } else {
                  bottomSheetDispatch({
                    type: "show",
                    snapPoint: 0,
                    children: (
                      <AddEyeGlassPrescriptionForm
                        patientId={patientId}
                        patientChartId={patientChartId}
                        refraction={data?.refraction}
                        onSuccess={() => {
                          bottomSheetDispatch({ type: "hide" });
                          notifDispatch({
                            type: "show",
                            notifTitle: "Success",
                            notifSubTitle:
                              "Prescription has been saved successfully",
                            variant: "success",
                          });

                          refetch();
                        }}
                        onCancel={() => bottomSheetDispatch({ type: "hide" })}
                      />
                    ),
                  });
                }
              }}
              className="border border-teal-600 text-teal-800 px-3 py-1 rounded-lg flex space-x-1 items-center"
            >
              <div className="material-icons">add</div>
              <p>Add</p>
            </button>
          </div>

          {prescriptionType === "Medication" && (
            <MedicationTable
              items={
                data?.medicationPrescriptionOrder?.medicalPrescriptions ?? []
              }
              onUpdate={(item: MedicalPrescription, value: string) => {
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
              }}
              onEdit={(item: MedicalPrescription) => {
                bottomSheetDispatch({
                  type: "show",
                  snapPoint: 0,
                  children: (
                    <UpdateMedicalPrescriptionForm
                      onUpdateSuccess={() => {
                        bottomSheetDispatch({ type: "hide" });

                        notifDispatch({
                          type: "show",
                          notifTitle: "Success",
                          notifSubTitle:
                            "Medication has been updated successfully",
                          variant: "success",
                        });

                        refetch();
                      }}
                      onDeleteSuccess={() => {
                        bottomSheetDispatch({ type: "hide" });

                        notifDispatch({
                          type: "show",
                          notifTitle: "Success",
                          notifSubTitle:
                            "Medication has been deleted successfully",
                          variant: "success",
                        });

                        refetch();
                      }}
                      onCancel={() => bottomSheetDispatch({ type: "hide" })}
                      values={item}
                      pharmacyIdValue={
                        data?.medicationPrescriptionOrder?.pharmacyId
                      }
                    />
                  ),
                });
              }}
              onPrint={() => {
                if (appointmentId) {
                  window.open(
                    `${window.__RUNTIME_CONFIG__.REACT_APP_SERVER_URL}/pdf_medical_prescription?appointmentId=${appointmentId}`
                  );
                }
              }}
            />
          )}

          {prescriptionType === "Eyewear" && (
            <EyeGlassTable
              items={data?.eyewearPrescriptionOrder?.eyewearPrescriptions ?? []}
              onUpdate={(item: EyewearPrescription, value: string) => {
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
              }}
              onEdit={(item: EyewearPrescription) => {
                bottomSheetDispatch({
                  type: "show",
                  snapPoint: 0,
                  children: (
                    <UpdateEyewearPrescriptionForm
                      onUpdateSuccess={() => {
                        bottomSheetDispatch({ type: "hide" });

                        notifDispatch({
                          type: "show",
                          notifTitle: "Success",
                          notifSubTitle:
                            "Prescription has been updated successfully",
                          variant: "success",
                        });

                        refetch();
                      }}
                      onDeleteSuccess={() => {
                        bottomSheetDispatch({ type: "hide" });

                        notifDispatch({
                          type: "show",
                          notifTitle: "Success",
                          notifSubTitle:
                            "Medication has been deleted successfully",
                          variant: "success",
                        });

                        refetch();
                      }}
                      onCancel={() => bottomSheetDispatch({ type: "hide" })}
                      values={item}
                      refraction={data?.refraction}
                      eyewearShopIdValue={
                        data?.eyewearPrescriptionOrder?.eyewearShopId
                      }
                    />
                  ),
                });
              }}
              onPrint={(item: EyewearPrescription) => {
                if (appointmentId) {
                  window.open(
                    `${window.__RUNTIME_CONFIG__.REACT_APP_SERVER_URL}/pdf_eyeglass_prescription?appointmentId=${appointmentId}`
                  );
                }
              }}
            />
          )}
        </div>
        {prescriptionType === "Medication" &&
          data?.medicationPrescriptionOrder && (
            <MedicalPrescriptionPrint
              patient={data?.appointment.patient}
              medicalPrescriptionOrder={data?.medicationPrescriptionOrder}
              user={data?.user}
            />
          )}

        {prescriptionType === "Eyewear" &&
          data?.refraction &&
          data.eyewearPrescriptionOrder && (
            <EyewearPrescriptionPrint
              patient={data?.appointment.patient}
              user={data.user}
              refraction={data.refraction}
              eyewearPrescriptionOrder={data?.eyewearPrescriptionOrder}
            />
          )}
      </div>
    </div>
  );
};
