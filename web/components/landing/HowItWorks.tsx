import {
  UserCheckIcon,
  MailIcon,
  SearchIcon,
  CheckCircleIcon,
  BellIcon,
} from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    n: "01",
    icon: UserCheckIcon,
    title: "Créer un compte",
    body: "Choisissez votre offre et créez votre compte en quelques secondes.",
    span: "md:col-span-2",
  },
  {
    n: "02",
    icon: MailIcon,
    title: "Connexion e-mail",
    body: "Connectez votre boîte mail (Gmail, Outlook) en un clic.",
    span: "md:col-span-2",
  },
  {
    n: "03",
    icon: SearchIcon,
    title: "Détection",
    body: "Analyse de vos reçus et factures pour repérer les paiements récurrents.",
    span: "md:col-span-2",
  },
  {
    n: "04",
    icon: CheckCircleIcon,
    title: "Confirmation",
    body: "Vous validez ou corrigez chaque abonnement détecté.",
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
      <Reveal>
        <div className="max-w-[640px] mb-13">
          <h2 className="text-[34px] font-bold">Comment ça marche</h2>
          <p className="text-[16px] text-text-muted mt-3 leading-relaxed">
            Une expérience simple, de la connexion de votre boîte mail à la première alerte.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        {steps.map(({ n, icon: Icon, title, body, span }, i) => (
          <Reveal key={n} delayMs={i * 80} className={span}>
            <Card className="group hard-sm hard-hover p-6 h-full cursor-default">
              <span className="font-mono text-[12px] font-semibold text-text-faint">
                ÉTAPE {n}
              </span>
              <span className="w-[44px] h-[44px] rounded-xl bg-blue/10 flex items-center justify-center my-3.5 transition-transform duration-300 group-hover:scale-110">
                <Icon className="w-5 h-5 text-blue" />
              </span>
              <div className="text-[15px] font-bold">{title}</div>
              <p className="text-[13px] text-text-muted leading-relaxed mt-1.5">{body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
    </div>
  );
}
