import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import IntraOpForm from "../../components/IntraOpForm";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import { AppointmentContext } from "../../_context/AppointmentContext";
const AUTO_SAVE_INTERVAL = 1000;
const SAVE_SURGICAL_PROCEDURE = gql `
  mutation SaveSurgicalProcedure($input: SurgicalProcedureInput!) {
    saveSurgicalProcedure(input: $input) {
      id
    }
  }
`;
const GET_INTRA_OP = gql `
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
export const IntraOpPage = ({ patientChartId }) => {
    var _a, _b, _c, _d;
    const notifDispatch = useNotificationDispatch();
    const { register, getValues, reset, watch } = useForm({});
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { data, refetch } = useQuery(GET_INTRA_OP, {
        variables: {
            patientChartId,
        },
    });
    useEffect(() => {
        refetch();
    }, []);
    useEffect(() => {
        const surgicalProcedure = data === null || data === void 0 ? void 0 : data.surgicalProcedure;
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
    }, [data === null || data === void 0 ? void 0 : data.surgicalProcedure]);
    const [save] = useMutation(SAVE_SURGICAL_PROCEDURE, {
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
    });
    const handleChanges = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        const data = getValues();
        const isEmpty = _.values(data).every((v) => _.isEmpty(v));
        setTimer(setTimeout(() => {
            if (patientChartId !== undefined && !isEmpty) {
                const input = Object.assign(Object.assign({}, data), { patientChartId });
                save({
                    variables: {
                        input,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const values = watch();
    return (_jsxs("div", Object.assign({ className: "container mx-auto bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold" }, { children: `${(_b = (_a = data === null || data === void 0 ? void 0 : data.surgicalProcedure) === null || _a === void 0 ? void 0 : _a.surgicalProcedureType) === null || _b === void 0 ? void 0 : _b.title} Intra-op` }), void 0),
            _jsx("hr", { className: "mt-5" }, void 0),
            ((_c = data === null || data === void 0 ? void 0 : data.surgicalProcedure.orderNote.length) !== null && _c !== void 0 ? _c : 0) > 0 && (_jsxs("div", Object.assign({ className: "mt-4 flex space-x-2 items-center" }, { children: [_jsx("span", Object.assign({ className: "material-icons text-yellow-600" }, { children: "bookmark" }), void 0),
                    _jsx("input", { disabled: true, type: "text", name: "orderNote", id: "orderNote", value: data === null || data === void 0 ? void 0 : data.surgicalProcedure.orderNote, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md bg-gray-100" }, void 0)] }), void 0)),
            _jsx(IntraOpForm, { register: register, locked: patientChartLocked[0], aclolUnplanned: (_d = values.aclolUnplanned) !== null && _d !== void 0 ? _d : false, handleChanges: handleChanges }, void 0)] }), void 0));
};
