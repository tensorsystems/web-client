import React from "react";
import { TreatmentType } from "../models/models";
interface UpdateTreatmentTypeProps {
    values: TreatmentType | undefined;
    onUpdateSuccess: () => void;
    onDeleteSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateTreatmentTypeForm: React.FC<UpdateTreatmentTypeProps>;
export {};
