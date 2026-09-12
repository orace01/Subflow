"use client";

import { useActionState } from "react";
import { signupAction, type FormState } from "@/app/actions/auth";
import { cn } from "@/lib/cn";

const initialState: FormState = {};

export function SignupForm({ plan }: { plan: string }) {
  const [state, formAction, pending] = useActionState(signupAction, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[12.5px] font-bold mb-1.5">Prénom</label>
          <input
            type="text"
            name="firstName"
            className={cn(
              "w-full h-12 px-4 border-[2.5px] bg-surface text-[14.5px] font-sans",
              errors.firstName ? "border-pink" : "border-ink"
            )}
          />
          {errors.firstName && (
            <p className="text-[12px] text-pink font-semibold mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-[12.5px] font-bold mb-1.5">Nom</label>
          <input
            type="text"
            name="lastName"
            className={cn(
              "w-full h-12 px-4 border-[2.5px] bg-surface text-[14.5px] font-sans",
              errors.lastName ? "border-pink" : "border-ink"
            )}
          />
          {errors.lastName && (
            <p className="text-[12px] text-pink font-semibold mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-[12.5px] font-bold mb-1.5">E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="vous@exemple.com"
          className={cn(
            "w-full h-12 px-4 border-[2.5px] bg-surface text-[14.5px] font-sans",
            errors.email ? "border-pink" : "border-ink"
          )}
        />
        {errors.email && <p className="text-[12px] text-pink font-semibold mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-[12.5px] font-bold mb-1.5">Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="8 caractères minimum"
          className={cn(
            "w-full h-12 px-4 border-[2.5px] bg-surface text-[14.5px] font-sans",
            errors.password ? "border-pink" : "border-ink"
          )}
        />
        {errors.password && (
          <p className="text-[12px] text-pink font-semibold mt-1">{errors.password}</p>
        )}
      </div>

      <input type="hidden" name="plan" value={plan} />

      {state.error && <p className="text-[13px] text-pink font-semibold">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 mt-2 text-[14.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--ink)] transition-[transform,box-shadow] duration-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {pending ? "Création…" : "Créer mon compte"}
      </button>
    </form>
  );
}
