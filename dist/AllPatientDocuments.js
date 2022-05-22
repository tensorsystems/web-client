import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const AllPatientDocuments = ({ onCancel }) => {
    return (_jsx("div", Object.assign({ className: "container mx-auto text-lg" }, { children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(ExpandableItem, { title: "17 July, 2021" }, void 0) }, void 0),
                _jsx("li", Object.assign({ className: "" }, { children: _jsx(ExpandableItem, { title: "21 July, 2021 (2)", body: _jsx("div", Object.assign({ className: "mt-2 ml-8" }, { children: _jsx(ExpandableItem, { title: "B-Scan Ultrasound (2)" }, void 0) }), void 0) }, void 0) }), void 0),
                _jsx("li", { children: _jsx(ExpandableItem, { title: "26 July, 2021" }, void 0) }, void 0)] }, void 0) }), void 0));
};
const ExpandableItem = ({ title, body }) => {
    const [open, setOpen] = useState(false);
    return (_jsxs("div", { children: [_jsxs("div", Object.assign({ className: "flex items-center text-blue-600 cursor-pointer", onClick: () => setOpen(!open) }, { children: [open ? (_jsx("span", Object.assign({ className: "material-icons" }, { children: "arrow_drop_down" }), void 0)) : (_jsx("span", Object.assign({ className: "material-icons" }, { children: "arrow_right" }), void 0)),
                    _jsx("p", Object.assign({ className: "underline" }, { children: title }), void 0)] }), void 0), open && body] }, void 0));
};
export default AllPatientDocuments;
