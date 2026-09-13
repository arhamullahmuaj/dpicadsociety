import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/app/components/siteFooter";
import { SiteHeader } from "@/app/components/siteHeader";
import { WorkImage } from "@/app/components/workImage";
import { formatWorkDate, WORK_COLUMNS, type CadWork } from "@/lib/cadWorks";
import { DEMO_WORKS } from "@/lib/demoWorks";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getWork(slug: string) {
  const { data } = await supabase.from("cad_works").select(WORK_COLUMNS).eq("slug", slug).maybeSingle();
  const work = (data as CadWork | null) ?? null;

  // Fall back to the sample entries while the gallery has no published work.
  return work ?? DEMO_WORKS.find((demo) => demo.slug === slug) ?? null;
}

export async function generateMetadata(props: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const work = await getWork(slug);

  if (!work) return { title: "Work not found" };

  return {
    title: work.title,
    description: work.description?.slice(0, 160) ?? `A CAD work by ${work.member_name ?? "a society member"}.`,
  };
}

export default async function WorkDetailPage(props: PageProps<"/works/[slug]">) {
  const { slug } = await props.params;
  const work = await getWork(slug);

  if (!work) notFound();

  const { data: moreData } = await supabase
    .from("cad_works")
    .select(WORK_COLUMNS)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(3);

  const publishedWorks = (moreData ?? []) as CadWork[];
  const moreWorks =
    publishedWorks.length > 0 ? publishedWorks : DEMO_WORKS.filter((demo) => demo.slug !== slug).slice(0, 3);
  const published = formatWorkDate(work.created_at);

  const details: Array<{ label: string; value: React.ReactNode }> = [];
  if (work.category) details.push({ label: "Category", value: work.category });
  if (work.member_name) {
    details.push({
      label: "Member",
      value: work.member_id ? (
        <Link
          className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-4 transition-colors hover:decoration-emerald-400"
          href={`/m/${encodeURIComponent(work.member_id)}`}
        >
          {work.member_name}
        </Link>
      ) : (
        work.member_name
      ),
    });
  }
  if (published) details.push({ label: "Published", value: published });

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 sm:pb-32 sm:pt-14">
          <Link
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-white"
            href="/works"
          >
            <span aria-hidden="true">&larr;</span> All CAD works
          </Link>

          <header className="mt-8 max-w-3xl">
            {work.category && (
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-emerald-400">{work.category}</p>
            )}
            <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {work.title}
            </h1>
            {work.member_name && (
              <p className="mt-5 text-base text-zinc-400">
                by <span className="text-zinc-200">{work.member_name}</span>
                {published && <span className="text-zinc-600"> · {published}</span>}
              </p>
            )}
          </header>

          <figure className="relative mt-12 aspect-[16/10] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
            <div aria-hidden="true" className="sheet-grid absolute inset-0" />
            <WorkImage
              alt={work.title}
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              src={work.image_url}
            />
          </figure>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_0.9fr] lg:gap-16">
            <div>
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-zinc-500">About this work</h2>
              <div className="mt-6 space-y-5">
                {work.description ? (
                  work.description
                    .split(/\n{2,}/)
                    .map((paragraph, index) => (
                      <p className="text-[0.95rem] leading-8 text-zinc-400" key={index}>
                        {paragraph}
                      </p>
                    ))
                ) : (
                  <p className="text-[0.95rem] leading-8 text-zinc-500">No description was provided for this work.</p>
                )}
              </div>
            </div>

            <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-7">
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-zinc-500">Details</h2>

              <dl className="mt-6 space-y-5">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-zinc-600">
                      {detail.label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-zinc-300">{detail.value}</dd>
                  </div>
                ))}
              </dl>

              {work.software && work.software.length > 0 && (
                <div className="mt-7 border-t border-zinc-800 pt-6">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-zinc-600">Software</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {work.software.map((tool) => (
                      <li
                        className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-zinc-400"
                        key={tool}
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {work.source_url && (
                <a
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-emerald-500/60 hover:text-white"
                  href={work.source_url}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Open the model file
                  <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 16 16">
                    <path
                      d="M6 3h7v7M13 3 3.5 12.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
              )}
            </aside>
          </div>

          {moreWorks.length > 0 && (
            <section className="mt-24 border-t border-zinc-900 pt-14">
              <h2 className="text-2xl font-semibold tracking-tight text-white">More from the society</h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {moreWorks.map((other) => (
                  <li key={other.id}>
                    <Link
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition-colors hover:border-emerald-500/40"
                      href={`/works/${other.slug}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                        <WorkImage
                          alt={other.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          src={other.image_url}
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-semibold leading-snug tracking-tight text-white">
                          {other.title}
                        </h3>
                        {other.member_name && <p className="mt-2 text-sm text-zinc-500">by {other.member_name}</p>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
