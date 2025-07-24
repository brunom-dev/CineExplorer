import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import { onAuthStateChanged, type User } from "firebase/auth";
import { db, auth } from "../services/firebase/firebaseConfig";

import type { UserProps as AppUser } from "../types/User/UserProps";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
    currentUser: AppUser | null;
    firebaseUser: User | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setFirebaseUser(user);
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setCurrentUser({
                        uid: user.uid,
                        ...userDocSnap.data(),
                    } as AppUser);
                }
            } else {
                setFirebaseUser(null);
                setCurrentUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = { currentUser, firebaseUser, isLoading };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
