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

import React, { useEffect, useState } from "react";

import { useNotificationDispatch } from "../../notification";
import { useForm } from "react-hook-form";
import { formatDate } from "../../util";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { format, getDay, parseISO } from "date-fns";

import {
  AppointmentInput,
  AppointmentUpdateInput,
  MutationNewAppointmentArgs,
  PaginationInput,
  Query,
  QueryPatientArgs,
  QueryPatientEncounterLimitByUserArgs,
  QueryPayForConsultationArgs,
  QuerySearchAppointmentsArgs,
} from "../../models/models";
import classnames from "classnames";
import _ from "lodash";
import { SHOULD_PAY_FOR_CONSULTATION } from "../../api";

export const APPOINTMENT_LOOKUPS = gql`
  query AppointmentLookups(
    $page: PaginationInput!
    $userTypeTitle: String!
  ) {
    rooms(page: $page) {
      totalCount
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        totalPages
      }
    }

    visitTypes(page: $page) {
      totalCount
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        totalPages
      }
    }

    consultationBillings {
      id
      item
      code
      price
      credit
      remark
    }

    appointmentStatuses(page: $page) {
      totalCount
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        totalPages
      }
    }

    getByUserTypeTitle(input: $userTypeTitle) {
      id
      firstName
      lastName
    }
  }
`;


const GET_APPOINTMENT = gql`
  query GetAppointment($id: ID!) {
    appointment(id: $id) {
      id
      checkInTime
      checkedInTime
      credit
      userId
      visitType {
        id
      }
      room {
        id
      }
    }
  }
`;

const SEARCH_APPOINTMENTS = gql`
  query SearchAppointments(
    $input: AppointmentSearchInput!
    $page: PaginationInput!
  ) {
    searchAppointments(input: $input, page: $page) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          providerName
          checkInTime
          checkedInTime
          checkedOutTime
          patient {
            id
            firstName
            lastName
            phoneNo
          }
          room {
            id
            title
          }
          visitType {
            id
            title
          }
          appointmentStatus {
            id
            title
          }
        }
      }
    }
  }
`;

export const SAVE_APPOINTMENT = gql`
  mutation SaveAppointment($input: AppointmentInput!) {
    newAppointment(input: $input) {
      id
    }
  }
`;

const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

const GET_PATIENT_ENCOUNTER_LIMIT = gql`
  query PatientEncounterLimit($userId: ID!) {
    patientEncounterLimitByUser(userId: $userId) {
      id
      userId
      mondayLimit
      tuesdayLimit
      wednesdayLimit
      thursdayLimit
      fridayLimit
      saturdayLimit
      sundayLimit
      overbook
    }
  }
`;

const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment($input: AppointmentUpdateInput!) {
    updateAppointment(input: $input) {
      id
    }
  }
`;

interface AppointmentFormProps {
  patientId: string;
  updateId?: string;
  defaultValues?: AppointmentInput;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  defaultValues,
  patientId,
  updateId,
  onSuccess,
  onCancel,
}) => {
  const [paginationInput] = useState<PaginationInput>({
    page: 1,
    size: 1000,
  });

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<AppointmentInput>({
      defaultValues: defaultValues,
    });

  const [dailyLimit, setDailyLimit] = useState<number>(-1);

  const appointmentInput = watch();

  const bottomSheetDispatch = useBottomSheetDispatch();
  const notifDispatch = useNotificationDispatch();

  const [shouldPayForConsultation, setShouldPayForConsultation] =
    useState<boolean>(true);

  useEffect(() => {
    setDefaultOrganizationDetails();
  }, []);

  const setDefaultOrganizationDetails = () => {
    const organizationDetailsSession = sessionStorage.getItem(
      "organizationDetails"
    );
    if (organizationDetailsSession) {
      const organizationDetails = JSON.parse(organizationDetailsSession);
      if (organizationDetails.defaultMedicalDepartment === "General Medicine") {
        setValue("medicalDepartment", "General Medicine");
      } else if (
        organizationDetails.defaultMedicalDepartment === "Ophthalmology"
      ) {
        setValue("medicalDepartment", "Ophthalmology");
      } else {
        setValue("medicalDepartment", "General Medicine");
      }
    }
  };

  const [save, result] = useMutation<any, MutationNewAppointmentArgs>(
    SAVE_APPOINTMENT,
    {
      onCompleted(data) {
        notifDispatch({
          type: "show",
          notifTitle: "Success",
          notifSubTitle: `${patientQuery.data?.patient.firstName} ${patientQuery.data?.patient.lastName} has been scheduled successfully`,
          variant: "success",
        });
        bottomSheetDispatch({ type: "hide" });
        onSuccess();
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

  const updateMutation = useMutation<any, any>(UPDATE_APPOINTMENT, {
    onCompleted(data) {
      notifDispatch({
        type: "show",
        notifTitle: "Success",
        notifSubTitle: `${patientQuery.data?.patient.firstName} ${patientQuery.data?.patient.lastName} has been scheduled successfully`,
        variant: "success",
      });
      bottomSheetDispatch({ type: "hide" });
      onSuccess();
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

  const lookupQuery = useQuery<Query, any>(APPOINTMENT_LOOKUPS, {
    variables: {
      page: paginationInput,
      userTypeTitle: "Physician",
      patientId: patientId,
    },
  });

  const shouldPayForConsultationQuery = useLazyQuery<
    Query,
    QueryPayForConsultationArgs
  >(SHOULD_PAY_FOR_CONSULTATION, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (appointmentInput.checkInTime) {
      shouldPayForConsultationQuery[0]({
        variables: {
          patientId,
          date: new Date(appointmentInput.checkInTime),
        },
      });
    }
  }, [appointmentInput.checkInTime]);


  useEffect(() => {
    if (shouldPayForConsultationQuery[1].called) {
      if (shouldPayForConsultationQuery[1].data?.payForConsultation) {
        setShouldPayForConsultation(true);
      } else {
        setShouldPayForConsultation(false);
      }
    }
  }, [shouldPayForConsultationQuery[1].data?.payForConsultation]);

  const patientQuery = useQuery<Query, QueryPatientArgs>(GET_PATIENT, {
    variables: { id: patientId },
  });

  const patientEncounterLimitQuery = useLazyQuery<
    Query,
    QueryPatientEncounterLimitByUserArgs
  >(GET_PATIENT_ENCOUNTER_LIMIT);

  const patientEncounterLimit =
    patientEncounterLimitQuery[1].data?.patientEncounterLimitByUser;

  const providerAppointmentsQuery = useLazyQuery<
    Query,
    QuerySearchAppointmentsArgs
  >(SEARCH_APPOINTMENTS);

  useEffect(() => {
    if (appointmentInput.userId && appointmentInput.checkInTime) {
      providerAppointmentsQuery[0]({
        variables: {
          page: { page: 0, size: 100 },
          input: {
            userId: appointmentInput.userId,
            checkInTime: new Date(appointmentInput.checkInTime),
          },
        },
      });

      patientEncounterLimitQuery[0]({
        variables: {
          userId: appointmentInput.userId,
        },
      });
    }
  }, [appointmentInput.userId, appointmentInput.checkInTime]);

  const appointmentQuery = useLazyQuery<Query, any>(GET_APPOINTMENT, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (updateId !== undefined) {
      appointmentQuery[0]({
        variables: { id: updateId },
      }).then((result) => {
        const appointment = result.data?.appointment;
        if (appointment) {
          reset({
            userId: appointment.userId,
            roomId: appointment.room.id.toString(),
            visitTypeId: appointment.visitType.id.toString(),
            checkInTime: format(
              parseISO(appointment.checkInTime),
              "yyyy-MM-dd'T'HH:mm"
            ),
          });

          setDefaultOrganizationDetails();
        }
      });
    }
  }, [updateId]);

  useEffect(() => {
    if (appointmentInput.checkInTime && patientEncounterLimit) {
      const checkInTime = parseISO(appointmentInput.checkInTime);

      const day = getDay(checkInTime);
      switch (day) {
        case 0:
          setDailyLimit(patientEncounterLimit.sundayLimit);
          break;
        case 1:
          setDailyLimit(patientEncounterLimit.mondayLimit);
          break;
        case 2:
          setDailyLimit(patientEncounterLimit.tuesdayLimit);
          break;
        case 3:
          setDailyLimit(patientEncounterLimit.wednesdayLimit);
          break;
        case 4:
          setDailyLimit(patientEncounterLimit.thursdayLimit);
          break;
        case 5:
          setDailyLimit(patientEncounterLimit.fridayLimit);
          break;
        case 6:
          setDailyLimit(patientEncounterLimit.saturdayLimit);
          break;
      }
    }
  }, [appointmentInput.checkInTime, patientEncounterLimit]);

  const handleCheckInTimeChange = () => {
    if (updateId !== undefined) {
      appointmentQuery[1].refetch();
    }
  };

  const onSubmit = (input: any) => {
    input.patientId = patientQuery.data?.patient.id;
    input.checkInTime = formatDate(input.checkInTime);
    input.credit = false;
    input.emergency = input.emergency === "true";

    if (updateId !== undefined) {
      const updateInput = input as AppointmentUpdateInput;
      updateInput.id = updateId;

      updateMutation[0]({
        variables: { input: updateInput },
      });
    } else {
      save({ variables: { input: input as AppointmentInput } });
    }
  };

  const providerAppointments =
    providerAppointmentsQuery[1].data?.searchAppointments;
  const scheduledToday = providerAppointments?.totalCount ?? 0;
  const overbook = patientEncounterLimit?.overbook ?? 0;

  const bookingLeft = dailyLimit - scheduledToday;
  const overbooked =
    dailyLimit < scheduledToday && scheduledToday < dailyLimit + overbook;
  const fullyBooked = scheduledToday >= dailyLimit + overbook;

  const isCheckedIn = !_.isEmpty(
    appointmentQuery[1].data?.appointment.checkedInTime
  );

  const showProviderStats =
    appointmentInput.userId !== undefined &&
    appointmentInput.userId.length > 0 &&
    appointmentInput.checkInTime !== undefined &&
    appointmentInput.checkInTime.length > 0;

  return (
    <div className="container mx-auto w-1/2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="float-right">
          <button onClick={onCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-xl font-extrabold text-gray-800">
          {`Scheduling ${patientQuery.data?.patient.firstName} ${patientQuery.data?.patient.lastName}`}
        </p>

        <p className="text-gray-500">{patientQuery.data?.patient.id}</p>

        <div className="mt-8">
          <div className="mt-4">
            <label
              htmlFor="emergency"
              className="block text-sm font-medium text-gray-700"
            >
              Emergency
            </label>
            <select
              required
              id="emergency"
              name="emergency"
              ref={register({ required: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="checkInTime"
              className="block text-sm font-medium text-gray-700"
            >
              Check-In time
            </label>
            <input
              required
              type="datetime-local"
              name="checkInTime"
              id="checkInTime"
              ref={register({ required: true })}
              onChange={() => handleCheckInTimeChange()}
              className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="provider"
              className="block text-sm font-medium text-gray-700"
            >
              Provider
            </label>
            <select
              id="userId"
              name="userId"
              required
              ref={register({ required: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={undefined}></option>
              {lookupQuery.data?.getByUserTypeTitle.map((e) => (
                <option
                  key={e?.id}
                  value={e?.id}
                >{`Dr. ${e?.firstName} ${e?.lastName}`}</option>
              ))}
            </select>
          </div>

          {showProviderStats && (
            <div className="mt-2">
              {!overbooked && !fullyBooked && (
                <p className="text-green-600 font-semibold">
                  {`${scheduledToday} scheduled on this day, ${bookingLeft} left`}
                </p>
              )}

              {overbooked && !fullyBooked && (
                <p className="text-yellow-500 font-semibold">
                  {`Provider is overbooked with ${scheduledToday} patients`}
                </p>
              )}

              {fullyBooked && (
                <p className="text-red-500 font-semibold">
                  {`Provider is fully booked with ${scheduledToday} patients`}
                </p>
              )}
            </div>
          )}

          <div className="mt-4">
            <label
              htmlFor="roomId"
              className="block text-sm font-medium text-gray-700"
            >
              Room
            </label>
            <select
              id="roomId"
              name="roomId"
              required
              ref={register({ required: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {lookupQuery.data?.rooms.edges.map((e) => (
                <option key={e?.node.id} value={e?.node.id}>
                  {e?.node.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="visitTypeId"
              className="block text-sm font-medium text-gray-700"
            >
              Visit Type
            </label>
            <select
              id="visitTypeId"
              name="visitTypeId"
              required
              ref={register({ required: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {lookupQuery.data?.visitTypes.edges.map((e: any) => (
                <option key={e?.node.id} value={e?.node.id}>
                  {e?.node.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="medicalDepartment"
              className="block text-sm font-medium text-gray-700"
            >
              Medical Department
            </label>
            <select
              required
              id="medicalDepartment"
              name="medicalDepartment"
              ref={register({ required: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="General Medicine">General Medicine</option>
              <option value="Ophthalmology">Ophthalmology</option>
            </select>
          </div>

          {shouldPayForConsultation && (
            <div className="mt-4">
              <div>
                <label
                  htmlFor="billingId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Billing
                </label>
                <select
                  id="billingId"
                  name="billingId"
                  ref={register({ required: true })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {lookupQuery.data?.consultationBillings.map((e) => (
                    <option key={e?.id} value={e?.id}>
                      {`${e?.item} (${e?.code}) - ETB ${e?.price}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="invoiceNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Consultation Invoice
                </label>
                <input
                  id="invoiceNo"
                  name="invoiceNo"
                  ref={register({ required: true })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          )}

          {result.error && (
            <div className="mt-4">
              <p className="text-red-600">Error: {result?.error.message}</p>
            </div>
          )}

          <div className="py-3 mt-2 bg-gray-50 text-right">
            <button
              type="submit"
              disabled={fullyBooked || isCheckedIn}
              className={classnames(
                "inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none",
                {
                  "bg-gray-400": fullyBooked || isCheckedIn,
                  "bg-teal-600 hover:bg-teal-700": !fullyBooked && !isCheckedIn,
                }
              )}
            >
              <span className="ml-2">Schedule</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
