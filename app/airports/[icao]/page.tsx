import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getMetar, getTaf } from "@/lib/weather/aviationWeather";
import { getSunTimes } from "@/lib/weather/sunTimes";
import type { AirportWeather } from "@/types/weather";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackButton } from "@/components/layout/BackButton";
import { AirportHeader } from "@/components/airport/AirportHeader";
import { AirportMap } from "@/components/airport/AirportMap";
import { RunwayTable } from "@/components/airport/RunwayTable";
import { FrequencyTable } from "@/components/airport/FrequencyTable";
import { WeatherPanel } from "@/components/airport/WeatherPanel";
import { FunFactCard } from "@/components/airport/FunFactCard";
import { LinkButton } from "@/components/ui/Button";

async function getAirport(icao: string) {
  return prisma.airport.findUnique({
    where: { icao: icao.toUpperCase() },
    include: { runways: true, frequencies: true, funFact: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ icao: string }>;
}): Promise<Metadata> {
  const { icao } = await params;
  const airport = await getAirport(icao);
  if (!airport) return { title: "Airport Not Found" };
  return {
    title: `${airport.name} (${airport.icao})`,
    description: `Airport information, charts, weather and facts for ${airport.name} — ${airport.city}, ${airport.country}.`,
  };
}

export default async function AirportPage({
  params,
}: {
  params: Promise<{ icao: string }>;
}) {
  const { icao } = await params;
  const airport = await getAirport(icao);

  if (!airport) notFound();

  const [metar, taf] = await Promise.all([getMetar(airport.icao), getTaf(airport.icao)]);
  const sun = getSunTimes(airport.latitude, airport.longitude, airport.timezone);
  const initialWeather: AirportWeather = { icao: airport.icao, metar, taf, sun };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Airports", href: "/airports" },
            { label: airport.name },
          ]}
        />
        <BackButton fallbackHref="/airports" />
      </div>

      <AirportHeader
        icao={airport.icao}
        iata={airport.iata}
        name={airport.name}
        city={airport.city}
        country={airport.country}
        elevationFt={airport.elevationFt}
        latitude={airport.latitude}
        longitude={airport.longitude}
        timezone={airport.timezone}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-80 overflow-hidden rounded-2xl">
          <AirportMap
            latitude={airport.latitude}
            longitude={airport.longitude}
            name={airport.name}
            icao={airport.icao}
            runways={airport.runways
              .filter((r) => r.headingDegT !== null && r.lengthFt !== null)
              .map((r) => ({
                ident: r.ident,
                headingDegT: r.headingDegT as number,
                lengthFt: r.lengthFt as number,
              }))}
          />
        </div>
        <WeatherPanel icao={airport.icao} initialWeather={initialWeather} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Runways</h2>
          <RunwayTable runways={airport.runways} />
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Frequencies</h2>
          <FrequencyTable frequencies={airport.frequencies} />
        </section>
      </div>

      {airport.funFact && (
        <div className="mt-8">
          <FunFactCard fact={airport.funFact.fact} />
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <LinkButton href={`/airports/${airport.icao.toLowerCase()}/charts`} variant="primary">
          View Airport Charts
        </LinkButton>
      </div>
    </div>
  );
}
