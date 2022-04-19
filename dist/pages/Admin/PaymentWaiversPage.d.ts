import React from "react";
import { PaymentWaiver } from "../../models/models";
export declare const PAYMENT_WAIVERS: import("@apollo/client").DocumentNode;
export declare const PaymentWaiversPage: React.FC;
interface HandleWaiverFormProps {
    paymentWaiver: PaymentWaiver;
    onCancel: () => void;
    onSuccess: () => void;
}
export declare const HandleWaiverForm: React.FC<HandleWaiverFormProps>;
export {};
