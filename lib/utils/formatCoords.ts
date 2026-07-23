function toDms(value: number, positiveSuffix: string, negativeSuffix: string): string {
  const suffix = value >= 0 ? positiveSuffix : negativeSuffix;
  const abs = Math.abs(value);
  const degrees = Math.floor(abs);
  const minutesFull = (abs - degrees) * 60;
  const minutes = Math.floor(minutesFull);
  const seconds = Math.round((minutesFull - minutes) * 60);
  return `${degrees}°${minutes.toString().padStart(2, "0")}'${seconds
    .toString()
    .padStart(2, "0")}"${suffix}`;
}

export function formatCoordinates(latitude: number, longitude: number): string {
  return `${toDms(latitude, "N", "S")} ${toDms(longitude, "E", "W")}`;
}

export function formatDecimalCoordinates(latitude: number, longitude: number): string {
  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
}
