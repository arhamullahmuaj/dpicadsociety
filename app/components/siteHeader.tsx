"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SocietyMark } from "@/app/components/societyMark";

/** Section anchors point at the home page so they work from any route. */
const navLinks = [
  { href: "/#about", label: "Society" },
  { href: "/#programs", label: "Programs" },
  { href: "/#tracks", label: "Tracks" },
  { href: "/works", label: "CAD Works" },
  { href: "/#verify", label: "Verify" },
];

function NavLink({
  href,
  label,
  className,
  onClick,
  current,
}: {
  href: string;
  label: string;
  className: string;
  onClick?: () => void;
  current: boolean;
}) {
  return (
    <Link
      aria-current={current ? "page" : undefined}
      className={className}
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isCurrent(href: string) {
    return !href.includes("#") && pathname.startsWith(href);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 sm:h-20 sm:px-8">
        <Link className="group flex items-center gap-3" href="/">
          <SocietyMark className="group-hover:border-emerald-500/50" />
          <span className="flex flex-col leading-none">
            <span className="text-[0.9rem] font-semibold tracking-tight text-white sm:text-base">
              DPI CAD Society
            </span>
            <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-zinc-500 transition-colors group-hover:text-zinc-400">
              Dhaka Polytechnic Institute
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              className={`text-sm transition-colors hover:text-white ${
                isCurrent(link.href) ? "text-white" : "text-zinc-400"
              }`}
              current={isCurrent(link.href)}
              href={link.href}
              key={link.href}
              label={link.label}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            href="/admin/login"
          >
            Admin
          </Link>
          <Link
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-emerald-500/60 hover:text-white"
            href="/#verify"
          >
            Verify ID
          </Link>
        </div>

        <button
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span className="flex w-4 flex-col gap-[5px]">
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span className={`h-px w-full bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden ${
          menuOpen ? "max-h-96 border-t" : "max-h-0"
        }`}
        id="mobile-nav"
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-6 py-4 sm:px-8">
          {navLinks.map((link) => (
            <NavLink
              className={`border-b border-zinc-900 py-3.5 text-sm transition-colors hover:text-white ${
                isCurrent(link.href) ? "text-white" : "text-zinc-300"
              }`}
              current={isCurrent(link.href)}
              href={link.href}
              key={link.href}
              label={link.label}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <Link
            className="py-3.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            href="/admin/login"
            onClick={() => setMenuOpen(false)}
          >
            Admin login
          </Link>
        </nav>
      </div>
    </header>
  );
}
