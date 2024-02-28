// app/api/notes/route.ts
import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //fetch notes from the db
    const notes = await db.note.findMany();

    // respond with the notes
    return NextResponse.json(notes, { status: 200 }); 
  } catch (error) {
    console.log("[GET NOTE]", error);

// Handle errors
    return new NextResponse("Internal Server Error", { status: 500 }); 
  }
}
