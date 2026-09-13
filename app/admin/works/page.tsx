"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { isMissingTable, WORK_COLUMNS, formatWorkDate, type CadWork } from "@/lib/cadWorks";
import { supabase } from "@/lib/supabase";
import { useAdminGuard } from "@/lib/useAdminGuard";

export default function AdminWorksPage() {
  const { checking } = useAdminGuard();
  const [works, setWorks] = useState<CadWork[]>([]);
  const [error, setError] = useState("");
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    if (checking) return;

    async function loadWorks() {
      const { data, error } = await supabase
        .from("cad_works")
        .select(WORK_COLUMNS)
        .order("created_at", { ascending: false });

      if (error) {
        if (isMissingTable(error)) setNeedsSetup(true);
        else setError(error.message);
      } else {
        setWorks((data ?? []) as CadWork[]);
      }

      setLoading(false);
    }

    loadWorks();
  }, [checking]);

  async function handleDelete(work: CadWork) {
    if (!window.confirm(`Remove "${work.title}" from the gallery? This cannot be undone.`)) return;

    setDeletingId(work.id);
    setError("");

    const { error } = await supabase.from("cad_works").delete().eq("id", work.id);

    if (error) {
      setError(error.message);
      setDeletingId("");
      return;
    }

    setWorks((current) => current.filter((item) => item.id !== work.id));
    setDeletingId("");
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-400">
        Checking session...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-6 border-b border-zinc-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link className="text-sm text-zinc-500 transition hover:text-white" href="/admin">
              ← Back to Dashboard
            </Link>
            <h1 className="mt-6 text-3xl font-semibold">CAD Works</h1>
            <p className="mt-2 text-sm text-zinc-400">Publish member models, drawings and renders to the public gallery.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              href="/admin/works/new"
            >
              Publish Work
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              href="/works"
            >
              View Gallery
            </Link>
          </div>
        </header>

        {needsSetup ? (
          <section className="mt-8 rounded-3xl border border-amber-900/50 bg-amber-950/10 p-8">
            <h2 className="text-lg font-semibold text-amber-300">One-time setup needed</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              The <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-emerald-400">cad_works</code>{" "}
              table has not been created yet. Open your Supabase dashboard, go to <strong>SQL Editor</strong>, paste the
              contents of{" "}
              <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-emerald-400">
                supabase/cad_works.sql
              </code>{" "}
              from this project, and run it. Then reload this page.
            </p>
          </section>
        ) : (
          <section className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold">Published works</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {loading ? "Loading works..." : `${works.length} work${works.length === 1 ? "" : "s"} in the gallery`}
                </p>
              </div>
            </div>

            {error ? (
              <p className="px-6 py-8 text-sm text-red-400">{error}</p>
            ) : loading ? (
              <p className="px-6 py-8 text-sm text-zinc-500">Loading works...</p>
            ) : works.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-zinc-400">No works have been published yet.</p>
                <Link className="mt-4 inline-block text-sm text-white underline underline-offset-4" href="/admin/works/new">
                  Publish the first work
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-zinc-800">
                {works.map((work) => (
                  <li className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center" key={work.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      className="h-16 w-24 shrink-0 rounded-lg border border-zinc-800 object-cover"
                      src={work.image_url}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-white">{work.title}</p>
                      <p className="mt-1 truncate text-sm text-zinc-500">
                        {work.member_name ?? "Unattributed"}
                        {work.category ? ` · ${work.category}` : ""}
                        {formatWorkDate(work.created_at) ? ` · ${formatWorkDate(work.created_at)}` : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <Link
                        className="text-sm text-zinc-400 transition hover:text-white"
                        href={`/works/${work.slug}`}
                        target="_blank"
                      >
                        View
                      </Link>
                      <button
                        className="text-sm text-red-400 transition hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={deletingId === work.id}
                        onClick={() => handleDelete(work)}
                        type="button"
                      >
                        {deletingId === work.id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
