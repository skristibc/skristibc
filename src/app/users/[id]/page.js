'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserForm from "@/components/layout/UserForm";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetch('/api/profile?_id='+id).then(res => {
      res.json().then(user => {
        setUser(user);
      });
    })
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data,_id:id}),
      });
      if (res.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Profil mentése...',
      success: 'Profil mentve!',
      error: 'Hiba!',
    });
  }

  if (loading) {
    return "Betöltés...";
  }

  if (!data.admin) {
    return "Hiba!";
  }

  return (
    <section className="mt-8 mb-12">
      <UserTabs isAdmin={true} className="max-w-3xl mx-auto"/>
      <div className="mt-8 max-w-xl mx-auto">
        <UserForm user={user} onSave={handleSaveButtonClick}/>
      </div>
    </section>
  );
}
