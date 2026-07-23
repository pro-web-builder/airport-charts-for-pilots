import Link from "next/link";
import { CHART_CATEGORIES } from "@/lib/utils/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

type ChartCategoryGridProps = {
  icao: string;
  countsByCategory: Record<string, number>;
};

export function ChartCategoryGrid({ icao, countsByCategory }: ChartCategoryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {CHART_CATEGORIES.map((category) => {
        const count = countsByCategory[category.value] ?? 0;
        const available = count > 0;
        const content = (
          <GlassCard
            className={`flex h-full flex-col gap-3 p-5 transition-all ${
              available ? "hover:border-brand/40 hover:-translate-y-0.5" : "opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground">{category.label}</h3>
              <Badge tone={available ? "brand" : "neutral"}>
                {available ? `${count} chart${count === 1 ? "" : "s"}` : "Coming soon"}
              </Badge>
            </div>
            <p className="text-sm text-foreground-dim">{category.description}</p>
          </GlassCard>
        );

        return available ? (
          <Link key={category.value} href={`/airports/${icao.toLowerCase()}/charts/${category.value.toLowerCase()}`}>
            {content}
          </Link>
        ) : (
          <div key={category.value}>{content}</div>
        );
      })}
    </div>
  );
}
