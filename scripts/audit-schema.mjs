/**
 * Schema audit for tonis-autopflege-goeppingen.de
 * Run: node scripts/audit-schema.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexHtml = fs.readFileSync(path.join(root, "dist/index.html"), "utf8");
const jsFiles = fs
  .readdirSync(path.join(root, "dist/assets"))
  .filter((f) => f.endsWith(".js"))
  .map((f) => fs.readFileSync(path.join(root, "dist/assets", f), "utf8"))
  .join("\n");

const count = (text, pattern) => (text.match(pattern) || []).length;

console.log("=== Static index.html (pre-JS) ===");
console.log("JSON-LD script tags:", count(indexHtml, /<script type="application\/ld\+json">/gi));
console.log('FAQPage in HTML:', count(indexHtml, /"@type":\s*"FAQPage"/g));
console.log("FAQ microdata:", /itemtype="https:\/\/schema\.org\/FAQPage"/.test(indexHtml) ? "YES (bad)" : "no");
console.log("Question microdata:", /schema\.org\/Question/.test(indexHtml) ? "YES" : "no");

console.log("\n=== Production JS bundle ===");
console.log('FAQPage string occurrences:', count(jsFiles, /FAQPage/g));

console.log("\n=== Expected homepage (after React hydrate) ===");
console.log("FAQPage = 1 (in HomePageJsonLd @graph)");
console.log("LocalBusiness = 1");
console.log("BreadcrumbList = 1");
console.log("WebSite = 1");
console.log("JSON-LD scripts = 1 (single @graph on /)");
