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

import React from "react";
import { useNotificationDispatch } from "@tensoremr/notification";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Maybe,
  MutationUpdatePatientEncounterLimitArgs,
  PatientEncounterLimit,
  PatientEncounterLimitUpdateInput,
  Query,
  QueryGetByUserTypeTitleArgs,
} from "../models/models";

const UPDATE_PATIENT_ENCOUNTER_LIMIT = gql`
  mutation UpdatePatientEncounterLimit(
    $input: PatientEncounterLimitUpdateInput!
  ) {
    updatePatientEncounterLimit(input: $input) {
      id
    }
  }
`;

const GET_PROVIDERS = gql`
  query Providers($input: String!) {
    getByUserTypeTitle(input: $input) {
      id
      firstName
      lastName
    }
  }
`;

interface Props {
  values: Maybe<PatientEncounterLimit>;
  onSuccess: () => void;
  onCancel: () => void;
}

export const UpdatePatientEncounterLimitForm: React.FC<Props> = ({
  values,
  onSuccess,
  onCancel,
}) => {
  const notifDispatch = useNotificationDispatch();
  const { register, handleSubmit, reset } =
    useForm<PatientEncounterLimitUpdateInput>({
      defaultValues: {
        ...values,
      },
    });

  const { data } = useQuery<Query, QueryGetByUserTypeTitleArgs>(GET_PROVIDERS, {
    variables: {
      input: "Physician",
    },
  });

  const [save, { error }] = useMutation<
    any,
    MutationUpdatePatientEncounterLimitArgs
  >(UPDATE_PATIENT_ENCOUNTER_LIMIT, {
    onCompleted(data) {
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

  const onSubmit = (data: PatientEncounterLimitUpdateInput) => {
    if (values?.id) {
      data.id = values.id;
      save({
        variables: {
          input: data,
        },
      });
    }
  };

  return (
    <div className="container mx-auto flex justify-center pt-4 pb-6">
      <div className="w-1/2">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-2xl font-extrabold tracking-wider">
            Update Patient Encounter Limit
          </p>
          <div className="mt-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              Physician
            </label>
            <select
              required
              name="userId"
              ref={register}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {data?.getByUserTypeTitle.map((e) => (
                <option
                  key={e?.id}
                  value={e?.id}
                >{`Dr. ${e?.firstName} ${e?.lastName}`}</option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex space-x-4 w-full items-stretch">
            <div className="flex-1">
              <label
                htmlFor="dailyLimit"
                className="block text-sm font-medium text-gray-700"
              >
                Daily Limit
              </label>
              <input
                required
                type="number"
                name="dailyLimit"
                ref={register}
                className="p-1 pl-4 w-full sm:text-md border-gray-300 border rounded-md"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="overbook"
                className="block text-sm font-medium text-gray-700"
              >
                Overbook
              </label>
              <input
                required
                type="number"
                name="overbook"
                ref={register}
                className="p-1 pl-4 w-full sm:text-md border-gray-300 border rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            {error && <p className="text-red-600">Error: {error.message}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none"
          >
            <span className="ml-2">Update</span>
          </button>
        </form>
      </div>
    </div>
  );
};
