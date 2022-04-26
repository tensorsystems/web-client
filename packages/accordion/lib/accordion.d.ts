import "./index.css";
interface Props {
    title: string;
    content: any;
    preExpand?: boolean;
}
export default function MyAccordion({ title, content, preExpand }: Props): JSX.Element;
export {};
