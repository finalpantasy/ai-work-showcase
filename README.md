# AI Work Showcase

Portfolio of a paid-media leader who built AdNexus, elk Marketing's AI operating system for paid media.

[View the portfolio](https://finalpantasy.github.io/ai-work-showcase/)

The site tells one story in three parts:

1. **The work.** [Compartés, holiday 2025](https://finalpantasy.github.io/ai-work-showcase/case-studies/compartes.html): the budget plan, the ads and the results behind a 2026 Meta Agency Award.
2. **The team.** [How I train the team](https://finalpantasy.github.io/ai-work-showcase/case-studies/team-systems.html): the written standard six strategists work from.
3. **The software.** [How AdNexus works](https://finalpantasy.github.io/ai-work-showcase/case-studies/marketing-ai-operations.html): that standard built into an AI system used on live client accounts.

![AdNexus command center with fictional account data](assets/command-center.jpg)

Also here: [interactive demos with fictional data](https://finalpantasy.github.io/ai-work-showcase/workspace-demo.html), side projects ([Summoner](projects/summoner.md), [Snipping Tool UL](projects/snipping-tool-ul.md), [Personal AI Brain](case-studies/personal-ai-work-system.md)) and the [résumé](downloads/James_Dupre_AI_Strategy_Operations_Master.pdf).

Private code, client records and private evidence are not included. Product screens use fictional data.

## Editing

Case-study and project pages are written in Markdown. After editing a `.md` file, rebuild its HTML twin:

```
python tools/build_pages.py
```

The script keeps the homepage header, styles and footer on every page and carries over illustrations marked `<!-- block:NAME -->`.

## Local preview

Run `python -m http.server 8080 --bind 127.0.0.1` from this folder and open http://127.0.0.1:8080/. No build step is needed to view the site.
