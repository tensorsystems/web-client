/// <reference types="react" />
import { Appointment } from "../models/models";
interface Props {
    currentDateTime: Date;
    appointments: Array<Appointment | undefined> | undefined;
}
export default function SearchBarAppointments(props: Props): JSX.Element;
export {};
