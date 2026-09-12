export type Runway = {
  id: string;
  ident: string;
  leIdent: string | null;
  heIdent: string | null;
  lengthFt: number | null;
  widthFt: number | null;
  surface: string | null;
  lighted: boolean;
  headingDegT: number | null;
};

export type Frequency = {
  id: string;
  type: string;
  description: string | null;
  frequencyMhz: number;
};

export type Airport = {
  id: string;
  icao: string;
  iata: string | null;
  name: string;
  city: string;
  country: string;
  countryCode: string | null;
  region: string | null;
  latitude: number;
  longitude: number;
  elevationFt: number | null;
  timezone: string;
  type: string | null;
  isPopular: boolean;
  runways: Runway[];
  frequencies: Frequency[];
  funFact: string | null;
};

export type AirportSearchResult = {
  id: string;
  icao: string;
  iata: string | null;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};
