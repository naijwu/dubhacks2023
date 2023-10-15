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
import { Box, Button, Image } from "@chakra-ui/react";

export default function Landing({ onNext }: { onNext: () => void }) {
  const { currentUser, setCurrentUser, logout } = useAuth();

  // useEffect(() => {
  //   if (currentUser) {
  //     onNext();
  //   }
  // }, []);

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
    <Box className={styles.container}>
        <div className={styles.landingText}>
            <div className={styles.hero}>
            <Canvas
            className={styles.animation}
            onCreated={({ gl }) => {
                gl.domElement.style.touchAction = "auto";
                gl.domElement.style.userSelect = "auto";
            }}
            >
            <PerspectiveCamera
                makeDefault
                position={[0, 0, 8]}
                rotation={[0, 0, 0]}
            />
            <SpeechBubbles scale={0.035} />
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
            <Button
            bgGradient="linear(to-b, #C2F9C9, #7BC6C1)"
            onClick={onNext}
            className={styles.siwg}
            zIndex="2"
            >
            Start a new conversation
            </Button>
        )}
        </div>

        <Box maxW="100vw" w="calc(100% - 200px)" overflow="hidden">
            <Image src="./images/mascotBBQ.gif"
            position="absolute"
            left="300px"
            top="-35px"
            scale="1.3"/>
        </Box>
    </Box>
    
  );
}
