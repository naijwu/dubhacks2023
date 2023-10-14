"use client";

import { generate } from "@/utils/synthesis";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import styles from "./page.module.css";
import OpenAI from "openai";

export default function Home() {
  const { startRecording, stopRecording, recordingBlob } = useAudioRecorder();
  const [messages, setMessages] = useState<any[]>([
    {
      role: "system",
      content:
        "You are a helpful assistant helping people learn new languages by role playing real-world conversations. You are going to pretend to be a barista and the user is ordering a coffee from you. You'll be speaking in english with the user. Keep in mind the user has a intermediate difficulty in terms of language proficiency (levels would be beginner, intermediate, advanced).",
    },
    {
      role: "user",
      content:
        "Can you start the conversation? Pretend like you are talking to the user.",
    },
  ]);

  // debug function
  function addAudioElement(blob: any) {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const generateResponses = async (input: string) => {
    const userInput = {
      role: "user",
      content: input,
    };

    const updatedMessages = JSON.parse(JSON.stringify(messages));
    updatedMessages.push(userInput);

    const chatCompletion = await openai.chat.completions.create({
      messages: updatedMessages,
      model: "gpt-3.5-turbo",
    });

    updatedMessages.push(chatCompletion.choices[0].message);

    setMessages(updatedMessages);

    console.log(updatedMessages);
  };

  async function handleTranscription(blob: any) {
    // audio file -> openAI whisper -> text

    const formData = new FormData();
    const file = new File([blob], "audio.webm", { type: "webm/audio" });

    formData.append("model", "whisper-1");
    formData.append("file", file);

    const response = await fetch(
      `https://api.openai.com/v1/audio/transcriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data.text, " is data");

    await generateResponses(data.text);
  }

  const [recording, setRecording] = useState<boolean>(false);

  const handleToggle = () => {
    if (recording) {
      // currently speaking, stop and process
      stopRecording();

      setRecording(false);
    } else {
      // not recording, start speaking
      startRecording();

      setRecording(true);
    }
  };

  useEffect(() => {
    if (!recordingBlob) return;

    // recordingBlob will be present at this point after 'stopRecording' has been called
    console.log(recordingBlob);
    addAudioElement(recordingBlob);

    const testFunc = async () => {
      await handleTranscription(recordingBlob);
    };

    testFunc();
  }, [recordingBlob]);

  // Debug function for synthesis
  const doSynthesis = async () => {
    const blob = await generate("안녕하세요", "kr");
    addAudioElement(blob);
    // const blob2 = await generate("hello", "en");
    // addAudioElement(blob2);
    // const blob3 = await generate("bonjour", "fr");
    // addAudioElement(blob3);
  }

  return (
    <div className={styles.container}>
      <div className={styles.floatBottom}>
        <div className={styles.toggle} onClick={handleToggle}>
          {recording ? "Stop speaking" : "Start speaking"}
        </div>
        
        <div onClick={doSynthesis}>
          test synthesis
        </div>
      </div>
    </div>
  );
}
