import Logo from "./Logo";
import styles from "./Landing.module.css";
import Google from "./Google";
import { provider } from "../utils/config";
import { signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Landing() {
  const [user, setUser] = useState({});

  const auth = getAuth();
  //   onAuthStateChanged(auth, (userExists) => {
  //     if (userExists) {
  //       setUser(userExists);
  //       console.log("SIGNED IN");
  //       console.log(user, " is the user");
  //     } else {
  //       setUser({});
  //       console.log(user, " is the user");
  //       console.log("not signed in");
  //     }
  //   });

  const logIn = async () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { uid, email, displayName, photoURL } = user;
        console.log(uid, email, displayName, photoURL);
        setUser(user);
      })
      .catch((error) => {
        console.error(error, " is the error");
      });
  };

  const signOut = async () => {
    auth.signOut();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
      </div>
      {user !== {} ? (
        <button onClick={signOut}>sign out</button>
      ) : (
        <button onClick={logIn} className={styles.siwg}>
          <Google />
          Continue with Google
        </button>
      )}
    </div>
  );
}
