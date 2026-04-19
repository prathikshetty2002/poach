"use client";

import { useEffect, useState } from "react";
import type { Developer } from "../data/developers";

type Props = {
  dev: Developer;
  onClose: () => void;
  onSubmit: (amount: number) => void;
};

export function BidModal({ dev, onClose, onSubmit }: Props) {
  const minBid = dev.currentBidUsd + 1;
  const [amount, setAmount] = useState<number>(minBid);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number.isFinite(amount) || amount < minBid) {
      setError(`Bid must be at least $${minBid}/hr`);
      return;
    }
    onSubmit(amount);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl"
      >
        <div
          className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${dev.gradient} opacity-15`}
        />
        <div className="relative flex flex-col gap-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Place a bid on
            </p>
            <h3 className="mt-1 text-2xl font-semibold">{dev.name}</h3>
            <p className="text-sm text-zinc-400">{dev.role}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-xs text-zinc-500">Current bid</div>
              <div className="text-lg font-semibold">
                ${dev.currentBidUsd}/hr
              </div>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-xs text-zinc-500">Minimum bid</div>
              <div className="text-lg font-semibold">${minBid}/hr</div>
            </div>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-zinc-400">Your bid (USD/hr)</span>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-white/30">
              <span className="text-lg text-zinc-500">$</span>
              <input
                type="number"
                inputMode="numeric"
                min={minBid}
                value={Number.isNaN(amount) ? "" : amount}
                onChange={(e) => {
                  setError(null);
                  setAmount(parseInt(e.target.value, 10));
                }}
                autoFocus
                className="flex-1 bg-transparent text-lg font-semibold text-white outline-none"
              />
              <span className="text-sm text-zinc-500">/hr</span>
            </div>
            {error && <span className="text-sm text-rose-400">{error}</span>}
          </label>

          <div className="flex gap-2">
            {[minBid, minBid + 5, minBid + 15, minBid + 40].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setError(null);
                  setAmount(v);
                }}
                className="flex-1 rounded-full border border-white/10 bg-white/5 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
              >
                ${v}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-12 flex-1 rounded-full border border-white/10 bg-transparent text-sm font-medium text-zinc-300 transition hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-12 flex-[2] rounded-full bg-white text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Confirm bid
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
