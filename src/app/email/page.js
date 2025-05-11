"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function EmailPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, subject, message }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success('Sikeres küldés!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      toast.error('Hiba: ' + data.error);
    }
  } catch (error) {
    toast.error('Hiba.');
  }
  setSending(false);
};




  
  return (
    <section className="mt-24 max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Név</label>
          <input
            type="text"
            placeholder="Név"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label>Tárgy</label>
          <input
            type="text"
            placeholder="Tárgy"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label>Üzenet</label>
          <textarea
            className="shadow-md px-3 py-2 border border-slate-300 rounded-xl"
            placeholder="Ird meg a gondolataid."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button className="mt-4 bg-primary rounded-lg text-white" type="submit" disabled={sending}>
            Küldés
          </button>
        </div>
      </form>
    </section>
  );
}
