import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from "classnames";
import { ChatAvatar } from "./ChatAvatar";
import { MessageBody } from "./MessageBody";
export const ChatBubble = ({ isReceived, message, displayName, }) => {
    return (_jsxs("div", Object.assign({ className: classnames("flex space-x-3 mt-3", {
            "justify-end": !isReceived,
        }) }, { children: [!isReceived && _jsx(MessageBody, { body: message, isReceived: isReceived }, void 0),
            _jsx(ChatAvatar, { fullName: displayName }, void 0),
            isReceived && _jsx(MessageBody, { body: message, isReceived: isReceived }, void 0)] }), void 0));
};
