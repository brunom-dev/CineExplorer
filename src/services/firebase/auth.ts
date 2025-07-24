
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import type { CreateUserProps } from '../../types/User/UserProps'
import { auth } from "./firebaseConfig";


export async function registerUserAuth(user: CreateUserProps) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        return userCredential.user;
    }

    catch(error) {
        console.error(error)
        throw error
    }
}

export async function loginUserAuth(user: CreateUserProps)  {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)
        console.log(userCredential.user);
    }

    catch(error) {
        console.error("Erro ao fazer login")
        throw error
    }


}


export async function logoutUserAuth() {
    await signOut(auth)
    .then(() => {
        alert("Sessão encerrada!");
    })
    .catch((error) => {
        alert(`Erro ao deslogar: ${error}`)
    })
 }