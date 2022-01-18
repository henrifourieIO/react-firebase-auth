import { updateEmail, reauthenticateWithCredential } from "firebase/auth";
import { user, auth } from "./firebase";

export const changeEmail = (newEmail) => {
  const credential = { email: user.email, password: "123456" };

  try {
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(user, newEmail)
          .then(() => {
            console.log("Email changed");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
       console.log(error);
      });
  } catch {
    console.log('error');
  }
};
