import React from "react";
import { Page } from "@tensoremr/models";
interface Props {
    searchFocused: boolean;
    onChangePage: (route: string) => void;
    onAddPage: (page: Page) => void;
    setSearchFocused: (focused: boolean) => void;
}
declare const HeaderSearchBar: React.FC<Props>;
export default HeaderSearchBar;
