import { cn } from "@/lib/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-panel via-white/10 to-panel bg-[length:200%_100%]",
        className
      )}
    />
  );
}
