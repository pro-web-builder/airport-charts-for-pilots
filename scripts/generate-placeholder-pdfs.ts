/**
 * Generates one placeholder PDF per chart category, shared across all
 * airports for v1 (see Chart.isPlaceholder in the schema). Run via
 * `npm run charts:generate-placeholders`. Swapping in real per-airport
 * charts later is just updating Chart.fileUrl — no schema/component change.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { CHART_CATEGORIES } from "../lib/utils/constants";

const OUTPUT_DIR = path.join(process.cwd(), "public", "charts", "placeholder");

const FILE_NAMES: Record<string, string> = {
  AIRPORT_DIAGRAM: "airport-diagram.pdf",
  GROUND_CHART: "ground-chart.pdf",
  SID: "sid.pdf",
  STAR: "star.pdf",
  ILS_APPROACH: "ils-approach.pdf",
  RNAV_APPROACH: "rnav-approach.pdf",
  VOR_APPROACH: "vor-approach.pdf",
  VISUAL_APPROACH: "visual-approach.pdf",
  TAXI_CHART: "taxi-chart.pdf",
  PARKING_CHART: "parking-chart.pdf",
};

async function generateChartPdf(label: string, description: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // US Letter
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await doc.embedFont(StandardFonts.Helvetica);
  const brand = rgb(0, 120 / 255, 255 / 255);
  const dark = rgb(0.05, 0.07, 0.09);
  const gray = rgb(0.4, 0.45, 0.5);

  page.drawRectangle({ x: 0, y: 742, width: 612, height: 50, color: dark });
  page.drawText("AIRPORT CHARTS FOR PILOTS", {
    x: 24,
    y: 762,
    size: 14,
    font,
    color: rgb(1, 1, 1),
  });
  page.drawText("PLACEHOLDER CHART — NOT FOR NAVIGATION", {
    x: 24,
    y: 748,
    size: 8,
    font: bodyFont,
    color: brand,
  });

  page.drawText(label, { x: 24, y: 680, size: 28, font, color: dark });
  page.drawText(description, { x: 24, y: 655, size: 12, font: bodyFont, color: gray });

  // Simple runway motif watermark
  page.drawRectangle({ x: 156, y: 380, width: 300, height: 24, color: rgb(0.9, 0.92, 0.95) });
  for (let i = 0; i < 6; i++) {
    page.drawRectangle({ x: 176 + i * 46, y: 390, width: 20, height: 4, color: brand });
  }

  page.drawText(
    "This is a generated placeholder used for v1 of the platform.\nReal chart data can replace this file without any schema changes.",
    { x: 24, y: 300, size: 11, font: bodyFont, color: gray, lineHeight: 16 }
  );

  page.drawLine({
    start: { x: 24, y: 60 },
    end: { x: 588, y: 60 },
    thickness: 0.5,
    color: gray,
  });
  page.drawText("For flight simulation and educational use only.", {
    x: 24,
    y: 44,
    size: 9,
    font: bodyFont,
    color: gray,
  });

  return doc.save();
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const category of CHART_CATEGORIES) {
    const fileName = FILE_NAMES[category.value];
    const bytes = await generateChartPdf(category.label, category.description);
    await writeFile(path.join(OUTPUT_DIR, fileName), bytes);
    console.log(`Wrote ${fileName}`);
  }

  console.log(`\nGenerated ${CHART_CATEGORIES.length} placeholder charts in public/charts/placeholder/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
