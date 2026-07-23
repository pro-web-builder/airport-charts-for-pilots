import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SearchAutocomplete } from "@/components/home/SearchAutocomplete";
import { PopularAirportCard } from "@/components/home/PopularAirportCard";

export const metadata: Metadata = {
  title: "Airports",
  description: "Browse and search airports from around the world.",
};

export default async function AirportsPage() {
  const airports = await prisma.airport.findMany({
    select: { icao: true, iata: true, name: true, city: true, country: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Airports" }]} />

      <div className="mt-6 mb-10 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Airports</h1>
        <p className="max-w-2xl text-foreground-dim">
          Search by ICAO, IATA, airport name, city or country — or browse the full list below.
        </p>
        <div className="max-w-xl">
          <SearchAutocomplete size="md" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {airports.map((airport) => (
          <PopularAirportCard key={airport.icao} airport={airport} />
        ))}
      </div>
    </div>
  );
}
