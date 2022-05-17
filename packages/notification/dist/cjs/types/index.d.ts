import React from "react";
declare type Action = {
    type: "show";
    notifTitle: string;
    notifSubTitle: string;
    variant: string;
} | {
    type: "hide";
};
declare type Dispatch = (action: Action) => void;
interface State {
    showNotification: boolean;
    notifTitle: string;
    notifSubTitle: string;
    variant: string;
}
declare type NotificationProviderProps = {
    children: React.ReactNode;
};
declare function NotificationProvider({ children }: NotificationProviderProps): JSX.Element;
declare function useNotificationState(): State;
declare function useNotificationDispatch(): Dispatch;
export { NotificationProvider, useNotificationState, useNotificationDispatch };
