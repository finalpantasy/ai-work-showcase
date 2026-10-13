import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const script=readFileSync(new URL('../assets/theme.js',import.meta.url),'utf8');
function browser({dark=false,saved=null,blocked=false}={}) {
  const listeners={},writes=[],attributes={};
  const label={textContent:''};
  const toggle={hidden:true,title:'',setAttribute:(key,value)=>attributes[key]=value,
    querySelector:()=>label,addEventListener:(event,fn)=>listeners['toggle:'+event]=fn};
  const system={matches:dark,addEventListener:(event,fn)=>listeners['system:'+event]=fn};
  const document={documentElement:{dataset:{}},querySelector:()=>toggle,
    addEventListener:(event,fn)=>listeners[event]=fn};
  const window={matchMedia:()=>system,addEventListener:(event,fn)=>listeners[event]=fn,
    localStorage:{getItem:key=>{if(blocked)throw Error('Unavailable');assert.equal(key,'showcase-theme');return saved},
      setItem:(key,value)=>{if(blocked)throw Error('Unavailable');writes.push([key,value])}}};
  runInNewContext(script,{window,document});
  return {document,listeners,toggle,system,writes,attributes,label};
}
test('applies system appearance before the page body is ready',()=>{
  const b=browser({dark:true});
  assert.equal(b.document.documentElement.dataset.theme,'dark');
  assert.equal(b.attributes['aria-checked'],'true');
  b.listeners.DOMContentLoaded();
  assert.equal(b.toggle.hidden,false);
});
test('saved appearance overrides the system; toggle saves only that choice',()=>{
  const b=browser({dark:true,saved:'light'});b.listeners.DOMContentLoaded();
  assert.equal(b.document.documentElement.dataset.theme,'light');
  b.listeners['toggle:click']();
  assert.deepEqual(b.writes,[['showcase-theme','dark']]);
  assert.equal(b.attributes['aria-checked'],'true');
  assert.equal(b.toggle.title,'Switch to light mode');
  assert.equal(b.label.textContent,'Dark');
  b.system.matches=false;b.listeners['system:change']();
  assert.equal(b.document.documentElement.dataset.theme,'dark');
});
test('toggle still works when storage is unavailable',()=>{
  const b=browser({blocked:true});b.listeners.DOMContentLoaded();
  b.listeners['toggle:click']();
  assert.equal(b.document.documentElement.dataset.theme,'dark');
  b.listeners['toggle:click']();
  assert.equal(b.document.documentElement.dataset.theme,'light');
});
test('invalid preferences use the system; another tab can update or clear the choice',()=>{
  const b=browser({saved:'other'});b.listeners.DOMContentLoaded();
  b.system.matches=true;b.listeners['system:change']();
  assert.equal(b.document.documentElement.dataset.theme,'dark');
  b.listeners.storage({key:'showcase-theme',newValue:'light'});
  assert.equal(b.document.documentElement.dataset.theme,'light');
  b.listeners.storage({key:'unrelated',newValue:'dark'});
  assert.equal(b.document.documentElement.dataset.theme,'light');
  b.listeners.storage({key:'showcase-theme',newValue:null});
  assert.equal(b.document.documentElement.dataset.theme,'dark');
});
