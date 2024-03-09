import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //fetch events from the db
    const events = await db.event.findMany();

    // respond with the events
    return NextResponse.json(events, { status: 200 });

  } catch (error) {
    console.log("[GET EVENTS]", error);

// Handle errors
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}