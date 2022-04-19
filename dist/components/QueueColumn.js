import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Draggable, } from "react-beautiful-dnd";
import classnames from "classnames";
import QueueList from "./QueueList";
const QueueColumn = ({ title, quotes, index, isScrollable, isCombineEnabled, useClone, }) => {
    return (_jsx(Draggable, Object.assign({ draggableId: title, index: index }, { children: (provided, snapshot) => (_jsx("div", Object.assign({ className: "m-2 flex column flex-col", ref: provided.innerRef }, provided.dragHandleProps, { children: _jsxs("div", Object.assign({ className: classnames("flex items-center justify-center rounded-t-md transition-colors duration-200 ease-in hover:bg-teal-100", {
                    "bg-teal-100": snapshot.isDragging,
                    "bg-gray-100": !snapshot.isDragging,
                }) }, { children: [_jsx("h4", Object.assign({ "aria-label": `${title} list`, className: "p-2 transition-colors ease-in duration-200 flex-grow select-none relative focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-offset-1" }, { children: title }), void 0),
                    _jsx(QueueList, { listId: title, listType: "QUOTE", style: {
                            backgroundColor: snapshot.isDragging ? "bg-teal-100" : null,
                        }, quotes: quotes, internalScroll: isScrollable, isCombineEnabled: Boolean(isCombineEnabled), useClone: Boolean(useClone) }, void 0)] }), void 0) }), void 0)) }), void 0));
};
export default QueueColumn;
