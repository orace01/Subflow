import { Topbar } from "@/components/app/Topbar";
import { AlertsSettings } from "@/components/app/AlertsSettings";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Alertes · SubFlow" };

export default async function AlertesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <>
      <Topbar title="Alertes & notifications" />
      <div className="px-8 py-7 pb-12">
        <AlertsSettings
          initialToggles={{
            alertBeforeCharge: user.alertBeforeCharge,
            alertPriceHike: user.alertPriceHike,
            alertWeeklyDigest: user.alertWeeklyDigest,
          }}
          initialDelayDays={user.alertDelayDays}
        />
      </div>
    </>
  );
}
