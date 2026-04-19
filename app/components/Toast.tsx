"use client";

import { useEffect } from "react";

export function Toast({
  message,
  onDone,
  duration = 2400,
}: {
  message: string;
  onDone: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const id = window.setTimeout(onDone, duration);
    return () => window.clearTimeout(id);
  }, [onDone, duration]);

  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-[toastIn_200ms_ease-out]">
      <div className="rounded-full border border-white/10 bg-emerald-500/90 px-5 py-2.5 text-sm font-medium text-white shadow-lg">
        {message}
      </div>
    </div>
  );
}
