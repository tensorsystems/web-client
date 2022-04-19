import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
const people = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
];
export function MyListbox() {
    const [selectedPerson, setSelectedPerson] = useState(people[0]);
    return (_jsxs(Listbox, Object.assign({ value: selectedPerson, onChange: setSelectedPerson }, { children: [_jsx(Listbox.Button, { children: selectedPerson.name }, void 0),
            _jsx(Listbox.Options, { children: people.map((person) => (_jsx(Listbox.Option, Object.assign({ value: person, as: Fragment }, { children: ({ active, selected }) => (_jsxs("li", Object.assign({ className: `${active ? "bg-blue-500 text-white" : "bg-white text-black"}` }, { children: [selected && _jsx(CheckIcon, {}, void 0), person.name] }), void 0)) }), person.id))) }, void 0)] }), void 0));
}
