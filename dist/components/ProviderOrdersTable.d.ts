import React from "react";
import { Order } from "../models/models";
interface Props {
    onOrderClick: (e: Order) => void;
}
export declare const ProviderOrdersTable: React.FC<Props>;
export {};
