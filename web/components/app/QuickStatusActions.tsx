"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";
import { updateSubscriptionStatusAction } from "@/app/actions/subscriptions";
import type { SubscriptionStatus } from "@/lib/types";

type Action = "pause" | "ignore" | "cancel";

const ACTION_STATUS: Record<Action, SubscriptionStatus> = {
  pause: "en-pause",
  ignore: "ignore",
  cancel: "a-resilier",
};

const confirmations: Record<Action, string> = {
  pause: "Abonnement mis en pause. Vous ne serez plus alerté pour ce service tant qu'il reste en pause.",
  ignore: "Abonnement ignoré. Il n'apparaîtra plus dans vos totaux ni vos alertes.",
  cancel: "Statut passé à « à résilier ». Pensez à résilier directement auprès du service.",
};

export function QuickStatusActions({ subscriptionId }: { subscriptionId: string }) {
  const [done, setDone] = useState<Action | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function trigger(action: Action) {
    setError(null);
    startTransition(async () => {
      const result = await updateSubscriptionStatusAction(subscriptionId, ACTION_STATUS[action]);
      if (result.error) {
        setError(result.error);
        return;
      }
      setDone(action);
    });
  }

  if (done) {
    return (
      <div className="flex items-center gap-2.5 text-[13.5px] font-semibold text-blue">
        <CheckIcon className="w-4 h-4 shrink-0" />
        {confirmations[done]}
      </div>
    );
  }

  return (
    <>
      <span className="text-[13.5px] text-text-muted font-medium">
        Vous ne reconnaissez plus ce service ?
      </span>
      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2.5">
          <Button variant="ghost" size="sm" onClick={() => trigger("pause")} disabled={isPending}>
            Mettre en pause
          </Button>
          <Button variant="ghost" size="sm" onClick={() => trigger("ignore")} disabled={isPending}>
            Ignorer définitivement
          </Button>
          <Button variant="pink" size="sm" onClick={() => trigger("cancel")} disabled={isPending}>
            Résilier ce service
          </Button>
        </div>
        {error && <p className="text-[12.5px] text-pink font-semibold">{error}</p>}
      </div>
    </>
  );
}
