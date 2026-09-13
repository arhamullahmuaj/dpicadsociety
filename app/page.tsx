"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [memberId, setMemberId] = useState("");

  function verifyMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = memberId.trim();
    if (id) router.push(`/m/${encodeURIComponent(id)}`);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 sm:px-10">
        <header className="flex items-center justify-between">
          <Link className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-300" href="/">
            CAD Society
          </Link>
          <Link className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white" href="/admin/login">
            Admin Login
          </Link>
        </header>

        <section className="flex flex-1 items-center py-16 sm:py-24">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-emerald-400">Digital member system</p>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Verify every CAD Society member.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
                Search a member ID to view an official digital profile, membership status, and society details.
              </p>

              <form className="mt-10 max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl shadow-black/30 sm:flex" onSubmit={verifyMember}>
                <label className="sr-only" htmlFor="member-id">Member ID</label>
                <input
                  className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-zinc-600"
                  id="member-id"
                  onChange={(event) => setMemberId(event.target.value)}
                  placeholder="Enter member ID, e.g. CADS-26-001"
                  value={memberId}
                />
                <button className="mt-2 w-full rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 sm:mt-0 sm:w-auto" type="submit">
                  Verify Member
                </button>
              </form>

              <p className="mt-4 text-sm text-zinc-600">Enter the ID printed on the member&apos;s QR card.</p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-7 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-xl text-emerald-400">✓</div>
              <p className="mt-8 text-xs uppercase tracking-[0.25em] text-zinc-500">Official verification</p>
              <h2 className="mt-3 text-2xl font-semibold">Fast, reliable, and easy to check.</h2>
              <div className="mt-8 space-y-5 border-t border-zinc-800 pt-7 text-sm text-zinc-400">
                <p><span className="mr-3 text-emerald-400">01</span>Scan the QR code or enter a member ID.</p>
                <p><span className="mr-3 text-emerald-400">02</span>Review the verified member profile.</p>
                <p><span className="mr-3 text-emerald-400">03</span>Confirm current membership status.</p>
              </div>
              <Link className="mt-9 inline-flex text-sm text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-white" href="/qr">
                Open sample QR code
              </Link>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-zinc-900 pt-6 text-xs text-zinc-600 sm:flex-row sm:justify-between">
          <p>CAD Society · Digital Member Verification</p>
          <p>Designed &amp; Developed by Arhamullah Muaj &amp; Zawad Zarir</p>
        </footer>
      </div>
    </main>
  );
}
