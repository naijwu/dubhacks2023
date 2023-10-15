import Logo from "./Logo";
import styles from "./Landing.module.css";
import Google from "./Google";
import { useAuth } from "@/utils/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/config";
import { useEffect } from "react";

export default function Landing({
    onNext
}: {
    onNext: () => void;
}) {

    const { currentUser, setCurrentUser, logout } = useAuth();

    useEffect(() => {
        if (currentUser) {
            onNext();
        }
    }, [])

    const loginUsingGoogle = async () => {
        
        signInWithPopup(auth, provider)
        .then(({ user }) => {
            if (user) {
                setCurrentUser(user);
                onNext();
            }
        })
        .catch((error) => {
            console.error(error, " is the error");
        });
    }

  return (
        <div className={styles.container}>
        <div className={styles.logo}>
            <div className={styles.logoContainer}>
            <Logo />
            </div>
        </div>

        {currentUser ? (
            <div>
                <button onClick={onNext}>start</button>
                <button onClick={logout}>sign out</button>
            </div>
        ) : (
            <button onClick={loginUsingGoogle} className={styles.siwg}>
                <Google />
                Continue with Google
            </button>
        )}
        </div>
  );
}
