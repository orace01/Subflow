import Link from "next/link";
import { LogoMarkIcon, CheckIcon } from "@/components/icons";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { SignupForm } from "@/components/onboarding/SignupForm";

export const metadata = { title: "Créer un compte · SubFlow" };

const PLAN_LABELS: Record<string, { name: string; detail: string }> = {
  essai: { name: "Essai gratuit", detail: "3 mois, accès complet aux fonctionnalités Pro" },
  gratuit: { name: "Offre Gratuite", detail: "Jusqu'à 5 abonnements suivis" },
  pro: { name: "Offre Pro", detail: "6,99 € / mois, abonnements illimités" },
  annuel: { name: "Offre Annuelle", detail: "59 € / an, tarif préférentiel" },
};

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planParam } = await searchParams;
  const plan = planParam && PLAN_LABELS[planParam] ? planParam : "essai";
  const planInfo = PLAN_LABELS[plan];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b-[2.5px] border-ink px-8 py-5">
        <div className="max-w-[640px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="hard-sm w-[30px] h-[30px] bg-blue flex items-center justify-center">
              <LogoMarkIcon className="w-4 h-4 text-blue-ink" />
            </span>
            <span className="font-display font-bold text-[17px]">SubFlow</span>
          </Link>
          <div className="font-mono text-[11px] font-bold text-text-faint">ÉTAPE 1 SUR 4</div>
        </div>
      </div>

      <div className="px-8 pt-6">
        <OnboardingStepper activeStep={1} />
      </div>

      <div className="flex-1 flex items-start justify-center px-8 pt-12 pb-16">
        <div className="max-w-[440px] w-full">
          <h1 className="text-[30px] font-bold text-center">Créez votre compte</h1>
          <p className="text-[15px] text-text-muted mt-3 text-center leading-relaxed">
            Quelques informations pour démarrer, puis on connecte votre boîte
            mail à l&apos;étape suivante.
          </p>

          <div className="hard-sm bg-blue px-4.5 py-3.5 flex items-center gap-3 mt-6">
            <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
              <CheckIcon className="w-4 h-4 text-blue" />
            </span>
            <div>
              <div className="text-[13.5px] font-bold text-blue-ink">{planInfo.name}</div>
              <div className="text-[12px] text-blue-ink/80">{planInfo.detail}</div>
            </div>
          </div>

          <SignupForm plan={plan} />

          <p className="text-[13px] text-text-muted text-center mt-5">
            Déjà un compte ?{" "}
            <Link href="/connexion" className="font-semibold">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
