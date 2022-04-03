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
import { useForm } from "react-hook-form";
import { MutationUpdatePatientChartArgs, PatientChart } from "../models/models";
import { AppointmentContext } from "../_context/AppointmentContext";
import { useNotificationDispatch } from "../notification";
import { gql, useMutation } from "@apollo/client";
import useExitPrompt from "../useExitPrompt";
import { AUTO_SAVE_INTERVAL } from "..";
import { Prompt } from "react-router-dom";
import _ from "lodash";

const UPDATE_PATIENT_CHART = gql`
  mutation SavePatientChart($input: PatientChartUpdateInput!) {
    updatePatientChart(input: $input) {
      id
    }
  }
`;

interface Props {
  patientChartId: string | undefined;
  values: PatientChart | undefined;
}

export const OtherVitalsForm: React.FC<Props> = ({
  patientChartId,
  values,
}) => {
  const notifDispatch = useNotificationDispatch();
  const [timer, setTimer] = useState<any>(null);
  const [modified, setModified] = useState<boolean>(false);
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  const { register, reset, getValues } = useForm<PatientChart>({
    defaultValues: {
      id: patientChartId,
    },
  });

  const { patientChartLocked } = React.useContext<any>(AppointmentContext);

  useEffect(() => {
    if (values !== undefined) {
      reset(values);
    }
  }, [values]);

  const [updatePatientChart] = useMutation<any, MutationUpdatePatientChartArgs>(
    UPDATE_PATIENT_CHART,
    {
      onCompleted() {
        setModified(false);
        setShowExitPrompt(false);
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

  const handleChanges = () => {
    setModified(true);
    setShowExitPrompt(true);
    clearTimeout(timer);

    const data = getValues();
    const isEmpty = _.values(data).every((v) => _.isEmpty(v));

    setTimer(
      setTimeout(() => {
        if (patientChartId !== undefined && !isEmpty) {
          const input = {
            ...data,
            id: patientChartId
          }

          updatePatientChart({
            variables: {
              input,
            },
          });
        }
      }, AUTO_SAVE_INTERVAL)
    );
  };

  return (
    <div className="grid grid-cols-5 justify-items-stretch">
      <Prompt
        when={modified}
        message="This page has unsaved data. Please click cancel and try again"
      />

      <div className="col-span-1 justify-self-center">
        <p className="text-gray-600 tracking-wide">Blood Pressure</p>
      </div>
      <div className="col-span-4">
        <input
          type="text"
          name="bloodPressure"
          ref={register}
          disabled={patientChartLocked[0]}
          className="p-1 pl-4 sm:text-md w-full border-gray-300 border rounded-md"
          onChange={handleChanges}
        />
      </div>
    </div>
  );
};
