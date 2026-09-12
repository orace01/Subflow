import Link from "next/link";
import { LogoMarkIcon, SearchIcon, LockIcon, UserCheckIcon, TrashIcon } from "@/components/icons";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { EmailProviderList } from "@/components/onboarding/EmailProviderList";

export const metadata = { title: "Connexion e-mail · SubFlow" };

export default function ConnexionEmailPage() {
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
        <div className="max-w-[640px] w-full">
          <span className="hard-sm w-14 h-14 bg-blue flex items-center justify-center mx-auto mb-5">
            <SearchIcon className="w-6 h-6 text-blue-ink" />
          </span>
          <h1 className="text-[30px] font-bold text-center">Connectez votre boîte mail</h1>
          <p className="text-[15px] text-text-muted mt-3 text-center leading-relaxed">
            SubFlow analyse vos reçus et confirmations d&apos;abonnement
            (Netflix, Spotify, Adobe, etc.) pour détecter vos paiements
            récurrents. Nous ne lisons que les e-mails de facturation, jamais
            votre courrier personnel.
          </p>

          <EmailProviderList />

          <div className="flex flex-wrap gap-4 justify-center mt-8 pt-6 border-t-2 border-ink">
            <div className="flex items-center gap-2 text-[12.5px] text-text-muted font-medium">
              <LockIcon className="w-[15px] h-[15px]" />
              Accès lecture seule
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-text-muted font-medium">
              <UserCheckIcon className="w-[15px] h-[15px]" />
              Consentement explicite
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-text-muted font-medium">
              <TrashIcon className="w-[15px] h-[15px]" />
              Déconnexion à tout moment
            </div>
          </div>

          <p className="font-mono text-[10.5px] text-text-faint text-center font-semibold mt-5">
            AUCUN E-MAIL N&apos;EST JAMAIS PARTAGÉ NI REVENDU
          </p>
        </div>
      </div>
    </div>
  );
}
