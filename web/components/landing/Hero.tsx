import { LockIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { HeroMockupCard } from "./HeroMockupCard";

export function Hero() {
  return (
    <div className="max-w-[1400px] mx-auto px-8 pt-20 pb-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 font-mono uppercase text-[12.5px] font-bold px-3.5 py-1.5 bg-yellow text-yellow-ink border-[2px] border-ink -rotate-1">
            <LockIcon className="w-3.5 h-3.5" />
            Connexion bancaire sécurisée
          </div>
          <h1 className="mt-6">
            <span
              className="block text-6xl md:text-7xl font-black leading-none tracking-tight"
              style={{
                backgroundImage: "linear-gradient(90deg, #2563eb, #06b6d4)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              SubFlow
            </span>
            <span className="block text-[26px] leading-[1.3] font-bold mt-4">
              détecte vos abonnements,{" "}
              <span className="bg-yellow text-yellow-ink px-2 inline-block -rotate-1">
                anticipe vos prélèvements
              </span>{" "}
              et vous aide à éviter les dépenses oubliées.
            </span>
          </h1>
          <p className="text-[15.5px] leading-relaxed text-text-muted mt-5 mb-8 max-w-[560px]">
            Connectez votre compte, laissez SubFlow repérer vos paiements
            récurrents, et gardez le contrôle sur ce que vous payez vraiment,
            mois après mois.
          </p>
          <div className="flex gap-4 flex-wrap">
            <LinkButton href="/onboarding/connexion" variant="primary">
              Démarrer l&apos;essai gratuit de 3 mois
            </LinkButton>
            <LinkButton href="#comment-ca-marche" variant="ghost">
              Comment ça marche
            </LinkButton>
          </div>
          <p className="font-mono text-[12px] text-text-faint font-semibold mt-4">
            Sans carte bancaire · résiliable à tout moment
          </p>
        </div>

        <HeroMockupCard />
      </div>
    </div>
  );
}
