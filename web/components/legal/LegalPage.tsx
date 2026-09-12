import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMarkIcon, ChevronLeftIcon } from "@/components/icons";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b-[2.5px] border-ink px-8 py-5">
        <div className="max-w-[760px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="hard-sm w-[30px] h-[30px] bg-blue flex items-center justify-center">
              <LogoMarkIcon className="w-4 h-4 text-blue-ink" />
            </span>
            <span className="font-display font-bold text-[17px]">SubFlow</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-[13px] font-semibold no-underline">
            <ChevronLeftIcon className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>

      <div className="flex-1 px-8 py-16">
        <div className="max-w-[760px] mx-auto">
          <h1 className="text-[32px] font-bold mb-8">{title}</h1>
          <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-text-muted [&_h2]:text-[19px] [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
