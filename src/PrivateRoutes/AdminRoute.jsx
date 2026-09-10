import React  from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({ children }) => {

    const { authStatus } = useAuth();
    const location = useLocation();


    if (authStatus === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (authStatus === 'not-authenticated') {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    if (authStatus === 'user') {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    if (authStatus === 'admin') {
        return children;
    }
};

export default AdminRoute;