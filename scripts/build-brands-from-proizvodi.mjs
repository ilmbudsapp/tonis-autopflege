/**
 * Reads images from public/PROIZVODI ZA CISCENJE/, matches files to brand slugs by filename,
 * converts to high-fidelity WebP in public/assets/images/brands/.
 * Logo-to-brand mapping is maintained manually in src/data/premiumBrands.ts (`logoWebp` on each row).
 *
 * Name your files so the basename contains the brand, e.g. swissvax.png, Koch_Chemie.jpg, 3m.webp.
 * If a file does not match any pattern, remaining files are paired to brands in canonical order
 * (swissvax → koch-chemie → … → colourlock) by sorting filenames — rename with brand keywords for a correct match.
 *
 * Usage: npm run brands:proizvodi
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceDir = path.join(root, "public", "PROIZVODI ZA CISCENJE");
const outDir = path.join(root, "public", "assets", "images", "brands");

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|tif|tiff|avif)$/i;

/** Near-lossless WebP — strong detail retention for logos. */
const WEBP_OPTIONS = {
  quality: 100,
  nearLossless: true,
  effort: 6,
  smartSubsample: false,
  alphaQuality: 100,
};

const MAX_LOGO_WIDTH = 960;

/** Order and matchers (first matching file per slug wins, alphabetical tie-break). */
const BRAND_RULES = [
  { slug: "swissvax", patterns: [/swiss[\s_-]?vax/i] },
  { slug: "koch-chemie", patterns: [/koch[\s_-]?chemie/i, /^kochchemie/i] },
  { slug: "rupes", patterns: [/rupes/i] },
  { slug: "servfaces", patterns: [/serv[\s_-]?faces/i, /servfaces/i] },
  { slug: "3m", patterns: [/(^|[^0-9a-z])3m([^0-9a-z]|$)/i, /^3m/i] },
  { slug: "colourlock", patterns: [/colourlock|colorlock|colour[\s_-]?lock/i] },
];

async function walkFiles(dir) {
  const list = [];
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      list.push(...(await walkFiles(full)));
    } else if (ent.isFile() && IMAGE_EXT.test(ent.name)) {
      list.push(full);
    }
  }
  return list;
}

function basenameNoExt(filePath) {
  const base = path.basename(filePath);
  return base.replace(IMAGE_EXT, "");
}

function matchSlug(filePath) {
  const bn = basenameNoExt(filePath);
  for (const { slug, patterns } of BRAND_RULES) {
    if (patterns.some((re) => re.test(bn))) return slug;
  }
  return null;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const allPaths = (await walkFiles(sourceDir)).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );

  if (allPaths.length === 0) {
    console.warn("No images found under", sourceDir);
    console.warn("Add logo files, then run: npm run brands:proizvodi");
  }

  /** @type {Map<string, string>} slug -> chosen source path */
  const chosen = new Map();

  for (const p of allPaths) {
    const slug = matchSlug(p);
    if (!slug) continue;
    if (chosen.has(slug)) {
      console.warn("Duplicate slug", slug, "— keeping first:", path.relative(root, chosen.get(slug)), "skipping", path.relative(root, p));
      continue;
    }
    chosen.set(slug, p);
  }

  const usedPaths = new Set(chosen.values());
  const unmatched = allPaths.filter((p) => !usedPaths.has(p)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  for (const { slug } of BRAND_RULES) {
    if (chosen.has(slug) || unmatched.length === 0) continue;
    const next = unmatched.shift();
    chosen.set(slug, next);
    console.log("Assigned by order:", slug, "←", path.basename(next));
  }

  for (const p of unmatched) {
    console.warn("Unused file (no brand slot):", path.relative(root, p));
  }

  for (const [slug, srcPath] of chosen) {
    const destPath = path.join(outDir, `${slug}.webp`);
    let img = sharp(srcPath).rotate();
    const meta = await img.metadata();
    const w = meta.width ?? 0;
    if (w > MAX_LOGO_WIDTH) {
      img = img.resize({
        width: MAX_LOGO_WIDTH,
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    await img.webp(WEBP_OPTIONS).toFile(destPath);
    console.log("Wrote", path.relative(root, destPath), "←", path.basename(srcPath));
  }

  console.log("Update src/data/premiumBrands.ts `logoWebp` if filenames no longer match your visuals.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
