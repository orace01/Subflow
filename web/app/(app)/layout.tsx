import { Sidebar } from "@/components/app/Sidebar";
import { getCurrentUser, TRIAL_LENGTH_DAYS } from "@/lib/auth";

function computeTrialDay(createdAt: Date): number {
  const elapsedDays = Math.floor((Date.now() - createdAt.getTime()) / 86_400_000) + 1;
  return Math.min(TRIAL_LENGTH_DAYS, Math.max(1, elapsedDays));
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // Proxy already guarantees a valid session for every route under this
  // layout; this fetch is for the user's data, not as a second auth check.
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar
        user={
          user
            ? {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                plan: user.plan,
                trialDay: computeTrialDay(user.createdAt),
                trialLength: TRIAL_LENGTH_DAYS,
              }
            : null
        }
      />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
