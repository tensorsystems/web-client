import React from "react";
export declare const SavePastHospitalizationForm: React.FC<{
    patientHistoryId: string | undefined;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange?: (saving: boolean) => void;
}>;
