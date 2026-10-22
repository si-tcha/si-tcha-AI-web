import sharp from 'sharp';
import { stat, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Run before switching imports; original files can then be archived outside src.
for (const [input, output, width, quality] of [
  ['area.jpg', 'area.webp', 1920, 78],
  ['AboutImage.jpg', 'AboutImage.webp', 900, 78],
  ['si-tcha-cauris-v1.png', 'si-tcha-cauris-v1.webp', 1000, 82],
]) {
  let source = new URL(`../src/assets/${input}`, import.meta.url);
  try { await access(source); } catch { source = new URL(`../.backups/seo-images-20261021/${input}`, import.meta.url); }
  const target = new URL(`../src/assets/${output}`, import.meta.url);
  await sharp(fileURLToPath(source)).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(fileURLToPath(target));
  console.log(`${input}: ${(await stat(source)).size} → ${(await stat(target)).size} bytes (${output})`);
}
