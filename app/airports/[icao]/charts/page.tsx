import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAirportByIcao, getChartsForAirport } from "@/lib/airports/data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackButton } from "@/components/layout/BackButton";
import { ChartCategoryGrid } from "@/components/airport/ChartCategoryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ icao: string }>;
}): Promise<Metadata> {
  const { icao } = await params;
  return { title: `${icao.toUpperCase()} Charts` };
}

export default async function AirportChartsPage({
  params,
}: {
  params: Promise<{ icao: string }>;
}) {
  const { icao } = await params;
  const upperIcao = icao.toUpperCase();

  const airport = getAirportByIcao(upperIcao);

  if (!airport) notFound();

  const countsByCategory: Record<string, number> = {};
  for (const chart of getChartsForAirport(airport.icao)) {
    countsByCategory[chart.category] = (countsByCategory[chart.category] ?? 0) + 1;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Airports", href: "/airports" },
            { label: airport.name, href: `/airports/${icao.toLowerCase()}` },
            { label: "Charts" },
          ]}
        />
        <BackButton fallbackHref={`/airports/${icao.toLowerCase()}`} />
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {airport.name} Charts
      </h1>
      <p className="mb-8 text-foreground-dim">
        Airport Diagram, SID/STAR, approach and ground charts for{" "}
        <span className="font-mono text-brand-dim">{airport.icao}</span>.
      </p>

      <ChartCategoryGrid icao={airport.icao} countsByCategory={countsByCategory} />
    </div>
  );
}
