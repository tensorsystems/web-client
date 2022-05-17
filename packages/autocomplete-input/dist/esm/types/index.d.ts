import React from "react";
import "./index.css";
interface Props {
    name: string;
    field: string;
    type: string;
    register: any;
    uri: string;
    setFormValue: any;
    control: any;
    disabled?: boolean;
    onInputChange?: () => void;
}
export declare const AutocompleteInput: React.FC<Props>;
export {};
