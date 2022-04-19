/// <reference types="react" />
import "./AutcompleteInput.css";
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
export default function AutocompleteInput(props: Props): JSX.Element;
export {};
