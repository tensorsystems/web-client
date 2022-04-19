import { jsx as _jsx } from "react/jsx-runtime";
import { useHistory } from "react-router-dom";
import { UserRegistrationForm } from "../components/UserRegistrationForm";
export const RegisterPage = () => {
    const history = useHistory();
    const handleRegistrationSuccess = () => {
        history.replace("/");
    };
    return (_jsx("div", Object.assign({ className: "h-screen w-screen bg-gray-600 p-16" }, { children: _jsx("div", Object.assign({ className: "h-full w-full bg-white rounded-lg shadow-xl p-5 overflow-scroll" }, { children: _jsx(UserRegistrationForm, { onSuccess: handleRegistrationSuccess }, void 0) }), void 0) }), void 0));
};
