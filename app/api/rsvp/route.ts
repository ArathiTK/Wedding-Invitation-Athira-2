import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, attendance, guests, guestCount } = data;

    if (!name || !attendance) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    if (!sheetUrl) {
      return NextResponse.json({ message: "Server misconfigured: missing sheet URL" }, { status: 500 });
    }

    const payload = {
      name,
      guests: guests ?? guestCount,
      attendance: attendance === "decline" ? "link2-decline" : "link2-accept",
      targetTab: "ATHIRA",
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Failed to submit RSVP" }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: "RSVP received! Thank you." });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
