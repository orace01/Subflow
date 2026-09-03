import { SearchIcon, BellIcon, TagIcon } from "@/components/icons";

const props = [
  {
    icon: SearchIcon,
    title: "Détecter automatiquement",
    body: "Paiements récurrents, mensuels, annuels ou irréguliers, avec un niveau de confiance clair pour chaque détection.",
  },
  {
    icon: BellIcon,
    title: "Prévenir au bon moment",
    body: "Une alerte avant chaque prélèvement important, montant, date estimée et évolution de prix si elle existe.",
  },
  {
    icon: TagIcon,
    title: "Décider en confiance",
    body: "Gardez, surveillez ou résiliez chaque abonnement, avec un statut qui reflète votre décision réelle.",
  },
];

export function ValueProps() {
  return (
    <div className="bg-surface">
    <div className="max-w-[1400px] mx-auto px-8 pt-22 pb-20">
      <div className="max-w-[640px] mb-13">
        <h2 className="text-[34px] font-bold">Pas un énième tableau de dépenses</h2>
        <p className="text-[16px] text-text-muted mt-3 leading-relaxed">
          SubFlow ne se contente pas d&apos;enregistrer vos abonnements : il
          vous aide à agir avant le prélèvement.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[2.5px] border-ink divide-x-[2.5px] divide-ink">
        {props.map(({ icon: Icon, title, body }) => (
          <div key={title} className="p-7">
            <span className="hard-sm w-[46px] h-[46px] bg-blue flex items-center justify-center mb-4.5">
              <Icon className="w-5 h-5 text-blue-ink" />
            </span>
            <h3 className="text-[19px] font-bold mb-2">{title}</h3>
            <p className="text-[14.5px] text-text-muted leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
