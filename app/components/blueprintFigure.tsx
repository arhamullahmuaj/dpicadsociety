const boltHoles = [0, 60, 120, 180, 240, 300].map((angle) => {
  const radians = (angle * Math.PI) / 180;
  return {
    angle,
    cx: 165 + 64 * Math.cos(radians),
    cy: 175 + 64 * Math.sin(radians),
  };
});

const EMERALD = "rgb(52 211 153)";
const EMERALD_SOFT = "rgb(52 211 153 / 0.55)";
const LINE = "rgb(82 82 91)";
const LINE_SOFT = "rgb(63 63 70)";

/**
 * Orthographic-style drawing of a bolted flange: front view, sectioned side
 * view, dimensions and a title block. Decorative, so hidden from screen readers.
 */
export function BlueprintFigure() {
  return (
    <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-zinc-500">
            Drawing no. DPI-CADS-001
          </span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] text-zinc-600 sm:inline">
            First angle projection
          </span>
        </div>

        <div className="sheet-grid relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/3 top-1/3 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl"
          />
          <svg
            aria-hidden="true"
            className="relative block w-full font-mono"
            role="presentation"
            viewBox="0 0 420 420"
          >
            <defs>
              <pattern
                height="7"
                id="section-hatch"
                patternTransform="rotate(45)"
                patternUnits="userSpaceOnUse"
                width="7"
              >
                <line stroke={EMERALD_SOFT} strokeWidth="0.7" x1="0" x2="0" y1="0" y2="7" />
              </pattern>
            </defs>

            {/* Sheet frame */}
            <rect fill="none" height="392" stroke={LINE_SOFT} strokeWidth="1" width="392" x="14" y="14" />

            {/* Centre lines */}
            <line stroke={LINE} strokeDasharray="20 5 3 5" strokeWidth="0.9" x1="52" x2="278" y1="175" y2="175" />
            <line stroke={LINE} strokeDasharray="20 5 3 5" strokeWidth="0.9" x1="165" x2="165" y1="62" y2="288" />

            {/* Bolt-circle construction line */}
            <circle
              cx="165"
              cy="175"
              fill="none"
              r="64"
              stroke={LINE}
              strokeDasharray="18 4 2 4"
              strokeWidth="0.9"
            />

            {/* Front view: outer profile and bore */}
            <circle
              className="draw-line"
              cx="165"
              cy="175"
              fill="rgb(52 211 153 / 0.04)"
              r="92"
              stroke={EMERALD}
              strokeWidth="1.6"
            />
            <circle
              className="draw-line-slow"
              cx="165"
              cy="175"
              fill="none"
              r="32"
              stroke={EMERALD}
              strokeWidth="1.4"
            />

            {boltHoles.map((hole) => (
              <g key={hole.angle}>
                <circle cx={hole.cx} cy={hole.cy} fill="rgb(9 9 11)" r="10" stroke={EMERALD_SOFT} strokeWidth="1.2" />
                <line
                  stroke={LINE}
                  strokeWidth="0.8"
                  x1={hole.cx - 14}
                  x2={hole.cx + 14}
                  y1={hole.cy}
                  y2={hole.cy}
                />
                <line
                  stroke={LINE}
                  strokeWidth="0.8"
                  x1={hole.cx}
                  x2={hole.cx}
                  y1={hole.cy - 14}
                  y2={hole.cy + 14}
                />
              </g>
            ))}

            {/* Sectioned side view */}
            <g>
              <rect fill="url(#section-hatch)" height="60" width="52" x="300" y="83" />
              <rect fill="url(#section-hatch)" height="60" width="52" x="300" y="207" />
              <rect fill="none" height="184" stroke={EMERALD} strokeWidth="1.4" width="52" x="300" y="83" />
              <line stroke={EMERALD_SOFT} strokeWidth="1.2" x1="300" x2="352" y1="143" y2="143" />
              <line stroke={EMERALD_SOFT} strokeWidth="1.2" x1="300" x2="352" y1="207" y2="207" />
              <line stroke={LINE} strokeDasharray="20 5 3 5" strokeWidth="0.9" x1="288" x2="364" y1="175" y2="175" />
            </g>

            {/* Overall diameter dimension */}
            <g stroke={LINE} strokeWidth="0.9">
              <line x1="73" x2="73" y1="272" y2="326" />
              <line x1="257" x2="257" y1="272" y2="326" />
              <line x1="73" x2="257" y1="318" y2="318" />
              <path d="M73 318l9-3.2v6.4L73 318Z" fill={LINE} />
              <path d="M257 318l-9-3.2v6.4l9-3.2Z" fill={LINE} />
            </g>
            <rect fill="rgb(9 9 11)" height="13" rx="2" width="54" x="138" y="311.5" />
            <text fill={EMERALD} fontSize="9.5" letterSpacing="0.06em" x="146" y="321">
              &#8960; 184
            </text>

            {/* Bolt-hole callout */}
            <g stroke={LINE} strokeWidth="0.9">
              <line x1="203" x2="252" y1="126" y2="84" />
              <line x1="252" x2="292" y1="84" y2="84" />
              <path d="M203 126l9.6-1.4-4 5.4L203 126Z" fill={LINE} stroke="none" />
            </g>
            <text fill="rgb(161 161 170)" fontSize="9" letterSpacing="0.06em" x="256" y="79">
              6&#215; &#8960; 20
            </text>

            {/* Notes */}
            <text fill="rgb(82 82 91)" fontSize="7.5" letterSpacing="0.14em" x="26" y="358">
              ALL DIMENSIONS IN MM
            </text>
            <text fill="rgb(82 82 91)" fontSize="7.5" letterSpacing="0.14em" x="26" y="372">
              DO NOT SCALE DRAWING
            </text>

            {/* Title block */}
            <g fill="none" stroke={LINE_SOFT} strokeWidth="1">
              <rect height="62" width="164" x="228" y="344" />
              <line x1="228" x2="392" y1="366" y2="366" />
              <line x1="228" x2="392" y1="386" y2="386" />
              <line x1="310" x2="310" y1="366" y2="406" />
            </g>
            <text fill="rgb(228 228 231)" fontSize="9" letterSpacing="0.16em" x="238" y="359">
              DPI CAD SOCIETY
            </text>
            <text fill="rgb(113 113 122)" fontSize="7.5" letterSpacing="0.12em" x="238" y="380">
              FLANGE ASSY
            </text>
            <text fill="rgb(113 113 122)" fontSize="7.5" letterSpacing="0.12em" x="320" y="380">
              REV A
            </text>
            <text fill="rgb(113 113 122)" fontSize="7.5" letterSpacing="0.12em" x="238" y="400">
              SCALE 1:2
            </text>
            <text fill="rgb(113 113 122)" fontSize="7.5" letterSpacing="0.12em" x="320" y="400">
              SHEET 1/1
            </text>
          </svg>
        </div>
      </div>
    </figure>
  );
}
