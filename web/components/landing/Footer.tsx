import Link from "next/link";
import { LogoMarkIcon } from "@/components/icons";

export function Footer() {
  return (
    <div className="border-t-[2.5px] border-ink bg-paper-alt">
      <div className="max-w-[1400px] mx-auto px-8 py-11 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="hard-sm w-7 h-7 bg-blue flex items-center justify-center">
            <LogoMarkIcon className="w-4 h-4 text-blue-ink" />
          </span>
          <span className="font-mono text-[12px] text-text-faint font-semibold">
            © 2026 SUBFLOW
          </span>
        </div>
        <div className="flex gap-6 flex-wrap">
          <Link href="/securite" className="text-[13.5px] font-semibold text-ink no-underline">
            Sécurité
          </Link>
          <Link href="/confidentialite" className="text-[13.5px] font-semibold text-ink no-underline">
            Confidentialité
          </Link>
          <Link href="/cgu" className="text-[13.5px] font-semibold text-ink no-underline">
            CGU
          </Link>
          <Link href="/contact" className="text-[13.5px] font-semibold text-ink no-underline">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
