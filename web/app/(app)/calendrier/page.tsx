import { Topbar } from "@/components/app/Topbar";
import { CalendarView } from "@/components/app/CalendarView";
import { getSubscriptions } from "@/lib/subscriptions";

export const metadata = { title: "Calendrier · SubFlow" };

export default function CalendrierPage() {
  return (
    <>
      <Topbar title="Calendrier des prélèvements" showSync />
      <div className="px-8 py-7 pb-12">
        <CalendarView subscriptions={getSubscriptions()} />
      </div>
    </>
  );
}
