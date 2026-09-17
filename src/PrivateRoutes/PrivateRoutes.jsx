// import React from 'react';
// import { Navigate, useLocation } from 'react-router';
// import useAuth from '../Hooks/useAuth';
// import DynamicWatermark from '../component/DynamicWatermark';
// import { useScreenShield } from '../Hooks/useScreenShield';
// import useHardenedShield from '../Hooks/useHardenedShield';




// const PrivateRoutes = ({ children }) => {
//     const { authStatus, paymentStatus } = useAuth();
//     const location = useLocation();
//     const { isProtected, resetShield } = useScreenShield({ autoRecover: true });

//     useHardenedShield();

//     // Helper wrapper to enforce dynamic watermark and defocus screen shield
//     const renderProtectedContent = (content) => (
//         <div className="relative min-h-screen">
//             {/* 1. Dynamic Canvas Watermark (User Email, Partial UID, Date) */}
//             <DynamicWatermark />

//             {/* 2. Defocus Shield Overlay (Fires when Snipping tool or window focus leaves) */}
//             {isProtected && (
//                 <div
//                     onClick={resetShield}
//                     className="fixed inset-0 z-[10000] backdrop-blur-2xl bg-slate-950/90 flex flex-col items-center justify-center text-center p-6 select-none cursor-pointer"
//                 >
//                     <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mb-4">
//                         <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                     </div>
//                     <h2 className="text-xl font-black text-white tracking-tight mb-1">
//                         Screen Capture Protection Active
//                     </h2>
//                     <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
//                         Content is hidden because an external tool or another window is focused. Click anywhere on this screen to resume.
//                     </p>
//                 </div>
//             )}

//             {/* 3. Actual Private Content */}
//             {content}
//         </div>
//     );

//     // 1. Loading State
//     if (authStatus === 'loading' || (authStatus !== 'not-authenticated' && paymentStatus === null)) {
//         return (
//             <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-zinc-950">
//                 <span className="loading loading-bars loading-lg text-slate-900 dark:text-white"></span>
//             </div>
//         );
//     }

//     // 2. Not Authenticated -> Redirect to Login
//     if (authStatus === 'not-authenticated') {
//         return (
//             <Navigate
//                 to="/login"
//                 state={{ from: location }}
//                 replace
//             />
//         );
//     }

//     // 3. Admin -> Direct Access with Protection
//     if (authStatus === 'admin') {
//         return renderProtectedContent(children);
//     }

//     // 4. Authenticated User -> Check Payment Status
//     if (authStatus === 'user') {
//         // A. Paid -> Access granted with Protection
//         if (paymentStatus === 'paid') {
//             return renderProtectedContent(children);
//         }

//         // B. Pending -> Display review notice with helpline (No need to watermark review notice)
//         if (paymentStatus === 'pending') {
//             return (
//                 <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4">
//                     <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/60 rounded-3xl p-8 text-center shadow-xl space-y-4">
//                         <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
//                             <svg className="w-7 h-7 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                         <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
//                             Payment Under Review
//                         </h2>
//                         <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
//                             Your payment submission has been received and is awaiting admin verification. Please check back shortly.
//                         </p>
//                         <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-300">
//                             Need urgent help? Contact Helpline:{' '}
//                             <a
//                                 href="tel:01719875151"
//                                 className="font-bold text-slate-900 dark:text-white underline hover:text-emerald-600 dark:hover:text-emerald-400"
//                             >
//                                 017xxxxxxxx
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }

//         // C. Unpaid -> Redirect to Payment
//         return (
//             <Navigate
//                 to="/payment"
//                 state={{ from: location }}
//                 replace
//             />
//         );
//     }

//     return null;
// };

// export default PrivateRoutes;


import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import DynamicWatermark from '../component/DynamicWatermark';
import { useScreenShield } from '../Hooks/useScreenShield';
import useHardenedShield from '../Hooks/useHardenedShield';
import AccessDenied from '../component/AccessDenied';

const PrivateRoutes = ({ children, courseId }) => {
    const { authStatus, paymentStatus, hasAccess } = useAuth();
    const location = useLocation();
    const { isProtected, resetShield } = useScreenShield({ autoRecover: true });

    useHardenedShield();

    // Helper wrapper to enforce dynamic watermark and defocus screen shield
    const renderProtectedContent = (content) => (
        <div className="relative min-h-screen">
            {/* 1. Dynamic Canvas Watermark */}
            <DynamicWatermark />

            {/* 2. Defocus Shield Overlay */}
            {isProtected && (
                <div
                    onClick={resetShield}
                    className="fixed inset-0 z-[10000] backdrop-blur-2xl bg-slate-950/90 flex flex-col items-center justify-center text-center p-6 select-none cursor-pointer"
                >
                    <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mb-4">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tight mb-1">
                        Screen Capture Protection Active
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                        Content is hidden because an external tool or another window is focused. Click anywhere on this screen to resume.
                    </p>
                </div>
            )}

            {/* 3. Actual Protected Content */}
            {content}
        </div>
    );

    // 1. Loading State (waits purely on authStatus, which now resolves user + courses in one step)
    if (authStatus === 'loading' || (authStatus !== 'not-authenticated' && paymentStatus === null)) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-zinc-950">
                <span className="loading loading-bars loading-lg text-slate-900 dark:text-white" />
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

    // 3. Admin -> Direct Access with full DRM protection
    if (authStatus === 'admin') {
        return renderProtectedContent(children);
    }

    // 4. Authenticated User Evaluation
    if (authStatus === 'user') {
        // Case A: Specific Course Route -> Check active 1-year entitlement in MongoDB via AuthProvider
        if (courseId) {
            if (!hasAccess(courseId)) {
                return (
                    <AccessDenied
                        message="You do not have active access to this course. Either it has not been purchased or your 1-year access has expired."
                    />
                );
            }
            return renderProtectedContent(children);
        }

        // Case B: General Private Route -> Fallback to broad payment status
        if (paymentStatus === 'paid') {
            return renderProtectedContent(children);
        }

        // Case C: Payment Pending Review Notice
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

        // Case D: Unpaid -> Redirect to Payment
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







