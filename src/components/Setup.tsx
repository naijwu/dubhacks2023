import Blur from "@/images/Blur";
import BlurOdd from "@/images/BlurOdd";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import BetterProgress from "./BetterProgress";
import ProgressBar from "./ProgressBar";
import styles from "./Setup.module.css";
// import styles from "./Chat.module.css";

export default function Setup({
  data,
  setData,
  onNext,
}: {
  data: any;
  setData: any;
  onNext: () => void;
}) {
  const availableLanguages = [
    "Select Language",
    "English",
    "Mandarin",
    "Korean",
    "French",
  ];
  const languageData: any = {
    English: {
      plaintext: "english",
      code: "en",
    },
    Mandarin: {
      plaintext: "mandarin chinese",
      code: "cn",
    },
    Korean: {
      plaintext: "korean",
      code: "kr",
    },
    French: {
      plaintext: "french",
      code: "fr",
    },
  };
  const difficulties = ["beginner", "intermediate", "advanced"];
  const difficultiesUI = [
    {
      title: "Beginner",
      description:
        "Starting with the fundamentals of the language, covering basic vocabulary and simple grammar.",
    },
    {
      title: "Intermediate",
      description:
        "Advancing beyond basics to build greater conversational fluency and comprehension.",
    },
    {
      title: "Advanced",
      description:
        "Achieving a high level of proficiency, with a focus on complex vocabulary and nuanced grammar for advanced communication.",
    },
  ];

  const [stage, setStage] = useState<"language" | "difficulty" | "situation">(
    "language"
  );

  function updateDataField(key: string, value: any) {
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData[key] = value;
    setData(updatedData);
  }

  const handleLanguage = (e: any) => {
    updateDataField("language", languageData[e.target.value]);
  };

  const handleDifficulty = (e: any) => {
    updateDataField("difficulty", difficulties[e]);
  };

  const handleSituation = (
    what: "user" | "assistant" | "action",
    value: string
  ) => {
    const updatedSituations = JSON.parse(JSON.stringify(data.situation));
    updatedSituations[what] = value;
    updateDataField("situation", updatedSituations);
  };

  const handlePrev = () => {
    if (stage === "difficulty") {
      setStage("language");
    } else if (stage === "situation") {
      setStage("difficulty");
    }
  };

  const handleNext = () => {
    if (stage === "language") {
      setStage("difficulty");
    } else if (stage === "difficulty") {
      setStage("situation");
    } else {
      console.log(data);
      onNext();
    }
  };

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "140px",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <BetterProgress stage={stage} />

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

      <div
        style={{
          transition: "all 0.5s cubic-bezier(.7,.23,.17,.87)",
          transform: `translateX(${
            -100 * (stage === "language" ? 0 : stage === "difficulty" ? 1 : 2)
          }%)`,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "300%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box mt="50px" w="fit-content">
                <Text
                  fontSize="40px"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  Practice language:
                </Text>
                <Select
                  mt="10px"
                  bgColor="white"
                  w="430px"
                  fontSize="20px"
                  onChange={handleLanguage}
                  defaultValue="Select language"
                >
                  {availableLanguages.map((language) => (
                    <option key={language}>{language}</option>
                  ))}
                </Select>
              </Box>
            </div>

            <div>
              <VStack color="white">
                <Text mt="25px" fontSize="37px" fontWeight="bold">
                  Select level of difficulty:
                </Text>
                <HStack mt="35px" spacing="36px" alignItems="baseline">
                  {difficultiesUI.map(({ title, description }, key) => {
                    return (
                      <Flex
                        w="260px"
                        textAlign="center"
                        flexDirection="column"
                        key={key}
                      >
                        <Text fontSize="30px" fontWeight="bold">
                          {title}
                        </Text>
                        <Text fontSize="13px">{description}</Text>
                      </Flex>
                    );
                  })}
                </HStack>
                <Slider
                  mt="20px"
                  min={0}
                  max={2}
                  step={1}
                  w="800px"
                  value={difficulties.indexOf(data.difficulty)}
                  onChange={handleDifficulty}
                >
                  <SliderTrack
                    height="18px"
                    borderRadius="10px"
                    border="3px solid white"
                    bg="linear-gradient(to right, #DD8CDC, #969FF4)"
                  >
                    <Box position="relative" right={1} />
                    <SliderFilledTrack bg="transparent" />
                  </SliderTrack>
                  <SliderThumb
                    boxSize={8}
                    border="3px solid white"
                    bg="linear-gradient(to right, #80889F, #A8ACB7)"
                  />
                </Slider>
              </VStack>
            </div>

            <div>
              <VStack mt="70px" fontSize="25px" color="white">
                <Text>
                  I am a{" "}
                  <input
                    style={{
                      margin: "0px 3px",
                      background: "transparent",
                      border: "2px solid white",
                      textAlign: "center",
                      width: "200px",
                      borderRadius: "7px",
                    }}
                    value={data?.situation?.user || ""}
                    onChange={(e) => handleSituation("user", e.target.value)}
                  />
                  ,
                </Text>
                <Text mt="30px">
                  I am talking to a{" "}
                  <input
                    style={{
                      margin: "0px 3px",
                      background: "transparent",
                      border: "2px solid white",
                      textAlign: "center",
                      width: "200px",
                      borderRadius: "7px",
                    }}
                    value={data?.situation?.assistant || ""}
                    onChange={(e) =>
                      handleSituation("assistant", e.target.value)
                    }
                  />{" "}
                  and trying to{" "}
                  <input
                    style={{
                      margin: "0px 3px",
                      background: "transparent",
                      border: "2px solid white",
                      textAlign: "center",
                      width: "200px",
                      borderRadius: "7px",
                    }}
                    value={data?.situation?.action || ""}
                    onChange={(e) => handleSituation("action", e.target.value)}
                  />
                </Text>
              </VStack>
            </div>
          </div>
        </div>
      </div>

      <HStack bottom="135px" position="absolute" justifyContent="center">
        {stage !== "language" && (
          <Button
            bgColor="transparent"
            border="2px solid white"
            color="white"
            w="200px"
            onClick={handlePrev}
            fontSize="18px"
          >
            Previous
          </Button>
        )}
        {stage !== "language" && <Box w="11px"></Box>}
        <Button
          isDisabled={data.language === undefined}
          w="200px"
          bgGradient="linear(to-b, #C2F9C9, #7BC6C1)"
          onClick={handleNext}
          fontSize="18px"
        >
          {stage === "situation" ? "Start Conversation" : "Continue"}
        </Button>
      </HStack>
    </div>
  );
}
