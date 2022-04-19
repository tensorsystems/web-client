import React from "react";
import { DiagnosticProcedureType } from "../models/models";
interface OrderFormProps {
    diagnosticProcedureType: DiagnosticProcedureType | undefined;
    patientId: string | undefined;
    patientChartId: string | undefined;
    appointmentId: string | undefined;
    onSuccess: () => void;
    onCancel: () => void;
}
export declare const OrderDiagnosticProcedureForm: React.FC<OrderFormProps>;
export {};
