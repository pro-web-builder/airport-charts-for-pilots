import { getTimes } from "suncalc";
import { DateTime } from "luxon";
import type { SunTimes } from "@/types/weather";

function formatLocal(date: Date | null, timezone: string): string {
  if (!date) return "—";
  return DateTime.fromJSDate(date).setZone(timezone).toFormat("HH:mm");
}

// sunrise/sunset can be null at high latitudes during polar day/night —
// the curated seed set has no such airports today, but a future worldwide
// import (see scripts/import-ourairports.ts) could include them.
export function getSunTimes(latitude: number, longitude: number, timezone: string, at = new Date()): SunTimes {
  const times = getTimes(at, latitude, longitude);

  const isDaytimeNow = times.alwaysUp
    ? true
    : times.alwaysDown
      ? false
      : times.sunrise !== null && times.sunset !== null
        ? at >= times.sunrise && at <= times.sunset
        : at >= times.solarNoon;

  return {
    sunriseUtc: times.sunrise?.toISOString() ?? "",
    sunsetUtc: times.sunset?.toISOString() ?? "",
    sunriseLocal: formatLocal(times.sunrise, timezone),
    sunsetLocal: formatLocal(times.sunset, timezone),
    isDaytimeNow,
  };
}
