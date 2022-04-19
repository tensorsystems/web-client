import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { CoverTestComponent } from "../../components/CoverTestComponent";
import { ExternalExamComponent } from "../../components/ExternalExamComponent";
import { FunduscopyComponent } from "../../components/FunduscopyComponent";
import { OcularMotilityComponent } from "../../components/OcularMotilityComponent";
import { OpticDiscComponent } from "../../components/OpticDiscComponent";
import { PupilsComponent } from "../../components/PupilsComponent";
import { SlitLampExamComponent } from "../../components/SlitLampExamComponent";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import { useNotificationDispatch } from "../../notification";
import useExitPrompt from "../../useExitPrompt";
import _ from "lodash";
import ReactLoading from "react-loading";
const AUTO_SAVE_INTERVAL = 1000;
const GET_OPTHALMOLOGY_EXAM = gql `
  query OpthalmologyExam($filter: OphthalmologyExamFilter!) {
    opthalmologyExam(filter: $filter) {
      id
      rightOrbits
      leftOrbits
      rightLids
      leftLids
      rightLacrimalSystem
      leftLacrimalSystem
      externalExamNote
      rightCoverTest
      leftCoverTest
      coverTestNote
      rightRetina
      leftRetina
      leftRetinaSketch
      rightRetinaSketch
      funduscopyNote
      rightOcularMotility
      leftOcularMotility
      rsr
      rio
      rlr
      rmr
      rir
      rso
      rightFlick
      lsr
      lio
      llr
      lmr
      lir
      lso
      leftFlick
      distance
      near
      ocularMotilityNote
      rightOpticDisc
      leftOpticDisc
      rightOpticDiscSketch
      leftOpticDiscSketch
      rightCdr
      leftCdr
      opticDiscNote
      rightPupils
      leftPupils
      pupilsNote
      rightConjunctiva
      leftConjunctiva
      rightCornea
      leftCornea
      rightCorneaSketch
      leftCorneaSketch
      leftSclera
      rightSclera
      rightAnteriorChamber
      leftAnteriorChamber
      rightIris
      leftIris
      rightLens
      leftLens
      rightLensSketch
      leftLensSketch
      rightVitreos
      leftVitreos
      slitLampExamNote
    }
  }
`;
const SAVE_OPTHALMOLOGY_EXAM = gql `
  mutation UpdateOphthalmologyExam($input: OpthalmologyExamUpdateInput!) {
    updateOphthalmologyExam(input: $input) {
      id
      rightFlick
    }
  }
`;
const CREATE_OPTHALMOLOGY_EXAM = gql `
  mutation SaveOphthalmologyExam($input: OpthalmologyExamInput!) {
    saveOphthalmologyExam(input: $input) {
      id
    }
  }
`;
const OphthalmologyExamination = ({ patientChartId, onSaveChange }) => {
    const notifDispatch = useNotificationDispatch();
    const [timer, setTimer] = useState(null);
    const [modified, setModified] = useState(false);
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    const rightCorneaSketchRef = useRef(null);
    const leftCorneaSketchRef = useRef(null);
    const rightLensSketchRef = useRef(null);
    const leftLensSketchRef = useRef(null);
    const rightRetinaSketchRef = useRef(null);
    const leftRetinaSketchRef = useRef(null);
    const rightOpticDiscSketchRef = useRef(null);
    const leftOpticDiscSketchRef = useRef(null);
    const { data, error, refetch, loading } = useQuery(GET_OPTHALMOLOGY_EXAM, {
        variables: { filter: { patientChartId } },
    });
    useEffect(() => {
        refetch();
    }, []);
    const [createOpthalmologyExam] = useMutation(CREATE_OPTHALMOLOGY_EXAM, {
        onCompleted(data) {
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
    useEffect(() => {
        if ((error === null || error === void 0 ? void 0 : error.message) === "record not found" && patientChartId) {
            createOpthalmologyExam({
                variables: {
                    input: {
                        patientChartId: patientChartId,
                    },
                },
            });
        }
    }, [error, patientChartId]);
    const { register, control, getValues, setValue, reset, watch } = useForm();
    useEffect(() => {
        if (data === null || data === void 0 ? void 0 : data.opthalmologyExam) {
            const opthalmologyForm = data === null || data === void 0 ? void 0 : data.opthalmologyExam;
            reset({
                rightOrbits: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightOrbits,
                leftOrbits: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftOrbits,
                rightLids: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightLids,
                leftLids: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftLids,
                rightLacrimalSystem: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightLacrimalSystem,
                leftLacrimalSystem: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftLacrimalSystem,
                externalExamNote: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.externalExamNote,
                rightOcularMotility: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightOcularMotility,
                leftOcularMotility: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftOcularMotility,
                rsr: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rsr,
                rio: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rio,
                rlr: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rlr,
                rmr: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rmr,
                rir: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rir,
                rso: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rso,
                rightFlick: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightFlick,
                lsr: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.lsr,
                lio: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.lio,
                llr: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.llr,
                lmr: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.lmr,
                lir: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.lir,
                lso: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.lso,
                leftFlick: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftFlick,
                distance: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.distance,
                near: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.near,
                ocularMotilityNote: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.ocularMotilityNote,
                rightCoverTest: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightCoverTest,
                leftCoverTest: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftCoverTest,
                coverTestNote: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.coverTestNote,
                rightPupils: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightPupils,
                leftPupils: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftPupils,
                pupilsNote: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.pupilsNote,
                rightConjunctiva: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightConjunctiva,
                leftConjunctiva: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftConjunctiva,
                rightCornea: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightCornea,
                leftCornea: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftCornea,
                rightCorneaSketch: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightCorneaSketch,
                leftCorneaSketch: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftCorneaSketch,
                rightSclera: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightSclera,
                leftSclera: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftSclera,
                rightAnteriorChamber: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightAnteriorChamber,
                leftAnteriorChamber: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftAnteriorChamber,
                rightIris: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightIris,
                leftIris: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftIris,
                rightLens: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightLens,
                leftLens: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftLens,
                rightLensSketch: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightLensSketch,
                leftLensSketch: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftLensSketch,
                rightVitreos: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightVitreos,
                leftVitreos: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftVitreos,
                slitLampExamNote: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.slitLampExamNote,
                rightRetina: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightRetina,
                leftRetina: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftRetina,
                rightRetinaSketch: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightRetinaSketch,
                leftRetinaSketch: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftRetinaSketch,
                funduscopyNote: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.funduscopyNote,
                rightCdr: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightCdr,
                leftCdr: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftCdr,
                rightOpticDisc: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightOpticDisc,
                leftOpticDisc: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftOpticDisc,
                rightOpticDiscSketch: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.rightOpticDiscSketch,
                leftOpticDiscSketch: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.leftOpticDiscSketch,
                opticDiscNote: opthalmologyForm === null || opthalmologyForm === void 0 ? void 0 : opthalmologyForm.opticDiscNote,
            });
        }
    }, [data]);
    const [save] = useMutation(SAVE_OPTHALMOLOGY_EXAM, {
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
    const handleChange = () => {
        clearTimeout(timer);
        const values = getValues();
        const isEmpty = _.values(values).every((v) => _.isEmpty(v));
        if (!isEmpty) {
            setModified(true);
            setShowExitPrompt(true);
        }
        setTimer(setTimeout(() => {
            if ((data === null || data === void 0 ? void 0 : data.opthalmologyExam.id) !== undefined && !isEmpty) {
                const input = Object.assign(Object.assign({}, values), { id: data === null || data === void 0 ? void 0 : data.opthalmologyExam.id });
                save({
                    variables: {
                        input,
                    },
                });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const handleSlitLampSketchChange = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            if ((data === null || data === void 0 ? void 0 : data.opthalmologyExam.id) !== undefined) {
                const currentValues = getValues();
                let input = Object.assign(Object.assign({}, currentValues), { id: data === null || data === void 0 ? void 0 : data.opthalmologyExam.id });
                if (rightCorneaSketchRef.current !== null) {
                    input.rightCorneaSketch = JSON.stringify(rightCorneaSketchRef.current.toJSON());
                }
                if (leftCorneaSketchRef.current !== null) {
                    input.leftCorneaSketch = JSON.stringify(leftCorneaSketchRef.current.toJSON());
                }
                if (rightLensSketchRef.current !== null) {
                    input.rightLensSketch = JSON.stringify(rightLensSketchRef.current.toJSON());
                }
                if (leftLensSketchRef.current !== null) {
                    input.leftLensSketch = JSON.stringify(leftLensSketchRef.current.toJSON());
                }
                save({ variables: { input } });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const handleFunduscopySketchChange = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            if ((data === null || data === void 0 ? void 0 : data.opthalmologyExam.id) !== undefined) {
                const currentValues = getValues();
                let input = Object.assign(Object.assign({}, currentValues), { id: data === null || data === void 0 ? void 0 : data.opthalmologyExam.id });
                if (rightRetinaSketchRef.current !== null) {
                    input.rightRetinaSketch = JSON.stringify(rightRetinaSketchRef.current.toJSON());
                }
                if (leftRetinaSketchRef.current !== null) {
                    input.leftRetinaSketch = JSON.stringify(leftRetinaSketchRef.current.toJSON());
                }
                save({ variables: { input } });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const handleOpticDiscSketchChange = () => {
        setModified(true);
        setShowExitPrompt(true);
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            if ((data === null || data === void 0 ? void 0 : data.opthalmologyExam.id) !== undefined) {
                const currentValues = getValues();
                let input = Object.assign(Object.assign({}, currentValues), { id: data === null || data === void 0 ? void 0 : data.opthalmologyExam.id });
                if (rightOpticDiscSketchRef.current !== null) {
                    input.rightOpticDiscSketch = JSON.stringify(rightOpticDiscSketchRef.current.toJSON());
                }
                if (leftOpticDiscSketchRef.current !== null) {
                    input.leftOpticDiscSketch = JSON.stringify(leftOpticDiscSketchRef.current.toJSON());
                }
                save({ variables: { input } });
            }
        }, AUTO_SAVE_INTERVAL));
    };
    const values = watch();
    return (_jsxs("div", Object.assign({ className: "container mx-auto bg-gray-50 rounded shadow-lg p-5" }, { children: [_jsx(Prompt, { when: modified, message: "This page has unsaved data. Please click cancel and try again" }, void 0),
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold" }, { children: "Physical Examination" }), void 0),
            _jsx("hr", { className: "mt-5" }, void 0),
            (error === null || error === void 0 ? void 0 : error.message) === "record not found" || loading ? (_jsx("div", Object.assign({ className: "flex justify-center mt-10 h-screen" }, { children: _jsx(ReactLoading, { type: "spinningBubbles", color: "gray", height: 70, width: 70, className: "inline-block" }, void 0) }), void 0)) : (_jsxs("div", Object.assign({ className: "grid grid-cols-6 gap-x-3 gap-y-7 mt-5" }, { children: [_jsx("div", { className: "col-span-1" }, void 0),
                    _jsx("div", Object.assign({ className: "col-span-5" }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-5 gap-3 justify-items-center" }, { children: [_jsx("div", {}, void 0),
                                _jsx("div", Object.assign({ className: "col-span-2" }, { children: "OD" }), void 0),
                                _jsx("div", Object.assign({ className: "col-span-2" }, { children: "OS" }), void 0)] }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "External Exam" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(ExternalExamComponent, { register: register, control: control, setValue: setValue, onChange: handleChange }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "Ocular Motility" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(OcularMotilityComponent, { register: register, control: control, setValue: setValue, values: values, onChange: handleChange }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "Cover Test" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(CoverTestComponent, { register: register, control: control, setValue: setValue, onChange: handleChange }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "Pupils" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(PupilsComponent, { register: register, control: control, setValue: setValue, onChange: handleChange }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "Slit Lamp Exam" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(SlitLampExamComponent, { register: register, control: control, setValue: setValue, rightCorneaSketchRef: rightCorneaSketchRef, leftCorneaSketchRef: leftCorneaSketchRef, rightLensSketchRef: rightLensSketchRef, leftLensSketchRef: leftLensSketchRef, rightCorneaSketch: data === null || data === void 0 ? void 0 : data.opthalmologyExam.rightCorneaSketch, leftCorneaSketch: data === null || data === void 0 ? void 0 : data.opthalmologyExam.leftCorneaSketch, rightLensSketch: data === null || data === void 0 ? void 0 : data.opthalmologyExam.rightLensSketch, leftLensSketch: data === null || data === void 0 ? void 0 : data.opthalmologyExam.leftLensSketch, onSketchChange: handleSlitLampSketchChange, onChange: handleChange }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "Funduscopy" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(FunduscopyComponent, { register: register, control: control, setValue: setValue, rightRetinaSketchRef: rightRetinaSketchRef, leftRetinaSketchRef: leftRetinaSketchRef, rightRetinaSketch: data === null || data === void 0 ? void 0 : data.opthalmologyExam.rightRetinaSketch, leftRetinaSketch: data === null || data === void 0 ? void 0 : data.opthalmologyExam.leftRetinaSketch, onSketchChange: handleFunduscopySketchChange, onChange: handleChange }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 justify-self-end text-gray-500 tracking-wide font-semibold" }, { children: "Optic Disc" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-5 border-l border-green-500" }, { children: _jsx(OpticDiscComponent, { register: register, control: control, setValue: setValue, rightOpticDiscSketchRef: rightOpticDiscSketchRef, leftOpticDiscSketchRef: leftOpticDiscSketchRef, rightOpticDiscSketch: data === null || data === void 0 ? void 0 : data.opthalmologyExam.rightOpticDiscSketch, leftOpticDiscSketch: data === null || data === void 0 ? void 0 : data.opthalmologyExam.leftOpticDiscSketch, onSketchChange: handleOpticDiscSketchChange, onChange: handleChange }, void 0) }), void 0)] }), void 0))] }), void 0));
};
export default OphthalmologyExamination;
