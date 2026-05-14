import type { BusRoute } from "@/types/map";

/**
 * Sample jeepney/bus routes for Cebu City.
 * Replace or extend with your actual route data.
 *
 * Each stop has real coordinates. For a production app, store these
 * in a database (Supabase, PostgreSQL with PostGIS, etc.) and fetch
 * them via an API route.
 */
export const SAMPLE_ROUTES: BusRoute[] = [
  {
    id: "01A",
    name: "01A — Calumpang City",
    color: "#f59e0b",
    stops: [
      { id: "s1", name: "Colon Street Terminal", lat: 10.68708, lng: 122.51679 },
      { id: "s2", name: "Carbon Market", lat: 10.68755, lng: 122.52067 },
      { id: "s3", name: "Fuente Osmeña", lat: 10.68773, lng: 122.52251 },
      { id: "s4", name: "Mango Avenue", lat: 10.68823, lng: 122.52456 },
      { id: "s5", name: "Capitol Site", lat: 10.68910, lng: 122.52435 },
      { id: "s6", name: "SM City Cebu", lat: 10.68898, lng: 122.5220 },
    ],
  },
  {
    id: "62B",
    name: "62B — Ayala–Talamban",
    color: "#3b82f6",
    stops: [
      { id: "t1", name: "Ayala Center Cebu", lat: 10.3179, lng: 123.9054 },
      { id: "t2", name: "Archbishop Reyes Ave", lat: 10.3221, lng: 123.9065 },
      { id: "t3", name: "IT Park", lat: 10.3312, lng: 123.9070 },
      { id: "t4", name: "Gaisano Country Mall", lat: 10.3401, lng: 123.9089 },
      { id: "t5", name: "Talamban Junction", lat: 10.3612, lng: 123.9102 },
    ],
  },
];