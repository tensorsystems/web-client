import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
const GET_VISUAL_ACUITY = gql `
  query GetVisualAcuity($filter: VitalSignsFilter!) {
    vitalSigns(filter: $filter) {
      id
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
    }
  }
`;
export const VisionSideInfo = ({ patientChartId }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    const { data } = useQuery(GET_VISUAL_ACUITY, {
        variables: {
            filter: { patientChartId },
        },
    });
    const hasDistanceUncorrected = ((_a = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _a === void 0 ? void 0 : _a.rightDistanceUncorrected) || ((_b = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _b === void 0 ? void 0 : _b.leftDistanceUncorrected);
    const hasDistanceCorrected = ((_c = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _c === void 0 ? void 0 : _c.rightDistanceCorrected) || ((_d = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _d === void 0 ? void 0 : _d.leftDistanceCorrected);
    const hasDistancePinhole = ((_e = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _e === void 0 ? void 0 : _e.rightDistancePinhole) || ((_f = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _f === void 0 ? void 0 : _f.leftDistancePinhole);
    const hasNearUncorrected = ((_g = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _g === void 0 ? void 0 : _g.rightNearUncorrected) || ((_h = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _h === void 0 ? void 0 : _h.leftNearUncorrected);
    const hasNearCorrected = ((_j = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _j === void 0 ? void 0 : _j.rightNearCorrected) || ((_k = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _k === void 0 ? void 0 : _k.leftNearCorrected);
    const hasNearPinhole = ((_l = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _l === void 0 ? void 0 : _l.rightNearPinhole) || ((_m = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _m === void 0 ? void 0 : _m.leftNearPinhole);
    return (_jsx("div", Object.assign({ className: "shadow overflow-hidden rounded-lg text-xs" }, { children: _jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsx("thead", { children: _jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 3, className: "px-4 py-2 bg-teal-700 text-left text-gray-50 uppercase tracking-wider" }, { children: "Vision" }), void 0) }, void 0) }, void 0),
                _jsxs("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-1" }, { children: [_jsxs("tr", Object.assign({ className: "text-center font-bold" }, { children: [_jsx("td", { className: "p-1" }, void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: "OD" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: "OS" }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasDistanceUncorrected, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "D. Uncorrected" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_o = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _o === void 0 ? void 0 : _o.rightDistanceUncorrected }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_p = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _p === void 0 ? void 0 : _p.leftDistanceUncorrected }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasDistanceCorrected, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "D. Corrected" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_q = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _q === void 0 ? void 0 : _q.rightDistanceCorrected }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_r = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _r === void 0 ? void 0 : _r.leftDistanceCorrected }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasDistancePinhole, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "D. Pinhole" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_s = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _s === void 0 ? void 0 : _s.rightDistancePinhole }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_t = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _t === void 0 ? void 0 : _t.leftDistancePinhole }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasNearUncorrected, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "N. Uncorrected" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_u = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _u === void 0 ? void 0 : _u.rightNearUncorrected }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_v = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _v === void 0 ? void 0 : _v.leftNearUncorrected }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasNearCorrected, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "N. Corrected" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_w = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _w === void 0 ? void 0 : _w.rightNearCorrected }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_x = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _x === void 0 ? void 0 : _x.leftNearCorrected }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasNearPinhole, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "N. Pinhole" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_y = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _y === void 0 ? void 0 : _y.rightNearPinhole }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_z = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _z === void 0 ? void 0 : _z.leftNearPinhole }), void 0)] }), void 0)] }), void 0)] }), void 0) }), void 0));
};
