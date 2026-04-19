"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import { developers as seed, type Developer } from "../data/developers";
import { DeveloperCard } from "./DeveloperCard";
import { BidModal } from "./BidModal";
import { Toast } from "./Toast";

type BidEvent = { devId: string; amount: number; at: number };

function ActiveCard({
  dev,
  bookmarked,
  onBookmark,
  onBid,
  onSwipe,
  exitDir,
}: {
  dev: Developer;
  bookmarked: boolean;
  onBookmark: () => void;
  onBid: () => void;
  onSwipe: (dir: 1 | -1) => void;
  exitDir: 1 | -1;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 0, 240], [-16, 0, 16]);
  const opacity = useTransform(
    x,
    [-260, -140, 0, 140, 260],
    [0.3, 1, 1, 1, 0.3],
  );

  return (
    <motion.div
      key={dev.id}
      className="relative z-10 cursor-grab touch-pan-y active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      initial={{ y: 12, scale: 0.96, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{
        x: exitDir * 800,
        rotate: exitDir * 24,
        opacity: 0,
        position: "absolute",
        inset: 0,
        transition: { duration: 0.38, ease: [0.32, 0, 0.67, 0] },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.85 }}
      drag="x"
      dragElastic={0.22}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info: PanInfo) => {
        const past =
          Math.abs(info.offset.x) > 130 || Math.abs(info.velocity.x) > 650;
        if (past) onSwipe(info.offset.x > 0 ? 1 : -1);
      }}
    >
      <DeveloperCard
        dev={dev}
        bookmarked={bookmarked}
        onBookmark={onBookmark}
        onBid={onBid}
      />
    </motion.div>
  );
}

function RevealOverlay({
  devs,
  bookmarks,
  onPick,
  onToggleBookmark,
  onBid,
  onClose,
}: {
  devs: Developer[];
  bookmarks: Set<string>;
  onPick: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onBid: (d: Developer) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-black/60 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-white/5 text-xs font-semibold tabular-nums text-white">
            {devs.length}
          </span>
          <div>
            <div className="text-sm font-semibold text-white">All talent</div>
            <div className="text-xs text-zinc-500">
              Tap a card to focus · Esc to close
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
        >
          Close
        </button>
      </div>

      <div
        className="mx-auto grid max-w-7xl gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3"
        onClick={(e) => e.stopPropagation()}
      >
        {devs.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.88,
              rotate: (i % 2 ? 1 : -1) * 4,
            }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              delay: i * 0.06,
              type: "spring",
              stiffness: 220,
              damping: 24,
            }}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            className="relative cursor-pointer"
            onClick={() => onPick(d.id)}
          >
            <DeveloperCard
              dev={d}
              bookmarked={bookmarks.has(d.id)}
              onBookmark={() => onToggleBookmark(d.id)}
              onBid={() => onBid(d)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function CardDeck() {
  const [devs, setDevs] = useState<Developer[]>(seed);
  const [index, setIndex] = useState(0);
  const [exitDir, setExitDir] = useState<1 | -1>(1);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [bidding, setBidding] = useState<Developer | null>(null);
  const [history, setHistory] = useState<BidEvent[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const active = devs[index];

  const pickDev = (id: string) => {
    const i = devs.findIndex((d) => d.id === id);
    if (i >= 0) setIndex(i);
    setRevealed(false);
  };

  const advance = (dir: 1 | -1) => {
    setExitDir(dir);
    setIndex((i) => (i + 1) % devs.length);
  };

  const retreat = () => {
    setExitDir(-1);
    setIndex((i) => (i - 1 + devs.length) % devs.length);
  };

  const toggleBookmark = (id: string) =>
    setBookmarks((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });

  const submitBid = (amount: number) => {
    if (!bidding) return;
    setDevs((prev) =>
      prev.map((d) =>
        d.id === bidding.id ? { ...d, currentBidUsd: amount } : d,
      ),
    );
    setHistory((h) =>
      [{ devId: bidding.id, amount, at: Date.now() }, ...h].slice(0, 20),
    );
    setToast(`Bid placed: $${amount}/hr on ${bidding.name}`);
    setBidding(null);
  };

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="relative w-full max-w-md">
        <div
          aria-hidden
          className="absolute inset-0 rounded-xl border border-white/10 bg-zinc-900 shadow-xl"
          style={{
            transform: "translate(10px, 22px) rotate(4deg)",
            opacity: 0.5,
            zIndex: 1,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-xl border border-white/10 bg-zinc-900 shadow-xl"
          style={{
            transform: "translate(-6px, 11px) rotate(-3deg)",
            opacity: 0.75,
            zIndex: 2,
          }}
        />
        <AnimatePresence initial={false} mode="popLayout">
          <ActiveCard
            key={active.id}
            dev={active}
            bookmarked={bookmarks.has(active.id)}
            onBookmark={() => toggleBookmark(active.id)}
            onBid={() => setBidding(active)}
            onSwipe={advance}
            exitDir={exitDir}
          />
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={retreat}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Previous"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-sm tabular-nums text-zinc-500">
          {index + 1} / {devs.length}
        </span>
        <button
          onClick={() => advance(1)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Next"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <button
        onClick={() => setRevealed(true)}
        className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="4" width="7" height="16" rx="1.5" />
          <rect x="10.5" y="4" width="7" height="16" rx="1.5" />
          <rect x="18" y="4" width="3" height="16" rx="1.2" />
        </svg>
        Reveal all {devs.length}
      </button>

      <AnimatePresence>
        {revealed && (
          <RevealOverlay
            devs={devs}
            bookmarks={bookmarks}
            onPick={pickDev}
            onToggleBookmark={toggleBookmark}
            onBid={(d) => setBidding(d)}
            onClose={() => setRevealed(false)}
          />
        )}
      </AnimatePresence>

      {history.length > 0 && (
        <div className="w-full max-w-md rounded-2xl border border-white/5 bg-white/2 p-4 text-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium text-white">Recent bids</span>
            <span className="text-xs text-zinc-500">local session</span>
          </div>
          <ul className="flex flex-col gap-2">
            {history.slice(0, 5).map((h, i) => {
              const d = devs.find((x) => x.id === h.devId);
              return (
                <li
                  key={`${h.devId}-${h.at}-${i}`}
                  className="flex items-center justify-between text-zinc-300"
                >
                  <span>
                    <span className="text-white">${h.amount}/hr</span>{" "}
                    <span className="text-zinc-500">on</span>{" "}
                    {d?.name ?? h.devId}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {new Date(h.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {bidding && (
        <BidModal
          dev={bidding}
          onClose={() => setBidding(null)}
          onSubmit={submitBid}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
