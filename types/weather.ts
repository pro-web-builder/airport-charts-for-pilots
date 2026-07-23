export type FlightCategory = "VFR" | "MVFR" | "IFR" | "LIFR" | "UNKNOWN";

export type Metar = {
  raw: string;
  reportTime: string | null;
  tempC: number | null;
  windDirDegrees: number | null;
  windSpeedKt: number | null;
  /** Statute miles as reported by the source (e.g. "6+", "10+", "1/2") — not converted, to avoid false precision. */
  visibilityStatuteMiles: string | null;
  flightCategory: FlightCategory;
};

export type Taf = {
  raw: string;
  issueTime: string | null;
};

export type SunTimes = {
  sunriseUtc: string;
  sunsetUtc: string;
  sunriseLocal: string;
  sunsetLocal: string;
  isDaytimeNow: boolean;
};

export type AirportWeather = {
  icao: string;
  metar: Metar | null;
  taf: Taf | null;
  sun: SunTimes;
};
