import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "index.html");
const noscriptBody = fs.readFileSync(path.join(root, "scripts", "noscript-home.html"), "utf8");

let html = fs.readFileSync(indexPath, "utf8");
const start = html.indexOf("<noscript>");
const end = html.indexOf("</noscript>", start) + "</noscript>".length;

if (start === -1 || end === -1) throw new Error("noscript block not found");

const openDiv = "<" + "div";
const closeDiv = "</" + "motion.div>".replace("motion.", "");

const block = [
  "<noscript>",
  "      " + openDiv,
  '        style="max-width:48rem;margin:0 auto;padding:1.5rem;font-family:system-ui,sans-serif;line-height:1.6;color:#111"',
  "      >",
  noscriptBody,
  "      " + closeDiv,
  "    </noscript>",
].join("\n");

html = html.slice(0, start) + block + html.slice(end);
fs.writeFileSync(indexPath, html);
const words = noscriptBody.split(/\s+/).filter(Boolean).length;
console.log("Injected noscript, ~" + words + " words in body");
