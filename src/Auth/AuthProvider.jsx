

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from './AuthContext';
// import {
//     createUserWithEmailAndPassword,
//     GoogleAuthProvider,
//     sendPasswordResetEmail,
//     signInWithEmailAndPassword,
//     signInWithPopup,
//     onAuthStateChanged,
//     signOut
// } from 'firebase/auth';
// import { auth } from '../Firebase/Firebase.config';

// // Plain Axios instance outside the component — zero hooks, zero circular dependencies
// const authClient = axios.create({
//     baseURL: 'https://astembd-server.onrender.com',
//     withCredentials: true,
//     headers: {
//         'X-Requested-With': 'XMLHttpRequest'
//     }
// });

// const googleProvider = new GoogleAuthProvider();
// googleProvider.setCustomParameters({ prompt: 'select_account' });

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [authStatus, setAuthStatus] = useState('loading');
//     const [paymentStatus, setPaymentStatus] = useState(null); // 'paid' | 'pending' | 'unpaid' | null
//     const [enrolledCourses, setEnrolledCourses] = useState([]); // Array of active course objects
//     const creatingServerSession = useRef(false);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);

//             if (!currentUser) {
//                 setAuthStatus('not-authenticated');
//                 setPaymentStatus(null);
//                 setEnrolledCourses([]);
//                 setLoading(false);
//                 return;
//             }

//             if (creatingServerSession.current) {
//                 setLoading(false);
//                 return;
//             }

//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     // Check session status strictly via HttpOnly cookie
//     const checkAuthStatus = async () => {
//         try {
//             const response = await authClient.get('/auth/me');
//             const data = response.data;

//             // Strict dual-verified admin verdict from backend
//             if (data.isAdmin === true) {
//                 setAuthStatus('admin');
//             } else {
//                 setAuthStatus('user');
//             }

//             // Filter out any expired courses on the client side
//             const now = new Date();
//             const rawCourses = Array.isArray(data.enrolledCourses) ? data.enrolledCourses : [];
//             const activeCourses = rawCourses.filter((course) => {
//                 if (course.status !== 'active') return false;
//                 if (!course.expiresAt) return true;
//                 return new Date(course.expiresAt) > now;
//             });

//             setEnrolledCourses(activeCourses);

//             // Maintain fallback paymentStatus: if they have active courses, consider them 'paid'
//             if (activeCourses.length > 0) {
//                 setPaymentStatus('paid');
//             } else {
//                 setPaymentStatus((data.paymentStatus || 'unpaid').toLowerCase());
//             }
//         } catch (error) {
//             console.error('Authentication status check failed:', error);
//             setAuthStatus('not-authenticated');
//             setPaymentStatus(null);
//             setEnrolledCourses([]);
//         }
//     };

//     useEffect(() => {
//         if (loading) return;

//         if (!user) {
//             setAuthStatus('not-authenticated');
//             setPaymentStatus(null);
//             setEnrolledCourses([]);
//             return;
//         }

//         if (creatingServerSession.current) return;

//         checkAuthStatus();
//     }, [user, loading]);

//     // Fast helper to check access to a specific course
//     const hasAccess = (courseId) => {
//         if (!courseId) return false;
//         return enrolledCourses.some((c) => c.courseId === courseId);
//     };

//     // Create server session cookie (one-time handshake with ID token)
//     const createServerSession = async (firebaseUser) => {
//         try {
//             const idToken = await firebaseUser.getIdToken();

//             const response = await authClient.post(
//                 '/auth/session',
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${idToken}`
//                     }
//                 }
//             );

//             await checkAuthStatus();
//             return response.data;
//         } catch (error) {
//             if (error.response?.status === 403 || error.response?.status === 401) {
//                 await signOut(auth);
//                 setUser(null);
//                 setAuthStatus('not-authenticated');
//                 setPaymentStatus(null);
//                 setEnrolledCourses([]);

//                 const customMessage = error.response?.data?.message || 'Access denied: Your account is blocked or disabled.';
//                 const err = new Error(customMessage);
//                 err.status = error.response?.status;
//                 throw err;
//             }
//             throw error;
//         }
//     };

//     // User registration
//     const userRegistration = async (email, password) => {
//         try {
//             creatingServerSession.current = true;
//             const result = await createUserWithEmailAndPassword(auth, email, password);
//             await createServerSession(result.user);
//             return result;
//         } finally {
//             creatingServerSession.current = false;
//         }
//     };

//     // User sign in
//     const userSignIn = async (email, password) => {
//         try {
//             creatingServerSession.current = true;
//             const result = await signInWithEmailAndPassword(auth, email, password);
//             await createServerSession(result.user);
//             return result;
//         } catch (error) {
//             console.error('Firebase email login error:', error);
//             throw error;
//         } finally {
//             creatingServerSession.current = false;
//         }
//     };

//     // Google sign in
//     const userLoginWithGoole = async () => {
//         try {
//             creatingServerSession.current = true;
//             const result = await signInWithPopup(auth, googleProvider);
//             await createServerSession(result.user);
//             return result;
//         } catch (error) {
//             console.error('Google sign in error:', error);
//             throw error;
//         } finally {
//             creatingServerSession.current = false;
//         }
//     };

//     // Reset password
//     const resetPassword = (email) => {
//         return sendPasswordResetEmail(auth, email);
//     };

//     // User logout
//     const userLogout = async () => {
//         try {
//             await authClient.post('/auth/logout');
//         } catch (error) {
//             console.error('Server logout notice:', error);
//         } finally {
//             await signOut(auth);
//             setUser(null);
//             setAuthStatus('not-authenticated');
//             setPaymentStatus(null);
//             setEnrolledCourses([]);
//         }
//     };

//     const authInfo = {
//         userRegistration,
//         userSignIn,
//         userLoginWithGoole,
//         authStatus,
//         paymentStatus,
//         enrolledCourses,
//         hasAccess,
//         checkAuthStatus,
//         resetPassword,
//         userLogout,
//         user,
//         loading
//     };

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

// Plain Axios instance outside the component — zero hooks, zero circular dependencies
const authClient = axios.create({
    baseURL: 'https://astembd-server.onrender.com',
    // baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Categories that are completely free for all users
const FREE_CATEGORIES = ['overall-courses', 'english-vocabulary'];

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authStatus, setAuthStatus] = useState('loading');
    const [paymentStatus, setPaymentStatus] = useState(null); // 'paid' | 'pending' | 'unpaid' | null
    const [enrolledCourses, setEnrolledCourses] = useState([]); // Array of active course objects
    const creatingServerSession = useRef(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (!currentUser) {
                setAuthStatus('not-authenticated');
                setPaymentStatus(null);
                setEnrolledCourses([]);
                setLoading(false);
                return;
            }

            if (creatingServerSession.current) {
                setLoading(false);
                return;
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Check session status strictly via HttpOnly cookie
    const checkAuthStatus = async () => {
        // Guard: Do not call the backend if there is no Firebase user
        if (!auth.currentUser && !user) {
            setAuthStatus('not-authenticated');
            setPaymentStatus(null);
            setEnrolledCourses([]);
            return;
        }

        try {
            const response = await authClient.get('/auth/me');
            const data = response.data;

            // Strict dual-verified admin verdict from backend
            if (data.isAdmin === true) {
                setAuthStatus('admin');
            } else {
                setAuthStatus('user');
            }

            // Client-side expiry boundary check
            const now = new Date();
            const rawCourses = Array.isArray(data.enrolledCourses) ? data.enrolledCourses : [];
            const activeCourses = rawCourses.filter((course) => {
                if (course.status !== 'active') return false;
                if (!course.expiresAt) return true;
                return new Date(course.expiresAt) > now;
            });

            setEnrolledCourses(activeCourses);

            // Maintain fallback paymentStatus: if they have active courses, consider them 'paid'
            if (activeCourses.length > 0) {
                setPaymentStatus('paid');
            } else {
                setPaymentStatus((data.paymentStatus || 'unpaid').toLowerCase());
            }
        } catch (error) {
            console.error('Authentication status check failed:', error);
            setAuthStatus('not-authenticated');
            setPaymentStatus(null);
            setEnrolledCourses([]);
        }
    };

    useEffect(() => {
        if (loading) return;

        if (!user) {
            setAuthStatus('not-authenticated');
            setPaymentStatus(null);
            setEnrolledCourses([]);
            return;
        }

        if (creatingServerSession.current) return;

        checkAuthStatus();
    }, [user, loading]);


















    // Secure Bundle Access Check:
    // Only returns TRUE if the user holds an active enrollment in this category WITH pricingModel === 'bundle'
    // const hasBundleAccess = (categoryKey) => {
    //     if (!categoryKey) return false;

    //     // Free categories are inherently accessible
    //     if (FREE_CATEGORIES.includes(categoryKey)) return true;
    //     console.log("hasBundleAccess values: ", enrolledCourses);

    //     return enrolledCourses.some(
    //         (c) => c.category === categoryKey && (c.pricingModel === 'bundle' || c.category?.includes('vocab'))
    //     );

    // };

    // Course Access Check (Supports both Single and Bundle unlocked courses):
    // 1. Unlocks if course belongs to a free category
    // 2. Unlocks if course belongs to a bundle track the user has paid for
    // 3. Unlocks if the exact courseId is enrolled (single purchases)
    // const hasAccess = (courseId, categoryKey = null) => {
    //     if (!courseId) return false;

    //     // 1. Free category check
    //     if (categoryKey && FREE_CATEGORIES.includes(categoryKey)) {
    //         return true;
    //     }

    //     // 2. Bundle entitlement check
    //     if (categoryKey && hasBundleAccess(categoryKey)) {
    //         return true;
    //     }
    //     console.log("hasAccess values: ", enrolledCourses);

    //     // 3. Exact courseId check
    //     return enrolledCourses.some((c) => {
    //         if (c.courseId === courseId) return true;
    //         // Fallback: If user holds bundle entitlement under this course's category
    //         if (categoryKey && c.category === categoryKey && (c.pricingModel === 'bundle' || c.category?.includes('vocab'))) {
    //             return true;
    //         }
    //         return false;
    //     });


    // };





    // Secure Bundle Access Check:
    // Only returns TRUE if the user holds an active enrollment in this category WITH pricingModel === 'bundle'
    const hasBundleAccess = (categoryKey) => {
        if (!categoryKey) return false;

        // Free categories are inherently accessible
        if (FREE_CATEGORIES.includes(categoryKey)) return true;
        // console.log("hasBundleAccess values: ", enrolledCourses);

        return enrolledCourses.some(
            (c) => c.category === categoryKey && (c.pricingModel === 'bundle' || c.category?.includes('vocab'))
        );
    };

    // Course Access Check (Supports both Single and Bundle unlocked courses):
    // 1. Unlocks if course belongs to a free category
    // 2. Unlocks if course belongs to a bundle track the user has paid for
    // 3. Unlocks if the exact courseId is enrolled (single purchases)
    const hasAccess = (courseId, categoryKey = null) => {
        if (!courseId) return false;

        // 1. Free category check
        if (categoryKey && FREE_CATEGORIES.includes(categoryKey)) {
            return true;
        }

        // 2. Bundle entitlement check
        if (categoryKey && hasBundleAccess(categoryKey)) {
            return true;
        }
        // console.log("hasAccess values: ", enrolledCourses);

        // 3. Exact courseId check (Single purchase)
        return enrolledCourses.some((c) => String(c.courseId) === String(courseId));
    };



















    // Create server session cookie (one-time handshake with ID token)
    const createServerSession = async (firebaseUser) => {
        try {
            const idToken = await firebaseUser.getIdToken();

            const response = await authClient.post(
                '/auth/session',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                }
            );

            await checkAuthStatus();
            return response.data;
        } catch (error) {
            if (error.response?.status === 403 || error.response?.status === 401) {
                await signOut(auth);
                setUser(null);
                setAuthStatus('not-authenticated');
                setPaymentStatus(null);
                setEnrolledCourses([]);

                const customMessage = error.response?.data?.message || 'Access denied: Your account is blocked or disabled.';
                const err = new Error(customMessage);
                err.status = error.response?.status;
                throw err;
            }
            throw error;
        }
    };

    // User registration
    const userRegistration = async (email, password) => {
        try {
            creatingServerSession.current = true;
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await createServerSession(result.user);
            return result;
        } finally {
            creatingServerSession.current = false;
        }
    };

    // User sign in
    const userSignIn = async (email, password) => {
        try {
            creatingServerSession.current = true;
            const result = await signInWithEmailAndPassword(auth, email, password);
            await createServerSession(result.user);
            return result;
        } catch (error) {
            console.error('Firebase email login error:', error);
            throw error;
        } finally {
            creatingServerSession.current = false;
        }
    };

    // Google sign in
    const userLoginWithGoole = async () => {
        try {
            creatingServerSession.current = true;
            const result = await signInWithPopup(auth, googleProvider);
            await createServerSession(result.user);
            return result;
        } catch (error) {
            console.error('Google sign in error:', error);
            throw error;
        } finally {
            creatingServerSession.current = false;
        }
    };

    // Reset password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // User logout
    const userLogout = async () => {
        try {
            await authClient.post('/auth/logout');
        } catch (error) {
            console.error('Server logout notice:', error);
        } finally {
            await signOut(auth);
            setUser(null);
            setAuthStatus('not-authenticated');
            setPaymentStatus(null);
            setEnrolledCourses([]);
        }
    };

    const authInfo = {
        userRegistration,
        userSignIn,
        userLoginWithGoole,
        authStatus,
        paymentStatus,
        enrolledCourses,
        hasAccess,
        hasBundleAccess,
        checkAuthStatus,
        resetPassword,
        userLogout,
        user,
        loading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;