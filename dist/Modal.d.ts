/// <reference types="react" />
interface Props {
    open: boolean;
    title: string;
    description: any;
    positive: string;
    negative: string;
    onPositiveClick: () => void;
    onNegativeClick: () => void;
    onClose: () => void;
}
export default function Modal(props: Props): JSX.Element;
export {};
