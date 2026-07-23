import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackButton } from "@/components/layout/BackButton";
import { ChartViewer } from "@/components/airport/ChartViewer";
import { chartCategoryLabel } from "@/lib/utils/constants";
import type { ChartSummary } from "@/types/chart";

async function getChart(chartId: string) {
  return prisma.chart.findUnique({
    where: { id: chartId },
    include: { airport: { select: { icao: true, name: true } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chartId: string }>;
}): Promise<Metadata> {
  const { chartId } = await params;
  const chart = await getChart(chartId);
  return { title: chart ? chart.title : "Chart Not Found" };
}

export default async function ChartViewerPage({
  params,
}: {
  params: Promise<{ icao: string; category: string; chartId: string }>;
}) {
  const { icao, category, chartId } = await params;
  const chart = await getChart(chartId);

  if (!chart || chart.airport.icao !== icao.toUpperCase()) notFound();

  const chartSummary: ChartSummary = {
    id: chart.id,
    category: chart.category,
    title: chart.title,
    identifier: chart.identifier,
    fileUrl: chart.fileUrl,
    revisionDate: chart.revisionDate ? chart.revisionDate.toISOString() : null,
    isPlaceholder: chart.isPlaceholder,
  };

  const categoryLabel = chartCategoryLabel(category.toUpperCase());

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Airports", href: "/airports" },
            { label: chart.airport.name, href: `/airports/${icao.toLowerCase()}` },
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
