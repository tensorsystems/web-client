import * as React from 'react';
import { RouteProps } from 'react-router';
export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    isAllowed: boolean;
    restrictedPath: string;
    authenticationPath: string;
}
export declare const ProtectedRoute: React.FC<ProtectedRouteProps>;
export default ProtectedRoute;
