"""Rebuild case-study and project HTML pages from their Markdown sources.

Usage: python tools/build_pages.py [page.md ...]
With no arguments it rebuilds every page listed in PAGES.

The existing HTML page is used as the template: everything outside <main> is kept
(head, scripts, theme toggle), the header nav and footer are normalised, and the
article is regenerated from Markdown. Special blocks that only exist in HTML
(illustrations, the interactive brain map) are carried over by name: write
<!-- block:NAME --> in the Markdown where the block should appear.
"""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# page -> figure class for plain images
PAGES = {
    "case-studies/compartes.md": "campaign-image",
    "case-studies/marketing-ai-operations.md": "work-image",
    "case-studies/team-systems.md": "work-image",
    "case-studies/creative-work.md": "work-image",
    "case-studies/personal-ai-work-system.md": "work-image",
    "projects/snipping-tool-ul.md": "work-image",
    "projects/ad-launch-mapper.md": "work-image",
    "projects/summoner.md": "work-image",
}

RESKIN_ONLY = [
    "case-studies/compartes-planning.html",
    "case-studies/compartes-submission.html",
    "projects/daily-planning.html",
    "projects/workflow-companion.html",
]

NAV = ('<nav aria-label="Main"><a href="../index.html#work">Work</a>'
       '<a href="../index.html#leadership">Team</a>'
       '<a href="../index.html#adnexus">AdNexus</a></nav>')
FOOTER = ('<footer><p>James Dupre · Paid-media leadership and AI product</p>'
          '<a href="https://github.com/finalpantasy/ai-work-showcase">Portfolio source</a></footer>')


HEADER = (
    '<a class="skip-link" href="#case-main">Skip to content</a>'
    '<header class="site-header" id="top"><div class="header-inner">'
    '<a class="brand" href="../index.html" aria-label="James Dupre, home"><span class="brand-mark" aria-hidden="true">JD</span>'
    '<span class="brand-name"><strong>James Dupre</strong><span>Paid media &amp; AI products</span></span></a>'
    '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">'
    '<span class="menu-toggle-label">Menu</span><span class="menu-toggle-icon" aria-hidden="true"><span></span><span></span></span></button>'
    '<nav class="site-nav" id="primary-navigation" aria-label="Primary navigation">'
    '<a href="../index.html#work">Work</a><a href="../index.html#leadership">Team</a><a href="../index.html#adnexus">AdNexus</a>'
    '<a href="../downloads/James_Dupre_AI_Strategy_Operations_Master.pdf" target="_blank" rel="noopener">Résumé <span aria-hidden="true">↗</span></a>'
    '<a href="../index.html#contact">Contact</a></nav></div></header>')
PAGE_FOOTER = (
    '<footer class="site-footer case-footer page-frame"><div class="footer-bottom">'
    '<span>© 2026 James Dupre · Cincinnati, Ohio</span><span>'
    '<a href="mailto:jamesdupre.mkt@gmail.com">jamesdupre.mkt@gmail.com</a>'
    '<a href="https://www.linkedin.com/in/jamesmkt/" target="_blank" rel="noopener">LinkedIn ↗</a>'
    '<a href="https://github.com/finalpantasy/ai-work-showcase">Portfolio source</a></span></div></footer>')


def chrome(old, title, desc, main_inner):
    """Wrap page content in the homepage header, styles and footer."""
    modules = "".join(re.findall(r'<script type="module"[^>]*></script>', old))
    head = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#F3EEDF">'
            f'<meta name="description" content="{html.escape(desc)}"><title>{html.escape(title)} | James Dupre</title>'
            '<link rel="icon" href="../assets/mark.svg" type="image/svg+xml">'
            '<link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="../assets/visuals.css">'
            f'<link rel="stylesheet" href="../assets/case.css"><script src="../script.js" defer></script>{modules}</head>')
    return (f'{head}<body class="case-page">{HEADER}'
            f'<main class="case-layout page-frame" id="case-main">{main_inner}</main>{PAGE_FOOTER}</body></html>\n')


def fix_aside(aside):
    aside = re.sub(r'<a href="\.\./index\.html#work">[^<]*</a>', '<a href="../index.html">← Back to the portfolio</a>', aside)
    return aside.replace(">Explore the marketing tools<", ">Try the AdNexus demos<")


def reskin(rel):
    """Apply the shared chrome to a page whose article is kept as is."""
    path = ROOT / rel
    old = path.read_text(encoding="utf-8")
    title = re.sub(r"\s*\|\s*James Dupre\s*$", "", re.search(r"<title>(.*?)</title>", old, re.S).group(1))
    desc = re.search(r'<meta name="description" content="([^"]*)"', old).group(1)
    aside = fix_aside(re.search(r'<aside class="case-nav">.*?</aside>', old, re.S).group(0))
    article = re.search(r"<article.*?</article>", old, re.S).group(0)
    article = article.replace('href="../index.html#work">See more of my work →', 'href="../index.html#work">Back to the portfolio →')
    path.write_text(chrome(old, html.unescape(title), html.unescape(desc), aside + article), encoding="utf-8", newline="\n")
    print(f"reskinned {rel}")


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)

    def link(m):
        label, url = m.group(1), m.group(2)
        ext = url.startswith("http")
        attrs = ' target="_blank" rel="noopener"' if ext else ""
        return f'<a href="{url}"{attrs}>{label}</a>'

    return re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", link, text)


def image_size(src, page_dir):
    """Return (width, height) of a local image, or None."""
    try:
        from PIL import Image
        with Image.open((page_dir / src).resolve()) as im:
            return im.size
    except Exception:
        return None


def figure(alt, src, cls, first, page_dir):
    full = f"{cls} case-hero" if (first and cls == "campaign-image") else cls
    a = html.escape(alt)
    size = image_size(src, page_dir)
    dims = f' width="{size[0]}" height="{size[1]}"' if size else ""
    lazy = "" if first else ' loading="lazy"'
    return (f'<figure class="{full}"><a href="{src}" aria-label="Open full-size image: {a}">'
            f'<img src="{src}" alt="{a}"{dims}{lazy}></a>'
            f"<figcaption>{a}.</figcaption></figure>")


def table(rows):
    cells = [[c.strip() for c in r.strip().strip("|").split("|")] for r in rows]
    head, body = cells[0], cells[2:]
    label = html.escape(head[0]) + " table"
    out = ['<p class="table-scroll-hint">Scroll sideways to see all columns.</p>',
           f'<div class="table-wrap" role="region" aria-label="{label}" tabindex="0"><table><thead><tr>']
    out += [f'<th scope="col">{inline(c)}</th>' for c in head]
    out.append("</tr></thead><tbody>")
    for r in body:
        out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
    out.append("</tbody></table></div>")
    return "".join(out)


def convert(md, img_cls, blocks, page_dir):
    lines = md.splitlines()
    out, toc, title = [], [], ""
    i, first_img = 0, True
    while i < len(lines):
        line = lines[i]
        s = line.strip()
        if not s:
            i += 1
            continue
        m = re.match(r"<!--\s*block:([\w-]+)\s*-->", s)
        if m:
            out.append(blocks.get(m.group(1), ""))
            i += 1
            continue
        m = re.match(r"(#{1,3})\s+(.*)", s)
        if m:
            level, text = len(m.group(1)), m.group(2).strip()
            hid = slug(text)
            if level == 1:
                title = text
            if level == 2:
                toc.append((hid, text))
            out.append(f'<h{level} id="{hid}">{inline(text)}</h{level}>')
            i += 1
            continue
        m = re.fullmatch(r"!\[([^\]]*)\]\(([^)]+)\)", s)
        if m:
            out.append(figure(m.group(1), m.group(2), img_cls, first_img, page_dir))
            first_img = False
            i += 1
            continue
        if s.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(lines[i])
                i += 1
            out.append(table(rows))
            continue
        if s.startswith(">"):
            paras, cur = [], []
            while i < len(lines) and lines[i].strip().startswith(">"):
                t = lines[i].strip()[1:].strip()
                if t:
                    cur.append(t)
                elif cur:
                    paras.append(" ".join(cur))
                    cur = []
                i += 1
            if cur:
                paras.append(" ".join(cur))
            out.append("<blockquote>" + "".join(f"<p>{inline(p)}</p>" for p in paras) + "</blockquote>")
            continue
        if re.match(r"(-|\d+\.)\s", s):
            tag = "ol" if s[0].isdigit() else "ul"
            items = []
            while i < len(lines) and re.match(r"\s*(-|\d+\.)\s", lines[i]):
                items.append(re.sub(r"^\s*(-|\d+\.)\s+", "", lines[i]))
                i += 1
            out.append(f"<{tag}>" + "".join(f"<li>{inline(t)}</li>" for t in items) + f"</{tag}>")
            continue
        para = []
        while i < len(lines) and lines[i].strip() and not re.match(r"(#|\||>|!\[|<!--|-\s|\d+\.\s)", lines[i].strip()):
            para.append(lines[i].strip())
            i += 1
        out.append(f"<p>{inline(' '.join(para))}</p>")
    return title, toc, "".join(out)


def collect_blocks():
    """Index every named illustration and the brain map across all pages."""
    found = {}
    for page in list((ROOT / "case-studies").glob("*.html")) + list((ROOT / "projects").glob("*.html")):
        text = page.read_text(encoding="utf-8")
        for m in re.finditer(r'<figure class="portfolio-visual[^"]*" data-portfolio-visual="([\w-]+)".*?</figure>', text, re.S):
            found.setdefault(m.group(1), m.group(0))
        for m in re.finditer(r'<section class="brain-workspace".*?</section>', text, re.S):
            found.setdefault("brain", m.group(0))
    return found


BLOCKS = {}


def build(rel):
    md_path = ROOT / rel
    html_path = md_path.with_suffix(".html")
    old = html_path.read_text(encoding="utf-8")
    blocks = BLOCKS

    md = md_path.read_text(encoding="utf-8")
    title, toc, body = convert(md, PAGES[rel], blocks, md_path.parent)
    first_p = re.search(r"<p>(.*?)</p>", body)
    desc = re.sub(r"<[^>]+>", "", first_p.group(1)) if first_p else title

    aside = re.search(r'<aside class="case-nav">.*?</aside>', old, re.S).group(0)
    toc_html = '<nav class="toc-links" aria-label="On this page">' + "".join(
        f'<a href="#{hid}">{html.escape(t)}</a>' for hid, t in toc) + "</nav>"
    aside = fix_aside(re.sub(r'<nav class="toc-links".*?</nav>', toc_html, aside, flags=re.S))
    ending = '<div class="case-ending"><a class="text-link" href="../index.html#work">Back to the portfolio →</a></div>'
    page = chrome(old, title, desc, f'{aside}<article class="case-content">{body}{ending}</article>')
    html_path.write_text(page, encoding="utf-8", newline="\n")
    missing = set(re.findall(r"<!--\s*block:([\w-]+)", md)) - set(blocks)
    print(f"built {html_path.relative_to(ROOT)}  sections={len(toc)}" + (f"  MISSING BLOCKS {missing}" if missing else ""))


if __name__ == "__main__":
    BLOCKS.update(collect_blocks())
    print("blocks:", ", ".join(sorted(BLOCKS)))
    for rel in (sys.argv[1:] or PAGES):
        build(rel.replace("\\", "/"))
    if not sys.argv[1:]:
        for rel in RESKIN_ONLY:
            reskin(rel)
