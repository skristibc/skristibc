"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });

    
    await toast.promise(creationPromise, {
      loading: editedCategory ? "Szerkesztés..." : "Hozzáadás...",
      success: editedCategory ? "Szerkesztés sikeres!" : "Hozzáadva!",
      error: "Hiba!",
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Törlés...",
      success: "Törölve!",
      error: "Hiba!",
    });

    fetchCategories();
  }

  if (profileLoading) {
    return "Betöltés...";
  }

  if (!profileData.admin) {
    return "Hiba!";
  }

  return (
    <section className="mt-8 mb-12" onSubmit={handleCategorySubmit}>
      <UserTabs  className="max-w-3xl mx-auto" isAdmin={true} />
      <form className="mt-8 max-w-2xl mx-auto">
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Kategória szerkesztése" : "Új kategória"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="flex pb-2 gap-2">
            <button className="bg-primary rounded-lg text-md p-2 text-white" type="submit">
              {editedCategory ? "Szerkesztés" : "Hozzáadás"}
            </button>
            <button className="bg-primary rounded-lg p-2 text-md text-white"
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Vissza
            </button>
          </div>
        </div>
      </form>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-gray-500 text-sm mt-8">Kategóriák:</h2>
        {categories.length > 0 &&
          categories.map((c) => (
            <div 
              key={c._id}
              className="bg-gray-200 p-2 px-4 flex gap-2 rounded-md mb-1 items-center">
              <div className="grow">{c.name}</div>
              <div className="flex gap-4 p-0">
                <button className="bg-primary rounded-lg text-md p-1 text-white"
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Szerkesztés
                </button>
                <DeleteButton label="Törlés" onDelete={() => handleDeleteClick (c._id)} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
