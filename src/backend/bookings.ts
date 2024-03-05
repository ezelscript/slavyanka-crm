import { supabase } from "./client";
import { BookingsTable } from "../types";

async function getAllBookings() {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .returns<BookingsTable[]>();

  if (error) throw new Error(error.message);

  return bookings;
}

async function getBooking(bookingId: string) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .returns<BookingsTable[]>();

  if (error) throw new Error(error.message);

  return booking;
}

export { getAllBookings, getBooking };
