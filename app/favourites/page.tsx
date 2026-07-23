"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { LinkButton } from "@/components/ui/Button";
import { useFavourites } from "@/lib/favourites/useFavourites";
import { useSearchHistory } from "@/lib/history/useSearchHistory";

export default function FavouritesPage() {
  const { favourites, toggleFavourite, hydrated } = useFavourites();
  const { history } = useSearchHistory();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Favourites" }]} />

      <h1 className="mt-6 mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Favourites
      </h1>
      <p className="mb-8 text-foreground-dim">
        Saved on this device — favourites and recent searches are stored locally in your browser.
      </p>

      {!hydrated ? null : favourites.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <p className="text-foreground-dim">You haven&rsquo;t favourited any airports yet.</p>
          <LinkButton href="/airports" variant="primary" className="mt-4">
            Browse Airports
          </LinkButton>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {favourites.map((airport) => (
            <GlassCard key={airport.icao} className="flex items-center justify-between gap-4 p-4">
              <Link href={`/airports/${airport.icao.toLowerCase()}`} className="flex-1">
                <p className="font-semibold text-foreground">{airport.name}</p>
                <p className="text-sm text-foreground-dim">
                  {airport.city}, {airport.country} &middot;{" "}
                  <span className="font-mono text-brand-dim">{airport.icao}</span>
                </p>
              </Link>
              <button
                type="button"
                onClick={() => toggleFavourite(airport)}
                className="rounded-full border border-panel-border px-3 py-1.5 text-xs font-medium text-foreground-dim hover:border-red-500/50 hover:text-red-400"
              >
                Remove
              </button>
            </GlassCard>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Recently Viewed</h2>
          <div className="flex flex-col gap-3">
            {history.map((item) => (
              <GlassCard key={item.icao} className="p-4">
                <Link href={`/airports/${item.icao.toLowerCase()}`}>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-foreground-dim">
                    {item.city}, {item.country} &middot;{" "}
                    <span className="font-mono text-brand-dim">{item.icao}</span>
                  </p>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
