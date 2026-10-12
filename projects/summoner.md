# Summoner

**Status:** Desktop prototype in active development. This page is a project brief, not a released application or a live demonstration.

## Product direction

Summoner is a desktop-first workspace for coordinating AI-assisted work across projects. The goal is to make context, implementation tasks, results, and verification easier to follow as work moves between AI tools and sessions.

## My contribution

I direct product priorities, workflow requirements, and AI-assisted development. The work includes specifying bounded tasks, coordinating implementation, and defining what evidence is required before a change is accepted.

## Foundation and attribution

The project builds on [CloudCLI / Claude Code UI](https://github.com/siteboon/claudecodeui), rather than starting with an entirely original codebase. The upstream project carries an AGPL-3.0 license. Its authors retain credit for that foundation.

The Summoner work adds a desktop product direction, sample workspace, and a project coordination process. It does not claim authorship of the upstream application.

## Development approach

- Start with a desktop shell and a fictional sample workspace.
- Give each implementation task a clear owner, bounded scope, and acceptance criteria.
- Use isolated branches and worktrees to protect concurrent work.
- Check source changes and relevant tests before integration.
- Keep planned capabilities separate from implemented and verified behavior.

## Current boundaries

The project is still being developed. Live account connections, real conversations, remote pairing, and installation acceptance are separate milestones. Mobile work is planned for later. This public showcase includes no development source, account connections, or private session records.
