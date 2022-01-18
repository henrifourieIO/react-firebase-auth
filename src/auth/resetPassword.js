import { sendPasswordResetEmail } from "firebase/auth";
import { auth, user } from "./firebase";
import { logout } from "./logout";

export function resetPassword() {
  const email = user ? user.email : null;

  sendPasswordResetEmail(auth, email)
    .then(async () => {
      await logout(auth);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}
