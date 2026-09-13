import Link from "next/link";
import { LogoMarkIcon } from "@/components/icons";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { MethodChoice } from "@/components/onboarding/MethodChoice";

export const metadata = { title: "Comment suivre vos abonnements · SubFlow" };

export default async function MethodePage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await searchParams;

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
          <div className="font-mono text-[11px] font-bold text-text-faint">ÉTAPE 2 SUR 4</div>
        </div>
      </div>

      <div className="px-8 pt-6">
        <OnboardingStepper activeStep={2} />
      </div>

      <div className="flex-1 flex flex-col items-center px-8 pt-12 pb-16">
        {checkout === "unavailable" && (
          <div className="hard-sm bg-surface border-[2px] border-ink px-4.5 py-3 mb-6 max-w-[640px] w-full text-[13px] font-semibold text-center">
            Le paiement en ligne (Pro/Annuel) n&apos;est pas encore disponible. Votre compte est
            actif sur l&apos;essai gratuit en attendant.
          </div>
        )}
        {checkout === "error" && (
          <div className="hard-sm bg-yellow px-4.5 py-3 mb-6 max-w-[640px] w-full text-[13px] font-semibold text-yellow-ink text-center">
            Le paiement n&apos;a pas pu être initié. Votre compte reste actif sur l&apos;essai
            gratuit — vous pourrez repasser en Pro depuis les paramètres.
          </div>
        )}
        {checkout === "cancel" && (
          <div className="hard-sm bg-surface border-[2px] border-ink px-4.5 py-3 mb-6 max-w-[640px] w-full text-[13px] font-semibold text-center">
            Paiement annulé. Votre compte reste actif sur l&apos;essai gratuit.
          </div>
        )}
        <MethodChoice />
      </div>
    </div>
  );
}
