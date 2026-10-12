# Local workflow companion: a zero-inference-cost extension for Claude Code

**My role:** Product direction, progression requirements and AI-assisted development coordination. **Status:** Early-access extension; further work is local and in progress. **Disclosure:** Source reviewed privately; repository link omitted pending an identity cleanup. Independent extension.

## The product idea

Local workflow companion brings hands-off progression into the place where AI-assisted work happens. Claude Code activity fuels a character above the prompt. It is playful, but the product problem is practical: make long sessions feel continuous without introducing another task, another model call or another account.

I wanted an extension that responds to work rather than demands attention. That requirement rules out repeated menus, manual reward collection and a chatbot generating content every few minutes. The experience operates from rules, authored tables and seeded randomness. It is an example of using AI to build a product whose runtime does not need AI inference.

## No model calls for progression

The engine advances from activity counts and time. Its content comes from tables and seeded randomness. This avoids inference spending for the extension's progression; it does not mean Claude Code itself uses no tokens.

Adding AI to every part of a product is not automatically good strategy. Here, a predictable local engine answers the requirement better: lower variable cost, repeatable behavior and no need to send work content to another service.

## Observation rather than another workflow

The implementation separates the game engine from host integration. The engine handles progression and state transitions; the registration layer captures activity, coordinates sessions, persists state and exposes the interface.

I direct requirements across those boundaries rather than treating an attractive scene as the whole product. The important cases include duplicate activity, time away, multiple sessions, old saves and a user who wants a quieter interface.

## Multiple sessions, one character

The inspected source uses a local lease and per-session count inboxes so one session runs the simulation while others observe. The engine tracks contributions by session and applies count differences. A source test checks that submitting identical counts again does not award them twice.

That is a meaningful reliability requirement: the extension should not multiply progress because a user has several chats open. This describes design and source checks, not a fresh concurrency stress test or security audit. This review did not operate on the live character save.

## Local state and restrained presentation

The source keeps the save, lease and counts local. Current scope excludes network calls. The UI has a desktop SVG scene, terminal fallback, ticker visibility control and quiet mode. The visual layer uses CSS animation and avoids rebuilding the scene on every frame.

Privacy, compatibility and attention are part of the brief. Local state does not replace a security review, and a low-cost rendering design is not a benchmark. No measured CPU, memory or productivity improvement is claimed.

## Turning the idea into development work

The project uses bounded implementation cards, explicit file ownership, acceptance criteria, tests and integration checkpoints. Progression and presentation changes have separate evidence needs. Passing an engine test cannot establish that the UI looks good or a month-long progression curve feels right.

I set direction and review tradeoffs with AI-assisted implementation. Further progression and presentation refinement exist locally. A development branch is not presented as a public release.

## Evidence a reviewer can inspect

Inspected source contains the engine, host integration, content and installation instructions. Local test source covers duplicate-count handling, combat versus camp transitions, activity-driven class selection and long-horizon finite values. Additional local tests go beyond the initial published snapshot.

For this portfolio I inspected code and project state. I did not reinstall the plugin, alter its live save, rerun the active coordinator's checks or publish current development work. Visual and pacing acceptance remain separate gates. A networked leaderboard is planned, not shipped.

## Why it belongs here

Local workflow companion demonstrates a product built around an AI workflow: choose a narrow need, avoid unnecessary inference, define host boundaries, handle persistence and deliver an inspectable extension. The evidence is product reasoning plus implementation detail. Progression points do not measure employee performance, and no retention lift is claimed.
