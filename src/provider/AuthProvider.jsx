import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase.init';

export const AuthContext = createContext(null)

const auth = getAuth(app)
const google = new GoogleAuthProvider();
const github = new GithubAuthProvider();
const facebook = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const joinByGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, google)
    }
    const joinByFacebook = () => {
        setLoading(true)
        return signInWithPopup(auth, facebook)
    }
    const joinByGithub = () => {
        setLoading(true)
        return signInWithPopup(auth, github)
    }
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const mailVerification = (user) => {
        return sendEmailVerification(user)
    }
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const logOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('auth state change', currentUser);
            // if (currentUser.emailVerified) {
            setUser(currentUser)
            setLoading(false)
            // }
            // else {
            //     setUser(null)
            //     setLoading(false)
            // }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        createUser,
        mailVerification,
        logIn,
        logOut,
        joinByGoogle,
        joinByFacebook,
        joinByGithub,
        resetPassword,
        setLoading,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;