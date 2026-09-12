import { NextRequest, NextResponse } from "next/server";
import { getAirportByIcao } from "@/lib/airports/data";
import { getMetar, getTaf } from "@/lib/weather/aviationWeather";
import { getSunTimes } from "@/lib/weather/sunTimes";
import type { AirportWeather } from "@/types/weather";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ icao: string }> }
) {
  const { icao } = await params;
  const upperIcao = icao.toUpperCase();

  const airport = getAirportByIcao(upperIcao);

  if (!airport) {
    return NextResponse.json({ error: "Airport not found" }, { status: 404 });
  }

  const [metar, taf] = await Promise.all([getMetar(upperIcao), getTaf(upperIcao)]);
  const sun = getSunTimes(airport.latitude, airport.longitude, airport.timezone);

  const response: AirportWeather = { icao: upperIcao, metar, taf, sun };
  return NextResponse.json(response);
}
