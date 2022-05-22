import React from "react";
interface Props {
    id: string;
    name: string;
    type: string;
    formref: string | ((instance: HTMLInputElement | null) => void) | null | undefined;
}
export declare const TextField: React.FC<Props>;
export {};
