import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
export const MessageBody = ({ body, isReceived, }) => {
    return (_jsx("div", Object.assign({ className: classnames("p-5 rounded-md", {
            "bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-tl-none": isReceived,
            "bg-white border text-gray-700 rounded-tr-none": !isReceived,
        }) }, { children: _jsx("p", { children: body }, void 0) }), void 0));
};
