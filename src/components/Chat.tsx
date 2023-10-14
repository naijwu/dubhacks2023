"use client";

import { generate } from "@/utils/synthesis";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import styles from "./Chat.module.css";
import OpenAI from "openai";
import { languagePayload } from "@/utils/types";

// const LANGUAGE: languagePayload = {
//   plaintext: 'korean',
//   code: 'kr'
// }

export default function Chat({
    setup,
    data,
    setData,
    onNext
}: {
    setup: any;
    data: any;
    setData: any;
    onNext: () => void;
}) {

    const { startRecording, stopRecording, recordingBlob } = useAudioRecorder();
    const [messages, setMessages] = useState<any[]>([
        {
            role: "system",
            content: `You are a helpful assistant helping people learn new languages by role playing real-world conversations. The situation facing the user is the following: ${setup.situation}. You'll be speaking in ${setup.language.plaintext} with the user. Keep in mind the user has a ${setup.difficulty} difficulty in terms of language proficiency (levels would be beginner, intermediate, advanced).`
            // `You are a helpful assistant helping people learn new languages by role playing real-world conversations. You are going to pretend to be a barista and the user is ordering a coffee from you. You'll be speaking in ${LANGUAGE.plaintext} with the user. Keep in mind the user has a intermediate difficulty in terms of language proficiency (levels would be beginner, intermediate, advanced).`,
        },
        {
            role: "user",
            content:
            `Can you start the conversation? Pretend like you are talking to the user. Speak in ${setup.language.plaintext}.`,
        },
    ]);

  // debug function
  function addAudioElement(blob: any, autoplay = false) {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    audio.autoplay = autoplay;
    document.body.appendChild(audio);
  };

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  // takes user response, sends it to openai, gets response and updates message
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

    const blob = await generate(chatCompletion.choices[0].message.content || '', setup.language.code);
    addAudioElement(blob, true);
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

  return (
    <div className={styles.container}>

      <div className={styles.history}>
        {messages?.map((message, index) => index > 1 && (
          <div key={index}>
            {`${message.role == 'user' ? '👤' : '🤖'}`} {message.content}
          </div>
        ))}
      </div>

      <div className={styles.floatBottom}>
        <div className={styles.toggle} onClick={handleToggle}>
          {recording ? "Stop speaking" : "Start speaking"}
        </div>
      </div>
    </div>
  );
}
