import Link from "next/link";
import { LogoMarkIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";

export function Navbar() {
  return (
    <div className="sticky top-0 z-20 bg-paper border-b-[2.5px] border-ink">
      <div className="max-w-[1400px] mx-auto px-8 h-[76px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="hard-sm w-[34px] h-[34px] bg-blue flex items-center justify-center">
            <LogoMarkIcon className="w-[18px] h-[18px] text-blue-ink" />
          </span>
          <span className="font-display font-bold text-[21px]">SubFlow</span>
        </Link>
        <div className="hidden md:flex items-center gap-[30px]">
          <a href="#fonctionnalites" className="text-[14.5px] font-semibold no-underline">
            Fonctionnalités
          </a>
          <a href="#comment-ca-marche" className="text-[14.5px] font-semibold no-underline">
            Comment ça marche
          </a>
          <a href="#tarifs" className="text-[14.5px] font-semibold no-underline">
            Tarifs
          </a>
        </div>
        <div className="flex items-center gap-3.5">
          <Link href="/onboarding/connexion" className="text-[14.5px] font-semibold no-underline hidden sm:inline">
            Connexion
          </Link>
          <LinkButton href="/onboarding/connexion" variant="primary" size="sm">
            Essai gratuit
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
