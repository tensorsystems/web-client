import React from "react";
import { OrderConnection, Order } from "../models/models";
interface Props {
    orders: OrderConnection | undefined;
    onItemClick: (order: Order) => void;
    onNext: () => void;
    onPrev: () => void;
}
export declare const OrdersTable: React.FC<Props>;
export {};
