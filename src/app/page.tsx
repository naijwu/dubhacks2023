"use client";

import { useEffect, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import styles from './page.module.css'

export default function Home() {

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder
  } = useAudioRecorder();

  // debug function
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  const [recording, setRecording] = useState<boolean>(false);

  const handleToggle = () => {
    if (recording) {
      // currently speaking, stop and process
      stopRecording();

      setRecording(false);  
    } else {
      // not recording, start speaking
      startRecording();
      
      setRecording(true)
    }
  }

  useEffect(() => {
    if (!recordingBlob) return;

    // recordingBlob will be present at this point after 'stopRecording' has been called
    console.log(recordingBlob)
    addAudioElement(recordingBlob);
  }, [recordingBlob])

  return (
    <div className={styles.container}>

      
      <div className={styles.floatBottom}>
      
        <div className={styles.toggle} onClick={handleToggle}>
          {recording ? "Stop speaking" : "Start speaking"}
        </div>
      </div>
    </div>
  )
}
