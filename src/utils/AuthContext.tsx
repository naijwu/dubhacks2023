"use client";

import React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import { provider, auth } from "../utils/config";
import { signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({} as any);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: {children: any}) {
    const [currentUser, setCurrentUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth change detected')
            if (user) { 
                // done loading
                setCurrentUser(user);
                setLoading(false);
            } else {
                // done loading
                setCurrentUser(user);
                setLoading(false);
            }
            setLoading(false)
        });
  
      return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{
            currentUser,
            logout,
            setCurrentUser,
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}