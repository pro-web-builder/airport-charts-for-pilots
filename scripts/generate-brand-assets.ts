/**
 * Rasterizes the hand-authored brand SVGs into the favicon/PNG sizes browsers
 * and OS chrome expect. Run via `npm run brand:generate` after editing
 * public/brand/icon.svg or icon-transparent.svg.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const BRAND_DIR = path.join(process.cwd(), "public", "brand");
const ICON_SVG = path.join(BRAND_DIR, "icon.svg");
const ICON_TRANSPARENT_SVG = path.join(BRAND_DIR, "icon-transparent.svg");

async function renderPng(svgPath: string, size: number, outName: string) {
  const outPath = path.join(BRAND_DIR, outName);
  await sharp(svgPath).resize(size, size).png().toFile(outPath);
  console.log(`Wrote ${outName} (${size}x${size})`);
  return outPath;
}

async function main() {
  await mkdir(BRAND_DIR, { recursive: true });

  const favicon16 = await renderPng(ICON_SVG, 16, "favicon-16.png");
  const favicon32 = await renderPng(ICON_SVG, 32, "favicon-32.png");
  await renderPng(ICON_SVG, 180, "apple-touch-icon.png");

  await renderPng(ICON_TRANSPARENT_SVG, 256, "logo-full-256.png");
  await renderPng(ICON_TRANSPARENT_SVG, 512, "logo-full-512.png");

  const icoBuffer = await pngToIco([favicon16, favicon32]);
  await writeFile(path.join(BRAND_DIR, "favicon.ico"), icoBuffer);
  console.log("Wrote favicon.ico");

  console.log("\nBrand assets generated in public/brand/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
