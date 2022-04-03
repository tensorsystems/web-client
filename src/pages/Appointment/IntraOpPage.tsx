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
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import { AUTO_SAVE_INTERVAL } from "../..";
import {
  MutationSaveSurgicalProcedureArgs,
  Query,
  QuerySurgicalProcedureArgs,
  SurgicalProcedureInput,
} from "../../models/models";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import { AppointmentContext } from "../../_context/AppointmentContext";

const SAVE_SURGICAL_PROCEDURE = gql`
  mutation SaveSurgicalProcedure($input: SurgicalProcedureInput!) {
    saveSurgicalProcedure(input: $input) {
      id
    }
  }
`;

const GET_INTRA_OP = gql`
  query GetIntraOp($patientChartId: ID!) {
    surgicalProcedure(patientChartId: $patientChartId) {
      id
      orderNote
      la
      ga
      retrobulbar
      peribulbar
      topical
      conjFlapLimbal
      conjFlapFornix
      sectionLimbal
      sectionCorneral
      sectionScleralTunnel
      capsulotomyLinear
      capsulotomyCanOpener
      capsulotomyCcc
      iolPlacementBag
      iolSulcus
      iolBagSulcus
      irodectpmyNone
      irodectpmyPl
      irodectpmySl
      sphincterectomy
      lensExtractionIcce
      lensExtractionEcce
      lensExtractionPhaco
      sutureNone
      sutureContinuous
      sutureInterrupted
      drapes
      ringer
      bss
      air
      hpmc
      healon
      pilo
      adrenalin
      antibiotic
      steroid
      suture80
      suture90
      suture100
      irrigatingSolution
      visco
      interacameral
      subconj
      suture
      silk
      nylon
      pcTear
      vitreousLoss
      descematesStrip
      endothelialDamage
      nucluesDrop
      iridoDialysis
      irisDamage
      retainedCortex
      hyphema
      complicationsOthers
      complicationsNote
      vitrectomy
      typeOfIolAc
      typeOfIolPc
      typeOfIol
      iolModel
      company
      aclol
      aclolPlanned
      aclolUnplanned
      unplanned
      additionalNotes
      specialInstructions
      treatment
      assistantName
      performOnEye

      surgicalProcedureType {
        id
        title
      }
    }
  }
`;

interface Props {
  patientChartId: string;
}

export const IntraOpPage: React.FC<Props> = ({ patientChartId }) => {
  const notifDispatch = useNotificationDispatch();
  const { register, getValues, reset, watch } = useForm<SurgicalProcedureInput>(
    {}
  );
  const { patientChartLocked } = React.useContext<any>(AppointmentContext);
  const [timer, setTimer] = useState<any>(null);
  const [modified, setModified] = useState<boolean>(false);
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  const { data, refetch } = useQuery<Query, QuerySurgicalProcedureArgs>(
    GET_INTRA_OP,
    {
      variables: {
        patientChartId,
      },
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const surgicalProcedure = data?.surgicalProcedure;
    if (surgicalProcedure !== undefined) {
      reset({
        assistantName: surgicalProcedure.assistantName,
        performOnEye: surgicalProcedure.performOnEye,
        la: surgicalProcedure.la,
        ga: surgicalProcedure.ga,
        retrobulbar: surgicalProcedure.retrobulbar,
        peribulbar: surgicalProcedure.peribulbar,
        topical: surgicalProcedure.topical,
        conjFlapLimbal: surgicalProcedure.conjFlapLimbal,
        conjFlapFornix: surgicalProcedure.conjFlapFornix,
        sectionLimbal: surgicalProcedure.sectionLimbal,
        sectionCorneral: surgicalProcedure.sectionCorneral,
        sectionScleralTunnel: surgicalProcedure.sectionScleralTunnel,
        capsulotomyLinear: surgicalProcedure.capsulotomyLinear,
        capsulotomyCanOpener: surgicalProcedure.capsulotomyCanOpener,
        capsulotomyCcc: surgicalProcedure.capsulotomyCcc,
        iolPlacementBag: surgicalProcedure.iolPlacementBag,
        iolSulcus: surgicalProcedure.iolSulcus,
        iolBagSulcus: surgicalProcedure.iolBagSulcus,
        irodectpmyNone: surgicalProcedure.irodectpmyNone,
        irodectpmyPl: surgicalProcedure.irodectpmyPl,
        irodectpmySl: surgicalProcedure.irodectpmySl,
        sphincterectomy: surgicalProcedure.sphincterectomy,
        lensExtractionIcce: surgicalProcedure.lensExtractionIcce,
        lensExtractionEcce: surgicalProcedure.lensExtractionEcce,
        lensExtractionPhaco: surgicalProcedure.lensExtractionPhaco,
        sutureNone: surgicalProcedure.sutureNone,
        sutureContinuous: surgicalProcedure.sutureContinuous,
        sutureInterrupted: surgicalProcedure.sutureInterrupted,
        drapes: surgicalProcedure.drapes,
        ringer: surgicalProcedure.ringer,
        bss: surgicalProcedure.bss,
        air: surgicalProcedure.air,
        hpmc: surgicalProcedure.hpmc,
        healon: surgicalProcedure.healon,
        pilo: surgicalProcedure.pilo,
        adrenalin: surgicalProcedure.adrenalin,
        antibiotic: surgicalProcedure.antibiotic,
        steroid: surgicalProcedure.steroid,
        suture80: surgicalProcedure.suture80,
        suture90: surgicalProcedure.suture90,
        suture100: surgicalProcedure.suture100,
        irrigatingSolution: surgicalProcedure.irrigatingSolution,
        visco: surgicalProcedure.visco,
        interacameral: surgicalProcedure.interacameral,
        subconj: surgicalProcedure.subconj,
        suture: surgicalProcedure.suture,
        silk: surgicalProcedure.silk,
        nylon: surgicalProcedure.nylon,
        pcTear: surgicalProcedure.pcTear,
        vitreousLoss: surgicalProcedure.vitreousLoss,
        descematesStrip: surgicalProcedure.descematesStrip,
        endothelialDamage: surgicalProcedure.endothelialDamage,
        nucluesDrop: surgicalProcedure.nucluesDrop,
        iridoDialysis: surgicalProcedure.iridoDialysis,
        irisDamage: surgicalProcedure.irisDamage,
        retainedCortex: surgicalProcedure.retainedCortex,
        hyphema: surgicalProcedure.hyphema,
        complicationsOthers: surgicalProcedure.complicationsOthers,
        complicationsNote: surgicalProcedure.complicationsNote,
        vitrectomy: surgicalProcedure.vitrectomy,
        typeOfIolAc: surgicalProcedure.typeOfIolAc,
        typeOfIolPc: surgicalProcedure.typeOfIolPc,
        typeOfIol: surgicalProcedure.typeOfIol,
        iolModel: surgicalProcedure.iolModel,
        company: surgicalProcedure.company,
        aclol: surgicalProcedure.aclol,
        aclolPlanned: surgicalProcedure.aclolPlanned,
        aclolUnplanned: surgicalProcedure.aclolUnplanned,
        unplanned: surgicalProcedure.unplanned,
        additionalNotes: surgicalProcedure.additionalNotes,
        specialInstructions: surgicalProcedure.specialInstructions,
        treatment: surgicalProcedure.treatment,
      });
    }
  }, [data?.surgicalProcedure]);

  const [save] = useMutation<any, MutationSaveSurgicalProcedureArgs>(
    SAVE_SURGICAL_PROCEDURE,
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
            patientChartId,
          };

          save({
            variables: {
              input,
            },
          });
        }
      }, AUTO_SAVE_INTERVAL)
    );
  };

  const values = watch();

  return (
    <div className="container mx-auto bg-gray-50 rounded shadow-lg p-5">
      <Prompt
        when={modified}
        message="This page has unsaved data. Please click cancel and try again"
      />

      <div className="text-2xl text-gray-600 font-semibold">{`${data?.surgicalProcedure?.surgicalProcedureType?.title} Intra-op`}</div>

      <hr className="mt-5" />

      {(data?.surgicalProcedure.orderNote.length ?? 0) > 0 && (
        <div className="mt-4 flex space-x-2 items-center">
          <span className="material-icons text-yellow-600">bookmark</span>
          <input
            disabled
            type="text"
            name="orderNote"
            id="orderNote"
            value={data?.surgicalProcedure.orderNote}
            className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md bg-gray-100"
          />
        </div>
      )}

      <div className="mt-4">
        <label
          htmlFor="assistantName"
          className="block text-sm font-medium text-gray-700"
        >
          Assistant Name
        </label>
        <input
          type="text"
          name="assistantName"
          ref={register}
          onChange={handleChanges}
          disabled={patientChartLocked[0]}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="performOnEye"
          className="block text-sm font-medium text-gray-700"
        >
          Perform On Eye
        </label>
        <select
          id="performOnEye"
          name="performOnEye"
          ref={register}
          onChange={handleChanges}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={"OD"}>Right</option>
          <option value={"OS"}>Left</option>
          <option value={"OU"}>Both</option>
        </select>
      </div>

      <div className="mt-4 shadow-md bg-white rounded-md p-4">
        <div className="text-xl text-gray-600 font-semibold">
          Anesthesia Details
        </div>

        <hr className="mt-2" />

        <div className="text-gray-600">
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="la"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">LA</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="ga"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">GA</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="retrobulbar"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Retrobulbar</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="peribulbar"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Peribulbar</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="topical"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Topical</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 shadow-md bg-white rounded-md p-4">
        <div className="text-xl text-gray-600 font-semibold">
          Surgery Details
        </div>

        <hr className="mt-2" />

        <div className="text-gray-600 grid grid-cols-5 gap-y-2 w-4/5 mt-2">
          <div className="font-semibold col-span-1">Conj flap</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="conjFlapLimbal"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Limbal</span>
            </label>
          </div>
          <div className="col-span-3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="conjFlapFornix"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Fornix</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Section</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="sectionLimbal"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Limbal</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="sectionCorneral"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Corneral</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="sectionScleralTunnel"
                ref={register}
                onChange={handleChanges}
                disabled={patientChartLocked[0]}
              />
              <span className="ml-2">Scleral tunnel</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Capsulotomy</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="capsulotomyLinear"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Linear</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="capsulotomyCanOpener"
                ref={register}
                onChange={handleChanges}
                disabled={patientChartLocked[0]}
              />
              <span className="ml-2">Can opener</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="capsulotomyCcc"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">CCC</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">IOL Placement</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="iolPlacementBag"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Bag</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="iolSulcus"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Sulcus</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="iolBagSulcus"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">bag-sulcus</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Irodectpmy</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="irodectpmyNone"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">None</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="irodectpmyPl"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">pl</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="irodectpmySl"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">sl</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="sphincterectomy"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Sphincterectomy</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Lens Extraction</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="lensExtractionIcce"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">ICCE</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="lensExtractionEcce"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">ECCE</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="lensExtractionPhaco"
                ref={register}
                onChange={handleChanges}
                disabled={patientChartLocked[0]}
              />
              <span className="ml-2">phaco</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Suture</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="sutureNone"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">None</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="sutureContinuous"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Continuous</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="sutureInterrupted"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Interrupted</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 shadow-md bg-white rounded-md p-4">
        <div className="text-xl text-gray-600 font-semibold">Supplies used</div>

        <hr className="mt-2" />

        <div className="text-gray-600 grid grid-cols-4 gap-y-2 w-4/5 mt-2">
          <div className="col-span-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="drapes"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Drapes</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Irrigation solution</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="ringer"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Ringer</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="bss"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">BSS</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Visco</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="air"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Air</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="hpmc"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">HPMC</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="healon"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Healon</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Intracameral</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="pilo"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Pilo</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="adrenalin"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Adrenalin</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Subconj</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="antibiotic"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Antibiotic</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="steroid"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Steroid</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">Suture</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="suture80"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">8-0</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="suture90"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">9-0</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="suture100"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">10-0</span>
            </label>
          </div>

          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="silk"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Silk</span>
            </label>
          </div>
          <div className="col-span-3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="nylon"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Nylon</span>
            </label>
          </div>
        </div>
      </div>

      <div className="page-break" />

      <div className="mt-4 shadow-md bg-white rounded-md p-4">
        <div className="text-xl text-gray-600 font-semibold">
          Intra-operative Complications
        </div>

        <hr className="mt-2" />

        <div className="text-gray-600 grid grid-cols-2 gap-y-2 w-1/2 mt-2">
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="pcTear"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">PC Tear</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="iridoDialysis"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Iridio-dialysis</span>
            </label>
          </div>

          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="vitreousLoss"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Vitreous Loss</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="irisDamage"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Iris damage</span>
            </label>
          </div>

          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="descematesStrip"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Descemete's strip</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="retainedCortex"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Retained cortex</span>
            </label>
          </div>

          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="endothelialDamage"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Endothelial damage</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="hyphema"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Hyphema</span>
            </label>
          </div>

          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="nucluesDrop"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Nuclues drop</span>
            </label>
          </div>

          <div className="col-span-2">
            <textarea
              name="complicationsOthers"
              placeholder="Others"
              rows={4}
              ref={register}
              onChange={handleChanges}
              disabled={patientChartLocked[0]}
              className="mt-1 p-1 pl-4 block w-full sm:text-md  border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 shadow-md bg-white rounded-md p-4">
        <div className="text-xl text-gray-600 font-semibold">Vitrectomy</div>

        <hr className="mt-2" />

        <div className="mt-4">
          <select
            id="vitrectomy"
            name="vitrectomy"
            ref={register}
            onChange={handleChanges}
            disabled={patientChartLocked[0]}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={""}></option>
            <option value={"automated"}>Automated</option>
            <option value={"wick"}>Wick</option>
          </select>
        </div>
      </div>

      <div className="mt-4 shadow-md bg-white rounded-md p-4">
        <div className="text-xl text-gray-600 font-semibold">IOP</div>

        <hr className="mt-2" />

        <div className="text-gray-600 grid grid-cols-4 gap-y-2 w-4/5 mt-2">
          <div className="font-semibold col-span-1">Type of IOL</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="typeOfIolAc"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">AC</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="typeOfIolPc"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">PC</span>
            </label>
          </div>

          <div className="font-semibold col-span-1">ACLOL</div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="aclolPlanned"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Planned</span>
            </label>
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                disabled={patientChartLocked[0]}
                name="aclolUnplanned"
                ref={register}
                onChange={handleChanges}
              />
              <span className="ml-2">Unplanned</span>
            </label>
          </div>
          <div className="col-span-1">
            {values.aclolUnplanned && (
              <input
                type="text"
                name="unplanned"
                ref={register}
                onChange={handleChanges}
                disabled={patientChartLocked[0]}
                placeholder="Unplanned reason"
                className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
              />
            )}
          </div>

          <div className="font-semibold col-span-1">Model</div>
          <div className="col-span-3">
            <input
              type="text"
              name="iolModel"
              ref={register}
              onChange={handleChanges}
              disabled={patientChartLocked[0]}
              className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
            />
          </div>

          <div className="font-semibold col-span-1">Company</div>
          <div className="col-span-3">
            <input
              type="text"
              name="company"
              ref={register}
              onChange={handleChanges}
              disabled={patientChartLocked[0]}
              className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 shadow-md bg-white rounded-md p-4">
        <div className="text-xl text-gray-600 font-semibold">
          Additional Surgical Notes
        </div>

        <hr className="mt-2" />

        <div className="mt-2 text-gray-600">
          <textarea
            name="additionalNotes"
            rows={4}
            ref={register}
            onChange={handleChanges}
            disabled={patientChartLocked[0]}
            className="mt-1 p-1 pl-4 block w-full sm:text-md border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-4 shadow-md bg-white rounded-md p-4">
        <div className="text-xl text-gray-600 font-semibold">
          Special Instructions
        </div>

        <hr className="mt-2" />

        <div className="mt-2 text-gray-600">
          <textarea
            name="specialInstructions"
            rows={4}
            ref={register}
            onChange={handleChanges}
            disabled={patientChartLocked[0]}
            className="mt-1 p-1 pl-4 block w-full sm:text-md border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
