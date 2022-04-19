import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Draggable, Droppable, } from "react-beautiful-dnd";
import QueueItem from "./QueueItem";
export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
    if (isDraggingOver) {
        return "bg-gray-100";
    }
    if (isDraggingFrom) {
        return "bg-gray-100";
    }
    return "bg-gray-100";
};
const scrollContainerHeight = 250;
const InnerQuoteList = React.memo(function InnerQuoteList(props) {
    return props.quotes.map((quote, index) => (_jsx(Draggable, Object.assign({ draggableId: quote.id, index: index }, { children: (dragProvided, dragSnapshot) => (_jsx(QueueItem, { quote: quote, isDragging: dragSnapshot.isDragging, isGroupedOver: Boolean(dragSnapshot.combineTargetFor), provided: dragProvided }, quote.id)) }), quote.id)));
});
function InnerList(props) {
    const { quotes, dropProvided } = props;
    const title = props.title ? _jsx("div", { children: props.title }, void 0) : null;
    return (_jsxs("div", { children: [title, _jsxs("div", Object.assign({ ref: dropProvided.innerRef }, { children: [_jsx(InnerQuoteList, { quotes: quotes }, void 0), dropProvided.placeholder] }), void 0)] }, void 0));
}
const QueueList = ({ ignoreContainerClipping, internalScroll, scrollContainerStyle, isDropDisabled, isCombineEnabled, listId = "LIST", listType, style, quotes, title, useClone, }) => {
    return (_jsx(Droppable, Object.assign({ droppableId: listId, type: listType, ignoreContainerClipping: ignoreContainerClipping, isDropDisabled: isDropDisabled, isCombineEnabled: isCombineEnabled }, { children: (dropProvided, dropSnapshot) => (_jsx("div", { children: internalScroll ? (_jsx("div", Object.assign({ className: "overflow-x-hidden overflow-y-auto max-h-80" }, { children: _jsx(InnerList, { quotes: quotes, title: title, dropProvided: dropProvided }, void 0) }), void 0)) : (_jsx(InnerList, { quotes: quotes, title: title, dropProvided: dropProvided }, void 0)) }, void 0)) }), void 0));
};
export default QueueList;
