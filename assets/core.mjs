// Original public demonstrations. Fictional values, no account integrations.
export function pacing({budget, spend, day, days}) {
  if (![budget, spend, day, days].every(Number.isFinite)) throw new Error('Enter a number in every field.');
  if (budget <= 0 || spend < 0) throw new Error('Budget must be greater than zero; spend cannot be negative.');
  if (!Number.isInteger(days) || days < 1 || days > 366 || !Number.isInteger(day) || day < 1 || day > days) throw new Error('Use whole days; elapsed days must be between 1 and the period length (maximum 366).');
  const planned = budget * day / days;
  const deviation = spend / planned - 1;
  const projection = spend * days / day;
  const remainingDays = days - day;
  const reference = remainingDays ? Math.max(0, budget - spend) / remainingDays : null;
  return {planned, projection, reference, remainingDays, deviation,
    status: Math.abs(deviation) < .05 ? 'On pace' : deviation > 0 ? 'Ahead of plan' : 'Behind plan'};
}

export function newRun(scenario = 'success') {
  if (!['success', 'stale', 'mismatch'].includes(scenario)) throw new Error('Unknown scenario.');
  return {scenario, phase: 'idle', version: 7, budget: 1000, proposed: 1200,
    target: 'Fictional campaign A', dispatched: false, receipt: null, trail: ['No action prepared.']};
}
export function preview(run, now) {
  if (run.phase !== 'idle') throw new Error('Reset the simulation before building another preview.');
  return {...run, phase: 'previewed', snapshot: {version: run.version, budget: run.budget,
    proposed: run.proposed, target: run.target, expires: now + 60000}, trail: ['Preview: campaign A, daily budget $1,000 to $1,200; expires in 60 seconds.']};
}
export function approve(run, now) {
  if (run.phase !== 'previewed') throw new Error('Build a preview before approving it.');
  if (now >= run.snapshot.expires) return {...run, phase: 'blocked', trail: [...run.trail, 'Preview expired before approval. Reset and review a fresh preview.']};
  return {...run, phase: 'approved', trail: [...run.trail, 'Approval recorded for this exact snapshot.']};
}
export function execute(run, now) {
  if (run.phase !== 'approved' || run.dispatched) throw new Error('A current approved preview is required; an action cannot be dispatched twice.');
  const s = run.snapshot;
  if (now >= s.expires || s.version !== run.version || s.budget !== run.budget || s.target !== run.target || s.proposed !== run.proposed) {
    return {...run, phase: 'blocked', trail: [...run.trail, 'Preview stale or target changed. Nothing dispatched. Reset and review again.']};
  }
  const observed = run.scenario === 'mismatch' ? 1100 : s.proposed;
  const trail = [...run.trail, 'Dispatched once to the fictional target.', `Read-back: $${observed.toLocaleString('en-US')}.`];
  if (observed !== s.proposed) return {...run, budget: observed, dispatched: true, phase: 'failed', receipt: null,
    trail: [...trail, 'Mismatch: expected $1,200. No success receipt. Investigate observed state before retrying.']};
  return {...run, budget: observed, dispatched: true, phase: 'verified', receipt: 'Verified: fictional campaign A, $1,000 to $1,200.', trail: [...trail, 'Read-back matches. Verification receipt created.']};
}

export function auditCopy(copy, calibrated = true) {
  const protectedRanges = [];
  if (calibrated) {
    for (const pattern of [/https?:\/\/[^\s]+/g, /[@#][A-Za-z0-9_]+/g, /"examplebrand gifts"/g]) {
      for (const m of copy.matchAll(pattern)) protectedRanges.push([m.index, m.index + m[0].length]);
    }
  }
  const issues = [];
  for (const m of copy.matchAll(/\bexamplebrand\b/gi)) {
    if (m[0] === 'ExampleBrand') continue;
    if (protectedRanges.some(([start, end]) => m.index >= start && m.index + m[0].length <= end)) continue;
    issues.push({start: m.index, text: m[0], message: 'Use ExampleBrand in ordinary prose.'});
  }
  return issues;
}
