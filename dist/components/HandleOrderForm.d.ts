import React from "react";
import { Order } from "../models/models";
interface HandleOrderFormProps {
    selectedOrder: Order;
    onSuccess: () => void;
    onCancel: () => void;
    onRefresh: () => void;
}
export declare const HandleOrderForm: React.FC<HandleOrderFormProps>;
export {};
