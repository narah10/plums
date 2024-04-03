// app/api/todo/create/route.ts

import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Destructure noteTitle and other fields from the incoming request
    const { noteTitle, noteDescription, createdDate, noteCategory, noteContent, tagId, tagName } = await req.json(); 

    if (!noteTitle) {
      return new NextResponse("Title required", { status: 400 });
    }

    // Create the note and associate it with the tag
    const note = await db.note.create({
      data: {
        name: noteTitle,
        description: noteDescription,
        category: noteCategory,
        content: noteContent,
        createdAt: createdDate,
        // Associate the note with the tag if tagId and tagName are provided
        labels: tagId && tagName ? {
          create: {
            label: {
              connectOrCreate: {
                where: { id: tagId },
                create: { name: tagName }
              }
            }
          }
        } : undefined,
      },
    });

    return NextResponse.json(note, { status: 201 }); // Respond with the created note
  } catch (error) {
    console.log("[POST NOTE]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
