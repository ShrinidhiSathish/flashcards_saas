import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator, you take in text and create 10 flashcards from it.
You should focus on creating clear, concise, and accurate flashcards tailored to the user's specific learning goals.
Each flashcard should consist of a Question on one side and a corresponding Answer on the other.


return in the following JSON format 
{
    "flashcards": [
        {
            "front": str,
            "back": str,
        }   
    ]
}`

export async function POST(req) {
    
    const openapi = new OpenAI({apiKey: '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'})
    const data = await req.text()


    const completion = await openapi.chat.completions.create({
        messages: [ { role: 'system', content: systemPrompt},{ role: 'user', content: data }],
        model: 'gpt-4o',
        response_format: { type: 'json_object' },

    })


    const flashcards = JSON.parse(completion.choices[0].message.content)
    // const flashcards = JSON.parse(completion.choices[0].delta.content)

    return NextResponse.json(flashcards.flashcards)
}

