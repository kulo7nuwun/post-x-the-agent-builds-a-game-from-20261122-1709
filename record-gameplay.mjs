// record-gameplay.mjs — records real Fruit Catcher gameplay in headless
// Chromium via Playwright, for the video. The game runs live with its
// autopilot (?auto=1) driving the basket; Playwright's video recorder
// captures the page as it renders. Run from the repo dir:
//   NODE_PATH=/home/hatch/workspace/.tools/shots/node_modules node record-gameplay.mjs
import { createRequire } from "node:module";
const require = createRequire("/home/hatch/workspace/.tools/shots/node_modules/");
const { chromium } = require("playwright");
import { fileURLToPath } from "node:url";

const repo = fileURLToPath(new URL(".", import.meta.url));
const url = "file://" + repo + "index.html?auto=1";

const browser = await chromium.launch({
  executablePath: "/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome",
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 540, height: 960 },
  recordVideo: { dir: repo + "video", size: { width: 540, height: 960 } },
});
const page = await context.newPage();
page.on("console", (m) => { if (m.type() === "error") console.log("PAGE ERROR:", m.text()); });
page.on("pageerror", (e) => console.log("PAGE ERROR:", String(e)));
await page.goto(url);
await page.waitForTimeout(2000);
// Screenshot at ~5s in: proof the game is rendering and scoring.
await page.screenshot({ path: repo + "video/gameplay-check.png" });

await page.waitForTimeout(14000);
const score = await page.evaluate(() => {
  // Read the live game state straight from the page: score text is drawn on
  // canvas, so expose it via the title element trick — instead, check the
  // canvas has non-background pixels and the game is in playing mode.
  const cv = document.getElementById("game");
  const c = cv.getContext("2d");
  const d = c.getImageData(0, 0, cv.width, cv.height).data;
  let colored = 0;
  for (let i = 0; i < d.length; i += 400) if (d[i] > 60 || d[i + 1] > 60 || d[i + 2] > 60) colored++;
  return { coloredSamples: colored };
});
console.log("gameplay live check:", JSON.stringify(score));
await page.screenshot({ path: repo + "video/gameplay-late.png" });
await context.close();
await browser.close();
console.log("done — video in video/");
