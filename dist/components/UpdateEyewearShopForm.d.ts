/// <reference types="react" />
import { EyewearShop } from "../models/models";
interface Props {
    values: EyewearShop | undefined;
    onUpdateSuccess: () => void;
    onCancel: () => void;
}
export declare const UpdateEyewearShopForm: ({ values, onUpdateSuccess, onCancel, }: Props) => JSX.Element;
export {};
