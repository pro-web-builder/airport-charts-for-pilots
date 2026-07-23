import type { FlightCategory, Metar, Taf } from "@/types/weather";

const BASE_URL = "https://aviationweather.gov/api/data";
const REVALIDATE_SECONDS = 600;

const VALID_CATEGORIES: FlightCategory[] = ["VFR", "MVFR", "IFR", "LIFR"];

function toIsoTime(value: number | string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return new Date(value * 1000).toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

interface RawMetar {
  rawOb: string;
  obsTime: number | string;
  temp: number | null;
  wdir: number | string | null;
  wspd: number | null;
  visib: string | number | null;
  fltCat: string | null;
}

interface RawTaf {
  rawTAF: string;
  issueTime: number | string;
}

export async function getMetar(icao: string): Promise<Metar | null> {
  try {
    const res = await fetch(`${BASE_URL}/metar?ids=${icao}&format=json`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data: RawMetar[] = await res.json();
    const entry = data[0];
    if (!entry) return null;

    const category = (entry.fltCat ?? "").toUpperCase();

    return {
      raw: entry.rawOb,
      reportTime: toIsoTime(entry.obsTime),
      tempC: typeof entry.temp === "number" ? entry.temp : null,
      windDirDegrees: typeof entry.wdir === "number" ? entry.wdir : null,
      windSpeedKt: typeof entry.wspd === "number" ? entry.wspd : null,
      visibilityStatuteMiles: entry.visib != null ? String(entry.visib) : null,
      flightCategory: (VALID_CATEGORIES as string[]).includes(category)
        ? (category as FlightCategory)
        : "UNKNOWN",
    };
  } catch {
    return null;
  }
}

export async function getTaf(icao: string): Promise<Taf | null> {
  try {
    const res = await fetch(`${BASE_URL}/taf?ids=${icao}&format=json`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data: RawTaf[] = await res.json();
    const entry = data[0];
    if (!entry) return null;

    return {
      raw: entry.rawTAF,
      issueTime: toIsoTime(entry.issueTime),
    };
  } catch {
    return null;
  }
}
