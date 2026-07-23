"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";

type RunwayLine = {
  ident: string;
  headingDegT: number;
  lengthFt: number;
};

type AirportMapInnerProps = {
  latitude: number;
  longitude: number;
  name: string;
  icao: string;
  runways: RunwayLine[];
};

const AIRCRAFT_ICON = L.divIcon({
  className: "",
  html: `<svg width="28" height="28" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#05070d" stroke="#0078ff" stroke-width="2"/>
    <path d="M32 12 L44 36 L34 32 L37 46 L32 42 L27 46 L30 32 L20 36 Z" fill="#f4f7fb"/>
  </svg>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const EARTH_RADIUS_M = 6371000;
const FT_TO_M = 0.3048;

// Endpoints are approximated by offsetting from the airport's published
// center point along each runway's true heading — the curated seed data
// doesn't include per-threshold coordinates, so this is a visual
// approximation for orientation display, not survey-accurate geometry.
function destinationPoint(lat: number, lon: number, headingDeg: number, distanceM: number): [number, number] {
  const angular = distanceM / EARTH_RADIUS_M;
  const heading = (headingDeg * Math.PI) / 180;
  const lat1 = (lat * Math.PI) / 180;
  const lon1 = (lon * Math.PI) / 180;

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angular) + Math.cos(lat1) * Math.sin(angular) * Math.cos(heading)
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(heading) * Math.sin(angular) * Math.cos(lat1),
      Math.cos(angular) - Math.sin(lat1) * Math.sin(lat2)
    );

  return [(lat2 * 180) / Math.PI, (lon2 * 180) / Math.PI];
}

export function AirportMapInner({ latitude, longitude, name, icao, runways }: AirportMapInnerProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} icon={AIRCRAFT_ICON}>
        <Popup>
          <strong>{icao}</strong> — {name}
        </Popup>
      </Marker>
      {runways.map((runway) => {
        const halfLengthM = (runway.lengthFt * FT_TO_M) / 2;
        const start = destinationPoint(latitude, longitude, runway.headingDegT, halfLengthM);
        const end = destinationPoint(latitude, longitude, runway.headingDegT + 180, halfLengthM);
        return (
          <Polyline
            key={runway.ident}
            positions={[start, end]}
            pathOptions={{ color: "#0078ff", weight: 4, opacity: 0.8 }}
          />
        );
      })}
    </MapContainer>
  );
}
