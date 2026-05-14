export interface LatLng {
  lat: number;
  lng: number;
}

export interface SearchResult {
  id: string;
  label: string;
  shortLabel: string;
  lat: number;
  lng: number;
}

export interface RouteInfo {
  coords: [number, number][];
  distanceKm: string;
  durationMin: number;
}

export interface RouteStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface BusRoute {
  id: string;
  name: string;
  color: string;
  stops: RouteStop[];
}