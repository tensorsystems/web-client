import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PreOpForm = ({ register, handleChanges, locked }) => {
    return (_jsxs("div", { children: [_jsxs("div", Object.assign({ className: "grid grid-cols-3 gap-x-10 gap-y-4 mt-5" }, { children: [_jsx("div", { className: "col-span-1" }, void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 text-center" }, { children: "OD" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1 text-center" }, { children: "OS" }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Corrected" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "rightCorrected", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "leftCorrected", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "IOP" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "rightIop", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "leftIop", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Anterior Segment" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "rightAnteriorSegment", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "leftAnteriorSegment", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Posterior Segment" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "rightPosteriorSegment", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "leftPosteriorSegment", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide" }, { children: "Biometry" }), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "rightBiometry", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("input", { type: "text", name: "leftBiometry", ref: register, onChange: handleChanges, disabled: locked, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full" }, void 0) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold mt-8" }, { children: "System check" }), void 0),
            _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { type: "text", name: "bloodPressure", placeholder: "Blood pressure", ref: register, onChange: handleChanges, disabled: locked, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { type: "text", name: "bloodSugar", placeholder: "Blood sugar", ref: register, onChange: handleChanges, disabled: locked, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { type: "text", name: "uriAnalysis", placeholder: "Uri analysis", ref: register, onChange: handleChanges, disabled: locked, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "text-2xl text-gray-600 font-semibold mt-8" }, { children: "Systemic Illnesses" }), void 0),
            _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { type: "text", name: "diabetes", placeholder: "Diabetes", ref: register, onChange: handleChanges, disabled: locked, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { type: "text", name: "asthma", placeholder: "Asthma", ref: register, onChange: handleChanges, disabled: locked, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { type: "text", name: "hpn", placeholder: "HPN", ref: register, onChange: handleChanges, disabled: locked, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { type: "text", name: "cardiacDisease", placeholder: "Cardiac disease", ref: register, onChange: handleChanges, disabled: locked, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("input", { type: "text", name: "allergies", placeholder: "Allergies", ref: register, onChange: handleChanges, disabled: locked, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0) }), void 0)] }, void 0));
};
export default PreOpForm;