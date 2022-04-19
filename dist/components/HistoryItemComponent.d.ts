import React from "react";
interface Props {
    title: string;
    isEdit?: boolean;
    items: Array<any> | undefined;
    onAdd: () => void;
    onUpdate: (item: any) => void;
    onDelete: (id: string) => void;
}
export declare const HistoryItemComponent: React.FC<Props>;
export {};
