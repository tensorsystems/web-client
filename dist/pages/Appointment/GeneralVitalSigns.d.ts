import React from "react";
import { Patient } from "../../models/models";
interface Props {
    patientChartId: string;
    patient: Patient;
}
declare const GeneralVitalSigns: React.FC<Props>;
export default GeneralVitalSigns;
