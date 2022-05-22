import { jsx as _jsx } from "react/jsx-runtime";
import { Redirect, Route } from 'react-router';
export const ProtectedRoute = props => {
    let redirectPath = '';
    if (!props.isAuthenticated) {
        redirectPath = props.authenticationPath;
    }
    if (props.isAuthenticated && !props.isAllowed) {
        redirectPath = props.restrictedPath;
    }
    if (redirectPath) {
        const renderComponent = () => _jsx(Redirect, { to: { pathname: redirectPath } }, void 0);
        return _jsx(Route, Object.assign({}, props, { component: renderComponent, render: undefined }), void 0);
    }
    else {
        return _jsx(Route, Object.assign({}, props), void 0);
    }
};
export default ProtectedRoute;
