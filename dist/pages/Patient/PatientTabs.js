import { jsx as _jsx } from "react/jsx-runtime";
import { ClockIcon, BeakerIcon, PhoneIcon, ExclamationIcon, PaperClipIcon, } from "@heroicons/react/outline";
export const PatientTabs = [
    {
        title: "Appointments",
        route: "appointments",
        icon: _jsx(ClockIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
        selectedIcon: _jsx(ClockIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
    },
    {
        title: "Orders",
        route: "orders/diagnostic-orders",
        icon: _jsx(BeakerIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
        selectedIcon: _jsx(BeakerIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
    },
    {
        title: "Contact Information",
        route: "contact-information",
        icon: _jsx(PhoneIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
        selectedIcon: _jsx(PhoneIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
    },
    {
        title: "Emergency Contact",
        route: "emergency-contact",
        icon: _jsx(ExclamationIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
        selectedIcon: _jsx(ExclamationIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
    },
    {
        title: "Documents",
        route: "documents",
        icon: _jsx(PaperClipIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
        selectedIcon: _jsx(PaperClipIcon, { className: "w-5 h-auto text-gray-500" }, void 0),
    },
];
