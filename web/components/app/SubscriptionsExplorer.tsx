"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchIcon, ChevronRightIcon } from "@/components/icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { formatAmount, formatDate } from "@/lib/format";
import { computeStatusCounts } from "@/lib/subscriptions";
import type { Subscription, SubscriptionStatus } from "@/lib/types";

const filters: { key: SubscriptionStatus | "tous"; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "actif", label: "Actif" },
  { key: "a-verifier", label: "À vérifier" },
  { key: "a-resilier", label: "À résilier" },
  { key: "en-pause", label: "En pause" },
];

const frequencyLabel: Record<Subscription["frequency"], string> = {
  mensuel: "Mensuel",
  annuel: "Annuel",
  irregulier: "Irrégulier",
};

export function SubscriptionsExplorer({ subscriptions }: { subscriptions: Subscription[] }) {
  const [filter, setFilter] = useState<SubscriptionStatus | "tous">("tous");
  const [query, setQuery] = useState("");
  const counts = useMemo(() => computeStatusCounts(subscriptions), [subscriptions]);

  const visible = subscriptions.filter((s) => {
    if (filter !== "tous" && s.status !== filter) return false;
    if (query && !s.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
        <div className="flex gap-2 flex-wrap">
          {filters.map(({ key, label }) => {
            const count = key === "tous" ? subscriptions.length : counts[key];
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "text-[12.5px] font-semibold px-4 py-2 border-[2px] border-ink cursor-pointer",
                  active ? "bg-ink text-paper" : "bg-surface text-ink"
                )}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="h-10 pl-9 pr-3.5 border-[2px] border-ink bg-surface text-[13.5px] w-[220px] font-sans"
          />
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-[2.2fr_1.2fr_1fr_1fr_1.3fr_1.2fr_40px] px-5 py-3 border-b-[2.5px] border-ink bg-paper-alt">
          {["SERVICE", "CATÉGORIE", "MONTANT", "FRÉQUENCE", "PROCHAIN PRÉLÈV.", "STATUT", ""].map(
            (h) => (
              <span key={h} className="font-mono text-[10.5px] font-bold text-text-faint">
                {h}
              </span>
            )
          )}
        </div>

        {visible.length === 0 && (
          <div className="px-5 py-10 text-center text-[14px] text-text-muted">
            Aucun abonnement ne correspond à ce filtre.
          </div>
        )}

        {visible.map((s, i) => (
          <Link
            key={s.id}
            href={`/abonnements/${s.id}`}
            className={cn(
              "grid grid-cols-[2.2fr_1.2fr_1fr_1fr_1.3fr_1.2fr_40px] items-center px-5 py-3.5 no-underline text-ink",
              i < visible.length - 1 && "border-b-[1.5px] border-paper-alt",
              s.status === "a-verifier" && "bg-yellow",
              (s.status === "en-pause" || s.status === "ignore") && "opacity-55"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-paper-alt shrink-0" />
              <span
                className={cn(
                  "text-[14px] font-semibold",
                  s.status === "a-resilier" && "line-through text-text-faint"
                )}
              >
                {s.name}
              </span>
            </div>
            <span className="text-[13px] text-text-muted">{s.category}</span>
            <span className="text-[13px] font-semibold">{formatAmount(s.amount)}</span>
            <span className="text-[13px] text-text-muted">{frequencyLabel[s.frequency]}</span>
            <span className="text-[13px] text-text-muted">{formatDate(s.nextChargeDate)}</span>
            <StatusBadge status={s.status} />
            <ChevronRightIcon className="w-4 h-4 text-text-faint" />
          </Link>
        ))}
      </Card>
    </div>
  );
}
