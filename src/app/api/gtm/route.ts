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
        { role: "system", content: "You are a SaaS GTM strategist. Suggest a concise, actionable GTM plan for this idea." },
        { role: "user", content: idea }
      ],
      max_tokens: 180
    });
    const plan = completion.choices[0]?.message?.content || "No plan generated.";
    return NextResponse.json({ plan });
  } catch (e) {
    return NextResponse.json({ error: "GTM plan failed." }, { status: 500 });
  }
} 