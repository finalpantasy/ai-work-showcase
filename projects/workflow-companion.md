# Claude Quest: make long work sessions more enjoyable

Public early-access Claude Code extension, version 0.1.0 at the reviewed checkpoint. Ongoing development.

Claude Quest adds a small character to a Claude Code session. Work activity fuels its progress, while background camp activities continue locally. It is a playful project, but the product questions are serious: how can an extension be enjoyable without getting in the way or adding unnecessary cost?

[Open the public repository](https://github.com/finalpantasy/claude-quest).

## Build around work that is already happening

The extension reacts to local session activity, such as reading, editing, using agents and committing. It turns those events into progress. The companion does not need to call a model to invent the next move.

The reviewed version includes character progression, classes, equipment, a map and camp activities. Its presentation uses CSS and SVG animation. The design keeps the game beside the work rather than requiring a second conversation to maintain it.

That is the useful distinction behind the project's “zero tokens” wording: the companion's progression adds no model calls. It is not a claim that developing the extension used no AI or that the work session itself uses no tokens.

## Make it quiet enough to live with

An extension above a prompt can become annoying quickly. It takes space from the task and can redraw more often than it needs to. The implementation aims to redraw at appropriate task events and keep the local state small.

The product judgment is deciding which part of the experience earns its space. Progress should be visible, the character should be pleasant and the work should stay readable. More animation is not automatically a better extension.

## Handle repeated events and multiple sessions

Local activity can arrive more than once or from several sessions. If every copy of an event earns another reward, the extension's progress stops reflecting the work. Multiple sessions can also compete to update the same save.

The reviewed design uses a leader-and-follower approach for sessions and local save handling. That is ordinary software reliability applied to a small experience. It matters because someone should be able to open another session without breaking their progress.

The save is local. The reviewed documentation describes a small state file and no external progression service. Privacy and clear ownership of local state are part of keeping the extension lightweight.

## A playful surface still needs real product decisions

I have worked on the feel of the companion, the progression and the implementation around it. A good experience needs more than an attractive character. It needs sensible behavior when a session ends, a save is restored or several sessions are open.

The questions include when to award progress, how to avoid duplicate work, what to preserve in a save and how much activity to show. Those decisions are small enough to inspect and important enough to affect whether someone keeps using it.

## My contribution

I supply the product direction and work hands-on with AI on the design and build. I review whether the behavior is clear, enjoyable and appropriate for the work environment. I also care about the overhead and reliability of the extension, not just the visual idea.

This project is not a marketing result. It is an example of interaction design, local automation, state handling and AI-assisted product building. It belongs here as a specific extension I have been working on, rather than a roundup of unrelated game repositories.

## Evidence and limits

The repository is public, so a reviewer can inspect the README and source. The reviewed public snapshot is early access. Compatibility with changing Claude Code extension hooks is a continuing risk, and I do not claim that every later local feature is already published.

The public repository uses a pseudonymous author. Development work and personal project context remain separate. I have not included private chats or local save files in this showcase.

The project shows how I use AI to move from an idea to a concrete tool while paying attention to the person using it. For the business version of that approach, see [the marketing workspace](../case-studies/marketing-ai-operations.html) and [the ad-launch mapper](ad-launch-mapper.html).
