import React from "react";
import { Page } from "../../models/page";
import "./index.css";
interface Props {
    pages: Array<Page>;
    activeTab: string;
    onTabOpen: (route: string) => void;
    onClose: (route: string) => void;
}
export declare const HomeTabs: React.FC<Props>;
export {};
