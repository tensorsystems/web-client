import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";
import { PastInjury } from "../models/models";
interface UpdatePastInjuryProps {
    values: Maybe<PastInjury>;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange?: (saving: boolean) => void;
}
export declare const UpdatePastInjuryForm: React.FC<UpdatePastInjuryProps>;
export {};
