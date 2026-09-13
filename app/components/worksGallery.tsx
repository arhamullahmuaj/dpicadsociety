"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { WorkImage } from "@/app/components/workImage";
import type { CadWork } from "@/lib/cadWorks";

const ALL = "All work";

export function WorksGallery({ works }: { works: CadWork[] }) {
  const categories = useMemo(() => {
    const found = works.map((work) => work.category).filter((category): category is string => Boolean(category));
    return [ALL, ...Array.from(new Set(found)).sort()];
  }, [works]);

  const [active, setActive] = useState(ALL);

  const visible = active === ALL ? works : works.filter((work) => work.category === active);

  return (
    <div>
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          {categories.map((category) => {
            const isActive = category === active;
            return (
              <button
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-[0.8rem] transition-colors ${
                  isActive
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
                key={category}
                onClick={() => setActive(category)}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-600">
        Showing {visible.length} {visible.length === 1 ? "work" : "works"}
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((work, index) => (
          <li key={work.id}>
            <Link
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition-colors hover:border-emerald-500/40"
              href={`/works/${work.slug}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                <WorkImage
                  alt={work.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  priority={index < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={work.image_url}
                />
                {work.category && (
                  <span className="absolute left-3 top-3 rounded-md bg-zinc-950/85 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-emerald-400 backdrop-blur">
                    {work.category}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold leading-snug tracking-tight text-white">{work.title}</h3>
                {work.member_name && <p className="mt-2 text-sm text-zinc-500">by {work.member_name}</p>}

                {work.software && work.software.length > 0 && (
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {work.software.slice(0, 3).map((tool) => (
                      <li
                        className="rounded-md border border-zinc-800 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-zinc-500"
                        key={tool}
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="rounded-2xl border border-dashed border-zinc-800 px-6 py-12 text-center text-sm text-zinc-500">
          No works in this category yet.
        </p>
      )}
    </div>
  );
}
