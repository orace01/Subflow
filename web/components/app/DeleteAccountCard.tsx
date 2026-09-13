"use client";

import { useActionState, useState } from "react";
import { Card } from "@/components/ui/Card";
import { deleteAccountAction, type DeleteAccountState } from "@/app/actions/auth";

const initialState: DeleteAccountState = {};

export function DeleteAccountCard() {
  const [confirming, setConfirming] = useState(false);
  const [state, formAction, pending] = useActionState(deleteAccountAction, initialState);

  if (!confirming) {
    return (
      <Card className="p-6.5 mt-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-[14px] font-bold">Supprimer mon compte</div>
          <div className="text-[12.5px] text-text-faint mt-0.5">
            Supprime définitivement votre compte et tous vos abonnements suivis.
          </div>
        </div>
        <button
          onClick={() => setConfirming(true)}
          className="inline-flex items-center justify-center gap-2 h-9 px-3.5 text-[12.5px] font-bold font-display bg-surface text-pink border-[2.5px] border-pink cursor-pointer"
        >
          Supprimer
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-6.5 mt-4">
      <div className="text-[14px] font-bold text-pink">Supprimer définitivement mon compte</div>
      <p className="text-[12.5px] text-text-faint mt-1.5 leading-relaxed">
        Cette action est irréversible : votre compte et tous vos abonnements suivis seront
        effacés. Confirmez avec votre mot de passe.
      </p>

      <form action={formAction} className="flex flex-col gap-3 mt-4">
        <input
          type="password"
          name="password"
          placeholder="Votre mot de passe"
          className="w-full h-11 px-3.5 border-[2px] border-ink bg-paper text-[14px] font-sans"
        />
        {state.error && <p className="text-[12.5px] text-pink font-semibold">{state.error}</p>}
        <div className="flex gap-2.5">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 h-9 px-3.5 text-[12.5px] font-bold font-display bg-pink text-pink-ink border-[2.5px] border-ink cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Suppression…" : "Confirmer la suppression"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 h-9 px-3.5 text-[12.5px] font-bold font-display bg-surface text-ink border-[2.5px] border-ink cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </form>
    </Card>
  );
}
