import React from "react";
import { LabOrder } from "../models/models";
interface Props {
    orders: Array<LabOrder>;
    onItemClick: (order: LabOrder) => void;
    totalCount: number;
    onNext: () => void;
    onPrev: () => void;
}
export declare const LabOrdersTable: React.FC<Props>;
export {};
