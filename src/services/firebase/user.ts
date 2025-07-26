import {
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const registerUserDb = async (
    uid: string,
    name: string,
    email: string
): Promise<void> => {
    if (!uid) return;

    try {
        await setDoc(doc(db, "users", uid), {
            name,
            email,
            createAt: new Date(),
            myFavorite: [],
        });
    } catch (error) {
        throw error;
    }
};

export const getUserDocument = async (uid: string) => {
    if (!uid) return null;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};
