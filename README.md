# Flawly

Flawly is a personal experiment in conversational AI, built around one question I keep coming back to: what actually makes a chat feel like talking to someone, instead of reading output?

It is not trying to be a better assistant. Accuracy, speed and task completion are already handled well by the big models, and that is not the interesting part. What interests me is everything those systems treat as noise: timing, hesitation, mood, small mistakes, and the way a conversation shifts depending on who is on the other side of it.

## What it is

Flawly is a conversational system that deliberately gives up some polish in exchange for presence. Replies are written the way people write them, in several short turns instead of one clean block, sometimes with a typo that gets corrected a moment later, sometimes with a pause before an answer that matters. The pacing changes with the length of the message and with the state of the conversation, and it slows down when the topic gets heavier.

Under it sits a persona that stays the same across sessions, a short-term mood that does not, and an adaptation layer that reads the tone of whoever is writing and adjusts without losing its own voice.

It is honest about what it is. Flawly does not claim to feel anything, and it does not pretend to be a person. The states, pauses and rhythm variations are computational constructs I designed to study how people read them — nothing more.

## The premise

> Natural conversation is not perfect. It is coherent, adaptive, and subtly inconsistent.

I started from the assumption that frictionless instant answers feel inert. Rebuilding a little of that friction — the time it takes to think, the reply that gets deleted before it is sent, the flatness of a tired evening — is what makes a digital presence read as real. If that is true, then imperfection is not a defect to fix. It is the mechanism.

The questions I am working through:

- How do people read conversational intent, and at which point do they stop reading it as a machine?
- What makes an exchange feel alive rather than correct?
- Where is the line between structured language and a perceived personality?
- How much of an AI's behaviour is actually the user's own projection coming back at them?

That last one is the uncomfortable one, and it is the reason the project spends as much time on boundaries as on behaviour.

## How it is put together

Four layers, each doing one job:

**Immutable persona** — the anchor. Name, simulated age, core traits, vocabulary limits and initial cognitive biases. Mood and fatigue move around it; they never overwrite it.

**Fluid mood state** — short-term variables driven by the flow of the chat: energy (enthusiasm against exhaustion), focus (sharp against tangential), and a small probability of slips and of longer replies. Fatigue accumulates with the pace of the interaction and the simulated time of day.

**Interaction-based adaptation** — reads cadence, capitalisation, formality and emotional load from the user, and adjusts tone in response. It mirrors or counterbalances, but does not abandon the base identity.

**Temporal expression** — the non-verbal part. Typing delays scaled to text density, short reflection pauses before punctuation, and an uneven rhythm that breaks the instant block-of-text delivery typical of language models.

## Model tiers

Two tiers are in testing, and they are not simply "worse" and "better":

**Sway** is the free tier. Lightweight, casual, good for short everyday conversation and quick emotional presence. Short memory, less continuity, occasionally flat.

**Awly** is the premium tier. Deeper reflection, richer continuity, stronger recall across a session. It feels more present, and it fails in more noticeable ways.

## What I am measuring

Two ideas drive the current evaluation work:

**Linguistic pacing entropy** — how much the interval between keystrokes varies over a conversation, compared across three modes (balanced, hyperactive and exhausted) and against the flat line of a conventional assistant.

**Conversational resonance** — a quadrant that places different systems between conversational naturalness and task focus. Flawly aims at the high-naturalness, rythmically adaptive side, with commercial assistants on the precision side, legacy support bots in the rigid corner and actual humans as the volatile reference point.

Testing is done in long sessions rather than single prompts, because most of what I care about only shows up after twenty or thirty turns. A full write-up of one of those sessions, comparing Sway and Awly on the same 24-turn script, is in [`evaluation/`](evaluation/).

## Status

Experimental research prototype, developed alone, still early. Access is invite-based and staged through a waiting list, so the test phases stay small enough to read properly.

None of this simulates consciousness or biological emotion, and I would rather say that plainly than let the interface imply otherwise.

## The site

The project site (metrics, interactive charts, notes on the design) is published from this repository via GitHub Pages:

**https://kozzy-km.github.io/flawly/**

## Repository layout

```
.
├── index.html          # project site (GitHub Pages entry point)
├── assets/             # site styles, scripts and static files
├── evaluation/         # test write-ups from real sessions
└── README.md
```

---

Flawly is an independent project. It is not affiliated with any company, lab or research institution.
