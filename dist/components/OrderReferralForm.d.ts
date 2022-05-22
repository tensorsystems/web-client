import React from "react";
interface OrderFormProps {
    patientId: string | undefined;
    patientChartId: string | undefined;
    onSuccess: () => void;
    onCancel: () => void;
}
export declare const OrderReferralForm: React.FC<OrderFormProps>;
export {};
