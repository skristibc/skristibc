"use client";
import { useState } from "react";

export default function FAQ({ handleBackToMain }) {
  const [faqResponse, setFaqResponse] = useState("");

  return (
    <div className="space-y-3">
      <p className="bg-gray-100 p-2 rounded-md">Itt találhatók a gyakran ismételt kérdések:</p>
      <button
        onClick={() => setFaqResponse("Az árak napi 20 és 50 euró között változnak az autó típusától függően.")}
        className="w-full bg-yellow-100 text-yellow-800 p-2 rounded-md hover:bg-yellow-200 transition"
      >
        💰 Árakkal kapcsolatos kérdések
      </button>
      <button
        onClick={() => setFaqResponse("Bérléshez érvényes jogosítvány és személyi igazolvány szükséges.")}
        className="w-full bg-yellow-100 text-yellow-800 p-2 rounded-md hover:bg-yellow-200 transition"
      >
        📄 Bérlési feltételek
      </button>
      <button
        onClick={() => setFaqResponse("Minden bérléshez alapbiztosítást biztosítunk, de kiegészítő opciók is elérhetők.")}
        className="w-full bg-yellow-100 text-yellow-800 p-2 rounded-md hover:bg-yellow-200 transition"
      >
        🛡️ Biztosítási információk
      </button>
      {faqResponse && (
        <p className="bg-gray-200 p-2 rounded-md mt-2">{faqResponse}</p>
      )}
      <button
        onClick={handleBackToMain}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        🏠 Főmenü
      </button>
    </div>
  );
}
