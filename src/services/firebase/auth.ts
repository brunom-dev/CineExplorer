import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import type { CreateUserProps } from "../../types/User/UserProps";
import { auth } from "./firebaseConfig";

export async function registerUserAuth(user: CreateUserProps) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
        );

        await sendEmailVerification(userCredential.user);

        return userCredential.user;
    } catch (error) {
        throw error;
    }
}

export async function loginUserAuth(user: CreateUserProps) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            user.email,
            user.password
        );
        return userCredential;
    } catch (error) {
        throw error;
    }
}

export async function logoutUserAuth() {
    await signOut(auth).catch((error) => {
        throw error;
    });
}

export const resendVerificationEmail = async (): Promise<void> => {
    const user = auth.currentUser; 

    if (user) {
        try {
            await sendEmailVerification(user);
        } catch (error) {
            throw error;
        }
    } else {
        throw new Error("Nenhum usuário logado para reenviar o e-mail.");
    }
};
