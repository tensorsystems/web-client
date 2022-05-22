import React from "react";
import { Quote } from "../models/queue";
interface Props {
    title: string;
    quotes: Quote[];
    index: number;
    isScrollable?: boolean;
    isCombineEnabled?: boolean;
    useClone?: boolean;
}
declare const QueueColumn: React.FC<Props>;
export default QueueColumn;
