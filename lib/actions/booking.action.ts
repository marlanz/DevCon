"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";
import z from "zod";
import { uploadToCloudinary } from "../cloudinary";

const BookingSchema = z.object({
  eventId: z.string(),
  fullName: z.string().min(1),
  workEmail: z.string(),
  jobTitle: z.string().min(1, "Please fill in all fields"),
  companyName: z.string().min(1, "Please fill in all fields"),
});

export const createBooking = async (formData: FormData) => {
  try {
    await connectDB();

    const rawData = {
      eventId: formData.get("eventId") as string,
      fullName: formData.get("fullName") as string,
      workEmail: formData.get("workEmail") as string,
      jobTitle: formData.get("jobTitle") as string,
      companyName: formData.get("companyName") as string,
    };

    const parsed = BookingSchema.safeParse(rawData);

    if (!parsed.success) {
      console.log(parsed.error.flatten());

      return {
        success: false,
        message: parsed.error.message,
      };
    }

    const { eventId, fullName, workEmail, jobTitle, companyName } = parsed.data;

    const file = formData.get("avatar") as File;

    if (!file || file.size === 0) {
      return { success: false, message: "Image is required" };
    }

    const duplicatedBooking = await Booking.findOne({
      eventId,
      workEmail,
    }).lean();
    if (duplicatedBooking) {
      return {
        success: false,
        message: "This email has already been used for this event.",
      };
    }

    const avatarUrl = await uploadToCloudinary(file);

    await Booking.create({
      eventId,
      fullName,
      workEmail,
      jobTitle,
      companyName,
      avatarUrl,
    });

    return { success: true, message: "Event booked successfully" };
  } catch (error) {
    console.log("create booking failed: ", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getUserBookings = async (userId: string) => {};
