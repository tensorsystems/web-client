import React from "react";
declare type Action = {
    type: "show";
    children: any;
    snapPoint: number;
} | {
    type: "hide";
};
interface State {
    showBottomSheet: boolean;
    snapPoint: number;
    BottomSheetChildren: any | undefined;
}
declare type Dispatch = (action: Action) => void;
declare type BottomSheetProviderProps = {
    children: React.ReactNode;
};
declare function BottomSheetProvider({ children }: BottomSheetProviderProps): JSX.Element;
declare function useBottonSheetState(): State;
declare function useBottomSheetDispatch(): Dispatch;
export { BottomSheetProvider, useBottonSheetState, useBottomSheetDispatch };
