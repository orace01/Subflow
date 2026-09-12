import { Topbar } from "@/components/app/Topbar";
import { Card } from "@/components/ui/Card";
import { MailIcon, SendIcon, SmartphoneIcon } from "@/components/icons";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export const metadata = { title: "Paramètres · SubFlow" };

const PLAN_LABELS: Record<string, string> = {
  essai: "Essai gratuit",
  gratuit: "Gratuit",
  pro: "Pro",
  annuel: "Annuel",
};

const PROVIDER_LABELS: Record<string, string> = {
  gmail: "Gmail",
  outlook: "Outlook / Microsoft 365",
  imap: "Autre adresse (IMAP)",
};

export default async function ParametresPage() {
  const user = await getCurrentUser();

  // Proxy already guarantees a session on this route; this is only reachable
  // in the brief window between a session being revoked and the next request.
  if (!user) return null;

  const emailLabel = user.emailProvider ? PROVIDER_LABELS[user.emailProvider] ?? user.emailProvider : null;

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
          <h3 className="text-[15px] font-bold mb-4.5">Boîtes mail connectées</h3>
          <div className="flex items-center justify-between py-3 border-b-[1.5px] border-paper-alt">
            <div className="flex items-center gap-3">
              <MailIcon className="w-[18px] h-[18px] text-blue" />
              <span className="text-[14px] font-semibold">
                {emailLabel ?? "Aucune boîte mail"} {emailLabel && `— ${user.email}`}
              </span>
            </div>
            <span
              className={`font-mono hard-xs text-[10px] font-bold px-2.5 py-1.5 ${
                user.emailConnected ? "bg-blue text-blue-ink" : "bg-surface"
              }`}
            >
              {user.emailConnected ? "CONNECTÉ" : "NON CONNECTÉ"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 opacity-50">
            <div className="flex items-center gap-3">
              <SendIcon className="w-[18px] h-[18px]" />
              <span className="text-[14px] font-semibold">Telegram (Pro)</span>
            </div>
            <span className="font-mono hard-xs bg-surface text-[10px] font-bold px-2.5 py-1.5">
              NON CONNECTÉ
            </span>
          </div>
          <div className="flex items-center justify-between py-3 opacity-50">
            <div className="flex items-center gap-3">
              <SmartphoneIcon className="w-[18px] h-[18px]" />
              <span className="text-[14px] font-semibold">SMS (Pro)</span>
            </div>
            <span className="font-mono hard-xs bg-surface text-[10px] font-bold px-2.5 py-1.5">
              NON CONNECTÉ
            </span>
          </div>
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
      </div>
    </>
  );
}
