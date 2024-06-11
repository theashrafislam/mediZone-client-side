import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/Firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxoisPublic from "../Hooks/useAxoisPublic";

const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axoisPublic = useAxoisPublic();


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
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = {
                    email: currentUser.email
                }
                axoisPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('token');
                setLoading(false)
            }
            setLoading(false);
            return () => {
                return unSubscribe();
            }
        })
    }, [axoisPublic]);

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

    //signin using google
    const loginUsingGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const authInfo = {
        user,
        setUser,
        loading,
        createUserEmailPass,
        updateUserProfile,
        userLogOut,
        loginWithEmailPassword,
        loginUsingGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;