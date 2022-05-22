import React from "react";
import { ChiefComplaint, Maybe, HpiComponentEdge } from "../models/models";
interface Props {
    values: ChiefComplaint | undefined;
    onChange: (values: Maybe<HpiComponentEdge>[] | undefined, hpiComponentTypeId: string | undefined) => void;
}
declare const ChiefComplaintHpiComponent: React.FC<Props>;
export default ChiefComplaintHpiComponent;
