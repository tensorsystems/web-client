import React from "react";
interface Props {
    date: any;
    onDateChange: (value: any) => void;
    status: string;
    onStatusChange: (value: string) => void;
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    onClear: () => void;
}
export declare const PrescriptionOrdersToolbar: React.FC<Props>;
export {};
