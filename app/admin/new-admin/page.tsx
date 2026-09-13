"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAdminGuard } from "@/lib/useAdminGuard";

export default function NewAdminPage() {
  const router = useRouter();
  const { checking } = useAdminGuard();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      setError("Your session has expired. Please sign in again.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/admin/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: email.trim(), password }),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Could not create the admin account.");
      setLoading(false);
      return;
    }

    setMessage(`Admin account created for ${result.email}.`);
    setEmail("");
    setPassword("");
    setLoading(false);
  }

  if (checking) {
    return <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-400">Checking session...</main>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-lg">
        <button
          onClick={() => router.push("/admin")}
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-zinc-500">CAD Society</p>
        <h1 className="mt-3 text-3xl font-semibold">Add New Admin</h1>
        <p className="mt-2 text-sm text-zinc-500">Create another account with full admin access.</p>

        <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm text-zinc-400">Temporary Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
            />
            <p className="mt-2 text-xs text-zinc-500">Share this with the new admin — they can change it via &quot;Forgot password?&quot; on the login page.</p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-400">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Admin..." : "Create Admin"}
          </button>
        </form>
      </div>
    </main>
  );
}
