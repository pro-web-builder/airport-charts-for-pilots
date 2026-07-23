import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "ghost" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-[0_8px_24px_rgba(0,120,255,0.35)] hover:bg-brand-dim",
  ghost: "text-foreground-dim hover:text-foreground hover:bg-panel",
  outline: "border border-panel-border text-foreground hover:border-brand/50",
};

const BASE = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98]";

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(BASE, VARIANT_CLASSES[variant], className)} {...props} />;
}

export function LinkButton({
  variant = "primary",
  className,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; href: string }) {
  return <Link href={href} className={cn(BASE, VARIANT_CLASSES[variant], className)} {...props} />;
}
