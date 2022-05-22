import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from "classnames";
import { parseJwt } from "../util";
import { useHistory } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";
import { gql, useMutation } from "@apollo/client";
const DELETE_UNREAD_MESSAGES = gql `
  mutation DeleteUnreadMessages($userId: ID!, $chatId: ID!) {
    deleteUnreadMessages(userId: $userId, chatId: $chatId)
  }
`;
export const ChatListItem = ({ chat, firstItem, selected, }) => {
    const history = useHistory();
    const token = sessionStorage.getItem("accessToken");
    const claim = parseJwt(token);
    const recipient = chat.chatMembers.find((e) => (e === null || e === void 0 ? void 0 : e.userId) !== claim.ID);
    const unreadMessages = chat.chatUnreadMessages.filter((e) => (e === null || e === void 0 ? void 0 : e.userId) === claim.ID).length;
    const [deleteUnreadMessages] = useMutation(DELETE_UNREAD_MESSAGES);
    return (_jsxs("div", Object.assign({ className: classnames("bg-white p-6 rounded-md shadow-lg cursor-pointer hover:bg-teal-200", {
            "mt-2": !firstItem,
            "bg-teal-100": selected,
        }), onClick: () => {
            deleteUnreadMessages({
                variables: {
                    chatId: chat.id,
                    userId: claim.ID,
                },
            });
            history.push(`/chats/${chat.id}`);
        } }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-2" }, { children: [_jsx("div", Object.assign({ className: "font-bold text-gray-700 rounded-full bg-gray-400 flex items-center justify-center font-mono h-10 w-10" }, { children: _jsx("p", Object.assign({ className: "text-center text-white text-xl" }, { children: "KT" }), void 0) }), void 0),
                            _jsxs("div", { children: [_jsx("p", Object.assign({ className: "font-semibold text-gray-700" }, { children: recipient === null || recipient === void 0 ? void 0 : recipient.displayName }), void 0),
                                    _jsx("p", { className: "text-xs text-teal-600" }, void 0)] }, void 0)] }), void 0),
                    _jsx("div", { children: _jsxs("p", Object.assign({ className: "text-gray-500 font-semibold text-xs" }, { children: [" ", formatDistance(parseISO(chat.updatedAt), new Date(), {
                                    addSuffix: true,
                                })] }), void 0) }, void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "flex justify-between mt-2" }, { children: [_jsx("div", Object.assign({ className: "text-gray-600" }, { children: chat.recentMessage }), void 0),
                    _jsx("div", { children: unreadMessages > 0 && (_jsx("div", Object.assign({ className: "font-bold text-gray-700 rounded-full bg-red-400 flex items-center justify-center h-5 w-5" }, { children: _jsx("p", Object.assign({ className: "text-white text-sm" }, { children: unreadMessages }), void 0) }), void 0)) }, void 0)] }), void 0)] }), void 0));
};
