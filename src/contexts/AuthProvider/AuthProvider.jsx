import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const [user,setUser]= useState(null)
    const [loading,setLoading]= useState(true)
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }   
   const logoutUser = async () => {
     setLoading(true);
     await signOut(auth);
     setUser(null);
   };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });     
        return () => unsubscribe();
    }, []);

    const authInfo = {
      createUser,
      loginUser,
      logoutUser,
      user,
      loading,
      setLoading,
      setUser,
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;