# AGENT.md — The agent builds a game from one prompt

## The one prompt

> Build a tiny browser game where you slide a basket left and right to catch falling fruit, score a point per catch, and lose a life per miss — three misses ends the game.

## The game

**Fruit Catcher** (`index.html`, single file, no dependencies): a canvas game.
Move the basket with ← → / A D or drag with mouse/touch. Fruit falls faster
as the 60-second timer runs down. Each catch scores points (plums and berries
are worth 2); each miss costs one of 3 lives. Three misses — or the timer —
ends the game, with a score screen and R to restart.

## The video

A 9:16 vertical clip (~45 s) for X, made in this session with ffmpeg:

1. **The prompt on screen** — the one sentence above, over the title frame.
2. **The agent working** — real terminal frames from this session: the kit
   `init`, the files being written, the game being tested.
3. **The finished game, actually running** — gameplay recorded in headless
   Chromium (Playwright) with the game's autopilot (`?auto=1`) driving the
   basket, so every frame is the real game rendering live.
4. **End on the game running** with the call to come build on make.fun.
5. **Referral end card** — make.fun's press-pack 9:16 card, used as-is, with
   referral code `75kwewt5` typed into its field.

## Play code & referral

- Play code: `makefun-filbert-wolf-wizard` (code 0 of 4 for this competition)
- Referral code: `75kwewt5` — https://make.fun/r/75kwewt5

## Files

- `index.html` — the game (open it in any browser; `?auto=1` runs the autopilot demo)
- `main.ts` — entrypoint: copies POST.json to `$MAKEFUN_OUTPUT_DIR` (Node 22, stdlib only)
- `POST.json` — the X post URL (placeholder until the parent posts the video)
- `VIDEO.md` — what the video shows, in order
- `video-final.mp4` — the rendered video (kept OUT of git; see .gitignore)
