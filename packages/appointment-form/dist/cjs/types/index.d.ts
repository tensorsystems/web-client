import React from "react";
import { AppointmentInput } from "@tensoremr/models";
export declare const SAVE_APPOINTMENT: import("@apollo/client").DocumentNode;
interface AppointmentFormProps {
    patientId: string;
    updateId?: string;
    defaultValues?: AppointmentInput;
    onSuccess: () => void;
    onCancel: () => void;
}
export declare const AppointmentForm: React.FC<AppointmentFormProps>;
export {};
