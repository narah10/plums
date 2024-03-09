import { db } from "../../../../../../lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    if (!params.eventId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deleteEvent = await db.event.delete({
      where: {
        id: params.eventId,
      },
    });

    return NextResponse.json(deleteEvent, { status: 200 });
  } catch (error) {
    console.log("[DELETE EVENT]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}