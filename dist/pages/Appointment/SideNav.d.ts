import React from "react";
interface Props {
    soapType: "regular" | "surgical" | "treatment";
    medicalDepartment: "General Medicine" | "Ophthalmology";
    userType: string;
    locked?: boolean;
}
export declare const SideNav: React.FC<Props>;
export {};
