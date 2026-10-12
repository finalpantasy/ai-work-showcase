# Claude Quest: a companion inside Claude Code

My role: Product direction, progression design and AI-assisted development. Status: Early-access extension, with more work in development.

## The idea

I wanted a small character that progresses while I work in Claude Code. It responds to activity in the session and gives long work sessions a sense of continuity.

The experience is meant to stay in the background. It uses local rules and authored content to advance the character.

## What I have worked on

The project includes a progression engine, local save handling, a visual scene and a terminal presentation. I direct how those pieces should behave and use AI to work through the implementation.

One important detail is multiple sessions. Opening another chat should not count the same activity twice. The source includes coordination and a test for repeated activity counts.

Other product concerns include time away, older saves and a quieter display. I want the extension to be enjoyable without getting in the way of the work.

## Keep the runtime small

The progression runs from rules, activity counts and time. It makes no extra model calls for the character. The project keeps its save and activity state local.

That design matches the job: a predictable companion that can run alongside AI work without needing another AI service to invent its next move.

## Current stage and source

The public early-access source is available in the [Claude Quest repository](https://github.com/finalpantasy/claude-quest). Further local work is in progress. This portfolio review inspected source; it did not run a fresh long-term play test or operate on a live save.

## Why I include it

This is a smaller example of my product judgment. I can take an idea, define how it should feel, work through edge cases and direct AI-assisted development toward a usable experience.
