import React from "react";
import { Page } from "../../models/page";
export declare const GET_APPOINTMENT: import("@apollo/client").DocumentNode;
export declare const AppointmentDetails: React.FC<{
    appointmentId: string;
    onUpdateTab?: (page: any) => void;
    onAddPage: (page: Page) => void;
    onTabClose: (route: string) => void;
}>;
