import { Topbar } from "@/components/app/Topbar";
import { SubscriptionsExplorer } from "@/components/app/SubscriptionsExplorer";
import { getSubscriptions } from "@/lib/subscriptions";

export const metadata = { title: "Abonnements · SubFlow" };

export default function AbonnementsPage() {
  return (
    <>
      <Topbar title="Abonnements" />
      <div className="px-8 py-7 pb-12">
        <SubscriptionsExplorer subscriptions={getSubscriptions()} />
      </div>
    </>
  );
}
