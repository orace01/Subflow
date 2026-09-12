"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { DashboardIcon, TrendingUpIcon, CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { formatAmount } from "@/lib/format";
import { confirmSubscriptionAction, ignoreSubscriptionAction } from "@/app/actions/subscriptions";
import type { Confidence, Subscription } from "@/lib/types";

const confidenceLabel: Record<Confidence, string> = {
  elevee: "CONFIANCE ÉLEVÉE",
  moyenne: "CONFIANCE MOYENNE",
  "a-verifier": "À VÉRIFIER",
};

const confidenceClasses: Record<Confidence, string> = {
  elevee: "bg-blue text-blue-ink",
  moyenne: "bg-surface text-ink border-[1.5px] border-ink",
  "a-verifier": "bg-pink text-pink-ink",
};

type Resolution = "confirmed" | "ignored";

export function ConfirmationList({ pending }: { pending: Subscription[] }) {
  const [resolutions, setResolutions] = useState<Record<string, Resolution>>({});
  const [pendingId, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const total = pending.length;
  const resolvedCount = Object.keys(resolutions).length;

  function act(id: string, resolution: Resolution) {
    setError(null);
    startTransition(async () => {
      const action = resolution === "confirmed" ? confirmSubscriptionAction : ignoreSubscriptionAction;
      const result = await action(id);
      if (result.error) {
        setError(result.error);
        return;
      }
      setResolutions((prev) => ({ ...prev, [id]: resolution }));
    });
  }

  if (total === 0) {
    return (
      <div className="hard-sm bg-surface px-6 py-10 mt-7 text-center">
        <p className="text-[14.5px] font-semibold text-text-muted">
          Aucun abonnement à confirmer pour l&apos;instant.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 mt-7">
        {pending.map((d) => {
          const resolution = resolutions[d.id];
          const Icon = d.previousAmount !== undefined ? TrendingUpIcon : DashboardIcon;
          return (
            <div
              key={d.id}
              className={cn(
                "hard-sm bg-surface px-4.5 py-4 flex items-center gap-3.5",
                resolution === "ignored" && "opacity-55"
              )}
            >
              <span className="w-10 h-10 rounded-lg bg-yellow flex items-center justify-center shrink-0">
                <Icon className="w-[19px] h-[19px]" />
              </span>
              <div className="flex-grow min-w-0">
                <div className={cn("text-[14.5px] font-bold", resolution === "ignored" && "line-through")}>
                  {d.name}
                </div>
                <div className="text-[12.5px] text-text-faint">
                  {formatAmount(d.amount)} · {d.frequency}
                  {d.previousAmount !== undefined &&
                    ` · hausse ${formatAmount(d.previousAmount)} → ${formatAmount(d.amount)}`}
                </div>
              </div>
              {!resolution && (
                <span
                  className={cn(
                    "font-mono hard-xs text-[10px] font-bold px-2.5 py-1.5",
                    confidenceClasses[d.confidence]
                  )}
                >
                  {confidenceLabel[d.confidence]}
                </span>
              )}
              {resolution === "ignored" ? (
                <Button variant="ghost" size="sm" onClick={() => act(d.id, "confirmed")} disabled={pendingId}>
                  Annuler
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => act(d.id, "ignored")}
                    disabled={pendingId || resolution === "confirmed"}
                  >
                    Ignorer
                  </Button>
                  <Button
                    variant={resolution === "confirmed" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => act(d.id, "confirmed")}
                    disabled={pendingId}
                  >
                    {resolution === "confirmed" ? (
                      <>
                        <CheckIcon className="w-3.5 h-3.5" /> Confirmé
                      </>
                    ) : (
                      "Confirmer"
                    )}
                  </Button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="text-[13px] text-pink font-semibold mt-3">{error}</p>}

      <div className="hard-sm sticky bottom-4 mx-auto max-w-[760px] w-full bg-surface px-5 py-4 mt-6 flex items-center justify-between">
        <span className="text-[13.5px] font-semibold text-text-muted">
          {resolvedCount} sur {total} traités
        </span>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 text-[14.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-[transform,box-shadow] duration-100 no-underline"
        >
          Continuer
        </Link>
      </div>
    </>
  );
}
