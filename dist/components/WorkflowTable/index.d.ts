import React from "react";
import { Appointment } from "../../models/models";
import "./index.css";
interface WorkflowProps {
    onAppointmentClick: (appointment: Appointment) => void;
}
export declare const WorkflowTable: React.FC<WorkflowProps>;
export {};
