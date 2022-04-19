import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SketchDiagram } from "./SketchDiagram";
import corneaImage from "../img/cornea.png";
import irisImage from "../img/iris.png";
import circleImage from "../img/circle.png";
import { LabComponent } from "./LabComponent";
import { MedicationTable } from "./MedicationTable";
import { EyeGlassTable } from "./EyeGlassTable";
import { getFileUrl, groupByHpiComponentType } from "../util";
import { OcularMotilityOdDiagram } from "./OcularMotilityDiagram/OcularMotilityOdDiagram";
import { OcularMotilityOsDiagram } from "./OcularMotilityDiagram/OcularMotilityOsDiagram";
import PreOpForm from "./PreOpForm";
import IntraOpForm from "./IntraOpForm";
import TreatmentForm from "./TreatmentForm";
export const GET_PATIENT_CHART = gql `
  query GetPatientChart($id: ID!, $details: Boolean) {
    patientChart(id: $id, details: $details) {
      id
      diagnosisNote
      differentialDiagnosisNote
      chiefComplaintsNote
      stickieNote
      summaryNote
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
          rightEyeText
          leftEyeText
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
const GET_SURGERY = gql `
  query GetSurgery($patientChartId: ID!) {
    surgicalProcedure(patientChartId: $patientChartId) {
      id
      rightCorrected
      leftCorrected
      rightIop
      leftIop
      rightAnteriorSegment
      leftAnteriorSegment
      rightPosteriorSegment
      leftPosteriorSegment
      rightBiometry
      leftBiometry
      diabetes
      hpn
      asthma
      cardiacDisease
      allergies
      bloodPressure
      bloodSugar
      uriAnalysis
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
const GET_TREATMENT = gql `
  query GetTreatment($patientChartId: ID!) {
    treatment(patientChartId: $patientChartId) {
      id
      note
      result
      treatmentType {
        id
        title
      }
    }
  }
`;
const PositiveFindingsPrint = ({ patientChartId, showHistory, showChiefComplaints, showVitalSigns, showPhysicalExamination, showDiagnosticProcedures, showLabratory, showDiagnosis, showDifferentialDiagnosis, showSurgery, showTreatment, showPrescriptions, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155;
    const { data, refetch } = useQuery(GET_PATIENT_CHART, {
        variables: {
            id: patientChartId,
            details: true,
        },
    });
    const surgeryQuery = useQuery(GET_SURGERY, {
        variables: {
            patientChartId,
        },
    });
    const surgicalProcedureForm = useForm({
        defaultValues: {
            patientChartId: patientChartId,
        },
    });
    useEffect(() => {
        var _a;
        const surgicalProcedure = (_a = surgeryQuery.data) === null || _a === void 0 ? void 0 : _a.surgicalProcedure;
        if (surgicalProcedure) {
            surgicalProcedureForm.reset({
                rightCorrected: surgicalProcedure.rightCorrected,
                leftCorrected: surgicalProcedure.leftCorrected,
                rightIop: surgicalProcedure.rightIop,
                leftIop: surgicalProcedure.leftIop,
                rightAnteriorSegment: surgicalProcedure.rightAnteriorSegment,
                leftAnteriorSegment: surgicalProcedure.leftAnteriorSegment,
                rightPosteriorSegment: surgicalProcedure.rightPosteriorSegment,
                leftPosteriorSegment: surgicalProcedure.leftPosteriorSegment,
                rightBiometry: surgicalProcedure.rightBiometry,
                leftBiometry: surgicalProcedure.leftBiometry,
                bloodPressure: surgicalProcedure.bloodPressure,
                bloodSugar: surgicalProcedure.bloodSugar,
                uriAnalysis: surgicalProcedure.uriAnalysis,
                diabetes: surgicalProcedure.diabetes,
                asthma: surgicalProcedure.asthma,
                hpn: surgicalProcedure.hpn,
                cardiacDisease: surgicalProcedure.cardiacDisease,
                allergies: surgicalProcedure.allergies,
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
    }, [(_a = surgeryQuery.data) === null || _a === void 0 ? void 0 : _a.surgicalProcedure]);
    const treatmentQuery = useQuery(GET_TREATMENT, {
        variables: {
            patientChartId,
        },
    });
    const treatmentForm = useForm({
        defaultValues: {
            patientChartId: patientChartId,
        },
    });
    useEffect(() => {
        var _a;
        const treatment = (_a = treatmentQuery.data) === null || _a === void 0 ? void 0 : _a.treatment;
        if (treatment !== undefined) {
            treatmentForm.reset({
                note: treatment.note,
                result: treatment.result,
                patientChartId: treatment.patientChartId,
            });
        }
    }, [(_b = treatmentQuery.data) === null || _b === void 0 ? void 0 : _b.treatment]);
    useEffect(() => {
        refetch();
        surgeryQuery.refetch();
        treatmentQuery.refetch();
    }, []);
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
    const hasVisionDistance = ((_c = patientChart.vitalSigns) === null || _c === void 0 ? void 0 : _c.rightDistanceUncorrected) || ((_d = patientChart.vitalSigns) === null || _d === void 0 ? void 0 : _d.leftDistanceUncorrected) || ((_e = patientChart.vitalSigns) === null || _e === void 0 ? void 0 : _e.rightDistancePinhole) || ((_f = patientChart.vitalSigns) === null || _f === void 0 ? void 0 : _f.leftDistancePinhole) || ((_g = patientChart.vitalSigns) === null || _g === void 0 ? void 0 : _g.rightDistanceCorrected) || ((_h = patientChart.vitalSigns) === null || _h === void 0 ? void 0 : _h.leftDistanceCorrected);
    const hasVisionNear = ((_j = patientChart.vitalSigns) === null || _j === void 0 ? void 0 : _j.rightNearUncorrected) || ((_k = patientChart.vitalSigns) === null || _k === void 0 ? void 0 : _k.leftNearUncorrected) || ((_l = patientChart.vitalSigns) === null || _l === void 0 ? void 0 : _l.rightNearPinhole) || ((_m = patientChart.vitalSigns) === null || _m === void 0 ? void 0 : _m.leftNearPinhole) || ((_o = patientChart.vitalSigns) === null || _o === void 0 ? void 0 : _o.rightNearCorrected) || ((_p = patientChart.vitalSigns) === null || _p === void 0 ? void 0 : _p.leftNearCorrected);
    const hasiopApplanation = ((_q = patientChart.vitalSigns) === null || _q === void 0 ? void 0 : _q.rightApplanation) || ((_r = patientChart.vitalSigns) === null || _r === void 0 ? void 0 : _r.leftApplanation);
    const hasiopTonopen = ((_s = patientChart.vitalSigns) === null || _s === void 0 ? void 0 : _s.rightTonopen) || ((_t = patientChart.vitalSigns) === null || _t === void 0 ? void 0 : _t.leftTonopen);
    const hasiopDigital = ((_u = patientChart.vitalSigns) === null || _u === void 0 ? void 0 : _u.rightDigital) || ((_v = patientChart.vitalSigns) === null || _v === void 0 ? void 0 : _v.leftDigital);
    const hasiopNoncontact = ((_w = patientChart.vitalSigns) === null || _w === void 0 ? void 0 : _w.rightNoncontact) || ((_x = patientChart.vitalSigns) === null || _x === void 0 ? void 0 : _x.leftNoncontact);
    const hasTemperature = (_y = patientChart.vitalSigns) === null || _y === void 0 ? void 0 : _y.temperature;
    const hasPulse = (_z = patientChart.vitalSigns) === null || _z === void 0 ? void 0 : _z.pulse;
    const hasBloodPressure = ((_0 = patientChart.vitalSigns) === null || _0 === void 0 ? void 0 : _0.bloodPressureSystolic) || ((_1 = patientChart.vitalSigns) === null || _1 === void 0 ? void 0 : _1.bloodPressureDiastolic);
    const hasRespiratoryRate = (_2 = patientChart.vitalSigns) === null || _2 === void 0 ? void 0 : _2.respiratoryRate;
    const hasOxygenSaturation = (_3 = patientChart.vitalSigns) === null || _3 === void 0 ? void 0 : _3.oxygenSaturation;
    const hasHeight = (_4 = patientChart.vitalSigns) === null || _4 === void 0 ? void 0 : _4.height;
    const hasWeight = (_5 = patientChart.vitalSigns) === null || _5 === void 0 ? void 0 : _5.weight;
    const hasBmi = (_6 = patientChart.vitalSigns) === null || _6 === void 0 ? void 0 : _6.bmi;
    const hasExternalExamLacrimal = ((_7 = patientChart.opthalmologyExam) === null || _7 === void 0 ? void 0 : _7.leftLacrimalSystem) || ((_8 = patientChart.opthalmologyExam) === null || _8 === void 0 ? void 0 : _8.rightLacrimalSystem);
    const hasExternalExamLids = ((_9 = patientChart.opthalmologyExam) === null || _9 === void 0 ? void 0 : _9.leftLids) || ((_10 = patientChart.opthalmologyExam) === null || _10 === void 0 ? void 0 : _10.rightLids);
    const hasExternalExamOrbits = ((_11 = patientChart.opthalmologyExam) === null || _11 === void 0 ? void 0 : _11.rightOrbits) || ((_12 = patientChart.opthalmologyExam) === null || _12 === void 0 ? void 0 : _12.leftOrbits);
    const hasExternalExamNote = (_13 = patientChart.opthalmologyExam) === null || _13 === void 0 ? void 0 : _13.externalExamNote;
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
        JSON.parse((_14 = patientChart.opthalmologyExam.rightCorneaSketch) === null || _14 === void 0 ? void 0 : _14.toString())
            .objects.length > 0) ||
        (patientChart.opthalmologyExam.leftCorneaSketch &&
            JSON.parse((_15 = patientChart.opthalmologyExam.leftCorneaSketch) === null || _15 === void 0 ? void 0 : _15.toString())
                .objects.length > 0);
    const hasSlitLampLensSketch = (patientChart.opthalmologyExam.rightLensSketch &&
        JSON.parse((_16 = patientChart.opthalmologyExam.rightLensSketch) === null || _16 === void 0 ? void 0 : _16.toString())
            .objects.length > 0) ||
        (patientChart.opthalmologyExam.leftLensSketch &&
            JSON.parse((_17 = patientChart.opthalmologyExam.leftLensSketch) === null || _17 === void 0 ? void 0 : _17.toString())
                .objects.length > 0);
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
        JSON.parse((_18 = patientChart.opthalmologyExam.rightRetinaSketch) === null || _18 === void 0 ? void 0 : _18.toString())
            .objects.length > 0) ||
        (patientChart.opthalmologyExam.leftRetinaSketch &&
            JSON.parse((_19 = patientChart.opthalmologyExam.leftRetinaSketch) === null || _19 === void 0 ? void 0 : _19.toString())
                .objects.length > 0);
    const hasFunduscopyNote = patientChart.opthalmologyExam.funduscopyNote;
    const hasOpticDiscCdr = patientChart.opthalmologyExam.rightCdr ||
        patientChart.opthalmologyExam.leftCdr;
    const hasOpticDisc = patientChart.opthalmologyExam.rightOpticDisc ||
        patientChart.opthalmologyExam.leftOpticDisc;
    const hasOpticDiscSketch = (patientChart.opthalmologyExam.rightOpticDiscSketch &&
        JSON.parse((_20 = patientChart.opthalmologyExam.rightOpticDiscSketch) === null || _20 === void 0 ? void 0 : _20.toString())
            .objects.length > 0) ||
        (patientChart.opthalmologyExam.leftOpticDiscSketch &&
            JSON.parse((_21 = patientChart.opthalmologyExam.leftOpticDiscSketch) === null || _21 === void 0 ? void 0 : _21.toString())
                .objects.length > 0);
    const hasOpticDiscNote = patientChart.opthalmologyExam.opticDiscNote;
    const hasDiagnosis = patientChart.diagnoses.length > 0 ||
        ((_23 = (_22 = patientChart.diagnosisNote) === null || _22 === void 0 ? void 0 : _22.length) !== null && _23 !== void 0 ? _23 : 0) > 0 ||
        ((_25 = (_24 = patientChart.differentialDiagnosisNote) === null || _24 === void 0 ? void 0 : _24.length) !== null && _25 !== void 0 ? _25 : 0) > 0;
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
    return (_jsxs("div", Object.assign({ className: "text-sm print-container" }, { children: [((_26 = patientChart.chiefComplaints) === null || _26 === void 0 ? void 0 : _26.length) > 0 && showChiefComplaints && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Chief complaints" }), void 0),
                    _jsx("hr", { className: "my-5" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [patientChart.chiefComplaints.map((e) => {
                                var _a;
                                return (_jsxs("div", Object.assign({ className: "pl-4 border-l border-indigo-600 mt-3" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: e === null || e === void 0 ? void 0 : e.title }), void 0),
                                        _jsx("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: (_a = groupByHpiComponentType(e === null || e === void 0 ? void 0 : e.hpiComponents)) === null || _a === void 0 ? void 0 : _a.map((q) => (_jsx("li", { children: `${q[0]}: ${q[1]
                                                    .map((h) => h === null || h === void 0 ? void 0 : h.title.trim())
                                                    .join(", ")}` }, q[0]))) }), void 0)] }), e === null || e === void 0 ? void 0 : e.id));
                            }),
                            patientChart.chiefComplaintsNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.chiefComplaintsNote }), void 0))] }), void 0)] }, void 0)),
            showVitalSigns && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: "Vital Signs" }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0),
                    (hasVisionDistance || hasVisionNear) && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Visual Acuity" }), void 0),
                            _jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [hasVisionDistance && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "" }, { children: "Distance" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_27 = patientChart.vitalSigns) === null || _27 === void 0 ? void 0 : _27.rightDistanceUncorrected) && (_jsx("li", { children: `Uncorrected (OD): ${(_28 = patientChart.vitalSigns) === null || _28 === void 0 ? void 0 : _28.rightDistanceUncorrected}` }, void 0)),
                                                    ((_29 = patientChart.vitalSigns) === null || _29 === void 0 ? void 0 : _29.leftDistanceUncorrected) && (_jsx("li", { children: `Uncorrected (OS): ${(_30 = patientChart.vitalSigns) === null || _30 === void 0 ? void 0 : _30.leftDistanceUncorrected}` }, void 0)),
                                                    ((_31 = patientChart.vitalSigns) === null || _31 === void 0 ? void 0 : _31.rightDistanceCorrected) && (_jsx("li", { children: `Corrected (OD): ${(_32 = patientChart.vitalSigns) === null || _32 === void 0 ? void 0 : _32.rightDistanceCorrected}` }, void 0)),
                                                    ((_33 = patientChart.vitalSigns) === null || _33 === void 0 ? void 0 : _33.leftDistanceCorrected) && (_jsx("li", { children: `Corrected (OS): ${(_34 = patientChart.vitalSigns) === null || _34 === void 0 ? void 0 : _34.leftDistanceCorrected}` }, void 0)),
                                                    ((_35 = patientChart.vitalSigns) === null || _35 === void 0 ? void 0 : _35.rightDistancePinhole) && (_jsx("li", { children: `Pinhole (OD): ${(_36 = patientChart.vitalSigns) === null || _36 === void 0 ? void 0 : _36.rightDistancePinhole}` }, void 0)),
                                                    ((_37 = patientChart.vitalSigns) === null || _37 === void 0 ? void 0 : _37.leftDistancePinhole) && (_jsx("li", { children: `Pinhole (OS): ${(_38 = patientChart.vitalSigns) === null || _38 === void 0 ? void 0 : _38.leftDistancePinhole}` }, void 0))] }), void 0)] }, void 0)),
                                    hasVisionNear && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "" }, { children: "Near" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_39 = patientChart.vitalSigns) === null || _39 === void 0 ? void 0 : _39.rightNearUncorrected) && (_jsx("li", { children: `Uncorrected (OD): ${(_40 = patientChart.vitalSigns) === null || _40 === void 0 ? void 0 : _40.rightNearUncorrected}` }, void 0)),
                                                    ((_41 = patientChart.vitalSigns) === null || _41 === void 0 ? void 0 : _41.leftNearUncorrected) && (_jsx("li", { children: `Uncorrected (OS): ${(_42 = patientChart.vitalSigns) === null || _42 === void 0 ? void 0 : _42.leftNearUncorrected}` }, void 0)),
                                                    ((_43 = patientChart.vitalSigns) === null || _43 === void 0 ? void 0 : _43.rightNearCorrected) && (_jsx("li", { children: `Corrected (OD): ${(_44 = patientChart.vitalSigns) === null || _44 === void 0 ? void 0 : _44.rightNearCorrected}` }, void 0)),
                                                    ((_45 = patientChart.vitalSigns) === null || _45 === void 0 ? void 0 : _45.leftNearCorrected) && (_jsx("li", { children: `Corrected (OS): ${(_46 = patientChart.vitalSigns) === null || _46 === void 0 ? void 0 : _46.leftNearCorrected}` }, void 0)),
                                                    ((_47 = patientChart.vitalSigns) === null || _47 === void 0 ? void 0 : _47.rightNearPinhole) && (_jsx("li", { children: `Pinhole (OD): ${(_48 = patientChart.vitalSigns) === null || _48 === void 0 ? void 0 : _48.rightNearPinhole}` }, void 0)),
                                                    ((_49 = patientChart.vitalSigns) === null || _49 === void 0 ? void 0 : _49.leftNearPinhole) && (_jsx("li", { children: `Pinhole (OS): ${(_50 = patientChart.vitalSigns) === null || _50 === void 0 ? void 0 : _50.leftNearPinhole}` }, void 0))] }), void 0)] }, void 0))] }), void 0)] }), void 0)),
                    (hasiopApplanation ||
                        hasiopTonopen ||
                        hasiopDigital ||
                        hasiopNoncontact) && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "IOP" }), void 0),
                            hasiopApplanation && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Applanation" }), void 0),
                                    _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_51 = patientChart.vitalSigns) === null || _51 === void 0 ? void 0 : _51.rightApplanation) && (_jsx("li", { children: `OD: ${(_52 = patientChart.vitalSigns) === null || _52 === void 0 ? void 0 : _52.rightApplanation}` }, void 0)),
                                            ((_53 = patientChart.vitalSigns) === null || _53 === void 0 ? void 0 : _53.leftApplanation) && (_jsx("li", { children: `OS: ${(_54 = patientChart.vitalSigns) === null || _54 === void 0 ? void 0 : _54.leftApplanation}` }, void 0))] }), void 0)] }), void 0)),
                            hasiopTonopen && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Tonopen" }), void 0),
                                    _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_55 = patientChart.vitalSigns) === null || _55 === void 0 ? void 0 : _55.rightTonopen) && (_jsx("li", { children: `OD: ${(_56 = patientChart.vitalSigns) === null || _56 === void 0 ? void 0 : _56.rightTonopen}` }, void 0)),
                                            ((_57 = patientChart.vitalSigns) === null || _57 === void 0 ? void 0 : _57.leftTonopen) && (_jsx("li", { children: `OS: ${(_58 = patientChart.vitalSigns) === null || _58 === void 0 ? void 0 : _58.leftTonopen}` }, void 0))] }), void 0)] }), void 0)),
                            hasiopDigital && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Digital" }), void 0),
                                    _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_59 = patientChart.vitalSigns) === null || _59 === void 0 ? void 0 : _59.rightDigital) && (_jsx("li", { children: `OD: ${(_60 = patientChart.vitalSigns) === null || _60 === void 0 ? void 0 : _60.rightDigital}` }, void 0)),
                                            ((_61 = patientChart.vitalSigns) === null || _61 === void 0 ? void 0 : _61.leftDigital) && (_jsx("li", { children: `OS: ${(_62 = patientChart.vitalSigns) === null || _62 === void 0 ? void 0 : _62.leftDigital}` }, void 0))] }), void 0)] }), void 0)),
                            hasiopNoncontact && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Non-Contact" }), void 0),
                                    _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_63 = patientChart.vitalSigns) === null || _63 === void 0 ? void 0 : _63.rightNoncontact) && (_jsx("li", { children: `OD: ${(_64 = patientChart.vitalSigns) === null || _64 === void 0 ? void 0 : _64.rightNoncontact}` }, void 0)),
                                            ((_65 = patientChart.vitalSigns) === null || _65 === void 0 ? void 0 : _65.leftNoncontact) && (_jsx("li", { children: `OS: ${(_66 = patientChart.vitalSigns) === null || _66 === void 0 ? void 0 : _66.leftNoncontact}` }, void 0))] }), void 0)] }), void 0))] }), void 0)),
                    hasTemperature && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Temperature: " }), void 0), " ", _jsx("span", { children: `${(_67 = patientChart.vitalSigns) === null || _67 === void 0 ? void 0 : _67.temperature} C°` }, void 0)] }), void 0)),
                    hasPulse && (_jsxs("div", Object.assign({ className: "text-sm mt-1" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Pulse: " }), void 0), " ", _jsx("span", { children: `${(_68 = patientChart.vitalSigns) === null || _68 === void 0 ? void 0 : _68.pulse} bpm` }, void 0)] }), void 0)),
                    hasBloodPressure && (_jsxs("div", Object.assign({ className: "text-sm mt-1" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Blood Pressure: " }), void 0), " ", _jsx("span", { children: `${(_69 = patientChart.vitalSigns) === null || _69 === void 0 ? void 0 : _69.bloodPressureSystolic} / ${(_70 = patientChart.vitalSigns) === null || _70 === void 0 ? void 0 : _70.bloodPressureDiastolic}` }, void 0)] }), void 0)),
                    hasRespiratoryRate && (_jsxs("div", Object.assign({ className: "text-sm mt-1" }, { children: [_jsxs("span", Object.assign({ className: "text-base font-semibold" }, { children: ["Respiratory Rate:", " "] }), void 0), " ", _jsx("span", { children: `${(_71 = patientChart.vitalSigns) === null || _71 === void 0 ? void 0 : _71.respiratoryRate} rpm` }, void 0)] }), void 0)),
                    hasOxygenSaturation && (_jsxs("div", Object.assign({ className: "text-sm mt-1" }, { children: [_jsxs("span", Object.assign({ className: "text-base font-semibold" }, { children: ["Oxygen Saturation:", " "] }), void 0), " ", _jsx("span", { children: `${(_72 = patientChart.vitalSigns) === null || _72 === void 0 ? void 0 : _72.oxygenSaturation}%` }, void 0)] }), void 0)),
                    hasHeight && (_jsxs("div", Object.assign({ className: "text-sm mt-1" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Height: " }), void 0), " ", _jsx("span", { children: `${(_73 = patientChart.vitalSigns) === null || _73 === void 0 ? void 0 : _73.height} cm` }, void 0)] }), void 0)),
                    hasWeight && (_jsxs("div", Object.assign({ className: "text-sm mt-1" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "Weight: " }), void 0), " ", _jsx("span", { children: `${(_74 = patientChart.vitalSigns) === null || _74 === void 0 ? void 0 : _74.weight} kg` }, void 0)] }), void 0)),
                    hasBmi && (_jsxs("div", Object.assign({ className: "text-sm mt-1" }, { children: [_jsx("span", Object.assign({ className: "text-base font-semibold" }, { children: "BMI: " }), void 0), " ", _jsx("span", { children: `${(_75 = patientChart.vitalSigns) === null || _75 === void 0 ? void 0 : _75.bmi}` }, void 0)] }), void 0))] }, void 0)),
            showPhysicalExamination && (_jsxs("div", { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: "Physical Examination" }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0),
                    _jsx("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: patientChart.physicalExamFindings.map((e) => (_jsxs("li", { children: [_jsxs("span", Object.assign({ className: "font-semibold" }, { children: [e === null || e === void 0 ? void 0 : e.examCategory.title, ": "] }), void 0),
                                _jsx("span", { children: `${(e === null || e === void 0 ? void 0 : e.abnormal) ? "Abnormal, " : "Normal, "} ${e === null || e === void 0 ? void 0 : e.note}` }, void 0)] }, e === null || e === void 0 ? void 0 : e.id))) }), void 0),
                    (hasExternalExamLacrimal ||
                        hasExternalExamLids ||
                        hasExternalExamOrbits ||
                        hasExternalExamNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l-2 border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "External Exam" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasExternalExamLacrimal && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Lacrimal System" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [patientChart.opthalmologyExam.rightLacrimalSystem && (_jsx("li", { children: `OD: ${(_76 = patientChart.opthalmologyExam) === null || _76 === void 0 ? void 0 : _76.rightLacrimalSystem}` }, void 0)),
                                                    ((_77 = patientChart.opthalmologyExam) === null || _77 === void 0 ? void 0 : _77.leftLacrimalSystem) && (_jsx("li", { children: `OS: ${(_78 = patientChart.opthalmologyExam) === null || _78 === void 0 ? void 0 : _78.leftLacrimalSystem}` }, void 0))] }), void 0)] }), void 0)),
                                    hasExternalExamLids && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Lids" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [patientChart.opthalmologyExam.rightLids && (_jsx("li", { children: `OD: ${(_79 = patientChart.opthalmologyExam) === null || _79 === void 0 ? void 0 : _79.rightLids}` }, void 0)),
                                                    ((_80 = patientChart.opthalmologyExam) === null || _80 === void 0 ? void 0 : _80.leftLids) && (_jsx("li", { children: `OS: ${(_81 = patientChart.opthalmologyExam) === null || _81 === void 0 ? void 0 : _81.leftLids}` }, void 0))] }), void 0)] }), void 0)),
                                    hasExternalExamOrbits && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Orbits" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [patientChart.opthalmologyExam.rightOrbits && (_jsx("li", { children: `OD: ${(_82 = patientChart.opthalmologyExam) === null || _82 === void 0 ? void 0 : _82.rightOrbits}` }, void 0)),
                                                    ((_83 = patientChart.opthalmologyExam) === null || _83 === void 0 ? void 0 : _83.leftOrbits) && (_jsx("li", { children: `OS: ${(_84 = patientChart.opthalmologyExam) === null || _84 === void 0 ? void 0 : _84.leftOrbits}` }, void 0))] }), void 0)] }), void 0)),
                                    hasExternalExamNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.externalExamNote }), void 0))] }), void 0)] }), void 0)),
                    (hasOcularMotility ||
                        hasOcularMotilityDistance ||
                        hasOcularMotilityNear ||
                        hasOcularMotilityNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l-2 border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Ocular Motility" }), void 0),
                            hasOcularMotilityDiagram && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                            _jsx(OcularMotilityOdDiagram, { register: ocularMotilityForm.register, readOnly: true, values: ocularMotilityValues, onChange: () => { } }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                            _jsx(OcularMotilityOsDiagram, { register: ocularMotilityForm.register, readOnly: true, values: ocularMotilityValues, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasOcularMotility && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Ocular Motility" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [(patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.rightOcularMotility) && (_jsx("li", { children: `OD: ${(_85 = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _85 === void 0 ? void 0 : _85.rightOcularMotility}` }, void 0)),
                                                    ((_86 = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _86 === void 0 ? void 0 : _86.leftOcularMotility) && (_jsx("li", { children: `OS: ${(_87 = patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam) === null || _87 === void 0 ? void 0 : _87.leftOcularMotility}` }, void 0))] }), void 0)] }), void 0)),
                                    hasOcularMotilityDistance && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: ["Distance: ", patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.distance] }), void 0)),
                                    hasOcularMotilityNear && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: ["Distance: ", patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.near] }), void 0)),
                                    hasOcularMotilityNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart === null || patientChart === void 0 ? void 0 : patientChart.opthalmologyExam.ocularMotilityNote }), void 0))] }), void 0)] }), void 0)),
                    (hasCoverTest || hasCoverTestNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l-2 border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Cover Test" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasCoverTest && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Cover Test" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_88 = patientChart.opthalmologyExam) === null || _88 === void 0 ? void 0 : _88.rightCoverTest) && (_jsx("li", { children: `OD: ${(_89 = patientChart.opthalmologyExam) === null || _89 === void 0 ? void 0 : _89.rightCoverTest}` }, void 0)),
                                                    ((_90 = patientChart.opthalmologyExam) === null || _90 === void 0 ? void 0 : _90.leftCoverTest) && (_jsx("li", { children: `OS: ${(_91 = patientChart.opthalmologyExam) === null || _91 === void 0 ? void 0 : _91.leftCoverTest}` }, void 0))] }), void 0)] }), void 0)),
                                    hasCoverTestNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.coverTestNote }), void 0))] }), void 0)] }), void 0)),
                    (hasPupils || hasPupils) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l-2 border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Pupils" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasPupils && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Pupils" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_92 = patientChart.opthalmologyExam) === null || _92 === void 0 ? void 0 : _92.rightPupils) && (_jsx("li", { children: `OD: ${(_93 = patientChart.opthalmologyExam) === null || _93 === void 0 ? void 0 : _93.rightPupils}` }, void 0)),
                                                    ((_94 = patientChart.opthalmologyExam) === null || _94 === void 0 ? void 0 : _94.leftPupils) && (_jsx("li", { children: `OS: ${(_95 = patientChart.opthalmologyExam) === null || _95 === void 0 ? void 0 : _95.leftPupils}` }, void 0))] }), void 0)] }), void 0)),
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
                        hasSlitLampNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l-2 border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Slit Lamp Exam" }), void 0),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasSlitLampConjuctiva && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Conjuctiva" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_96 = patientChart.opthalmologyExam) === null || _96 === void 0 ? void 0 : _96.rightConjunctiva) && (_jsx("li", { children: `OD: ${(_97 = patientChart.opthalmologyExam) === null || _97 === void 0 ? void 0 : _97.rightConjunctiva}` }, void 0)),
                                                    ((_98 = patientChart.opthalmologyExam) === null || _98 === void 0 ? void 0 : _98.leftConjunctiva) && (_jsx("li", { children: `OS: ${(_99 = patientChart.opthalmologyExam) === null || _99 === void 0 ? void 0 : _99.leftConjunctiva}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampCorneaSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                                    _jsx(SketchDiagram, { alt: "Right Cornea", refValue: rightCorneaSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "11rem", image: corneaImage, imageClassname: "w-60 h-44", value: patientChart.opthalmologyExam.rightCorneaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                                            _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                                    _jsx(SketchDiagram, { alt: "Left Cornea", refValue: leftCorneaSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "11rem", image: corneaImage, imageClassname: "w-60 h-44", value: patientChart.opthalmologyExam.leftCorneaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                                    hasSlitLampCornea && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Cornea" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_100 = patientChart.opthalmologyExam) === null || _100 === void 0 ? void 0 : _100.rightCornea) && (_jsx("li", { children: `OD: ${(_101 = patientChart.opthalmologyExam) === null || _101 === void 0 ? void 0 : _101.rightCornea}` }, void 0)),
                                                    ((_102 = patientChart.opthalmologyExam) === null || _102 === void 0 ? void 0 : _102.leftCornea) && (_jsx("li", { children: `OS: ${(_103 = patientChart.opthalmologyExam) === null || _103 === void 0 ? void 0 : _103.leftCornea}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampSclera && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Sclera" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_104 = patientChart.opthalmologyExam) === null || _104 === void 0 ? void 0 : _104.rightSclera) && (_jsx("li", { children: `OD: ${(_105 = patientChart.opthalmologyExam) === null || _105 === void 0 ? void 0 : _105.rightSclera}` }, void 0)),
                                                    ((_106 = patientChart.opthalmologyExam) === null || _106 === void 0 ? void 0 : _106.leftSclera) && (_jsx("li", { children: `OS: ${(_107 = patientChart.opthalmologyExam) === null || _107 === void 0 ? void 0 : _107.leftSclera}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampAnteriorChamber && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Anterior Chamber" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_108 = patientChart.opthalmologyExam) === null || _108 === void 0 ? void 0 : _108.rightAnteriorChamber) && (_jsx("li", { children: `OD: ${(_109 = patientChart.opthalmologyExam) === null || _109 === void 0 ? void 0 : _109.rightAnteriorChamber}` }, void 0)),
                                                    ((_110 = patientChart.opthalmologyExam) === null || _110 === void 0 ? void 0 : _110.leftAnteriorChamber) && (_jsx("li", { children: `OS: ${(_111 = patientChart.opthalmologyExam) === null || _111 === void 0 ? void 0 : _111.leftAnteriorChamber}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampIris && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Iris" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_112 = patientChart.opthalmologyExam) === null || _112 === void 0 ? void 0 : _112.rightIris) && (_jsx("li", { children: `OD: ${(_113 = patientChart.opthalmologyExam) === null || _113 === void 0 ? void 0 : _113.rightIris}` }, void 0)),
                                                    ((_114 = patientChart.opthalmologyExam) === null || _114 === void 0 ? void 0 : _114.leftIris) && (_jsx("li", { children: `OS: ${(_115 = patientChart.opthalmologyExam) === null || _115 === void 0 ? void 0 : _115.leftIris}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampLensSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                                    _jsx(SketchDiagram, { alt: "Right Cornea", refValue: rightLensSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "11rem", image: irisImage, imageClassname: "w-60 h-44", value: patientChart.opthalmologyExam.rightLensSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                                            _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                                    _jsx(SketchDiagram, { alt: "Left Cornea", refValue: leftLensSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "11rem", image: irisImage, imageClassname: "w-60 h-44", value: patientChart.opthalmologyExam.leftLensSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                                    hasSlitLampLens && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Lens" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_116 = patientChart.opthalmologyExam) === null || _116 === void 0 ? void 0 : _116.rightLens) && (_jsx("li", { children: `OD: ${(_117 = patientChart.opthalmologyExam) === null || _117 === void 0 ? void 0 : _117.rightLens}` }, void 0)),
                                                    ((_118 = patientChart.opthalmologyExam) === null || _118 === void 0 ? void 0 : _118.leftLens) && (_jsx("li", { children: `OS: ${(_119 = patientChart.opthalmologyExam) === null || _119 === void 0 ? void 0 : _119.leftLens}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampVitreos && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Vitreos" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_120 = patientChart.opthalmologyExam) === null || _120 === void 0 ? void 0 : _120.rightVitreos) && (_jsx("li", { children: `OD: ${(_121 = patientChart.opthalmologyExam) === null || _121 === void 0 ? void 0 : _121.rightVitreos}` }, void 0)),
                                                    ((_122 = patientChart.opthalmologyExam) === null || _122 === void 0 ? void 0 : _122.leftVitreos) && (_jsx("li", { children: `OS: ${(_123 = patientChart.opthalmologyExam) === null || _123 === void 0 ? void 0 : _123.leftVitreos}` }, void 0))] }), void 0)] }), void 0)),
                                    hasSlitLampNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.slitLampExamNote }), void 0))] }), void 0)] }), void 0)),
                    (hasFunduscopyRetina ||
                        hasFunduscopyRetinaSketch ||
                        hasFunduscopyNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l-2 border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Funduscopy" }), void 0),
                            hasFunduscopyRetinaSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                            _jsx(SketchDiagram, { alt: "Right Retina", refValue: rightRetinaSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "13rem", image: circleImage, imageClassname: "w-60 h-52", value: patientChart.opthalmologyExam.rightRetinaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                            _jsx(SketchDiagram, { alt: "Left Retian", refValue: leftRetinaSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "11rem", image: circleImage, imageClassname: "w-60 h-52", value: patientChart.opthalmologyExam.leftRetinaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasFunduscopyRetina && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Retina" }), void 0),
                                            hasFunduscopyRetinaSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around border" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                                            _jsx(SketchDiagram, { alt: "Right Retina", refValue: rightRetinaSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "13rem", image: circleImage, imageClassname: "w-60 h-52", value: patientChart.opthalmologyExam.rightRetinaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                                                    _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                                            _jsx(SketchDiagram, { alt: "Left Retiana", refValue: leftRetinaSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "11rem", image: circleImage, imageClassname: "w-60 h-52", value: patientChart.opthalmologyExam.rightRetinaSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_124 = patientChart.opthalmologyExam) === null || _124 === void 0 ? void 0 : _124.rightRetina) && (_jsx("li", { children: `OD: ${(_125 = patientChart.opthalmologyExam) === null || _125 === void 0 ? void 0 : _125.rightRetina}` }, void 0)),
                                                    ((_126 = patientChart.opthalmologyExam) === null || _126 === void 0 ? void 0 : _126.leftRetina) && (_jsx("li", { children: `OS: ${(_127 = patientChart.opthalmologyExam) === null || _127 === void 0 ? void 0 : _127.leftRetina}` }, void 0))] }), void 0)] }), void 0)),
                                    hasFunduscopyNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.funduscopyNote }), void 0))] }), void 0)] }), void 0)),
                    (hasOpticDisc ||
                        hasOpticDiscSketch ||
                        hasOpticDiscCdr ||
                        hasOpticDiscNote) && (_jsxs("div", Object.assign({ className: "text-sm mt-5 pl-4 border-l-2 border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: "Optic Disc" }), void 0),
                            hasOpticDiscSketch && (_jsxs("div", Object.assign({ className: "mt-1 flex justify-around" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OD" }), void 0),
                                            _jsx(SketchDiagram, { alt: "Right Optic Disc", refValue: rightOpticDiscSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "13rem", image: circleImage, imageClassname: "w-60 h-52", value: patientChart.opthalmologyExam.rightOpticDiscSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0),
                                    _jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-center mb-5" }, { children: "OS" }), void 0),
                                            _jsx(SketchDiagram, { alt: "Left Optic Disc", refValue: leftOpticDiscSketch, selectedColor: selectedColor, selectedLineWeight: selectedLineWeight, width: "15rem", height: "11rem", image: circleImage, imageClassname: "w-60 h-52", value: patientChart.opthalmologyExam.leftOpticDiscSketch, readOnly: true, onChange: () => { } }, void 0)] }, void 0)] }), void 0)),
                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasOpticDiscCdr && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "CDR" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_128 = patientChart.opthalmologyExam) === null || _128 === void 0 ? void 0 : _128.rightCdr) && (_jsx("li", { children: `OD: ${(_129 = patientChart.opthalmologyExam) === null || _129 === void 0 ? void 0 : _129.rightCdr}` }, void 0)),
                                                    ((_130 = patientChart.opthalmologyExam) === null || _130 === void 0 ? void 0 : _130.leftCdr) && (_jsx("li", { children: `OS: ${(_131 = patientChart.opthalmologyExam) === null || _131 === void 0 ? void 0 : _131.leftCdr}` }, void 0))] }), void 0)] }), void 0)),
                                    hasOpticDisc && (_jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [_jsx("p", Object.assign({ className: "" }, { children: "Optic Disc" }), void 0),
                                            _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [((_132 = patientChart.opthalmologyExam) === null || _132 === void 0 ? void 0 : _132.rightOpticDisc) && (_jsx("li", { children: `OD: ${(_133 = patientChart.opthalmologyExam) === null || _133 === void 0 ? void 0 : _133.rightOpticDisc}` }, void 0)),
                                                    ((_134 = patientChart.opthalmologyExam) === null || _134 === void 0 ? void 0 : _134.leftOpticDisc) && (_jsx("li", { children: `OS: ${(_135 = patientChart.opthalmologyExam) === null || _135 === void 0 ? void 0 : _135.leftOpticDisc}` }, void 0))] }), void 0)] }), void 0)),
                                    hasOpticDisc && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.opthalmologyExam.opticDiscNote }), void 0))] }), void 0)] }), void 0))] }, void 0)),
            ((_137 = (_136 = patientChart.diagnosticProcedureOrder) === null || _136 === void 0 ? void 0 : _136.diagnosticProcedures.length) !== null && _137 !== void 0 ? _137 : 0) > 0 &&
                showDiagnosticProcedures && (_jsxs("div", Object.assign({ className: "text-sm mt-5" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: "Diagnostic Procedures" }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0), (_138 = patientChart.diagnosticProcedureOrder) === null || _138 === void 0 ? void 0 : _138.diagnosticProcedures.map((e, i) => {
                        var _a, _b;
                        const images = (_a = e === null || e === void 0 ? void 0 : e.images.map((e) => {
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
                        const documents = (_b = e === null || e === void 0 ? void 0 : e.documents.map((e) => {
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
                        })) !== null && _b !== void 0 ? _b : [];
                        return (_jsxs("div", Object.assign({ className: "mt-10" }, { children: [i !== 0 && _jsx("div", { className: "page-break" }, void 0),
                                _jsxs("div", Object.assign({ className: "pl-4 border-l-2 border-indigo-600" }, { children: [_jsx("p", Object.assign({ className: "font-semibold text-lg" }, { children: `${e.diagnosticProcedureType.title}` }), void 0),
                                        _jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: e.generalText }), void 0),
                                        images.map((image) => (_jsxs("div", { children: [i !== 0 && _jsx("div", { className: "page-break" }, void 0),
                                                _jsx("img", { className: "rounded-lg h-auto w-full object-cover", src: image.fileObject !== undefined
                                                        ? URL.createObjectURL(image.fileObject)
                                                        : image.fileUrl }, void 0),
                                                _jsx("div", Object.assign({ className: "text-center text-xl mt-10 font-semibold" }, { children: `${e.diagnosticProcedureType.title} - ${image.name}` }), void 0)] }, image.id)))] }), void 0)] }), e.id));
                    })] }), void 0)),
            ((_140 = (_139 = patientChart.labOrder) === null || _139 === void 0 ? void 0 : _139.labs.length) !== null && _140 !== void 0 ? _140 : 0) > 0 && showLabratory && (_jsxs("div", Object.assign({ className: "text-sm mt-5" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: "Labratory" }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0), (_141 = patientChart.labOrder) === null || _141 === void 0 ? void 0 : _141.labs.map((e, i) => (_jsxs("div", { children: [i !== 0 && _jsx("div", { className: "page-break" }, void 0),
                            _jsx("p", Object.assign({ className: "text-base font-semibold" }, { children: `${e.labType.title}` }), void 0),
                            _jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx(LabComponent, { values: e, readOnly: true, forPrint: true, onRefresh: () => { } }, void 0) }), void 0)] }, e.id)))] }), void 0)),
            hasDiagnosis && showDiagnosis && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: "Diagnosis" }), void 0),
                    _jsx("hr", { className: "my-5" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-1 pl-3" }, { children: [patientChart.diagnoses.map((e) => (_jsx("div", { children: _jsx("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: _jsx("li", { children: `${e === null || e === void 0 ? void 0 : e.fullDescription} ${(e === null || e === void 0 ? void 0 : e.location) && `(${e.location})`} ${(e === null || e === void 0 ? void 0 : e.differential) ? "(Differential)" : ""}` }, void 0) }), void 0) }, e === null || e === void 0 ? void 0 : e.id))),
                            patientChart.diagnosisNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.diagnosisNote }), void 0)),
                            patientChart.differentialDiagnosisNote && (_jsx("div", Object.assign({ className: "text-sm mt-2" }, { children: patientChart.differentialDiagnosisNote }), void 0))] }), void 0)] }), void 0)),
            showSurgery && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("div", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: `${(_143 = (_142 = surgeryQuery === null || surgeryQuery === void 0 ? void 0 : surgeryQuery.data) === null || _142 === void 0 ? void 0 : _142.surgicalProcedure) === null || _143 === void 0 ? void 0 : _143.surgicalProcedureType.title} Pre-op` }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0),
                    _jsx(PreOpForm, { register: surgicalProcedureForm.register, locked: true, handleChanges: () => { } }, void 0)] }), void 0)),
            showSurgery && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("div", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: `${(_145 = (_144 = surgeryQuery === null || surgeryQuery === void 0 ? void 0 : surgeryQuery.data) === null || _144 === void 0 ? void 0 : _144.surgicalProcedure) === null || _145 === void 0 ? void 0 : _145.surgicalProcedureType.title} Intra-op` }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0),
                    _jsx(IntraOpForm, { locked: true, register: surgicalProcedureForm.register, aclolUnplanned: (_147 = (_146 = surgeryQuery.data) === null || _146 === void 0 ? void 0 : _146.surgicalProcedure.aclolUnplanned) !== null && _147 !== void 0 ? _147 : false, handleChanges: () => { } }, void 0)] }), void 0)),
            showTreatment && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("div", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: `${(_149 = (_148 = treatmentQuery === null || treatmentQuery === void 0 ? void 0 : treatmentQuery.data) === null || _148 === void 0 ? void 0 : _148.treatment) === null || _149 === void 0 ? void 0 : _149.treatmentType.title} Intra-op` }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0),
                    _jsx(TreatmentForm, { locked: true, register: treatmentForm.register, handleChange: () => { } }, void 0)] }), void 0)),
            ((_151 = (_150 = patientChart.medicalPrescriptionOrder) === null || _150 === void 0 ? void 0 : _150.medicalPrescriptions.length) !== null && _151 !== void 0 ? _151 : 0) > 0 &&
                showPrescriptions && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: "Medical Prescriptions" }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0),
                    _jsx(MedicationTable, { readOnly: true, items: (_152 = patientChart.medicalPrescriptionOrder) === null || _152 === void 0 ? void 0 : _152.medicalPrescriptions, onPrint: () => { } }, void 0)] }), void 0)),
            ((_154 = (_153 = patientChart.eyewearPrescriptionOrder) === null || _153 === void 0 ? void 0 : _153.eyewearPrescriptions.length) !== null && _154 !== void 0 ? _154 : 0) > 0 &&
                showPrescriptions && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("div", { className: "page-break" }, void 0),
                    _jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light mt-5" }, { children: "Eyewear Prescriptions" }), void 0),
                    _jsx("hr", { className: "mt-5 mb-5" }, void 0),
                    _jsx(EyeGlassTable, { readOnly: true, items: (_155 = patientChart.eyewearPrescriptionOrder) === null || _155 === void 0 ? void 0 : _155.eyewearPrescriptions, onPrint: () => { } }, void 0)] }), void 0))] }), void 0));
};
export default PositiveFindingsPrint;
