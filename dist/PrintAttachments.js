import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SizeMe } from "react-sizeme";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
export const PrintAttachments = ({ files }) => {
    return (_jsx("div", { children: files.map((file, index) => {
            var _a, _b;
            if ((_a = file.contentType) === null || _a === void 0 ? void 0 : _a.startsWith("image")) {
                return (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "my-5" }, { children: file.title }), void 0),
                        _jsx("img", { className: "w-full h-auto object-cover", src: file.fileObject !== undefined
                                ? URL.createObjectURL(file.fileObject)
                                : file.fileUrl }, void 0),
                        _jsx("div", { className: "page-break" }, void 0)] }, void 0));
            }
            if ((_b = file.contentType) === null || _b === void 0 ? void 0 : _b.startsWith("application/pdf")) {
                let pageNums = 0;
                const onDocumentLoadSuccess = (pdf) => {
                    pageNums = pdf.numPages;
                };
                return (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "my-5" }, { children: file.title }), void 0),
                        _jsx(SizeMe, { children: ({ size }) => {
                                var _a;
                                return (_jsx("div", Object.assign({ className: "flex-1 flex items-center justify-center mt-3" }, { children: _jsx("div", Object.assign({ className: "relative" }, { children: _jsx("div", { children: _jsx(Document, Object.assign({ file: file, onLoadSuccess: onDocumentLoadSuccess }, { children: _jsx(Page, { width: (_a = size.width) !== null && _a !== void 0 ? _a : 950, pageNumber: 1 }, void 0) }), void 0) }, void 0) }), void 0) }), void 0));
                            } }, void 0)] }, void 0));
            }
            return _jsx("div", {}, void 0);
        }) }, void 0));
};
