import React from "react";
import { Patient } from "../models/models";
export declare const PatientBasicInfo: React.FC<{
    data: Patient | undefined;
    loading: boolean;
    onEditClick: () => void;
}>;
