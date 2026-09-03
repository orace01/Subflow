import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const proFeatures = [
  "Abonnements illimités",
  "Plusieurs comptes bancaires",
  "Notifications Telegram / SMS",
  "Détection des hausses de prix",
  "Règles d'alerte personnalisées",
];

const freeFeatures = [
  "Jusqu'à 5 abonnements suivis",
  "Tableau de bord simple",
  "Alertes e-mail de base",
];

function FeatureRow({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex gap-2 text-[13.5px] font-medium",
        dark ? "text-blue-ink" : "text-text-muted"
      )}
    >
      <CheckIcon className={cn("w-[15px] h-[15px] shrink-0 mt-0.5", dark ? "text-blue-ink" : "text-ink")} />
      {label}
    </div>
  );
}

export function PricingSection() {
  return (
    <div className="bg-paper-alt">
    <div id="tarifs" className="max-w-[1400px] mx-auto px-8 pt-24 pb-20">
      <div className="max-w-[640px] mb-12">
        <h2 className="text-[34px] font-bold">Un modèle simple, sans piège</h2>
        <p className="text-[16px] text-text-muted mt-3 leading-relaxed">
          Découvrez SubFlow gratuitement, puis choisissez la formule adaptée à
          votre usage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-stretch">
        {/* Essai gratuit */}
        <div className="hard bg-blue p-6.5 flex flex-col relative">
          <span className="font-mono hard-xs absolute -top-4 left-5 bg-yellow text-yellow-ink text-[11px] font-bold px-3 py-1.5 -rotate-3">
            RECOMMANDÉ
          </span>
          <div className="font-mono text-[13px] font-bold mt-2.5 text-blue-ink">
            ESSAI GRATUIT
          </div>
          <div className="text-[30px] font-bold mt-2.5 text-blue-ink">3 mois</div>
          <div className="font-mono text-[11.5px] text-blue-ink/75 mb-4.5">
            ACCÈS COMPLET
          </div>
          <p className="text-[13.5px] text-blue-ink/90 leading-relaxed mb-4.5 font-medium">
            Toutes les fonctionnalités Pro, pour mesurer la vraie valeur de
            SubFlow.
          </p>
          <LinkButton
            href="/onboarding/connexion"
            variant="ghost"
            className="mt-auto !bg-yellow !text-yellow-ink"
          >
            Démarrer l&apos;essai
          </LinkButton>
        </div>

        {/* Gratuit */}
        <Card className="hard-sm p-6.5 flex flex-col">
          <div className="font-mono text-[13px] font-bold mt-2.5 text-text-faint">
            GRATUIT
          </div>
          <div className="text-[30px] font-bold mt-2.5">0 €</div>
          <div className="font-mono text-[11.5px] text-text-faint mb-4.5">
            APRÈS L&apos;ESSAI
          </div>
          <div className="flex flex-col gap-2.5 mb-4.5">
            {freeFeatures.map((f) => (
              <FeatureRow key={f} label={f} />
            ))}
          </div>
          <LinkButton href="/onboarding/connexion" variant="ghost" className="mt-auto">
            Continuer gratuitement
          </LinkButton>
        </Card>

        {/* Pro */}
        <Card className="hard-sm p-6.5 flex flex-col">
          <div className="font-mono text-[13px] font-bold mt-2.5 text-text-faint">PRO</div>
          <div className="text-[30px] font-bold mt-2.5">
            6,99 €<span className="text-[14px] font-semibold text-text-faint"> /mois</span>
          </div>
          <div className="font-mono text-[11.5px] text-text-faint mb-4.5">
            FACTURÉ MENSUELLEMENT
          </div>
          <div className="flex flex-col gap-2.5 mb-4.5">
            {proFeatures.map((f) => (
              <FeatureRow key={f} label={f} />
            ))}
          </div>
          <LinkButton href="/onboarding/connexion" variant="ghost" className="mt-auto">
            Passer en Pro
          </LinkButton>
        </Card>

        {/* Annuel */}
        <Card className="hard-sm p-6.5 flex flex-col">
          <div className="font-mono text-[13px] font-bold mt-2.5 text-text-faint">
            ANNUEL
          </div>
          <div className="text-[30px] font-bold mt-2.5">
            59 €<span className="text-[14px] font-semibold text-text-faint"> /an</span>
          </div>
          <div className="font-mono text-[11.5px] text-ink bg-yellow inline-block px-2 py-0.5 mb-4.5 w-fit">
            TARIF PRÉFÉRENTIEL
          </div>
          <p className="text-[13.5px] text-text-muted leading-relaxed mb-4.5 font-medium">
            Toutes les fonctionnalités Pro, engagement annuel, pour les
            utilisateurs convaincus sur la durée.
          </p>
          <LinkButton href="/onboarding/connexion" variant="ghost" className="mt-auto">
            Choisir l&apos;offre annuelle
          </LinkButton>
        </Card>
      </div>
    </div>
    </div>
  );
}
