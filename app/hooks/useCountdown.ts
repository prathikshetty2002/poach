"use client";

import { useEffect, useState } from "react";

function format(ms: number) {
  if (ms <= 0) return "0m";
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export function useCountdown(endsAt: number) {
  const [label, setLabel] = useState(() => format(endsAt - Date.now()));

  useEffect(() => {
    const tick = () => setLabel(format(endsAt - Date.now()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  return label;
}
