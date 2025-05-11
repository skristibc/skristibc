import mongoose from "mongoose";
import { Booking } from "@/models/Booking";
import UserTabs from "@/components/layout/UserTabs";

export default async function BookingsPage() {
  await mongoose.connect(process.env.MONGO_URL);
  const bookings = await Booking.find().sort({ createdAt: -1 });

  return (
    <section className="mt-8 mb-12">
      <UserTabs  className="max-w-3xl mx-auto" isAdmin={true} />
      <div className="max-w-4xl mx-auto mt-10 px-4">

      {bookings.length === 0 && (
        <p className="text-gray-500">Nincs még foglalás rögzítve.</p>
      )}

<ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border rounded-xl p-4 shadow-sm bg-white">
              <p><strong>🚗 Autó:</strong> {booking.carName}</p>
              <p><strong>👤 Felhasználó:</strong> {booking.userName} ({booking.userEmail})</p>
              <p><strong>📅 Időszak:</strong> {booking.startDate} – {booking.endDate}</p>
              <p><strong>💰 Teljes ár:</strong> {booking.totalPrice} €</p>
              <p className="text-xs text-gray-500">
                Létrehozva: {new Date(booking.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
    </div>
    </section>
    
  );
}
