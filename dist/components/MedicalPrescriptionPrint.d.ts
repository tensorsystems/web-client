import React from "react";
import { MedicalPrescriptionOrder, Patient, User } from "../models/models";
interface Props {
    user: User;
    patient: Patient;
    medicalPrescriptionOrder: MedicalPrescriptionOrder;
}
declare const MedicalPrescriptionPrint: React.FC<Props>;
export default MedicalPrescriptionPrint;
