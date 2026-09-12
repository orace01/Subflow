import { LinkButton } from "@/components/ui/Button";

export function ClosingCta() {
  return (
    <div className="bg-surface">
    <div className="max-w-[1400px] mx-auto px-8 py-24">
      <div className="hard bg-blue px-10 py-16 text-center">
        <h2 className="text-[32px] font-bold text-blue-ink">
          Reprenez le contrôle de vos abonnements dès aujourd&apos;hui
        </h2>
        <p className="text-[15.5px] text-blue-ink/85 mt-3.5 max-w-[480px] mx-auto font-medium">
          Connexion e-mail sécurisée, détection automatique, alertes
          préventives. Sans carte requise pour l&apos;essai.
        </p>
        <LinkButton
          href="/inscription?plan=essai"
          variant="ghost"
          className="mt-7 !bg-yellow !text-yellow-ink"
        >
          Démarrer l&apos;essai gratuit de 3 mois
        </LinkButton>
      </div>
    </div>
    </div>
  );
}
