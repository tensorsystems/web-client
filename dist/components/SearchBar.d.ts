import React from "react";
import { Page } from "../models/page";
interface Props {
    searchFocused: boolean;
    onChangePage: (route: string) => void;
    onAddPage: (page: Page) => void;
    setSearchFocused: (focused: boolean) => void;
}
export declare const SearchBar: React.FC<Props>;
export {};
