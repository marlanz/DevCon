import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (err) {
      return NextResponse.json(
        { message: "invalid json data format" },
        { status: 400 },
      );
    }

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "Event creation failed",
      error: err instanceof Error ? err.message : "Unknown",
    });
  }
}

//health check route

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ message: "health check" });
  } catch (err) {
    console.error(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    return NextResponse.json({ message: "health check" });
  } catch (err) {
    console.error(err);
  }
}
