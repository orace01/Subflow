import Link from "next/link";
import { Topbar } from "@/components/app/Topbar";
import { SubscriptionsExplorer } from "@/components/app/SubscriptionsExplorer";
import { getCurrentUser } from "@/lib/auth";
import { getUserSubscriptions } from "@/lib/user-subscriptions";

export const metadata = { title: "Abonnements · SubFlow" };

export default async function AbonnementsPage() {
  const user = await getCurrentUser();
  const subs = user ? await getUserSubscriptions(user.id) : [];

  return (
    <>
      <Topbar title="Abonnements" />
      <div className="px-8 py-7 pb-12">
        {subs.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-[20px] font-bold">Aucun abonnement pour l&apos;instant</h2>
            <p className="text-[14px] text-text-muted mt-2">
              Connectez votre boîte mail pour lancer la première détection.
            </p>
            <Link
              href="/onboarding/email"
              className="inline-flex mt-5 h-11 px-5 items-center justify-center bg-blue text-blue-ink border-[2.5px] border-ink font-bold text-[14px] no-underline"
            >
              Connecter ma boîte mail
            </Link>
          </div>
        ) : (
          <SubscriptionsExplorer subscriptions={subs} />
        )}
      </div>
    </>
  );
}
