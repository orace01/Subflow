"use client";

import { useState } from "react";
import { PlusIcon, ChevronRightIcon } from "@/components/icons";
import { AddSubscriptionForm } from "./AddSubscriptionForm";
import { cn } from "@/lib/cn";

export function AddSubscriptionPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 h-10 px-4 text-[13.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[3px_3px_0_0_var(--ink)] hover:shadow-[5px_5px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-[transform,box-shadow] duration-100 cursor-pointer"
      >
        {open ? <ChevronRightIcon className="w-4 h-4 rotate-90" /> : <PlusIcon className="w-4 h-4" />}
        Ajouter un abonnement
      </button>

      <div className={cn("mt-4", !open && "hidden")}>
        <AddSubscriptionForm />
      </div>
    </div>
  );
}
