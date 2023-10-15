import { openai } from "@/utils/openai";
import { useEffect, useState } from "react";

export default function Report({
    data,
    onNext
}: {
    data: any;
    onNext: () => void;
}) {
    // console.log(data)
    const [rating, setRating] = useState<any[] | null>(null);

    async function loadReport() {
        if (data?.length == 0) return
        if (rating) return

        let justTheText = ''
        for (let i = 0; i < data?.length; i++) {
            if (data[i].role == 'assistant') {
                justTheText += 'Assistant: ' + data[i].content + '. '
            }
            if (data[i].role == 'user') {
                justTheText += 'User: ' + data[i].content + '. '
            }
        }

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Using the transcript of a conversation attached at the end of this message, rate the performance of the user in the conversation out of 10 in four categories: word choice, fluidity, content relevance, and grammatical accuracy. Respond to this message strictly in one word of the format W,X,Y,Z, where those variables are the respective rankings of the categories. The transcript is here: ${JSON.stringify(data)}`
                }
            ],
            model: "gpt-3.5-turbo",
          });
          const ratingString = chatCompletion.choices[0].message.content || ''
      
          setRating(ratingString.split(','));
        //   console.log(ratingString)
    }
    

    useEffect(() => {
        loadReport()
    }, [])

    return (
        <div>
            word choice: {rating?.[0]}/10 <br/>
            fluidity: {rating?.[1]}/10<br/>
            content relevance: {rating?.[2]}/10<br/>
            grammar: {rating?.[3]}/10
        </div>
    )
}