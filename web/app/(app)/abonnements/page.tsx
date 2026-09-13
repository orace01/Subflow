import { Topbar } from "@/components/app/Topbar";
import { SubscriptionsExplorer } from "@/components/app/SubscriptionsExplorer";
import { AddSubscriptionPanel } from "@/components/app/AddSubscriptionPanel";
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
        <AddSubscriptionPanel />

        {subs.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-[20px] font-bold">Aucun abonnement pour l&apos;instant</h2>
            <p className="text-[14px] text-text-muted mt-2">
              Ajoutez votre premier abonnement avec le bouton ci-dessus.
            </p>
          </div>
        ) : (
          <SubscriptionsExplorer subscriptions={subs} />
        )}
      </div>
    </>
  );
}
