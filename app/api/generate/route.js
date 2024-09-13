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
    
    const openapi = new OpenAI()
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

