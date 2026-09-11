// import React, { useEffect, useRef, useState } from 'react'
// import { AuthContext } from './AuthContext'
// import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
// import { auth } from '../Firebase/Firebase.config'
// import useCsrf from '../Hooks/useCsrf'

// const googleProvider = new GoogleAuthProvider();
// googleProvider.setCustomParameters({ prompt: 'select_account' });

// const AuthProvider = ({ children }) => {

//     const { csrfToken, getCsrfToken } = useCsrf();
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [authStatus, setAuthStatus] = useState('loading');
//     const creatingServerSession = useRef(false);


//     useEffect(() => {

//         const unsubscribe = onAuthStateChanged(
//             auth,
//             (currentUser) => {

//                 setUser(currentUser);

//                 if (!currentUser) {
//                     setAuthStatus('not-authenticated');
//                     setLoading(false);
//                     return;
//                 }

//                 // During login/registration, wait for
//                 // createServerSession() to finish.
//                 if (creatingServerSession.current) {
//                     setLoading(false);
//                     return;
//                 }

//                 setLoading(false);
//             }
//         );

//         return () => unsubscribe();

//     }, []);


//     const checkAuthStatus = async () => {

//         try {

//             const response = await fetch(
//                 // 'https://astem-bd-server.vercel.app/auth/me',
//                 // 'http://localhost:3000/auth/me',
//                 'https://astembd-server.onrender.com/auth/me',
//                 {
//                     method: 'GET',
//                     credentials: 'include'
//                 }
//             );

//             if (!response.ok) {
//                 setAuthStatus('not-authenticated');
//                 return;
//             }

//             const data = await response.json();

//             if (data.isAdmin === true) {
//                 setAuthStatus('admin');
//             } else {
//                 setAuthStatus('user');
//             }

//         } catch (error) {

//             console.error(
//                 'Authentication status check failed:',
//                 error
//             );

//             setAuthStatus('not-authenticated');
//         }
//     };

//     useEffect(() => {

//         if (loading) {
//             return;
//         }

//         if (!user) {
//             setAuthStatus('not-authenticated');
//             return;
//         }

//         if (creatingServerSession.current) {
//             return;
//         }

//         checkAuthStatus();

//     }, [user, loading]);


//     // user registration
//     const userRegistration = async (email, password) => {

//         try {

//             creatingServerSession.current = true;

//             const result =
//                 await createUserWithEmailAndPassword(
//                     auth,
//                     email,
//                     password
//                 );

//             await createServerSession(result.user);

//             creatingServerSession.current = false;

//             return result;

//         } catch (error) {

//             creatingServerSession.current = false;

//             throw error;
//         }
//     };

//     // user login / sign in
//     // const userSignIn = async (email, password) => {
//     //     const result = await signInWithEmailAndPassword(auth, email, password);

//     //     await createServerSession(result.user);

//     //     return result;
//     // };
//     const userSignIn = async (email, password) => {

//         try {

//             creatingServerSession.current = true;

//             const result = await signInWithEmailAndPassword(
//                 auth,
//                 email,
//                 password
//             );

//             await createServerSession(result.user);

//             creatingServerSession.current = false;

//             return result;

//         } catch (error) {

//             creatingServerSession.current = false;

//             console.error(
//                 "Firebase email login error:",
//                 error
//             );

//             throw error;
//         }
//     };

//     // user login with google
//     const userLoginWithGoole = async () => {

//         try {

//             creatingServerSession.current = true;

//             const result = await signInWithPopup(
//                 auth,
//                 googleProvider
//             );

//             await createServerSession(result.user);

//             creatingServerSession.current = false;

//             return result;

//         } catch (error) {

//             creatingServerSession.current = false;

//             throw error;
//         }
//     };



//     const createServerSession = async (firebaseUser) => {

//         const token = csrfToken || await getCsrfToken();

//         const idToken = await firebaseUser.getIdToken();
//         // console.log("Creating server session...");
//         // console.log("CSRF token:", token);
//         // console.log("Sending server session request");

//         const response = await fetch(
//             // 'https://astem-bd-server.vercel.app/auth/session',
//             // 'http://localhost:3000/auth/session',
//             'https://astembd-server.onrender.com/auth/session',
//             {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: {
//                     Authorization: `Bearer ${idToken}`,
//                     'X-CSRF-Token': token
//                 }
//             }
//         );

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(
//                 data.message || 'Failed to create server session'
//             );
//         }

//         await checkAuthStatus();

//         return data;
//     };


//     // reset password (forgot password)
//     const resetPassword = (email) => {
//         return sendPasswordResetEmail(auth, email);
//     }


//     //user logout
//     const userLogout = async () => {

//         try {

//             // Get CSRF token
//             const token = csrfToken || await getCsrfToken();

//             // First clear the server-side session cookie
//             const response = await fetch(
//                 // 'https://astem-bd-server.vercel.app/auth/logout',
//                 // 'http://localhost:3000/auth/logout',
//                 'https://astembd-server.onrender.com/auth/logout',
//                 {
//                     method: 'POST',
//                     credentials: 'include',
//                     headers: {
//                         'X-CSRF-Token': token
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(
//                     data.message || 'Server logout failed'
//                 );
//             }

//             // After server session is cleared,
//             // sign out from Firebase client
//             await signOut(auth);

//             return data;

//         } catch (error) {

//             console.error('Logout failed:', error);

//             throw error;
//         }
//     };


//     const authInfo = {
//         userRegistration,
//         userSignIn,
//         userLoginWithGoole,
//         authStatus,
//         resetPassword,
//         userLogout,
//         user,
//         loading

//     }

//     return (
//         <AuthContext value={authInfo}>
//             {children}
//         </AuthContext>
//     )
// }

// export default AuthProvider


import React, { useEffect, useRef, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../Firebase/Firebase.config'

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authStatus, setAuthStatus] = useState('loading');
    const creatingServerSession = useRef(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);

                if (!currentUser) {
                    setAuthStatus('not-authenticated');
                    setLoading(false);
                    return;
                }

                // During login/registration, wait for
                // createServerSession() to finish.
                if (creatingServerSession.current) {
                    setLoading(false);
                    return;
                }

                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const checkAuthStatus = async () => {
        try {
            // Get fresh ID token from Firebase Client SDK
            const currentUser = auth.currentUser;
            const idToken = currentUser ? await currentUser.getIdToken() : null;

            const headers = {};
            if (idToken) {
                headers['Authorization'] = `Bearer ${idToken}`;
            }

            const response = await fetch(
                'https://astembd-server.onrender.com/auth/me',
                {
                    method: 'GET',
                    credentials: 'include',
                    headers
                }
            );

            if (!response.ok) {
                setAuthStatus('not-authenticated');
                return;
            }

            const data = await response.json();

            if (data.isAdmin === true) {
                setAuthStatus('admin');
            } else {
                setAuthStatus('user');
            }

        } catch (error) {
            console.error(
                'Authentication status check failed:',
                error
            );

            setAuthStatus('not-authenticated');
        }
    };

    useEffect(() => {
        if (loading) {
            return;
        }

        if (!user) {
            setAuthStatus('not-authenticated');
            return;
        }

        if (creatingServerSession.current) {
            return;
        }

        checkAuthStatus();
    }, [user, loading]);

    // user registration
    const userRegistration = async (email, password) => {
        try {
            creatingServerSession.current = true;

            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await createServerSession(result.user);

            creatingServerSession.current = false;

            return result;
        } catch (error) {
            creatingServerSession.current = false;
            throw error;
        }
    };

    // user login / sign in
    const userSignIn = async (email, password) => {
        try {
            creatingServerSession.current = true;

            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            await createServerSession(result.user);

            creatingServerSession.current = false;

            return result;
        } catch (error) {
            creatingServerSession.current = false;

            console.error(
                "Firebase email login error:",
                error
            );

            throw error;
        }
    };

    // user login with google
    const userLoginWithGoole = async () => {
        try {
            creatingServerSession.current = true;

            const result = await signInWithPopup(
                auth,
                googleProvider
            );

            await createServerSession(result.user);

            creatingServerSession.current = false;

            return result;
        } catch (error) {
            creatingServerSession.current = false;
            throw error;
        }
    };

    const createServerSession = async (firebaseUser) => {
        const idToken = await firebaseUser.getIdToken();

        const response = await fetch(
            'https://astembd-server.onrender.com/auth/session',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || 'Failed to create server session'
            );
        }

        await checkAuthStatus();

        return data;
    };

    // reset password (forgot password)
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // user logout
    const userLogout = async () => {
        try {
            // First clear the server-side session cookie
            const response = await fetch(
                'https://astembd-server.onrender.com/auth/logout',
                {
                    method: 'POST',
                    credentials: 'include'
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Server logout failed'
                );
            }

            // After server session is cleared, sign out from Firebase client
            await signOut(auth);

            return data;
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const authInfo = {
        userRegistration,
        userSignIn,
        userLoginWithGoole,
        authStatus,
        resetPassword,
        userLogout,
        user,
        loading
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;