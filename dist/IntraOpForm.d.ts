import React from "react";
interface Props {
    register: any;
    locked: boolean;
    aclolUnplanned: boolean;
    handleChanges: (value: any) => void;
}
declare const IntraOpForm: React.FC<Props>;
export default IntraOpForm;
