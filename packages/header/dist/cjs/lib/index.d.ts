import React from "react";
import { Page } from "@tensoremr/models";
interface Props {
    setSearchFocused: (focused: boolean) => void;
    searchFocused: boolean;
    onChangePage: (route: string) => void;
    onAddPage: (page: Page) => void;
}
export declare const Header: React.FC<Props>;
export {};
