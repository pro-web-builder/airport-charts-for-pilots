import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { ChartSummary } from "@/types/chart";

export function ChartList({ icao, category, charts }: { icao: string; category: string; charts: ChartSummary[] }) {
  return (
    <div className="flex flex-col gap-4">
      {charts.map((chart) => (
        <Link key={chart.id} href={`/airports/${icao.toLowerCase()}/charts/${category.toLowerCase()}/${chart.id}`}>
          <GlassCard className="flex flex-wrap items-center justify-between gap-4 p-5 transition-all hover:border-brand/40">
            <div>
              <p className="font-semibold text-foreground">{chart.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-foreground-dim">
                <span className="font-mono text-brand-dim">{icao.toUpperCase()}</span>
                {chart.identifier && <span>&middot; {chart.identifier}</span>}
                {chart.revisionDate && (
                  <span>
                    &middot; Updated {new Date(chart.revisionDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {chart.isPlaceholder && <Badge tone="warning">Placeholder</Badge>}
              <span className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">View</span>
            </div>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
}
