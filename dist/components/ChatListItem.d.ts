import React from "react";
import { Chat } from "../models/models";
interface Props {
    chat: Chat;
    firstItem?: Boolean;
    selected: Boolean;
}
export declare const ChatListItem: React.FC<Props>;
export {};
