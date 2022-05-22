import React from "react";
import { SurgicalOrder } from "../models/models";
interface Props {
    orders: Array<SurgicalOrder>;
    totalCount: number;
    onNext: () => void;
    onPrev: () => void;
    onItemClick: (order: SurgicalOrder) => void;
}
export declare const SurgicalOrdersTable: React.FC<Props>;
export {};
