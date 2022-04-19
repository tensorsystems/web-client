import React from "react";
import { SurgicalProcedureType } from "../models/models";
interface UpdateSurgicalProcedureTypeProps {
    values: SurgicalProcedureType | undefined;
    onUpdateSuccess: () => void;
    onDeleteSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateSurgicalProcedureTypeForm: React.FC<UpdateSurgicalProcedureTypeProps>;
export {};
