import { LockIcon, UserCheckIcon, TrashIcon } from "@/components/icons";

const items = [
  { icon: LockIcon, label: "Tokenisation & chiffrement" },
  { icon: UserCheckIcon, label: "Consentement explicite" },
  { icon: TrashIcon, label: "Suppression des données" },
];

export function TrustBar() {
  return (
    <div className="border-y-[2.5px] border-ink bg-ink">
      <div className="max-w-[1400px] mx-auto px-8 py-4.5 flex flex-wrap items-center justify-center gap-6">
        {items.map(({ icon: Icon, label }, i) => (
          <div key={label} className="flex items-center gap-4 last:gap-0">
            <div className="font-mono flex items-center gap-2 text-paper text-[12.5px] font-bold">
              <Icon className="w-4 h-4 text-paper" />
              {label}
            </div>
            {i < items.length - 1 && (
              <span className="w-0.5 h-4 bg-paper/40 ml-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
