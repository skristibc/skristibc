"use client";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Betöltés...";
  }

  if (!data.admin) {
    return "Hiba!";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} className="max-w-2xl mx-auto" />
      <div className="mt-8 max-w-2xl mx-auto ">
        {users?.length > 0 &&
          users.map((user) => (
            <div key={user._id} className="bg-gray-200 rounded-lg mb-2 p-2 flex items-center gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div>
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">Név</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
              <Link className="button bg-primary rounded-lg text-white" href={'/users/'+user._id}>
                Módosítás
              </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
