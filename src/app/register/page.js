"use client";
import Link from "next/link";
import { useState } from "react";

    export default function RegisterPage() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [creatingUser, setCreatingUser] = useState(false);
      const [userCreated, setUserCreated] = useState(false);
      const [error, setError] = useState(false);
      async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({email, password}),
          headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
          setUserCreated(true);
        }
        else {
          setError(true);
        }
        setCreatingUser(false);
      }

    return (
      <section className="mt-8 mb-12">
        <h1 className="text-center text-primary text-4xl mb-4 mt-12">
          Regisztráció
        </h1>
        {userCreated && (
        <div className="my-4 text-center">
          A regisztráció sikeres.<br />
          Most már {' '}  
          <Link className="underline" href={'/login'}>bejelentkezhetsz. &raquo;</Link>
        </div>
      )}
      {error && (
          <div className="my-4 text-center">
            Hiba!<br />
            Kérlek próbáld újra.
          </div>
        )}
            <form className="block max-w-xs mx-auto mt-12" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} 
                    disabled = {creatingUser}
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="jelszó" value={password}
                    disabled = {creatingUser} 
                    onChange={ev  => setPassword(ev.target.value)} />
                <button type="submit" disabled = {creatingUser} className="bg-primary w-full rounded-xl text-xl text-white p-2">
                    Regisztrálás
                </button>
            </form>
          <div className="text-center my-4 text-gray-500 border-t pt-4">
                Már van fiókod ?{' '}
            <Link className="underline" href={'/login'}>Jelentkezz be itt!</Link>
          </div>
      </section>
    );
  }