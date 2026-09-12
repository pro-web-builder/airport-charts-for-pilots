import rawAirports from "@/data/airports.json";
import type { Airport, Frequency, Runway } from "@/types/airport";
import type { ChartSummary } from "@/types/chart";
import type { ChartCategoryValue } from "@/lib/utils/constants";

// The 50 curated airports ship as a static JSON asset rather than living in a
// database: the dataset is read-only, has no per-user state, and is small
// enough to hold in memory, so a DB added a deploy-time dependency and bought
// nothing. Everything below is built once at module load.

type RawAirport = (typeof rawAirports)[number];

// Ported verbatim from the former prisma/seed.ts so chart titles and file URLs
// are byte-identical to what shipped before. Note these titles are singular and
// intentionally differ from the plural category labels in lib/utils/constants.
const PLACEHOLDER_CHARTS: { category: ChartCategoryValue; title: string; fileUrl: string }[] = [
  { category: "AIRPORT_DIAGRAM", title: "Airport Diagram", fileUrl: "/charts/placeholder/airport-diagram.pdf" },
  { category: "GROUND_CHART", title: "Ground Chart", fileUrl: "/charts/placeholder/ground-chart.pdf" },
  { category: "SID", title: "Standard Instrument Departure", fileUrl: "/charts/placeholder/sid.pdf" },
  { category: "STAR", title: "Standard Terminal Arrival Route", fileUrl: "/charts/placeholder/star.pdf" },
  { category: "ILS_APPROACH", title: "ILS Approach", fileUrl: "/charts/placeholder/ils-approach.pdf" },
  { category: "RNAV_APPROACH", title: "RNAV Approach", fileUrl: "/charts/placeholder/rnav-approach.pdf" },
  { category: "VOR_APPROACH", title: "VOR Approach", fileUrl: "/charts/placeholder/vor-approach.pdf" },
  { category: "VISUAL_APPROACH", title: "Visual Approach", fileUrl: "/charts/placeholder/visual-approach.pdf" },
  { category: "TAXI_CHART", title: "Taxi Chart", fileUrl: "/charts/placeholder/taxi-chart.pdf" },
  { category: "PARKING_CHART", title: "Parking Chart", fileUrl: "/charts/placeholder/parking-chart.pdf" },
];

// Fixed rather than `new Date()` so the rendered revision date does not drift
// between builds. Midday UTC keeps toLocaleDateString on the same day worldwide.
export const CHART_REVISION_DATE = "2026-07-23T12:00:00.000Z";

/**
 * Chart, runway and frequency ids are derived from the airport + position
 * instead of being generated, because chart ids appear in URLs
 * (/airports/[icao]/charts/[category]/[chartId]). Random ids would break every
 * saved chart link on each redeploy.
 */
function chartId(icao: string, category: ChartCategoryValue) {
  return `${icao}-${category}`.toLowerCase();
}

function toRunway(raw: RawAirport["runways"][number], icao: string, index: number): Runway {
  return {
    id: `${icao}-rwy-${index}`,
    ident: raw.ident,
    leIdent: raw.leIdent ?? null,
    heIdent: raw.heIdent ?? null,
    lengthFt: raw.lengthFt ?? null,
    widthFt: raw.widthFt ?? null,
    surface: raw.surface ?? null,
    lighted: raw.lighted ?? true,
    headingDegT: raw.headingDegT ?? null,
  };
}

function toFrequency(raw: RawAirport["frequencies"][number], icao: string, index: number): Frequency {
  return {
    id: `${icao}-freq-${index}`,
    type: raw.type,
    description: raw.description ?? null,
    frequencyMhz: raw.frequencyMhz,
  };
}

function toAirport(raw: RawAirport): Airport {
  const icao = raw.icao.toUpperCase();
  return {
    id: icao,
    icao,
    iata: raw.iata ?? null,
    name: raw.name,
    city: raw.city,
    country: raw.country,
    countryCode: raw.countryCode ?? null,
    region: raw.region ?? null,
    latitude: raw.latitude,
    longitude: raw.longitude,
    elevationFt: raw.elevationFt ?? null,
    timezone: raw.timezone,
    type: raw.type ?? null,
    isPopular: raw.isPopular ?? false,
    runways: (raw.runways ?? []).map((r, i) => toRunway(r, icao, i)),
    frequencies: (raw.frequencies ?? []).map((f, i) => toFrequency(f, icao, i)),
    funFact: raw.funFact ?? null,
  };
}

function buildCharts(icao: string): ChartSummary[] {
  return PLACEHOLDER_CHARTS.map((c) => ({
    id: chartId(icao, c.category),
    category: c.category,
    title: `${c.title} — ${icao}`,
    identifier: null,
    fileUrl: c.fileUrl,
    revisionDate: CHART_REVISION_DATE,
    isPlaceholder: true,
  }));
}

const AIRPORTS: Airport[] = (rawAirports as RawAirport[])
  .map(toAirport)
  .sort((a, b) => a.name.localeCompare(b.name));

const AIRPORTS_BY_ICAO = new Map(AIRPORTS.map((a) => [a.icao, a]));
const CHARTS_BY_ICAO = new Map(AIRPORTS.map((a) => [a.icao, buildCharts(a.icao)]));
const CHARTS_BY_ID = new Map(
  [...CHARTS_BY_ICAO].flatMap(([icao, charts]) => charts.map((c) => [c.id, { chart: c, icao }] as const))
);

/** Every airport, sorted by name ascending. */
export function getAllAirports(): Airport[] {
  return AIRPORTS;
}

export function getAirportByIcao(icao: string): Airport | null {
  return AIRPORTS_BY_ICAO.get(icao.toUpperCase()) ?? null;
}

export function getPopularAirports(): Airport[] {
  return AIRPORTS.filter((a) => a.isPopular);
}

export function getChartsForAirport(icao: string): ChartSummary[] {
  return CHARTS_BY_ICAO.get(icao.toUpperCase()) ?? [];
}

export function getChartsByCategory(icao: string, category: ChartCategoryValue): ChartSummary[] {
  return getChartsForAirport(icao)
    .filter((c) => c.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** Resolves a chart id to the chart plus the airport that owns it. */
export function getChartById(id: string): { chart: ChartSummary; airport: Airport } | null {
  const entry = CHARTS_BY_ID.get(id);
  if (!entry) return null;
  const airport = AIRPORTS_BY_ICAO.get(entry.icao);
  if (!airport) return null;
  return { chart: entry.chart, airport };
}
