# Summoner: a desktop workspace for accountable AI-assisted work

**My role:** Product direction, workflow requirements, task scoping and AI-assisted development coordination. **Status:** Active private prototype with integrated sample-mode features. Installer and live-account acceptance remain open.

## The problem behind the workspace

AI-assisted work becomes difficult to follow when projects spread across chats, tools, branches and sessions. Context can be useful but stale. A worker can finish without showing what changed. A successful test can be mistaken for approval to push. Account and model choices can drift as a conversation continues.

Summoner makes work legible. The product direction puts projects, tasks, context, artifacts and review in a desktop workspace. The goal is to help the person directing work understand what is happening, what evidence exists and which decisions still belong to them.

## Build on a foundation, then own the decisions

The project builds on [CloudCLI / Claude Code UI](https://github.com/siteboon/claudecodeui), an AGPL-3.0 upstream project. I do not claim authorship of that foundation. My work directs the desktop product, requirements, additions and acceptance process. This showcase contains no private source.

The integrated desktop shell uses Tauri to supervise a Node backend. It preserves useful application behavior while creating a native lifecycle, rather than requiring a wholesale rewrite. Work includes instance ownership, sidecar supervision, loopback restrictions and bounded restart behavior. Installer acceptance and performance measurements are separate tasks; no measured memory or startup improvements are claimed.

## The user chooses the AI and model

Model choice has cost, quality and account implications. The direction keeps that choice with the user for each job. Usage information can support a decision, and a soonest-reset account can be suggested, but a suggestion does not silently switch the working account or model. Conversations retain their account binding.

Traceability matters when a result is surprising: establish which project, model and account were involved. This requirement is being implemented and checked in the prototype, not a claim that every provider has completed live acceptance.

## Make code reviewable before remote actions

A merged sample work loop gives tasks their own branch and worktree, records checkpoints, exposes a per-turn diff and supports base comparison. Restoration must refuse unsafe cases. Commit and PR preparation remain separate from approval to execute external actions.

The scope is a synthetic fixture repository. This exercises changes and failure cases without touching real repositories. Real-repository access and remote actions remain gated. A tested sample workflow is a useful milestone, not release readiness.

## Context with provenance and a usable alternative

A merged beta creates a project-scoped relationship graph over fictional notes and identities. It includes labeled links, source inspection, search, filters, layout persistence and a keyboard/list alternative. Moving a node changes its layout, not permissions, approvals or AI execution.

The requirement is to inspect where context came from and remain in the current project. The beta does not connect to a private knowledge library or launch model processes. Fixtures make behavior inspectable while data-access design continues.

## Delivery process

I direct bounded cards with dependencies, file ownership, acceptance criteria and evidence requirements. Separate worktrees reduce collisions. Integration includes reviewing diffs, rerunning relevant checks and recording technical verification separately from user acceptance.

Inspected records show integrated desktop-shell, sample code-review and fixture-graph work, with passing checks at recorded checkpoints. This portfolio review did not rerun the private application or turn historical receipts into current live acceptance.

## Tradeoffs and unfinished work

Desktop-first scope keeps the immediate workflow concrete. Mobile check-in and real pairing are later milestones. A user-triggered web relay has bounded sends and caps in the current design, rather than unattended loops. Live sign-in, account connections, installation and real-repository acceptance remain separate gates.

The upstream foundation creates attribution and licensing obligations that later distribution must address. Keeping source private means this portfolio shows decisions, contracts and status rather than implying a downloadable product exists here.

## What this demonstrates

The work translates extensive AI use into product requirements: retain user control, make changes inspectable, protect active work and demand appropriate evidence. The result is an evolving workspace with integrated sample capabilities and identified remaining gates.
