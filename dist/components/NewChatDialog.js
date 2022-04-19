import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ChatUserListItem } from "./ChatUserListItem";
const GET_COMMON_CHAT = gql `
  query GetCommonChat($recipientID: ID!) {
    getCommonChat(recipientID: $recipientID) {
      id
    }
  }
`;
const GET_USERS = gql `
  query GetUsers($page: PaginationInput!) {
    users(page: $page) {
      edges {
        node {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
export const NewChatDialog = ({ onExistingChat, onNewChat, onCancel, }) => {
    const { data } = useQuery(GET_USERS, {
        variables: {
            page: { page: 0, size: 100 },
        },
    });
    const [selectedUserId, setSelectedUserId] = useState();
    useEffect(() => {
        if (selectedUserId) {
            commonChatQuery[0]({
                variables: {
                    recipientID: selectedUserId,
                },
            });
        }
    }, [selectedUserId]);
    const commonChatQuery = useLazyQuery(GET_COMMON_CHAT, {
        onCompleted(data) {
            if (data.getCommonChat.id) {
                onExistingChat(data.getCommonChat.id);
            }
        },
        onError(error) {
            if (selectedUserId) {
                onNewChat(selectedUserId);
            }
        },
    });
    const handleSelect = (userId) => setSelectedUserId(userId);
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between" }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider text-teal-800" }, { children: "Send message" }), void 0),
                        _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0)] }), void 0),
                _jsxs("div", Object.assign({ className: "mt-4 relative" }, { children: [_jsx("input", { type: "search", className: "w-full py-3 px-4 shadow-lg rounded-md focus:outline-none", placeholder: "Search" }, void 0),
                        _jsx("button", Object.assign({ type: "button", className: "absolute right-0 top-0 mt-3 mr-4" }, { children: _jsx("p", Object.assign({ className: "material-icons" }, { children: "search" }), void 0) }), void 0)] }), void 0),
                _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("ul", Object.assign({ className: "shadow-lg" }, { children: data === null || data === void 0 ? void 0 : data.users.edges.map((e, i) => (_jsx(ChatUserListItem, { user: e === null || e === void 0 ? void 0 : e.node, first: i === 0, onSelect: handleSelect }, e === null || e === void 0 ? void 0 : e.node.id))) }), void 0) }), void 0)] }), void 0) }), void 0));
};
