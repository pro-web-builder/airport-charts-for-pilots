"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export type PopularAirportCardData = {
  icao: string;
  iata: string | null;
  name: string;
  city: string;
  country: string;
};

// Card visuals use a generated gradient + runway motif rather than a stock
// photo, consistent with the hero background (no photoreal image source
// available) — keeps every card visually distinct via the ICAO watermark.
export function PopularAirportCard({ airport }: { airport: PopularAirportCardData }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="glass-panel group flex flex-col overflow-hidden rounded-2xl"
    >
      <Link href={`/airports/${airport.icao.toLowerCase()}`} className="block">
        <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-brand/25 via-background-elevated to-background">
          <span className="select-none text-5xl font-bold tracking-tight text-white/10 transition-transform duration-300 group-hover:scale-110">
            {airport.icao}
          </span>
          <svg viewBox="0 0 200 40" className="absolute bottom-3 left-1/2 h-6 w-2/3 -translate-x-1/2 opacity-70">
            <rect x="0" y="16" width="200" height="8" rx="4" fill="#e9edf5" opacity="0.5" />
            {[10, 40, 70, 100, 130, 160, 190].map((x) => (
              <rect key={x} x={x} y="18.5" width="10" height="3" fill="#0078ff" />
            ))}
          </svg>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold text-foreground">{airport.name}</h3>
          <p className="text-sm text-foreground-dim">
            {airport.city}, {airport.country}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-md bg-panel px-2 py-1 font-mono text-xs text-brand-dim">
            {airport.icao}
          </span>
          {airport.iata && (
            <span className="rounded-md bg-panel px-2 py-1 font-mono text-xs text-foreground-faint">
              {airport.iata}
            </span>
          )}
        </div>

        <LinkButton href={`/airports/${airport.icao.toLowerCase()}/charts`} variant="outline" className="mt-1 w-full">
          View Charts
        </LinkButton>
      </div>
    </motion.div>
  );
}
