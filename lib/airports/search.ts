import { getAllAirports } from "@/lib/airports/data";
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

export function searchAirports(rawQuery: string, limit = 8): AirportSearchResult[] {
  const term = rawQuery.trim();
  if (!term) return [];
  const upper = term.toUpperCase();
  const lower = term.toLowerCase();

  // Mirrors the OR-clause the database query used to run, then hands the
  // candidates to the same scorer as before.
  const airports = getAllAirports()
    .filter(
      (a) =>
        a.icao === upper ||
        a.iata === upper ||
        a.icao.startsWith(upper) ||
        (a.iata?.startsWith(upper) ?? false) ||
        a.name.toLowerCase().includes(lower) ||
        a.city.toLowerCase().includes(lower) ||
        a.country.toLowerCase().includes(lower)
    )
    .slice(0, 50)
    .map<AirportSearchResult>((a) => ({
      id: a.id,
      icao: a.icao,
      iata: a.iata,
      name: a.name,
      city: a.city,
      country: a.country,
      latitude: a.latitude,
      longitude: a.longitude,
    }));

  return airports
    .map((airport) => ({ airport, score: scoreAirport(airport, term, upper) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.airport);
}
