// Original public exercise. All brands, assets, dates and numbers are invented.
export const channels=[
 {name:'Meta prospecting',beforeSpend:7500,beforeRevenue:21000,spend:7500,revenue:13000},
 {name:'Meta retargeting',beforeSpend:2500,beforeRevenue:11000,spend:2500,revenue:11000},
 {name:'Google',beforeSpend:5000,beforeRevenue:20000,spend:5000,revenue:20000}
];
export const ads=[
 {id:'detour',name:'Built for the detour',message:'Make a short walk feel worthwhile.',spend:640,orders:32,revenue:1600,age:'18 days',note:'Enough delivery to review. The message is a direction to test again, not a proven cause.'},
 {id:'packing',name:'A little less planning',message:'Make packing for a weekend walk feel easy.',spend:120,orders:2,revenue:100,age:'3 days',note:'Early delivery. Check the test plan and allow for uncertainty before judging the message.'}
];
export const terms=[
 {id:'jobs',query:'bottle factory jobs',spend:36,orders:0,note:'The person is looking for a job. This fictional shop sells bottles.',queue:'Wrong product'},
 {id:'table',query:'bottle shaped coffee table',spend:18,orders:0,note:'Furniture intent. Check the exact query; do not exclude the word bottle.',queue:'Wrong product'},
 {id:'lid',query:'water bottle replacement lid',spend:75,orders:0,note:'Related product. Check whether replacement lids are sold and review the landing page.',queue:'Needs a check'},
 {id:'hiking',query:'lightweight hiking water bottle',spend:120,orders:12,note:'Relevant demand with orders. Review economics before changing its coverage.',queue:'Relevant'},
 {id:'best',query:'best hiking water bottle',spend:90,orders:0,note:'Relevant intent. Zero orders in a small sample is not proof of poor demand.',queue:'Needs a check'}
];
export const plannerRows=[
 {name:'Weekend walk',primary1:'A little less planning. A little more outside.',primary2:'',primary3:'Take the small detour.',headline1:'Explore the bottle',headline2:'',headline3:'Pack for the weekend',destination:'https://juniper-supply.example/bottle',asset:'https://assets.juniper-supply.example/weekend.png'},
 {name:'Small detour',primary1:'Built for the detour.',primary2:'Bring the bottle along.',headline1:'Your next short walk',destination:'https://juniper-supply.example/bottle',asset:'https://assets.juniper-supply.example/detour.png'}
];
export function summarize(rows){
 for(const r of rows)for(const k of ['spend','revenue','beforeSpend','beforeRevenue'])if(!Number.isFinite(r[k])||r[k]<0)throw Error('Amounts must be finite and nonnegative.');
 const totals=rows.reduce((s,r)=>({spend:s.spend+r.spend,revenue:s.revenue+r.revenue,beforeSpend:s.beforeSpend+r.beforeSpend,beforeRevenue:s.beforeRevenue+r.beforeRevenue}),{spend:0,revenue:0,beforeSpend:0,beforeRevenue:0});
 return {...totals,return:totals.spend?totals.revenue/totals.spend:null,beforeReturn:totals.beforeSpend?totals.beforeRevenue/totals.beforeSpend:null,change:totals.revenue-totals.beforeRevenue};
}
function validUrl(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)&&!!u.hostname;}catch{return false;}}
export function numbered(row,prefix,max){return Array.from({length:max},(_,i)=>row[prefix+(i+1)]).filter(v=>typeof v==='string'&&v.trim()).map(v=>v.trim());}
export function mapPlanner(rows){
 if(!Array.isArray(rows)||!rows.length||rows.length>20)throw Error('Use between 1 and 20 planner rows.');
 return rows.map((r,i)=>{
  if(!r||typeof r!=='object'||typeof r.name!=='string'||!r.name.trim())throw Error(`Row ${i+1}: add an ad name.`);
  if(!validUrl(r.destination))throw Error(`Row ${i+1}: destination must be a complete http or https URL.`);
  if(!validUrl(r.asset))throw Error(`Row ${i+1}: asset must be a complete http or https URL.`);
  const primary=numbered(r,'primary',5),headline=numbered(r,'headline',10);
  if(!primary.length||!headline.length)throw Error(`Row ${i+1}: add primary text and a headline.`);
  return {name:r.name.trim(),primary,headline,destination:r.destination,asset:r.asset};
 });
}
export function csvCell(value){const text=String(value??'');return '"'+(/^[\s]*[=+\-@]/.test(text)?"'"+text:text).replaceAll('"','""')+'"';}
export function exportCsv(rows){
 const mapped=mapPlanner(rows);
 const headers=['Ad name',...Array.from({length:5},(_,i)=>'Primary text '+(i+1)),...Array.from({length:10},(_,i)=>'Headline '+(i+1)),'Destination URL','Asset URL'];
 return [headers,...mapped.map(r=>[r.name,...Array.from({length:5},(_,i)=>r.primary[i]??''),...Array.from({length:10},(_,i)=>r.headline[i]??''),r.destination,r.asset])].map(r=>r.map(csvCell).join(',')).join('\r\n')+'\r\n';
}
export function buildPreview(decisions){
 const items=terms.filter(t=>decisions[t.id]==='negative').map(t=>({query:t.query,match:'Exact',scope:'Fictional non-brand campaign'}));
 return {items,fingerprint:JSON.stringify(items)};
}
export function previewIsCurrent(preview,decisions){return !!preview&&preview.fingerprint===buildPreview(decisions).fingerprint;}
export const brief=`# Juniper Supply: two buying reasons\n\nFictional portfolio brief. No live client or campaign.\n\nAudience: people packing for a weekend walk.\nBuying moment: getting ready to leave.\nConcept A: easy preparation. “A little less planning. A little more outside.”\nConcept B: the pleasure of a small detour. “Built for the detour.”\nKeep the same: product, audience, format, offer and destination.\nProof available: the product and carry handle are visible in the generated sample image.\nClaims needing verification: insulation, leak resistance, durability. Do not use them.\nCall to action: Explore the bottle.\nReview: copy, crop, destination, claims and the actual launch preview.\nStatus: draft. No ad has been launched.\n`;
