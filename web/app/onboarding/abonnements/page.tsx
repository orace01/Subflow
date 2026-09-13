import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoMarkIcon, DashboardIcon } from "@/components/icons";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { AddSubscriptionForm } from "@/components/app/AddSubscriptionForm";
import { getCurrentUser } from "@/lib/auth";
import { getUserSubscriptions } from "@/lib/user-subscriptions";
import { formatAmount, formatDate } from "@/lib/format";

export const metadata = { title: "Ajoutez vos abonnements · SubFlow" };

export default async function OnboardingAbonnementsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/inscription");

  const subs = await getUserSubscriptions(user.id);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b-[2.5px] border-ink px-8 py-5">
        <div className="max-w-[760px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="hard-sm w-[30px] h-[30px] bg-blue flex items-center justify-center">
              <LogoMarkIcon className="w-4 h-4 text-blue-ink" />
            </span>
            <span className="font-display font-bold text-[17px]">SubFlow</span>
          </Link>
          <div className="font-mono text-[11px] font-bold text-text-faint">ÉTAPE 3 SUR 4</div>
        </div>
      </div>

      <div className="px-8 pt-6">
        <OnboardingStepper activeStep={3} maxWidth={760} />
      </div>

      <div className="flex-1 px-8 pt-10 pb-24">
        <div className="max-w-[760px] mx-auto">
          <h1 className="text-[28px] font-bold">Ajoutez vos abonnements</h1>
          <p className="text-[14.5px] text-text-muted mt-2.5 leading-relaxed">
            Ajoutez-en autant que vous voulez maintenant — vous pourrez
            toujours en ajouter, modifier ou résilier depuis le tableau de
            bord ensuite.
          </p>

          <div className="mt-7">
            <AddSubscriptionForm />
          </div>

          {subs.length > 0 && (
            <div className="flex flex-col gap-2.5 mt-6">
              <span className="font-mono text-[11.5px] font-bold text-text-faint">
                {subs.length} ABONNEMENT{subs.length > 1 ? "S" : ""} AJOUTÉ{subs.length > 1 ? "S" : ""}
              </span>
              {subs.map((s) => (
                <div key={s.id} className="hard-sm bg-surface px-4.5 py-3.5 flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
                    <DashboardIcon className="w-[17px] h-[17px] text-blue" />
                  </span>
                  <div className="flex-grow min-w-0">
                    <div className="text-[14px] font-bold">{s.name}</div>
                    <div className="text-[12px] text-text-faint">
                      {s.category} · {formatDate(s.nextChargeDate)}
                    </div>
                  </div>
                  <span className="text-[14px] font-bold">{formatAmount(s.amount)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="hard-sm sticky bottom-4 bg-surface px-5 py-4 mt-7 flex items-center justify-between">
            <span className="text-[13.5px] font-semibold text-text-muted">
              {subs.length === 0
                ? "Vous pourrez en ajouter plus tard"
                : `${subs.length} abonnement${subs.length > 1 ? "s" : ""} prêt${subs.length > 1 ? "s" : ""}`}
            </span>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-[14.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-[transform,box-shadow] duration-100 no-underline"
            >
              Aller au tableau de bord
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
