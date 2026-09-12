"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/cn";
import type { SubscriptionStatus } from "@/lib/types";
import { updateSubscriptionStatusAction } from "@/app/actions/subscriptions";

const options: { key: SubscriptionStatus; label: string }[] = [
  { key: "actif", label: "Actif" },
  { key: "a-verifier", label: "À vérifier" },
  { key: "en-pause", label: "En pause" },
  { key: "a-resilier", label: "À résilier" },
  { key: "ignore", label: "Ignoré" },
];

export function StatusSelector({
  subscriptionId,
  initialStatus,
}: {
  subscriptionId: string;
  initialStatus: SubscriptionStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function choose(next: SubscriptionStatus) {
    const previous = status;
    setStatus(next);
    setError(null);
    startTransition(async () => {
      const result = await updateSubscriptionStatusAction(subscriptionId, next);
      if (result.error) {
        setStatus(previous);
        setError(result.error);
      }
    });
  }

  return (
    <div>
      <div className={cn("flex flex-wrap mt-5.5 -mx-px", isPending && "opacity-60")}>
        {options.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => choose(key)}
            disabled={isPending}
            className={cn(
              "text-[12.5px] font-bold px-4 py-2.25 border-[2px] border-ink -ml-px cursor-pointer disabled:cursor-not-allowed",
              status === key ? "bg-ink text-paper" : "bg-surface text-ink"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {error && <p className="text-[12.5px] text-pink font-semibold mt-2">{error}</p>}
    </div>
  );
}
