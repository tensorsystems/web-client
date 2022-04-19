import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Transition } from "@headlessui/react";
import { format, parseISO } from "date-fns";
import { Fragment, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { getFileUrl, getPatientAge } from "../util";
import PrintFileHeader from "./PrintFileHeader";
const MedicalPrescriptionPrint = ({ user, patient, medicalPrescriptionOrder, }) => {
    const [showPrintButton, setShowPrintButton] = useState(false);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (_jsx("div", { children: _jsxs("div", Object.assign({ onMouseEnter: () => setShowPrintButton(true), onMouseLeave: () => setShowPrintButton(false), className: "bg-gray-600 rounded  p-5 mt-5" }, { children: [_jsx("p", Object.assign({ className: "text-white font-semibold" }, { children: "Available for print" }), void 0),
                _jsxs("div", Object.assign({ className: "relative text-sm mt-5" }, { children: [_jsxs("div", Object.assign({ className: "bg-white p-6", ref: componentRef }, { children: [_jsx(PrintFileHeader, { qrUrl: `http://${process.env.REACT_APP_SERVER_URL}/#/appointments/null/patient-dashboard` }, void 0),
                                _jsx("hr", { className: "border border-solid border-teal-500 bg-teal-400 mt-5" }, void 0),
                                _jsx("p", Object.assign({ className: "text-2xl text-gray-700 text-center mt-4" }, { children: "Rx" }), void 0),
                                _jsx("hr", { className: "my-2" }, void 0),
                                _jsxs("div", Object.assign({ className: "grid grid-rows-3 grid-flow-col" }, { children: [_jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Patient:" }), void 0), " ", _jsx("span", { children: `${patient.firstName} ${patient.lastName}` }, void 0)] }, void 0),
                                        _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Age:" }), void 0), " ", _jsx("span", { children: getPatientAge(patient.dateOfBirth) }, void 0)] }, void 0),
                                        _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Gender:" }), void 0), " ", _jsx("span", { children: patient.gender }, void 0)] }, void 0),
                                        _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "City:" }), void 0), " ", _jsx("span", { children: patient.city }, void 0)] }, void 0),
                                        _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Woreda:" }), void 0), " ", _jsx("span", { children: patient.woreda }, void 0)] }, void 0),
                                        _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Tel:" }), void 0), " ", _jsx("span", { children: patient.phoneNo }, void 0)] }, void 0),
                                        _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Electronic ID:" }), void 0), " ", _jsx("span", { children: patient.id }, void 0)] }, void 0)] }), void 0),
                                _jsx("hr", { className: "mt-2" }, void 0),
                                _jsxs("table", Object.assign({ className: "table-auto divide-y divide-gray-200 mt-5 w-full shadow-lg rounded-lg" }, { children: [_jsx("thead", Object.assign({ className: "bg-teal-700" }, { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Rx" }), void 0),
                                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Directions" }), void 0),
                                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Refill" }), void 0),
                                                    _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider" }, { children: "Price" }), void 0)] }, void 0) }), void 0),
                                        _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: medicalPrescriptionOrder.medicalPrescriptions.map((e) => (_jsxs("tr", { children: [_jsx("td", Object.assign({ className: "px-6 py-2 text-sm text-gray-900" }, { children: `${e === null || e === void 0 ? void 0 : e.medication}, ${e === null || e === void 0 ? void 0 : e.sig}` }), void 0),
                                                    _jsx("td", Object.assign({ className: "px-6 py-2 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.directionToPatient }), void 0),
                                                    _jsx("td", Object.assign({ className: "px-6 py-2 text-sm text-gray-900" }, { children: e === null || e === void 0 ? void 0 : e.refill }), void 0),
                                                    _jsx("td", { className: "px-6 py-2 text-sm text-gray-900" }, void 0)] }, e === null || e === void 0 ? void 0 : e.id))) }), void 0)] }), void 0),
                                _jsxs("div", Object.assign({ className: "mt-5 flex justify-between" }, { children: [_jsxs("div", { children: [_jsx("p", Object.assign({ className: "font-bold" }, { children: "Prescriber" }), void 0),
                                                _jsxs("div", Object.assign({ className: "mt-2" }, { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Name: " }), void 0),
                                                        _jsx("span", { children: `Dr. ${user.firstName} ${user.lastName}` }, void 0)] }), void 0),
                                                _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Qualification: " }), void 0),
                                                        _jsx("span", { children: "MD" }, void 0)] }, void 0),
                                                _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Registration #: " }), void 0),
                                                        _jsx("span", {}, void 0)] }, void 0),
                                                _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Date: " }), void 0),
                                                        _jsx("span", { children: format(parseISO(medicalPrescriptionOrder.createdAt), "MMM d, y") }, void 0)] }, void 0),
                                                _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Signature: " }), void 0),
                                                        _jsx("span", {}, void 0)] }, void 0),
                                                user.signature && (_jsx("div", Object.assign({ className: "mt-3" }, { children: _jsx("img", { className: "h-auto w-32", src: getFileUrl({
                                                            baseUrl: process.env.REACT_APP_SERVER_URL,
                                                            fileName: user === null || user === void 0 ? void 0 : user.signature.fileName,
                                                            hash: user === null || user === void 0 ? void 0 : user.signature.hash,
                                                            extension: user === null || user === void 0 ? void 0 : user.signature.extension,
                                                        }) }, void 0) }), void 0))] }, void 0),
                                        _jsxs("div", Object.assign({ className: "mr-20" }, { children: [_jsx("p", Object.assign({ className: "font-bold" }, { children: "Dispenser" }), void 0),
                                                _jsxs("div", Object.assign({ className: "mt-2" }, { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Name: " }), void 0),
                                                        _jsx("span", {}, void 0)] }), void 0),
                                                _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Qualification: " }), void 0),
                                                        _jsx("span", {}, void 0)] }, void 0),
                                                _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Registration #: " }), void 0),
                                                        _jsx("span", {}, void 0)] }, void 0),
                                                _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Date: " }), void 0),
                                                        _jsx("span", {}, void 0)] }, void 0),
                                                _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Signature: " }), void 0),
                                                        _jsx("span", {}, void 0)] }, void 0)] }), void 0)] }), void 0)] }), void 0),
                        _jsx(Transition.Root, Object.assign({ show: showPrintButton, as: Fragment, enter: "ease-in-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" }, { children: _jsx("div", Object.assign({ className: "absolute top-4 right-5" }, { children: _jsxs("button", Object.assign({ type: "button", className: "text-sm tracking-wide text-teal-800 hover:bg-teal-700 hover:text-white subpixel-antialiased px-5 py-2 rounded-lg flex items-center space-x-2 border", onClick: handlePrint }, { children: [_jsx("span", Object.assign({ className: "material-icons" }, { children: "print" }), void 0),
                                        _jsx("div", { children: "Print this" }, void 0)] }), void 0) }), void 0) }), void 0)] }), void 0)] }), void 0) }, void 0));
};
export default MedicalPrescriptionPrint;
