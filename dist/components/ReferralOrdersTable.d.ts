import React from "react";
import { ReferralOrder } from "../models/models";
interface Props {
    orders: Array<ReferralOrder>;
    totalCount: number;
    onNext: () => void;
    onPrev: () => void;
    onItemClick: (order: ReferralOrder) => void;
}
declare const ReferralOrdersTable: React.FC<Props>;
export default ReferralOrdersTable;
