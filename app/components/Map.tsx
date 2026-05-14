import dynamic from "next/dynamic";
import type { MapClientHandle } from "./MapClient";

/**
 * SSR-safe wrapper around MapClient.
 * Import this in your pages — never import MapClient directly.
 *
 * Usage:
 *   import Map, { type MapClientHandle } from "../components/Map";
 */
const Map = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f1f5f9",
        color: "#64748b",
        fontSize: 14,
        fontFamily: "monospace",
        letterSpacing: "0.05em",
      }}
    >
      Loading map…
    </div>
  ),
});

export default Map;
export type { MapClientHandle };