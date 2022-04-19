import React from "react";
import { DiagnosticProcedure, EyewearPrescription } from "../models/models";
interface UpdateEyewearPrescriptionProps {
    values: EyewearPrescription | undefined;
    refraction: DiagnosticProcedure | undefined | null;
    eyewearShopIdValue: string | undefined;
    onUpdateSuccess: () => void;
    onDeleteSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateEyewearPrescriptionForm: React.FC<UpdateEyewearPrescriptionProps>;
export {};
