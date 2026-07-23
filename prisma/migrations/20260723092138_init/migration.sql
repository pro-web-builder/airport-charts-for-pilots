-- CreateEnum
CREATE TYPE "ChartCategory" AS ENUM ('AIRPORT_DIAGRAM', 'GROUND_CHART', 'SID', 'STAR', 'ILS_APPROACH', 'RNAV_APPROACH', 'VOR_APPROACH', 'VISUAL_APPROACH', 'TAXI_CHART', 'PARKING_CHART');

-- CreateTable
CREATE TABLE "Airport" (
    "id" TEXT NOT NULL,
    "icao" VARCHAR(4) NOT NULL,
    "iata" VARCHAR(3),
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT,
    "region" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "elevationFt" INTEGER,
    "timezone" TEXT NOT NULL,
    "type" TEXT,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runway" (
    "id" TEXT NOT NULL,
    "airportId" TEXT NOT NULL,
    "ident" TEXT NOT NULL,
    "leIdent" TEXT,
    "heIdent" TEXT,
    "lengthFt" INTEGER,
    "widthFt" INTEGER,
    "surface" TEXT,
    "lighted" BOOLEAN NOT NULL DEFAULT true,
    "headingDegT" DOUBLE PRECISION,

    CONSTRAINT "Runway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Frequency" (
    "id" TEXT NOT NULL,
    "airportId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "frequencyMhz" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Frequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "airportId" TEXT NOT NULL,
    "category" "ChartCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "identifier" TEXT,
    "fileUrl" TEXT NOT NULL,
    "revisionDate" TIMESTAMP(3),
    "isPlaceholder" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FunFact" (
    "id" TEXT NOT NULL,
    "airportId" TEXT NOT NULL,
    "fact" TEXT NOT NULL,

    CONSTRAINT "FunFact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airport_icao_key" ON "Airport"("icao");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");

-- CreateIndex
CREATE INDEX "Airport_name_idx" ON "Airport"("name");

-- CreateIndex
CREATE INDEX "Airport_city_idx" ON "Airport"("city");

-- CreateIndex
CREATE INDEX "Airport_country_idx" ON "Airport"("country");

-- CreateIndex
CREATE INDEX "Runway_airportId_idx" ON "Runway"("airportId");

-- CreateIndex
CREATE INDEX "Frequency_airportId_idx" ON "Frequency"("airportId");

-- CreateIndex
CREATE INDEX "Chart_airportId_category_idx" ON "Chart"("airportId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "FunFact_airportId_key" ON "FunFact"("airportId");

-- AddForeignKey
ALTER TABLE "Runway" ADD CONSTRAINT "Runway_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunFact" ADD CONSTRAINT "FunFact_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
