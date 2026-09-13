import Link from "next/link";
import { LogoMarkIcon } from "@/components/icons";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { MethodChoice } from "@/components/onboarding/MethodChoice";

export const metadata = { title: "Comment suivre vos abonnements · SubFlow" };

export default function MethodePage() {
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

      <div className="flex-1 flex items-start justify-center px-8 pt-12 pb-16">
        <MethodChoice />
      </div>
    </div>
  );
}
