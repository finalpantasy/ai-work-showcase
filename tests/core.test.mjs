import test from 'node:test';
import assert from 'node:assert/strict';
import {pacing, newRun, preview, approve, execute, auditCopy} from '../assets/core.mjs';

test('pacing separates plan, projection and remaining reference', () => {
  const p = pacing({budget:30000, spend:14500, day:12, days:30});
  assert.equal(p.planned,12000); assert.equal(p.projection,36250);
  assert.equal(p.reference,15500/18); assert.equal(p.status,'Ahead of plan');
});
test('pacing handles exact plan, under plan and sub-five-percent noise', () => {
  assert.equal(pacing({budget:30000,spend:12000,day:12,days:30}).status,'On pace');
  assert.equal(pacing({budget:30000,spend:9000,day:12,days:30}).status,'Behind plan');
  assert.equal(pacing({budget:30000,spend:12400,day:12,days:30}).status,'On pace');
});
test('period end and overspend never produce a negative daily reference', () => {
  assert.equal(pacing({budget:100,spend:150,day:30,days:30}).reference,null);
  assert.equal(pacing({budget:100,spend:150,day:20,days:30}).reference,0);
  assert.equal(pacing({budget:100,spend:0,day:1,days:1}).projection,0);
});
test('invalid pacing assumptions fail rather than produce misleading output', () => {
  for (const input of [{budget:0},{spend:-1},{day:0},{day:31},{day:1.5},{days:0},{days:367},{budget:NaN},{spend:Infinity}])
    assert.throws(()=>pacing({budget:100,spend:30,day:12,days:30,...input}));
});
test('execution requires a preview and approval', () => {
  const r=newRun(); assert.throws(()=>execute(r,0)); assert.throws(()=>approve(r,0));
  assert.throws(()=>execute(preview(r,0),1));
});
test('verified read-back creates one receipt and forbids repeated execution', () => {
  const r=execute(approve(preview(newRun(),0),1),2);
  assert.equal(r.phase,'verified'); assert.equal(r.dispatched,true); assert.ok(r.receipt);
  assert.throws(()=>execute(r,3));
});
test('expired approval or execution never dispatches', () => {
  assert.equal(approve(preview(newRun(),0),60000).phase,'blocked');
  const r=execute(approve(preview(newRun('stale'),0),1),60000);
  assert.equal(r.phase,'blocked'); assert.equal(r.dispatched,false); assert.equal(r.receipt,null);
});
test('changing target, version or approved values invalidates the preview', () => {
  for(const change of [{version:8},{budget:1100},{proposed:1300},{target:'Other fictional campaign'}]) {
    const r=execute({...approve(preview(newRun(),0),1),...change},2);
    assert.equal(r.phase,'blocked'); assert.equal(r.dispatched,false);
  }
});
test('a successful dispatch with mismatched read-back is not verified', () => {
  const r=execute(approve(preview(newRun('mismatch'),0),1),2);
  assert.equal(r.phase,'failed'); assert.equal(r.budget,1100); assert.equal(r.receipt,null);
  assert.equal(r.dispatched,true); assert.throws(()=>execute(r,3));
});
test('calibration accepts protected references while preserving a real error', () => {
  const copy='Try "examplebrand gifts", https://example.invalid/examplebrand and @examplebrand. Examplebrand is wrong.';
  assert.equal(auditCopy(copy,false).length,4); assert.equal(auditCopy(copy,true).length,1);
  assert.equal(auditCopy(copy,true)[0].text,'Examplebrand');
});
test('correct prose and protected phrase are accepted; unprotected lowercase is not', () => {
  assert.equal(auditCopy('ExampleBrand and "examplebrand gifts"').length,0);
  assert.equal(auditCopy('examplebrand makes gifts.').length,1);
  assert.equal(auditCopy('"examplebrand bargains"').length,1);
  assert.equal(auditCopy('No brand mentioned.').length,0);
});
