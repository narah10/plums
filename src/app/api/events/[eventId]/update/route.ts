import { db } from "../../../../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    if (!params.eventId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const { title, start, allDay } = await request.json();

    const updatedEvent = await db.event.update({
      where: {
        id: params.eventId,
      },
      data: {
        title: title,
        start: start,
        allDay: allDay,
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.log("[UPDATE EVENT]", error);

    // Handle errors
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}