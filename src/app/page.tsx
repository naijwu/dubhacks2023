"use client";

import { generate } from "@/utils/synthesis";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import styles from "./page.module.css";
import OpenAI from "openai";
import Penguin from "@/components/Penguin";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Chat from "@/components/Chat";
import Landing from "@/components/Landing";
import Report from "@/components/Report";
import Setup from "@/components/Setup";
import { AuthProvider, useAuth } from "@/utils/AuthContext";
import { setupData } from "@/utils/types";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); 
  const [currentScreen, setCurrentScreen] = useState<
    "landing" | "setup" | "chat" | "report"
  >("landing");

  // default values
  const [setupData, setSetupData] = useState<setupData>({
    language: undefined,
    difficulty: "beginner",
    situation: {
      user: "customer",
      assistant: "barista",
      action: "buy a coffee",
    },
  });
  const [chatData, setChatData] = useState<any>();

  const handleNext = () => {
    if (currentScreen === "landing") {
      setCurrentScreen("setup");
    } else if (currentScreen === "setup") {
      setCurrentScreen("chat");
    } else if (currentScreen === "chat") {
      router.push('/end')
    } 
  };

  return (
    <AuthProvider>
      <ChakraProvider>
        {currentScreen === "report" && chatData ? (
          // report
          <Report data={chatData} onNext={handleNext} />
        ) : currentScreen === "chat" && setupData ? (
          // convo
          <Chat setup={setupData} setData={setChatData} onNext={handleNext} />
        ) : currentScreen === "setup" ? (
          // setup
          <Setup data={setupData} setData={setSetupData} onNext={handleNext} />
        ) : (
          <Landing onNext={handleNext} />
        )}
      </ChakraProvider>
    </AuthProvider>
  );
}
