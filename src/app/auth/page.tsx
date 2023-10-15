"use client"

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
import { extend } from '@react-three/fiber'
// import logoGif from './images/title.gif'

export default function Home() {

    return (
        <Box className="homePage">
            <Box className="homePenguin">
                <Canvas
                style={{height: "1000px"}}
                    onCreated={({ gl }) => {
                    gl.domElement.style.touchAction = 'auto';
                    gl.domElement.style.userSelect = 'auto';
                    }}>
                <PerspectiveCamera makeDefault position={[2, 0.5, 8]} rotation={[0, 0, 0]} />
                    <PenguinHome scale={0.013}s/>
                </Canvas>
            </Box>
            
            <Box position="absolute"
                top="0px" left="700px">
                <Box textAlign="center">
                    <Image width="100%" src="./images/title.gif"/>
                    <Text className="textHome">
                        Welcome back, Jae Wu
                    </Text>

                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Button className="homeButton newConversation" marginTop="50px">
                            Start a new conversation
                        </Button>
                        <Button className="homeButton viewHistory" marginTop="15px">
                            View chat history
                        </Button>
                        <Text className="logOut" marginTop="15px">
                            Log Out
                        </Text>
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
    )
}