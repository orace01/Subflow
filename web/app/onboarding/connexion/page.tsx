import Link from "next/link";
import { LogoMarkIcon, SearchIcon, LockIcon, UserCheckIcon, TrashIcon, CheckIcon, ChevronRightIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";

export const metadata = { title: "Connexion bancaire · SubFlow" };

const banks = [
  { initials: "BN", name: "Banque Nationale", selected: false },
  { initials: "CR", name: "Crédit Régional", selected: false },
  { initials: "NB", name: "NéoBanque+", selected: true },
  { initials: "EP", name: "Épargne & Associés", selected: false },
];

export default function ConnexionBancairePage() {
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
        <div className="max-w-[640px] w-full">
          <h1 className="text-[30px] font-bold text-center">Connectez votre compte bancaire</h1>
          <p className="text-[15px] text-text-muted mt-3 text-center leading-relaxed">
            SubFlow analyse vos transactions via un fournisseur Open Banking
            agréé pour détecter vos abonnements. Vos identifiants bancaires ne
            sont jamais stockés par SubFlow.
          </p>

          <div className="relative mt-8">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-faint" />
            <input
              type="text"
              placeholder="Rechercher votre banque"
              className="w-full h-13 pl-[46px] pr-4 border-[2.5px] border-ink bg-surface text-[14.5px] font-sans"
            />
          </div>

          <div className="flex flex-col gap-3 mt-5">
            {banks.map((b) => (
              <div
                key={b.name}
                className={`hard-sm px-4.5 py-4 flex items-center gap-3.5 cursor-pointer ${
                  b.selected ? "bg-blue" : "bg-surface"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-[13px] ${
                    b.selected ? "bg-surface text-ink" : "bg-paper-alt"
                  }`}
                >
                  {b.initials}
                </div>
                <span
                  className={`text-[14.5px] font-semibold flex-grow ${
                    b.selected ? "text-blue-ink" : ""
                  }`}
                >
                  {b.name}
                </span>
                {b.selected ? (
                  <CheckIcon className="w-[18px] h-[18px] text-blue-ink" />
                ) : (
                  <ChevronRightIcon className="w-[18px] h-[18px] text-text-faint" />
                )}
              </div>
            ))}
            <a href="#" className="text-center text-[13.5px] font-semibold mt-1">
              Voir toutes les banques (120+)
            </a>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-8 pt-6 border-t-2 border-ink">
            <div className="flex items-center gap-2 text-[12.5px] text-text-muted font-medium">
              <LockIcon className="w-[15px] h-[15px]" />
              Tokenisation &amp; chiffrement
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-text-muted font-medium">
              <UserCheckIcon className="w-[15px] h-[15px]" />
              Consentement explicite
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-text-muted font-medium">
              <TrashIcon className="w-[15px] h-[15px]" />
              Suppression à tout moment
            </div>
          </div>

          <LinkButton href="/onboarding/confirmation" variant="primary" className="w-full mt-6">
            Continuer en toute sécurité
          </LinkButton>
          <p className="font-mono text-[10.5px] text-text-faint text-center font-semibold mt-3.5">
            PROPULSÉ PAR BRIDGE / POWENS — CONFORME OPEN BANKING
          </p>
        </div>
      </div>
    </div>
  );
}
