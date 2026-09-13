import { Topbar } from "@/components/app/Topbar";
import { CalendarView } from "@/components/app/CalendarView";
import { getCurrentUser } from "@/lib/auth";
import { getUserSubscriptions } from "@/lib/user-subscriptions";

export const metadata = { title: "Calendrier · SubFlow" };

export default async function CalendrierPage() {
  const user = await getCurrentUser();
  const subs = user ? await getUserSubscriptions(user.id) : [];

  return (
    <>
      <Topbar title="Calendrier des prélèvements" />
      <div className="px-8 py-7 pb-12">
        <CalendarView subscriptions={subs} />
      </div>
    </>
  );
}
