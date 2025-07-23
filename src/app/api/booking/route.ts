import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // TODO: Integrate with Calendly API for personalized links
  const url = "https://calendly.com/your-link";
  return NextResponse.json({ url });
} 