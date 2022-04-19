import React from "react";
import { Quote } from "../models/queue";
export declare const getBackgroundColor: (isDraggingOver: boolean, isDraggingFrom: boolean) => string;
interface Props {
    listId?: string;
    listType?: string;
    quotes: Quote[];
    title?: string;
    internalScroll?: boolean;
    scrollContainerStyle?: Object;
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    style?: Object;
    ignoreContainerClipping?: boolean;
    useClone?: boolean;
}
declare const QueueList: React.FC<Props>;
export default QueueList;
