import type { Route } from "./+types/home";

const SITE_URL = "https://paintdle.louis-bellefemine.com";
const TITLE = "Paintdle – Guess the painting of the day";
const DESCRIPTION =
  "A daily guessing game for art lovers. One mystery painting a day, the same for everyone.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: TITLE },
    { name: "description", content: DESCRIPTION },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/` },

    // Open Graph (link previews on Facebook, LinkedIn, Discord, iMessage…)
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${SITE_URL}/` },
    { property: "og:site_name", content: "Paintdle" },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_US" },

    // Twitter / X
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESCRIPTION },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

type TileState = "correct" | "close" | "wrong";

// One tile per hint column of the future grid, spelling the game name
const LOGO_TILES: { letter: string; state: TileState }[] = [
  { letter: "P", state: "correct" },
  { letter: "A", state: "close" },
  { letter: "I", state: "wrong" },
  { letter: "N", state: "correct" },
  { letter: "T", state: "close" },
  { letter: "D", state: "correct" },
  { letter: "L", state: "wrong" },
  { letter: "E", state: "correct" },
];

const TILE_COLORS: Record<TileState, string> = {
  correct: "bg-tile-correct",
  close: "bg-tile-close",
  wrong: "bg-tile-wrong",
};

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-[max(3rem,env(safe-area-inset-bottom))]">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <h1 className="sr-only">Paintdle</h1>
        <div
          aria-hidden="true"
          className="flex gap-1.5 [perspective:600px] sm:gap-2"
        >
          {LOGO_TILES.map(({ letter, state }, i) => (
            <span
              key={i}
              className={`flex size-8 items-center justify-center rounded-lg text-base font-semibold text-white shadow-sm motion-safe:animate-flip-in sm:size-12 sm:rounded-xl sm:text-xl ${TILE_COLORS[state]}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>

        <p className="mt-12 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm font-medium text-muted shadow-sm backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-tile-close opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-tile-close" />
          </span>
          Under construction
        </p>

        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Guess the painting of the day.
        </h2>

        <p className="mt-5 max-w-md text-lg leading-relaxed text-pretty text-muted">
          A daily game for art lovers, in the spirit of Wordle. One mystery
          painting, the same for everyone. Coming soon.
        </p>
      </div>
    </main>
  );
}
