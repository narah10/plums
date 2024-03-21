// app/api/todo/[noteId]/favorite/routes.ts
import { db } from "../../../../../../lib/db";
import { NextResponse } from "next/server";
import Note from "../../../../../models/note"

// interface Note {
//   id: string;
//   name: string;
//   description: string | null;
//   category: string | null;
//   content: string | null;
//   createdAt: Date;
//   lastEdited: Date | null;
//   favorited: boolean; 
// }


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
    }) as Note | null;

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
      } as Note,
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("[UPDATE NOTE FAVORITE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
