import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "acfp:recentSearches";
const MAX_ENTRIES = 8;

export type RecentSearch = {
  icao: string;
  name: string;
  city: string;
  country: string;
  searchedAt: number;
};

export function useSearchHistory() {
  const [history, setHistory, hydrated] = useLocalStorage<RecentSearch[]>(STORAGE_KEY, []);

  const record = useCallback(
    (entry: Omit<RecentSearch, "searchedAt">) => {
      setHistory((prev) => {
        const deduped = prev.filter((item) => item.icao !== entry.icao);
        return [{ ...entry, searchedAt: Date.now() }, ...deduped].slice(0, MAX_ENTRIES);
      });
    },
    [setHistory]
  );

  const clear = useCallback(() => setHistory([]), [setHistory]);

  return { history, record, clear, hydrated };
}
