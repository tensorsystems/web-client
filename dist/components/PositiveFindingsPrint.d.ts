import React from "react";
export declare const GET_PATIENT_CHART: import("@apollo/client").DocumentNode;
interface Props {
    patientChartId: string;
    showHistory?: boolean;
    showChiefComplaints?: boolean;
    showVitalSigns?: boolean;
    showPhysicalExamination?: boolean;
    showDiagnosticProcedures?: boolean;
    showLabratory?: boolean;
    showDiagnosis?: boolean;
    showDifferentialDiagnosis?: boolean;
    showSurgery?: boolean;
    showTreatment?: boolean;
    showPrescriptions?: boolean;
}
declare const PositiveFindingsPrint: React.FC<Props>;
export default PositiveFindingsPrint;
