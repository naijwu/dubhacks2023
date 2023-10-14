"use client";

import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import styles from "./page.module.css";

export default function Home() {
  const { startRecording, stopRecording, recordingBlob } = useAudioRecorder();

  // debug function
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
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
    console.log(data, " is data");
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
      <div className={styles.floatBottom}>
        <div className={styles.toggle} onClick={handleToggle}>
          {recording ? "Stop speaking" : "Start speaking"}
        </div>
      </div>
    </div>
  );
}
