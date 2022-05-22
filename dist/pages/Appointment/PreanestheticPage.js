import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { formatDate, getFileUrl } from "../../util";
import { format, parseISO } from "date-fns";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNotificationDispatch } from "../../notification";
import { FileUploaderComponent, } from "../../components/FileUploaderComponent";
import { AppointmentContext } from "../../_context/AppointmentContext";
import useExitPrompt from "../../useExitPrompt";
import { Prompt } from "react-router-dom";
import _ from "lodash";
const AUTO_SAVE_INTERVAL = 1000;
const SAVE_SURGICAL_PROCEDURE = gql `
  mutation SaveSurgicalProcedure($input: SurgicalProcedureInput!) {
    saveSurgicalProcedure(input: $input) {
      id
    }
  }
`;
const UPDATE_SURGERY_FITNESS = gql `
  mutation UpdateSurgeryFitness($id: ID!, $fit: Boolean!) {
    updateSurgeryFitness(id: $id, fit: $fit) {
      id
    }
  }
`;
const DELETE_PREANESTHETIC_DOCUMENT = gql `
  mutation DeletePreanestheticDocument(
    $surgicalProcedureId: ID!
    $fileId: ID!
  ) {
    deletePreanestheticDocument(
      surgicalProcedureId: $surgicalProcedureId
      fileId: $fileId
    )
  }
`;
const GET_PREANESTHETIC = gql `
  query GetPreop($patientChartId: ID!) {
    surgicalProcedure(patientChartId: $patientChartId) {
      id
      orderNote
      preanestheticDocuments {
        id
        size
        hash
        fileName
        extension
        contentType
        createdAt
      }
      respiratory
      cardiovascular
      abdomen
      gus
      ismss
      cns
      preanestheticAllergies
      preanestheticAllergiesNote
      physicalBloodPressure
      physicalPr
      physicalRr
      physicalSaO2
      physicalTemperature
      physicalWeight
      physicalHeent
      physicalArtificalDenture
      physicalArtificalDentureNote
      physicalLgs
      physicalChest
      physicalCvs
      physicalAbdomen
      physicalGus
      physicalIs
      physicalMss
      physicalCns
      asa1
      asa2
      asa3
      asa4
      asa5
      opv1
      opv2
      opv3
      opv4
      bleedingTendancy
      bleedingTendancyNote
      dm
      dmNote
      hypertension
      hypertensionNote
      cardiac
      cardiacNote
      preanestheticAsthma
      preanestheticAsthmaNote
      rvi
      rviNote
      renal
      renalNote
      preanestheticPerformedBy
      fitForSurgery
      fitForSurgeryNote
      surgicalProcedureType {
        id
        title
      }
    }
  }
`;
export const PreanestheticPage = ({ patientChartId }) => {
    var _a, _b;
    const notifDispatch = useNotificationDispatch();
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const { data, refetch } = useQuery(GET_PREANESTHETIC, {
        variables: {
            patientChartId,
        },
    });
    useEffect(() => {
        refetch();
    }, []);
    const { register, getValues, reset, watch } = useForm();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const defaultPreanestheticDocuments = (_a = data === null || data === void 0 ? void 0 : data.surgicalProcedure.preanestheticDocuments.map((e) => {
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
    })) !== null && _a !== void 0 ? _a : [];
    const [preanestheticDocuments, setPreanestheticDocuments] = useState(defaultPreanestheticDocuments);
    const [saveSurgicalProcedure] = useMutation(SAVE_SURGICAL_PROCEDURE, {
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
    const [fitForSurgery, setFitForSurgery] = useState((_b = data === null || data === void 0 ? void 0 : data.surgicalProcedure.fitForSurgery) !== null && _b !== void 0 ? _b : false);
    useEffect(() => {
        if (data === null || data === void 0 ? void 0 : data.surgicalProcedure.id) {
            updateSurgeryFitness({
                variables: {
                    id: data === null || data === void 0 ? void 0 : data.surgicalProcedure.id,
                    fit: fitForSurgery,
                },
            });
        }
    }, [fitForSurgery]);
    const [updateSurgeryFitness] = useMutation(UPDATE_SURGERY_FITNESS, {
        onCompleted() { },
        onError(error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const [deletePreanestheticDocument] = useMutation(DELETE_PREANESTHETIC_DOCUMENT, {
        onCompleted() { },
        onError(error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    useEffect(() => {
        const surgicalProcedure = data === null || data === void 0 ? void 0 : data.surgicalProcedure;
        if (surgicalProcedure !== undefined) {
            reset({
                respiratory: surgicalProcedure.respiratory,
                cardiovascular: surgicalProcedure.cardiovascular,
                abdomen: surgicalProcedure.abdomen,
                gus: surgicalProcedure.gus,
                ismss: surgicalProcedure.ismss,
                cns: surgicalProcedure.cns,
                preanestheticAllergies: surgicalProcedure.preanestheticAllergies,
                preanestheticAllergiesNote: surgicalProcedure.preanestheticAllergiesNote,
                physicalBloodPressure: surgicalProcedure.physicalBloodPressure,
                physicalPr: surgicalProcedure.physicalPr,
                physicalRr: surgicalProcedure.physicalRr,
                physicalSaO2: surgicalProcedure.physicalSaO2,
                physicalTemperature: surgicalProcedure.physicalTemperature,
                physicalWeight: surgicalProcedure.physicalWeight,
                physicalHeent: surgicalProcedure.physicalHeent,
                physicalArtificalDenture: surgicalProcedure.physicalArtificalDenture,
                physicalArtificalDentureNote: surgicalProcedure.physicalArtificalDentureNote,
                physicalLgs: surgicalProcedure.physicalLgs,
                physicalChest: surgicalProcedure.physicalChest,
                physicalCvs: surgicalProcedure.physicalCvs,
                physicalAbdomen: surgicalProcedure.physicalAbdomen,
                physicalGus: surgicalProcedure.physicalGus,
                physicalIs: surgicalProcedure.physicalIs,
                physicalMss: surgicalProcedure.physicalMss,
                physicalCns: surgicalProcedure.physicalCns,
                wbcActive: surgicalProcedure.wbcActive,
                wbcResults: surgicalProcedure.wbcResults,
                wbcDate: surgicalProcedure.wbcDate
                    ? format(parseISO(surgicalProcedure.wbcDate), "yyyy-MM-dd")
                    : undefined,
                hgbhctActive: surgicalProcedure.hgbhctActive,
                hgbhctResults: surgicalProcedure.hgbhctResults,
                hgbhctDate: surgicalProcedure.hgbhctDate
                    ? format(parseISO(surgicalProcedure.hgbhctDate), "yyyy-MM-dd")
                    : undefined,
                pltActive: surgicalProcedure.pltActive,
                pltResults: surgicalProcedure.pltResults,
                pltDate: surgicalProcedure.pltDate
                    ? format(parseISO(surgicalProcedure.pltDate), "yyyy-MM-dd")
                    : undefined,
                coagulationPtActive: surgicalProcedure.coagulationPtActive,
                coagulationPtResults: surgicalProcedure.coagulationPtResults,
                coagulationPtDate: surgicalProcedure.coagulationPtDate
                    ? format(parseISO(surgicalProcedure.coagulationPtDate), "yyyy-MM-dd")
                    : undefined,
                coagulationPttActive: surgicalProcedure.coagulationPttActive,
                coagulationPttResults: surgicalProcedure.coagulationPttResults,
                coagulationPttDate: surgicalProcedure.coagulationPttDate
                    ? format(parseISO(surgicalProcedure.coagulationPttDate), "yyyy-MM-dd")
                    : undefined,
                coagulationInrActive: surgicalProcedure.coagulationInrActive,
                coagulationInrResults: surgicalProcedure.coagulationInrResults,
                coagulationInrDate: surgicalProcedure.coagulationInrDate
                    ? format(parseISO(surgicalProcedure.coagulationInrDate), "yyyy-MM-dd")
                    : undefined,
                serumAlbuminActive: surgicalProcedure.serumAlbuminActive,
                serumAlbuminResults: surgicalProcedure.serumAlbuminResults,
                serumAlbuminDate: surgicalProcedure.serumAlbuminDate
                    ? format(parseISO(surgicalProcedure.serumAlbuminDate), "yyyy-MM-dd")
                    : undefined,
                totalProteinActive: surgicalProcedure.totalProteinActive,
                totalProteinResults: surgicalProcedure.totalProteinResults,
                totalProteinDate: surgicalProcedure.totalProteinDate
                    ? format(parseISO(surgicalProcedure.totalProteinDate), "yyyy-MM-dd")
                    : undefined,
                bilirubinTotalActive: surgicalProcedure.bilirubinTotalActive,
                bilirubinTotalResults: surgicalProcedure.bilirubinTotalResults,
                bilirubinTotalDate: surgicalProcedure.bilirubinTotalDate
                    ? format(parseISO(surgicalProcedure.bilirubinTotalDate), "yyyy-MM-dd")
                    : undefined,
                bilirubinDirectActive: surgicalProcedure.bilirubinDirectActive,
                bilirubinDirectResults: surgicalProcedure.bilirubinDirectResults,
                bilirubinDirectDate: surgicalProcedure.bilirubinDirectDate
                    ? format(parseISO(surgicalProcedure.bilirubinDirectDate), "yyyy-MM-dd")
                    : undefined,
                astsgotActive: surgicalProcedure.astsgotActive,
                astsgotResults: surgicalProcedure.astsgotResults,
                astsgotDate: surgicalProcedure.astsgotDate
                    ? format(parseISO(surgicalProcedure.astsgotDate), "yyyy-MM-dd")
                    : undefined,
                altsgptActive: surgicalProcedure.altsgptActive,
                altsgptResults: surgicalProcedure.altsgptResults,
                altsgptDate: surgicalProcedure.altsgptDate
                    ? format(parseISO(surgicalProcedure.altsgptDate), "yyyy-MM-dd")
                    : undefined,
                alpActive: surgicalProcedure.alpActive,
                alpResults: surgicalProcedure.alpResults,
                alpDate: surgicalProcedure.alpDate
                    ? format(parseISO(surgicalProcedure.alpDate), "yyyy-MM-dd")
                    : undefined,
                renalCrActive: surgicalProcedure.renalCrActive,
                renalCrResults: surgicalProcedure.renalCrResults,
                renalCrDate: surgicalProcedure.renalCrDate
                    ? format(parseISO(surgicalProcedure.renalCrDate), "yyyy-MM-dd")
                    : undefined,
                renalBunActive: surgicalProcedure.renalBunActive,
                renalBunResults: surgicalProcedure.renalBunResults,
                renalBunDate: surgicalProcedure.renalBunDate
                    ? format(parseISO(surgicalProcedure.renalBunDate), "yyyy-MM-dd")
                    : undefined,
                thyroidFreeT3Active: surgicalProcedure.thyroidFreeT3Active,
                thyroidFreeT3Results: surgicalProcedure.thyroidFreeT3Results,
                thyroidFreeT3Date: surgicalProcedure.thyroidFreeT3Date
                    ? format(parseISO(surgicalProcedure.thyroidFreeT3Date), "yyyy-MM-dd")
                    : undefined,
                thyroidTotalT4Active: surgicalProcedure.thyroidTotalT4Active,
                thyroidTotalT4Results: surgicalProcedure.thyroidTotalT4Results,
                thyroidTotalT4Date: surgicalProcedure.thyroidTotalT4Date
                    ? format(parseISO(surgicalProcedure.thyroidTotalT4Date), "yyyy-MM-dd")
                    : undefined,
                thyroidTshActive: surgicalProcedure.thyroidTshActive,
                thyroidTshResults: surgicalProcedure.thyroidTshResults,
                thyroidTshDate: surgicalProcedure.thyroidTshDate
                    ? format(parseISO(surgicalProcedure.thyroidTshDate), "yyyy-MM-dd")
                    : undefined,
                electrolytesNaPlusActive: surgicalProcedure.electrolytesNaPlusActive,
                electrolytesNaPlusResults: surgicalProcedure.electrolytesNaPlusResults,
                electrolytesNaPlusDate: surgicalProcedure.electrolytesNaPlusDate
                    ? format(parseISO(surgicalProcedure.electrolytesNaPlusDate), "yyyy-MM-dd")
                    : undefined,
                electrolytesKPlusActive: surgicalProcedure.electrolytesKPlusActive,
                electrolytesKPlusResults: surgicalProcedure.electrolytesKPlusResults,
                electrolytesKPlusDate: surgicalProcedure.electrolytesKPlusDate
                    ? format(parseISO(surgicalProcedure.electrolytesKPlusDate), "yyyy-MM-dd")
                    : undefined,
                electrolytesClMinusActive: surgicalProcedure.electrolytesClMinusActive,
                electrolytesClMinusResults: surgicalProcedure.electrolytesClMinusResults,
                electrolytesClMinusDate: surgicalProcedure.electrolytesClMinusDate
                    ? format(parseISO(surgicalProcedure.electrolytesClMinusDate), "yyyy-MM-dd")
                    : undefined,
                electrolytesCa2PlusActive: surgicalProcedure.electrolytesCa2PlusActive,
                electrolytesCa2PlusResults: surgicalProcedure.electrolytesCa2PlusResults,
                electrolytesCa2PlusDate: surgicalProcedure.electrolytesCa2PlusDate
                    ? format(parseISO(surgicalProcedure.electrolytesCa2PlusDate), "yyyy-MM-dd")
                    : undefined,
                electrolytesMg2PlusActive: surgicalProcedure.electrolytesMg2PlusActive,
                electrolytesMg2PlusResults: surgicalProcedure.electrolytesMg2PlusResults,
                electrolytesMg2PlusDate: surgicalProcedure.electrolytesMg2PlusDate
                    ? format(parseISO(surgicalProcedure.electrolytesMg2PlusDate), "yyyy-MM-dd")
                    : undefined,
                electrolytesPMinusActive: surgicalProcedure.electrolytesPMinusActive,
                electrolytesPMinusResults: surgicalProcedure.electrolytesPMinusResults,
                electrolytesPMinusDate: surgicalProcedure.electrolytesPMinusDate
                    ? format(parseISO(surgicalProcedure.electrolytesPMinusDate), "yyyy-MM-dd")
                    : undefined,
                asa1: surgicalProcedure.asa1,
                asa2: surgicalProcedure.asa2,
                asa3: surgicalProcedure.asa3,
                asa4: surgicalProcedure.asa4,
                asa5: surgicalProcedure.asa5,
                opv1: surgicalProcedure.opv1,
                opv2: surgicalProcedure.opv2,
                opv3: surgicalProcedure.opv3,
                opv4: surgicalProcedure.opv4,
                bleedingTendancy: surgicalProcedure.bleedingTendancy,
                bleedingTendancyNote: surgicalProcedure.bleedingTendancyNote,
                dm: surgicalProcedure.dm,
                dmNote: surgicalProcedure.dmNote,
                hypertension: surgicalProcedure.hypertension,
                hypertensionNote: surgicalProcedure.hypertensionNote,
                cardiac: surgicalProcedure.cardiac,
                cardiacNote: surgicalProcedure.cardiacNote,
                preanestheticAsthma: surgicalProcedure.preanestheticAsthma,
                preanestheticAsthmaNote: surgicalProcedure.preanestheticAsthmaNote,
                rvi: surgicalProcedure.rvi,
                rviNote: surgicalProcedure.rviNote,
                renal: surgicalProcedure.renal,
                renalNote: surgicalProcedure.renalNote,
                fitForSurgery: surgicalProcedure.fitForSurgery,
                fitForSurgeryNote: surgicalProcedure.fitForSurgeryNote,
            });
        }
    }, [data === null || data === void 0 ? void 0 : data.surgicalProcedure]);
    const handleChanges = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        const data = getValues();
        const isEmpty = _.values(data).every((v) => _.isEmpty(v));
        setTimer(setTimeout(() => {
            if (patientChartId !== undefined && !isEmpty) {
                const surgicalProcedure = Object.assign(Object.assign({}, data), { patientChartId, wbcDate: data.wbcDate ? formatDate(data.wbcDate) : undefined, hgbhctDate: data.hgbhctDate
                        ? formatDate(data.hgbhctDate)
                        : undefined, pltDate: data.pltDate ? formatDate(data.pltDate) : undefined, coagulationPtDate: data.coagulationPtDate
                        ? formatDate(data.coagulationPtDate)
                        : undefined, coagulationPttDate: data.coagulationPttDate
                        ? formatDate(data.coagulationPttDate)
                        : undefined, coagulationInrDate: data.coagulationInrDate
                        ? formatDate(data.coagulationInrDate)
                        : undefined, serumAlbuminDate: data.serumAlbuminDate
                        ? formatDate(data.serumAlbuminDate)
                        : undefined, totalProteinDate: data.totalProteinDate
                        ? formatDate(data.totalProteinDate)
                        : undefined, bilirubinTotalDate: data.bilirubinTotalDate
                        ? formatDate(data.bilirubinTotalDate)
                        : undefined, bilirubinDirectDate: data.bilirubinDirectDate
                        ? formatDate(data.bilirubinDirectDate)
                        : undefined, astsgotDate: data.astsgotDate
                        ? formatDate(data.astsgotDate)
                        : undefined, altsgptDate: data.altsgptDate
                        ? formatDate(data.altsgptDate)
                        : undefined, alpDate: data.alpDate ? formatDate(data.alpDate) : undefined, renalCrDate: data.renalCrDate
                        ? formatDate(data.renalCrDate)
                        : undefined, renalBunDate: data.renalBunDate
                        ? formatDate(data.renalBunDate)
                        : undefined, thyroidFreeT3Date: data.thyroidFreeT3Date
                        ? formatDate(data.thyroidFreeT3Date)
                        : undefined, thyroidTotalT4Date: data.thyroidTotalT4Date
                        ? formatDate(data.thyroidTotalT4Date)
                        : undefined, thyroidTshDate: data.thyroidTshDate
                        ? formatDate(data.thyroidTshDate)
                        : undefined, electrolytesNaPlusDate: data.electrolytesNaPlusDate
                        ? formatDate(data.electrolytesNaPlusDate)
                        : undefined, electrolytesKPlusDate: data.electrolytesKPlusDate
                        ? formatDate(data.electrolytesKPlusDate)
                        : undefined, electrolytesClMinusDate: data.electrolytesClMinusDate
                        ? formatDate(data.electrolytesClMinusDate)
                        : undefined, electrolytesCa2PlusDate: data.electrolytesCa2PlusDate
                        ? formatDate(data.electrolytesCa2PlusDate)
                        : undefined, electrolytesMg2PlusDate: data.electrolytesMg2PlusDate
                        ? formatDate(data.electrolytesMg2PlusDate)
                        : undefined, electrolytesPMinusDate: data.electrolytesPMinusDate
                        ? formatDate(data.electrolytesPMinusDate)
                        : undefined });
                saveSurgicalProcedure({
                    variables: {
                        input: surgicalProcedure,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const handlePreanestheticDocumentsChange = (change) => {
        setPreanestheticDocuments(change);
        const files = change
            .filter((e) => e.fileObject !== undefined)
            .map((e) => ({
            file: e.fileObject,
            name: e.name,
        }));
        if (patientChartId) {
            saveSurgicalProcedure({
                variables: {
                    input: {
                        patientChartId,
                        preanestheticDocuments: files,
                    },
                },
            });
        }
    };
    const handlePreanestheticDocumentDelete = (index) => {
        const file = preanestheticDocuments.find((_, i) => i === index);
        setPreanestheticDocuments(preanestheticDocuments.filter((_, i) => i !== index));
        if ((file === null || file === void 0 ? void 0 : file.id) !== undefined && (data === null || data === void 0 ? void 0 : data.surgicalProcedure.id)) {
            deletePreanestheticDocument({
                variables: {
                    surgicalProcedureId: data === null || data === void 0 ? void 0 : data.surgicalProcedure.id,
                    fileId: file.id,
                },
            });
        }
    };
    const dataWatch = watch();
    return (_jsxs("div", Object.assign({ className: "container mx-auto bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold" }, { children: `${data === null || data === void 0 ? void 0 : data.surgicalProcedure.surgicalProcedureType.title} Preanesthetic Evaluation` }), void 0),
            _jsx("hr", { className: "mt-5" }, void 0),
            _jsxs("div", Object.assign({ className: "mt-5" }, { children: [_jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Documents" }), void 0),
                    _jsx(FileUploaderComponent, { multiSelect: true, values: preanestheticDocuments, onAdd: handlePreanestheticDocumentsChange, onDelete: handlePreanestheticDocumentDelete, disabled: patientChartLocked[0] }, void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "mt-4 shadow-md bg-white rounded-md p-4" }, { children: [_jsx("div", Object.assign({ className: "text-xl text-gray-600 font-semibold" }, { children: "History" }), void 0),
                    _jsx("hr", { className: "mt-2" }, void 0),
                    _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 w-full mt-2" }, { children: [_jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Resparatory" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "respiratory", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Cardiovascular" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "cardiovascular", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Abdomen" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "abdomen", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "GUS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "gus", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "IS/MSS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "ismss", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "CNS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "cns", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Allergies" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "preanestheticAllergies", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "preanestheticAllergiesNote", disabled: !dataWatch.preanestheticAllergies, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.preanestheticAllergies,
                                    }) }, void 0) }), void 0)] }), void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "mt-4 shadow-md bg-white rounded-md p-4" }, { children: [_jsx("div", Object.assign({ className: "text-xl text-gray-600 font-semibold" }, { children: "Chronic Illnesses" }), void 0),
                    _jsx("hr", { className: "mt-2" }, void 0),
                    _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 w-full mt-2" }, { children: [_jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Bleeding Tendency" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "bleedingTendancy", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "bleedingTendancyNote", disabled: !dataWatch.bleedingTendancy, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.bleedingTendancy,
                                    }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "DM" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "dm", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "dmNote", disabled: !dataWatch.dm, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.dm,
                                    }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Hypertension" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "hypertension", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "hypertensionNote", disabled: !dataWatch.hypertension, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.hypertension,
                                    }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Cardiac" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "cardiac", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "cardiacNote", disabled: !dataWatch.cardiac, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.cardiac,
                                    }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Asthma" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "preanestheticAsthma", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "preanestheticAsthmaNote", disabled: !dataWatch.preanestheticAsthma, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.preanestheticAsthma,
                                    }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "RVI" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "rvi", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "rviNote", disabled: !dataWatch.rvi, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.rvi,
                                    }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Renal" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "renal", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "renalNote", disabled: !dataWatch.renal, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.renal,
                                    }) }, void 0) }), void 0)] }), void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-x-4" }, { children: [_jsxs("div", Object.assign({ className: "mt-4 shadow-md bg-white rounded-md p-4" }, { children: [_jsx("div", Object.assign({ className: "text-xl text-gray-600 font-semibold" }, { children: "ASA" }), void 0),
                            _jsx("hr", { className: "mt-2" }, void 0),
                            _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 w-full mt-2" }, { children: [_jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "ASA I" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "asa1", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0),
                                    _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "ASA II" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "asa2", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0),
                                    _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "ASA III" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "asa3", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0),
                                    _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "ASA IV" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "asa4", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0),
                                    _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "ASA V" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "asa5", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0)] }), void 0)] }), void 0),
                    _jsxs("div", Object.assign({ className: "mt-4 shadow-md bg-white rounded-md p-4" }, { children: [_jsx("div", Object.assign({ className: "text-xl text-gray-600 font-semibold" }, { children: "Mallapati" }), void 0),
                            _jsx("hr", { className: "mt-2" }, void 0),
                            _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 w-full mt-2" }, { children: [_jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "OPV I" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "opv1", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0),
                                    _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "OPV II" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "opv2", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0),
                                    _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "OPV III" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "opv3", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0),
                                    _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "OPV IV" }), void 0),
                                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "opv4", ref: register, onChange: handleChanges }, void 0),
                                                _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                                    _jsx("div", { className: "col-span-1" }, void 0)] }), void 0)] }), void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "mt-4 shadow-md bg-white rounded-md p-4" }, { children: [_jsx("div", Object.assign({ className: "text-xl text-gray-600 font-semibold" }, { children: "Physical Examination" }), void 0),
                    _jsx("hr", { className: "mt-2" }, void 0),
                    _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 w-full mt-2" }, { children: [_jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Blood Pressure" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalBloodPressure", placeholder: "mmhg", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "PR" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalPr", placeholder: "bpm", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "RR" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalRr", placeholder: "RR", ref: register, onChange: handleChanges, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsxs("div", Object.assign({ className: "font-semibold col-span-1" }, { children: [_jsx("span", { children: "S" }, void 0),
                                    _jsx("sub", { children: "a" }, void 0), "O", _jsx("sub", { children: "2" }, void 0)] }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalSaO2", ref: register, onChange: handleChanges, placeholder: "%", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsxs("div", Object.assign({ className: "font-semibold col-span-1" }, { children: ["T", _jsx("sup", { children: "\u00B0" }, void 0)] }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalTemperature", ref: register, onChange: handleChanges, placeholder: "C\u00B0", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Weight" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalWeight", ref: register, onChange: handleChanges, placeholder: "Kg", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "HEENT" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalHeent", ref: register, onChange: handleChanges, placeholder: "HEENT", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Artifical Denture" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "physicalArtificalDenture", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Yes" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "physicalArtificalDentureNote", disabled: !dataWatch.physicalArtificalDenture, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", {
                                        "bg-gray-200 placeholder-gray-400": !dataWatch.physicalArtificalDenture,
                                    }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "LGS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalLgs", ref: register, onChange: handleChanges, placeholder: "LGS", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Chest" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalChest", ref: register, onChange: handleChanges, placeholder: "Chest", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "CVS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalCvs", ref: register, onChange: handleChanges, placeholder: "CVS", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "Abdomen" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalAbdomen", ref: register, onChange: handleChanges, placeholder: "Abdomen", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "GUS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalGus", ref: register, onChange: handleChanges, placeholder: "GUS", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "IS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalIs", ref: register, onChange: handleChanges, placeholder: "IS", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "MSS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalMss", ref: register, onChange: handleChanges, placeholder: "MSS", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: "CNS" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-2" }, { children: _jsx("input", { type: "text", name: "physicalCns", ref: register, onChange: handleChanges, placeholder: "CNS", className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0)] }), void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "mt-4 shadow-md bg-white rounded-md p-4" }, { children: [_jsx("div", Object.assign({ className: "text-xl text-gray-600 font-semibold" }, { children: "Investigations Summary" }), void 0),
                    _jsx("hr", { className: "mt-2" }, void 0),
                    _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 gap-x-5 w-full mt-2" }, { children: [_jsx("div", { className: "col-span-1" }, void 0),
                            _jsx("div", Object.assign({ className: "col-span-1 text-center" }, { children: "Results" }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1 text-center" }, { children: "Date" }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", ref: register, onChange: handleChanges, name: "wbcActive" }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "WBC" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "wbcResults", disabled: !dataWatch.wbcActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.wbcActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "wbcDate", disabled: !dataWatch.wbcActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.wbcActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "hgbhctActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "HGB/HCT" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "hgbhctResults", disabled: !dataWatch.hgbhctActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.hgbhctActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "hgbhctDate", disabled: !dataWatch.hgbhctActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.hgbhctActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "pltActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "PLT" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "pltResults", disabled: !dataWatch.pltActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.pltActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "pltDate", disabled: !dataWatch.pltActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.pltActive }) }, void 0) }), void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "text-gray-800 font-light text-sm mt-5" }, { children: "Liver Function Tests" }), void 0),
                    _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 gap-x-5 w-full mt-1" }, { children: [_jsx("div", Object.assign({ className: "col-span-1 font-semibold" }, { children: "Coagulation Profile" }), void 0),
                            _jsx("div", { className: "col-span-1 text-center" }, void 0),
                            _jsx("div", { className: "col-span-1 text-center" }, void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center ml-5" }, { children: [_jsx("input", { type: "checkbox", name: "coagulationPtActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "PT" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "coagulationPtResults", disabled: !dataWatch.coagulationPtActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.coagulationPtActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "coagulationPtDate", disabled: !dataWatch.coagulationPtActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.coagulationPtActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center ml-5" }, { children: [_jsx("input", { type: "checkbox", name: "coagulationPttActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "PTT" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "coagulationPttResults", disabled: !dataWatch.coagulationPttActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.coagulationPttActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "coagulationPttDate", disabled: !dataWatch.coagulationPttActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.coagulationPttActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center ml-5" }, { children: [_jsx("input", { type: "checkbox", name: "coagulationInrActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "INR" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "coagulationInrResults", disabled: !dataWatch.coagulationInrActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.coagulationInrActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "coagulationInrDate", disabled: !dataWatch.coagulationInrActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.coagulationInrActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "serumAlbuminActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Serum Albumin" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "serumAlbuminResults", disabled: !dataWatch.serumAlbuminActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.serumAlbuminActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "serumAlbuminDate", disabled: !dataWatch.serumAlbuminActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.serumAlbuminActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "totalProteinActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Total Protein" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "totalProteinResults", disabled: !dataWatch.totalProteinActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.totalProteinActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "totalProteinDate", disabled: !dataWatch.totalProteinActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.totalProteinActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "bilirubinTotalActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Bilirubin (Total)" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "bilirubinTotalResults", disabled: !dataWatch.bilirubinTotalActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.bilirubinTotalActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "bilirubinTotalDate", disabled: !dataWatch.bilirubinTotalActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.bilirubinTotalActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "bilirubinDirectActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Bilirubin (Direct)" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "bilirubinDirectResults", disabled: !dataWatch.bilirubinDirectActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.bilirubinDirectActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "bilirubinDirectDate", disabled: !dataWatch.bilirubinDirectActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.bilirubinDirectActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "astsgotActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "AST/SGOT" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "astsgotResults", disabled: !dataWatch.astsgotActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.astsgotActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "astsgotDate", disabled: !dataWatch.astsgotActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.astsgotActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "altsgptActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "ALT/SGPT" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "altsgptResults", disabled: !dataWatch.altsgptActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.altsgptActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "altsgptDate", disabled: !dataWatch.altsgptActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.altsgptActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "alpActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "ALP" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "alpResults", disabled: !dataWatch.alpActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.alpActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "alpDate", disabled: !dataWatch.alpActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.alpActive }) }, void 0) }), void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "text-gray-800 font-light text-sm mt-5" }, { children: "Renal Function Tests" }), void 0),
                    _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 gap-x-5 w-full mt-1" }, { children: [_jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "renalCrActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Cr" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "renalCrResults", disabled: !dataWatch.renalCrActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.renalCrActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "renalCrDate", disabled: !dataWatch.renalCrActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.renalCrActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "renalBunActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "BUN" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "renalBunResults", disabled: !dataWatch.renalBunActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.renalBunActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "renalBunDate", disabled: !dataWatch.renalBunActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.renalBunActive }) }, void 0) }), void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "text-gray-800 font-light text-sm mt-5" }, { children: "Thyroid Function Tests" }), void 0),
                    _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 gap-x-5 w-full mt-1" }, { children: [_jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "thyroidFreeT3Active", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Free T3" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "thyroidFreeT3Results", disabled: !dataWatch.thyroidFreeT3Active, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.thyroidFreeT3Active }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "thyroidFreeT3Date", disabled: !dataWatch.thyroidFreeT3Active, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.thyroidFreeT3Active }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "thyroidTotalT4Active", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Total T4" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "thyroidTotalT4Results", disabled: !dataWatch.thyroidTotalT4Active, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.thyroidTotalT4Active }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "thyroidTotalT4Date", disabled: !dataWatch.thyroidTotalT4Active, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.thyroidTotalT4Active }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "thyroidTshActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "TSH" }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "thyroidTshResults", disabled: !dataWatch.thyroidTshActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.thyroidTshActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "thyroidTshDate", disabled: !dataWatch.thyroidTshActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.thyroidTshActive }) }, void 0) }), void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "text-gray-800 font-light text-sm mt-5" }, { children: "Electrolytes" }), void 0),
                    _jsxs("div", Object.assign({ className: "text-gray-600 grid grid-cols-3 gap-y-3 gap-x-5 w-full mt-1" }, { children: [_jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "electrolytesNaPlusActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsxs("span", Object.assign({ className: "ml-2" }, { children: ["Na", _jsx("sup", { children: "+" }, void 0)] }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "electrolytesNaPlusResults", disabled: !dataWatch.electrolytesNaPlusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesNaPlusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "electrolytesNaPlusDate", disabled: !dataWatch.electrolytesNaPlusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesNaPlusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "electrolytesKPlusActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsxs("span", Object.assign({ className: "ml-2" }, { children: ["K", _jsx("sup", { children: "+" }, void 0)] }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "electrolytesKPlusResults", disabled: !dataWatch.electrolytesKPlusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesKPlusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "electrolytesKPlusDate", disabled: !dataWatch.electrolytesKPlusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesKPlusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "electrolytesClMinusActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsxs("span", Object.assign({ className: "ml-2" }, { children: ["CL", _jsx("sup", { children: "-" }, void 0)] }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "electrolytesClMinusResults", disabled: !dataWatch.electrolytesClMinusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesClMinusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "electrolytesClMinusDate", disabled: !dataWatch.electrolytesClMinusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesClMinusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "electrolytesCa2PlusActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsxs("span", Object.assign({ className: "ml-2" }, { children: ["Ca", _jsx("sup", { children: "2+" }, void 0)] }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "electrolytesCa2PlusResults", disabled: !dataWatch.electrolytesCa2PlusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesCa2PlusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "electrolytesCa2PlusDate", disabled: !dataWatch.electrolytesCa2PlusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesCa2PlusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "electrolytesMg2PlusActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsxs("span", Object.assign({ className: "ml-2" }, { children: ["Mg", _jsx("sup", { children: "2+" }, void 0)] }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "electrolytesMg2PlusResults", disabled: !dataWatch.electrolytesMg2PlusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesMg2PlusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "electrolytesMg2PlusDate", disabled: !dataWatch.electrolytesMg2PlusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesMg2PlusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "font-semibold col-span-1" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "electrolytesPMinusActive", ref: register, onChange: handleChanges }, void 0),
                                        _jsxs("span", Object.assign({ className: "ml-2" }, { children: ["P", _jsx("sup", { children: "-" }, void 0)] }), void 0)] }), void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "electrolytesPMinusResults", disabled: !dataWatch.electrolytesPMinusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesPMinusActive }) }, void 0) }), void 0),
                            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "date", name: "electrolytesPMinusDate", disabled: !dataWatch.electrolytesPMinusActive, ref: register, onChange: handleChanges, className: classnames("p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", { "bg-gray-200": !dataWatch.electrolytesPMinusActive }) }, void 0) }), void 0)] }), void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "mt-4 shadow-md bg-white rounded-md p-4" }, { children: [_jsx("div", Object.assign({ className: "text-xl text-gray-600 font-semibold" }, { children: "Fitness" }), void 0),
                    _jsx("hr", { className: "mt-2" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-2" }, { children: [_jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "radio", name: "fitForSurgery", checked: fitForSurgery, onChange: (evt) => setFitForSurgery(true) }, void 0),
                                    _jsx("span", Object.assign({ className: "ml-2" }, { children: "Fit" }), void 0)] }), void 0),
                            _jsxs("label", Object.assign({ className: "inline-flex items-center ml-5" }, { children: [_jsx("input", { type: "radio", name: "fitForSurgery", checked: !fitForSurgery, onChange: (evt) => setFitForSurgery(false) }, void 0),
                                    _jsx("span", Object.assign({ className: "ml-2" }, { children: "Unfit" }), void 0)] }), void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "mt-4 text-gray-600" }, { children: _jsx("textarea", { name: "fitForSurgeryNote", rows: 4, ref: register, onChange: handleChanges, className: "mt-1 p-1 pl-4 block w-full sm:text-md border border-gray-300 rounded-md" }, void 0) }), void 0)] }), void 0)] }), void 0));
};
