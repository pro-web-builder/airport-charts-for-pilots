import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SearchAutocomplete } from "@/components/home/SearchAutocomplete";
import { GlassCard } from "@/components/ui/GlassCard";
import { CHART_CATEGORIES } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Charts",
  description: "Airport diagrams, SID/STAR, approach and ground charts, organized by category.",
};

export default function ChartsInfoPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Charts" }]} />

      <div className="mt-6 mb-10 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Airport Charts
        </h1>
        <p className="max-w-2xl text-foreground-dim">
          Charts are organized per airport. Search for an airport below, then open its Charts tab to
          browse by category.
        </p>
        <div className="max-w-xl">
          <SearchAutocomplete size="md" placeholder="Search for an airport to view its charts…" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CHART_CATEGORIES.map((category) => (
          <GlassCard key={category.value} className="p-5">
            <h3 className="font-semibold text-foreground">{category.label}</h3>
            <p className="mt-2 text-sm text-foreground-dim">{category.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
