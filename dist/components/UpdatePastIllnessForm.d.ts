import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";
import { PastIllness } from "../models/models";
interface UpdatePastIllnessProps {
    values: Maybe<PastIllness>;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange?: (saving: boolean) => void;
}
export declare const UpdatePastIllnessForm: React.FC<UpdatePastIllnessProps>;
export {};
