import { InMemoryCache } from '@apollo/client';
import { PatientInput } from '@tensoremr/models';
export declare const cache: InMemoryCache;
export declare const isLoggedInVar: import("@apollo/client").ReactiveVar<boolean>;
export declare const accessToken: import("@apollo/client").ReactiveVar<string | null>;
export declare const newPatientCache: import("@apollo/client").ReactiveVar<PatientInput | null>;
