"use client";

import { useActionState } from "react";
import { resetPasswordAction, type ResetPasswordState } from "@/app/actions/password-reset";

const initialState: ResetPasswordState = {};

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, initialState);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4" noValidate>
      <input type="hidden" name="token" value={token} />

      <div>
        <label className="block text-[12.5px] font-bold mb-1.5">Nouveau mot de passe</label>
        <input
          type="password"
          name="password"
          className="w-full h-12 px-4 border-[2.5px] border-ink bg-surface text-[14.5px] font-sans"
        />
        {state.fieldErrors?.password && (
          <p className="text-[12.5px] text-pink font-semibold mt-1.5">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      {state.error && <p className="text-[13px] text-pink font-semibold">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 mt-2 text-[14.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--ink)] transition-[transform,box-shadow] duration-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {pending ? "Enregistrement…" : "Réinitialiser le mot de passe"}
      </button>
    </form>
  );
}
