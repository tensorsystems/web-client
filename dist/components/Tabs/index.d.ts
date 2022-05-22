import React from "react";
import { Tab } from "../../models/tab";
interface Props {
    tabs: Array<Tab>;
    value: string;
    onChange: (title: string) => void;
}
export declare const Tabs: React.FC<Props>;
export {};
