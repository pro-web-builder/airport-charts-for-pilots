import { LogoIcon } from "@/components/brand/LogoIcon";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32">
      <LogoIcon className="h-14 w-14 animate-pulse" withBackground />
      <p className="text-sm font-medium tracking-wide text-foreground-dim">
        Loading Airport Charts For Pilots&hellip;
      </p>
    </div>
  );
}
