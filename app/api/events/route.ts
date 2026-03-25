import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { v2 } from "cloudinary";
// import { error } from "console";
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

    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          },
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      joiningFee: Number(event.joiningFee),
      endTime: event.endTime,
      tags,
      agenda,
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: event,
        createdEvent: createdEvent.toObject(),
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

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Event fetched successfully", events },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Event fetching failed", error: err },
      { status: 500 },
    );
  }
}
