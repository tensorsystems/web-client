import React from "react";
import { LabType } from "../models/models";
interface UpdateLabTypeProps {
    values: LabType | undefined;
    onUpdateSuccess: () => void;
    onDeleteSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateLabTypeForm: React.FC<UpdateLabTypeProps>;
export {};
