"use client";

import { generate } from "@/utils/synthesis";
import { useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import styles from "./Chat.module.css";
import { openai } from "@/utils/openai";
import WhiteMic from "./WhiteMic";
import Image from "next/image";
import BlurOdd from "@/images/BlurOdd";
import Blur from "@/images/Blur";
import { translate } from "@/utils/translate";
import Replay from "@/images/Replay";

export default function Chat({
  setup,
  setData,
  onNext,
}: {
  setup: any;
  setData: any;
  onNext: () => void;
}) {

  const locale = {
    plaintext: 'English',
    code: 'en'
  }

  const sysPrompt = () => {
    const translateDirective = setup.language.code !== locale.code
    return `You are going to help the user learn new languages by role playing real-world conversations. You are a ${setup.situation.assistant}. They are a ${setup.situation.user}. They are trying to ${setup.situation.action}. You'll be speaking in ${setup.language.plaintext} with the user. The user has ${setup.difficulty} skill of that language: adjust the complexity of your responses to be the same as their language skill. ${translateDirective ? `Your response should be in two parts, separated by a | character. The first part is your response in ${setup.language.plaintext}. The second part that response in ${locale.plaintext}. Make sure your response strictly follows this.` : ''}`
  }

  const [loading, setLoading] = useState<boolean>(false);

  const { startRecording, stopRecording, recordingBlob } = useAudioRecorder();
  const [messages, setMessages] = useState<any[]>([
    {
      role: "system",
      content: sysPrompt(),
    },
  ]);
  const [audioUrls, setAudioUrls] = useState<string[]>(['']);
  const [botAudioUrls, setBotAudioUrls] = useState<string[]>(['']);
  const [translations, setTranslations] = useState<string[]>(['']);

  function addAudioElement(blob: any, autoplay = false) {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    audio.autoplay = autoplay;
    audio.className = 'oneTime'
    document.body.appendChild(audio);
  }

  const [recommended, setRecommended] = useState<string>("");
  const [loadingHelp, setLoadingHelp] = useState<boolean>(false);

  // takes user's audio file, send to openai whisper, and receive transcription
  async function handleTranscription(blob: any) {
    if (loading) return;
    setLoading(true);

    setAudioUrls([...audioUrls, URL.createObjectURL(blob), '']);

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
      setLoading(false);
      return;
    }

    const userInput = {
      role: "user",
      content: data.text,
    };

    const updatedMessages = JSON.parse(JSON.stringify(messages));
    updatedMessages.push(userInput);
    setMessages(updatedMessages);

    await generateResponses(updatedMessages);
  }

  // takes user response, sends it to openai, gets response and updates message
  async function generateResponses(updatedMessages: any[]) {
    setRecommended(``);

    const chatCompletion = await openai.chat.completions.create({
      messages: updatedMessages,
      model: "gpt-3.5-turbo",
    });

    const responseText = chatCompletion.choices[0].message.content?.split('|') || [chatCompletion.choices[0].message.content, ''];
    const mainResponse = responseText[0] || '';
    const localeResponse = responseText[1] || '';

    const completionMessageObj = {
      ...chatCompletion.choices[0].message,
      content: mainResponse
    }

    updatedMessages.push(completionMessageObj);
    setMessages(updatedMessages);

    // audio of response
    const blob = await generate(
      mainResponse,
      setup.language.code
    );

    setBotAudioUrls([...botAudioUrls, URL.createObjectURL(blob), '']);
    addAudioElement(blob, true);

    setLoading(false);
    scrollToBottomChat();

    // get translation of response
    // const translation = await translate(responseText || "");
    // setTranslations([...translations, translation.data.translations[0].translatedText])
    setTranslations([...translations, localeResponse, ''])

    // get recommended response
    await fetchRecommendedResponses(
      mainResponse || ""
    );
  };

  // takes last response (gpt's response), and create a possible response
  async function fetchRecommendedResponses(lastResponse: string) {
    if (loadingHelp) return;
    setLoadingHelp(true);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `A ${setup.situation.user} is trying to ${setup.situation.action} from a ${setup.situation.assistant}. They told by ${setup.situation.assistant}: "${lastResponse}". Respond to this message with a recommended response the ${setup.situation.user} could say word for word to the ${setup.situation.assistant}, in the ${setup.language.plaintext} language, and in two sentences max and no translation provided.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    setRecommended(chatCompletion.choices[0].message.content || "");
    setLoadingHelp(false);
  }

  // manage user's audio recording state
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

  const chatBottomRef = useRef<HTMLDivElement>(null);

  function scrollToBottomChat() {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  // manage user's audio recording blobs
  useEffect(() => {
    if (!recordingBlob) return;

    // recordingBlob will be present at this point after 'stopRecording' has been called

    const doTranscription = async () => {
      await handleTranscription(recordingBlob);
    };

    doTranscription();
  }, [recordingBlob]);

  // sets chat data on parent prop and moves to next page
  function handleQuit() {
    messages.splice(0, 2);
    setData(messages);
    onNext();
  }

  return (
    <div className={styles.container}>
      <div className={styles.blursContainer}>
        <div className={styles.blursInner}>
          <div className={styles.blurOne}>
            <Blur />
          </div>
          <div className={styles.blurTwo}>
            <BlurOdd />
          </div>
        </div>
      </div>

      <div className={styles.history}>
        <div className={styles.historyInner}>
        {messages?.length > 1 ? (
          messages?.map(
            (message, index) =>
              index > 0 && (
                <div
                  className={`${styles.text} ${
                    messages.length - 2 <= index ? styles.current : ""
                  } ${message.role == "user" ? styles.right : styles.left}`}
                  key={index}
                >
                  <div className={styles.textInner}>
                    <div className={styles.textMain}>
                      {message.content}
                    </div>
                      <div className={styles.audioPlayer}>
                      {message.role == "user" ? (
                          <audio id={`${index}`} src={audioUrls[index]}></audio>
                      ) : (
                        <audio id={`${index}`} src={botAudioUrls[index - 1]}></audio>
                      )}
                        <button className={styles.replayIcon} onClick={()=>{
                          const audio = document.getElementById(`${index}`) as HTMLAudioElement
                          audio?.play()
                        }}>
                          <Replay />
                        </button>
                    </div>
                    </div>
                    {message.role != "user" && translations[index - 1] && translations[index - 1] !== '' && (
                      <div className={styles.textTranslation}>
                        {translations[index - 1]}
                      </div>
                    )}
                </div>
              )
          )
        ) : (
          <div className={styles.conversationStart}>
            Start the conversation!
          </div>
        )}
        <div className={styles.bottomHistoryPad}></div>
        <div ref={chatBottomRef}></div>
        </div>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingDude}>
            <Image
              objectFit="cover"
              fill={true}
              alt="Loading"
              src="/images/mascotLoading.gif"
            />
          </div>
        </div>
      )}

      <div className={styles.floatBottom}>
        <div className={styles.anchor}>
          <div className={styles.toggle} onClick={handleToggle}>
            {!loading ? (
              recording ? (
                <div className={styles.recordingButton}>
                  <WhiteMic />
                </div>
              ) : (
                <div className={styles.recordButton}>
                  <WhiteMic />
                </div>
              )
            ) : (
              <div className={styles.loadingButton}>
                <Image
                  objectFit="cover"
                  fill={true}
                  alt="Loading"
                  src="/Avatar.png"
                />
              </div>
            )}
          </div>
          <div
            className={`${styles.helper} ${
              !loadingHelp && recommended ? styles.show : ""
            }`}
          >
            Possible response: {recommended}
          </div>
        </div>
        <div className={styles.exit} onClick={handleQuit}>
          Finish
        </div>
      </div>
    </div>
  );
}
