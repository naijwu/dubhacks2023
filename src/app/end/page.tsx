"use client";

import styles from "./../page.module.css";
import Penguin from "@/components/Penguin";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import { useEffect, useLayoutEffect } from "react";
import SpeechBubbles from "@/components/SpeechBubbles";
import Logo from "@/components/Logo";
import PenguinHome from "@/components/PenguinHome";
import Dialog from "@/components/Dialog";
import { extend } from "@react-three/fiber";
// import logoGif from './images/title.gif'
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";

export default function Home() {
  const router = useRouter();

  const { logout } = useAuth();

  return (
    <Box className="homePage">
      <Box className="homePenguin">
        <Canvas
          style={{ height: "1000px" }}
          onCreated={({ gl }) => {
            gl.domElement.style.touchAction = "auto";
            gl.domElement.style.userSelect = "auto";
          }}
        >
          <PerspectiveCamera
            makeDefault
            position={[2, 0.5, 8]}
            rotation={[0, 0, 0]}
          />
          <PenguinHome scale={0.0115} s />
        </Canvas>
      </Box>

      <Box position="absolute" top="0px" left="700px">
        <Box textAlign="center">
          <Image pt="50px" width="100%" src="./images/title.gif" alt="alt" />
          <Text className="textHome">{`You've made it`}</Text>

          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              className="homeButton newConversation"
              marginTop="50px"
              onClick={() => router.push("/")}
            >
              Start a new conversation
            </Button>
          </Box>
        </Box>
        {/* <Image width="100%" src="./images/title.gif"/>
                <Text>
                    Welcome back, Jae Wu
                </Text>

                <Button>Start a new conversation</Button>
                <Button>View chat history</Button> */}
      </Box>
    </Box>
  );
}
