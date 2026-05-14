"use client";

import { useRef, useState, useCallback } from "react";
import Map, { type MapClientHandle } from "../components/Map";  // ← relative, inside app/
import { useSearch } from "@/hooks/useSearch";
import { useRouting } from "@/hooks/useRouting";
import { SAMPLE_ROUTES } from "@/data/routes";
import type { SearchResult, LatLng } from "@/types/map";

import styles from "./map.module.css";

export default function MapPage() {
  const mapRef = useRef<MapClientHandle>(null);

  // ── Search ────────────────────────────────────────────────────────────────
  const { query, setQuery, results, isLoading: searchLoading, clearResults } =
    useSearch();
  const [searchMarker, setSearchMarker] = useState<SearchResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  // ── Routing ───────────────────────────────────────────────────────────────
  const { route, isLoading: routeLoading, error: routeError, fetchRoute, clearRoute } =
    useRouting();
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [originLabel, setOriginLabel] = useState("");
  const [destLabel, setDestLabel] = useState("");

  // ── Visible predefined routes ─────────────────────────────────────────────
  const [visibleRoutes, setVisibleRoutes] = useState<Set<string>>(
    new Set(SAMPLE_ROUTES.map((r) => r.id))
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────────────────────

  function handleSelectSearchResult(result: SearchResult) {
    setSearchMarker(result);
    setShowResults(false);
    clearResults();
    mapRef.current?.flyTo(result.lat, result.lng, 16);
  }

  function handleSetAsOrigin(result: SearchResult) {
    setOrigin({ lat: result.lat, lng: result.lng });
    setOriginLabel(result.shortLabel);
    setSearchMarker(null);
    setShowResults(false);
    clearResults();
  }

  function handleSetAsDestination(result: SearchResult) {
    setDestination({ lat: result.lat, lng: result.lng });
    setDestLabel(result.shortLabel);
    setSearchMarker(null);
    setShowResults(false);
    clearResults();
  }

  async function handleGetDirections() {
    if (!origin || !destination) return;
    await fetchRoute([origin, destination]);
  }

  // Fit map to route after fetchRoute resolves
  const prevRouteRef = useRef(route);
  if (route && route !== prevRouteRef.current) {
    prevRouteRef.current = route;
    setTimeout(() => {
      if (route.coords) mapRef.current?.fitRoute(route.coords);
    }, 50);
  }

  function toggleRoute(id: string) {
    setVisibleRoutes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleClearAll() {
    clearRoute();
    setOrigin(null);
    setOriginLabel("");
    setDestination(null);
    setDestLabel("");
  }

  const displayedRoutes = SAMPLE_ROUTES.filter((r) => visibleRoutes.has(r.id));

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.layout}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.appTitle}>RouteMap</h1>
          <p className={styles.appSubtitle}>Cebu Transit Guide</p>
        </div>

        {/* Search */}
        <section className={styles.section}>
          <label className={styles.sectionLabel}>Search Place</label>
          <div className={styles.searchBox}>
            <input
              className={styles.input}
              type="text"
              placeholder="e.g. SM City Cebu, Ayala..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
            {searchLoading && (
              <span className={styles.searchSpinner} aria-label="Searching" />
            )}
          </div>

          {showResults && results.length > 0 && (
            <ul className={styles.resultsList}>
              {results.map((r) => (
                <li key={r.id} className={styles.resultItem}>
                  <button
                    className={styles.resultMain}
                    onClick={() => handleSelectSearchResult(r)}
                  >
                    <span className={styles.resultName}>{r.shortLabel}</span>
                    <span className={styles.resultSub}>{r.label}</span>
                  </button>
                  <div className={styles.resultActions}>
                    <button className={styles.tagBtn} onClick={() => handleSetAsOrigin(r)}>
                      From
                    </button>
                    <button className={styles.tagBtn} onClick={() => handleSetAsDestination(r)}>
                      To
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Directions */}
        <section className={styles.section}>
          <label className={styles.sectionLabel}>Get Directions</label>

          <div className={styles.waypointRow}>
            <span className={styles.waypointDot} style={{ background: "#22c55e" }} />
            <div className={styles.waypointInput}>
              {originLabel ? (
                <span className={styles.waypointLabel}>{originLabel}</span>
              ) : (
                <span className={styles.waypointPlaceholder}>Set origin from search ↑</span>
              )}
              {originLabel && (
                <button className={styles.clearBtn} onClick={() => { setOrigin(null); setOriginLabel(""); clearRoute(); }}>
                  ×
                </button>
              )}
            </div>
          </div>

          <div className={styles.waypointRow}>
            <span className={styles.waypointDot} style={{ background: "#ef4444" }} />
            <div className={styles.waypointInput}>
              {destLabel ? (
                <span className={styles.waypointLabel}>{destLabel}</span>
              ) : (
                <span className={styles.waypointPlaceholder}>Set destination from search ↑</span>
              )}
              {destLabel && (
                <button className={styles.clearBtn} onClick={() => { setDestination(null); setDestLabel(""); clearRoute(); }}>
                  ×
                </button>
              )}
            </div>
          </div>

          <button
            className={styles.directionsBtn}
            onClick={handleGetDirections}
            disabled={!origin || !destination || routeLoading}
          >
            {routeLoading ? "Calculating…" : "Get Directions"}
          </button>

          {routeError && <p className={styles.errorText}>{routeError}</p>}

          {route && (
            <div className={styles.routeInfo}>
              <div className={styles.routeInfoItem}>
                <span className={styles.routeInfoValue}>{route.distanceKm}</span>
                <span className={styles.routeInfoUnit}>km</span>
              </div>
              <div className={styles.routeInfoDivider} />
              <div className={styles.routeInfoItem}>
                <span className={styles.routeInfoValue}>{route.durationMin}</span>
                <span className={styles.routeInfoUnit}>min</span>
              </div>
              <button className={styles.clearRouteBtn} onClick={handleClearAll}>
                Clear
              </button>
            </div>
          )}
        </section>

        {/* Route toggles */}
        <section className={styles.section}>
          <label className={styles.sectionLabel}>Transit Routes</label>
          <div className={styles.routeToggles}>
            {SAMPLE_ROUTES.map((r) => (
              <button
                key={r.id}
                className={`${styles.routeToggle} ${visibleRoutes.has(r.id) ? styles.routeToggleActive : ""}`}
                onClick={() => toggleRoute(r.id)}
                style={visibleRoutes.has(r.id) ? { borderColor: r.color, color: r.color } : {}}
              >
                <span
                  className={styles.routeToggleDot}
                  style={{ background: visibleRoutes.has(r.id) ? r.color : "#94a3b8" }}
                />
                {r.name}
              </button>
            ))}
          </div>
        </section>

        <div className={styles.sidebarFooter}>
          <p>Tiles © <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap</a></p>
          <p>Routing by <a href="https://project-osrm.org/" target="_blank" rel="noopener noreferrer">OSRM</a></p>
        </div>
      </aside>

      {/* ── Map ── */}
      <main className={styles.mapArea}>
        <Map
          ref={mapRef}
          busRoutes={displayedRoutes}
          activeRouteCoords={route?.coords ?? null}
          activeRouteColor="#6366f1"
          searchMarker={searchMarker}
        />
      </main>
    </div>
  );
}