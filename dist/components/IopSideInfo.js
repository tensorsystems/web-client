import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
const GET_IOP = gql `
  query GetIop($filter: VitalSignsFilter!) {
    vitalSigns(filter: $filter) {
      id
      rightApplanation
      leftApplanation
      rightTonopen
      leftTonopen
      rightDigital
      leftDigital
      rightNoncontact
      leftNoncontact
    }
  }
`;
export const IopSideInfo = ({ patientChartId, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const { data } = useQuery(GET_IOP, {
        variables: {
            filter: { patientChartId },
        },
    });
    const hasApplanation = ((_a = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _a === void 0 ? void 0 : _a.rightApplanation) || ((_b = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _b === void 0 ? void 0 : _b.leftApplanation);
    const hasTonopen = ((_c = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _c === void 0 ? void 0 : _c.rightTonopen) || ((_d = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _d === void 0 ? void 0 : _d.leftTonopen);
    const hasDigital = ((_e = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _e === void 0 ? void 0 : _e.rightDigital) || ((_f = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _f === void 0 ? void 0 : _f.leftDigital);
    const hasNonContact = ((_g = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _g === void 0 ? void 0 : _g.rightNoncontact) || ((_h = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _h === void 0 ? void 0 : _h.leftNoncontact);
    return (_jsx("div", Object.assign({ className: "shadow overflow-hidden rounded-lg text-xs" }, { children: _jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsx("thead", { children: _jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 3, className: "px-4 py-2 bg-teal-700 text-left text-gray-50 uppercase tracking-wider" }, { children: "IOP" }), void 0) }, void 0) }, void 0),
                _jsxs("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-1" }, { children: [_jsxs("tr", Object.assign({ className: "text-center font-bold" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: "OD" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: "OS" }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasApplanation, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "Applanation" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_j = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _j === void 0 ? void 0 : _j.rightApplanation }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_k = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _k === void 0 ? void 0 : _k.leftApplanation }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasTonopen, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "Tonopen" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_l = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _l === void 0 ? void 0 : _l.rightTonopen }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_m = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _m === void 0 ? void 0 : _m.leftTonopen }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasDigital, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "Digital" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_o = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _o === void 0 ? void 0 : _o.rightDigital }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_p = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _p === void 0 ? void 0 : _p.leftDigital }), void 0)] }), void 0),
                        _jsxs("tr", Object.assign({ hidden: !hasNonContact, className: "text-gray-800 text-center" }, { children: [_jsx("td", Object.assign({ className: "p-1" }, { children: "Non-Contact" }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_q = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _q === void 0 ? void 0 : _q.rightNoncontact }), void 0),
                                _jsx("td", Object.assign({ className: "p-1" }, { children: (_r = data === null || data === void 0 ? void 0 : data.vitalSigns) === null || _r === void 0 ? void 0 : _r.leftNoncontact }), void 0)] }), void 0)] }), void 0)] }), void 0) }), void 0));
};
