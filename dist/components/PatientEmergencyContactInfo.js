import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ContentLoader from 'react-content-loader';
import { InfoBlock } from './PatientInfoBlock';
export const PatientEmergencyContactInfo = ({ data, loading }) => {
    return (_jsxs("div", { children: [loading && (_jsx("div", { children: _jsxs(ContentLoader, Object.assign({ speed: 2, width: "100%", height: 320, viewBox: "0 0 100% 320", backgroundColor: "#f3f3f3", foregroundColor: "#ecebeb" }, { children: [_jsx("rect", { y: "10", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "25", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "60", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "75", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "105", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "120", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "150", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "165", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "195", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "210", rx: "3", ry: "3", width: "270", height: "18" }, void 0)] }), void 0) }, void 0)),
            !loading && (_jsxs("div", { children: [_jsx(InfoBlock, { title: "Contact name", body: data === null || data === void 0 ? void 0 : data.emergencyContactName }, void 0),
                    _jsx(InfoBlock, { title: "Relationship to patient", body: data === null || data === void 0 ? void 0 : data.emergencyContactRel }, void 0),
                    _jsx(InfoBlock, { title: "Contact number", body: data === null || data === void 0 ? void 0 : data.emergencyContactPhone }, void 0),
                    _jsx(InfoBlock, { title: "Contact number 2", body: data === null || data === void 0 ? void 0 : data.emergencyContactPhone2 }, void 0),
                    _jsx(InfoBlock, { title: "Memo", body: data === null || data === void 0 ? void 0 : data.emergencyContactMemo }, void 0)] }, void 0))] }, void 0));
};
