import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';

const PrivateRoutes = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    const [sessionChecking, setSessionChecking] = useState(true);
    const [sessionValid, setSessionValid] = useState(false);

    useEffect(() => {

        const checkServerSession = async () => {

            if (!user) {
                setSessionChecking(false);
                setSessionValid(false);
                return;
            }

            try {

                const response = await fetch(
                    'http://localhost:3000/auth/me',
                    {
                        method: 'GET',
                        credentials: 'include'
                    }
                );

                if (response.ok) {
                    setSessionValid(true);
                } else {
                    setSessionValid(false);
                }

            } catch (error) {

                console.error(
                    'Server session check failed:',
                    error
                );

                setSessionValid(false);

            } finally {
                setSessionChecking(false);
            }
        };

        if (!loading) {
            checkServerSession();
        }

    }, [user, loading]);

    // Firebase is still checking authentication
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    // Backend session is still being checked
    if (sessionChecking) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    // No Firebase user
    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Firebase user exists but server session is invalid
    if (!sessionValid) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default PrivateRoutes;