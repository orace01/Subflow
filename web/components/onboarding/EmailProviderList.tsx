"use client";

import { useState } from "react";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { connectEmailAction } from "@/app/actions/auth";
import { cn } from "@/lib/cn";

interface Provider {
  id: string;
  initials: string;
  name: string;
}

const providers: Provider[] = [
  { id: "gmail", initials: "GM", name: "Gmail" },
  { id: "outlook", initials: "OL", name: "Outlook / Microsoft 365" },
  { id: "imap", initials: "IM", name: "Autre adresse (IMAP)" },
];

export function EmailProviderList() {
  const [selected, setSelected] = useState<string>("gmail");

  return (
    <form action={connectEmailAction.bind(null, selected)}>
      <div className="flex flex-col gap-3 mt-5">
        {providers.map((p) => {
          const isSelected = p.id === selected;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={cn(
                "hard-sm px-4.5 py-4 flex items-center gap-3.5 cursor-pointer w-full text-left",
                isSelected ? "bg-blue" : "bg-surface"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-[13px]",
                  isSelected ? "bg-surface text-ink" : "bg-paper-alt"
                )}
              >
                {p.initials}
              </div>
              <span
                className={cn(
                  "text-[14.5px] font-semibold flex-grow",
                  isSelected && "text-blue-ink"
                )}
              >
                {p.name}
              </span>
              {isSelected ? (
                <CheckIcon className="w-[18px] h-[18px] text-blue-ink" />
              ) : (
                <ChevronRightIcon className="w-[18px] h-[18px] text-text-faint" />
              )}
            </button>
          );
        })}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 mt-6 text-[14.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--ink)] transition-[transform,box-shadow] duration-100 cursor-pointer"
      >
        Autoriser l&apos;accès en lecture seule
      </button>
    </form>
  );
}
