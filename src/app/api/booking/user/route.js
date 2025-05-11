import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Booking } from "@/models/Booking";

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return Response.json({ message: "Nincs jogosultság." }, { status: 401 });
  }

  const userEmail = session.user.email;
  const bookings = await Booking.find({ userEmail }).sort({ createdAt: -1 });

  return Response.json(bookings);
}
