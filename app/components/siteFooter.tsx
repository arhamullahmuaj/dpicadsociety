import Link from "next/link";

import { SocietyMark } from "@/app/components/societyMark";

const footerColumns = [
  {
    title: "Society",
    links: [
      { href: "/#about", label: "About us" },
      { href: "/#programs", label: "Programs" },
      { href: "/#tracks", label: "CAD tracks" },
      { href: "/works", label: "CAD works" },
    ],
  },
  {
    title: "Members",
    links: [
      { href: "/#verify", label: "Verify an ID" },
      { href: "/qr", label: "Sample QR card" },
      { href: "/admin/login", label: "Admin portal" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <SocietyMark />
              <span className="flex flex-col">
                <span className="text-base font-semibold leading-tight tracking-tight text-white">DPI CAD Society</span>
                <span className="mt-1.5 font-mono text-[0.58rem] uppercase leading-4 tracking-[0.22em] text-zinc-500">
                  Dhaka Polytechnic Institute
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-7 text-zinc-500">
              The computer-aided design community of Dhaka Polytechnic Institute — training drafters, modellers and
              simulation engineers across every technology.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav aria-label={column.title} key={column.title}>
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-zinc-500">{column.title}</h2>
              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link className="text-sm text-zinc-400 transition-colors hover:text-white" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-zinc-500">Institute</h2>
            <address className="mt-5 space-y-1.5 text-sm not-italic leading-7 text-zinc-400">
              <p className="font-bangla text-[0.95rem] text-zinc-300">ঢাকা পলিটেকনিক ইনস্টিটিউট</p>
              <p>Dhaka Polytechnic Institute</p>
              <p className="text-zinc-500">Tejgaon Industrial Area, Dhaka 1208</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-zinc-900 pt-8 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>DPI CAD Society · Digital member verification</p>
          <p>Designed &amp; developed by Arhamullah Muaj &amp; Zawad Zarir</p>
        </div>
      </div>
    </footer>
  );
}
