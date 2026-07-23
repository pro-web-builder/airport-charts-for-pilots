import { LinkButton } from "@/components/ui/Button";

export default function AirportNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-dim">Airport Not Found</p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        We couldn&rsquo;t find that airport
      </h1>
      <p className="max-w-md text-foreground-dim">
        Double-check the ICAO/IATA code, or search by airport name, city or country instead.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <LinkButton href="/airports" variant="primary">
          Browse Airports
        </LinkButton>
        <LinkButton href="/" variant="outline">
          Return Home
        </LinkButton>
      </div>
    </div>
  );
}
