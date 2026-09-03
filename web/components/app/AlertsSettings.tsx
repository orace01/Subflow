"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { MailIcon, SendIcon, SmartphoneIcon } from "@/components/icons";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "w-11 h-6 border-[2px] border-ink relative shrink-0 cursor-pointer",
        on ? "bg-blue" : "bg-paper-alt"
      )}
    >
      <span
        className={cn(
          "absolute top-px w-4 h-4 bg-surface border-[1.5px] border-ink transition-[left,right]",
          on ? "right-px" : "left-px"
        )}
      />
    </button>
  );
}

const alertTypes = [
  {
    key: "before-charge",
    title: "Alerte avant prélèvement",
    body: "Reçoit un e-mail avant chaque prélèvement important",
    default: true,
  },
  {
    key: "price-hike",
    title: "Alerte de hausse de prix",
    body: "Prévient dès qu'un abonnement augmente de prix",
    default: true,
  },
  {
    key: "weekly-digest",
    title: "Résumé hebdomadaire",
    body: "Un récapitulatif de vos dépenses chaque lundi",
    default: false,
  },
] as const;

const delayOptions = ["1 jour avant", "3 jours avant", "7 jours avant"];

export function AlertsSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(alertTypes.map((a) => [a.key, a.default]))
  );
  const [delay, setDelay] = useState("3 jours avant");

  return (
    <div className="max-w-[760px]">
      <Card className="p-6">
        <h3 className="text-[15px] font-bold mb-4.5">Types d&apos;alertes</h3>
        {alertTypes.map((a, i) => (
          <div
            key={a.key}
            className={cn(
              "flex items-center justify-between py-3.5",
              i < alertTypes.length - 1 && "border-b-[1.5px] border-paper-alt"
            )}
          >
            <div>
              <div className="text-[14px] font-semibold">{a.title}</div>
              <div className="text-[12.5px] text-text-faint mt-0.5">{a.body}</div>
            </div>
            <Toggle
              on={toggles[a.key]}
              onClick={() => setToggles((t) => ({ ...t, [a.key]: !t[a.key] }))}
            />
          </div>
        ))}
      </Card>

      <Card className="p-6 mt-4">
        <h3 className="text-[15px] font-bold mb-3.5">Me prévenir</h3>
        <div className="flex gap-2 flex-wrap">
          {delayOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setDelay(opt)}
              className={cn(
                "text-[12.5px] font-bold px-4 py-2.25 border-[2px] border-ink cursor-pointer",
                delay === opt ? "bg-ink text-paper" : "bg-surface text-ink"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6 mt-4">
        <h3 className="text-[15px] font-bold mb-4.5">Canaux de notification</h3>
        <div className="flex items-center justify-between py-3 border-b-[1.5px] border-paper-alt">
          <div className="flex items-center gap-3">
            <MailIcon className="w-[18px] h-[18px] text-blue" />
            <span className="text-[14px] font-semibold">E-mail</span>
          </div>
          <span className="font-mono hard-xs bg-blue text-blue-ink text-[10px] font-bold px-2.5 py-1.5">
            ACTIVÉ
          </span>
        </div>
        <div className="flex items-center justify-between py-3 border-b-[1.5px] border-paper-alt opacity-50">
          <div className="flex items-center gap-3">
            <SendIcon className="w-[18px] h-[18px]" />
            <span className="text-[14px] font-semibold">Telegram</span>
          </div>
          <span className="font-mono hard-xs bg-surface text-[10px] font-bold px-2.5 py-1.5">
            PRO
          </span>
        </div>
        <div className="flex items-center justify-between py-3 opacity-50">
          <div className="flex items-center gap-3">
            <SmartphoneIcon className="w-[18px] h-[18px]" />
            <span className="text-[14px] font-semibold">SMS</span>
          </div>
          <span className="font-mono hard-xs bg-surface text-[10px] font-bold px-2.5 py-1.5">
            PRO
          </span>
        </div>
        <Link
          href="/#tarifs"
          className="block text-center text-[12.5px] font-bold mt-4 no-underline"
        >
          Débloquer Telegram &amp; SMS avec Pro →
        </Link>
      </Card>
    </div>
  );
}
