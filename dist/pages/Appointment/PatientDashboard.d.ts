import React from "react";
import { Appointment } from "../../models/models";
export declare const PatientDashboard: React.FC<{
    appointment: Appointment;
    onAppointmentReadOnlyClick: (appointment: Appointment) => void;
}>;
