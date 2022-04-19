/// <reference types="react" />
import { MedicalPrescription } from "../models/models";
interface Props {
    medicalPrescriptions: Array<MedicalPrescription | undefined> | undefined;
}
export default function SearchBarMedications(props: Props): JSX.Element;
export {};
