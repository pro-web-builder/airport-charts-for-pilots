import { getPopularAirports } from "@/lib/airports/data";
import { PopularAirportCard } from "./PopularAirportCard";

export function PopularAirportsGrid() {
  const airports = getPopularAirports();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Popular Airports
        </h2>
        <p className="text-foreground-dim">
          Jump straight into the world&rsquo;s busiest hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {airports.map((airport) => (
          <PopularAirportCard key={airport.icao} airport={airport} />
        ))}
      </div>
    </section>
  );
}
