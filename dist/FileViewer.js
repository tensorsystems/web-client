import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import { useState } from "react";
import Modal from "react-modal";
import { saveAs } from "file-saver";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
const customStyles = {
    content: {
        top: "3%",
        left: "3%",
        right: "3%",
        bottom: "3%",
        padding: 0,
        border: "none",
        backgroundColor: "rgba(0,0,0,0.2)",
        zIndex: 30,
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(40px)",
        zIndex: 100,
    },
};
Modal.setAppElement("#root");
export const FileViewer = ({ isOpen, src, meta, onClose, }) => {
    const isImage = meta.type.split("/")[0] === "image";
    const isPdf = meta.type === "application/pdf";
    return (_jsxs(Modal, Object.assign({ isOpen: isOpen, onAfterOpen: () => { }, onRequestClose: onClose, style: customStyles }, { children: [isImage && _jsx(RenderImages, { src: src, meta: meta, onClose: onClose }, void 0),
            isPdf && _jsx(RenderDocument, { src: src, meta: meta, onClose: onClose }, void 0)] }), void 0));
};
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
const RenderImages = ({ src, meta, onClose }) => {
    const onPrint = () => {
        saveAs(src, meta === null || meta === void 0 ? void 0 : meta.name);
    };
    const getValidDate = (date) => {
        if (date instanceof Date) {
            return format(date, "MMM d, y");
        }
        else {
            return format(parseISO(date), "MMM d, y");
        }
    };
    return (_jsxs("div", Object.assign({ className: "flex h-full bg-gray-800" }, { children: [_jsxs("div", Object.assign({ className: "flex-initial text-left bg-gray-800 pr-4 pl-4 pt-4" }, { children: [_jsx("p", Object.assign({ className: "text-white text-lg font-bold" }, { children: meta === null || meta === void 0 ? void 0 : meta.name }), void 0),
                    _jsx("hr", { className: "mt-4" }, void 0),
                    _jsx("div", { className: "mt-4" }, void 0),
                    _jsx("span", Object.assign({ className: "text-white" }, { children: "Kind: " }), void 0),
                    _jsx("span", Object.assign({ className: "text-gray-300" }, { children: meta === null || meta === void 0 ? void 0 : meta.type }), void 0), " ", _jsx("br", {}, void 0),
                    _jsx("span", Object.assign({ className: "text-white" }, { children: "Size: " }), void 0),
                    _jsx("span", Object.assign({ className: "text-gray-300" }, { children: formatBytes(meta.size) }), void 0), " ", _jsx("br", {}, void 0),
                    _jsx("span", Object.assign({ className: "text-white" }, { children: "Created: " }), void 0),
                    _jsx("span", Object.assign({ className: "text-gray-300" }, { children: meta.createdAt && getValidDate(meta.createdAt) }), void 0),
                    _jsx("hr", { className: "mt-4" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "comments", className: "block text-sm font-medium text-gray-300" }, { children: "Comments" }), void 0),
                            _jsx("textarea", { name: "comments", id: "comments", rows: 4, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-800 bg-gray-700 focus:bg-gray-600 text-white border rounded-md" }, void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx("button", Object.assign({ type: "button", className: "w-full border-white border rounded-lg px-2 py-1 text-white", onClick: onPrint }, { children: "Download Image" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx("button", Object.assign({ type: "button", className: "w-full border-white border rounded-lg px-2 py-1 text-white", onClick: onClose }, { children: "Close" }), void 0) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "flex-1" }, { children: _jsx("img", { src: src, className: "w-full h-full object-cover" }, void 0) }), void 0)] }), void 0));
};
const RenderDocument = ({ src, meta, onClose }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isDocumentFocused, setIsDocumentFocused] = useState(false);
    const onDocumentLoadSuccess = (pdf) => {
        setNumPages(pdf.numPages);
    };
    const onPrint = () => {
        saveAs(src, meta === null || meta === void 0 ? void 0 : meta.name);
    };
    return (_jsxs("div", Object.assign({ className: "flex " }, { children: [_jsxs("div", Object.assign({ className: "flex-initial text-left bg-gray-800 pr-4 pl-4 pt-4" }, { children: [_jsx("p", Object.assign({ className: "text-white text-lg font-bold" }, { children: meta === null || meta === void 0 ? void 0 : meta.name }), void 0),
                    _jsx("hr", { className: "mt-4" }, void 0),
                    _jsx("div", { className: "mt-4" }, void 0),
                    _jsx("span", Object.assign({ className: "text-white" }, { children: "Kind: " }), void 0),
                    _jsx("span", Object.assign({ className: "text-gray-300" }, { children: meta === null || meta === void 0 ? void 0 : meta.type }), void 0), " ", _jsx("br", {}, void 0),
                    _jsx("span", Object.assign({ className: "text-white" }, { children: "Size: " }), void 0),
                    _jsx("span", Object.assign({ className: "text-gray-300" }, { children: "10MB" }), void 0), " ", _jsx("br", {}, void 0),
                    _jsx("span", Object.assign({ className: "text-white" }, { children: "Created: " }), void 0),
                    _jsx("span", Object.assign({ className: "text-gray-300" }, { children: "5 October 2020" }), void 0),
                    _jsx("hr", { className: "mt-4" }, void 0),
                    _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "comments", className: "block text-sm font-medium text-gray-300" }, { children: "Comments" }), void 0),
                            _jsx("textarea", { name: "comments", id: "comments", rows: 4, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-800 bg-gray-700 focus:bg-gray-600 text-white border rounded-md" }, void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx("button", Object.assign({ type: "button", className: "w-full border-white border rounded-lg px-2 py-1 text-white", onClick: onPrint }, { children: "Download Document" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsx("button", Object.assign({ type: "button", className: "w-full border-white border rounded-lg px-2 py-1 text-white", onClick: onClose }, { children: "Close" }), void 0) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "flex-1 flex items-center justify-center" }, { children: _jsxs("div", Object.assign({ className: "relative" }, { children: [_jsx("div", Object.assign({ onMouseEnter: () => setIsDocumentFocused(true), onMouseLeave: () => setIsDocumentFocused(false) }, { children: _jsx(Document, Object.assign({ file: src, onLoadSuccess: onDocumentLoadSuccess }, { children: _jsx(Page, { pageNumber: pageNumber }, void 0) }), void 0) }), void 0),
                        _jsx("div", Object.assign({ hidden: !isDocumentFocused, className: "absolute bottom-10 inset-x-0", onMouseEnter: () => setIsDocumentFocused(true), onMouseLeave: () => setIsDocumentFocused(false) }, { children: _jsxs("div", Object.assign({ className: "flex justify-between" }, { children: [_jsx("div", {}, void 0),
                                    _jsx("div", { children: _jsx("div", Object.assign({ className: "bg-white px-3 py-3 shadow-2xl rounded-md" }, { children: _jsxs("div", Object.assign({ className: "flex items-center space-x-5" }, { children: [_jsx("button", Object.assign({ type: "button", disabled: pageNumber === 1, onClick: () => setPageNumber(pageNumber - 1) }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-4 text-gray-500" }, { children: _jsx("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }, void 0) }), void 0) }), void 0),
                                                    _jsxs("p", Object.assign({ className: "italic" }, { children: [pageNumber, " of ", numPages] }), void 0),
                                                    _jsx("button", Object.assign({ type: "button", disabled: pageNumber === numPages, onClick: () => setPageNumber(pageNumber + 1) }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-4 text-gray-500" }, { children: _jsx("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0) }, void 0),
                                    _jsx("div", {}, void 0)] }), void 0) }), void 0)] }), void 0) }), void 0)] }), void 0));
};
