import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/app/components/siteFooter";
import { SiteHeader } from "@/app/components/siteHeader";
import { WorksGallery } from "@/app/components/worksGallery";
import { isMissingTable, WORK_COLUMNS, type CadWork } from "@/lib/cadWorks";
import { DEMO_WORKS } from "@/lib/demoWorks";
import { supabase } from "@/lib/supabase";

// Newly published works must show up straight away, so render per request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CAD Works",
  description:
    "Models, drawings and renders made by members of the DPI CAD Society at Dhaka Polytechnic Institute.",
};

export default async function WorksPage() {
  const { data, error } = await supabase
    .from("cad_works")
    .select(WORK_COLUMNS)
    .order("created_at", { ascending: false });

  const published = (data ?? []) as CadWork[];
  const needsSetup = isMissingTable(error);
  const failed = Boolean(error) && !needsSetup;

  // Until the society publishes its own work, the gallery runs on sample entries.
  const showingDemo = published.length === 0;
  const works = showingDemo ? DEMO_WORKS : published;

  const contributors = new Set(works.map((work) => work.member_name).filter(Boolean)).size;
  const categories = new Set(works.map((work) => work.category).filter(Boolean)).size;

  const stats = [
    { value: String(works.length), label: works.length === 1 ? "Work" : "Works" },
    { value: String(contributors), label: contributors === 1 ? "Contributor" : "Contributors" },
    { value: String(categories), label: categories === 1 ? "Category" : "Categories" },
  ];

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* --------------------------------------------------- Page header */}
        <section className="relative overflow-hidden border-b border-zinc-900">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="sheet-grid fade-edges-y absolute inset-0" />
            <div className="absolute -top-56 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
            <p className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-emerald-400">
              Gallery
              <span className="h-px w-8 bg-zinc-800" />
              <span className="text-zinc-600">Member submissions</span>
            </p>

            <h1 className="mt-6 max-w-3xl text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
              CAD Works
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Models, drawings and renders produced by members of the society — part drawings from first-year drafting
              lessons through to full assemblies, building models and simulation studies.
            </p>

            {!failed && (
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800">
                {stats.map((stat) => (
                  <div className="bg-zinc-950/80 px-4 py-5 text-center sm:px-5" key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {stat.value}
                      </span>
                      <span className="mt-2 block font-mono text-[0.6rem] uppercase leading-4 tracking-[0.14em] text-zinc-500">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* -------------------------------------------------------- Gallery */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            {failed ? (
              <p className="rounded-2xl border border-red-900/60 bg-red-950/20 px-6 py-10 text-center text-sm text-red-300">
                The gallery could not be loaded: {error?.message}
              </p>
            ) : (
              <>
                {showingDemo && <DemoNotice needsSetup={needsSetup} />}
                <WorksGallery works={works} />
              </>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------ CTA */}
        <section className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 px-7 py-10 sm:px-10 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Want your model on this page?
                </h2>
                <p className="mt-3 max-w-xl text-[0.925rem] leading-7 text-zinc-400">
                  Any member can submit. Hand your drawing or render to the executive panel with the software used and a
                  short description, and it goes up here under your name.
                </p>
              </div>
              <Link
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-zinc-700 px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-emerald-500/60 hover:text-white"
                href="/#verify"
              >
                Verify a member
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function DemoNotice({ needsSetup }: { needsSetup: boolean }) {
  return (
    <div className="mb-10 rounded-2xl border border-amber-900/40 bg-amber-950/10 px-6 py-5">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-amber-500">Sample works</p>
      <p className="mt-3 text-[0.9rem] leading-7 text-zinc-400">
        These six entries are placeholders so the gallery can be seen in full. They disappear the moment the first real
        member work is published from the{" "}
        <Link className="text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white" href="/admin/works">
          admin panel
        </Link>
        {needsSetup ? (
          <>
            {" "}
            — which needs the{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.78rem] text-emerald-400">cad_works</code>{" "}
            table created first by running{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.78rem] text-emerald-400">
              supabase/cad_works.sql
            </code>{" "}
            in the Supabase SQL editor.
          </>
        ) : (
          "."
        )}
      </p>
    </div>
  );
}
