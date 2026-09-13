import Link from "next/link";
import { LogoMarkIcon } from "@/components/icons";
import { ForgotPasswordForm } from "@/components/onboarding/ForgotPasswordForm";

export const metadata = { title: "Mot de passe oublié · SubFlow" };

export default function MotDePasseOubliePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b-[2.5px] border-ink px-8 py-5">
        <div className="max-w-[440px] mx-auto flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="hard-sm w-[30px] h-[30px] bg-blue flex items-center justify-center">
              <LogoMarkIcon className="w-4 h-4 text-blue-ink" />
            </span>
            <span className="font-display font-bold text-[17px]">SubFlow</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-[440px] w-full">
          <h1 className="text-[30px] font-bold text-center">Mot de passe oublié</h1>
          <p className="text-[15px] text-text-muted mt-3 text-center leading-relaxed">
            Indiquez votre e-mail, on vous envoie un lien pour en choisir un nouveau.
          </p>

          <ForgotPasswordForm />

          <p className="text-[13px] text-text-muted text-center mt-5">
            <Link href="/connexion" className="font-semibold">
              ← Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
