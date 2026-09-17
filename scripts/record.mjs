// Screen-records a scroll through a page with real wheel events (Lenis and GSAP see them),
// writes an mp4 plus a filmstrip contact sheet for the craft critic.
// usage: node scripts/record.mjs http://localhost:3000/ out/name [width] [height]
import puppeteer from "puppeteer-core";
import { mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const [url, outBase, w = "1440", h = "900"] = process.argv.slice(2);
if (!url || !outBase) throw new Error("usage: node scripts/record.mjs <url> <outBase> [w] [h]");
const width = +w, height = +h;
const frameDir = `${outBase}-frames`;
if (existsSync(frameDir)) rmSync(frameDir, { recursive: true });
mkdirSync(frameDir, { recursive: true });
mkdirSync(path.dirname(outBase), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: [`--window-size=${width},${height}`, "--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1600)); // load reveal

const client = await page.createCDPSession();
let i = 0;
const frames = [];
client.on("Page.screencastFrame", async ({ data, sessionId }) => {
  frames.push(data);
  await client.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
});
await client.send("Page.startScreencast", { format: "jpeg", quality: 80, maxWidth: width, maxHeight: height, everyNthFrame: 1 });

// Scroll with wheel events: 24px per tick at ~60Hz, pauses at a few points for hover.
const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const mouse = page.mouse;
await mouse.move(4, height * 0.5);
let y = 0;
const step = 12;
while (y < total) {
  await mouse.wheel({ deltaY: step * 4 });
  y += step * 4;
  await new Promise((r) => setTimeout(r, 16));
  if (Math.round(y / (step * 4)) % 60 === 0) await new Promise((r) => setTimeout(r, 700)); // let reveals finish
}
await new Promise((r) => setTimeout(r, 1200));
// Hover pass on the first path row / button to record hover feedback.
const target = await page.$("[data-hover-demo]");
if (target) {
  const box = await target.boundingBox();
  if (box) {
    await target.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await new Promise((r) => setTimeout(r, 800));
    const b2 = await target.boundingBox();
    await mouse.move(4, b2.y + b2.height / 2);
    await new Promise((r) => setTimeout(r, 700)); // rest state on record
    await mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2, { steps: 30 });
    await new Promise((r) => setTimeout(r, 1200)); // hover state on record
    await mouse.down();
    await new Promise((r) => setTimeout(r, 180));
    await mouse.up();
    await new Promise((r) => setTimeout(r, 700));
  }
}
await client.send("Page.stopScreencast");
await browser.close();

frames.forEach((f, k) => writeFileSync(`${frameDir}/f${String(k).padStart(4, "0")}.jpg`, Buffer.from(f, "base64")));
console.log(`frames: ${frames.length}`);
const fps = Math.max(12, Math.min(30, Math.round(frames.length / 22)));
execSync(`ffmpeg -y -loglevel error -framerate ${fps} -i "${frameDir}/f%04d.jpg" -c:v libx264 -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "${outBase}.mp4"`);
// Filmstrip: 24 evenly spaced frames, 6 per row.
const pick = 24;
const idx = Array.from({ length: pick }, (_, k) => Math.floor((k * (frames.length - 1)) / (pick - 1)));
const listFile = `${frameDir}/strip.txt`;
writeFileSync(listFile, idx.map((k) => `file 'f${String(k).padStart(4, "0")}.jpg'`).join("\n"));
execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i "${listFile}" -vf "scale=480:-1,tile=6x4:padding=6:margin=6:color=white" -frames:v 1 "${outBase}-filmstrip.jpg"`);
console.log(`wrote ${outBase}.mp4 (${fps} fps) and ${outBase}-filmstrip.jpg`);
