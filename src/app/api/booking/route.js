import mongoose from "mongoose";
import { Booking } from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ message: "Nem vagy bejelentkezve!" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  const data = await req.json();
  const { carId, startDate, endDate } = data;
  const conflict = await Booking.findOne({
    carId,
    $or: [
      {
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
      },
    ],
  });

  if (conflict) {
    return new Response(
      JSON.stringify({ message: "Ez az autó már foglalt a kiválasztott időszakban." }),
      { status: 409 }
    );
  }

  const bookingDoc = await Booking.create({
    ...data,
    userName: session.user.name || "Névtelen felhasználó",
    userEmail: session.user.email,
  });

  return new Response(JSON.stringify(bookingDoc), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
