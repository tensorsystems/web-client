import React from "react";
import { DiagnosticProcedure, EyewearPrescriptionOrder, Patient, User } from "../models/models";
interface Props {
    refraction: DiagnosticProcedure | undefined | null;
    user: User;
    patient: Patient;
    eyewearPrescriptionOrder: EyewearPrescriptionOrder;
}
declare const EyewearPrescriptionPrint: React.FC<Props>;
export default EyewearPrescriptionPrint;
