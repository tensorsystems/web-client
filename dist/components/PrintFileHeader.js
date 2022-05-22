import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import QRCode from "qrcode.react";
import { gql, useQuery } from "@apollo/client";
const GET_ORGANIZATION_DETAILS = gql `
  query GetOrganizationDetails {
    organizationDetails {
      id
      name
      phoneNo
      phoneNo2
      address
      address2
      website
      email
      lanIpAddress
      logoId
      logo {
        id
        size
        hash
        fileName
        extension
        contentType
        createdAt
      }
    }
  }
`;
const PrintFileHeader = ({ qrUrl }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const { data } = useQuery(GET_ORGANIZATION_DETAILS);
    const hasLogo = (data === null || data === void 0 ? void 0 : data.organizationDetails.logo) !== null &&
        (data === null || data === void 0 ? void 0 : data.organizationDetails.logo) !== undefined;
    const hasWebsite = ((_a = data === null || data === void 0 ? void 0 : data.organizationDetails.website) !== null && _a !== void 0 ? _a : 0) > 0;
    const hasPhoneNo = ((_c = (_b = data === null || data === void 0 ? void 0 : data.organizationDetails.phoneNo) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0 ||
        ((_e = (_d = data === null || data === void 0 ? void 0 : data.organizationDetails.phoneNo2) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0) > 0;
    const hasAddress = ((_g = (_f = data === null || data === void 0 ? void 0 : data.organizationDetails.address) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : 0) > 0 ||
        ((_j = (_h = data === null || data === void 0 ? void 0 : data.organizationDetails.address2) === null || _h === void 0 ? void 0 : _h.length) !== null && _j !== void 0 ? _j : 0) > 0;
    return (_jsxs("div", Object.assign({ className: "flex justify-between items-center mt-10 text-sm" }, { children: [_jsx("div", Object.assign({ className: "flex-1" }, { children: hasLogo ? (_jsx("img", { src: `${process.env.REACT_APP_SERVER_URL}/files/${(_l = (_k = data === null || data === void 0 ? void 0 : data.organizationDetails) === null || _k === void 0 ? void 0 : _k.logo) === null || _l === void 0 ? void 0 : _l.fileName}_${(_o = (_m = data === null || data === void 0 ? void 0 : data.organizationDetails) === null || _m === void 0 ? void 0 : _m.logo) === null || _o === void 0 ? void 0 : _o.hash}.${(_q = (_p = data === null || data === void 0 ? void 0 : data.organizationDetails) === null || _p === void 0 ? void 0 : _p.logo) === null || _q === void 0 ? void 0 : _q.extension}`, alt: "Logo", className: "h-auto w-36" }, void 0)) : (_jsx("p", Object.assign({ className: "text-lg w-auto text-center" }, { children: data === null || data === void 0 ? void 0 : data.organizationDetails.name }), void 0)) }), void 0),
            _jsx("div", Object.assign({ className: "flex-1 items-center justify-center flex" }, { children: _jsx(QRCode, { size: 60, value: "www.tensorsystems.net" }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "text-gray-700 flex-1" }, { children: [hasWebsite && (_jsxs("div", Object.assign({ className: "flex items-center space-x-2" }, { children: [_jsx("p", Object.assign({ className: "material-icons" }, { children: "language" }), void 0),
                            _jsx("p", { children: data === null || data === void 0 ? void 0 : data.organizationDetails.website }, void 0)] }), void 0)),
                    hasAddress && (_jsxs("div", Object.assign({ className: "flex items-center space-x-2 " }, { children: [_jsx("p", Object.assign({ className: "material-icons" }, { children: "place" }), void 0),
                            _jsx("p", { children: `${data === null || data === void 0 ? void 0 : data.organizationDetails.address}` }, void 0)] }), void 0)),
                    hasPhoneNo && (_jsxs("div", Object.assign({ className: "flex items-center space-x-2 " }, { children: [_jsx("p", Object.assign({ className: "material-icons" }, { children: "call" }), void 0),
                            _jsx("p", { children: `${data === null || data === void 0 ? void 0 : data.organizationDetails.phoneNo} ${(data === null || data === void 0 ? void 0 : data.organizationDetails.phoneNo2) &&
                                    " / " + (data === null || data === void 0 ? void 0 : data.organizationDetails.phoneNo2)}` }, void 0)] }), void 0))] }), void 0)] }), void 0));
};
export default PrintFileHeader;
