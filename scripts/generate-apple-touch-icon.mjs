/**
 * Generates public/apple-touch-icon.png (180×180) from brand logo.
 * Usage: node scripts/generate-apple-touch-icon.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const logo = path.join(root, "public", "assets", "images", "TONY LOGO ISECEN.webp");
const out = path.join(root, "public", "apple-touch-icon.png");

await sharp(logo)
  .resize(180, 180, { fit: "contain", background: { r: 3, g: 3, b: 6, alpha: 1 } })
  .png()
  .toFile(out);

console.log("Wrote", out);
