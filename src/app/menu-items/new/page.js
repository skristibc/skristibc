'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useState } from "react";
import toast from "react-hot-toast"
import Link from "next/link";
import Left from "@/components/icons/left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage(){

    const {loading, data} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
          const response = await fetch('/api/menu-items', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok)
            resolve();
          else
            reject();
        });
        await toast.promise (savingPromise , {
            loading: 'Mentés...',
            success: 'Sikeresen elmentve',
            error: 'Hiba!',
        });
        setRedirectToItems(true);
    }

    if (redirectToItems){
        return redirect('/menu-items');
    }

    if(loading) {
        return 'Betöltés';
    }
    if(!data.admin){
        return 'Hiba!';
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
                <Link className="button"
                    href={'/menu-items'}>
                    <Left />
                    <span>Összes menü</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
        </section>
    );
}