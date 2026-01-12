import { NextResponse } from "next/server";

const SECTIONS_API_URL = "https://concertsapi.onlybees.in/api/sections/availability";

export async function GET() {
  try {
    const upstream = await fetch(SECTIONS_API_URL, { cache: "no-store" });

    if (!upstream.ok) {
      return NextResponse.json({ error: "Unable to load tickets." }, { status: upstream.status });
    }

    const payload = await upstream.json();
    return NextResponse.json(payload, { status: upstream.status });
  } catch (error) {
    return NextResponse.json({ error: "Tickets service unavailable." }, { status: 502 });
  }
}
