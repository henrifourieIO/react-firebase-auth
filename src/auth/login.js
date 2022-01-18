import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}