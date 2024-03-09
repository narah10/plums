import { db } from "./../../../../../lib/db";
import { NextResponse } from 'next/server';

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { title, start, allDay } = await request.json();

    if (!title || !start) {
      return new NextResponse("Title and start date are required", { status: 400 });
    }

    const event = await db.event.create({
      data: {
        title: title,
        start: start,
        allDay: allDay,
      },
    });

    return new NextResponse(JSON.stringify(event), { status: 201 });

  } catch (error) {
    console.error('[POST EVENT]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}