"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { useFavourites } from "@/lib/favourites/useFavourites";
import { useSearchHistory } from "@/lib/history/useSearchHistory";
import { formatCoordinates, formatDecimalCoordinates } from "@/lib/utils/formatCoords";

type AirportHeaderProps = {
  icao: string;
  iata: string | null;
  name: string;
  city: string;
  country: string;
  elevationFt: number | null;
  latitude: number;
  longitude: number;
  timezone: string;
};

export function AirportHeader({
  icao,
  iata,
  name,
  city,
  country,
  elevationFt,
  latitude,
  longitude,
  timezone,
}: AirportHeaderProps) {
  const { isFavourite, toggleFavourite, hydrated } = useFavourites();
  const { record } = useSearchHistory();
  const favourited = hydrated && isFavourite(icao);

  useEffect(() => {
    record({ icao, name, city, country });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icao]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone="brand" className="font-mono text-sm">
              {icao}
            </Badge>
            {iata && (
              <Badge className="font-mono text-sm">{iata}</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{name}</h1>
          <p className="mt-1 text-foreground-dim">
            {city}, {country}
          </p>
        </div>

        <button
          type="button"
          onClick={() => toggleFavourite({ icao, iata, name, city, country })}
          className="flex items-center gap-2 rounded-full border border-panel-border bg-panel px-4 py-2.5 text-sm font-medium text-foreground-dim transition-colors hover:border-brand/50 hover:text-foreground"
          aria-pressed={favourited}
        >
          <HeartIcon className="h-4 w-4" filled={favourited} />
          {favourited ? "Favourited" : "Add to Favourites"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Elevation" value={elevationFt !== null ? `${elevationFt.toLocaleString()} ft` : "—"} />
        <Stat label="Timezone" value={timezone} />
        <Stat label="Coordinates" value={formatDecimalCoordinates(latitude, longitude)} title={formatCoordinates(latitude, longitude)} />
        <Stat label="ICAO / IATA" value={`${icao}${iata ? ` / ${iata}` : ""}`} />
      </div>
    </div>
  );
}

function Stat({ label, value, title }: { label: string; value: string; title?: string }) {
  return (
    <div className="glass-panel rounded-xl px-4 py-3" title={title}>
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground-faint">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function HeartIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      className={`${className ?? ""} ${filled ? "text-brand" : ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2.3 4.5 6 4c2-.3 3.9.7 5 2.3C12.1 4.7 14 3.7 16 4c3.7.5 5.6 4.3 4 7.7C19.5 16.4 12 21 12 21z"
      />
    </svg>
  );
}
