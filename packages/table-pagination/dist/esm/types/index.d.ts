import React from "react";
interface Props {
    color?: string;
    totalCount: number;
    onNext: () => void;
    onPrevious: () => void;
}
export declare const TablePagination: React.FC<Props>;
export {};
