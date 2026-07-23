"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useSearchHistory } from "@/lib/history/useSearchHistory";
import type { AirportSearchResult } from "@/types/airport";
import { cn } from "@/lib/utils/cn";

type SearchAutocompleteProps = {
  size?: "lg" | "md";
  placeholder?: string;
  autoFocus?: boolean;
};

export function SearchAutocomplete({
  size = "md",
  placeholder = "Search by ICAO, IATA, airport name, city or country…",
  autoFocus,
}: SearchAutocompleteProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AirportSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const { history, record } = useSearchHistory();

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      // Clearing results here (rather than deriving them at render time) keeps
      // the fetch/reset logic for debouncedQuery in one place.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/airports?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then((data: { results: AirportSearchResult[] }) => {
        if (!cancelled) setResults(data.results);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const showingHistory = query.trim().length === 0 && history.length > 0;
  const listItems = showingHistory ? history : results;

  function goToAirport(airport: { icao: string; name: string; city: string; country: string; iata?: string | null }) {
    record({ icao: airport.icao, name: airport.name, city: airport.city, country: airport.country });
    setOpen(false);
    setQuery("");
    router.push(`/airports/${airport.icao.toLowerCase()}`);
  }

  const { activeIndex, setActiveIndex, onKeyDown } = useKeyboardNav({
    itemCount: listItems.length,
    onSelect: (index) => {
      const item = listItems[index];
      if (item) goToAirport(item);
    },
    onEscape: () => setOpen(false),
  });

  const sizeClasses =
    size === "lg"
      ? "h-16 rounded-2xl pl-14 pr-6 text-base sm:text-lg"
      : "h-12 rounded-xl pl-11 pr-4 text-sm";

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <SearchIcon
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-foreground-faint",
            size === "lg" ? "left-5 h-5 w-5" : "left-3.5 h-4 w-4"
          )}
        />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          type="text"
          placeholder={placeholder}
          className={cn(
            "glass-panel w-full text-foreground placeholder:text-foreground-faint focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/30",
            sizeClasses
          )}
          aria-label="Search airports"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="airport-search-results"
          role="combobox"
        />
      </div>

      {open && (query.trim().length > 0 || showingHistory) && (
        <div
          id="airport-search-results"
          className="glass-panel absolute z-50 mt-2 max-h-96 w-full overflow-auto rounded-2xl p-2 shadow-2xl"
        >
          {showingHistory && (
            <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-foreground-faint">
              Recent Searches
            </p>
          )}
          {!showingHistory && loading && (
            <p className="px-3 py-4 text-sm text-foreground-dim">Searching&hellip;</p>
          )}
          {!showingHistory && !loading && results.length === 0 && query.trim().length > 0 && (
            <p className="px-3 py-4 text-sm text-foreground-dim">
              No airports found for &ldquo;{query}&rdquo;
            </p>
          )}
          {listItems.map((item, index) => (
            <button
              key={item.icao}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => goToAirport(item)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                index === activeIndex ? "bg-brand/15" : "hover:bg-white/5"
              )}
            >
              <span className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className="text-xs text-foreground-dim">
                  {item.city}, {item.country}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="rounded-md bg-panel px-2 py-0.5 font-mono text-xs text-brand-dim">
                  {item.icao}
                </span>
                {"iata" in item && item.iata && (
                  <span className="rounded-md bg-panel px-2 py-0.5 font-mono text-xs text-foreground-faint">
                    {item.iata}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
    </svg>
  );
}
