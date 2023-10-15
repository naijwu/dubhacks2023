"use client";

import { generate } from "@/utils/synthesis";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import styles from "./Chat.module.css";
import { openai } from "@/utils/openai";

export default function Chat({
    setup,
    setData,
    onNext
}: {
    setup: any;
    setData: any;
    onNext: () => void;
}) {
    const [loading, setLoading] = useState<boolean>(false);

    const { startRecording, stopRecording, recordingBlob } = useAudioRecorder();
    const [messages, setMessages] = useState<any[]>([
        {
            role: "system",
            content: `You are going to help the user learn new languages by role playing real-world conversations. You are a ${setup.situation.assistant}. They are a ${setup.situation.user}. They are trying to ${setup.situation.action}. You'll be speaking in ${setup.language.plaintext} with the user. The user has ${setup.difficulty} skill of that language: adjust the complexity of your responses to be the same as their language skill. Start the conversation.`
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

  const [recommended, setRecommended] = useState<string>('');
  const [loadingHelp, setLoadingHelp] = useState<boolean>(false);

  async function fetchRecommendedResponses(lastResponse: string) {
    if (loadingHelp) return
    setLoadingHelp(true)
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
            role: "system",
            content: `A ${setup.situation.user} is trying to ${setup.situation.action} from a ${setup.situation.assistant}. They told by ${setup.situation.assistant}: "${lastResponse}". Respond to this message with a recommended response the ${setup.situation.user} could say word for word to the ${setup.situation.assistant}, in the ${setup.language.plaintext} language.`
        }
      ],
      model: "gpt-3.5-turbo",
    });
    
    setRecommended(chatCompletion.choices[0].message.content || '');
    setLoadingHelp(false)
  }

  // takes user response, sends it to openai, gets response and updates message
  const generateResponses = async (input: string) => {
    const userInput = {
      role: "user",
      content: input,
    };

    const updatedMessages = JSON.parse(JSON.stringify(messages));
    updatedMessages.push(userInput);
    setRecommended(``)

    const chatCompletion = await openai.chat.completions.create({
      messages: updatedMessages,
      model: "gpt-3.5-turbo",
    });

    updatedMessages.push(chatCompletion.choices[0].message);
    setMessages(updatedMessages);

    // last
    const blob = await generate(chatCompletion.choices[0].message.content || '', setup.language.code);
    addAudioElement(blob, true);

    setLoading(false);

    // get recommended response
    await fetchRecommendedResponses(chatCompletion.choices[0].message.content || '')
  };

  async function handleTranscription(blob: any) {
    if (loading) return
    setLoading(true)

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

    if (!data.text) {
        setLoading(false)
        return
    }
    
    await generateResponses(data.text);
  }

  const [recording, setRecording] = useState<boolean>(false);

  const handleToggle = () => {
    if (loading) return;
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
    // console.log(recordingBlob);
    addAudioElement(recordingBlob);

    const doTranscription = async () => {
      await handleTranscription(recordingBlob);
    };

    doTranscription();
  }, [recordingBlob]);

  function handleQuit() {
    messages.splice(0, 2);
    setData(messages);
    onNext();
  }

  return (
    <div className={styles.container}>
      <div className={styles.history}>
        {messages?.map((message, index) => index > 0 && (
          <div key={index}>
            {`${message.role == 'user' ? '👤' : '🤖'}`} {message.content}
          </div>
        ))}
      </div>

      <div className={styles.floatBottom}>
        {loadingHelp ? 'loading recommended' : recommended ? `Possible response: ${recommended}` : <></>}

        <div className={styles.toggle} onClick={handleToggle}>
          {!loading ? recording ? "Stop speaking" : "Start speaking" : "loading..."}
        </div>
        <div className={styles.exit} onClick={handleQuit}>
            Quit
        </div>
      </div>
    </div>
  );
}
