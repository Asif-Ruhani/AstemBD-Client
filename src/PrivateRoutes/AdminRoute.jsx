import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import AccessDenied from '../component/AccessDenied';

const AdminRoute = ({ children }) => {
    const { authStatus } = useAuth();
    const location = useLocation();

    // Loading state while resolving auth
    if (authStatus === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg text-slate-800 dark:text-white"></span>
            </div>
        );
    }

    // Status 1: No user logged in -> Redirect to login
    if (authStatus === 'not-authenticated') {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Status 2: User logged in, but NOT admin -> Show Access Denied
    if (authStatus === 'user') {
        return <AccessDenied></AccessDenied>;
    }

    // Status 3: User logged in AND admin -> Allow access
    if (authStatus === 'admin') {
        return children;
    }

    // Fallback catch-all
    return <Navigate to="/login" replace />;
};

export default AdminRoute;