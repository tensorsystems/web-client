import React from "react";
import { DiagnosticProcedureOrder } from "../models/models";
interface Props {
    orders: Array<DiagnosticProcedureOrder>;
    totalCount: number;
    onNext: () => void;
    onPrev: () => void;
    onItemClick: (order: DiagnosticProcedureOrder) => void;
}
export declare const DiagnosticOrdersTable: React.FC<Props>;
export {};
