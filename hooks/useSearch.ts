import { useState, useEffect, useRef, useCallback } from "react";
import type { SearchResult } from "@/types/map";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 3) {
      setResults([]);
      return;
    }

    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: debouncedQuery,
          format: "json",
          limit: "6",
          addressdetails: "1",
          // Bias results toward the Philippines
          countrycodes: "ph",
        });

        const res = await fetch(`${NOMINATIM_URL}?${params}`, {
          headers: {
            "Accept-Language": "en",
            // Nominatim requires a User-Agent for production usage
            // Replace with your app name & contact
            "User-Agent": "BusRouteApp/1.0",
          },
          signal: abortRef.current!.signal,
        });

        if (!res.ok) throw new Error("Search request failed");

        const data = await res.json();

        const mapped: SearchResult[] = data.map((item: any, index: number) => {
          // Build a short readable label from address components
          const addr = item.address ?? {};
          const parts = [
            addr.road || addr.pedestrian || addr.footway,
            addr.suburb || addr.neighbourhood || addr.village,
            addr.city || addr.town || addr.municipality,
          ].filter(Boolean);

          return {
            id: item.place_id?.toString() ?? String(index),
            label: item.display_name,
            shortLabel: parts.length > 0 ? parts.join(", ") : item.display_name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
          };
        });

        setResults(mapped);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Search failed. Please try again.");
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();

    return () => {
      abortRef.current?.abort();
    };
  }, [debouncedQuery]);

  const clearResults = useCallback(() => {
    setQuery("");
    setResults([]);
  }, []);

  return { query, setQuery, results, isLoading, error, clearResults };
}