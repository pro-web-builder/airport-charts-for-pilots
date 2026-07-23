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
