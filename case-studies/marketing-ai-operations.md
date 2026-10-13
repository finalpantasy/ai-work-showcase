# AdNexus: the team standard, built into software

AdNexus is elk Marketing's AI operating system for paid media. I conceived it, wrote the requirements and built it, starting in May 2026. It is in production on live client accounts. The screens on this page use fictional client data.

![AdNexus command center showing priorities, opportunities and account health for fictional clients](../assets/workspace/command-center.jpg)

## Why I built it

My team works from a written standard: know the business before touching the account, change one thing on purpose, prove the change landed, and explain why. I spent years teaching it through a 200-page guide, account audits and reviews of people's work. The standard was sound. Following it on every account, every day, was the hard part.

The facts a strategist needs are spread across a dozen tools: campaign numbers, client goals, past decisions, creative, tracking, tasks and client messages. AI did not fix that on its own. Handing someone an empty chat box still leaves them to work out what to ask, which source to trust and what to do with the answer. If AI adds work, a busy strategist stops using it.

So AdNexus starts from the task instead of the prompt. A strategist opens an account and sees what needs a decision, with the context already loaded and the standard's checks already run.

## What changed for the team

It is built for the whole agency, with dashboards for strategists, account executives, project managers, creative teams and leadership. By my own estimate, it gives each strategist back 20 or more hours a week that used to go to collecting facts and retyping them. A full audit and optimization of an unfamiliar account now takes about 30 minutes.

## What I built

AdNexus brings Google Ads, Meta, TikTok, Microsoft Advertising, GA4, Triple Whale, Slack, Asana and meeting notes into one place. A strategist asks a question in plain English and gets a sourced answer, a dashboard or a change ready for approval.

I built it myself with Claude Code and Codex: 860 code changes merged between July 15 and October 12, 2026. It holds 34 client workspaces, and its 165 tools also work inside AI assistants such as Claude, so the team can question live account data from a chat.

| What the team gets | Why it matters |
| --- | --- |
| A morning list of what needs a decision | Numbers first, at most five items, each with a plain-English next step |
| Account reviews on demand | Search terms, ad copy, landing pages, budgets and creative, checked in minutes |
| Eighteen automated checks | Silent while an account is healthy, specific when something breaks |
| Fair creative scoring | A new ad is not written off after one day of spend |
| Explanations when results move | Where the change is, and what to check next |
| Approval on every change | Nothing changes in a client account until a strategist approves it |

## Start with the account

The account view puts the client's goals, budget, performance, open work and constraints on one screen, before anyone opens a tool. It also keeps the client context that usually lives in someone's head: the products that matter, the target customer, approved copy rules and upcoming events.

It shows urgency and readiness separately. A broken tracking tag is urgent even when there is not yet enough data to diagnose it. An ad review can be ready to decide even when nothing is on fire. Seeing both tells the strategist where to start.

![AdNexus account view with a prepared review, account checks and data freshness](../assets/workspace/client-dashboard.jpg)

## Explain what changed

When results move, AdNexus compares two matching periods, finds where the change is concentrated, and writes a short explanation with the evidence attached. It separates what the numbers show from possible causes, and pulls in notes, tasks and recent account changes so the strategist knows what to check.

In the [public demo](../workspace-demo.html), Meta return falls from 3.2x to 2.4x week over week. Prospecting accounts for the whole drop while retargeting holds. A vague "Meta is down" becomes one specific question about prospecting.

## Review creative as ads, not rows

An ad is more than a return figure. The creative review shows the ad itself beside its results, lets the strategist switch attribution views, and records the decision. Different attribution sources often disagree. Hiding that makes a tidier page and a worse decision.

![AdNexus creative review with fictional ads, attribution comparisons and decision controls](../assets/workspace/creative-review.jpg)

The review then feeds the next brief: audience, buying moment, objection, promise, proof, format and destination, with the one thing being tested named. See [how I write briefs](creative-work.html).

## Make search-term review manageable

Search-term review can mean hundreds of rows. AdNexus turns them into a short list of decisions. A clearly wrong search, like "coffee table" for a coffee brand, is handled differently from a relevant search with too little data to judge.

![AdNexus search-term review grouping fictional queries into queues](../assets/workspace/search-review.jpg)

## A person approves every change

Nothing changes in a client account until a strategist approves it, and AdNexus flags any ad that lands in the wrong client's account. It is the team standard's "prove the change landed" rule, applied to every account automatically.

[Try the demos](../workspace-demo.html) · [How I train the team](team-systems.html) · [The Compartés case](compartes.html)
