import React from "react";
export declare const SavePastIllnessForm: React.FC<{
    patientHistoryId: string | undefined;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange?: (saving: boolean) => void;
}>;
