"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(false);
      if (!session) setError("This reset link is invalid or has expired. Request a new link from the login page.");
    });

    supabase.auth.getSession().then(({ data }) => {
      setLoading(false);
      if (!data.session) setError("Open this page from the password reset link sent to your email.");
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 6) {
      setError("Use a password with at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setSaving(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.replace("/admin/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">CAD Society</p>
        <h1 className="mt-4 text-3xl font-semibold">Reset Password</h1>
        <p className="mt-3 text-sm text-zinc-400">Choose a new password for your admin account.</p>

        {loading ? <p className="mt-8 text-sm text-zinc-500">Checking reset link...</p> : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm text-zinc-400">New Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400" /></label>
            <label className="block text-sm text-zinc-400">Confirm Password<input required type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400" /></label>
            {error && <p className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">{error}</p>}
            <button disabled={saving || Boolean(error)} className="w-full rounded-xl bg-white px-4 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50">{saving ? "Saving..." : "Save New Password"}</button>
          </form>
        )}
        <Link className="mt-6 inline-block text-sm text-zinc-500 transition hover:text-white" href="/admin/login">Back to login</Link>
      </div>
    </main>
  );
}
