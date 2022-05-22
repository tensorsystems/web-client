import React from "react";
import { Pharmacy } from "../models/models";
interface Props {
    values: Pharmacy | undefined;
    onUpdateSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdatePharmacyForm: React.FC<Props>;
export {};
