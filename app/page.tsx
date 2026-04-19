import { CardDeck } from "./components/CardDeck";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.25),transparent_60%)]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-zinc-950">
            P
          </span>
          poach
        </div>
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a className="hover:text-white" href="#deck">
            Talent
          </a>
          <a className="hover:text-white" href="#how">
            How it works
          </a>
          <a className="hover:text-white" href="#">
            For talent
          </a>
        </nav>
        <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200">
          Sign in
        </button>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-16 px-6 py-16 md:py-24">
        <section className="flex flex-col items-center gap-5 text-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-zinc-400">
            Live auctions · MVP
          </span>
          <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Bid on the <span className="text-zinc-500 italic">talent</span>
          </h1>
          <p className="max-w-xl text-base text-zinc-400 md:text-lg">
            Engineers and designers, live on the block. Every card is a running
            auction — outbid the market for exclusive time with the people you
            actually want to hire.
          </p>
        </section>

        <section id="deck" className="w-full">
          <CardDeck />
        </section>

        <section
          id="how"
          className="grid w-full max-w-3xl grid-cols-1 gap-6 text-sm text-zinc-400 md:grid-cols-3"
        >
          {[
            {
              n: "01",
              t: "Browse the deck",
              d: "Verified engineers and designers, each with a live hourly rate.",
            },
            {
              n: "02",
              t: "Place a bid",
              d: "Bid above the base rate. Highest bid at close wins exclusive access.",
            },
            {
              n: "03",
              t: "Start the trial",
              d: "Winner gets a paid trial week. No commitments on either side.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-white/10 bg-white/2 p-5"
            >
              <div className="text-xs text-zinc-600">{s.n}</div>
              <div className="mt-2 text-base font-medium text-white">
                {s.t}
              </div>
              <p className="mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-6 text-center text-xs text-zinc-500">
        poach · a market for talent · MVP preview
      </footer>
    </div>
  );
}
