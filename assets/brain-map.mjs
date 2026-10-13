const records = [{"id": "projects", "label": "Projects", "x": 19, "y": 24, "title": "Keep the whole project in view.", "body": "The goal, current state, decisions and open work belong together. An assistant should be able to pick up the project without starting from scratch.", "record": "Marketing tools", "example": "Help paid-media strategists understand accounts, review ads and get the next piece of work ready.", "link": "marketing-ai-operations.html", "linkLabel": "Explore the marketing workspace", "related": ["decisions", "next", "rules"]}, {"id": "decisions", "label": "Decisions", "x": 19, "y": 75, "title": "Remember what we chose and why.", "body": "A new session needs the accepted direction and the approaches we already rejected. The reason matters as much as the choice.", "record": "Weekly reporting format", "example": "Short answer first. Explain what changed, give the source and make the next step clear.", "link": "../examples/fictional-knowledge-record.md", "linkLabel": "Read the sample reviewed record", "related": ["sources", "projects", "rules"]}, {"id": "sources", "label": "Sources", "x": 81, "y": 24, "title": "Keep the record behind the answer.", "body": "A search result points to the right record. Read that record before relying on it, so the date, context and limits travel with the answer.", "record": "A reviewed reporting decision", "example": "The sample keeps the decision, reason, source, intended use and review status together.", "link": "../examples/fictional-knowledge-record.md", "linkLabel": "Open the example source record", "related": ["decisions", "skills"]}, {"id": "skills", "label": "Skills", "x": 81, "y": 75, "title": "Give recurring work a useful method.", "body": "Skills tell the assistant how to handle a task. The method should produce work a person can actually use and check.", "record": "Creative review", "example": "Understand the customer, compare the messages, check the product claims and prepare a clear next brief.", "link": "creative-work.html", "linkLabel": "See how I plan and review ads", "related": ["sources", "rules", "next"]}, {"id": "rules", "label": "Work rules", "x": 50, "y": 87, "title": "Carry my working standards into the task.", "body": "Use the right context, write plainly, preserve other people's work and review the exact change before taking action.", "record": "Prepare, review, approve, verify", "example": "A changed draft gets a new review. After an approved action, check what actually happened.", "link": "../examples.html", "linkLabel": "Try the change-review example", "related": ["projects", "decisions", "skills"]}, {"id": "next", "label": "Next steps", "x": 50, "y": 13, "title": "Leave useful work ready for me.", "body": "A task needs a draft, a decision or a clear reason it is waiting. Keep the next step small enough to understand and act on.", "record": "Morning brief", "example": "Separate ready-to-review work, decisions that need me, blockers and tasks already covered by another routine.", "link": "../projects/daily-planning.html", "linkLabel": "See the morning-brief workflow", "related": ["projects", "skills"]}, {"id": "brain", "label": "AI work", "x": 50, "y": 49, "title": "One connected view of how I work.", "body": "Projects, decisions, sources, skills and working rules give the assistant context. Next steps turn that context into useful work.", "record": "Explore the map", "example": "Choose a node to see the record it holds and its connections. Search filters the public examples on this page.", "link": "../workspace-demo.html#brain", "linkLabel": "Try checking a saved AI note", "related": ["projects", "decisions", "sources", "skills", "rules", "next"]}];
const byId = new Map(records.map(r => [r.id, r]));
const $ = id => document.getElementById(id);
const buttons = [...document.querySelectorAll('[data-brain-node]')];
let selected = 'brain';
function select(id, announce = true) {
  const r = byId.get(id); if (!r) return;
  selected = id;
  for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.brainNode === id));
  for (const edge of document.querySelectorAll('[data-edge-a]')) edge.classList.toggle('is-connected', edge.dataset.edgeA === id || edge.dataset.edgeB === id);
  $('brain-detail-title').textContent = r.title;
  $('brain-detail-body').textContent = r.body;
  $('brain-record-title').textContent = r.record;
  $('brain-record-body').textContent = r.example;
  $('brain-record-link').href = r.link;
  $('brain-record-link').textContent = r.linkLabel + ' →';
  $('brain-related-list').replaceChildren(...r.related.map(key => {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = byId.get(key).label;
    b.addEventListener('click', () => { $('brain-search').value = ''; filter(); select(key); document.querySelector(`[data-brain-node="${key}"]`).focus(); });
    return b;
  }));
  if (announce) $('brain-search-status').textContent = r.label + ' selected. ' + r.title;
}
function filter() {
  const q = $('brain-search').value.trim().toLowerCase();
  const matches = records.filter(r => [r.label,r.title,r.body,r.record,r.example].join(' ').toLowerCase().includes(q));
  const ids = new Set(matches.map(r => r.id));
  for (const b of buttons) { const match = ids.has(b.dataset.brainNode); b.classList.toggle('is-muted', !match); b.disabled = !match; }
  for (const edge of document.querySelectorAll('[data-edge-a]')) edge.classList.toggle('is-muted', q !== '' && !ids.has(edge.dataset.edgeA) && !ids.has(edge.dataset.edgeB));
  $('brain-search-status').textContent = !q ? 'Seven connected areas. Select one to explore it.' : matches.length ? matches.length + (matches.length === 1 ? ' matching area. Select the highlighted node.' : ' matching areas. Select a highlighted node.') : 'No matching example. Try decisions, creative or morning.';
}
buttons.forEach(b => {
 b.addEventListener('click', () => select(b.dataset.brainNode));
 b.addEventListener('keydown', e => {
  if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key)) return;
  const active = buttons.filter(x => !x.disabled), at = active.indexOf(b); let next;
  if (e.key === 'Home') next = 0; else if (e.key === 'End') next = active.length-1;
  else next = (at + (['ArrowLeft','ArrowUp'].includes(e.key) ? -1 : 1) + active.length) % active.length;
  e.preventDefault(); active[next]?.focus();
 });
});
$('brain-search').addEventListener('input', filter);
$('brain-reset').addEventListener('click', () => { $('brain-search').value = ''; filter(); select('brain'); });
select('brain', false);
