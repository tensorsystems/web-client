import React from 'react';
import { TreatmentType } from '../models/models';
interface Props {
    treatmentType: TreatmentType | undefined;
    patientId: string | undefined;
    appointmentId: string | undefined;
    patientChartId: string | undefined;
    onSuccess: () => void;
    onCancel: () => void;
}
declare const OrderTreatmentForm: React.FC<Props>;
export default OrderTreatmentForm;
