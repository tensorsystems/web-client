import React from "react";
import { FollowUpOrder } from "../models/models";
interface Props {
    orders: Array<FollowUpOrder>;
    totalCount: number;
    onNext: () => void;
    onPrev: () => void;
    onItemClick: (order: FollowUpOrder) => void;
}
export declare const FollowUpOrdersTable: React.FC<Props>;
export {};
