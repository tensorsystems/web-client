import React from "react";
import { Appointment } from "../../models/models";
export declare const HistoryPage: React.FC<{
    isEdit?: boolean;
    appointment: Appointment;
    showPaperRecord?: boolean;
    onSaveChange: (saving: boolean) => void;
    onHasHistoryChange?: (value: boolean) => void;
}>;
