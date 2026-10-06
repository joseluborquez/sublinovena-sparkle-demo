---
name: commit-approval
description: Use before running `git commit` or `git push` on this project (sublinovena). Applies to every code/content change, not just UI work.
---

# Commit approval workflow

The owner of this project reviews changes on his own machine before anything
gets committed. This is a hard rule, not a suggestion.

## The rule

**Never run `git commit` (or `git push`) until the user explicitly tells you to.**

- Finishing a change, running `tsc`/`bun run build` successfully, and even
  checking the result yourself in the browser via Claude-in-Chrome does **not**
  count as approval. The user's own words: "si tu lo ves no significa que
  esta listo para comitear" (you seeing it doesn't mean it's ready to commit).
- The user wants to personally open `localhost` and look at the change before
  it gets committed — your own automated verification is a correctness check,
  not a design/product sign-off.
- After implementing and verifying a change, stop and tell the user it's
  ready to review locally (start the dev server if it isn't running, tell
  them the URL/port). Wait for an explicit go-ahead ("dale", "comitea",
  "súbelo", "sí", etc.) before staging or committing anything.
- This applies to every change in this repo — UI tweaks, data/content
  updates, copy changes, image swaps — not just big features.
- If the user gives a big batch of instructions and says to implement
  everything, still hold the commit at the end and ask, unless they
  explicitly said "and commit it" / "sube todo" as part of that same
  instruction.

## What's still fine without asking

- Reading files, running the dev server, `tsc --noEmit`, `bun run build` as
  verification steps — these don't touch git state.
- `git status` / `git diff` to inspect what would be committed.

## Why

Established after a session where several rounds of image and feature work
were committed and pushed to `developer` (triggering live Vercel deploys)
immediately after the assistant's own local check, without the user first
seeing the result himself. He corrected this explicitly and asked for the
rule to be written down so it isn't forgotten in future sessions.
