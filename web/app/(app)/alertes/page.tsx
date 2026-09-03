import { Topbar } from "@/components/app/Topbar";
import { AlertsSettings } from "@/components/app/AlertsSettings";

export const metadata = { title: "Alertes · SubFlow" };

export default function AlertesPage() {
  return (
    <>
      <Topbar title="Alertes & notifications" />
      <div className="px-8 py-7 pb-12">
        <AlertsSettings />
      </div>
    </>
  );
}
