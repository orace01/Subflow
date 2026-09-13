"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  addSubscriptionAction,
  updateSubscriptionAction,
  type AddSubscriptionState,
} from "@/app/actions/subscriptions";
import { PlusIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { Frequency } from "@/lib/types";

const initialState: AddSubscriptionState = {};

const CATEGORY_SUGGESTIONS = [
  "Streaming",
  "Cloud & Stockage",
  "Productivité",
  "Sport & Bien-être",
  "Presse",
  "Sécurité",
  "Éducation",
  "Autres",
];

export interface EditableSubscriptionValues {
  name: string;
  category: string;
  amount: number;
  frequency: Frequency;
  nextChargeDate: string; // yyyy-mm-dd
}

interface AddSubscriptionFormProps {
  compact?: boolean;
  subscriptionId?: string;
  initialValues?: EditableSubscriptionValues;
  onSuccess?: () => void;
}

export function AddSubscriptionForm({
  compact = false,
  subscriptionId,
  initialValues,
  onSuccess,
}: AddSubscriptionFormProps) {
  const isEdit = Boolean(subscriptionId);
  const action = isEdit ? updateSubscriptionAction.bind(null, subscriptionId!) : addSubscriptionAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.success) {
      if (!isEdit) formRef.current?.reset();
      onSuccess?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className={cn("flex flex-col gap-4", !compact && "hard-sm bg-surface p-6")}>
      {!compact && (
        <h3 className="text-[15px] font-bold -mb-1">
          {isEdit ? "Modifier l'abonnement" : "Ajouter un abonnement"}
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12.5px] font-bold mb-1.5">Nom du service</label>
          <input
            type="text"
            name="name"
            defaultValue={initialValues?.name}
            placeholder="Netflix, Adobe…"
            className={cn(
              "w-full h-11 px-3.5 border-[2px] bg-paper text-[14px] font-sans",
              errors.name ? "border-pink" : "border-ink"
            )}
          />
          {errors.name && <p className="text-[12px] text-pink font-semibold mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-[12.5px] font-bold mb-1.5">Catégorie</label>
          <input
            type="text"
            name="category"
            defaultValue={initialValues?.category}
            list="category-suggestions"
            placeholder="Streaming, Productivité…"
            className={cn(
              "w-full h-11 px-3.5 border-[2px] bg-paper text-[14px] font-sans",
              errors.category ? "border-pink" : "border-ink"
            )}
          />
          <datalist id="category-suggestions">
            {CATEGORY_SUGGESTIONS.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          {errors.category && (
            <p className="text-[12px] text-pink font-semibold mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-[12.5px] font-bold mb-1.5">Montant (€)</label>
          <input
            type="text"
            inputMode="decimal"
            name="amount"
            defaultValue={initialValues?.amount}
            placeholder="9,99"
            className={cn(
              "w-full h-11 px-3.5 border-[2px] bg-paper text-[14px] font-sans",
              errors.amount ? "border-pink" : "border-ink"
            )}
          />
          {errors.amount && <p className="text-[12px] text-pink font-semibold mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-[12.5px] font-bold mb-1.5">Fréquence</label>
          <select
            name="frequency"
            defaultValue={initialValues?.frequency ?? "mensuel"}
            className="w-full h-11 px-3.5 border-[2px] border-ink bg-paper text-[14px] font-sans"
          >
            <option value="mensuel">Mensuel</option>
            <option value="annuel">Annuel</option>
            <option value="irregulier">Irrégulier</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[12.5px] font-bold mb-1.5">Prochain prélèvement</label>
          <input
            type="date"
            name="nextChargeDate"
            defaultValue={initialValues?.nextChargeDate}
            className={cn(
              "w-full h-11 px-3.5 border-[2px] bg-paper text-[14px] font-sans",
              errors.nextChargeDate ? "border-pink" : "border-ink"
            )}
          />
          {errors.nextChargeDate && (
            <p className="text-[12px] text-pink font-semibold mt-1">{errors.nextChargeDate}</p>
          )}
        </div>
      </div>

      {state.error && <p className="text-[13px] text-pink font-semibold">{state.error}</p>}
      {state.success && !isEdit && (
        <p className="text-[13px] text-blue font-semibold">Abonnement ajouté.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 h-11 px-5 text-[13.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[3px_3px_0_0_var(--ink)] hover:shadow-[5px_5px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--ink)] transition-[transform,box-shadow] duration-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-fit"
      >
        {isEdit ? null : <PlusIcon className="w-4 h-4" />}
        {pending ? (isEdit ? "Enregistrement…" : "Ajout…") : isEdit ? "Enregistrer" : "Ajouter"}
      </button>
    </form>
  );
}
