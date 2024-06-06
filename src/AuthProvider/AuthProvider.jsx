import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/Firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //create user using email and password
    const createUserEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //update the user profile
    const updateUserProfile = (displayName, image) => {
        return updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: image
        })
    }

    //onAuthUser
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            return () => {
                return unSubscribe();
            }
        })
    }, []);

    //logOut 
    const userLogOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    //userLoginUsingEmailPassword
    const loginWithEmailPassword = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const authInfo = {
        user,
        setUser,
        loading,
        createUserEmailPass,
        updateUserProfile,
        userLogOut,
        loginWithEmailPassword
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;