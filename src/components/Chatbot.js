"use client";
import { useState, useEffect, useRef } from "react";
import ChatIcon from "@/components/icons/Chat";
import Contact from "./layout/Contact";
import FAQ from "@/components/layout/Faq";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(null);
  const chatRef = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [menuItem, setMenuItem] = useState(null);
  const { data: session } = useSession();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryChosen, setCategoryChosen] = useState(false);
  const [carDetails, setCarDetails] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [step, subStep, isOpen]);


 const handleOptionClick = (option) => {
  if (option === "Kapcsolatfelvétel") {
    setStep(2);
  } else if (option === "Gyakori kérdések") {
    setStep(3);
  } else if (option === "Autó választás") {
    setStep(4);
    setCategoryChosen(false);
    setSearchResults([]);
    setSearchQuery("");
    setSelectedCategory("");
    setCarDetails(null);
    setViewMode(false);
  } else if (option === "Foglalás") {
    setStep(5);
  }
};

  const handleCategoryClick = async (category) => {
    const response = await fetch(`/api/chatbot?category=${category}`);
    if (response.ok) {
      const data = await response.json();
      setSearchResults(data);
      setSelectedCategory(category);
      setSearchQuery("");
      setCategoryChosen(true);
    } else {
      setSearchResults([]);
      setCategoryChosen(true);
    }
  };

const handleCarClick = (car) => {
  setCarDetails(car);
  setViewMode(true);
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (searchQuery.length > 0) {
    try {
      const response = await fetch(`/api/menu-items?search=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();

        if (!isNaN(searchQuery)) {
          const year = parseInt(searchQuery);
          const filteredData = data.filter((car) => parseInt(car.age) === year);
          if (filteredData.length > 0) {
            setSearchResults(filteredData);
            setViewMode(false);
            setCategoryChosen(true);
          } else {
            toast.error("Nincs találat a megadott évjárattal.");
          }
        } 
        else if (["Benzin", "Diesel", "Elektromos", "Hibrid"].includes(searchQuery)) {
          const filteredData = data.filter((car) => car.fuel.toLowerCase() === searchQuery.toLowerCase());
          if (filteredData.length > 0) {
            setSearchResults(filteredData);
            setViewMode(false);
            setCategoryChosen(true);
          } else {
            toast.error("Nincs találat a megadott üzemanyag típussal.");
          }
        }
        else if (["Automata", "Manuális"].includes(searchQuery)) {
          const filteredData = data.filter((car) => car.gearShift.toLowerCase() === searchQuery.toLowerCase());
          if (filteredData.length > 0) {
            setSearchResults(filteredData);
            setViewMode(false);
            setCategoryChosen(true);
          } else {
            toast.error("Nincs találat a megadott váltó típussal.");
          }
        } 
        else if (data.length === 1) {
          handleCarClick(data[0]);
          setViewMode(true); 
          setCategoryChosen(false); 
          setSearchResults([]); 
        } 
        else if (data.length > 1) {
          setSearchResults(data);
          setViewMode(false); 
          setCategoryChosen(true);
        } 
        else {
          toast.error("Nincs találat a megadott keresési kifejezéssel.");
          setSearchResults([]);
        }
      } else {
        toast.error("Hiba történt a keresés során.");
      }
    } catch (error) {
      toast.error("Szerverhiba történt a keresésnél.");
    }
  } else {
    toast.error("Kérlek, írj be egy keresési kifejezést!");
  }
};



  const handleContactOptionClick = (option) => {
    setSubStep(option);
  };

const handleBookings = () => {
  setTimeout(() => {
    setStep(5);
  }, 50);
};
const handleBackToCars = () => {
  setStep(4);
};

  const handleBackToContact = () => {
    setSubStep(null);
  };

  const handleBackToMain = () => {
    setStep(1);
    setSubStep(null);
    setSearchResults([]);
    setSearchQuery("");
    setSelectedCategory("");
    setCategoryChosen(false);
  };


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("/api/menu-items");
      if (response.ok) {
        const data = await response.json();

        if (data.length > 0) {
          setMenuItem(data[0]);
        } else {
          toast.error("Az adatbázis üres, nincs elérhető autó.");
        }
      } else {
        toast.error("Nem sikerült betölteni az autó adatokat.");
      }
    } catch (error) {
      toast.error("Szerverhiba történt.");
    }
  };
  fetchData();
}, []);

  useEffect(() => {
    if (menuItem && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(days > 0 ? days * menuItem.basePrice : 0);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, menuItem]);

  const handleBooking = async () => {
    if (!session) {
      toast.error("Be kell jelentkezned a foglaláshoz!");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Kérlek, válassz kezdő és záró dátumot.");
      return;
    }
    if (!menuItem) {
      toast.error("Az autó adatokat nem sikerült betölteni.");
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
        setStep(1);
      } else {
        toast.error("Hiba: " + data.message);
      }
    } catch (err) {
      toast.error("Szerverhiba: " + err.message);
    }
  };


  return (
    <div>
      <div
        className="fixed bottom-4 right-4 bg-blue-500 p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition"
        onClick={() => setIsOpen(!isOpen)}
        style={{ zIndex: 1000 }}
      >
        <ChatIcon className="w-6 h-6 text-white" />
      </div>
      {isOpen && (
        <div
          className="fixed bottom-16 right-4 w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-300 flex flex-col"
          style={{ zIndex: 1000 }}
        >
          <div className="flex justify-between items-center bg-blue-500 text-white p-3 rounded-t-lg relative">
            <h3 className="font-bold">🤖 SK Auto Chatbot</h3>
            <div className="flex items-center gap-2">
              <button onClick={handleBackToMain} className="text-white text-xl">🏠</button>
              <button onClick={() => setIsOpen(false)} className="text-white text-xl">×</button>
            </div>
          </div>

          <div ref={chatRef} className="p-4 flex-1 overflow-y-auto space-y-3">
            {step === 1 && (
              <>
                <p className="bg-gray-100 p-2 rounded-md">👋 Üdvözöllek az SK Auto Chatbotban! Miben segíthetek?</p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleOptionClick("Autó választás")}
                    className="w-full bg-blue-100 text-blue-800 p-2 rounded-md hover:bg-blue-200 transition"
                  >
                    🚗 Autó választás
                  </button>
                  <button
                    onClick={() => handleOptionClick("Kapcsolatfelvétel")}
                    className="w-full bg-blue-100 text-blue-800 p-2 rounded-md hover:bg-blue-200 transition"
                  >
                    📞 Kapcsolatfelvétel
                  </button>
                  <button
                    onClick={() => handleOptionClick("Gyakori kérdések")}
                    className="w-full bg-blue-100 text-blue-800 p-2 rounded-md hover:bg-blue-200 transition"
                  >
                    ❓ Gyakori kérdések
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <Contact
                handleBackToMain={handleBackToMain}
                handleBackToContact={handleBackToContact}
                subStep={subStep}
                setSubStep={setSubStep}
                handleContactOptionClick={handleContactOptionClick}
              />
            )}

            {step === 3 && <FAQ handleBackToMain={handleBackToMain} />}

                            {step === 5 && (
                                <div className="p-4">
                                  <h2 className="text-lg font-bold mb-4">🚗 Foglalási folyamat indítása...</h2>
                                  <p className="text-gray-500">Kérlek töltsd ki az adatokat.</p>
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
                                
                                  <div className="flex justify-end mt-4">
                                    <button
                                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                                          onClick={handleBackToCars}
                                        >
                                          🔙 Vissza
                                        </button>
                                    <button
                                    onClick={handleBooking}
                                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                    >
                                      🚗 Foglalás
                                    </button>
                                  </div>
                                </div>
                              )}


            {step === 4 && (
              <div>
                {!categoryChosen && !viewMode && (
                  <div className="space-y-2 mb-4 mt-2">
                    <p>🚗 Kérlek válassz egy kategóriát az alábbi listából, vagy írd be egy autó nevét, évjáratát, üzemanyag vagy váltó típusát a részletes keresésért! </p>
                    <button
                      onClick={() => handleCategoryClick("SUV")}
                      className="w-full bg-blue-100 text-blue-800 p-2 rounded-md hover:bg-blue-200 transition"
                    >
                      SUV
                    </button>
                    <button
                      onClick={() => handleCategoryClick("Hibrid")}
                      className="w-full bg-blue-100 text-blue-800 p-2 rounded-md hover:bg-blue-200 transition"
                    >
                      Hibrid
                    </button>
                    <button
                      onClick={() => handleCategoryClick("Kisbusz")}
                      className="w-full bg-blue-100 text-blue-800 p-2 rounded-md hover:bg-blue-200 transition"
                    >
                      Kisbusz
                    </button>
                  </div>
                )}

                {viewMode && carDetails ? (
                  <div className="bg-white p-4 rounded-lg shadow-lg mt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-2xl text-gray-800">{carDetails.name}</h4>
                      <button
                        onClick={() => {
                          setViewMode(false);
                          setCarDetails(null);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition text-sm flex items-center gap-2"
                      >
                        🔙 Vissza
                      </button>
                    </div>
                    <div className="w-full flex justify-center">
                      <img
                        src={carDetails.image}
                        alt={carDetails.name}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <p><strong>Motor:</strong> {carDetails.motor}</p>
                      <p><strong>Évjárat:</strong> {carDetails.age}</p>
                      <p><strong>Üzemanyag:</strong> {carDetails.fuel}</p>
                      <p><strong>Váltó:</strong> {carDetails.gearShift}</p>
                      <p><strong>Ülések:</strong> {carDetails.seats}</p>
                      <p><strong>Ajtók:</strong> {carDetails.doors}</p>
                      <p><strong>GPS:</strong> {carDetails.gps ? "Igen" : "Nem"}</p>
                      <p><strong>Ülésfűtés:</strong> {carDetails.heatedSeats ? "Igen" : "Nem"}</p>
                      <p><strong>Klíma:</strong> {carDetails.airConditioning ? "Igen" : "Nem"}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                      onClick={handleBookings}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  🚗 Foglalás
                </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {categoryChosen && searchResults.length > 0 ? (
                      <div className="mb-4 space-y-1">
                        <button
                            onClick={() => {
                              setCategoryChosen(false);
                              setSearchResults([]);
                              setSelectedCategory("");
                              setViewMode(false);
                            }}
                            className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition text-sm"
                          >
                            🔙 Vissza
                          </button>
                        <p className="bg-gray-100 p-2 rounded-md">
                          A(z) <strong>{selectedCategory}</strong> kategóriában a következő autók találhatóak:
                        </p>
                        {searchResults.map((car, index) => (
                          <div
                            key={index}
                            onClick={() => handleCarClick(car)}
                            className="bg-white p-4 rounded-md shadow hover:bg-gray-200 transition cursor-pointer"
                          >
                            <h4 className="font-semibold text-lg">{car.name}</h4>
                            <p className="text-sm text-gray-500">{car.age} - {car.fuel}</p>
                          </div>
                        ))}
                      </div>
                    ) : categoryChosen && (
                      <p className="text-gray-500 mt-3">❌ Nincs találat.</p>
                    )}
                  </>
                  
)}
                <form onSubmit={handleFormSubmit} className="mt-auto">
                  <input
                    type="text"
                    placeholder="🔍 Keresés..."
                    className="w-full p-2 border rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
