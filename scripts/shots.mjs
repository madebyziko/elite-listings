// Stills at an exact viewport, at the top and at chosen scroll depths, plus one contact sheet.
// usage: node scripts/shots.mjs <url> <outBase> <width> <height> [depths as fractions, e.g. 0,0.25,0.5,0.75,1]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const [url, outBase, w = "1440", h = "900", depthsArg = "0,0.22,0.45,0.68,0.9"] = process.argv.slice(2);
const width = +w, height = +h;
const depths = depthsArg.split(",").map(Number);
mkdirSync(path.dirname(outBase), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: [`--window-size=${width},${height}`, "--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 });
await page.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2400));
const files = [];
for (const d of depths) {
  const y = await page.evaluate((d) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo(0, Math.round(max * d));
    return Math.round(max * d);
  }, d);
  await new Promise((r) => setTimeout(r, 1900)); // let reveals finish
  const f = `${outBase}-${String(Math.round(d * 100)).padStart(3, "0")}.jpg`;
  await page.screenshot({ path: f, type: "jpeg", quality: 82 });
  files.push(f);
  console.log(`y=${y} -> ${f}`);
}
await browser.close();
const scale = width < 768 ? 360 : 720;
if (files.length > 1) execSync(
  `ffmpeg -y -loglevel error ${files.map((f) => `-i "${f}"`).join(" ")} -filter_complex "${files
    .map((_, i) => `[${i}:v]scale=${scale}:-1[s${i}]`)
    .join(";")};${files.map((_, i) => `[s${i}]`).join("")}hstack=inputs=${files.length}" "${outBase}-sheet.jpg"`,
);
if (files.length > 1) console.log(`sheet: ${outBase}-sheet.jpg`);
