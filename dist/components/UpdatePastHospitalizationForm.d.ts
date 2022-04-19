import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";
import { PastHospitalization } from "../models/models";
interface UpdatePastHospitalizationProps {
    values: Maybe<PastHospitalization>;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange: (saving: boolean) => void;
}
export declare const UpdatePastHospitalizationForm: React.FC<UpdatePastHospitalizationProps>;
export {};
