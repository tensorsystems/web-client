import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProgressVitalSigns from "./ProgressVitalSigns";
const ProgressComponent = ({ patientChart }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
    const hasVisionDistance = ((_a = patientChart.vitalSigns) === null || _a === void 0 ? void 0 : _a.rightDistanceUncorrected) || ((_b = patientChart.vitalSigns) === null || _b === void 0 ? void 0 : _b.leftDistanceUncorrected) || ((_c = patientChart.vitalSigns) === null || _c === void 0 ? void 0 : _c.rightDistancePinhole) || ((_d = patientChart.vitalSigns) === null || _d === void 0 ? void 0 : _d.leftDistancePinhole) || ((_e = patientChart.vitalSigns) === null || _e === void 0 ? void 0 : _e.rightDistanceCorrected) || ((_f = patientChart.vitalSigns) === null || _f === void 0 ? void 0 : _f.leftDistanceCorrected);
    const hasVisionNear = ((_g = patientChart.vitalSigns) === null || _g === void 0 ? void 0 : _g.rightNearUncorrected) || ((_h = patientChart.vitalSigns) === null || _h === void 0 ? void 0 : _h.leftNearUncorrected) || ((_j = patientChart.vitalSigns) === null || _j === void 0 ? void 0 : _j.rightNearPinhole) || ((_k = patientChart.vitalSigns) === null || _k === void 0 ? void 0 : _k.leftNearPinhole) || ((_l = patientChart.vitalSigns) === null || _l === void 0 ? void 0 : _l.rightNearCorrected) || ((_m = patientChart.vitalSigns) === null || _m === void 0 ? void 0 : _m.leftNearCorrected);
    const hasIopApplanation = ((_o = patientChart.vitalSigns) === null || _o === void 0 ? void 0 : _o.rightApplanation) || ((_p = patientChart.vitalSigns) === null || _p === void 0 ? void 0 : _p.leftApplanation);
    const hasIopTonopen = ((_q = patientChart.vitalSigns) === null || _q === void 0 ? void 0 : _q.rightTonopen) || ((_r = patientChart.vitalSigns) === null || _r === void 0 ? void 0 : _r.leftTonopen);
    const hasIopDigital = ((_s = patientChart.vitalSigns) === null || _s === void 0 ? void 0 : _s.rightDigital) || ((_t = patientChart.vitalSigns) === null || _t === void 0 ? void 0 : _t.leftDigital);
    const hasIopNoncontact = ((_u = patientChart.vitalSigns) === null || _u === void 0 ? void 0 : _u.rightNoncontact) || ((_v = patientChart.vitalSigns) === null || _v === void 0 ? void 0 : _v.leftNoncontact);
    const hasLabOrders = ((_x = (_w = patientChart.labOrder) === null || _w === void 0 ? void 0 : _w.labs.length) !== null && _x !== void 0 ? _x : 0) > 0;
    const hasDiagnosticOrders = ((_z = (_y = patientChart.diagnosticProcedureOrder) === null || _y === void 0 ? void 0 : _y.diagnosticProcedures.length) !== null && _z !== void 0 ? _z : 0) >
        0;
    const hasSurgicalOrders = ((_1 = (_0 = patientChart.surgicalOrder) === null || _0 === void 0 ? void 0 : _0.surgicalProcedures.length) !== null && _1 !== void 0 ? _1 : 0) > 0;
    const hasTreatmentOrders = ((_3 = (_2 = patientChart.treatmentOrder) === null || _2 === void 0 ? void 0 : _2.treatments.length) !== null && _3 !== void 0 ? _3 : 0) > 0;
    const hasReferralOrders = ((_5 = (_4 = patientChart.referralOrder) === null || _4 === void 0 ? void 0 : _4.referrals.length) !== null && _5 !== void 0 ? _5 : 0) > 0;
    const hasFollowUpOrders = ((_7 = (_6 = patientChart.followUpOrder) === null || _6 === void 0 ? void 0 : _6.followUps.length) !== null && _7 !== void 0 ? _7 : 0) > 0;
    if (!hasVisionDistance &&
        !hasVisionNear &&
        !hasIopApplanation &&
        !hasIopTonopen &&
        !hasIopDigital &&
        !hasIopNoncontact &&
        !hasLabOrders &&
        !hasDiagnosticOrders &&
        !hasSurgicalOrders &&
        !hasTreatmentOrders &&
        !hasReferralOrders &&
        !hasFollowUpOrders &&
        ((_9 = (_8 = patientChart.medicalPrescriptionOrder) === null || _8 === void 0 ? void 0 : _8.medicalPrescriptions.length) !== null && _9 !== void 0 ? _9 : 0) === 0 &&
        !patientChart.summaryNote) {
        return (_jsx("div", Object.assign({ className: "flex justify-center items-center my-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-1 text-gray-400" }, { children: [_jsx("span", Object.assign({ className: "material-icons" }, { children: "hourglass_empty" }), void 0),
                    _jsx("p", { children: "Empty" }, void 0)] }), void 0) }), void 0));
    }
    return (_jsxs("div", { children: [_jsx(ProgressVitalSigns, { vitalSigns: patientChart.vitalSigns, showEmpty: false }, void 0),
            patientChart.diagnoses.filter((e) => (e === null || e === void 0 ? void 0 : e.differential) === false).length >
                0 && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold text-gray-800" }, { children: "Diagnosis" }), void 0),
                    _jsx("div", Object.assign({ className: "mt-1 pl-3" }, { children: _jsx("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: patientChart.diagnoses
                                .filter((e) => (e === null || e === void 0 ? void 0 : e.differential) === false)
                                .map((e) => (_jsx("li", { children: `${e === null || e === void 0 ? void 0 : e.fullDescription}, ${e === null || e === void 0 ? void 0 : e.location}` }, e === null || e === void 0 ? void 0 : e.id))) }), void 0) }), void 0)] }), void 0)),
            (hasDiagnosticOrders ||
                hasLabOrders ||
                hasSurgicalOrders ||
                hasTreatmentOrders ||
                hasReferralOrders ||
                hasFollowUpOrders) && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold text-gray-800" }, { children: "Plan" }), void 0),
                    _jsx("div", Object.assign({ className: "mt-1 pl-3" }, { children: _jsxs("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: [hasDiagnosticOrders && (_jsxs("li", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Diagnostic Procedures: " }), void 0),
                                        _jsx("span", { children: (_10 = patientChart.diagnosticProcedureOrder) === null || _10 === void 0 ? void 0 : _10.diagnosticProcedures.map((e) => e.diagnosticProcedureTypeTitle).join(", ") }, void 0)] }, void 0)),
                                hasLabOrders && (_jsxs("li", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Lab: " }), void 0),
                                        _jsx("span", { children: (_11 = patientChart.labOrder) === null || _11 === void 0 ? void 0 : _11.labs.map((e) => e.labTypeTitle).join(", ") }, void 0)] }, void 0)),
                                hasSurgicalOrders && (_jsxs("li", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Surgery: " }), void 0),
                                        _jsx("span", { children: (_12 = patientChart.surgicalOrder) === null || _12 === void 0 ? void 0 : _12.surgicalProcedures.map((e) => e.surgicalProcedureTypeTitle).join(", ") }, void 0)] }, void 0)),
                                hasTreatmentOrders && (_jsxs("li", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Treatments: " }), void 0),
                                        _jsx("span", { children: (_13 = patientChart.treatmentOrder) === null || _13 === void 0 ? void 0 : _13.treatments.map((e) => e.treatmentTypeTitle).join(", ") }, void 0)] }, void 0)),
                                hasFollowUpOrders && (_jsxs("li", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Follow Ups: " }), void 0),
                                        _jsx("span", { children: (_14 = patientChart.followUpOrder) === null || _14 === void 0 ? void 0 : _14.followUps.map((e) => e.receptionNote).join(", ") }, void 0)] }, void 0)),
                                hasReferralOrders && (_jsxs("li", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Referrals: " }), void 0),
                                        _jsx("span", { children: "Dr. " + ((_15 = patientChart.referralOrder) === null || _15 === void 0 ? void 0 : _15.referrals.map((e) => e.referredToName).join(", ")) }, void 0)] }, void 0))] }), void 0) }), void 0)] }), void 0)),
            ((_17 = (_16 = patientChart.medicalPrescriptionOrder) === null || _16 === void 0 ? void 0 : _16.medicalPrescriptions.length) !== null && _17 !== void 0 ? _17 : 0) > 0 && (_jsxs("div", Object.assign({ className: "text-sm mt-2" }, { children: [_jsx("p", Object.assign({ className: "text-base font-semibold text-gray-800" }, { children: "Prescriptions" }), void 0),
                    _jsx("div", Object.assign({ className: "mt-1 pl-3" }, { children: _jsx("ul", Object.assign({ className: "list-inside list-disc pl-3" }, { children: (_18 = patientChart.medicalPrescriptionOrder) === null || _18 === void 0 ? void 0 : _18.medicalPrescriptions.map((e) => (_jsx("li", { children: `${e === null || e === void 0 ? void 0 : e.medication}, ${e === null || e === void 0 ? void 0 : e.sig}` }, e === null || e === void 0 ? void 0 : e.id))) }), void 0) }), void 0)] }), void 0)),
            _jsx("div", Object.assign({ className: "text-sm mt-4" }, { children: patientChart.summaryNote }), void 0)] }, void 0));
};
export default ProgressComponent;
