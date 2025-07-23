import { NextRequest, NextResponse } from "next/server";
// import { VercelClient } from '@vercel/client'; // For real deployment
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { idea } = await req.json();
  if (!idea) return NextResponse.json({ error: "Missing idea" }, { status: 400 });

  // 1. Generate LP copy with OpenAI
  let headline = "";
  let subtext = "";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a SaaS landing page copywriter. Write a catchy headline and subtext for this idea." },
        { role: "user", content: idea }
      ],
      max_tokens: 120
    });
    const content = completion.choices[0]?.message?.content || "";
    [headline, subtext] = content.split("\n");
  } catch (e) {
    headline = "Your SaaS, validated by AI.";
    subtext = "Launch and grow with confidence.";
  }

  // 2. (Stub) Deploy to Vercel and return URL
  // TODO: Use Vercel API to deploy a static page with this content
  const url = "https://your-landing-page.vercel.app";

  return NextResponse.json({ url, headline, subtext });
} 