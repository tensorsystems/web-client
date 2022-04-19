import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RefractionInput from "./RefractionInput";
export default function RefractionDistanceComponent({ register, values, readonly, onChange, }) {
    const hasSubjective = values.rightDistanceSubjectiveSph ||
        values.rightDistanceSubjectiveCyl ||
        values.rightDistanceSubjectiveAxis ||
        values.leftDistanceSubjectiveSph ||
        values.leftDistanceSubjectiveCyl ||
        values.leftDistanceSubjectiveAxis;
    const hasObjective = values.rightDistanceObjectiveSph ||
        values.rightDistanceObjectiveCyl ||
        values.rightDistanceObjectiveAxis ||
        values.leftDistanceObjectiveSph ||
        values.leftDistanceObjectiveCyl ||
        values.leftDistanceObjectiveAxis;
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-9 gap-y-4 gap-x-6 justify-items-stretch items-center border p-2 rounded-md" }, { children: [_jsx("div", Object.assign({ hidden: readonly && !hasSubjective, className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Subjective" }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasSubjective, className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceSubjectiveSph, name: "rightDistanceSubjectiveSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceSubjectiveCyl, name: "rightDistanceSubjectiveCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceSubjectiveAxis, name: "rightDistanceSubjectiveAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasSubjective, className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceSubjectiveSph, name: "leftDistanceSubjectiveSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceSubjectiveCyl, name: "leftDistanceSubjectiveCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceSubjectiveAxis, name: "leftDistanceSubjectiveAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasObjective, className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Objective" }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasObjective, className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceObjectiveSph, name: "rightDistanceObjectiveSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceObjectiveCyl, name: "rightDistanceObjectiveCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceObjectiveAxis, name: "rightDistanceObjectiveAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasObjective, className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceObjectiveSph, name: "leftDistanceObjectiveSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceObjectiveCyl, name: "leftDistanceObjectiveCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceObjectiveAxis, name: "leftDistanceObjectiveAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Final Rx" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceFinalSph, name: "rightDistanceFinalSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceFinalCyl, name: "rightDistanceFinalCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightDistanceFinalAxis, name: "rightDistanceFinalAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceFinalSph, name: "leftDistanceFinalSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceFinalCyl, name: "leftDistanceFinalCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftDistanceFinalAxis, name: "leftDistanceFinalAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0)] }), void 0));
}
