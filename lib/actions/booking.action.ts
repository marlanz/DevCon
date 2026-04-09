"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  fullName,
  workEmail,
  jobTitle,
  companyName,
  avatarUrl,
}: {
  eventId: string;
  fullName: string;
  workEmail: string;
  jobTitle: string;
  companyName: string;
  avatarUrl: string;
}) => {
  try {
    await connectDB();
    // Check for duplicate booking by event and workEmail
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

    await Booking.create({
      eventId,
      fullName,
      workEmail,
      jobTitle,
      companyName,
      avatarUrl,
    });
    return { success: true };
  } catch (error) {
    console.log("create booking failed: ", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getUserBookings = async (userId: string) => {};
