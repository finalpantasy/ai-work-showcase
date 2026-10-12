# AI strategy & product delivery

[Open the interactive portfolio](https://finalpantasy.github.io/ai-work-showcase/) · [Browse its source](index.html)

I connect performance marketing leadership with AI-assisted product delivery: define the decision, direct implementation, inspect changes and verify the observed result. Claude Code, OpenAI Codex and ChatGPT support that work.

This showcase contains four detailed cases and three working, fictional-data demonstrations. It describes my contribution, team or upstream attribution, specific decisions, evidence and remaining gates.

## Detailed work

| Case | Concrete evidence and decisions |
| --- | --- |
| [Marketing AI operations](case-studies/marketing-ai-operations.md) | Budget pacing, bounded competitor research, seven audit false positives, API compatibility and action verification. 860 author-attributed PRs merged July 15–October 12, 2026, treated as activity evidence rather than a bug or deployment count. |
| [Compartés holiday campaign](case-studies/compartes.md) | AI-assisted creative, copy, analysis and tooling contribution; reported Meta award; separate nine-day advertising and eight-week store outcomes. Team attribution and no claim of AI-caused uplift. |
| [Summoner](projects/summoner.md) | Tauri desktop direction, user-selected models, sample worktree/diff/checkpoint loop and project-scoped fixture graph. Upstream credit and unfinished installation/live-account gates. |
| [Local workflow companion](projects/workflow-companion.md) | Event-driven Claude Code extension: no runtime model calls, local persistence, duplicate-count handling and multi-session coordination. Public source link withheld pending identity cleanup. |

## Try the work

Open the [portfolio](https://finalpantasy.github.io/ai-work-showcase/) to use:

- **Budget pacing:** edit budget, spend and period assumptions; inspect planned spend, projection and a remaining daily reference. Invalid and period-end inputs are handled explicitly.
- **Approval and read-back:** walk through preview, approval and execution. A stale preview never dispatches; a mismatched read-back creates no success receipt.
- **Copy audit calibration:** compare a naive rule with an exception-aware rule on fictional copy. Protected references are accepted while an incorrect spelling in prose still gets flagged.

The demonstrations are original public implementations of the reasoning, not private production code. No advertising account, external API, model or analytics service is connected. Inputs stay in the browser.

## Inspect and reproduce

Run the demonstration checks with an installed Node.js runtime:

```text
node --test tests/core.test.mjs
```

Serve this directory with any static HTTP server to run the browser modules. The shared logic lives in [assets/core.mjs](assets/core.mjs); the tests exercise arithmetic, invalid inputs, preview expiry, changed targets, one-time execution, read-back mismatch and copy exceptions.

## Workflow samples

[Decision brief](skills/decision-brief/SKILL.md) · [Creative review](skills/creative-review/SKILL.md) · [Fictional decision brief](examples/fictional-decision-brief.md)

These templates were created for this showcase. They are examples, not claims of enterprise adoption or measured impact.

## Evidence boundaries

Campaign figures are publicly reported team outcomes. Career scale and time savings are approved aggregate career claims. Private repository records support delivery and checkpoint status; merged code does not automatically prove deployment or current reliability. The cases state those limits at the point of each claim.

No personal name, personal contact information, employer identity, other client names, private account records or credentials are included in this export. The named Compartés case is an authorized exception and remains publicly traceable. Private development sources stay separate. Existing public repositories may have historical identity issues outside this export.

Newsreader is self-hosted under its [SIL Open Font License](assets/FONT-LICENSE.txt).
