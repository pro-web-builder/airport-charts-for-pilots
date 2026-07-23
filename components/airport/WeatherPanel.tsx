"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { AirportWeather, FlightCategory } from "@/types/weather";

const CATEGORY_TONE: Record<FlightCategory, "success" | "brand" | "warning" | "danger" | "neutral"> = {
  VFR: "success",
  MVFR: "brand",
  IFR: "warning",
  LIFR: "danger",
  UNKNOWN: "neutral",
};

const POLL_INTERVAL_MS = 5 * 60 * 1000;

export function WeatherPanel({ icao, initialWeather }: { icao: string; initialWeather: AirportWeather }) {
  const [weather, setWeather] = useState(initialWeather);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/weather/${icao}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data: AirportWeather | null) => {
          if (data) setWeather(data);
        })
        .catch(() => {
          // keep showing last-known weather on transient fetch failures
        });
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [icao]);

  const { metar, taf, sun } = weather;

  return (
    <GlassCard className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-faint">
          Live Weather
        </h3>
        {metar && <Badge tone={CATEGORY_TONE[metar.flightCategory]}>{metar.flightCategory}</Badge>}
      </div>

      {metar ? (
        <div className="flex flex-col gap-2">
          <p className="font-mono text-sm text-foreground">{metar.raw}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-foreground-dim">
            {metar.tempC !== null && <span>Temp: {metar.tempC}°C</span>}
            {metar.windDirDegrees !== null && metar.windSpeedKt !== null && (
              <span>
                Wind: {metar.windDirDegrees}° at {metar.windSpeedKt}kt
              </span>
            )}
            {metar.visibilityStatuteMiles && <span>Visibility: {metar.visibilityStatuteMiles} SM</span>}
          </div>
        </div>
      ) : (
        <p className="text-sm text-foreground-dim">METAR unavailable right now.</p>
      )}

      {taf ? (
        <div className="border-t border-panel-border pt-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground-faint">TAF</p>
          <p className="font-mono text-xs leading-relaxed text-foreground-dim">{taf.raw}</p>
        </div>
      ) : (
        <div className="border-t border-panel-border pt-4">
          <p className="text-sm text-foreground-dim">TAF unavailable right now.</p>
        </div>
      )}

      <div className="flex justify-between border-t border-panel-border pt-4 text-sm">
        <div className="flex items-center gap-2">
          <SunriseIcon className="h-4 w-4 text-brand-dim" />
          <span className="text-foreground-dim">Sunrise {sun.sunriseLocal}</span>
        </div>
        <div className="flex items-center gap-2">
          <SunsetIcon className="h-4 w-4 text-brand-dim" />
          <span className="text-foreground-dim">Sunset {sun.sunsetLocal}</span>
        </div>
      </div>
    </GlassCard>
  );
}

function SunriseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4M5.6 8.6l1.4 1.4M18.4 8.6L17 10M2 18h20M6 18a6 6 0 0 1 12 0" />
    </svg>
  );
}

function SunsetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V5M5.6 11.6l1.4-1.4M18.4 11.6L17 10.2M2 18h20M6 18a6 6 0 0 1 12 0" />
    </svg>
  );
}
