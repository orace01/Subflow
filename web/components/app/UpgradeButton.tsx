"use client";

import { useState, useTransition } from "react";
import { createCheckoutSessionAction } from "@/app/actions/billing";
import type { PaidPlan } from "@/lib/billing";
import { cn } from "@/lib/cn";

export function UpgradeButton({
  plan,
  children,
  className,
}: {
  plan: PaidPlan;
  children: React.ReactNode;
  className?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const result = await createCheckoutSessionAction(plan);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isPending} className={cn(className, "disabled:opacity-60 disabled:cursor-not-allowed")}>
        {isPending ? "Redirection…" : children}
      </button>
      {error && <p className="text-[12px] text-pink font-semibold mt-1.5">{error}</p>}
    </div>
  );
}
