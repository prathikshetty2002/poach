"use client";

import Image from "next/image";
import type { Developer } from "../data/developers";
import { useCountdown } from "../hooks/useCountdown";

type Props = {
  dev: Developer;
  onBid: () => void;
  onBookmark: () => void;
  bookmarked: boolean;
};

function formatEarned(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}m+`;
  if (v >= 1_000) return `$${Math.floor(v / 1_000)}k+`;
  return `$${v}`;
}

export function DeveloperCard({ dev, onBid, onBookmark, bookmarked }: Props) {
  const timeLeft = useCountdown(dev.auctionEndsAt);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-6 shadow-2xl backdrop-blur">
      <div className="relative flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
            <Image
              src={dev.avatar}
              alt={dev.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <h2 className="text-xl font-semibold text-white">{dev.name}</h2>
            <p className="text-sm text-zinc-400">{dev.role}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/90 px-2.5 py-1 text-xs font-medium text-white">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-white/25 text-[10px] font-bold">
                  {dev.seniority[0]}
                </span>
                {dev.seniority}
              </span>
              {dev.skills.length > 1 && (
                <span className="text-xs text-zinc-500">
                  +{dev.skills.length - 1}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/5" />

        <div className="grid grid-cols-3 gap-3 text-left">
          <Stat
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-amber-400"
              >
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            }
            label="rating"
            value={dev.rating.toFixed(dev.rating % 1 ? 1 : 0)}
          />
          <Stat label="earned" value={formatEarned(dev.earnedUsd)} />
          <Stat label="rate" value={`$${dev.baseRateUsd}/hr`} align="right" />
        </div>

        <div className="flex items-start justify-between gap-3 text-sm">
          <div className="flex items-start gap-2 text-zinc-300">
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 h-4 w-4 stroke-zinc-400"
              fill="none"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" />
            </svg>
            <div className="leading-tight">
              <div className="font-medium text-white">{timeLeft} left</div>
              <div className="text-xs text-zinc-500">
                Base: ${dev.baseRateUsd}/hr
              </div>
            </div>
          </div>
          <div className="text-right leading-tight">
            <div className="text-xs text-zinc-500">Current Bid</div>
            <div className="text-lg font-semibold text-white">
              ${dev.currentBidUsd}/hr
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-zinc-400"
              fill="none"
              strokeWidth="1.8"
            >
              <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {dev.location}
          </div>
          {dev.verified ? (
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm4.3 7.7-5.3 5.3-3.3-3.3 1.4-1.4 1.9 1.9 3.9-3.9 1.4 1.4Z" />
              </svg>
              Verified
            </span>
          ) : (
            <span className="text-zinc-500">Unverified</span>
          )}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={onBookmark}
            aria-pressed={bookmarked}
            aria-label="Bookmark"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill={bookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 3h12v18l-6-4-6 4z" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={onBid}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-white text-base font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  align = "left",
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        align === "right" ? "justify-end" : ""
      }`}
    >
      {icon}
      <div className="leading-tight">
        <div className="text-sm font-semibold text-white">{value}</div>
        <div className="text-xs text-zinc-500">{label}</div>
      </div>
    </div>
  );
}
