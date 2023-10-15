"use client";

import Chat from "@/components/Chat";
import Landing from "@/components/Landing";
import Report from "@/components/Report";
import Setup from "@/components/Setup";
import { setupData } from "@/utils/types";
import { useState } from "react";

export default function Home() {

  const [currentScreen, setCurrentScreen] = useState<'landing' | 'setup' | 'chat' | 'report'>('landing');

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
    if (currentScreen === 'landing') {
      setCurrentScreen('setup');
    } else if (currentScreen === 'setup') {
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
  ) : (currentScreen === 'setup') ? (
    // setup
    <Setup data={setupData} setData={setSetupData} onNext={handleNext} />
  ) : (
    <Landing />
  )
}
