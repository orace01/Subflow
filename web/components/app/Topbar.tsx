import Link from "next/link";
import { UserIcon, ChevronLeftIcon } from "@/components/icons";

interface TopbarProps {
  title: string;
  backHref?: string;
  backLabel?: string;
}

export function Topbar({ title, backHref, backLabel }: TopbarProps) {
  if (backHref) {
    return (
      <div className="h-[72px] border-b-[2.5px] border-ink flex items-center gap-3.5 px-8 sticky top-0 bg-paper z-10">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-ink no-underline"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          {backLabel}
        </Link>
        <span className="text-text-faint">/</span>
        <h1 className="text-[16px] font-bold">{title}</h1>
      </div>
    );
  }

  return (
    <div className="h-[72px] border-b-[2.5px] border-ink flex items-center justify-between px-8 sticky top-0 bg-paper z-10">
      <h1 className="text-[20px] font-bold">{title}</h1>
      <div className="flex items-center gap-4.5">
        <span className="hard-sm w-[38px] h-[38px] rounded-full bg-paper-alt flex items-center justify-center">
          <UserIcon className="w-[17px] h-[17px]" />
        </span>
      </div>
    </div>
  );
}
