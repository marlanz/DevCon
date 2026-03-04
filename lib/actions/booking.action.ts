"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();
    const duplicatedEmail = await Booking.findOne({ eventId, email }).lean();
    if (duplicatedEmail) {
      return { success: false, message: "This email has been used" };
    }

    await Booking.create({ eventId, slug, email });
    return { success: true };
  } catch (error) {
    console.log("create booking failed: ", error);
    return { success: false, message: error };
  }
};
