import Link from "next/link";
import { LogoMarkIcon } from "@/components/icons";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { ConfirmationList } from "@/components/onboarding/ConfirmationList";

export const metadata = { title: "Confirmez vos abonnements · SubFlow" };

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b-[2.5px] border-ink px-8 py-5">
        <div className="max-w-[760px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="hard-sm w-[30px] h-[30px] bg-blue flex items-center justify-center">
              <LogoMarkIcon className="w-4 h-4 text-blue-ink" />
            </span>
            <span className="font-display font-bold text-[17px]">SubFlow</span>
          </Link>
          <div className="font-mono text-[11px] font-bold text-text-faint">ÉTAPE 3 SUR 4</div>
        </div>
      </div>

      <div className="px-8 pt-6">
        <OnboardingStepper activeStep={3} maxWidth={760} />
      </div>

      <div className="flex-1 px-8 pt-10 pb-24">
        <div className="max-w-[760px] mx-auto">
          <h1 className="text-[28px] font-bold">Confirmez vos abonnements détectés</h1>
          <p className="text-[14.5px] text-text-muted mt-2.5 leading-relaxed">
            Nous avons trouvé 9 paiements récurrents dans vos 90 derniers
            jours de transactions. Vérifiez chacun avant de continuer — vous
            pourrez toujours les modifier plus tard.
          </p>

          <ConfirmationList />
        </div>
      </div>
    </div>
  );
}
