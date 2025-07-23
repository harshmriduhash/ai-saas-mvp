import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { idea } = await req.json();
  if (!idea) return NextResponse.json({ error: "Missing idea" }, { status: 400 });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a startup idea validator. Analyze the idea for market size, competition, and target audience. Be concise." },
        { role: "user", content: idea }
      ],
      max_tokens: 200
    });
    const summary = completion.choices[0]?.message?.content || "No response.";
    return NextResponse.json({ summary });
  } catch (e) {
    return NextResponse.json({ error: "AI validation failed." }, { status: 500 });
  }
}
