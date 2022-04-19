import { jsx as _jsx } from "react/jsx-runtime";
export const TextField = ({ id, name, type, formref }) => {
    return (_jsx("input", { type: type, name: name, id: id, ref: formref, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0));
};
