import React from "react";
export declare const NavItem: React.FC<{
    route: string;
    label: string;
    completed?: boolean;
    icon?: string;
    subItem: boolean;
    disabled?: boolean;
    notifs?: number;
    status?: "success" | "pending_actions" | "warning" | "locked";
}>;
