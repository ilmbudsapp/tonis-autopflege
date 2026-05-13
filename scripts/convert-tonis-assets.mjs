/**
 * Converts JPEG/JPG in public/assets/images to gallery-01.webp …
 * Regenerates hero-poster.webp from public/assets/videos/Tony Video Klip kompresovan.mp4 when present.
 *
 * Usage: npm run tonis:convert
 * Requires: npm install (devDependencies sharp, ffmpeg-static)
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imageDir = path.join(root, "public", "assets", "images");
const videoDir = path.join(root, "public", "assets", "videos");
const VIDEO_NAME = "Tony Video Klip kompresovan.mp4";

async function main() {
  const entries = await fs.readdir(imageDir, { withFileTypes: true });
  const jpegs = entries
    .filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  let n = 0;
  for (const name of jpegs) {
    n += 1;
    const stem = `gallery-${String(n).padStart(2, "0")}`;
    const out = path.join(imageDir, `${stem}.webp`);
    await sharp(path.join(imageDir, name))
      .rotate()
      .resize(1400, 1400, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(out);
    console.log("Wrote", out);
  }

  const videoPath = path.join(videoDir, VIDEO_NAME);
  try {
    await fs.access(videoPath);
  } catch {
    console.warn("Video not found:", videoPath);
    return;
  }
  const tmpPng = path.join(imageDir, "_hero-frame.png");
  execFileSync(ffmpeg, ["-y", "-i", videoPath, "-ss", "00:00:00.8", "-frames:v", "1", tmpPng], { stdio: "inherit" });
  await sharp(tmpPng)
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .webp({ quality: 76 })
    .toFile(path.join(imageDir, "hero-poster.webp"));
  await fs.unlink(tmpPng).catch(() => {});
  console.log("Wrote hero-poster.webp from", videoPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
