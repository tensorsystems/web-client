import React from "react";
import { PastSurgery, Maybe } from "../models/models";
interface UpdatePastSurgeryProps {
    values: Maybe<PastSurgery>;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange?: (saving: boolean) => void;
}
export declare const UpdatePastSurgeryForm: React.FC<UpdatePastSurgeryProps>;
export {};
