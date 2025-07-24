import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";


export const registerUserDb = async (uid: string, name: string, email: string) => {
    if (!uid) return;

    try {
        await setDoc(doc(db, "users", uid), {
            name,
            email,
            createAt: new Date(),
            myFavorite: [],
        });
    } catch (error) {
        console.error("Erro ao criar documento do usuário:", error);
        throw error; 
    }
};
