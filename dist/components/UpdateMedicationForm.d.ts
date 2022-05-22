import React from "react";
import { MedicalPrescription } from "../models/models";
interface UpdateMedicalPrescriptionProps {
    values: MedicalPrescription | undefined;
    pharmacyIdValue: string | undefined | null;
    onUpdateSuccess: () => void;
    onDeleteSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateMedicalPrescriptionForm: React.FC<UpdateMedicalPrescriptionProps>;
export {};
