// app/api/todo/create/route.ts

import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    // detsrtucture notesTitle from the incoming request
    const { noteTitle, noteDescription, createdDate, noteCategory, noteContent } = await req.json(); 

    if (!noteTitle) {
      return new NextResponse("Title required", { status: 400 });
    }

    // Create and save todo on the database
    const note = await db.note.create({
      data: {
        name: noteTitle,
        description: noteDescription,
        category: noteCategory,
        content: noteContent,
        createdAt: createdDate
      },
    });

    return NextResponse.json(note, { status: 201 }); // Respond with the created note
  } catch (error) {
    console.log("[POST NOTE]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
