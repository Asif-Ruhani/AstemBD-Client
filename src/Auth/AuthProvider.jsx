import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase/Firebase.config'
import useCsrf from '../Hooks/useCsrf'

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const AuthProvider = ({ children }) => {

    const { csrfToken, getCsrfToken } = useCsrf();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();

    }, []);


    // user registration
    const userRegistration = async (email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        await createServerSession(result.user);

        return result;
    };

    // user login / sign in
    const userSignIn = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);

        await createServerSession(result.user);

        return result;
    };

    // user login with google
    const userLoginWithGoole = async () => {
        const result = await signInWithPopup(auth, googleProvider);

        await createServerSession(result.user);

        return result;
    };



    const createServerSession = async (firebaseUser) => {

        const token = csrfToken || await getCsrfToken();

        const idToken = await firebaseUser.getIdToken();

        const response = await fetch(
            'http://localhost:3000/auth/session',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'X-CSRF-Token': token
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || 'Failed to create server session'
            );
        }

        console.log('Server session response:', data);

        return data;
    };


    // reset password (forgot password)
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }


    //user logout
    const userLogout = async () => {
        const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Logout failed');
        }

        return data;
    };


    const authInfo = {
        userRegistration,
        userSignIn,
        userLoginWithGoole,
        resetPassword,
        userLogout,
        user,
        loading

    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider