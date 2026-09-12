"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  LogoMarkIcon,
  DashboardIcon,
  TagIcon,
  CalendarIcon,
  BellIcon,
  SettingsIcon,
} from "@/components/icons";
import { logoutAction } from "@/app/actions/auth";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: DashboardIcon },
  { href: "/abonnements", label: "Abonnements", icon: TagIcon },
  { href: "/calendrier", label: "Calendrier", icon: CalendarIcon },
  { href: "/alertes", label: "Alertes", icon: BellIcon },
  { href: "/parametres", label: "Paramètres", icon: SettingsIcon },
];

const PLAN_LABELS: Record<string, string> = {
  essai: "Essai gratuit",
  gratuit: "Gratuit",
  pro: "Pro",
  annuel: "Annuel",
};

export interface SidebarUser {
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  trialDay: number;
  trialLength: number;
}

export function Sidebar({ user }: { user: SidebarUser | null }) {
  const pathname = usePathname();

  return (
    <div className="w-[236px] shrink-0 bg-ink flex flex-col">
      <div className="px-5 pt-5.5 pb-4.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="hard-sm w-[30px] h-[30px] bg-blue flex items-center justify-center">
            <LogoMarkIcon className="w-4 h-4 text-blue-ink" />
          </span>
          <span className="font-display font-bold text-[17px] text-paper">SubFlow</span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-2 flex flex-col gap-[3px]">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href === "/abonnements" && pathname.startsWith("/abonnements"));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 text-[14px] font-semibold no-underline",
                active ? "bg-blue text-blue-ink" : "text-paper/60"
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
            </Link>
          );
        })}
      </div>

      {user && (
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center shrink-0 text-blue-ink text-[12px] font-bold">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold text-paper truncate">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-[11px] text-paper/50 truncate">{user.email}</div>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                title="Se déconnecter"
                className="text-paper/50 hover:text-paper text-[11px] font-bold cursor-pointer"
              >
                ⏻
              </button>
            </form>
          </div>

          <div className="hard-sm bg-surface p-3.5">
            <div className="font-mono text-[10px] font-bold text-text-faint uppercase">
              {PLAN_LABELS[user.plan] ?? user.plan}
            </div>
            {user.plan === "essai" && (
              <>
                <div className="text-[12.5px] font-semibold mt-1">
                  Jour {user.trialDay} sur {user.trialLength}
                </div>
                <div className="h-1.5 bg-paper-alt border-[1.5px] border-ink mt-2">
                  <div
                    className="h-full bg-blue"
                    style={{ width: `${Math.min(100, (user.trialDay / user.trialLength) * 100)}%` }}
                  />
                </div>
              </>
            )}
            {user.plan !== "pro" && (
              <Link href="/#tarifs" className="block text-[12px] font-bold text-blue mt-2.5 no-underline">
                Passer en Pro →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
