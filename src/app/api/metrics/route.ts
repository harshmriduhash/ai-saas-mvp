import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Integrate with Notion or DB for real metrics
  return NextResponse.json({ users: 12, signups: 4, calls: 2 });
} 