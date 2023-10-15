"use client";

import Chat from "@/components/Chat";
import Landing from "@/components/Landing";
import Report from "@/components/Report";
import Setup from "@/components/Setup";
import { AuthProvider, useAuth } from "@/utils/AuthContext";
import { setupData } from "@/utils/types";
import { useState } from "react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    "landing" | "setup" | "chat" | "report"
  >("landing");

  // default values
  const [setupData, setSetupData] = useState<setupData>({
    language: {
      plaintext: "english",
      code: "en",
    },
    difficulty: "beginner",
    situation: {
      user: "",
      assistant: "",
      action: "",
    },
  });
  const [chatData, setChatData] = useState<any>();

  const handleNext = () => {
    if (currentScreen === "landing") {
      setCurrentScreen("setup");
    } else if (currentScreen === "setup") {
      setCurrentScreen("chat");
    } else if (currentScreen === "chat") {
      setCurrentScreen("report");
    }
  };

  return (
    <AuthProvider>
      <ChakraProvider>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          {currentScreen === "report" && chatData ? (
            // report
            <Report data={chatData} onNext={handleNext} />
          ) : currentScreen === "chat" && setupData ? (
            // convo
            <Chat setup={setupData} setData={setChatData} onNext={handleNext} />
          ) : currentScreen === "setup" ? (
            // setup
            <Setup
              data={setupData}
              setData={setSetupData}
              onNext={handleNext}
            />
          ) : (
            <Landing onNext={handleNext} />
          )}
        </Flex>
      </ChakraProvider>
    </AuthProvider>
  );
}
