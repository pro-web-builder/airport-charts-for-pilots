import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAirportByIcao, getChartsByCategory } from "@/lib/airports/data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackButton } from "@/components/layout/BackButton";
import { ChartList } from "@/components/airport/ChartList";
import { CHART_CATEGORIES, chartCategoryLabel } from "@/lib/utils/constants";
import type { ChartSummary } from "@/types/chart";

function resolveCategory(param: string) {
  const upper = param.toUpperCase();
  return CHART_CATEGORIES.find((c) => c.value === upper)?.value ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ icao: string; category: string }>;
}): Promise<Metadata> {
  const { icao, category } = await params;
  return { title: `${icao.toUpperCase()} — ${chartCategoryLabel(category.toUpperCase())}` };
}

export default async function ChartCategoryPage({
  params,
}: {
  params: Promise<{ icao: string; category: string }>;
}) {
  const { icao, category } = await params;
  const upperIcao = icao.toUpperCase();
  const resolvedCategory = resolveCategory(category);

  if (!resolvedCategory) notFound();

  const airport = getAirportByIcao(upperIcao);

  if (!airport) notFound();

  const charts: ChartSummary[] = getChartsByCategory(airport.icao, resolvedCategory);

  const categoryLabel = chartCategoryLabel(resolvedCategory);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Airports", href: "/airports" },
            { label: airport.name, href: `/airports/${icao.toLowerCase()}` },
            { label: "Charts", href: `/airports/${icao.toLowerCase()}/charts` },
            { label: categoryLabel },
          ]}
        />
        <BackButton fallbackHref={`/airports/${icao.toLowerCase()}/charts`} />
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {categoryLabel}
      </h1>
      <p className="mb-8 text-foreground-dim">
        {airport.name} <span className="font-mono text-brand-dim">({airport.icao})</span>
      </p>

      {charts.length > 0 ? (
        <ChartList icao={airport.icao} category={resolvedCategory} charts={charts} />
      ) : (
        <p className="text-sm text-foreground-dim">No charts available in this category yet.</p>
      )}
    </div>
  );
}
