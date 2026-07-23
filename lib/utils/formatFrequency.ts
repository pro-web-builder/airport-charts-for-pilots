export function formatFrequency(mhz: number): string {
  return `${mhz.toFixed(3)} MHz`;
}

const TYPE_LABELS: Record<string, string> = {
  ATIS: "ATIS",
  DEL: "Delivery",
  CLD: "Clearance Delivery",
  GND: "Ground",
  TWR: "Tower",
  APP: "Approach",
  DEP: "Departure",
};

export function formatFrequencyType(type: string): string {
  return TYPE_LABELS[type.toUpperCase()] ?? type;
}
