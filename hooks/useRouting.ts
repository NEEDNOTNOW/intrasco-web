import { useState, useCallback } from "react";
import type { RouteInfo, LatLng } from "@/types/map";

// Public OSRM instance — for production, self-host with PH OSM data:
// https://github.com/Project-OSRM/osrm-backend
const OSRM_URL = "https://router.project-osrm.org/route/v1";

// Profile can be: driving | walking | cycling
type RoutingProfile = "driving" | "walking" | "cycling";

interface UseRoutingReturn {
  route: RouteInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchRoute: (
    waypoints: LatLng[],
    profile?: RoutingProfile
  ) => Promise<void>;
  clearRoute: () => void;
}

export function useRouting(): UseRoutingReturn {
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch a road-snapped route between two or more waypoints.
   * Waypoints: array of { lat, lng } — at least 2 required.
   */
  const fetchRoute = useCallback(
    async (waypoints: LatLng[], profile: RoutingProfile = "driving") => {
      if (waypoints.length < 2) {
        setError("At least 2 waypoints are required.");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // OSRM expects coordinates as lng,lat pairs separated by semicolons
        const coordString = waypoints
          .map((p) => `${p.lng},${p.lat}`)
          .join(";");

        const params = new URLSearchParams({
          overview: "full",
          geometries: "geojson",
          steps: "false",
        });

        const url = `${OSRM_URL}/${profile}/${coordString}?${params}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error(`OSRM error: ${res.status}`);

        const data = await res.json();

        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error("No route found between these points.");
        }

        const osrmRoute = data.routes[0];

        // OSRM returns [lng, lat] — flip to [lat, lng] for Leaflet
        const coords: [number, number][] =
          osrmRoute.geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng]
          );

        const distanceKm = (osrmRoute.distance / 1000).toFixed(2);
        const durationMin = Math.round(osrmRoute.duration / 60);

        setRoute({ coords, distanceKm, durationMin });
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch route.");
        setRoute(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearRoute = useCallback(() => {
    setRoute(null);
    setError(null);
  }, []);

  return { route, isLoading, error, fetchRoute, clearRoute };
}