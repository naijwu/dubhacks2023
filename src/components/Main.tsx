"use client";

import { setupData } from "@/utils/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Chat from "./Chat";
import Landing from "./Landing";
import Report from "./Report";
import Setup from "./Setup";

export default function Main({ isMobile }: { isMobile: boolean }) {
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
      router.push("/end");
    }
  };

  return (
    <>
      {currentScreen === "report" && chatData ? (
        // report
        <Report data={chatData} onNext={handleNext} />
      ) : currentScreen === "chat" && setupData ? (
        // convo
        <Chat
          setup={setupData}
          setData={setChatData}
          onNext={handleNext}
          isMobile={isMobile}
        />
      ) : currentScreen === "setup" ? (
        // setup
        <Setup data={setupData} setData={setSetupData} onNext={handleNext} />
      ) : (
        <Landing onNext={handleNext} />
      )}
    </>
  );
}
