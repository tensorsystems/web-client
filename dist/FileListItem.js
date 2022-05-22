import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FileViewer } from "./FileViewer";
export const FileListItem = ({ url, name, type }) => {
    const [fileViewer, setFileViewer] = useState({
        isOpen: false,
    });
    let contentType = "image";
    if (type === null || type === void 0 ? void 0 : type.startsWith("image")) {
        contentType = "image";
    }
    else {
        contentType = "document";
    }
    const handlePreviewClick = () => {
        setFileViewer({
            isOpen: true,
            src: url,
            type: contentType,
            meta: {
                name: name,
                type: type,
                lastModifiedDate: new Date(),
            },
        });
    };
    return (_jsxs("div", Object.assign({ className: "flex p-3 rounded-md" }, { children: [_jsx("div", Object.assign({ className: "mt-1 flex justify-between" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-4" }, { children: [_jsx("img", { className: "rounded-lg h-16 w-16 object-cover shadow-xl cursor-pointer transform hover:scale-110", src: url, onClick: () => handlePreviewClick() }, void 0),
                        _jsxs("div", { children: [_jsx("p", Object.assign({ className: "font-semibold w-full max-w-full text-sm" }, { children: name }), void 0),
                                _jsx("p", Object.assign({ className: "text-sm text-gray-500" }, { children: type }), void 0)] }, void 0)] }), void 0) }), void 0),
            _jsx(FileViewer, { isOpen: fileViewer.isOpen, src: fileViewer.src, meta: fileViewer.meta, onClose: () => setFileViewer({ isOpen: false }) }, void 0)] }), void 0));
};
