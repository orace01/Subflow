import { cn } from "@/lib/cn";
import type { Confidence, SubscriptionStatus } from "@/lib/types";

const statusLabels: Record<SubscriptionStatus, string> = {
  actif: "Actif",
  "a-verifier": "À vérifier",
  "a-resilier": "À résilier",
  "en-pause": "En pause",
  ignore: "Ignoré",
};

const statusClasses: Record<SubscriptionStatus, string> = {
  actif: "bg-blue text-blue-ink",
  "a-verifier": "bg-surface text-yellow-ink border-[1.5px] border-ink",
  "a-resilier": "bg-pink text-pink-ink",
  "en-pause": "bg-paper-alt text-text-muted",
  ignore: "bg-paper-alt text-text-faint",
};

export function StatusBadge({ status }: { status: SubscriptionStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono uppercase tracking-wide text-[11px] font-bold px-2.5 py-1 border-[1.5px] border-ink whitespace-nowrap",
        statusClasses[status]
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

const confidenceLabels: Record<Confidence, string> = {
  elevee: "Confiance élevée",
  moyenne: "Confiance moyenne",
  "a-verifier": "À vérifier",
};

const confidenceClasses: Record<Confidence, string> = {
  elevee: "bg-blue text-blue-ink",
  moyenne: "bg-surface text-ink border-[1.5px] border-ink",
  "a-verifier": "bg-pink text-pink-ink",
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono uppercase tracking-wide text-[10px] font-bold px-2.5 py-1 whitespace-nowrap",
        confidenceClasses[confidence]
      )}
    >
      {confidenceLabels[confidence]}
    </span>
  );
}
