import { DashboardIcon, TrendingUpIcon } from "@/components/icons";
import { formatAmount } from "@/lib/format";
import { getSubscriptionById, monthlyEquivalent } from "@/lib/subscriptions";

export function HeroMockupCard() {
  const clouddrive = getSubscriptionById("clouddrive-pro")!;
  const designsuite = getSubscriptionById("designsuite")!;
  const streamplus = getSubscriptionById("streamplus")!;

  const total =
    monthlyEquivalent(clouddrive) +
    monthlyEquivalent(designsuite) +
    monthlyEquivalent(streamplus);

  return (
    <div className="hard hard-hover bg-surface overflow-hidden cursor-default">
      <div className="flex items-center justify-between px-5 py-3.5 bg-ink">
        <span className="font-mono text-[12px] font-bold text-paper">
          Abonnements détectés
        </span>
        <span className="font-mono text-[11px] text-paper/70">
          Sync à l&apos;instant
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-3 px-[18px] py-4 border-b-[2px] border-ink">
          <span className="hard-sm w-[38px] h-[38px] bg-blue flex items-center justify-center shrink-0">
            <DashboardIcon className="w-[18px] h-[18px] text-blue-ink" />
          </span>
          <div className="flex-grow min-w-0">
            <div className="text-[14.5px] font-bold">{clouddrive.name}</div>
            <div className="text-[12.5px] text-text-faint">Mensuel · 14 sept.</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[14.5px] font-bold">{formatAmount(clouddrive.amount)}</div>
            <div className="font-mono text-[10px] font-bold text-blue">
              CONFIANCE ÉLEVÉE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-[18px] py-4 border-b-[2px] border-ink bg-yellow">
          <span className="hard-sm w-[38px] h-[38px] bg-surface flex items-center justify-center shrink-0">
            <TrendingUpIcon className="w-[18px] h-[18px] text-yellow-ink" />
          </span>
          <div className="flex-grow min-w-0">
            <div className="text-[14.5px] font-bold text-yellow-ink">{designsuite.name}</div>
            <div className="text-[12.5px] text-yellow-ink/75">
              {formatAmount(designsuite.previousAmount!)} → {formatAmount(designsuite.amount)}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[14.5px] font-bold text-yellow-ink">
              {formatAmount(designsuite.amount)}
            </div>
            <div className="font-mono text-[10px] font-bold text-yellow-ink">À VÉRIFIER</div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-[18px] py-4">
          <span className="hard-sm w-[38px] h-[38px] bg-blue flex items-center justify-center shrink-0">
            <DashboardIcon className="w-[18px] h-[18px] text-blue-ink" />
          </span>
          <div className="flex-grow min-w-0">
            <div className="text-[14.5px] font-bold">{streamplus.name}</div>
            <div className="text-[12.5px] text-text-faint">Annuel · 2 nov.</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[14.5px] font-bold">{formatAmount(streamplus.amount)}</div>
            <div className="font-mono text-[10px] font-bold text-text-faint">MOYENNE</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-[18px] py-4 border-t-[2.5px] border-ink">
        <span className="font-mono text-[12px] font-bold text-text-muted">Total mensuel</span>
        <span className="text-[19px] font-bold">{formatAmount(total)}</span>
      </div>
    </div>
  );
}
