import React from "react";
import { Allergy } from "../models/models";
interface UpdateAllergyProps {
    values: Allergy | undefined;
    onUpdateSuccess: () => void;
    onDeleteSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateAllergyForm: React.FC<UpdateAllergyProps>;
export {};
