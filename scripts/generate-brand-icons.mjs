/**
 * Generates favicon.ico, favicon.svg (base64-embedded), PNG sizes, PWA icons from brand WebP.
 * Source: public/assets/images/TONY LOGO ISECEN.webp
 * Usage: node scripts/generate-brand-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const logo = path.join(root, "public", "assets", "images", "TONY LOGO ISECEN.webp");
const publicDir = path.join(root, "public");

const bg = { r: 3, g: 3, b: 6, alpha: 1 };

async function resizePng(side) {
  return sharp(logo)
    .resize(side, side, { fit: "contain", background: bg })
    .png()
    .toBuffer();
}

if (!fs.existsSync(logo)) {
  console.error("Missing logo:", logo);
  process.exit(1);
}

const fav16 = await resizePng(16);
const fav32 = await resizePng(32);
const fav48 = await resizePng(48);
const fav64 = await resizePng(64);

fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), fav16);
fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), fav32);

const icoBuffer = await toIco([fav16, fav32, fav48]);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);

const b64 = fav64.toString("base64");
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" role="img" aria-label="Toni's Autopflege">
  <title>Toni's Autopflege</title>
  <image width="64" height="64" xlink:href="data:image/png;base64,${b64}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
fs.writeFileSync(path.join(publicDir, "favicon.svg"), faviconSvg);

await sharp(logo)
  .resize(180, 180, { fit: "contain", background: bg })
  .png()
  .toFile(path.join(publicDir, "apple-touch-icon.png"));

await sharp(logo)
  .resize(192, 192, { fit: "contain", background: bg })
  .png()
  .toFile(path.join(publicDir, "icon-192.png"));

await sharp(logo)
  .resize(512, 512, { fit: "contain", background: bg })
  .png()
  .toFile(path.join(publicDir, "icon-512.png"));

console.log(
  "Brand icons written: favicon.ico, favicon.svg, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, icon-192.png, icon-512.png",
);
