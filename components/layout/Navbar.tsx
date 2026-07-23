"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/airports", label: "Airports" },
  { href: "/charts", label: "Charts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-panel-border bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-panel text-foreground"
                    : "text-foreground-dim hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/favourites"
            className="flex items-center gap-2 rounded-full border border-panel-border px-4 py-2 text-sm font-medium text-foreground-dim transition-colors hover:border-brand/50 hover:text-foreground"
          >
            <HeartIcon className="h-4 w-4" />
            Favourites
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-panel-border text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <MenuIcon className="h-5 w-5" open={open} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-panel-border px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-dim hover:bg-panel hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/favourites"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-dim hover:bg-panel hover:text-foreground"
            >
              <HeartIcon className="h-4 w-4" />
              Favourites
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2.3 4.5 6 4c2-.3 3.9.7 5 2.3C12.1 4.7 14 3.7 16 4c3.7.5 5.6 4.3 4 7.7C19.5 16.4 12 21 12 21z"
      />
    </svg>
  );
}

function MenuIcon({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}
