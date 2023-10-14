
type language = 'en' | 'kr' | 'fr' | 'cn'

// returns corresponding esoteric configuration values for the languages; 
//      config datareferred from to https://console.cloud.google.com/speech/text-to-speech
const LANGUAGE = (language: language, gender: 'FEMALE' | 'MALE' = 'FEMALE') => {
    switch (language) {
        case 'en':
            return {
                "languageCode":"en-gb",
                "name":"en-GB-Standard-A",
                "ssmlGender": gender
            }
        case 'kr':
            return {
                "languageCode":"en-KR",
                "name":"ko-KR-Standard-A",
                "ssmlGender": gender
            }
        case "fr":
            return {
                "languageCode":"fr-FR",
                "name":"fr-FR-Standard-A",
                "ssmlGender": gender
            }
        case "cn":
            return {
                "languageCode": "cmn-CN",
                "name": "cmn-CN-Standard-A",
                "ssmlGender": gender
            }
    }
}

// bless github copilot
// turns base64 into blob of audio taking advantage of fetch
async function baseToBlob(base64: string) {
    const res = await fetch(`data:audio/mp3;base64,${base64}`);
    const blob = await res.blob();
    return blob;
}

// returns blob of audio from text using googleapis
async function generate(text: string, language: language) {
    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            "input":{
                "text": text
            },
                "voice": LANGUAGE(language),
                "audioConfig":{
                "audioEncoding":"MP3"
            }
        })
    });
    const data = await res.json();
    const blob = await baseToBlob(data.audioContent);
    return blob;
}

export { generate }