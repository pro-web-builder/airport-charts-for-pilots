import { prisma } from "@/lib/prisma";
import type { AirportSearchResult } from "@/types/airport";

const SCORE = {
  EXACT_CODE: 100,
  PREFIX_CODE: 60,
  NAME_PREFIX: 40,
  NAME_CONTAINS: 20,
  LOCATION_CONTAINS: 10,
} as const;

function scoreAirport(
  airport: { icao: string; iata: string | null; name: string; city: string; country: string },
  term: string,
  upper: string
) {
  let score = 0;
  if (airport.icao === upper || airport.iata === upper) score = Math.max(score, SCORE.EXACT_CODE);
  if (airport.icao.startsWith(upper) || (airport.iata?.startsWith(upper) ?? false)) {
    score = Math.max(score, SCORE.PREFIX_CODE);
  }
  const lowerName = airport.name.toLowerCase();
  const lowerTerm = term.toLowerCase();
  if (lowerName.startsWith(lowerTerm)) score = Math.max(score, SCORE.NAME_PREFIX);
  else if (lowerName.includes(lowerTerm)) score = Math.max(score, SCORE.NAME_CONTAINS);
  if (
    airport.city.toLowerCase().includes(lowerTerm) ||
    airport.country.toLowerCase().includes(lowerTerm)
  ) {
    score = Math.max(score, SCORE.LOCATION_CONTAINS);
  }
  return score;
}

export async function searchAirports(rawQuery: string, limit = 8): Promise<AirportSearchResult[]> {
  const term = rawQuery.trim();
  if (!term) return [];
  const upper = term.toUpperCase();

  const airports = await prisma.airport.findMany({
    where: {
      OR: [
        { icao: { equals: upper } },
        { iata: { equals: upper } },
        { icao: { startsWith: upper } },
        { iata: { startsWith: upper } },
        { name: { contains: term, mode: "insensitive" } },
        { city: { contains: term, mode: "insensitive" } },
        { country: { contains: term, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      icao: true,
      iata: true,
      name: true,
      city: true,
      country: true,
      latitude: true,
      longitude: true,
    },
    take: 50,
  });

  return airports
    .map((airport) => ({ airport, score: scoreAirport(airport, term, upper) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.airport);
}
