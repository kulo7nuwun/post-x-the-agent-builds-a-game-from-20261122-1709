// main.ts — Fruit Catcher entry for make.fun
// "The agent builds a game from one prompt" (post-x-the-agent-builds-a-game-from-20261122-1709)
//
// What this program does: it copies POST.json (the address of the X post
// carrying this entry's video) into $MAKEFUN_OUTPUT_DIR, so the competition
// harness can read which post is this entry. Node 22, standard library only,
// no network access.
//
// Usage:
//   MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const src = resolve(botDir, "POST.json");
if (!existsSync(src)) {
  console.error(`POST.json not found at ${src}`);
  process.exit(1);
}

// Validate it is a JSON object with a url string before copying.
const parsed: unknown = JSON.parse(readFileSync(src, "utf8"));
if (typeof parsed !== "object" || parsed === null || typeof (parsed as { url?: unknown }).url !== "string") {
  console.error("POST.json must be a JSON object with a string 'url'");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "POST.json"));
console.log(`copied POST.json -> ${join(outDir, "POST.json")}`);
console.log(`post: ${(parsed as { url: string }).url}`);
