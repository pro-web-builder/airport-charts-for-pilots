import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ChartCategory } from "../app/generated/prisma/client";
import airports from "./seed-data/airports.json";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const PLACEHOLDER_CATEGORIES: { category: ChartCategory; title: string; fileUrl: string }[] = [
  { category: "AIRPORT_DIAGRAM", title: "Airport Diagram", fileUrl: "/charts/placeholder/airport-diagram.pdf" },
  { category: "GROUND_CHART", title: "Ground Chart", fileUrl: "/charts/placeholder/ground-chart.pdf" },
  { category: "SID", title: "Standard Instrument Departure", fileUrl: "/charts/placeholder/sid.pdf" },
  { category: "STAR", title: "Standard Terminal Arrival Route", fileUrl: "/charts/placeholder/star.pdf" },
  { category: "ILS_APPROACH", title: "ILS Approach", fileUrl: "/charts/placeholder/ils-approach.pdf" },
  { category: "RNAV_APPROACH", title: "RNAV Approach", fileUrl: "/charts/placeholder/rnav-approach.pdf" },
  { category: "VOR_APPROACH", title: "VOR Approach", fileUrl: "/charts/placeholder/vor-approach.pdf" },
  { category: "VISUAL_APPROACH", title: "Visual Approach", fileUrl: "/charts/placeholder/visual-approach.pdf" },
  { category: "TAXI_CHART", title: "Taxi Chart", fileUrl: "/charts/placeholder/taxi-chart.pdf" },
  { category: "PARKING_CHART", title: "Parking Chart", fileUrl: "/charts/placeholder/parking-chart.pdf" },
];

async function main() {
  for (const a of airports) {
    const airport = await prisma.airport.upsert({
      where: { icao: a.icao },
      update: {
        iata: a.iata ?? null,
        name: a.name,
        city: a.city,
        country: a.country,
        countryCode: a.countryCode ?? null,
        region: a.region ?? null,
        latitude: a.latitude,
        longitude: a.longitude,
        elevationFt: a.elevationFt ?? null,
        timezone: a.timezone,
        type: a.type ?? null,
        isPopular: a.isPopular ?? false,
      },
      create: {
        icao: a.icao,
        iata: a.iata ?? null,
        name: a.name,
        city: a.city,
        country: a.country,
        countryCode: a.countryCode ?? null,
        region: a.region ?? null,
        latitude: a.latitude,
        longitude: a.longitude,
        elevationFt: a.elevationFt ?? null,
        timezone: a.timezone,
        type: a.type ?? null,
        isPopular: a.isPopular ?? false,
      },
    });

    // Full replace of relations keeps re-running the seed idempotent without
    // needing separate unique keys on Runway/Frequency rows.
    await prisma.runway.deleteMany({ where: { airportId: airport.id } });
    await prisma.frequency.deleteMany({ where: { airportId: airport.id } });

    if (a.runways?.length) {
      await prisma.runway.createMany({
        data: a.runways.map((r) => ({ ...r, airportId: airport.id })),
      });
    }
    if (a.frequencies?.length) {
      await prisma.frequency.createMany({
        data: a.frequencies.map((f) => ({ ...f, airportId: airport.id })),
      });
    }

    if (a.funFact) {
      await prisma.funFact.upsert({
        where: { airportId: airport.id },
        update: { fact: a.funFact },
        create: { airportId: airport.id, fact: a.funFact },
      });
    }

    const existingCharts = await prisma.chart.count({ where: { airportId: airport.id } });
    if (existingCharts === 0) {
      await prisma.chart.createMany({
        data: PLACEHOLDER_CATEGORIES.map((c) => ({
          airportId: airport.id,
          category: c.category,
          title: `${c.title} — ${a.icao}`,
          fileUrl: c.fileUrl,
          revisionDate: new Date(),
          isPlaceholder: true,
        })),
      });
    }

    console.log(`Seeded ${a.icao} — ${a.name}`);
  }

  console.log(`\nDone. Seeded ${airports.length} airports.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
