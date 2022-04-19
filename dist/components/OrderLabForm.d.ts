import React from "react";
import { LabType } from "../models/models";
interface Props {
    labType: LabType | undefined;
    patientId: string | undefined;
    patientChartId: string | undefined;
    appointmentId: string | undefined;
    onSuccess: () => void;
    onCancel: () => void;
}
export declare const OrderLabForm: React.FC<Props>;
export {};
