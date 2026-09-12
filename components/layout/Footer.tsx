import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/airports", label: "Airports" },
      { href: "/charts", label: "Charts" },
      { href: "/favourites", label: "Favourites" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-panel-border bg-background-elevated">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-foreground-dim">
              Search, view and explore airport charts from airports around the world. Built for
              pilots, student pilots, flight simulator users and aviation enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-faint">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground-dim transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-panel-border pt-6 text-xs text-foreground-faint lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; {new Date().getFullYear()} Airport Charts For Pilots. For flight simulation and educational use.</p>
          <p>Chart data shown for v1 is placeholder. Not for real-world navigation.</p>
          <p className="lg:shrink-0">Designed by Oliver T.</p>
        </div>
      </div>
    </footer>
  );
}
