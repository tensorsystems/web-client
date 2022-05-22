import React from "react";
import { PatientChart } from "../../models/models";
export declare const GET_DIAGNOSTIC_PROCEDURE_ORDER: import("@apollo/client").DocumentNode;
declare const DiagnosticProcedurePage: React.FC<{
    patientId: string | undefined;
    appointmentId: string | undefined;
    patientChart: PatientChart;
    medicalDepartment: string | undefined | null;
}>;
export default DiagnosticProcedurePage;
