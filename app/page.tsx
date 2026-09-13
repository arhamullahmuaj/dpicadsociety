import Link from "next/link";

import { BlueprintFigure } from "@/app/components/blueprintFigure";
import { MemberVerifyForm } from "@/app/components/memberVerifyForm";
import { SiteFooter } from "@/app/components/siteFooter";
import { SiteHeader } from "@/app/components/siteHeader";

/* -------------------------------------------------------------------------
 * Page content. Edit these lists to keep the home page up to date — the
 * layout reads its counts from them, so nothing else needs changing.
 * ---------------------------------------------------------------------- */

/** Replace with the society's current figures before going live. */
const stats = [
  { value: "250+", label: "Members trained" },
  { value: "40+", label: "Workshops run" },
  { value: "12", label: "Competition wins" },
];

const software = [
  "AutoCAD",
  "SolidWorks",
  "Fusion 360",
  "Autodesk Inventor",
  "Revit",
  "CATIA",
  "ANSYS",
  "SketchUp",
  "KeyShot",
  "Creo",
];

const departments = [
  "Civil",
  "Mechanical",
  "Architecture & Interior Design",
  "Electrical",
  "Electronics",
  "Computer",
  "Automobile",
  "Power",
  "Refrigeration & Air Conditioning",
  "Environmental",
];

const benefits = [
  "Lab access with licensed CAD workstations and a trained senior on hand",
  "A reviewed portfolio of drawing sets you can show to an employer",
  "A verified digital member card with its own QR code",
  "Entry to intra-institute and national design competitions",
];

const programs = [
  {
    index: "01",
    title: "Hands-on Workshops",
    body:
      "Weekly lab sessions where you draw along with an instructor — orthographic projection, sectioning, assemblies and plotting to standard sheet sizes.",
    icon: "M3 16.5 9 10l4 4 3.5-3.5M3 20h18M3 4v16",
  },
  {
    index: "02",
    title: "Design Competitions",
    body:
      "Timed drafting contests inside the institute, plus a coached squad for national CAD and innovation competitions across Bangladesh.",
    icon: "M8 3h8l-1 6a4 4 0 0 1-6 0L8 3Zm4 7v5m-4 5h8m-6 0 1-4h2l1 4",
  },
  {
    index: "03",
    title: "Real Project Work",
    body:
      "Measure, model and document actual campus and community work — from site survey to a construction-ready drawing set signed off by faculty.",
    icon: "M4 20V6l8-3 8 3v14M4 20h16M9 20v-6h6v6M8 9h1m3 0h1m3 0h1",
  },
  {
    index: "04",
    title: "Portfolio & Careers",
    body:
      "Portfolio reviews, CV clinics and mock interviews for drafting and design roles, with alumni working in industry giving the feedback.",
    icon: "M4 7h16v13H4V7Zm5 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 12h16",
  },
];

const tracks = [
  {
    step: "01",
    title: "Technical Drawing & 2D Drafting",
    body:
      "The foundation: line types, orthographic and isometric views, sectioning, dimensioning and tolerance basics, layer discipline and plotting to scale.",
    tools: ["AutoCAD", "Drawing standards"],
  },
  {
    step: "02",
    title: "3D Part & Assembly Modelling",
    body:
      "Parametric solid modelling, sketch-driven features, mates and assemblies, then extracting fully dimensioned drawings back out of the model.",
    tools: ["SolidWorks", "Fusion 360", "Inventor"],
  },
  {
    step: "03",
    title: "Simulation & Analysis",
    body:
      "Prove the design before anything is cut: static stress and deflection studies, motion, thermal loads, and reading results without fooling yourself.",
    tools: ["ANSYS", "SolidWorks Simulation"],
  },
  {
    step: "04",
    title: "Visualisation, BIM & Fabrication",
    body:
      "Photoreal rendering for presentations, BIM coordination for building work, and clean output for CNC machining and 3D printing.",
    tools: ["Revit", "KeyShot", "CAM basics"],
  },
];

const verifySteps = [
  { step: "01", text: "Scan the QR code on the member card, or type the ID below." },
  { step: "02", text: "The official profile opens with photo, department and society position." },
  { step: "03", text: "Check the status badge — only active members are endorsed by the society." },
];

export default function Home() {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-lg focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
        href="#main"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main className="flex-1" id="main">
        {/* ---------------------------------------------------------- Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="sheet-grid fade-edges-y absolute inset-0" />
            <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />
          </div>

          <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:pb-28">
            <div className="fade-up">
              <p className="inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/60 py-2 pl-3 pr-4 backdrop-blur">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-bangla text-[0.8rem] text-zinc-300">ঢাকা পলিটেকনিক ইনস্টিটিউট</span>
                <span className="hidden h-3 w-px bg-zinc-700 sm:block" />
                <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500 sm:inline">
                  CAD Society
                </span>
              </p>

              <h1 className="mt-8 max-w-2xl text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]">
                <span className="text-emerald-400">Precision</span> drawn by the next generation of engineers.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
                DPI CAD Society is the student-run design community of Dhaka Polytechnic Institute. We take members from
                their first orthographic projection to fabrication-ready 3D models — then put those skills to work on
                real projects.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
                  href="#verify"
                >
                  Verify a member
                  <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
                  </svg>
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
                  href="#programs"
                >
                  What we do
                </a>
              </div>

              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800">
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
            </div>

            <div className="fade-up lg:pl-4" style={{ animationDelay: "160ms" }}>
              <BlueprintFigure />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- Software strip */}
        <section aria-label="Software we teach" className="border-y border-zinc-900 bg-zinc-900/20">
          <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-6 sm:px-8">
            <p className="hidden shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600 lg:block">
              Tools we teach
            </p>
            <div className="fade-edges-x relative flex-1 overflow-hidden">
              <div className="marquee-track">
                {[0, 1].map((copy) => (
                  <ul
                    aria-hidden={copy === 1}
                    className="flex shrink-0 items-center gap-10 pr-10"
                    key={copy}
                  >
                    {software.map((name) => (
                      <li
                        className="whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.2em] text-zinc-500"
                        key={name}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- About */}
        <section className="scroll-mt-24 py-24 sm:py-32" id="about">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <SectionHeading
              index="01"
              kicker="The society"
              lead="A CAD drawing is a promise that something can actually be built. We teach students of every technology at Dhaka Polytechnic Institute to make that promise properly — and to stand behind it."
              title="Where engineering ideas become drawings that can be built."
            />

            <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="text-[0.95rem] leading-8 text-zinc-400">
                  We run as a student body with a faculty adviser: seniors teach juniors, project teams work to real
                  deadlines, and every member is issued a digital identity card that anyone can verify on this site. No
                  prior software experience is needed — most of our members open AutoCAD for the first time in our lab.
                </p>
                <p className="mt-6 text-[0.95rem] leading-8 text-zinc-400">
                  What holds it together is drawing standards. Sheet sizes, line weights, projection angle, title blocks
                  and tolerances are taught the way industry expects them, so work leaving this society can be read by
                  any engineer, anywhere.
                </p>

                <h3 className="mt-12 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-zinc-500">
                  Open to every technology
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {departments.map((department) => (
                    <li
                      className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-[0.8rem] text-zinc-400"
                      key={department}
                    >
                      {department}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10">
                <h3 className="text-xl font-semibold tracking-tight text-white">What membership gives you</h3>
                <ul className="mt-8 space-y-6">
                  {benefits.map((benefit) => (
                    <li className="flex gap-4" key={benefit}>
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                        <svg aria-hidden="true" className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M2.5 6.3 4.7 8.5 9.5 3.7"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </span>
                      <p className="text-[0.9rem] leading-7 text-zinc-400">{benefit}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-10 border-t border-zinc-800 pt-6 font-mono text-[0.6rem] uppercase leading-5 tracking-[0.16em] text-zinc-600">
                  {departments.length} technologies represented · One shared drawing standard
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Programs */}
        <section className="scroll-mt-24 border-t border-zinc-900 bg-zinc-900/20 py-24 sm:py-32" id="programs">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <SectionHeading
              index="02"
              kicker="Programs"
              lead="Four things we run every semester, each one feeding the next."
              title="What the society actually does."
            />

            <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map((program) => (
                <li
                  className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/60 p-7 transition-colors hover:border-emerald-500/40"
                  key={program.title}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-emerald-400 transition-colors group-hover:border-emerald-500/40">
                      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <path
                          d={program.icon}
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.4"
                        />
                      </svg>
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-[0.2em] text-zinc-700">{program.index}</span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold tracking-tight text-white">{program.title}</h3>
                  <p className="mt-3 text-[0.875rem] leading-7 text-zinc-400">{program.body}</p>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-[0.925rem] text-zinc-500">
              Want to see the output?{" "}
              <Link
                className="text-zinc-200 underline decoration-zinc-700 underline-offset-4 transition-colors hover:decoration-emerald-400 hover:text-white"
                href="/works"
              >
                Browse the CAD Works gallery
              </Link>{" "}
              — models, drawings and renders made by members.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- Tracks */}
        <section className="scroll-mt-24 py-24 sm:py-32" id="tracks">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionHeading
                  index="03"
                  kicker="CAD tracks"
                  lead="Members move through four tracks in order. Each one ends with a piece of work that goes into your portfolio, and you can stop wherever your department needs you to."
                  title="A path from your first line to a finished product."
                />
              </div>

              <ol className="relative border-l border-zinc-800 pl-8 sm:pl-10">
                {tracks.map((track) => (
                  <li className="group relative pb-12 last:pb-0" key={track.step}>
                    <span className="absolute -left-[calc(2rem+1px)] top-1.5 flex h-[9px] w-[9px] -translate-x-1/2 rounded-full border border-zinc-700 bg-zinc-950 transition-colors group-hover:border-emerald-400 group-hover:bg-emerald-400 sm:-left-[calc(2.5rem+1px)]" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-emerald-400">
                      Track {track.step}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">{track.title}</h3>
                    <p className="mt-3 max-w-xl text-[0.925rem] leading-8 text-zinc-400">{track.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {track.tools.map((tool) => (
                        <li
                          className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-zinc-500"
                          key={tool}
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- Verification */}
        <section className="scroll-mt-24 border-y border-zinc-900 bg-zinc-900/20 py-24 sm:py-32" id="verify">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
              <div>
                <SectionHeading
                  index="04"
                  kicker="Member verification"
                  lead="Every member carries a digital card with a QR code. Anyone — a vendor, a sponsor, an event host, another institute — can confirm in seconds that the person in front of them really represents the society."
                  title="Verify any DPI CAD Society member in seconds."
                />

                <ol className="mt-12 space-y-5">
                  {verifySteps.map((item) => (
                    <li className="flex gap-5" key={item.step}>
                      <span className="font-mono text-[0.7rem] tracking-[0.1em] text-emerald-400">{item.step}</span>
                      <p className="flex-1 border-b border-zinc-800/80 pb-5 text-[0.9rem] leading-7 text-zinc-400">
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.07] to-zinc-950/60 p-7 shadow-2xl shadow-black/40 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-emerald-400">
                    Official verification
                  </p>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">Check a member ID</h3>
                <p className="mt-3 text-[0.9rem] leading-7 text-zinc-400">
                  Enter the ID printed on the card to open the official profile.
                </p>

                <div className="mt-8">
                  <MemberVerifyForm />
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[0.6rem] uppercase leading-5 tracking-[0.16em] text-zinc-600">
                    Issued by the executive panel
                  </p>
                  <Link
                    className="text-sm text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:decoration-emerald-400 hover:text-white"
                    href="/qr"
                  >
                    See a sample QR card
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Join / CTA */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 px-7 py-16 text-center sm:px-14 sm:py-20">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="sheet-grid fade-edges-y absolute inset-0 opacity-70" />
                <div className="absolute bottom-[-12rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[110px]" />
              </div>

              <div className="relative">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-emerald-400">Join us</p>
                <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.7rem]">
                  Ready to draw with us?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-zinc-400">
                  Membership opens at the start of every semester. Come to the society room at Dhaka Polytechnic
                  Institute, talk to the executive panel, and bring nothing but curiosity.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 sm:w-auto"
                    href="#verify"
                  >
                    Verify a member ID
                  </a>
                  <a
                    className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-700 px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white sm:w-auto"
                    href="#tracks"
                  >
                    Browse the CAD tracks
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/** Shared section header so every section keeps the same typographic rank. */
function SectionHeading({
  index,
  kicker,
  title,
  lead,
}: {
  index: string;
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-emerald-400">
        <span className="text-zinc-600">{index}</span>
        <span className="h-px w-6 bg-zinc-800" />
        {kicker}
      </p>
      <h2 className="mt-6 text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      <p className="mt-6 text-base leading-8 text-zinc-400">{lead}</p>
    </div>
  );
}
