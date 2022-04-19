import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { OcularMotilityOdDiagram } from "./OcularMotilityDiagram/OcularMotilityOdDiagram";
import { OcularMotilityOsDiagram } from "./OcularMotilityDiagram/OcularMotilityOsDiagram";
import { SketchDiagram } from "./SketchDiagram";
import corneaImage from "../img/cornea.png";
import circleImage from "../img/circle.png";
import { LabComponent } from "./LabComponent";
import { MedicationTable } from "./MedicationTable";
import { EyeGlassTable } from "./EyeGlassTable";
import DiagnosticProcedureComponent from "./DiagnosticProcedureComponent";
import { SketchField, Tools } from "react-sketch2";
import { groupByHpiComponentType } from "../util";
export const GET_PATIENT_CHART = gql `
  query GetPatientChart($id: ID!, $details: Boolean) {
    patientChart(id: $id, details: $details) {
      id
      appointmentId
      diagnosisNote
      differentialDiagnosisNote
      chiefComplaintsNote
      stickieNote
      summaryNote
      rightSummarySketch
      leftSummarySketch
      rightSummarySketch
      leftSummarySketch
      medicalRecommendation
      sickLeave
      diagnosisNote
      differentialDiagnosisNote

      physicalExamFindings {
        id
        abnormal
        examCategory {
          id
          title
        }
        examCategoryId
        patientChartId
        note
      }

      diagnoses {
        id
        differential
        location
        categoryCode
        diagnosisCode
        fullCode
        fullDescription
      }

      chiefComplaints {
        id
        title
        hpiComponents {
          id
          title
          hpiComponentType {
            id
            title
          }
        }
      }

      vitalSigns {
        id
        temperature
        pulse
        bloodPressureSystolic
        bloodPressureDiastolic
        respiratoryRate
        oxygenSaturation
        height
        weight
        bmi
        rightDistanceUncorrected
        leftDistanceUncorrected
        rightDistancePinhole
        leftDistancePinhole
        rightDistanceCorrected
        leftDistanceCorrected
        rightNearUncorrected
        leftNearUncorrected
        rightNearPinhole
        leftNearPinhole
        rightNearCorrected
        leftNearCorrected
        rightApplanation
        leftApplanation
        rightTonopen
        leftTonopen
        rightDigital
        leftDigital
        rightNoncontact
        leftNoncontact
      }

      opthalmologyExam {
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

      diagnosticProcedureOrder {
        status
        createdAt
        diagnosticProcedures {
          id
          generalText
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
          status
          diagnosticProcedureTypeTitle
          diagnosticProcedureType {
            title
          }
          images {
            id
            size
            hash
            fileName
            extension
            contentType
            createdAt
          }
          documents {
            id
            size
            hash
            fileName
            extension
            contentType
            createdAt
          }
          payments {
            id
            status
          }
        }
      }

      labOrder {
        status
        createdAt
        labs {
          id
          generalText
          status
          labType {
            id
            title
          }
          rightEyeImages {
            id
            size
            hash
            fileName
            extension
            contentType
            createdAt
          }
          leftEyeImages {
            id
            size
            hash
            fileName
            extension
            contentType
            createdAt
          }
          rightEyeSketches {
            id
            size
            hash
            fileName
            extension
            contentType
            createdAt
          }
          leftEyeSketches {
            id
            size
            hash
            fileName
            extension
            contentType
            createdAt
          }
          images {
            id
            size
            hash
            fileName
            extension
            contentType
            createdAt
          }
          documents {
            id
            size
            hash
            fileName
            extension
            contentType
            createdAt
          }
          payments {
            id
            status
          }
        }
      }

      medicalPrescriptionOrder {
        id
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

      eyewearPrescriptionOrder {
        id
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

      surgicalProcedure {
        id
        surgicalProcedureTypeTitle
      }
      treatment {
        id
        treatmentTypeTitle
        receptionNote
        result
      }
    }
  }
`;
const GET_ORDERS = gql `
  query Orders($page: PaginationInput!, $filter: OrderFilterInput) {
    orders(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          user {
            id
            firstName
            lastName
          }
          firstName
          lastName
          phoneNo
          patientId
          emergency
          note
          status
          orderType
          payments {
            id
            invoiceNo
            status
            billing {
              id
              item
              code
              price
              credit
            }
          }
          createdAt
        }
      }
    }
  }
`;
const PositiveFindings = ({ patientChartId, forPrint = false, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137;
    const { data, refetch } = useQuery(GET_PATIENT_CHART, {
        variables: {
            id: patientChartId,
            details: true,
        },
    });
    useEffect(() => {
        refetch();
    }, []);
    const ordersQuery = useQuery(GET_ORDERS, {
        variables: {
            page: { page: 0, size: 100 },
            filter: {
                patientChartId,
            },
        },
    });
    const [selectedColor] = useState("#000000");
    const [selectedLineWeight] = useState(3);
    const patientChart = data === null || data === void 0 ? void 0 : data.patientChart;
    const ocularMotilityForm = useForm();
    const rightCorneaSketch = useRef(null);
    const leftCorneaSketch = useRef(null);
    const rightLensSketch = useRef(null);
    const leftLensSketch = useRef(null);
    const rightRetinaSketch = useRef(null);
    const leftRetinaSketch = useRef(null);
    const rightOpticDiscSketch = useRef(null);
    const leftOpticDiscSketch = useRef(null);
    const rightSummarySketch = useRef(null);
    const leftSummarySketch = useRef(null);
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        if (data === null || data === void 0 ? void 0 : data.patientChart.opthalmologyExam) {
            ocularMotilityForm.reset({
                rightOcularMotility: (_a = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _a === void 0 ? void 0 : _a.rightOcularMotility,
                leftOcularMotility: (_b = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _b === void 0 ? void 0 : _b.leftOcularMotility,
                rsr: (_c = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _c === void 0 ? void 0 : _c.rsr,
                rio: (_d = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _d === void 0 ? void 0 : _d.rio,
                rlr: (_e = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _e === void 0 ? void 0 : _e.rlr,
                rmr: (_f = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _f === void 0 ? void 0 : _f.rmr,
                rir: (_g = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _g === void 0 ? void 0 : _g.rir,
                rso: (_h = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _h === void 0 ? void 0 : _h.rso,
                rightFlick: (_j = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _j === void 0 ? void 0 : _j.rightFlick,
                lsr: (_k = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _k === void 0 ? void 0 : _k.lsr,
                lio: (_l = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _l === void 0 ? void 0 : _l.lio,
                llr: (_m = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _m === void 0 ? void 0 : _m.llr,
                lmr: (_o = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _o === void 0 ? void 0 : _o.lmr,
                lir: (_p = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _p === void 0 ? void 0 : _p.lir,
                lso: (_q = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _q === void 0 ? void 0 : _q.lso,
                leftFlick: (_r = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _r === void 0 ? void 0 : _r.leftFlick,
                distance: (_s = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _s === void 0 ? void 0 : _s.distance,
                near: (_t = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _t === void 0 ? void 0 : _t.near,
                ocularMotilityNote: (_u = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _u === void 0 ? void 0 : _u.ocularMotilityNote,
            });
        }
    }, [data]);
    if (!patientChart) {
        return _jsx("div", {}, void 0);
    }
    const hasVisionDistance = ((_a = patientChart.vitalSigns) === null || _a === void 0 ? void 0 : _a.rightDistanceUncorrected) || ((_b = patientChart.vitalSigns) === null || _b === void 0 ? void 0 : _b.leftDistanceUncorrected) || ((_c = patientChart.vitalSigns) === null || _c === void 0 ? void 0 : _c.rightDistancePinhole) || ((_d = patientChart.vitalSigns) === null || _d === void 0 ? void 0 : _d.leftDistancePinhole) || ((_e = patientChart.vitalSigns) === null || _e === void 0 ? void 0 : _e.rightDistanceCorrected) || ((_f = patientChart.vitalSigns) === null || _f === void 0 ? void 0 : _f.leftDistanceCorrected);
    const hasVisionNear = ((_g = patientChart.vitalSigns) === null || _g === void 0 ? void 0 : _g.rightNearUncorrected) || ((_h = patientChart.vitalSigns) === null || _h === void 0 ? void 0 : _h.leftNearUncorrected) || ((_j = patientChart.vitalSigns) === null || _j === void 0 ? void 0 : _j.rightNearPinhole) || ((_k = patientChart.vitalSigns) === null || _k === void 0 ? void 0 : _k.leftNearPinhole) || ((_l = patientChart.vitalSigns) === null || _l === void 0 ? void 0 : _l.rightNearCorrected) || ((_m = patientChart.vitalSigns) === null || _m === void 0 ? void 0 : _m.leftNearCorrected);
    const hasiopApplanation = ((_o = patientChart.vitalSigns) === null || _o === void 0 ? void 0 : _o.rightApplanation) || ((_p = patientChart.vitalSigns) === null || _p === void 0 ? void 0 : _p.leftApplanation);
    const hasiopTonopen = ((_q = patientChart.vitalSigns) === null || _q === void 0 ? void 0 : _q.rightTonopen) || ((_r = patientChart.vitalSigns) === null || _r === void 0 ? void 0 : _r.leftTonopen);
    const hasiopDigital = ((_s = patientChart.vitalSigns) === null || _s === void 0 ? void 0 : _s.rightDigital) || ((_t = patientChart.vitalSigns) === null || _t === void 0 ? void 0 : _t.leftDigital);
    const hasiopNoncontact = ((_u = patientChart.vitalSigns) === null || _u === void 0 ? void 0 : _u.rightNoncontact) || ((_v = patientChart.vitalSigns) === null || _v === void 0 ? void 0 : _v.leftNoncontact);
    const hasTemperature = (_w = patientChart.vitalSigns) === null || _w === void 0 ? void 0 : _w.temperature;
    const hasPulse = (_x = patientChart.vitalSigns) === null || _x === void 0 ? void 0 : _x.pulse;
    const hasBloodPressure = ((_y = patientChart.vitalSigns) === null || _y === void 0 ? void 0 : _y.bloodPressureSystolic) || ((_z = patientChart.vitalSigns) === null || _z === void 0 ? void 0 : _z.bloodPressureDiastolic);
    const hasRespiratoryRate = (_0 = patientChart.vitalSigns) === null || _0 === void 0 ? void 0 : _0.respiratoryRate;
    const hasOxygenSaturation = (_1 = patientChart.vitalSigns) === null || _1 === void 0 ? void 0 : _1.oxygenSaturation;
    const hasHeight = (_2 = patientChart.vitalSigns) === null || _2 === void 0 ? void 0 : _2.height;
    const hasWeight = (_3 = patientChart.vitalSigns) === null || _3 === void 0 ? void 0 : _3.weight;
    const hasBmi = (_4 = patientChart.vitalSigns) === null || _4 === void 0 ? void 0 : _4.bmi;
    const hasExternalExamLacrimal = ((_5 = patientChart.opthalmologyExam) === null || _5 === void 0 ? void 0 : _5.leftLacrimalSystem) || ((_6 = patientChart.opthalmologyExam) === null || _6 === void 0 ? void 0 : _6.rightLacrimalSystem);
    const hasExternalExamLids = ((_7 = patientChart.opthalmologyExam) === null || _7 === void 0 ? void 0 : _7.leftLids) || ((_8 = patientChart.opthalmologyExam) === null || _8 === void 0 ? void 0 : _8.rightLids);
    const hasExternalExamOrbits = ((_9 = patientChart.opthalmologyExam) === null || _9 === void 0 ? void 0 : _9.rightOrbits) || ((_10 = patientChart.opthalmologyExam) === null || _10 === void 0 ? void 0 : _10.leftOrbits);
    const hasExternalExamNote = (_11 = patientChart.opthalmologyExam) === null || _11 === void 0 ? void 0 : _11.externalExamNote;
    const hasOcularMotility = (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rightOcularMotility) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.leftOcularMotility);
    const hasOcularMotilityDiagram = (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rsr) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rio) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rlr) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rmr) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rir) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rso) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rightFlick) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.lsr) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.lio) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.llr) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.lmr) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.lir) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.lso) || (patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.leftFlick);
    const hasOcularMotilityDistance = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.distance;
    const hasOcularMotilityNear = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.near;
    const hasOcularMotilityNote = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.ocularMotilityNote;
    const ocularMotilityValues = ocularMotilityForm.watch();
    const hasCoverTest = patientChart.opthalmologyExam.rightCoverTest ||
        patientChart.opthalmologyExam.leftCoverTest;
    const hasCoverTestNote = patientChart.opthalmologyExam.coverTestNote;
    const hasPupils = patientChart.opthalmologyExam.rightPupils ||
        patientChart.opthalmologyExam.leftPupils;
    const hasPupilsNote = patientChart.opthalmologyExam.pupilsNote;
    const hasSlitLampConjuctiva = patientChart.opthalmologyExam.rightConjunctiva ||
        patientChart.opthalmologyExam.leftConjunctiva;
    const hasSlitLampCornea = patientChart.opthalmologyExam.rightCornea ||
        patientChart.opthalmologyExam.leftCornea;
    const hasSlitLampCorneaSketch = (patientChart.opthalmologyExam.rightCorneaSketch &&
        JSON.parse(patientChart.opthalmologyExam.rightCorneaSketch).objects
            .length > 0) ||
        (patientChart.opthalmologyExam.leftCorneaSketch &&
            JSON.parse(patientChart.opthalmologyExam.leftCorneaSketch).objects
                .length > 0);
    const hasSlitLampLensSketch = (patientChart.opthalmologyExam.rightLensSketch &&
        JSON.parse(patientChart.opthalmologyExam.rightLensSketch).objects.length >
            0) ||
        (patientChart.opthalmologyExam.leftLensSketch &&
            JSON.parse(patientChart.opthalmologyExam.leftLensSketch).objects.length >
                0);
    const hasSlitLampSclera = patientChart.opthalmologyExam.rightSclera ||
        patientChart.opthalmologyExam.leftSclera;
    const hasSlitLampAnteriorChamber = patientChart.opthalmologyExam.rightAnteriorChamber ||
        patientChart.opthalmologyExam.leftAnteriorChamber;
    const hasSlitLampIris = patientChart.opthalmologyExam.rightIris ||
        patientChart.opthalmologyExam.leftIris;
    const hasSlitLampLens = patientChart.opthalmologyExam.rightLens ||
        patientChart.opthalmologyExam.leftLens;
    const hasSlitLampVitreos = patientChart.opthalmologyExam.rightVitreos ||
        patientChart.opthalmologyExam.leftVitreos;
    const hasSlitLampNote = patientChart.opthalmologyExam.slitLampExamNote;
    const hasFunduscopyRetina = patientChart.opthalmologyExam.rightRetina ||
        patientChart.opthalmologyExam.leftRetina;
    const hasFunduscopyRetinaSketch = (patientChart.opthalmologyExam.rightRetinaSketch &&
        JSON.parse(patientChart.opthalmologyExam.rightRetinaSketch).objects
            .length > 0) ||
        (patientChart.opthalmologyExam.leftRetinaSketch &&
            JSON.parse(patientChart.opthalmologyExam.leftRetinaSketch).objects
                .length > 0);
    const hasFunduscopyNote = patientChart.opthalmologyExam.funduscopyNote;
    const hasOpticDiscCdr = patientChart.opthalmologyExam.rightCdr ||
        patientChart.opthalmologyExam.leftCdr;
    const hasOpticDisc = patientChart.opthalmologyExam.rightOpticDisc ||
        patientChart.opthalmologyExam.leftOpticDisc;
    const hasOpticDiscSketch = (patientChart.opthalmologyExam.rightOpticDiscSketch &&
        JSON.parse(patientChart.opthalmologyExam.rightOpticDiscSketch).objects
            .length > 0) ||
        (patientChart.opthalmologyExam.leftOpticDiscSketch &&
            JSON.parse(patientChart.opthalmologyExam.leftOpticDiscSketch).objects
                .length > 0);
    const hasOpticDiscNote = patientChart.opthalmologyExam.opticDiscNote;
    const hasDiagnosis = patientChart.diagnoses.length > 0 ||
        ((_13 = (_12 = patientChart.diagnosisNote) === null || _12 === void 0 ? void 0 : _12.length) !== null && _13 !== void 0 ? _13 : 0) > 0 ||
        ((_15 = (_14 = patientChart.differentialDiagnosisNote) === null || _14 === void 0 ? void 0 : _14.length) !== null && _15 !== void 0 ? _15 : 0) > 0;
    const hasSummaryNote = patientChart.summaryNote;
    const hasSummaryNoteSketch = (patientChart.rightSummarySketch &&
        JSON.parse(patientChart.rightSummarySketch).objects.length > 0) ||
        (patientChart.leftSummarySketch &&
            JSON.parse(patientChart.leftSummarySketch).objects.length > 0);
    const getOrderTypeName = (orderType) => {
        switch (orderType) {
            case "FOLLOW_UP":
                return "Follow-Up";
            case "PATIENT_IN_HOUSE_REFERRAL":
                return "In-House Referral";
            case "PATIENT_OUTSOURCE_REFERRAL":
                return "Outsourced Referral";
            case "TREATMENT":
                return "Treatment";
            case "SURGICAL_PROCEDURE":
                return "Surgery";
            default:
                return "";
        }
    };
    return (_jsxs("div", Object.assign({ className: "text-sm print-container" }, { children: [((_16 = patientChart.chiefComplaints) === null || _16 === void 0 ? void 0 : _16.length) > 0 && (_jsxs("div", { children: [_jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "format_list_bulleted" }), void 0) }, void 0),
                                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Chief complaints" }), void 0)] }), void 0),
                            _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
                    _jsxs("div", Object.assign({ className: "mt-1 ml-2" }, { children: [patientChart.chiefComplaints.map((e) => {
                                var _a;
                                return (_jsxs("div", Object.assign({ className: "pl-4 border-l border-indigo-600 mt-3" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: e === null || e === void 0 ? void 0 : e.title }), void 0),
                                        _jsx("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: (_a = groupByHpiComponentType(e === null || e === void 0 ? void 0 : e.hpiComponents)) === null || _a === void 0 ? void 0 : _a.map((q) => (_jsx("li", { children: `${q[0]}: ${q[1]
                                                    .map((h) => h === null || h === void 0 ? void 0 : h.title.trim())
                                                    .join(", ")}` }, q[0]))) }), void 0)] }), e === null || e === void 0 ? void 0 : e.id));
                            }),
                            patientChart.chiefComplaintsNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.chiefComplaintsNote }), void 0))] }), void 0)] }, void 0)),
            _jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "show_chart" }), void 0) }, void 0),
                            _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Vital Signs" }), void 0)] }), void 0),
                    _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "ml-2" }, { children: [(hasVisionDistance || hasVisionNear) && (_jsxs("div", Object.assign({ className: "text-sm mt-2 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Visual Acuity" }), void 0),
                            _jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [hasVisionDistance && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "" }, { children: "Distance" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_17 = patientChart.vitalSigns) === null || _17 === void 0 ? void 0 : _17.rightDistanceUncorrected) && (_jsx("li", { children: `Uncorrected (OD): ${(_18 = patientChart.vitalSigns) === null || _18 === void 0 ? void 0 : _18.rightDistanceUncorrected}` }, void 0)),
                                                    ((_19 = patientChart.vitalSigns) === null || _19 === void 0 ? void 0 : _19.leftDistanceUncorrected) && (_jsx("li", { children: `Uncorrected (OS): ${(_20 = patientChart.vitalSigns) === null || _20 === void 0 ? void 0 : _20.leftDistanceUncorrected}` }, void 0)),
                                                    ((_21 = patientChart.vitalSigns) === null || _21 === void 0 ? void 0 : _21.rightDistanceCorrected) && (_jsx("li", { children: `Corrected (OD): ${(_22 = patientChart.vitalSigns) === null || _22 === void 0 ? void 0 : _22.rightDistanceCorrected}` }, void 0)),
                                                    ((_23 = patientChart.vitalSigns) === null || _23 === void 0 ? void 0 : _23.leftDistanceCorrected) && (_jsx("li", { children: `Corrected (OS): ${(_24 = patientChart.vitalSigns) === null || _24 === void 0 ? void 0 : _24.leftDistanceCorrected}` }, void 0)),
                                                    ((_25 = patientChart.vitalSigns) === null || _25 === void 0 ? void 0 : _25.rightDistancePinhole) && (_jsx("li", { children: `Pinhole (OD): ${(_26 = patientChart.vitalSigns) === null || _26 === void 0 ? void 0 : _26.rightDistancePinhole}` }, void 0)),
                                                    ((_27 = patientChart.vitalSigns) === null || _27 === void 0 ? void 0 : _27.leftDistancePinhole) && (_jsx("li", { children: `Pinhole (OS): ${(_28 = patientChart.vitalSigns) === null || _28 === void 0 ? void 0 : _28.leftDistancePinhole}` }, void 0))] }), void 0)] }, void 0)),
                                    hasVisionNear && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "" }, { children: "Near" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_29 = patientChart.vitalSigns) === null || _29 === void 0 ? void 0 : _29.rightNearUncorrected) && (_jsx("li", { children: `Uncorrected (OD): ${(_30 = patientChart.vitalSigns) === null || _30 === void 0 ? void 0 : _30.rightNearUncorrected}` }, void 0)),
                                                    ((_31 = patientChart.vitalSigns) === null || _31 === void 0 ? void 0 : _31.leftNearUncorrected) && (_jsx("li", { children: `Uncorrected (OS): ${(_32 = patientChart.vitalSigns) === null || _32 === void 0 ? void 0 : _32.leftNearUncorrected}` }, void 0)),
                                                    ((_33 = patientChart.vitalSigns) === null || _33 === void 0 ? void 0 : _33.rightNearCorrected) && (_jsx("li", { children: `Corrected (OD): ${(_34 = patientChart.vitalSigns) === null || _34 === void 0 ? void 0 : _34.rightNearCorrected}` }, void 0)),
                                                    ((_35 = patientChart.vitalSigns) === null || _35 === void 0 ? void 0 : _35.leftNearCorrected) && (_jsx("li", { children: `Corrected (OS): ${(_36 = patientChart.vitalSigns) === null || _36 === void 0 ? void 0 : _36.leftNearCorrected}` }, void 0)),
                                                    ((_37 = patientChart.vitalSigns) === null || _37 === void 0 ? void 0 : _37.rightNearPinhole) && (_jsx("li", { children: `Pinhole (OD): ${(_38 = patientChart.vitalSigns) === null || _38 === void 0 ? void 0 : _38.rightNearPinhole}` }, void 0)),
                                                    ((_39 = patientChart.vitalSigns) === null || _39 === void 0 ? void 0 : _39.leftNearPinhole) && (_jsx("li", { children: `Pinhole (OS): ${(_40 = patientChart.vitalSigns) === null || _40 === void 0 ? void 0 : _40.leftNearPinhole}` }, void 0))] }), void 0)] }, void 0))] }), void 0)] }), void 0)),
                    (hasiopApplanation ||
                        hasiopTonopen ||
                        hasiopDigital ||
                        hasiopNoncontact) && (_jsxs("div", Object.assign({ className: "text-sm mt-2 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "IOP" }), void 0),
                            hasiopApplanation && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Applanation" }), void 0),
                                    _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_41 = patientChart.vitalSigns) === null || _41 === void 0 ? void 0 : _41.rightApplanation) && (_jsx("li", { children: `OD: ${(_42 = patientChart.vitalSigns) === null || _42 === void 0 ? void 0 : _42.rightApplanation}` }, void 0)),
                                            ((_43 = patientChart.vitalSigns) === null || _43 === void 0 ? void 0 : _43.leftApplanation) && (_jsx("li", { children: `OS: ${(_44 = patientChart.vitalSigns) === null || _44 === void 0 ? void 0 : _44.leftApplanation}` }, void 0))] }), void 0)] }), void 0)),
                            hasiopTonopen && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Tonopen" }), void 0),
                                    _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_45 = patientChart.vitalSigns) === null || _45 === void 0 ? void 0 : _45.rightTonopen) && (_jsx("li", { children: `OD: ${(_46 = patientChart.vitalSigns) === null || _46 === void 0 ? void 0 : _46.rightTonopen}` }, void 0)),
                                            ((_47 = patientChart.vitalSigns) === null || _47 === void 0 ? void 0 : _47.leftTonopen) && (_jsx("li", { children: `OS: ${(_48 = patientChart.vitalSigns) === null || _48 === void 0 ? void 0 : _48.leftTonopen}` }, void 0))] }), void 0)] }), void 0)),
                            hasiopDigital && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Digital" }), void 0),
                                    _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_49 = patientChart.vitalSigns) === null || _49 === void 0 ? void 0 : _49.rightDigital) && (_jsx("li", { children: `OD: ${(_50 = patientChart.vitalSigns) === null || _50 === void 0 ? void 0 : _50.rightDigital}` }, void 0)),
                                            ((_51 = patientChart.vitalSigns) === null || _51 === void 0 ? void 0 : _51.leftDigital) && (_jsx("li", { children: `OS: ${(_52 = patientChart.vitalSigns) === null || _52 === void 0 ? void 0 : _52.leftDigital}` }, void 0))] }), void 0)] }), void 0)),
                            hasiopNoncontact && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Non-Contact" }), void 0),
                                    _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_53 = patientChart.vitalSigns) === null || _53 === void 0 ? void 0 : _53.rightNoncontact) && (_jsx("li", { children: `OD: ${(_54 = patientChart.vitalSigns) === null || _54 === void 0 ? void 0 : _54.rightNoncontact}` }, void 0)),
                                            ((_55 = patientChart.vitalSigns) === null || _55 === void 0 ? void 0 : _55.leftNoncontact) && (_jsx("li", { children: `OS: ${(_56 = patientChart.vitalSigns) === null || _56 === void 0 ? void 0 : _56.leftNoncontact}` }, void 0))] }), void 0)] }), void 0))] }), void 0)),
                    hasTemperature && (_jsxs("div", Object.assign({ className: "text-sm mt-2 pl-4 border-l border-indigo-600" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Temperature: " }), void 0), " ", _jsx("span", { children: `${(_57 = patientChart.vitalSigns) === null || _57 === void 0 ? void 0 : _57.temperature} C°` }, void 0)] }), void 0)),
                    hasPulse && (_jsxs("div", Object.assign({ className: "text-sm mt-1 pl-4 border-l border-indigo-600" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Pulse: " }), void 0), " ", _jsx("span", { children: `${(_58 = patientChart.vitalSigns) === null || _58 === void 0 ? void 0 : _58.pulse} bpm` }, void 0)] }), void 0)),
                    hasBloodPressure && (_jsxs("div", Object.assign({ className: "text-sm mt-1 pl-4 border-l border-indigo-600" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Blood Pressure: " }), void 0), " ", _jsx("span", { children: `${(_59 = patientChart.vitalSigns) === null || _59 === void 0 ? void 0 : _59.bloodPressureSystolic} / ${(_60 = patientChart.vitalSigns) === null || _60 === void 0 ? void 0 : _60.bloodPressureDiastolic}` }, void 0)] }), void 0)),
                    hasRespiratoryRate && (_jsxs("div", Object.assign({ className: "text-sm mt-1 pl-4 border-l border-indigo-600" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Respiratory Rate: " }), void 0), " ", _jsx("span", { children: `${(_61 = patientChart.vitalSigns) === null || _61 === void 0 ? void 0 : _61.respiratoryRate} rpm` }, void 0)] }), void 0)),
                    hasOxygenSaturation && (_jsxs("div", Object.assign({ className: "text-sm mt-1 pl-4 border-l border-indigo-600" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Oxygen Saturation: " }), void 0), " ", _jsx("span", { children: `${(_62 = patientChart.vitalSigns) === null || _62 === void 0 ? void 0 : _62.oxygenSaturation}%` }, void 0)] }), void 0)),
                    hasHeight && (_jsxs("div", Object.assign({ className: "text-sm mt-1 pl-4 border-l border-indigo-600" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Height: " }), void 0), " ", _jsx("span", { children: `${(_63 = patientChart.vitalSigns) === null || _63 === void 0 ? void 0 : _63.height} cm` }, void 0)] }), void 0)),
                    hasWeight && (_jsxs("div", Object.assign({ className: "text-sm mt-1 pl-4 border-l border-indigo-600" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Weight: " }), void 0), " ", _jsx("span", { children: `${(_64 = patientChart.vitalSigns) === null || _64 === void 0 ? void 0 : _64.weight} kg` }, void 0)] }), void 0)),
                    hasBmi && (_jsxs("div", Object.assign({ className: "text-sm mt-1 pl-4 border-l border-indigo-600" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "BMI: " }), void 0), " ", _jsx("span", { children: `${(_65 = patientChart.vitalSigns) === null || _65 === void 0 ? void 0 : _65.bmi}` }, void 0)] }), void 0))] }), void 0),
            _jsx("div", { className: "page-break" }, void 0),
            _jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "find_in_page" }), void 0) }, void 0),
                            _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Physical Examination" }), void 0)] }), void 0),
                    _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "ml-2" }, { children: [_jsx("ul", Object.assign({ className: "list-inside list-disc pl-4 border-l border-indigo-600" }, { children: patientChart.physicalExamFindings.map((e) => (_jsxs("li", { children: [_jsxs("span", Object.assign({ className: "font-semibold" }, { children: [e === null || e === void 0 ? void 0 : e.examCategory.title, ": "] }), void 0),
                                _jsx("span", { children: `${(e === null || e === void 0 ? void 0 : e.abnormal) ? "Abnormal, " : "Normal, "} ${e === null || e === void 0 ? void 0 : e.note}` }, void 0)] }, e === null || e === void 0 ? void 0 : e.id))) }), void 0),
                    (hasExternalExamLacrimal ||
                        hasExternalExamLids ||
                        hasExternalExamOrbits ||
                        hasExternalExamNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "External Exam" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasExternalExamLacrimal && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Lacrimal System" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [patientChart.opthalmologyExam.rightLacrimalSystem && (_jsx("li", { children: `OD: ${(_66 = patientChart.opthalmologyExam) === null || _66 === void 0 ? void 0 : _66.rightLacrimalSystem}` }, void 0)),
                                                    ((_67 = patientChart.opthalmologyExam) === null || _67 === void 0 ? void 0 : _67.leftLacrimalSystem) && (_jsx("li", { children: `OS: ${(_68 = patientChart.opthalmologyExam) === null || _68 === void 0 ? void 0 : _68.leftLacrimalSystem}` }, void 0))] }), void 0)] }), void 0)),
                                    hasExternalExamLids && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Lids" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [patientChart.opthalmologyExam.rightLids && (_jsx("li", { children: `OD: ${(_69 = patientChart.opthalmologyExam) === null || _69 === void 0 ? void 0 : _69.rightLids}` }, void 0)),
                                                    ((_70 = patientChart.opthalmologyExam) === null || _70 === void 0 ? void 0 : _70.leftLids) && (_jsx("li", { children: `OS: ${(_71 = patientChart.opthalmologyExam) === null || _71 === void 0 ? void 0 : _71.leftLids}` }, void 0))] }), void 0)] }), void 0)),
                                    hasExternalExamOrbits && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Orbits" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [patientChart.opthalmologyExam.rightOrbits && (_jsx("li", { children: `OD: ${(_72 = patientChart.opthalmologyExam) === null || _72 === void 0 ? void 0 : _72.rightOrbits}` }, void 0)),
                                                    ((_73 = patientChart.opthalmologyExam) === null || _73 === void 0 ? void 0 : _73.leftOrbits) && (_jsx("li", { children: `OS: ${(_74 = patientChart.opthalmologyExam) === null || _74 === void 0 ? void 0 : _74.leftOrbits}` }, void 0))] }), void 0)] }), void 0)),
                                    hasExternalExamNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.externalExamNote }), void 0))] }), void 0)] }), void 0)),
                    (hasOcularMotility ||
                        hasOcularMotilityDistance ||
                        hasOcularMotilityNear ||
                        hasOcularMotilityNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Ocular Motility" }), void 0),
                            hasOcularMotilityDiagram && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                            _jsx(OcularMotilityOdDiagram, { register: ocularMotilityForm.register, readOnly: true, values: ocularMotilityValues, onChange: () => { } }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                            _jsx(OcularMotilityOsDiagram, { register: ocularMotilityForm.register, readOnly: true, values: ocularMotilityValues, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasOcularMotility && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Ocular Motility" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [(patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rightOcularMotility) && (_jsx("li", { children: `OD: ${(_75 = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _75 === void 0 ? void 0 : _75.rightOcularMotility}` }, void 0)),
                                                    ((_76 = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _76 === void 0 ? void 0 : _76.leftOcularMotility) && (_jsx("li", { children: `OS: ${(_77 = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _77 === void 0 ? void 0 : _77.leftOcularMotility}` }, void 0))] }), void 0)] }), void 0)),
                                    hasOcularMotilityDistance && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: ["Distance: ", patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.distance] }), void 0)),
                                    hasOcularMotilityNear && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: ["Distance: ", patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.near] }), void 0)),
                                    hasOcularMotilityNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.ocularMotilityNote }), void 0))] }), void 0)] }), void 0)),
                    (hasCoverTest || hasCoverTestNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Cover Test" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasCoverTest && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Cover Test" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_78 = patientChart.opthalmologyExam) === null || _78 === void 0 ? void 0 : _78.rightCoverTest) && (_jsx("li", { children: `OD: ${(_79 = patientChart.opthalmologyExam) === null || _79 === void 0 ? void 0 : _79.rightCoverTest}` }, void 0)),
                                                    ((_80 = patientChart.opthalmologyExam) === null || _80 === void 0 ? void 0 : _80.leftCoverTest) && (_jsx("li", { children: `OS: ${(_81 = patientChart.opthalmologyExam) === null || _81 === void 0 ? void 0 : _81.leftCoverTest}` }, void 0))] }), void 0)] }), void 0)),
                                    hasCoverTestNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.coverTestNote }), void 0))] }), void 0)] }), void 0)),
                    (hasPupils || hasPupils) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Pupils" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasPupils && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Pupils" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_82 = patientChart.opthalmologyExam) === null || _82 === void 0 ? void 0 : _82.rightPupils) && (_jsx("li", { children: `OD: ${(_83 = patientChart.opthalmologyExam) === null || _83 === void 0 ? void 0 : _83.rightPupils}` }, void 0)),
                                                    ((_84 = patientChart.opthalmologyExam) === null || _84 === void 0 ? void 0 : _84.leftPupils) && (_jsx("li", { children: `OS: ${(_85 = patientChart.opthalmologyExam) === null || _85 === void 0 ? void 0 : _85.leftPupils}` }, void 0))] }), void 0)] }), void 0)),
                                    hasPupilsNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.pupilsNote }), void 0))] }), void 0)] }), void 0)),
                    (hasSlitLampConjuctiva ||
                        hasSlitLampCornea ||
                        hasSlitLampCorneaSketch ||
                        hasSlitLampSclera ||
                        hasSlitLampAnteriorChamber ||
                        hasSlitLampIris ||
                        hasSlitLampLens ||
                        hasSlitLampLensSketch ||
                        hasSlitLampVitreos ||
                        hasSlitLampNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Slit Lamp Exam" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasSlitLampConjuctiva && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Conjuctiva" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_86 = patientChart.opthalmologyExam) === null || _86 === void 0 ? void 0 : _86.rightConjunctiva) && (_jsx("li", { children: `OD: ${(_87 = patientChart.opthalmologyExam) === null || _87 === void 0 ? void 0 : _87.rightConjunctiva}` }, void 0)),
                                                    ((_88 = patientChart.opthalmologyExam) === null || _88 === void 0 ? void 0 : _88.leftConjunctiva) && (_jsx("li", { children: `OS: ${(_89 = patientChart.opthalmologyExam) === null || _89 === void 0 ? void 0 : _89.leftConjunctiva}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampCorneaSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                                    _jsx(SketchDiagram, { alt: "Right Cornea", refValue: rightCorneaSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "18em", height: "11rem", image: corneaImage, imageClassname: "w-64 h-48", value: patientChart.opthalmologyExam.rightCorneaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                                            _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                                    _jsx(SketchDiagram, { alt: "Left Cornea", refValue: leftCorneaSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "18em", height: "11rem", image: corneaImage, imageClassname: "w-64 h-48", value: patientChart.opthalmologyExam.leftCorneaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                                    hasSlitLampCornea && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Cornea" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_90 = patientChart.opthalmologyExam) === null || _90 === void 0 ? void 0 : _90.rightCornea) && (_jsx("li", { children: `OD: ${(_91 = patientChart.opthalmologyExam) === null || _91 === void 0 ? void 0 : _91.rightCornea}` }, void 0)),
                                                    ((_92 = patientChart.opthalmologyExam) === null || _92 === void 0 ? void 0 : _92.leftCornea) && (_jsx("li", { children: `OS: ${(_93 = patientChart.opthalmologyExam) === null || _93 === void 0 ? void 0 : _93.leftCornea}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampSclera && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Sclera" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_94 = patientChart.opthalmologyExam) === null || _94 === void 0 ? void 0 : _94.rightSclera) && (_jsx("li", { children: `OD: ${(_95 = patientChart.opthalmologyExam) === null || _95 === void 0 ? void 0 : _95.rightSclera}` }, void 0)),
                                                    ((_96 = patientChart.opthalmologyExam) === null || _96 === void 0 ? void 0 : _96.leftSclera) && (_jsx("li", { children: `OS: ${(_97 = patientChart.opthalmologyExam) === null || _97 === void 0 ? void 0 : _97.leftSclera}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampAnteriorChamber && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Anterior Chamber" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_98 = patientChart.opthalmologyExam) === null || _98 === void 0 ? void 0 : _98.rightAnteriorChamber) && (_jsx("li", { children: `OD: ${(_99 = patientChart.opthalmologyExam) === null || _99 === void 0 ? void 0 : _99.rightAnteriorChamber}` }, void 0)),
                                                    ((_100 = patientChart.opthalmologyExam) === null || _100 === void 0 ? void 0 : _100.leftAnteriorChamber) && (_jsx("li", { children: `OS: ${(_101 = patientChart.opthalmologyExam) === null || _101 === void 0 ? void 0 : _101.leftAnteriorChamber}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampIris && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Iris" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_102 = patientChart.opthalmologyExam) === null || _102 === void 0 ? void 0 : _102.rightIris) && (_jsx("li", { children: `OD: ${(_103 = patientChart.opthalmologyExam) === null || _103 === void 0 ? void 0 : _103.rightIris}` }, void 0)),
                                                    ((_104 = patientChart.opthalmologyExam) === null || _104 === void 0 ? void 0 : _104.leftIris) && (_jsx("li", { children: `OS: ${(_105 = patientChart.opthalmologyExam) === null || _105 === void 0 ? void 0 : _105.leftIris}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampLensSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                                    _jsx("div", Object.assign({ className: "outer-circle" }, { children: _jsx("div", Object.assign({ className: "inner-circle" }, { children: _jsx(SketchField, { ref: rightLensSketch, width: "150px", height: "150px", className: "sketch-field", tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: patientChart.opthalmologyExam.rightLensSketch, disabled: true, onChange: () => { } }, void 0) }), void 0) }), void 0)] }, void 0),
                                            _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                                    _jsx("div", Object.assign({ className: "outer-circle" }, { children: _jsx("div", Object.assign({ className: "inner-circle" }, { children: _jsx(SketchField, { ref: leftLensSketch, width: "150px", height: "150px", className: "sketch-field", tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: patientChart.opthalmologyExam.leftLensSketch, disabled: true, onChange: () => { } }, void 0) }), void 0) }), void 0)] }, void 0)] }), void 0)),
                                    hasSlitLampLens && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Lens" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_106 = patientChart.opthalmologyExam) === null || _106 === void 0 ? void 0 : _106.rightLens) && (_jsx("li", { children: `OD: ${(_107 = patientChart.opthalmologyExam) === null || _107 === void 0 ? void 0 : _107.rightLens}` }, void 0)),
                                                    ((_108 = patientChart.opthalmologyExam) === null || _108 === void 0 ? void 0 : _108.leftLens) && (_jsx("li", { children: `OS: ${(_109 = patientChart.opthalmologyExam) === null || _109 === void 0 ? void 0 : _109.leftLens}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampVitreos && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Vitreos" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_110 = patientChart.opthalmologyExam) === null || _110 === void 0 ? void 0 : _110.rightVitreos) && (_jsx("li", { children: `OD: ${(_111 = patientChart.opthalmologyExam) === null || _111 === void 0 ? void 0 : _111.rightVitreos}` }, void 0)),
                                                    ((_112 = patientChart.opthalmologyExam) === null || _112 === void 0 ? void 0 : _112.leftVitreos) && (_jsx("li", { children: `OS: ${(_113 = patientChart.opthalmologyExam) === null || _113 === void 0 ? void 0 : _113.leftVitreos}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.slitLampExamNote }), void 0))] }), void 0)] }), void 0)),
                    (hasFunduscopyRetina ||
                        hasFunduscopyRetinaSketch ||
                        hasFunduscopyNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Funduscopy" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasFunduscopyRetina && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Retina" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_114 = patientChart.opthalmologyExam) === null || _114 === void 0 ? void 0 : _114.rightRetina) && (_jsx("li", { children: `OD: ${(_115 = patientChart.opthalmologyExam) === null || _115 === void 0 ? void 0 : _115.rightRetina}` }, void 0)),
                                                    ((_116 = patientChart.opthalmologyExam) === null || _116 === void 0 ? void 0 : _116.leftRetina) && (_jsx("li", { children: `OS: ${(_117 = patientChart.opthalmologyExam) === null || _117 === void 0 ? void 0 : _117.leftRetina}` }, void 0))] }), void 0)] }), void 0)),
                                    hasFunduscopyRetinaSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                                    _jsx(SketchField, { ref: rightRetinaSketch, width: "200px", height: "200px", style: {
                                                            border: "1px solid #7F7F7F",
                                                            borderRadius: "50%",
                                                        }, tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: patientChart.opthalmologyExam.rightRetinaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                                            _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                                    _jsx(SketchField, { ref: leftRetinaSketch, width: "200px", height: "200px", style: {
                                                            border: "1px solid #7F7F7F",
                                                            borderRadius: "50%",
                                                        }, tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: patientChart.opthalmologyExam.leftRetinaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                                    hasFunduscopyNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.funduscopyNote }), void 0))] }), void 0)] }), void 0)),
                    (hasOpticDisc ||
                        hasOpticDiscSketch ||
                        hasOpticDiscCdr ||
                        hasOpticDiscNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Optic Disc" }), void 0),
                            hasOpticDiscSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                            _jsx(SketchField, { ref: rightOpticDiscSketch, width: "150px", height: "150px", style: {
                                                    border: "1px solid #7F7F7F",
                                                    borderRadius: "50%",
                                                }, tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: patientChart.opthalmologyExam.rightOpticDiscSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                            _jsx(SketchField, { ref: leftOpticDiscSketch, width: "150px", height: "150px", style: {
                                                    border: "1px solid #7F7F7F",
                                                    borderRadius: "50%",
                                                }, tool: Tools.Pencil, lineColor: selectedColor, lineWidth: selectedLineWeight, value: patientChart.opthalmologyExam.leftOpticDiscSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasOpticDiscCdr && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "CDR" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_118 = patientChart.opthalmologyExam) === null || _118 === void 0 ? void 0 : _118.rightCdr) && (_jsx("li", { children: `OD: ${(_119 = patientChart.opthalmologyExam) === null || _119 === void 0 ? void 0 : _119.rightCdr}` }, void 0)),
                                                    ((_120 = patientChart.opthalmologyExam) === null || _120 === void 0 ? void 0 : _120.leftCdr) && (_jsx("li", { children: `OS: ${(_121 = patientChart.opthalmologyExam) === null || _121 === void 0 ? void 0 : _121.leftCdr}` }, void 0))] }), void 0)] }), void 0)),
                                    hasOpticDisc && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Optic Disc" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_122 = patientChart.opthalmologyExam) === null || _122 === void 0 ? void 0 : _122.rightOpticDisc) && (_jsx("li", { children: `OD: ${(_123 = patientChart.opthalmologyExam) === null || _123 === void 0 ? void 0 : _123.rightOpticDisc}` }, void 0)),
                                                    ((_124 = patientChart.opthalmologyExam) === null || _124 === void 0 ? void 0 : _124.leftOpticDisc) && (_jsx("li", { children: `OS: ${(_125 = patientChart.opthalmologyExam) === null || _125 === void 0 ? void 0 : _125.leftOpticDisc}` }, void 0))] }), void 0)] }), void 0)),
                                    hasOpticDisc && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.opticDiscNote }), void 0))] }), void 0)] }), void 0))] }), void 0),
            ((_127 = (_126 = patientChart.diagnosticProcedureOrder) === null || _126 === void 0 ? void 0 : _126.diagnosticProcedures.length) !== null && _127 !== void 0 ? _127 : 0) > 0 && (_jsxs("div", Object.assign({ className: "text-sm mt-5" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "airline_seat_recline_normal" }), void 0) }, void 0),
                                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Diagnostic Procedures" }), void 0)] }), void 0),
                            _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0), (_128 = patientChart.diagnosticProcedureOrder) === null || _128 === void 0 ? void 0 : _128.diagnosticProcedures.map((e, i) => (_jsxs("div", Object.assign({ className: "mt-5 ml-2" }, { children: [i !== 0 && _jsx("div", { className: "page-break" }, void 0),
                            _jsxs("div", Object.assign({ className: "pl-4 border-l border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "font-semibold text-lg" }, { children: `${e.diagnosticProcedureType.title}` }), void 0),
                                    _jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx(DiagnosticProcedureComponent, { values: e, readOnly: true, onRefersh: () => { } }, void 0) }), void 0)] }), void 0)] }), e.id)))] }), void 0)),
            ((_130 = (_129 = patientChart.labOrder) === null || _129 === void 0 ? void 0 : _129.labs.length) !== null && _130 !== void 0 ? _130 : 0) > 0 && (_jsxs("div", Object.assign({ className: "text-sm mt-5" }, { children: [_jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "biotech" }), void 0) }, void 0),
                                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Labratory" }), void 0)] }), void 0),
                            _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0), (_131 = patientChart.labOrder) === null || _131 === void 0 ? void 0 : _131.labs.map((e, i) => (_jsxs("div", Object.assign({ className: "pl-4 border-l border-indigo-600" }, { children: [i !== 0 && _jsx("div", { className: "page-break" }, void 0),
                            _jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: `${e.labType.title}` }), void 0),
                            _jsx("div", Object.assign({ className: "mt-2 ml-2" }, { children: _jsx(LabComponent, { values: e, readOnly: true, onRefresh: () => { } }, void 0) }), void 0)] }), e.id)))] }), void 0)),
            patientChart.surgicalProcedure.id.toString() !== "0" && (_jsxs("div", Object.assign({ className: "text-sm mt-5" }, { children: [_jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "airline_seat_flat" }), void 0) }, void 0),
                                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: `${patientChart.surgicalProcedure.surgicalProcedureTypeTitle} Surgery` }), void 0)] }), void 0),
                            _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
                    _jsx("div", Object.assign({ onClick: () => {
                        }, className: "ml-8 mt-2 text-blue-700" }, { children: "Open full chart to see results" }), void 0)] }), void 0)),
            patientChart.treatment.id.toString() !== "0" && (_jsxs("div", Object.assign({ className: "text-sm mt-5" }, { children: [_jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "healing" }), void 0) }, void 0),
                                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: `${patientChart.treatment.treatmentTypeTitle} Treatment` }), void 0)] }), void 0),
                            _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "ml-8 mt-2" }, { children: _jsxs("ul", { children: [patientChart.treatment.receptionNote && (_jsxs("li", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Note:" }), void 0), " ", patientChart.treatment.receptionNote] }, void 0)),
                                patientChart.treatment.result && (_jsxs("li", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Result:" }), void 0), " ", patientChart.treatment.result] }, void 0))] }, void 0) }), void 0)] }), void 0)),
            hasDiagnosis && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "fact_check" }), void 0) }, void 0),
                                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Diagnosis" }), void 0)] }), void 0),
                            _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
                    _jsxs("div", Object.assign({ className: "mt-1 ml-2" }, { children: [patientChart.diagnoses.map((e) => (_jsx("div", { children: _jsx("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: _jsx("li", { children: `${e === null || e === void 0 ? void 0 : e.fullDescription} ${(e === null || e === void 0 ? void 0 : e.location) && `(${e.location})`} ${(e === null || e === void 0 ? void 0 : e.differential) ? "(Differential)" : ""}` }, void 0) }), void 0) }, e === null || e === void 0 ? void 0 : e.id))),
                            patientChart.diagnosisNote && (_jsx("div", { dangerouslySetInnerHTML: {
                                    __html: patientChart.diagnosisNote,
                                }, className: "text-sm mt-2 ml-2" }, void 0)),
                            patientChart.differentialDiagnosisNote && (_jsx("div", { dangerouslySetInnerHTML: {
                                    __html: patientChart.differentialDiagnosisNote,
                                }, className: "text-sm mt-2 ml-2" }, void 0))] }), void 0)] }), void 0)),
            ((_133 = (_132 = patientChart.medicalPrescriptionOrder) === null || _132 === void 0 ? void 0 : _132.medicalPrescriptions.length) !== null && _133 !== void 0 ? _133 : 0) > 0 && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "local_pharmacy" }), void 0) }, void 0),
                                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Medical Prescriptions" }), void 0)] }), void 0),
                            _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "ml-2" }, { children: _jsx(MedicationTable, { readOnly: true, items: (_134 = patientChart.medicalPrescriptionOrder) === null || _134 === void 0 ? void 0 : _134.medicalPrescriptions, onPrint: () => { } }, void 0) }), void 0)] }), void 0)),
            ((_136 = (_135 = patientChart.eyewearPrescriptionOrder) === null || _135 === void 0 ? void 0 : _135.eyewearPrescriptions.length) !== null && _136 !== void 0 ? _136 : 0) > 0 && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "local_pharmacy" }), void 0) }, void 0),
                                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Eyewear Prescriptions" }), void 0)] }), void 0),
                            _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "ml-2" }, { children: _jsx(EyeGlassTable, { readOnly: true, items: (_137 = patientChart.eyewearPrescriptionOrder) === null || _137 === void 0 ? void 0 : _137.eyewearPrescriptions, onPrint: () => { } }, void 0) }), void 0)] }), void 0)),
            (hasSummaryNote || hasSummaryNoteSketch) && (_jsxs("div", { children: [hasSummaryNoteSketch && (_jsxs("div", Object.assign({ className: "mt-5 flex justify-around" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                    _jsx(SketchDiagram, { alt: "Right Summary Sketch", refValue: rightSummarySketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "13rem", image: circleImage, imageClassname: "w-60 h-52", value: patientChart.rightSummarySketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                            _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                    _jsx(SketchDiagram, { alt: "Left Summary Sketch", refValue: leftSummarySketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "11rem", image: circleImage, imageClassname: "w-60 h-52", value: patientChart.leftSummarySketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                    hasSummaryNote && (_jsxs("div", Object.assign({ className: "text-sm mt-5" }, { children: [_jsxs("div", Object.assign({ className: "mt-5 flex space-x-6 items-center" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ className: "material-icons text-teal-600" }, { children: "card_membership" }), void 0) }, void 0),
                                            _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Summary" }), void 0)] }), void 0),
                                    _jsx("div", { style: { height: "1px" }, className: "bg-gray-300 flex-1" }, void 0)] }), void 0),
                            _jsx("div", Object.assign({ className: "ml-8 mt-2 text-base" }, { children: patientChart.summaryNote }), void 0)] }), void 0))] }, void 0))] }), void 0));
};
export default PositiveFindings;
