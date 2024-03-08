// app/api/todo/[noteId]/update/routes.ts

import { db } from "../../../../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    if (!params.noteId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const { name, description, category } = await req.json(); 

    const updatedNote = await db.note.update({
      where: {
        id: params.noteId,
      },
      data: {
        name: name, // Use `name` for the updated note title
        description: description,
        category: category,
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.log("[UPDATE NOTE]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
