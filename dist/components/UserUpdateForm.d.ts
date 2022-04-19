import React from "react";
import { User } from "../models/models";
interface Props {
    values: User;
    onSuccess: () => void;
    onResetSuccess: () => void;
}
export declare const UserUpdateForm: React.FC<Props>;
export {};
