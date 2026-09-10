import React, { useEffect, useState } from 'react';
import { CsrfContext } from './CsrfContext';

const CsrfProvider = ({ children }) => {

    const [csrfToken, setCsrfToken] = useState(null);

    const getCsrfToken = async () => {
        try {
            const response = await fetch(
                'https://astem-bd-server.vercel.app/auth/csrf-token',
                {
                    credentials: 'include'
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to get CSRF token'
                );
            }

            setCsrfToken(data.csrfToken);

            return data.csrfToken;

        } catch (error) {
            console.error('CSRF token error:', error);
            throw error;
        }
    };

    useEffect(() => {
        getCsrfToken();
    }, []);

    return (
        <CsrfContext.Provider
            value={{
                csrfToken,
                getCsrfToken
            }}
        >
            {children}
        </CsrfContext.Provider>
    );
};

export default CsrfProvider;