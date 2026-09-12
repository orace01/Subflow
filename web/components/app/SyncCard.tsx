"use client";

import { useState } from "react";
import { RefreshIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function SyncCard() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("il y a 2 heures");

  function handleSync() {
    if (syncing) return;
    setSyncing(true);
    // NOTE: pas de backend pour l'instant — le vrai déclenchement de la
    // ré-analyse des e-mails sera branché ici une fois le back construit.
    setTimeout(() => {
      setSyncing(false);
      setLastSync("à l'instant");
    }, 1200);
  }

  return (
    <div className="hard-sm bg-ink p-5">
      <div className="flex items-center gap-2.5">
        <RefreshIcon className={cn("w-[18px] h-[18px] text-paper", syncing && "animate-spin")} />
        <span className="font-mono text-[11px] font-bold text-paper">SYNCHRONISATION</span>
      </div>
      <p className="text-[13px] text-paper/80 leading-relaxed mt-2.5 mb-3.5">
        Dernière synchro {lastSync}. {syncing ? "Analyse en cours…" : "Tout est à jour."}
      </p>
      <Button variant="primary" className="w-full" onClick={handleSync} disabled={syncing}>
        {syncing ? "Synchronisation…" : "Resynchroniser"}
      </Button>
    </div>
  );
}
