import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "pink";
type Size = "md" | "sm";

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue text-blue-ink",
  ghost: "bg-surface text-ink",
  pink: "bg-pink text-pink-ink",
};

const sizeClasses: Record<Size, string> = {
  md: cn(
    "h-12 px-6 text-[14.5px] border-[2.5px] border-ink",
    "shadow-[4px_4px_0_0_var(--ink)]",
    "hover:shadow-[6px_6px_0_0_var(--ink)]",
    "active:shadow-[2px_2px_0_0_var(--ink)]"
  ),
  sm: cn(
    "h-9 px-3.5 text-[12.5px] border-[2.5px] border-ink",
    "shadow-[3px_3px_0_0_var(--ink)]",
    "hover:shadow-[5px_5px_0_0_var(--ink)]",
    "active:shadow-[1px_1px_0_0_var(--ink)]"
  ),
};

const base =
  "inline-flex items-center justify-center gap-2 font-bold font-display whitespace-nowrap cursor-pointer transition-[transform,box-shadow] duration-100 hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-0.5 active:translate-y-0.5";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "ghost",
  size = "md",
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </Link>
  );
}
