/** Isometric-cube society mark, used in the header and footer lockups. */
export function SocietyMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 transition-colors ${className}`}
    >
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M12 2.6 21 7.5v9L12 21.4 3 16.5v-9L12 2.6Z" stroke="rgb(82 82 91)" strokeLinejoin="round" strokeWidth="1.2" />
        <path d="M12 2.6 21 7.5l-9 4.9-9-4.9 9-4.9Z" fill="rgb(52 211 153 / 0.18)" />
        <path d="M3 7.5l9 4.9 9-4.9M12 12.4v9" stroke="rgb(52 211 153)" strokeLinejoin="round" strokeWidth="1.2" />
      </svg>
    </span>
  );
}
