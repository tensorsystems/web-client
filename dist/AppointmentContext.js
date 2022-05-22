import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
export const AppointmentContext = React.createContext({});
export default function AppointmentStore({ children }) {
    const [isLocked, setIsLocked] = React.useState(false);
    const store = {
        patientChartLocked: [isLocked, setIsLocked],
    };
    return (_jsx(AppointmentContext.Provider, Object.assign({ value: store }, { children: children }), void 0));
}
