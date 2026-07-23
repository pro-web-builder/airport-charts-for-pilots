import Link from "next/link";
import { LogoIcon } from "./LogoIcon";

type LogoProps = {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
};

export function Logo({ className, iconClassName = "h-9 w-9", showWordmark = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className ?? ""}`}>
      <LogoIcon className={`${iconClassName} shrink-0 transition-transform duration-300 group-hover:scale-105`} />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-wide text-foreground sm:text-base">
            AIRPORT CHARTS
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-brand sm:text-xs">
            FOR PILOTS
          </span>
        </span>
      )}
    </Link>
  );
}
