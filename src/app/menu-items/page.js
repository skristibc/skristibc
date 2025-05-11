'use client';
import Right from "@/components/icons/right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";



export default function MenuItemsPage(){

    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        })
    }, []);


    if(loading) {
        return 'Betöltés';
    }

    if(!data.admin){
        return 'Hiba!';
    }

    return(
        <section className="mt-8 mb-12">
            <UserTabs isAdmin={true} className="max-w-3xl mx-auto" />
            <div className="max-w-2xl mx-auto">
            <div className="mt-8 border border-gray-300 rounded-xl">
                <Link className="button"
                    href={'/menu-items/new'}>
                    <span>Új menü létrehozása</span>
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="test-sm mt-8">Menü szerkesztése:</h2>
                <div className="grid grid-cols-3 gap-2">
                {menuItems?.length > 0 && menuItems.map(item => (
                    <Link
                    key={item._id}
                    href={'/menu-items/edit/'+item._id}
                    className="bg-gray-200 rounded-lg p-4"
                  >
                    <div>
                    <div className="flex justify-center">
                      <Image
                        className="rounded-md"
                        src={item.image} alt={''} width={100} height={100} />
                    </div>
                    <div className="text-center mt-3">
                      {item.name}
                    </div>
                    </div>
                  </Link>
            ))}
            </div>
            </div>
            </div>
        </section>
    )
}