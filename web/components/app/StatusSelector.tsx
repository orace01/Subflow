"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { SubscriptionStatus } from "@/lib/types";

const options: { key: SubscriptionStatus; label: string }[] = [
  { key: "actif", label: "Actif" },
  { key: "a-verifier", label: "À vérifier" },
  { key: "en-pause", label: "En pause" },
  { key: "a-resilier", label: "À résilier" },
  { key: "ignore", label: "Ignoré" },
];

export function StatusSelector({ initialStatus }: { initialStatus: SubscriptionStatus }) {
  const [status, setStatus] = useState(initialStatus);

  return (
    <div className="flex flex-wrap mt-5.5 -mx-px">
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setStatus(key)}
          className={cn(
            "text-[12.5px] font-bold px-4 py-2.25 border-[2px] border-ink -ml-px cursor-pointer",
            status === key ? "bg-ink text-paper" : "bg-surface text-ink"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
