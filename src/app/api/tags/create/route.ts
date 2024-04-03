// app/api/tag/create/route.ts

import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Destructure tagName from the incoming request
    const { name } = await req.json(); 

    if (!name) {
      return new NextResponse("Tag name required", { status: 400 });
    }

    // Create and save tag in the database
    const label = await db.label.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(label, { status: 201 }); // Respond with the created tag
  } catch (error) {
    console.log("[POST TAG]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
