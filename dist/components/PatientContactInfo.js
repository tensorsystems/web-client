import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ContentLoader from "react-content-loader";
import { InfoBlock } from "./PatientInfoBlock";
export const PatientContactInfo = ({ data, loading }) => {
    return (_jsxs("div", { children: [loading && (_jsx("div", { children: _jsxs(ContentLoader, Object.assign({ speed: 2, width: "100%", height: 320, viewBox: "0 0 100% 320", backgroundColor: "#f3f3f3", foregroundColor: "#ecebeb" }, { children: [_jsx("rect", { y: "10", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "25", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "60", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "75", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "105", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "120", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "150", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "165", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "195", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "210", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "240", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "255", rx: "3", ry: "3", width: "270", height: "18" }, void 0),
                        _jsx("rect", { y: "285", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
                        _jsx("rect", { y: "300", rx: "3", ry: "3", width: "270", height: "18" }, void 0)] }), void 0) }, void 0)),
            !loading && (_jsxs("div", { children: [_jsx(InfoBlock, { title: "Cell phone 1", body: data === null || data === void 0 ? void 0 : data.phoneNo }, void 0),
                    _jsx(InfoBlock, { title: "Cell phone 2", body: data === null || data === void 0 ? void 0 : data.phoneNo2 }, void 0),
                    _jsx(InfoBlock, { title: "Home Phone", body: data === null || data === void 0 ? void 0 : data.homePhone }, void 0),
                    _jsx(InfoBlock, { title: "Region", body: data === null || data === void 0 ? void 0 : data.region }, void 0),
                    _jsx(InfoBlock, { title: "Woreda", body: data === null || data === void 0 ? void 0 : data.woreda }, void 0),
                    _jsx(InfoBlock, { title: "City", body: data === null || data === void 0 ? void 0 : data.city }, void 0),
                    _jsx(InfoBlock, { title: "Sub-City", body: data === null || data === void 0 ? void 0 : data.subCity }, void 0),
                    _jsx(InfoBlock, { title: "Kebele", body: data === null || data === void 0 ? void 0 : data.kebele }, void 0),
                    _jsx(InfoBlock, { title: "Email", body: data === null || data === void 0 ? void 0 : data.email }, void 0),
                    _jsx(InfoBlock, { title: "House No", body: data === null || data === void 0 ? void 0 : data.houseNo }, void 0)] }, void 0))] }, void 0));
};
