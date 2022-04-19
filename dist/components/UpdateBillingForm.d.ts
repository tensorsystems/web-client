import React from 'react';
import { Billing } from '../models/models';
interface UpdateBillingProps {
    values: Billing | undefined;
    onUpdateSuccess: () => void;
    onDeleteSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateBillingForm: React.FC<UpdateBillingProps>;
export {};
