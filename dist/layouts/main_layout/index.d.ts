import React from "react";
import { Page } from "../../models/page";
interface Props {
    children: JSX.Element;
    onPageSelect: (route: string) => void;
    onAddPage: (page: Page) => void;
}
export declare const MainLayout: React.FC<Props>;
export {};
