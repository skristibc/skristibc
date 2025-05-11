"use client";

import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";

export default function UserBookingsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (profileData?.email) {
      fetch("/api/booking/user")
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch(() => toast.error("Nem sikerült lekérni a foglalásokat"));
    }
  }, [profileData]);

  if (profileLoading) return "Betöltés...";

  if (!profileData) return "Hiba!";

  return (
    <section className="mt-8 mb-12">
      <div className="max-w-3xl mx-auto">
        <UserTabs isAdmin={false} />
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4">

        {bookings.length === 0 && (
          <p className="text-gray-500">Még nincs egyetlen foglalásod sem.</p>
        )}

        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              <p><strong>🚗 Autó:</strong> {booking.carName}</p>
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
