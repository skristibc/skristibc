import { useState, useEffect } from "react";
import Close from "./icons/Close";
import { toast } from "react-hot-toast";

export default function Modal({ isOpen, onClose, menuItem }) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(days > 0 ? days * menuItem.basePrice : 0);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, menuItem.basePrice]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      toast.error("Kérlek, válassz kezdő és záró dátumot.");
      return;
    }

    const bookingData = {
      carId: menuItem._id,
      carName: menuItem.name,
      startDate,
      endDate,
      pricePerDay: menuItem.basePrice,
      totalPrice,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.status === 409) {
        toast.error(data.message); 
      } else if (res.ok) {
        toast.success("Foglalás sikeresen mentve!");
        onClose();
      } else {
        toast.error("Hiba: " + data.message);
      }
    } catch (err) {
      toast.error("Szerverhiba: " + err.message);
    }
  };

  if (!isOpen || !menuItem) return null;

  return (
    <>
      <div 
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose}
      >
        <div 
          className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-[95%] max-w-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-200 transition"
          >
            <Close className="w-6 h-6 text-gray-600 hover:text-red-500" />
          </button>
          <img 
            src={menuItem.image} 
            alt={menuItem.name} 
            className="w-full h-40 object-cover rounded-lg mb-3"
            onClick={() => setIsImageOpen(true)}
          />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{menuItem.name}</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base break-words whitespace-normal line-clamp-4">
            {menuItem.description}
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
            <p><strong>Motor:</strong> {menuItem.motor}</p>
            <p><strong>Évjárat:</strong> {menuItem.age}</p>
            <p><strong>Üzemanyag:</strong> {menuItem.fuel}</p>
            <p><strong>Váltó:</strong> {menuItem.gearShift}</p>
            <p><strong>Ülések:</strong> {menuItem.seats}</p>
            <p><strong>Ajtók:</strong> {menuItem.doors}</p>
            <p><strong>GPS:</strong> {menuItem.gps ? "Igen" : "Nem"}</p>
            <p><strong>Ülésfűtés:</strong> {menuItem.seatHeating ? "Igen" : "Nem"}</p>
            <p><strong>Klíma:</strong> {menuItem.climate ? "Igen" : "Nem"}</p>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <label className="block font-medium text-gray-700">Kezdés dátuma</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border rounded-md p-2 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Visszahozatal dátuma</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border rounded-md p-2 text-sm"
              />
            </div>
            <p className="font-semibold text-gray-800">
              Teljes ár: {totalPrice > 0 ? `${totalPrice} Euro` : "Válassz dátumot"}
            </p>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button 
              onClick={handleBooking} 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
            >
              Foglalás
            </button>
            <button 
              onClick={onClose} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
            >
              Bezárás
            </button>
          </div>
        </div>
      </div>

      {isImageOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setIsImageOpen(false)}
        >
          <img 
            src={menuItem.image} 
            alt={menuItem.name} 
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </>
  );
}
