import React from "react";
interface Props {
    open: boolean;
    title: string;
    description: any;
    positive: string;
    negative: string;
    onPositiveClick: () => void;
    onNegativeClick: () => void;
    onClose: () => void;
}
export declare const Modal: React.FC<Props>;
export {};
