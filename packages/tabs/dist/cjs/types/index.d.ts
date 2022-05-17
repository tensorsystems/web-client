import React from "react";
import { Tab } from "@tensoremr/models";
interface Props {
    tabs: Array<Tab>;
    value: string;
    onChange: (title: string) => void;
}
export declare const Tabs: React.FC<Props>;
export {};
