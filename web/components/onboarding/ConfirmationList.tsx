"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardIcon, TrendingUpIcon, CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface Detection {
  id: string;
  name: string;
  amount: string;
  meta: string;
  confidence: "elevee" | "moyenne" | "a-verifier";
  icon: "dashboard" | "trending-up";
}

const detections: Detection[] = [
  { id: "1", name: "CloudDrive Pro", amount: "9,99 €", meta: "mensuel · détecté 3 fois", confidence: "elevee", icon: "dashboard" },
  { id: "2", name: "StreamPlus", amount: "89,00 €", meta: "annuel · détecté 1 fois", confidence: "moyenne", icon: "dashboard" },
  { id: "3", name: "FitTrack", amount: "24,90 €", meta: "irrégulier · détecté 2 fois", confidence: "a-verifier", icon: "trending-up" },
];

const confidenceLabel: Record<Detection["confidence"], string> = {
  elevee: "CONFIANCE ÉLEVÉE",
  moyenne: "CONFIANCE MOYENNE",
  "a-verifier": "À VÉRIFIER",
};

const confidenceClasses: Record<Detection["confidence"], string> = {
  elevee: "bg-blue text-blue-ink",
  moyenne: "bg-surface text-ink border-[1.5px] border-ink",
  "a-verifier": "bg-pink text-pink-ink",
};

const TOTAL_DETECTED = 9;

export function ConfirmationList() {
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());

  return (
    <>
      <div className="flex flex-col gap-3 mt-7">
        {detections.map((d) => {
          const isConfirmed = confirmed.has(d.id);
          const Icon = d.icon === "trending-up" ? TrendingUpIcon : DashboardIcon;
          return (
            <div key={d.id} className="hard-sm bg-surface px-4.5 py-4 flex items-center gap-3.5">
              <span className="w-10 h-10 rounded-lg bg-yellow flex items-center justify-center shrink-0">
                <Icon className="w-[19px] h-[19px]" />
              </span>
              <div className="flex-grow min-w-0">
                <div className="text-[14.5px] font-bold">{d.name}</div>
                <div className="text-[12.5px] text-text-faint">
                  {d.amount} · {d.meta}
                </div>
              </div>
              <span
                className={cn(
                  "font-mono hard-xs text-[10px] font-bold px-2.5 py-1.5",
                  confidenceClasses[d.confidence]
                )}
              >
                {confidenceLabel[d.confidence]}
              </span>
              <Button variant="ghost" size="sm">
                Modifier
              </Button>
              <Button
                variant={isConfirmed ? "primary" : "ghost"}
                size="sm"
                onClick={() =>
                  setConfirmed((prev) => {
                    const next = new Set(prev);
                    if (next.has(d.id)) next.delete(d.id);
                    else next.add(d.id);
                    return next;
                  })
                }
              >
                {isConfirmed ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" /> Confirmé
                  </>
                ) : (
                  "Confirmer"
                )}
              </Button>
            </div>
          );
        })}

        <div className="hard-sm bg-surface px-4.5 py-4 flex items-center gap-3.5 opacity-55">
          <span className="w-10 h-10 rounded-lg bg-paper-alt flex items-center justify-center shrink-0">
            <DashboardIcon className="w-[19px] h-[19px]" />
          </span>
          <div className="flex-grow min-w-0">
            <div className="text-[14.5px] font-bold line-through">DesignSuite</div>
            <div className="text-[12.5px] text-text-faint">12,99 € · mensuel — ignoré</div>
          </div>
          <Button variant="ghost" size="sm">
            Annuler
          </Button>
        </div>

        <div className="text-center py-3">
          <span className="font-mono text-[11.5px] font-bold text-text-faint">
            + {TOTAL_DETECTED - detections.length - 1} AUTRES ABONNEMENTS À VÉRIFIER PLUS BAS
          </span>
        </div>
      </div>

      <div className="hard-sm sticky bottom-4 mx-auto max-w-[760px] w-[calc(100%-0px)] bg-surface px-5 py-4 mt-6 flex items-center justify-between">
        <span className="text-[13.5px] font-semibold text-text-muted">
          {confirmed.size} sur {TOTAL_DETECTED} confirmés
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
