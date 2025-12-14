"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("info@beispiel.de");
  const [password, setPassword] = useState("********");
  const [error, setError] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    // Placeholder authentication hook for the prototype
    setError("Login fehlgeschlagen");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-[32px] px-8 py-10 border border-slate-200">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-3">
            <img src="/logo.png" alt="Dein Hausmeister-Service" className="h-10 w-auto" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 leading-snug">
            DEIN HAUSMEISTER-SERVICE
          </h1>
          <p className="text-sm text-slate-500 mt-1">Login für Hausverwaltung &amp; Hausmeister</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-emerald-500 focus:outline-none tracking-[0.35em]"
            />
          </div>

          {error && (
            <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl px-4 py-3 shadow-lg transition"
          >
            ANMELDEN
          </button>
        </form>
      </div>
    </main>
  );
}
