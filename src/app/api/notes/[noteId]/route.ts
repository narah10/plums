// app/api/notes/[noteId]/route.ts
import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { noteId: string } }) {
  try {
    const { noteId } = params;
    const note = await db.note.findUnique({
      where: { id : noteId }
    });
    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }
    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("[GET NOTE BY ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
