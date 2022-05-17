import { EyewearPrescription, HpiComponent, Maybe } from "@tensoremr/models";
export declare const formatDate: (date: string) => string;
export declare function getParsedJwt<T extends object = {
    [k: string]: string | number;
}>(token: string): T | undefined;
export declare const parseJwt: any;
export declare const groupBy: <T, K extends keyof T>(array: T[], groupOn: K | ((i: T) => string | undefined | null)) => Record<string, T[]>;
interface FileUrlParams {
    baseUrl: string | undefined;
    fileName: string;
    hash: string;
    extension: String;
}
export declare function getFileUrl({ baseUrl, fileName, hash, extension }: FileUrlParams): string;
export declare const getEyewearRxNames: (data: Maybe<EyewearPrescription> | undefined) => string;
export declare const getPatientAge: (dateOfBirth: any) => string;
export declare const groupByHpiComponentType: (hpiComponents: Maybe<HpiComponent>[] | undefined) => [string, Maybe<HpiComponent>[]][] | undefined;
export {};
