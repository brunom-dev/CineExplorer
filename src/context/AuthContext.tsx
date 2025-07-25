import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
    useCallback,
} from "react";

import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";

import { app, db } from "../services/firebase/firebaseConfig";
import type { UserProps as AppUser } from "../types/User/UserProps";
import type { FavoriteItemProps,} from "../types/Media/MediaItemProps";

interface AuthContextType {
    currentUser: AppUser | null;
    firebaseUser: User | null;
    isLoading: boolean;
    addFavorite: (mediaItem: FavoriteItemProps) => Promise<void>;
    removeFavorite: (mediaId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const addFavorite = useCallback(
        async (mediaItem: FavoriteItemProps): Promise<void> => {
            if (!currentUser) throw new Error("Usuário não logado");

            if (
                currentUser?.myFavorite?.some(
                    (item) => item.id === mediaItem.id
                )
            ) {
                return;
            }

            const favoriteItem: FavoriteItemProps = {
                id: mediaItem.id,
                media_type: mediaItem.media_type,
                createAt: new Date(),
            };

            try {
                const docRef = doc(db, "users", currentUser?.uid);

                await updateDoc(docRef, {
                    myFavorite: arrayUnion(favoriteItem),
                });

                setCurrentUser((prevUser) =>
                    prevUser
                        ? {
                              ...prevUser,
                              myFavorite: [
                                  ...(prevUser.myFavorite || []),
                                  favoriteItem,
                              ],
                          }
                        : null
                );
            } catch (error) {
                throw error;
            }
        },
        [currentUser]
    );

    const removeFavorite = useCallback(
        async (mediaId: number): Promise<void> => {
            if (!currentUser?.myFavorite)
                throw new Error("Usuário ou lista não encontrados.");

            const itemToRemove = currentUser.myFavorite.find(
                (item) => item.id === mediaId
            );
            if (!itemToRemove) return;

            const docRef = doc(db, "users", currentUser.uid);
            await updateDoc(docRef, { myFavorite: arrayRemove(itemToRemove) });

            setCurrentUser((prevUser) =>
                prevUser
                    ? {
                          ...prevUser,
                          myFavorite: prevUser.myFavorite.filter(
                              (item) => item.id !== mediaId
                          ),
                      }
                    : null
            );
        },
        [currentUser]
    );

    useEffect(() => {
        const auth = getAuth(app);
        const db = getFirestore(app);
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
    }, [addFavorite, removeFavorite]);

    const value = {
        currentUser,
        firebaseUser,
        isLoading,
        addFavorite,
        removeFavorite,
    };

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
