import React from "react";
import { Maybe, PatientEncounterLimit } from "../models/models";
interface Props {
    values: Maybe<PatientEncounterLimit>;
    onSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdatePatientEncounterLimitForm: React.FC<Props>;
export {};
