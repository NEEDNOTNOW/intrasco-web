"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

import { fixLeafletIcons, createStopIcon } from "@/lib/Leafleticons";
import type { RouteInfo, SearchResult, BusRoute } from "@/types/map";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MapClientProps {
  busRoutes?: BusRoute[];
  activeRouteCoords?: [number, number][] | null;
  activeRouteColor?: string;
  searchMarker?: SearchResult | null;
  onMapReady?: (map: LeafletMap) => void;
}

export interface MapClientHandle {
  flyTo: (lat: number, lng: number, zoom?: number) => void;
  fitRoute: (coords: [number, number][]) => void;
}

// ─── Internal helper: exposes map instance to parent via ref ──────────────────

function MapController({
  onReady,
  handleRef,
}: {
  onReady?: (map: LeafletMap) => void;
  handleRef: React.RefObject<MapClientHandle | null>;
}) {
  const map = useMap();

  useEffect(() => {
    onReady?.(map);
  }, [map, onReady]);

  useImperativeHandle(
    handleRef,
    () => ({
      flyTo(lat, lng, zoom = 16) {
        map.flyTo([lat, lng], zoom, { duration: 1.2 });
      },
      fitRoute(coords) {
        if (!coords.length) return;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const L = require("leaflet");
        const bounds = L.latLngBounds(coords);
        map.fitBounds(bounds, { padding: [48, 48] });
      },
    }),
    [map]
  );

  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

const MapClient = forwardRef<MapClientHandle, MapClientProps>(function MapClient(
  {
    busRoutes = [],
    activeRouteCoords,
    activeRouteColor = "#ef4444",
    searchMarker,
    onMapReady,
  },
  ref
) {
  const innerRef = useRef<MapClientHandle | null>(null);

  useImperativeHandle(ref, () => ({
    flyTo: (...args) => innerRef.current?.flyTo(...args),
    fitRoute: (...args) => innerRef.current?.fitRoute(...args),
  }));

  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <MapContainer
      center={[10.3157, 123.8854]} // Default: Cebu City
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />

      <MapController onReady={onMapReady} handleRef={innerRef} />

      {/* Predefined bus/jeep routes */}
      {busRoutes.map((route) => (
        <Polyline
          key={route.id}
          positions={route.stops.map((s) => [s.lat, s.lng] as [number, number])}
          pathOptions={{
            color: route.color,
            weight: 5,
            opacity: 0.75,
            lineCap: "round",
            lineJoin: "round",
          }}
        >
          <Popup>{route.name}</Popup>
        </Polyline>
      ))}

      {/* Stop markers for predefined routes */}
      {busRoutes.flatMap((route) =>
        route.stops.map((stop, index) => {
          const isTerminal = index === 0 || index === route.stops.length - 1;
          return (
            <Marker
              key={`${route.id}-stop-${stop.id}`}
              position={[stop.lat, stop.lng]}
              icon={createStopIcon(route.color, isTerminal)}
            >
              <Popup>
                <strong>{stop.name}</strong>
                <br />
                <span style={{ color: route.color, fontWeight: 600 }}>
                  {route.name}
                </span>
                {isTerminal && (
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#6b7280",
                      marginTop: 2,
                    }}
                  >
                    {index === 0 ? "Start Terminal" : "End Terminal"}
                  </span>
                )}
              </Popup>
            </Marker>
          );
        })
      )}

      {/* OSRM-fetched road-snapped route */}
      {activeRouteCoords && activeRouteCoords.length > 0 && (
        <>
          {/* Shadow for depth */}
          <Polyline
            positions={activeRouteCoords}
            pathOptions={{ color: "#000", weight: 9, opacity: 0.15, lineCap: "round" }}
          />
          {/* Main line */}
          <Polyline
            positions={activeRouteCoords}
            pathOptions={{
              color: activeRouteColor,
              weight: 5,
              opacity: 1,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
          <Marker position={activeRouteCoords[0]} icon={createStopIcon("#22c55e", true)}>
            <Popup>Start</Popup>
          </Marker>
          <Marker
            position={activeRouteCoords[activeRouteCoords.length - 1]}
            icon={createStopIcon("#ef4444", true)}
          >
            <Popup>End</Popup>
          </Marker>
        </>
      )}

      {/* Search result marker */}
      {searchMarker && (
        <Marker position={[searchMarker.lat, searchMarker.lng]}>
          <Popup>
            <strong>{searchMarker.shortLabel}</strong>
            <br />
            <span style={{ fontSize: "11px", color: "#6b7280", display: "block" }}>
              {searchMarker.label}
            </span>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
});

export default MapClient;