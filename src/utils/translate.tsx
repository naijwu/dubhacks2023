import { targetLanguage } from "./types";

// broken
async function translate(text: string, target: targetLanguage = "en") {
    const res = await fetch(`https://translate.googleapis.com/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            'q': text,
            'target': target
        })
    });
    const data = await res.json();
    return data;
}

export { translate }