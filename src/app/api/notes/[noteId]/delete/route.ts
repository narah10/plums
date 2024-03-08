// app/api/todo/[noteId]/delete/routes.ts
import { db } from "../../../../../../lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    if (!params.noteId) {
      return new NextResponse("Not found", { status: 404 });
    }

    // delete notes from the db
    const deletedNote = await db.note.delete({
      where: {
        id: params.noteId,
      },
    });

    // Respond with the deleted NOTE
    return NextResponse.json(deletedNote, { status: 200 });
  } catch (error) {
    console.log("[DELETE NOTE]", error);

    // Handle errors
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
