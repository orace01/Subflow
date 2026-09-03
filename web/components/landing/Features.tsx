import {
  SearchIcon,
  DashboardIcon,
  TagIcon,
  BellIcon,
  TrendingUpIcon,
} from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const features = [
  {
    icon: SearchIcon,
    title: "Détection automatique",
    body: "Abonnements mensuels, annuels ou irréguliers, même à montant variable, avec un niveau de confiance affiché.",
    span: "md:col-span-2",
  },
  {
    icon: DashboardIcon,
    title: "Tableau de bord & analytics",
    body: "Dépenses par mois et par an, répartition par catégorie, abonnements les plus coûteux et calendrier.",
    span: "md:col-span-2",
  },
  {
    icon: TagIcon,
    title: "Gestion & statuts",
    body: "Actif, à vérifier, à résilier, en pause ou ignoré : chaque abonnement garde son statut.",
    span: "md:col-span-2",
  },
  {
    icon: BellIcon,
    title: "Système d'alertes",
    body: "Notifications par e-mail avant les prélèvements importants : service, montant et date estimée.",
    span: "md:col-span-3",
  },
  {
    icon: TrendingUpIcon,
    title: "Détection des hausses de prix",
    body: "Repérez immédiatement quand un abonnement passe, par exemple, de 9,99 € à 12,99 €.",
    span: "md:col-span-3",
    accent: true,
  },
];

export function Features() {
  return (
    <div className="bg-paper">
    <div id="fonctionnalites" className="max-w-[1400px] mx-auto px-8 pt-24 pb-20">
      <div className="max-w-[640px] mb-13">
        <h2 className="text-[34px] font-bold">
          Tout ce qu&apos;il faut pour garder le contrôle
        </h2>
        <p className="text-[16px] text-text-muted mt-3 leading-relaxed">
          Cinq fonctionnalités pensées pour la clarté, pas pour la complexité.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        {features.map(({ icon: Icon, title, body, span, accent }) => (
          <Card
            key={title}
            className={cn(
              "hard-sm p-6.5",
              span,
              accent && "border-yellow-ink/40 bg-yellow/25"
            )}
          >
            <span
              className={cn(
                "hard-xs w-10 h-10 flex items-center justify-center mb-4",
                accent ? "bg-surface" : "bg-blue/10"
              )}
            >
              <Icon className={cn("w-5 h-5", accent ? "text-yellow-ink" : "text-blue")} />
            </span>
            <h3 className="text-[16.5px] font-bold mb-2">{title}</h3>
            <p className="text-[14px] text-text-muted leading-relaxed">{body}</p>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
}
