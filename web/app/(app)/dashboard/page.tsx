import { Topbar } from "@/components/app/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RefreshIcon } from "@/components/icons";
import Link from "next/link";
import { formatAmount, dayOfMonth, monthLabel3 } from "@/lib/format";
import {
  getSubscriptions,
  computeMonthlyTotal,
  computeAnnualEstimate,
  computeCategoryBreakdown,
  computeTopSpenders,
  computeStatusCounts,
  computeUpcomingCharges,
} from "@/lib/subscriptions";

export const metadata = { title: "Tableau de bord · SubFlow" };

export default function DashboardPage() {
  const subs = getSubscriptions();
  const monthlyTotal = computeMonthlyTotal(subs);
  const annualEstimate = computeAnnualEstimate(subs);
  const categories = computeCategoryBreakdown(subs);
  const maxCategory = Math.max(...categories.map((c) => c.amount));
  const topSpenders = computeTopSpenders(subs, 3);
  const statusCounts = computeStatusCounts(subs);
  const upcoming = computeUpcomingCharges(subs, 3);

  return (
    <>
      <Topbar title="Tableau de bord" showSync />

      <div className="px-8 py-7 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="font-mono text-[10.5px] font-bold text-text-faint">
              TOTAL MENSUEL
            </div>
            <div className="text-[26px] font-bold mt-2">{formatAmount(monthlyTotal)}</div>
          </Card>
          <Card className="p-5">
            <div className="font-mono text-[10.5px] font-bold text-text-faint">
              TOTAL ANNUEL EST.
            </div>
            <div className="text-[26px] font-bold mt-2">{formatAmount(annualEstimate)}</div>
          </Card>
          <Card className="p-5">
            <div className="font-mono text-[10.5px] font-bold text-text-faint">
              ABONNEMENTS ACTIFS
            </div>
            <div className="text-[26px] font-bold mt-2">{statusCounts.actif}</div>
          </Card>
          <Card className="p-5 bg-yellow">
            <div className="font-mono text-[10.5px] font-bold text-yellow-ink/75">
              À VÉRIFIER
            </div>
            <div className="text-[26px] font-bold mt-2 text-yellow-ink">
              {statusCounts["a-verifier"]}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mt-6 items-start">
          <div className="flex flex-col gap-5">
            <Card className="p-6">
              <h3 className="text-[15px] font-bold mb-4">Répartition par catégorie</h3>
              <div className="flex flex-col gap-3">
                {categories.map((c) => (
                  <div key={c.category}>
                    <div className="flex justify-between text-[13px] font-semibold mb-1.5">
                      <span>{c.category}</span>
                      <span>{formatAmount(c.amount)}</span>
                    </div>
                    <div className="h-3.5 bg-paper-alt border-[1.5px] border-ink">
                      <div
                        className="h-full bg-blue"
                        style={{ width: `${(c.amount / maxCategory) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-[15px] font-bold mb-4">Abonnements les plus coûteux</h3>
              <div className="flex flex-col">
                {topSpenders.map((s, i) => (
                  <div
                    key={s.id}
                    className={`flex items-center justify-between py-2.75 ${
                      i < topSpenders.length - 1 ? "border-b-[1.5px] border-paper-alt" : ""
                    }`}
                  >
                    <span className="text-[14px] font-semibold">{s.name}</span>
                    <span className="text-[14px] font-bold">
                      {formatAmount(s.amount)} / {s.frequency === "annuel" ? "an" : "mois"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-5">
            <Card className="p-5.5">
              <h3 className="text-[15px] font-bold mb-3.5">Prochains prélèvements</h3>
              <div className="flex flex-col gap-2.5">
                {upcoming.map((s) => (
                  <div
                    key={s.id}
                    className={`flex items-center gap-2.5 p-2.5 ${
                      s.status === "a-verifier" ? "bg-yellow" : "bg-paper-alt"
                    }`}
                  >
                    <div className="hard-sm w-[34px] h-[34px] bg-surface flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold leading-none">
                        {monthLabel3(s.nextChargeDate)}
                      </span>
                      <span className="text-[12px] font-bold leading-tight">
                        {dayOfMonth(s.nextChargeDate)}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div
                        className={`text-[13px] font-semibold ${
                          s.status === "a-verifier" ? "text-yellow-ink" : ""
                        }`}
                      >
                        {s.name}
                        {s.status === "a-verifier" && s.previousAmount ? " ↑" : ""}
                      </div>
                    </div>
                    <span
                      className={`text-[13px] font-bold ${
                        s.status === "a-verifier" ? "text-yellow-ink" : ""
                      }`}
                    >
                      {formatAmount(s.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/calendrier"
                className="block text-center text-[12.5px] font-bold mt-3.5 no-underline"
              >
                Voir le calendrier complet →
              </Link>
            </Card>

            <div className="hard-sm bg-ink p-5">
              <div className="flex items-center gap-2.5">
                <RefreshIcon className="w-[18px] h-[18px] text-paper" />
                <span className="font-mono text-[11px] font-bold text-paper">
                  SYNCHRONISATION
                </span>
              </div>
              <p className="text-[13px] text-paper/80 leading-relaxed mt-2.5 mb-3.5">
                Dernière synchro il y a 2 heures. Tout est à jour.
              </p>
              <Button variant="primary" className="w-full">
                Resynchroniser
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
