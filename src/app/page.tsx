"use client";

import Chat from "@/components/Chat";
import Report from "@/components/Report";
import Setup from "@/components/Setup";
import { setupData } from "@/utils/types";
import { useState } from "react";

export default function Home() {

  const [currentScreen, setCurrentScreen] = useState<'setup' | 'chat' | 'report'>('setup');

  // default values
  const [setupData, setSetupData] = useState<setupData>({
    language: {
      plaintext: 'english',
      code: 'en',
    },
    difficulty: 'beginner',
    situation: 'taking an order from a barista at a coffee shop.'
  });
  const [chatData, setChatData] = useState<any>();

  const handleNext = () => {
    if (currentScreen === 'setup') {
      setCurrentScreen('chat');
    } else if (currentScreen === 'chat') {
      setCurrentScreen('report');
    }
  }

  return (currentScreen === 'report' && chatData) ? (
    // report
    <Report data={chatData} onNext={handleNext} />
  ) : (currentScreen === 'chat' && setupData) ? (
    // convo
    <Chat setup={setupData} setData={setChatData} onNext={handleNext} />
  ) : (
    // setup
    <Setup data={setupData} setData={setSetupData} onNext={handleNext} />
  )
}
