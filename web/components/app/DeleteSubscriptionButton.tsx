"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@/components/icons";
import { deleteSubscriptionAction } from "@/app/actions/subscriptions";

export function DeleteSubscriptionButton({ subscriptionId }: { subscriptionId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteSubscriptionAction(subscriptionId);
      if (result.error) {
        setError(result.error);
        setConfirming(false);
        return;
      }
      router.push("/abonnements");
    });
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2.5">
        <span className="text-[13px] font-semibold text-pink">Supprimer définitivement ?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-[12.5px] font-bold px-3 py-1.5 border-[2px] border-ink bg-pink text-pink-ink cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? "Suppression…" : "Confirmer"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="text-[12.5px] font-bold px-3 py-1.5 border-[2px] border-ink bg-surface text-ink cursor-pointer disabled:cursor-not-allowed"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        onClick={() => setConfirming(true)}
        className="flex items-center gap-1.5 text-[12.5px] font-bold text-text-faint hover:text-pink cursor-pointer"
      >
        <TrashIcon className="w-3.5 h-3.5" />
        Supprimer cet abonnement
      </button>
      {error && <p className="text-[12.5px] text-pink font-semibold">{error}</p>}
    </div>
  );
}
