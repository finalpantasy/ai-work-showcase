import{channels,ads,terms,plannerRows,summarize,mapPlanner,exportCsv,buildPreview,previewIsCurrent,brief}from'./workspace-core.mjs';
const $=id=>document.getElementById(id),money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function selectView(moveFocus=false){
 const name=location.hash.slice(1)||'overview';
 const known=['overview','performance','creative','terms','mapper','brain'];
 const view=known.includes(name)?name:'overview';
 document.querySelectorAll('.bench-view').forEach(x=>x.hidden=x.id!==view);
 document.querySelectorAll('[data-view]').forEach(x=>{
  if(x.dataset.view===view)x.setAttribute('aria-current','page');
  else x.removeAttribute('aria-current');
 });
 if(moveFocus){
  const heading=document.querySelector('#'+view+' h2');
  heading?.setAttribute('tabindex','-1');
  heading?.focus({preventScroll:true});
 }
}
addEventListener('hashchange',()=>selectView(true));selectView();
function performance(){const mode=$('channel').value;const rows=channels.filter(r=>mode==='all'||(mode==='meta'?r.name.startsWith('Meta'):r.name==='Google'));const t=summarize(rows);$('channel-rows').innerHTML=rows.map(r=>`<tr><td>${escape(r.name)}</td><td>${money(r.beforeSpend)}</td><td>${money(r.beforeRevenue)}</td><td>${money(r.spend)}</td><td>${money(r.revenue)}</td></tr>`).join('');$('performance-result').innerHTML=`<div class="performance-summary"><p><strong>${t.change===0?'Revenue held steady.':`Revenue fell ${money(Math.abs(t.change))}.`}</strong> Spend ${t.spend===t.beforeSpend?'was unchanged at '+money(t.spend):'changed'}.</p><p>Return: ${t.beforeReturn.toFixed(2)} → ${t.return.toFixed(2)} dollars per ad dollar.</p><p class="caption">Invented platform-attributed revenue. Two equal seven-day periods.</p></div>`;}
$('channel').addEventListener('change',performance);performance();
$('ad-choices').innerHTML=ads.map(a=>`<button data-ad="${a.id}" aria-pressed="false">${escape(a.name)}</button>`).join('');
function chooseAd(id){const a=ads.find(x=>x.id===id);document.querySelectorAll('[data-ad]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ad===id)));$('ad-image-caption').textContent=id==='detour'?'AI-generated bottle ad for the sample brand.':'The image shows the detour ad. This second sample tests different copy.';$('ad-detail').innerHTML=`<h3>${escape(a.name)}</h3><p>${escape(a.message)}</p><dl><div><dt>Fictional spend</dt><dd>${money(a.spend)}</dd></div><div><dt>Fictional orders</dt><dd>${a.orders}</dd></div><div><dt>Return per ad dollar</dt><dd>${(a.revenue/a.spend).toFixed(2)}</dd></div><div><dt>Days running</dt><dd>${escape(a.age)}</dd></div></dl><p>${escape(a.note)}</p>`;}
$('ad-choices').addEventListener('click',e=>{const button=e.target.closest('[data-ad]');if(button)chooseAd(button.dataset.ad);});chooseAd('detour');
$('prepare-brief').addEventListener('click',()=>{$('brief-output').hidden=false;$('prepare-brief').textContent='Brief is ready to review';});
function download(content,type,name){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('download-brief').addEventListener('click',()=>download(brief,'text/markdown;charset=utf-8','fictional-creative-brief.md'));
let decisions={},preview=null;
function renderTerms(){ $('term-list').innerHTML=terms.map(t=>`<article class="term-row"><h3>${escape(t.query)}</h3><div class="term-data">${escape(t.queue)} · ${money(t.spend)} fictional spend · ${t.orders} orders</div><p>${escape(t.note)}</p><div class="decision-buttons" role="group" aria-label="Decision for ${escape(t.query)}">${[['keep','Keep this search'],['negative','Block this exact search']].map(([action,label])=>`<button data-term="${t.id}" data-decision="${action}" aria-pressed="${decisions[t.id]===action}">${label}</button>`).join('')}</div></article>`).join('');$('preview-terms').disabled=!buildPreview(decisions).items.length;}
$('term-list').addEventListener('click',e=>{const b=e.target.closest('[data-term]');if(!b)return;decisions[b.dataset.term]=b.dataset.decision;preview=null;$('term-preview').hidden=true;$('approve-preview').checked=false;$('finish-review').disabled=true;$('term-status').textContent='Selection updated. Check the new list before finishing the review.';const term=b.dataset.term,decision=b.dataset.decision;renderTerms();document.querySelector(`[data-term="${term}"][data-decision="${decision}"]`)?.focus();});renderTerms();
$('preview-terms').addEventListener('click',()=>{preview=buildPreview(decisions);$('term-preview').hidden=false;$('preview-items').innerHTML=preview.items.map(x=>`<p><strong>${escape(x.query)}</strong><br>${x.match} match · ${escape(x.scope)}</p>`).join('');$('approve-preview').checked=false;$('finish-review').disabled=true;$('term-status').textContent='Check the searches on this list and the campaign they would affect.';});
$('approve-preview').addEventListener('change',()=>{$('finish-review').disabled=!$('approve-preview').checked||!previewIsCurrent(preview,decisions);});
$('finish-review').addEventListener('click',()=>{if(!$('approve-preview').checked||!previewIsCurrent(preview,decisions))return;$('term-status').textContent='Review complete. Your selected searches are listed above. This example does not change an account.';$('finish-review').disabled=true;});
$('reset-terms').addEventListener('click',()=>{decisions={};preview=null;$('term-preview').hidden=true;$('approve-preview').checked=false;$('finish-review').disabled=true;$('term-status').textContent='Choose which searches to keep or block.';renderTerms();});
let checkedCsv=null;
function restorePlanner(){$('planner-input').value=JSON.stringify(plannerRows,null,2);checkedCsv=null;$('download-import').disabled=true;$('mapper-output').innerHTML='';$('mapper-status').textContent='Check the rows before downloading.';}
restorePlanner();
$('planner-input').addEventListener('input',()=>{checkedCsv=null;$('download-import').disabled=true;$('mapper-output').innerHTML='';$('mapper-status').textContent='Rows changed. Check them again before downloading.';});
$('check-import').addEventListener('click',()=>{try{const rows=JSON.parse($('planner-input').value),mapped=mapPlanner(rows);checkedCsv=exportCsv(rows);$('download-import').disabled=false;$('mapper-status').textContent=`${mapped.length} rows passed. Gaps between options removed; copy kept intact. Ready to download with sample links.`;$('mapper-output').innerHTML=mapped.map(r=>`<p><strong>${escape(r.name)}</strong><br>${r.primary.length} primary-text options · ${r.headline.length} headlines<br>${escape(r.destination)}</p>`).join('');}catch(e){checkedCsv=null;$('download-import').disabled=true;$('mapper-output').innerHTML='';$('mapper-status').textContent=e instanceof SyntaxError?'The rows are not valid JSON. Restore the sample or correct the brackets and quotes.':e.message;}});
$('download-import').addEventListener('click',()=>{if(checkedCsv)download(checkedCsv,'text/csv;charset=utf-8','fictional-ad-import.csv');});$('reset-import').addEventListener('click',restorePlanner);
$('source-reviewed').addEventListener('change',()=>{$('promote-knowledge').disabled=!$('source-reviewed').checked;});
$('promote-knowledge').addEventListener('click',()=>{if(!$('source-reviewed').checked)return;$('knowledge-state').textContent='Checked and ready to use in this example.';$('promote-knowledge').disabled=true;$('source-reviewed').disabled=true;$('knowledge-next').textContent='Use this note to guide the next report. Get current numbers from the account before writing it.';});
$('reset-knowledge').addEventListener('click',()=>{$('knowledge-state').textContent='Waiting for a check.';$('source-reviewed').disabled=false;$('source-reviewed').checked=false;$('promote-knowledge').disabled=true;$('knowledge-next').textContent='Keep the reporting preference. Use current account numbers when writing the next report.';});
