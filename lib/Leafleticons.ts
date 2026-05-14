import L from "leaflet";

let fixed = false;

/**
 * Fixes the broken default Leaflet marker icons that occur in webpack/Next.js
 * because webpack renames the image assets. Call this once before rendering
 * any Leaflet map.
 */
export function fixLeafletIcons() {
  if (fixed || typeof window === "undefined") return;
  fixed = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

/**
 * Creates a custom colored circle marker icon for route stops.
 */
export function createStopIcon(color: string, isTerminal = false) {
  const size = isTerminal ? 14 : 10;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size * 2}" height="${size * 2}" viewBox="0 0 ${size * 2} ${size * 2}">
      <circle cx="${size}" cy="${size}" r="${size - 1}" fill="${color}" stroke="white" stroke-width="2"/>
      ${isTerminal ? `<circle cx="${size}" cy="${size}" r="${size / 3}" fill="white"/>` : ""}
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [size * 2, size * 2],
    iconAnchor: [size, size],
    popupAnchor: [0, -size],
  });
}