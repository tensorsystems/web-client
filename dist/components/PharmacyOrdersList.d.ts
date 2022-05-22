import React from "react";
import { MedicalPrescriptionOrder } from "../models/models";
interface Props {
    totalCount: number;
    onNextPage: () => void;
    onPrevPage: () => void;
    onClick: (item: MedicalPrescriptionOrder) => void;
    items: Array<MedicalPrescriptionOrder> | undefined;
}
export declare const PharmacyOrdersList: React.FC<Props>;
export {};
