import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChartById } from "@/lib/airports/data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackButton } from "@/components/layout/BackButton";
import { ChartViewer } from "@/components/airport/ChartViewer";
import { chartCategoryLabel } from "@/lib/utils/constants";
import type { ChartSummary } from "@/types/chart";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chartId: string }>;
}): Promise<Metadata> {
  const { chartId } = await params;
  const found = getChartById(chartId);
  return { title: found ? found.chart.title : "Chart Not Found" };
}

export default async function ChartViewerPage({
  params,
}: {
  params: Promise<{ icao: string; category: string; chartId: string }>;
}) {
  const { icao, category, chartId } = await params;
  const found = getChartById(chartId);

  if (!found || found.airport.icao !== icao.toUpperCase()) notFound();

  const { chart, airport } = found;
  const chartSummary: ChartSummary = chart;

  const categoryLabel = chartCategoryLabel(category.toUpperCase());

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Airports", href: "/airports" },
            { label: airport.name, href: `/airports/${icao.toLowerCase()}` },
            { label: "Charts", href: `/airports/${icao.toLowerCase()}/charts` },
            { label: categoryLabel, href: `/airports/${icao.toLowerCase()}/charts/${category.toLowerCase()}` },
            { label: chart.title },
          ]}
        />
        <BackButton fallbackHref={`/airports/${icao.toLowerCase()}/charts/${category.toLowerCase()}`} />
      </div>

      <ChartViewer chart={chartSummary} />
    </div>
  );
}
