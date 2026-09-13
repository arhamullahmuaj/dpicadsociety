"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function MemberVerifyForm() {
  const router = useRouter();
  const [memberId, setMemberId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function verifyMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = memberId.trim();
    if (!id) {
      setError("Enter the member ID printed on the card.");
      return;
    }

    setError("");
    setLoading(true);
    router.push(`/m/${encodeURIComponent(id)}`);
  }

  return (
    <form className="w-full" noValidate onSubmit={verifyMember}>
      <label className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500" htmlFor="member-id">
        Member ID
      </label>

      <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 focus-within:border-emerald-500/50 sm:flex-row sm:items-center">
        <input
          aria-describedby="member-id-hint"
          aria-invalid={Boolean(error)}
          autoComplete="off"
          className="w-full bg-transparent px-3 py-2.5 font-mono text-sm text-white outline-none placeholder:font-sans placeholder:text-zinc-600 sm:text-base"
          id="member-id"
          onChange={(event) => {
            setMemberId(event.target.value);
            if (error) setError("");
          }}
          placeholder="e.g. CADS-26-001"
          value={memberId}
        />
        <button
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          disabled={loading}
          type="submit"
        >
          {loading ? "Checking" : "Verify member"}
          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      <p className="mt-3 text-sm text-zinc-500" id="member-id-hint">
        {error ? <span className="text-amber-400">{error}</span> : "Or scan the QR code on the member's card."}
      </p>
    </form>
  );
}
