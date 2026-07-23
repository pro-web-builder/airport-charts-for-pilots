import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-foreground-dim transition-colors hover:text-brand">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground" : "text-foreground-dim"} aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-foreground-faint">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
