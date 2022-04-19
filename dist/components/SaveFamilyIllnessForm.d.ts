import React from "react";
export declare const SaveFamilyIllnessForm: React.FC<{
    patientHistoryId: string | undefined;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange: (saving: boolean) => void;
}>;
