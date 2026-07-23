/**
 * Idempotent importer for the OurAirports open dataset (airports.csv).
 *
 * Not run against the full ~80k-row dataset in v1 — the app ships with a
 * curated ~50-airport seed instead (see prisma/seed.ts). This script exists
 * so worldwide coverage can be added later without redesigning the schema.
 *
 * Download the source file first:
 *   https://davidmegginson.github.io/ourairports-data/airports.csv
 *
 * Usage:
 *   npm run import:ourairports -- --file=./airports.csv [--dry-run] [--include-small]
 *
 * OurAirports columns used: id, ident, type, name, latitude_deg, longitude_deg,
 * elevation_ft, continent, iso_country, iso_region, municipality, icao_code, iata_code
 */
import "dotenv/config";
import { createReadStream } from "node:fs";
import { parse } from "csv-parse";
import tzLookup from "tz-lookup";
import * as iso3166 from "iso-3166-1";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

interface OurAirportsRow {
  id: string;
  ident: string;
  type: string;
  name: string;
  latitude_deg: string;
  longitude_deg: string;
  elevation_ft: string;
  continent: string;
  iso_country: string;
  iso_region: string;
  municipality: string;
  icao_code: string;
  iata_code: string;
}

const INCLUDED_TYPES = new Set(["large_airport", "medium_airport"]);
const BATCH_SIZE = 500;

function parseArgs() {
  const args = process.argv.slice(2);
  const fileArg = args.find((a) => a.startsWith("--file="));
  return {
    file: fileArg?.split("=")[1],
    dryRun: args.includes("--dry-run"),
    includeSmall: args.includes("--include-small"),
  };
}

function resolveCountryName(isoCountry: string): string {
  const info = iso3166.whereAlpha2(isoCountry);
  return info?.country ?? isoCountry;
}

function safeTimezone(lat: number, lon: number): string {
  try {
    return tzLookup(lat, lon);
  } catch {
    return "UTC";
  }
}

async function upsertBatch(rows: OurAirportsRow[], dryRun: boolean) {
  let created = 0;
  let updated = 0;

  for (const row of rows) {
    const icao = (row.icao_code || row.ident || "").toUpperCase().trim();
    if (!icao || icao.length > 4) continue;

    const latitude = Number(row.latitude_deg);
    const longitude = Number(row.longitude_deg);
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) continue;

    const data = {
      icao,
      iata: row.iata_code?.trim() || null,
      name: row.name,
      city: row.municipality || row.name,
      country: resolveCountryName(row.iso_country),
      countryCode: row.iso_country || null,
      region: row.iso_region || null,
      latitude,
      longitude,
      elevationFt: row.elevation_ft ? Number(row.elevation_ft) : null,
      timezone: safeTimezone(latitude, longitude),
      type: row.type || null,
    };

    if (dryRun) {
      created++;
      continue;
    }

    const existing = await prisma.airport.findUnique({ where: { icao } });
    await prisma.airport.upsert({
      where: { icao },
      update: data,
      create: data,
    });
    if (existing) updated++;
    else created++;
  }

  return { created, updated };
}

// Runways/frequencies from OurAirports' runways.csv/frequencies.csv (joined
// via airport_ref) are intentionally NOT imported by this script. Extend here
// if/when that data is needed:
async function importRunways(_airportRefToId: Map<string, string>) {
  // TODO: parse runways.csv, map airport_ref -> Airport.id, createMany.
}
async function importFrequencies(_airportRefToId: Map<string, string>) {
  // TODO: parse frequencies.csv, map airport_ref -> Airport.id, createMany.
}

async function main() {
  const { file, dryRun, includeSmall } = parseArgs();
  if (!file) {
    console.error("Usage: npm run import:ourairports -- --file=./airports.csv [--dry-run] [--include-small]");
    process.exit(1);
  }

  console.log(`Importing from ${file}${dryRun ? " (dry run)" : ""}...`);

  let totalCreated = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;
  let batch: OurAirportsRow[] = [];

  const parser = createReadStream(file).pipe(
    parse({ columns: true, skip_empty_lines: true })
  );

  for await (const record of parser as AsyncIterable<OurAirportsRow>) {
    const type = record.type;
    if (!includeSmall && !INCLUDED_TYPES.has(type)) {
      totalSkipped++;
      continue;
    }

    batch.push(record);
    if (batch.length >= BATCH_SIZE) {
      const { created, updated } = await upsertBatch(batch, dryRun);
      totalCreated += created;
      totalUpdated += updated;
      batch = [];
    }
  }
  if (batch.length > 0) {
    const { created, updated } = await upsertBatch(batch, dryRun);
    totalCreated += created;
    totalUpdated += updated;
  }

  console.log(
    `\nDone. Created: ${totalCreated}, Updated: ${totalUpdated}, Skipped (filtered type): ${totalSkipped}`
  );
  console.log("Note: runways.csv/frequencies.csv are not imported by this script (see importRunways/importFrequencies stubs).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
