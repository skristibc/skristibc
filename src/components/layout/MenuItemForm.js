import EditableImage from "./EditableImage";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [motor, setMotor] = useState("");
  const [age, setAge] = useState("");
  const [seats, setSeats] = useState("");
  const [doors, setDoors] = useState("");
  const [fuel, setFuel] = useState("");
  const [gearShift, setGearShift] = useState("");
  const [power, setPower] = useState("");
  const [gps, setGps] = useState("");
  const [seatHeating, setSeatHeating] = useState("");
  const [climate, setClimate] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (menuItem) {
      setImage(menuItem.image);
      setName(menuItem.name);
      setMotor(menuItem.motor);
      setAge(menuItem.age);
      setSeats(menuItem.seats);
      setDoors(menuItem.doors);
      setFuel(menuItem.fuel);
      setGearShift(menuItem.gearShift);
      setPower(menuItem.power);
      setGps(menuItem.gps);
      setSeatHeating(menuItem.seatHeating);
      setClimate(menuItem.climate);
      setDescription(menuItem.description);
      setBasePrice(menuItem.basePrice);
      setCategory(menuItem.category);
    }
  }, [menuItem]);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const requiredFields = [
      image,
      name,
      motor,
      age,
      seats,
      doors,
      fuel,
      gearShift,
      power,
      gps,
      seatHeating,
      climate,
      description,
      basePrice,
      category,
    ];

    if (requiredFields.some((field) => !field)) {
      toast.error("Kérlek tölts ki minden mezőt a mentéshez!");
      return;
    }

    onSubmit(ev, {
      image,
      name,
      motor,
      age,
      seats,
      doors,
      fuel,
      gearShift,
      power,
      gps,
      seatHeating,
      climate,
      description,
      basePrice,
      category,
    });
  };


  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="relative group">
          <EditableImage link={image} setLink={setImage} className="w-full h-48 object-cover rounded-md" />
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-md"
            onClick={() => document.getElementById('fileInput').click()}
          >
            <span className="text-white font-bold">Kép módosítása</span>
          </div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImage(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <div className="space-y-2">
          <label>Név</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <label>Motor</label>
          <input
            type="text"
            value={motor}
            onChange={(ev) => setMotor(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label>Motorteljesítmény</label>
          <input
            type="text"
            value={power}
            onChange={(ev) => setPower(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label>Üzemanyag</label>
          <select
            value={fuel}
            onChange={(ev) => setFuel(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            <option value="">Válassz üzemanyagot</option>
            <option value="Benzin">Benzin</option>
            <option value="Dízel">Dízel</option>
            <option value="Benzin + elektromos">Benzin + elektromos</option>
          </select>
        </div>
        <div>
          <label>Váltó típusa</label>
          <select
            value={gearShift}
            onChange={(ev) => setGearShift(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            <option value="">Válassz váltót</option>
            <option value="Manuális">Manuális</option>
            <option value="Automata">Automata</option>
          </select>
        </div>
        <div>
          <label>Évjárat</label>
          <select
            value={age}
            onChange={(ev) => setAge(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>GPS</label>
          <select
            value={gps}
            onChange={(ev) => setGps(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            <option value="">Válassz GPS-t</option>
            <option value="Igen">Igen</option>
            <option value="Nem">Nem</option>
          </select>
        </div>
        <div>
          <label>Ülésfűtés</label>
          <select
            value={seatHeating}
            onChange={(ev) => setSeatHeating(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            <option value="">Válassz ülésfűtést</option>
            <option value="Igen">Igen</option>
            <option value="Nem">Nem</option>
          </select>
        </div>
        <div>
          <label>Ülések száma</label>
          <select
            value={seats}
            onChange={(ev) => setSeats(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            <option value="">Válassz ülések számát</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        <div>
          <label>Ajtók száma</label>
          <select
            value={doors}
            onChange={(ev) => setDoors(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            <option value="">Válassz ajtók számát</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label>Klíma</label>
          <select
            value={climate}
            onChange={(ev) => setClimate(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            <option value="">Válassz klímát</option>
            <option value="Igen">Igen</option>
            <option value="Nem">Nem</option>
          </select>
        </div>
        <div>
          <label>Kategória</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ár/Nap</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-4">
        <label>Leírás</label>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y"
          rows="4"
        ></textarea>
      </div>

      <button type="submit" className="w-full mt-4 bg-primary text-white py-2 rounded-md shadow-md hover:bg-blue-800">
        Mentés
      </button>
    </form>
  );
}
