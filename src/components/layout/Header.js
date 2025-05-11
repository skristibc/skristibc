"use client"
import Link from "next/link"
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Header (){
    const session = useSession();
    console.log(session);
    const status = session.status;
    return(
        <>
            <header className="flex items-center justify-between bg-primary p-6 text-white">
            <nav className="flex items-center gap-8 font-semibold">
            <Link className="items-center font-extrabold text-2xl px-8" href="/">SK Autó</Link>
            <Link href={'/'}>Kezdőlap</Link>
            <Link href={'/menu'}>Kínálat</Link>
            <Link href={'/#about'}>Rólunk</Link>
            <Link href={'/#contact'}>Kapcsolatfelvétel</Link> 
            </nav>
            <nav className="flex items-center gap-6 pr-4 font-semibold">
                {status === 'authenticated' && (
                    <>
                        <Link href={'/profile'}>Profil</Link>
                        <button onClick={() => signOut()}>
                            Kijelentkezés
                        </button>
                    </>
                )}
                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'}>Bejelentkezés</Link>
                        <div className="border-r border-white h-6"></div>
                        <Link href={'/register'}>Regisztráció</Link> 
                    </>
                )}
            </nav>
        </header>
      </>
    )
}