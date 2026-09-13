import { notFound } from "next/navigation";
import { Topbar } from "@/components/app/Topbar";
import { StatusSelector } from "@/components/app/StatusSelector";
import { QuickStatusActions } from "@/components/app/QuickStatusActions";
import { DeleteSubscriptionButton } from "@/components/app/DeleteSubscriptionButton";
import { EditSubscriptionPanel } from "@/components/app/EditSubscriptionPanel";
import { Card } from "@/components/ui/Card";
import { LogoMarkIcon, TrendingUpIcon } from "@/components/icons";
import { formatAmount, formatDate } from "@/lib/format";
import { getCurrentUser } from "@/lib/auth";
import { getUserSubscriptionById } from "@/lib/user-subscriptions";

export default async function AbonnementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const sub = await getUserSubscriptionById(user.id, id);
  if (!sub) notFound();

  const hasPriceHike = sub.previousAmount !== undefined;

  return (
    <>
      <Topbar title={sub.name} backHref="/abonnements" backLabel="Abonnements" />

      <div className="px-8 py-7 pb-12 max-w-[920px]">
        <Card className={`p-6.5 ${hasPriceHike ? "bg-yellow" : ""}`}>
          <div className="flex items-start justify-between gap-5 flex-wrap">
            <div className="flex items-center gap-4">
              <span className="hard-sm w-14 h-14 bg-surface flex items-center justify-center shrink-0">
                {hasPriceHike ? (
                  <TrendingUpIcon className="w-6.5 h-6.5 text-yellow-ink" />
                ) : (
                  <LogoMarkIcon className="w-6.5 h-6.5" />
                )}
              </span>
              <div>
                <h2 className={`text-[22px] font-bold ${hasPriceHike ? "text-yellow-ink" : ""}`}>
                  {sub.name}
                </h2>
                <div
                  className={`text-[13px] mt-0.5 ${
                    hasPriceHike ? "text-yellow-ink/75" : "text-text-faint"
                  }`}
                >
                  {sub.category}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-[28px] font-bold ${hasPriceHike ? "text-yellow-ink" : ""}`}
              >
                {formatAmount(sub.amount)}{" "}
                <span className="text-[14px] font-semibold opacity-70">
                  / {sub.frequency === "annuel" ? "an" : "mois"}
                </span>
              </div>
              {hasPriceHike && (
                <div className="font-mono text-[11px] font-bold text-yellow-ink mt-0.5">
                  HAUSSE DÉTECTÉE : {formatAmount(sub.previousAmount!)} → {formatAmount(sub.amount)}
                </div>
              )}
            </div>
          </div>

          <StatusSelector subscriptionId={sub.id} initialStatus={sub.status} />

          <div className="mt-4">
            <EditSubscriptionPanel
              subscriptionId={sub.id}
              initialValues={{
                name: sub.name,
                category: sub.category,
                amount: sub.amount,
                frequency: sub.frequency,
                nextChargeDate: sub.nextChargeDate,
              }}
            />
          </div>

          <div className="flex justify-end mt-3">
            <DeleteSubscriptionButton subscriptionId={sub.id} />
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <Card className="p-4.5">
            <div className="font-mono text-[10px] font-bold text-text-faint">FRÉQUENCE</div>
            <div className="text-[15px] font-semibold mt-1.5 capitalize">{sub.frequency}</div>
          </Card>
          <Card className="p-4.5">
            <div className="font-mono text-[10px] font-bold text-text-faint">
              PROCHAIN PRÉLÈVEMENT
            </div>
            <div className="text-[15px] font-semibold mt-1.5">
              {formatDate(sub.nextChargeDate)}
            </div>
          </Card>
          <Card className="p-4.5">
            <div className="font-mono text-[10px] font-bold text-text-faint">
              NIVEAU DE CONFIANCE
            </div>
            <div className="text-[15px] font-semibold mt-1.5 capitalize">
              {sub.confidence === "elevee" ? "Élevée" : sub.confidence === "moyenne" ? "Moyenne" : "À vérifier"}
            </div>
          </Card>
          <Card className="p-4.5">
            <div className="font-mono text-[10px] font-bold text-text-faint">COMPTE / CARTE</div>
            <div className="text-[15px] font-semibold mt-1.5">{sub.account}</div>
          </Card>
          <Card className="p-4.5">
            <div className="font-mono text-[10px] font-bold text-text-faint">
              PREMIÈRE DÉTECTION
            </div>
            <div className="text-[15px] font-semibold mt-1.5">
              {formatDate(sub.firstDetectedDate)}
            </div>
          </Card>
          <Card className="p-4.5">
            <div className="font-mono text-[10px] font-bold text-text-faint">CATÉGORIE</div>
            <div className="text-[15px] font-semibold mt-1.5">{sub.category}</div>
          </Card>
        </div>

        <Card className="p-6 mt-5">
          <h3 className="text-[15px] font-bold mb-4">Historique de prix</h3>
          <div className="flex flex-col">
            {sub.priceHistory.map((change, i) => (
              <div
                key={change.date}
                className={`flex items-center justify-between py-3 ${
                  i < sub.priceHistory.length - 1 ? "border-b-[1.5px] border-paper-alt" : ""
                }`}
              >
                <span className="text-[13.5px] font-semibold text-text-muted">
                  {formatDate(change.date)}
                  {i === 0 ? " — premier prélèvement détecté" : " — augmentation"}
                </span>
                <span className="text-[13.5px] font-bold">{formatAmount(change.amount)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 mt-5 flex items-center justify-between gap-3 flex-wrap">
          <QuickStatusActions subscriptionId={sub.id} />
        </Card>
      </div>
    </>
  );
}
