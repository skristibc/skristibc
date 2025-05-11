"use client";
import { useState, useEffect } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import Modal from "@/components/Modal";
import FilterIcon from "@/components/icons/Filter";
import Chatbot from "@/components/Chatbot";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories);

    fetch('/api/menu-items')
      .then(res => res.json())
      .then(setMenuItems);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const applyFilters = (items) => {
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        return !value || item[key]?.toString() === value;
      });
    });
  };

  const getFilteredUniqueValues = (key) => {
    const filteredItems = applyFilters(menuItems);
    return [...new Set(filteredItems.map(item => item[key]).filter(Boolean))];
  };

  return (
    <section className="mt-8 px-4 md:px-12 lg:px-20">
      <div className="flex justify-end mb-4 gap-2">
        <button 
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon className="w-5 h-5" />
          Szűrők
        </button>
        {showFilters && (
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={clearFilters}
          >
            Szűrők törlése
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <select onChange={e => handleFilterChange('motor', e.target.value)} value={filters.motor || ""} className="border p-2 rounded-md">
            <option value="">Motor</option>
            {getFilteredUniqueValues('motor').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select onChange={e => handleFilterChange('age', e.target.value)} value={filters.age || ""} className="border p-2 rounded-md">
            <option value="">Évjárat</option>
            {getFilteredUniqueValues('age').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select onChange={e => handleFilterChange('fuel', e.target.value)} value={filters.fuel || ""} className="border p-2 rounded-md">
            <option value="">Üzemanyag</option>
            {getFilteredUniqueValues('fuel').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select onChange={e => handleFilterChange('gearShift', e.target.value)} value={filters.gearShift || ""} className="border p-2 rounded-md">
            <option value="">Váltó</option>
            {getFilteredUniqueValues('gearShift').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select onChange={e => handleFilterChange('seats', e.target.value)} value={filters.seats || ""} className="border p-2 rounded-md">
            <option value="">Ülések</option>
            {getFilteredUniqueValues('seats').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select onChange={e => handleFilterChange('doors', e.target.value)} value={filters.doors || ""} className="border p-2 rounded-md">
            <option value="">Ajtók</option>
            {getFilteredUniqueValues('doors').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select onChange={e => handleFilterChange('gps', e.target.value)} value={filters.gps || ""} className="border p-2 rounded-md">
            <option value="">GPS</option>
            {getFilteredUniqueValues('gps').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select onChange={e => handleFilterChange('seatHeating', e.target.value)} value={filters.seatHeating || ""} className="border p-2 rounded-md">
            <option value="">Ülésfűtés</option>
            {getFilteredUniqueValues('seatHeating').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select onChange={e => handleFilterChange('climate', e.target.value)} value={filters.climate || ""} className="border p-2 rounded-md">
            <option value="">Klíma</option>
            {getFilteredUniqueValues('climate').map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      )}

      {categories?.length > 0 && categories.map(c => {
        const filteredItems = applyFilters(menuItems.filter(item => item.category === c._id));
        if (filteredItems.length === 0) return null;

        return (
          <div key={c._id} className="mb-12">
            <div className="text-center mb-6">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <div
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-md rounded-xl overflow-hidden bg-white hover:shadow-lg"
                >
                  <MenuItem {...item} />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          menuItem={selectedItem}
        />
      )}

    </section>
  );
}
