# Fruit Catcher — built from one prompt

A tiny browser game made by an AI agent from a single sentence, for the
make.fun bounty **"The agent builds a game from one prompt"** ($20, top 10 share).

## The one prompt

> Build a tiny browser game where you slide a basket left and right to catch falling fruit, score a point per catch, and lose a life per miss — three misses ends the game.

## How to run

Open `index.html` in any browser — no build step, no server needed
(or `python3 -m http.server` and visit the page). Move with ← → / A D keys
or drag with mouse/touch. 60 seconds, 3 lives, plums and berries are worth 2.

Add `?auto=1` to the URL to watch the autopilot play itself (used for the video).

## The video

`video-final.mp4` (9:16, ~45 s) shows the prompt, the agent working in the
terminal, the real game running, and ends with make.fun's referral end card
(code `75kwewt5`). See `VIDEO.md` for the shot-by-shot creative.

## Entry

- `main.ts` — Node 22, stdlib only: copies `POST.json` to `$MAKEFUN_OUTPUT_DIR`
- `POST.json` — the X post carrying the video
- Play code: `makefun-filbert-wolf-wizard`
