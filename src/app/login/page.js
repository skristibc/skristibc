"use client"
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
      ev.preventDefault();
      setLoginInProgress(true);
  
      await signIn('credentials', {email, password, callbackUrl: "/"});
  
      setLoginInProgress(false);
    }

    return(
        <section className="mt-8 mb-12">
        <h1 className="text-center text-primary text-4xl mb-4 mt-12">
          Bejelentkezés
        </h1>
        <div>
            <form className="block max-w-xs mx-auto mt-12" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email} disabled={loginInProgress}               
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" name="password" placeholder="jelszó" value={password} disabled={loginInProgress} 
                    onChange={ev  => setPassword(ev.target.value)} />
                <button type="submit" disabled={loginInProgress}  className="bg-primary w-full rounded-xl text-xl text-white p-2">
                    Bejelentkezés
                </button>
            </form>
          </div>
      </section>
    );
}