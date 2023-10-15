import { Box, Button, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import styles from "./Setup.module.css";

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
    updateDataField("difficulty", difficulties[e.target.value]);
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
    <Box
      style={{
        textAlign: "-webkit-center",
      }}
      w="100%"
    >
      {/* <div>
        Choosing {stage} (
        {stage === "language" ? "1" : stage === "difficulty" ? "2" : "3"})
      </div> */}
      {stage === "language" && (
        <Box
        // bgColor="pink"
        >
          <ProgressBar page={1} />
          <Box mt="50px" w="fit-content">
            <Text fontSize="40px" fontWeight="bold" color="white">
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
        </Box>
      )}
      {stage === "difficulty" && (
        <div>
          <ProgressBar page={2} />
          select difficulty:
          <input
            type="range"
            min="0"
            max="2"
            value={difficulties.indexOf(data.difficulty)}
            onChange={handleDifficulty}
            step="1"
          />
        </div>
      )}
      {stage === "situation" && (
        <div>
          <ProgressBar page={3} />
          select situation:
          <div>
            They are a{" "}
            <input
              value={data?.situation?.assistant || ""}
              onChange={(e) => handleSituation("assistant", e.target.value)}
            />
            and you are a{" "}
            <input
              value={data?.situation?.user || ""}
              onChange={(e) => handleSituation("user", e.target.value)}
            />
            . You are trying to{" "}
            <input
              value={data?.situation?.action || ""}
              onChange={(e) => handleSituation("action", e.target.value)}
            />
            .
          </div>
        </div>
      )}

      <Box pt="160px" justifyContent="center" className={styles.prevNext}>
        {stage !== "language" && <div onClick={handlePrev}>previous</div>}
        <Button
          isDisabled={data.language === undefined}
          w="200px"
          bgGradient="linear(to-b, #C2F9C9, #7BC6C1)"
          onClick={handleNext}
          fontSize="20px"
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
