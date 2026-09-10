import React from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../Firebase/Firebase.config'

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const AuthProvider = ({ children }) => {


    // user registration
    const userRegistration = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    // user login / sign in
    const userSignIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    } 

    // user login with google
    const userLoginWithGoole = () => {
        return signInWithPopup(auth, googleProvider);
    };


    const authInfo = {
        userRegistration,
        userSignIn,
        userLoginWithGoole

    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider