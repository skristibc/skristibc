"use client";
import Link from "next/link";

export default function Contact({ handleBackToMain, handleBackToContact, handleContactOptionClick, subStep }) {
  return (
    <div className="space-y-3">
      {!subStep && (
        <>
          <p className="bg-gray-100 p-2 rounded-md">📞 Kérlek, válassz az alábbi lehetőségek közül:</p>
          <button
            onClick={() => handleContactOptionClick("Telefon")}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            📞 Hívjon minket
          </button>
          <button
            onClick={() => handleContactOptionClick("Email")}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            📧 Írjon nekünk emailt
          </button>
        </>
      )}
      {subStep === "Telefon" && (
        <>
          <p className="bg-gray-100 p-2 rounded-md">
            Hívjon minket a következő számon: <strong>+421 123 456 789</strong> munkaidőben: Hétfőtől Péntekig, 8:00 - 17:00 között. 📲
          </p>
          <button
            onClick={handleBackToContact}
            className="w-full bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition"
          >
            🔙 Vissza a kapcsolatfelvételhez
          </button>
          <button
            onClick={handleBackToMain}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            🏠 Főmenü
          </button>
        </>
      )}
      {subStep === "Email" && (
        <>
          <p className="bg-gray-100 p-2 rounded-md">📧 Vedd fel velünk a kapcsolatot az alábbi linken:</p>
          <Link href="/email">
            <button className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">
              👉 Ugrás az email küldéshez
            </button>
          </Link>
          <button
            onClick={handleBackToContact}
            className="w-full bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition"
          >
            🔙 Vissza a kapcsolatfelvételhez
          </button>
          <button
            onClick={handleBackToMain}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            🏠 Főmenü
          </button>
        </>
      )}
    </div>
  );
}
