import Logo from "./Logo";
import styles from "./Landing.module.css";
import Google from "./Google";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Penguin from "./Penguin";
import SpeechBubbles from "./SpeechBubbles";
import { useAuth } from "@/utils/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/config";
import { useEffect } from "react";
import PenguinBBQ from "./PenguinBBQ";

export default function Landing({ onNext }: { onNext: () => void }) {
  const { currentUser, setCurrentUser, logout } = useAuth();

  useEffect(() => {
    if (currentUser) {
      onNext();
    }
  }, []);

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
  };

  return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <Canvas 
                    className={styles.animation}
                    onCreated={({ gl }) => {
                    gl.domElement.style.touchAction = 'auto';
                    gl.domElement.style.userSelect = 'auto';
                    }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} rotation={[0, 0, 0]} />
                    <SpeechBubbles scale={0.035}/>
                </Canvas>
                
                <div className={styles.logo}>
                    <div className={styles.logoContainer}>
                        <Logo />
                    </div>
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
