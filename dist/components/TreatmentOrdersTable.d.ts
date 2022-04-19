import React from "react";
import { TreatmentOrder } from "../models/models";
interface Props {
    orders: Array<TreatmentOrder>;
    totalCount: number;
    onNext: () => void;
    onPrev: () => void;
    onItemClick: (order: TreatmentOrder) => void;
}
export declare const TreatmentOrdersTable: React.FC<Props>;
export {};
