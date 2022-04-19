import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { FamilyIllness } from '../models/models';
interface UpdateFamilyIllnessProps {
    values: Maybe<FamilyIllness>;
    onSuccess: () => void;
    onCancel: () => void;
    onSaveChange?: (saving: boolean) => void;
}
export declare const UpdateFamilyIllnessForm: React.FC<UpdateFamilyIllnessProps>;
export {};
