import React from "react";
import { SurgicalProcedureType } from "../models/models";
interface Props {
    surgicalProcedureType: SurgicalProcedureType | undefined;
    patientId: string | undefined;
    patientChartId: string | undefined;
    appointmentId: string | undefined;
    onSuccess: () => void;
    onCancel: () => void;
}
export declare const OrderSurgicalProcedureForm: React.FC<Props>;
export {};
