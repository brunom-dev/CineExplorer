import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlFeppynV1R1xWrVjUz3TPxq6qC--Cq9A",
    authDomain: "cine-explorer-1f924.firebaseapp.com",
    projectId: "cine-explorer-1f924",
    storageBucket: "cine-explorer-1f924.firebasestorage.app",
    messagingSenderId: "404801591629",
    appId: "1:404801591629:web:3f903b75c79180184d3f04",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}