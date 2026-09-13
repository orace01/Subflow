"use client";

import { useActionState } from "react";
import { requestPasswordResetAction, type RequestResetState } from "@/app/actions/password-reset";

const initialState: RequestResetState = {};

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, initialState);

  if (state.success) {
    return (
      <p className="mt-8 text-[14.5px] text-text-muted leading-relaxed">
        Si un compte existe avec cette adresse, un e-mail avec un lien de réinitialisation vient
        de vous être envoyé. Pensez à vérifier vos spams.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4" noValidate>
      <div>
        <label className="block text-[12.5px] font-bold mb-1.5">E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="vous@exemple.com"
          className="w-full h-12 px-4 border-[2.5px] border-ink bg-surface text-[14.5px] font-sans"
        />
      </div>

      {state.error && <p className="text-[13px] text-pink font-semibold">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 mt-2 text-[14.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--ink)] transition-[transform,box-shadow] duration-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {pending ? "Envoi…" : "Envoyer le lien de réinitialisation"}
      </button>
    </form>
  );
}
