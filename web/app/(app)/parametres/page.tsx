import Link from "next/link";
import { Topbar } from "@/components/app/Topbar";
import { Card } from "@/components/ui/Card";
import { TagIcon, SearchIcon } from "@/components/icons";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { UpgradeButton } from "@/components/app/UpgradeButton";
import { DeleteAccountCard } from "@/components/app/DeleteAccountCard";
import { PAYMENTS_ENABLED } from "@/lib/billing-config";

export const metadata = { title: "Paramètres · SubFlow" };

const PLAN_LABELS: Record<string, string> = {
  essai: "Essai gratuit",
  gratuit: "Gratuit",
  pro: "Pro",
  annuel: "Annuel",
};

export default async function ParametresPage() {
  const user = await getCurrentUser();

  // Proxy already guarantees a session on this route; this is only reachable
  // in the brief window between a session being revoked and the next request.
  if (!user) return null;

  return (
    <>
      <Topbar title="Paramètres" />
      <div className="px-8 py-7 pb-12 max-w-[640px]">
        <Card className="p-6.5">
          <h3 className="text-[15px] font-bold mb-4.5">Compte</h3>
          <div className="flex flex-col gap-3.5 text-[14px]">
            <div className="flex justify-between">
              <span className="text-text-faint">Nom</span>
              <span className="font-semibold">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-faint">E-mail</span>
              <span className="font-semibold">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-faint">Offre</span>
              <span className="font-semibold">{PLAN_LABELS[user.plan] ?? user.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-faint">Membre depuis</span>
              <span className="font-semibold">
                {new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
                  user.createdAt
                )}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6.5 mt-4">
          <h3 className="text-[15px] font-bold mb-4.5">Méthode de suivi</h3>
          {user.detectionMethod === "automatique" ? (
            <>
              <div className="flex items-center justify-between py-3 border-b-[1.5px] border-paper-alt">
                <div className="flex items-center gap-3">
                  <SearchIcon className="w-[18px] h-[18px] text-yellow-ink" />
                  <span className="text-[14px] font-semibold">Détection automatique</span>
                </div>
                <span className="font-mono hard-xs bg-yellow text-yellow-ink text-[10px] font-bold px-2.5 py-1.5">
                  EN MAINTENANCE
                </span>
              </div>
              <p className="text-[12.5px] text-text-faint mt-3">
                Cette fonctionnalité n&apos;est pas encore disponible. En attendant, ajoutez vos
                abonnements manuellement.
              </p>
              <Link
                href="/abonnements"
                className="block text-center text-[12.5px] font-bold mt-3.5 no-underline"
              >
                Ajouter un abonnement →
              </Link>
            </>
          ) : (
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <TagIcon className="w-[18px] h-[18px] text-blue" />
                <span className="text-[14px] font-semibold">Ajout manuel</span>
              </div>
              <span className="font-mono hard-xs bg-blue text-blue-ink text-[10px] font-bold px-2.5 py-1.5">
                ACTIF
              </span>
            </div>
          )}
        </Card>

        <Card className="p-6.5 mt-4">
          <h3 className="text-[15px] font-bold mb-4.5">Facturation</h3>
          {user.plan === "pro" || user.plan === "annuel" ? (
            <div className="flex items-center justify-between py-1">
              <span className="text-[14px] font-semibold">
                Offre {PLAN_LABELS[user.plan]} active
              </span>
              <span className="font-mono hard-xs bg-blue text-blue-ink text-[10px] font-bold px-2.5 py-1.5">
                ACTIF
              </span>
            </div>
          ) : PAYMENTS_ENABLED ? (
            <>
              <p className="text-[12.5px] text-text-faint mb-4">
                Vous êtes sur l&apos;offre {PLAN_LABELS[user.plan] ?? user.plan}. Passez en Pro pour
                des abonnements illimités et les alertes avancées.
              </p>
              <div className="flex gap-2.5 flex-wrap">
                <UpgradeButton
                  plan="pro"
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 text-[13px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[3px_3px_0_0_var(--ink)] hover:shadow-[5px_5px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-[transform,box-shadow] duration-100 cursor-pointer"
                >
                  Passer en Pro — 6,99 €/mois
                </UpgradeButton>
                <UpgradeButton
                  plan="annuel"
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 text-[13px] font-bold font-display bg-surface text-ink border-[2.5px] border-ink cursor-pointer"
                >
                  Offre annuelle — 59 €/an
                </UpgradeButton>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between py-1">
              <div>
                <div className="text-[14px] font-semibold">Offre {PLAN_LABELS[user.plan] ?? user.plan}</div>
                <div className="text-[12.5px] text-text-faint mt-0.5">
                  Le paiement en ligne (Pro/Annuel) n&apos;est pas encore disponible.
                </div>
              </div>
              <span className="font-mono hard-xs bg-yellow text-yellow-ink text-[10px] font-bold px-2.5 py-1.5">
                BIENTÔT
              </span>
            </div>
          )}
        </Card>

        <Card className="p-6.5 mt-4 flex items-center justify-between flex-wrap gap-3">
          <span className="text-[13.5px] text-text-muted font-medium">
            Vous quittez SubFlow pour cette session.
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 h-9 px-3.5 text-[12.5px] font-bold font-display bg-pink text-pink-ink border-[2.5px] border-ink shadow-[3px_3px_0_0_var(--ink)] hover:shadow-[5px_5px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--ink)] transition-[transform,box-shadow] duration-100 cursor-pointer"
            >
              Se déconnecter
            </button>
          </form>
        </Card>

        <DeleteAccountCard />
      </div>
    </>
  );
}
