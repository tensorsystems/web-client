import React from "react";
interface NewChatDialogProps {
    onNewChat: (recipientId: string) => void;
    onExistingChat: (chatId: string) => void;
    onCancel: () => void;
}
export declare const NewChatDialog: React.FC<NewChatDialogProps>;
export {};
