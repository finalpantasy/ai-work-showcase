import {pacing,newRun,preview,approve,execute,auditCopy} from './core.mjs';
const q=s=>document.querySelector(s);
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const pacingForm=q('#pacing-form');
function updatePacing() {
  const data=Object.fromEntries(['budget','spend','day','days'].map(k=>[k,pacingForm.elements[k].value.trim()===''?NaN:Number(pacingForm.elements[k].value)]));
  try {
    const p=pacing(data); q('#pace-error').hidden=true; q('#pace-output').hidden=false;
    q('#pace-status').textContent=p.status; q('#pace-status').dataset.state=p.status;
    q('#planned').textContent=money(p.planned); q('#projection').textContent=money(p.projection);
    q('#reference').textContent=p.reference===null?'Period ended':`${money(p.reference)} / day`;
    q('#pace-detail').textContent=`${money(data.spend)} spent vs ${money(p.planned)} planned through day ${data.day}. ${p.remainingDays} days remain.`;
    q('#pace-bar').style.transform=`scaleX(${Math.min(1,data.spend/data.budget)})`;
    q('#plan-marker').style.left=`${data.day/data.days*100}%`;
  } catch(e) {q('#pace-error').textContent=e.message; q('#pace-error').hidden=false; q('#pace-output').hidden=true;}
}
pacingForm.addEventListener('input',updatePacing);
pacingForm.addEventListener('submit',e=>{e.preventDefault();updatePacing();});
for(const b of document.querySelectorAll('[data-preset]')) b.addEventListener('click',()=>{
  pacingForm.elements.budget.value=30000; pacingForm.elements.day.value=12; pacingForm.elements.days.value=30;
  pacingForm.elements.spend.value={over:14500,on:12000,under:9000}[b.dataset.preset]; updatePacing();
});
updatePacing();

let run=newRun();
const actionNames={idle:'Build a preview',previewed:'Approve this change',approved:'Execute & verify',verified:'Verified',blocked:'Blocked',failed:'Verification failed'};
function drawRun() {
  q('#action-status').textContent=actionNames[run.phase];
  q('#action-status').dataset.state=run.phase;
  q('#observed-budget').textContent=money(run.budget);
  q('#action-step').textContent=actionNames[run.phase]; q('#action-step').disabled=['verified','blocked','failed'].includes(run.phase);
  q('#action-log').replaceChildren(...run.trail.map(line=>{const li=document.createElement('li');li.textContent=line;return li;}));
  q('#receipt').hidden=!run.receipt; q('#receipt').textContent=run.receipt||'';
}
q('#action-step').addEventListener('click',()=>{
  const now=Date.now();
  if(run.phase==='idle') run=preview(run,now);
  else if(run.phase==='previewed') run=approve(run,now);
  else if(run.phase==='approved') run=execute(run,run.scenario==='stale'?Math.max(now,run.snapshot.expires+1):now);
  drawRun();
});
function resetRun(){run=newRun(q('#scenario').value);drawRun();}
q('#scenario').addEventListener('change',resetRun);q('#action-reset').addEventListener('click',resetRun);drawRun();

function updateAudit() {
  const copy=q('#copy-input').value;
  const naive=auditCopy(copy,false); const calibrated=auditCopy(copy,true);
  q('#naive-count').textContent=String(naive.length);q('#calibrated-count').textContent=String(calibrated.length);
  q('#audit-summary').textContent=`${naive.length-calibrated.length} protected-reference warnings removed. ${calibrated.length} prose issue${calibrated.length===1?' remains':'s remain'}.`;
  q('#copy-issues').replaceChildren(...calibrated.map(issue=>{const li=document.createElement('li');li.textContent=`Character ${issue.start+1}: “${issue.text}”. ${issue.message}`;return li;}));
  if(!calibrated.length){const li=document.createElement('li');li.textContent='No spelling issues under the illustrated rule.';q('#copy-issues').append(li);}
}
q('#copy-input').addEventListener('input',updateAudit);updateAudit();
