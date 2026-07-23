export const CHART_CATEGORIES = [
  { value: "AIRPORT_DIAGRAM", label: "Airport Diagram", description: "Full airport layout, taxiways and gates." },
  { value: "GROUND_CHART", label: "Ground Chart", description: "Ground movement and taxi routing." },
  { value: "SID", label: "SID Charts", description: "Standard Instrument Departures." },
  { value: "STAR", label: "STAR Charts", description: "Standard Terminal Arrival Routes." },
  { value: "ILS_APPROACH", label: "ILS Approaches", description: "Instrument Landing System approach procedures." },
  { value: "RNAV_APPROACH", label: "RNAV Approaches", description: "Area navigation approach procedures." },
  { value: "VOR_APPROACH", label: "VOR Approaches", description: "VOR-based approach procedures." },
  { value: "VISUAL_APPROACH", label: "Visual Approaches", description: "Visual approach procedures." },
  { value: "TAXI_CHART", label: "Taxi Charts", description: "Detailed taxiway routing and hotspots." },
  { value: "PARKING_CHART", label: "Parking Charts", description: "Gate, stand and parking layout." },
] as const;

export type ChartCategoryValue = (typeof CHART_CATEGORIES)[number]["value"];

export function chartCategoryLabel(value: string): string {
  return CHART_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
