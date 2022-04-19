import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ContentLoader from "react-content-loader";
import { getFileUrl } from "../util";
import { FileUploaderComponent } from "./FileUploaderComponent";
export const PatientDocuments = ({ data, loading }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const paperRecordDocument = {
        id: (_a = data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null || _a === void 0 ? void 0 : _a.id,
        fileUrl: getFileUrl({
            baseUrl: process.env.REACT_APP_SERVER_URL,
            fileName: (_c = (_b = data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null || _b === void 0 ? void 0 : _b.fileName) !== null && _c !== void 0 ? _c : "",
            hash: (_e = (_d = data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null || _d === void 0 ? void 0 : _d.hash) !== null && _e !== void 0 ? _e : "",
            extension: (_g = (_f = data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null || _f === void 0 ? void 0 : _f.extension) !== null && _g !== void 0 ? _g : "",
        }),
        name: (_j = (_h = data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null || _h === void 0 ? void 0 : _h.fileName) !== null && _j !== void 0 ? _j : "",
        size: (_k = data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null || _k === void 0 ? void 0 : _k.size,
        createdAt: (_l = data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null || _l === void 0 ? void 0 : _l.createdAt,
        contentType: (_o = (_m = data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null || _m === void 0 ? void 0 : _m.contentType) !== null && _o !== void 0 ? _o : "",
    };
    const otherDocuments = (_q = (_p = data === null || data === void 0 ? void 0 : data.documents) === null || _p === void 0 ? void 0 : _p.map((e) => {
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
    })) !== null && _q !== void 0 ? _q : [];
    if (loading) {
        return (_jsx("div", { children: _jsxs(ContentLoader, Object.assign({ speed: 2, width: "100%", height: 320, viewBox: "0 0 100% 320", backgroundColor: "#f3f3f3", foregroundColor: "#ecebeb" }, { children: [_jsx("rect", { y: "10", rx: "3", ry: "3", width: "200", height: "10" }, void 0),
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
                    _jsx("rect", { y: "300", rx: "3", ry: "3", width: "270", height: "18" }, void 0)] }), void 0) }, void 0));
    }
    return (_jsxs("div", { children: [(data === null || data === void 0 ? void 0 : data.paperRecordDocument) && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "font-semibold text-xl text-gray-700" }, { children: "Paper Record" }), void 0),
                    _jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx(FileUploaderComponent, { multiSelect: false, values: [paperRecordDocument], accept: "document" }, void 0) }), void 0)] }, void 0)),
            otherDocuments.length > 0 && (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "mt-10 font-semibold text-xl text-gray-700" }, { children: "Other documents" }), void 0),
                    _jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx(FileUploaderComponent, { multiSelect: false, values: otherDocuments, accept: "document" }, void 0) }), void 0)] }, void 0)),
            (data === null || data === void 0 ? void 0 : data.paperRecordDocument) === null && otherDocuments.length === 0 && (_jsx("p", { children: "Nothing here yet" }, void 0))] }, void 0));
};
