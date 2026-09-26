# Flawly

Flawly is a small experiment on conversational AI, built around one question I keep coming back to: what makes a chat feel like talking to someone, rather than reading output?

I am not trying to build a better assistant. Speed, accuracy and task completion are already handled well by the large models, and that is not the part I find interesting. What interests me is everything those systems usually treat as noise: timing, hesitation, mood, small mistakes, and the way a conversation changes shape depending on who is on the other side of it.

**The site lives at [kozzy-km.github.io/flawly](https://kozzy-km.github.io/flawly/).** It is written in Spanish (es-AR), which is the language the project has run in so far.

## The premise

> Natural conversation is not perfect. It is coherent, adaptive, and subtly inconsistent.

Most assistants answer instantly, in one clean block, with the same tone regardless of the hour or the mood of the conversation. That works for tasks, but it leaves the exchange feeling inert. Flawly starts from the opposite assumption: that a bit of friction is what makes a presence read as real. A pause before an answer that matters, a typo corrected a second later, a shorter reply because the simulated day has been long. None of that is a defect to be fixed later. It is the mechanism being studied.

Four questions sit underneath the whole thing:

- How do people read conversational intent, and when do they stop reading it as a machine?
- What makes an interaction feel alive rather than merely correct?
- Where is the line between structured language and a perceived personality?
- How much of an AI's behaviour is actually the user's own projection coming back at them?

That last one is the uncomfortable one, and it is the reason the project spends as much time on limits as it does on behaviour.

## How it works

The prototype is organised in four layers, each with a single job:

**Immutable persona.** The anchor. Name, simulated age, core traits, vocabulary limits and initial cognitive biases. Mood and fatigue move around it but never overwrite it.

**Fluid mood state.** Short-term variables driven by the flow of the chat: energy (enthusiasm against exhaustion), focus (sharp against tangential), and a small probability of slips and of longer replies. Fatigue accumulates with the pace of the interaction and the simulated time of day.

**Interaction-based adaptation.** Reads cadence, capitalisation, formality and emotional load from the user and adjusts tone in response. It mirrors or counterbalances, but does not abandon the base identity.

**Temporal expression.** The non-verbal part. Typing delays scaled to the density of the text, brief reflection pauses before punctuation, and an uneven rhythm that breaks the instant delivery of a finished block of text.

## Sway and Awly

Two model tiers are in testing, and they are not simply "worse" and "better".

**Sway** is the free tier. Lightweight and casual, good for short everyday conversation and for a quick sense of presence. Shorter memory, less continuity, occasionally flat.

**Awly** is the premium tier. Deeper reflection, richer continuity, stronger recall across a session. It feels more present, and when it fails, the failure is more noticeable.

## What I am measuring

Two ideas drive the current evaluation work. The first is *linguistic pacing entropy*: how much the interval between keystrokes varies over a conversation, compared across three modes (balanced, hyperactive, exhausted) and against the flat line of a conventional assistant. The second is a *conversational resonance* map that places different systems between conversational naturalness and task focus, with commercial assistants on the precision side, legacy support bots in the rigid corner and actual humans as the volatile reference point.

Testing happens in long sessions rather than single prompts, because most of what I care about only shows up after twenty or thirty turns.

## Test results (v0.1)

The first written evaluation compares Sway and Awly on the same 24-turn script, with full transcripts from real sessions: casual conversation, short-term memory, a simple arithmetic check, model-tier reasoning, and the risks of an AI that feels emotionally real.

Sway was more stable and more direct, but flatter and slightly interview-like. Awly was deeper and much better at the final recall, and it was the one that named the ethical problem of monetising attachment, but it also produced several context slips, including a premature closing message and one answer to the wrong question.

The full report, including both transcripts and the caveats about how the sessions were run, is in [`public/docs/about-flawly.txt`](public/docs/about-flawly.txt) and is linked from the site.

## Running the project locally

The site is a Vite + React + TypeScript project, built into a single HTML file with everything inlined.

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

There is also a headless check of the interface (structure, keyboard navigation, the interactive charts, the FAQ, the access dialog and horizontal overflow at several widths) in `scripts/verify.mjs`. It needs Playwright:

```bash
npm install --no-save playwright
npx playwright install chromium
npm run dev            # in another terminal
node scripts/verify.mjs
```

## Repository layout

```
.
├── index.html              # page shell loaded by Vite
├── src/                    # React components, data and styles
│   ├── App.tsx             # page structure
│   ├── components/         # sphere, laboratory, evaluation, access dialog
│   └── data.ts             # copy and shared data
├── public/
│   ├── flawly.svg          # mark used in the navigation and the footer
│   └── docs/about-flawly.txt  # full project document and test report
├── scripts/verify.mjs      # interface checks
└── .github/workflows/deploy-pages.yml
```

Pushes to `main` build the site and publish it to GitHub Pages.

## Status

Experimental research prototype, developed alone, still early. Access is invite-based and staged through a waiting list so the test phases stay small enough to read properly. The current build is a public record of the design and of what the sessions actually returned, mistakes included.

Flawly does not simulate consciousness or biological emotion. Mood states, pauses and rhythm variations are computational constructs I designed to study how people read them. It is an independent project, not affiliated with any company, lab or research institution.

## Contact

For test access or questions about the work, use the waiting list on the site or open an issue here.
