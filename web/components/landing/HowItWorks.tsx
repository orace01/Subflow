import {
  LandmarkIcon,
  SearchIcon,
  CheckCircleIcon,
  CalendarIcon,
  BellIcon,
} from "@/components/icons";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    n: "01",
    icon: LandmarkIcon,
    title: "Connexion bancaire",
    body: "Autorisation sécurisée via un fournisseur Open Banking agréé.",
    span: "md:col-span-2",
  },
  {
    n: "02",
    icon: SearchIcon,
    title: "Détection",
    body: "Analyse des transactions pour repérer les paiements récurrents.",
    span: "md:col-span-2",
  },
  {
    n: "03",
    icon: CheckCircleIcon,
    title: "Confirmation",
    body: "Vous validez ou corrigez chaque abonnement détecté.",
    span: "md:col-span-2",
  },
  {
    n: "04",
    icon: CalendarIcon,
    title: "Calendrier",
    body: "Toutes vos prochaines échéances réunies au même endroit.",
    span: "md:col-span-3",
  },
  {
    n: "05",
    icon: BellIcon,
    title: "Alertes",
    body: "Une notification avant chaque échéance ou hausse de prix.",
    span: "md:col-span-3",
  },
];

export function HowItWorks() {
  return (
    <div className="bg-paper-alt">
    <div id="comment-ca-marche" className="max-w-[1400px] mx-auto px-8 pt-24 pb-20">
      <div className="max-w-[640px] mb-13">
        <h2 className="text-[34px] font-bold">Comment ça marche</h2>
        <p className="text-[16px] text-text-muted mt-3 leading-relaxed">
          Une expérience simple, du premier lien bancaire à la première alerte.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        {steps.map(({ n, icon: Icon, title, body, span }) => (
          <Card key={n} className={`p-6 ${span}`}>
            <span className="font-mono text-[12px] font-semibold text-text-faint">
              ÉTAPE {n}
            </span>
            <span className="w-[44px] h-[44px] rounded-xl bg-blue/10 flex items-center justify-center my-3.5">
              <Icon className="w-5 h-5 text-blue" />
            </span>
            <div className="text-[15px] font-bold">{title}</div>
            <p className="text-[13px] text-text-muted leading-relaxed mt-1.5">{body}</p>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
}
