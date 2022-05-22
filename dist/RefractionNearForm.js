import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RefractionInput from "./RefractionInput";
export default function RefractionNearComponent({ register, values, readonly, onChange, }) {
    const hasSubjective = values.righNearSubjectiveSph ||
        values.righNearSubjectiveCyl ||
        values.righNearSubjectiveAxis ||
        values.lefNearSubjectiveSph ||
        values.lefNearSubjectiveCyl ||
        values.lefNearSubjectiveAxis;
    const hasObjective = values.righNearObjectiveSph ||
        values.righNearObjectiveCyl ||
        values.righNearObjectiveAxis ||
        values.lefNearObjectiveSph ||
        values.lefNearObjectiveCyl ||
        values.lefNearObjectiveAxis;
    return (_jsxs("div", Object.assign({ className: "grid grid-cols-9 gap-y-4 gap-x-6 justify-items-stretch items-center border p-2 rounded-md" }, { children: [_jsx("div", Object.assign({ hidden: readonly && !hasSubjective, className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Subjective" }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasSubjective, className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearSubjectiveSph, name: "rightNearSubjectiveSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearSubjectiveCyl, name: "rightNearSubjectiveCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearSubjectiveAxis, name: "rightNearSubjectiveAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasSubjective, className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearSubjectiveSph, name: "leftNearSubjectiveSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearSubjectiveCyl, name: "leftNearSubjectiveCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearSubjectiveAxis, name: "leftNearSubjectiveAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasObjective, className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Objective" }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasObjective, className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearObjectiveSph, name: "rightNearObjectiveSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearObjectiveCyl, name: "rightNearObjectiveCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearObjectiveAxis, name: "rightNearObjectiveAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ hidden: readonly && !hasObjective, className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearObjectiveSph, name: "leftNearObjectiveSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearObjectiveCyl, name: "leftNearObjectiveCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearObjectiveAxis, name: "leftNearObjectiveAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("p", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Final Rx" }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearFinalSph, name: "rightNearFinalSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearFinalCyl, name: "rightNearFinalCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.rightNearFinalAxis, name: "rightNearFinalAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0),
            _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex space-x-3 justify-around" }, { children: [_jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearFinalSph, name: "leftNearFinalSph", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearFinalCyl, name: "leftNearFinalCyl", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0),
                        _jsx("div", { children: _jsx(RefractionInput, { value: values.leftNearFinalAxis, name: "leftNearFinalAxis", register: register, readOnly: readonly, onChange: onChange }, void 0) }, void 0)] }), void 0) }), void 0)] }), void 0));
}
