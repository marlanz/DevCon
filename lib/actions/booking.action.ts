"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  fullName,
  email,
  jobTitle,
  companyName,
  avatarUrl,
}: {
  eventId: string;
  slug: string;
  fullName: string;
  email: string;
  jobTitle: string;
  companyName: string;
  avatarUrl: string;
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

export const getUserBookings = async (userId: string) => {};
