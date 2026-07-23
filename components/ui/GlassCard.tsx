import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        className
      )}
      {...props}
    />
  );
}
