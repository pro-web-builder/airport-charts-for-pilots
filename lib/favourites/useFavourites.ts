import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "acfp:favourites";

export type FavouriteAirport = {
  icao: string;
  iata: string | null;
  name: string;
  city: string;
  country: string;
  addedAt: number;
};

export function useFavourites() {
  const [favourites, setFavourites, hydrated] = useLocalStorage<FavouriteAirport[]>(STORAGE_KEY, []);

  const isFavourite = useCallback(
    (icao: string) => favourites.some((f) => f.icao === icao),
    [favourites]
  );

  const toggleFavourite = useCallback(
    (airport: Omit<FavouriteAirport, "addedAt">) => {
      setFavourites((prev) => {
        const exists = prev.some((f) => f.icao === airport.icao);
        if (exists) return prev.filter((f) => f.icao !== airport.icao);
        return [{ ...airport, addedAt: Date.now() }, ...prev];
      });
    },
    [setFavourites]
  );

  const favouriteIcaos = useMemo(() => new Set(favourites.map((f) => f.icao)), [favourites]);

  return { favourites, favouriteIcaos, isFavourite, toggleFavourite, hydrated };
}
