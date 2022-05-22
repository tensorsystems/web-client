import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";
import { Lifestyle } from "../models/models";
interface UpdateLifestyleProps {
    values: Maybe<Lifestyle>;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange?: (saving: boolean) => void;
}
export declare const UpdateLifestyleForm: React.FC<UpdateLifestyleProps>;
export {};
