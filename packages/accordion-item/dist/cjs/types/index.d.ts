import "./index.css";
interface Props {
    title: any;
    children: any;
    open?: boolean;
    className?: string;
    headerColor?: string;
    background?: string;
    onHeadingClick?: (isOpen: boolean) => void;
}
export declare const AccordionItem: ({ title, children, open, className, headerColor, background, onHeadingClick, }: Props) => JSX.Element;
export {};
