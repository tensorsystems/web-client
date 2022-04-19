import React from "react";
import { DiagnosticProcedureType } from "../models/models";
interface Props {
    values: DiagnosticProcedureType | undefined;
    onUpdateSuccess: () => void;
    onDeleteSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateDiagnosticProcedureTypeForm: React.FC<Props>;
export {};
