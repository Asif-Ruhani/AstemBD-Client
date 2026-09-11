// import React from 'react';
// import { Navigate, useLocation } from 'react-router';
// import useAuth from '../Hooks/useAuth';

// const PrivateRoutes = ({ children }) => {

//     const { authStatus } = useAuth();
//     const location = useLocation();

//     if (authStatus === 'loading') {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <span className="loading loading-bars loading-lg"></span>
//             </div>
//         );
//     }

//     if (authStatus === 'not-authenticated') {
//         return (
//             <Navigate
//                 to="/login"
//                 state={{ from: location }}
//                 replace
//             />
//         );
//     }

//     if (authStatus === 'user' || authStatus === 'admin') {
//         return children;
//     }
// };

// export default PrivateRoutes;

import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';

const PrivateRoutes = ({ children }) => {
    const { authStatus, paymentStatus } = useAuth();
    const location = useLocation();

    // 1. Loading State
    if (authStatus === 'loading' || (authStatus !== 'not-authenticated' && paymentStatus === null)) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-zinc-950">
                <span className="loading loading-bars loading-lg text-slate-900 dark:text-white"></span>
            </div>
        );
    }

    // 2. Not Authenticated -> Redirect to Login
    if (authStatus === 'not-authenticated') {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // 3. Admin -> Direct Access (Bypass payment verification)
    if (authStatus === 'admin') {
        return children;
    }

    // 4. Authenticated User -> Check Payment Status
    if (authStatus === 'user') {
        // A. Paid -> Access granted
        if (paymentStatus === 'paid') {
            return children;
        }

        // B. Pending -> Display review notice with helpline
        if (paymentStatus === 'pending') {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4">
                    <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/60 rounded-3xl p-8 text-center shadow-xl space-y-4">
                        <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <svg className="w-7 h-7 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            Payment Under Review
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                            Your payment submission has been received and is awaiting admin verification. Please check back shortly.
                        </p>
                        <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-300">
                            Need urgent help? Contact Helpline:{' '}
                            <a
                                href="tel:01719875151"
                                className="font-bold text-slate-900 dark:text-white underline hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                                017xxxxxxxx
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        // C. Unpaid -> Redirect to Payment
        return (
            <Navigate
                to="/payment"
                state={{ from: location }}
                replace
            />
        );
    }

    return null;
};

export default PrivateRoutes;