// app/api/todo/[noteId]/favorite/routes.ts
import { db } from "../../../../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    if (!params.noteId) {
      return new NextResponse("Note ID not found", { status: 404 });
    }

    const note = await db.note.findUnique({
      where: {
        id: params.noteId,
      },
    });

    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }

    // Toggle the 'favorited' field of the note
    const updatedNote = await db.note.update({
      where: {
        id: params.noteId,
      },
      data: {
        favorited: !note.favorited, 
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("[UPDATE NOTE FAVORITE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
