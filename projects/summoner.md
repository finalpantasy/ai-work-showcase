# Summoner: keep AI project work together

Desktop workspace prototype in active development. Private source. Account connections, installers and broader native acceptance remain incomplete.

I use AI to build and run a lot of work. Once there are several projects, chats, tasks and changes in flight, the problem becomes keeping the work together. Summoner is the desktop workspace I have been developing around that problem.

I want to see the project, its current context, the conversation and the result without constantly rebuilding that picture across separate tools. The aim is a place where I can direct the work and review what came back.

## The task I am designing for

A project has a goal, files, decisions, open tasks and changes that need review. A conversation is only one part of it. When the chat ends, the project should still have a clear state.

The workspace work includes project navigation, chats, tasks, model choice and reviewing changes. The current implementation direction is a native desktop shell with a web interface inside it. It derives from an existing open-source workspace; I do not present the upstream foundation as my invention.

The product work is in how the pieces fit the way I work: choosing a project, supplying context, deciding what an assistant should do and keeping the result reviewable.

## Keep a safe sample separate from real work

The development includes a sample workspace so interface work can be tested without signing into real AI accounts or reading private project content. That is a useful product decision: we can judge the workflow before giving it access to actual work.

The sample is not proof that live account connections work. Real authentication, pairing, relay behavior and broader installed-app acceptance still have their own gates. A working demo screen should not silently become a claim of a finished product.

This public case is a description of my work. The private workspace, messages and development history remain private.

## Preserve the work when several changes happen at once

The project has needed coordination across different areas. Separate changes can touch the desktop shell, the document view, the chat experience or the project state. I have worked on keeping those areas bounded and making integration a deliberate step.

That includes knowing who owns a change, what the current checkpoint is and which result has actually been reviewed. A test result from an earlier checkpoint is useful history; it is not a fresh guarantee for the latest build.

These habits matter to the product as well. An AI workspace should make the state of work clearer, not make it easier to lose track of what has changed.

## What I want a project handoff to contain

Here is an original example of the handoff structure I am aiming for:

| Item | What a new session should be able to understand |
| --- | --- |
| Goal | The user's intended result in ordinary language |
| Current state | What exists now and what has been verified |
| Decisions | Accepted choices and the reason for them |
| Open work | The next bounded task and what blocks it |
| Changes | The files or outputs that need review |
| Limits | Anything tested only in sample mode or still awaiting real use |

This table is illustrative. It shows the operating approach without exposing the project's actual private task queue.

## My contribution

I define the experience I want as an active user of AI project tools. I work through product and workflow choices, direct AI-assisted implementation, review the interface and push for clear state and usable results.

I have also worked on the surrounding operating rules for models, context, handoffs and verification. Those rules are useful only if the workspace makes them understandable and easy to follow. The software and the method need to support each other.

## What is complete and what is still open

There is an active desktop prototype and sample-workspace development. Current project records describe integrated work and checks at specific checkpoints. I am not claiming a finished public release, reliable live account integration or a published private-code portfolio repository.

The project also has an upstream license that needs to be preserved in any distribution. A private repository does not remove that obligation. Public showcase material should explain the contribution while keeping the underlying project and work records protected.

## Why it belongs in this portfolio

Summoner shows that my AI work extends beyond marketing prompts. I am thinking about the environment people need to do sustained work with AI: context, tasks, direction, review and continuity.

The same idea appears in the [marketing platform](../case-studies/marketing-ai-operations.html) and [personal brain](../case-studies/personal-ai-work-system.html). A useful system helps someone pick up the work, understand it and make the next step.
