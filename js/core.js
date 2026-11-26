/* Núcleo — estado, persistência, importação, confirmação e feedback */
(function(){'use strict';
const SAVE='dol-primeira-luz-v1'; const SETTINGS='dol-acessibilidade-v1';
const allowed=["flarim", "aqualin", "terron", "lavolvo", "cinerix", "nautyra", "coravela", "brontmus", "cristrix", "zephira", "auravio", "fulgarra", "faiscote", "petalume", "miralume", "nocira", "corvumbra", "velmora", "ignekar", "ocearco", "glacira", "granleon", "musgarg", "virandor", "aerogrif", "voltaris", "relampor", "lumifae", "florivela", "umbraxis"];
const elements = {
 fogo: 'Fogo', agua: 'Água', terra: 'Terra', ar: 'Ar',
 eletrico: 'Elétrico', fada: 'Fada', sombras: 'Sombras'
};
const catalogLimit = 20;
const byId=id=>document.getElementById(id);
function shortText(x,len=22){return String(x??'').replace(/[<>\u0000-\u001f]/g,'').trim().slice(0,len);}
function clamp(x,a,b){return Math.min(b,Math.max(a,Number(x)||0));}
function allowedTournament(t){return t&&['rookie','elemental','aurora','eclipse'].includes(t.id)&&Number.isInteger(t.round)&&t.round>=0&&t.round<=5;}
function searchKey(value) {
 return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}
function escapeHTML(value) {
 return String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
 })[character]);
}
function tutorData(input) {
 const name = shortText(input?.name, 22);
 const origin = shortText(input?.origin, 40);
 return name.length >= 2 && origin.length >= 2 ? {name, origin} : null;
}
function entryData(input) {
 const name = shortText(input?.name, 32);
 const lore = shortText(input?.lore, 280);
 const type = input?.type;
 return name.length >= 2 && lore.length >= 10 && Object.hasOwn(elements, type)
  ? {name, lore, type}
  : null;
}
function validCatalog(input) {
 if (input === undefined) return [];
 if (!Array.isArray(input) || input.length > catalogLimit) throw Error('Catálogo local inválido.');
 const ids = new Set();
 const names = new Set();
 return input.map(item => {
  const record = entryData(item);
  if (!record || typeof item.id !== 'string' || !/^local-[a-z0-9-]{6,28}$/.test(item.id) ||
      ids.has(item.id) || names.has(searchKey(record.name))) throw Error('Cadastro de Lenda inválido ou duplicado.');
  ids.add(item.id);
  names.add(searchKey(record.name));
  return {id: item.id, ...record};
 });
}
function validAdoptions(input, collection) {
 if (input === undefined) return [];
 if (!Array.isArray(input) || input.length > collection.length) throw Error('Histórico de adoções inválido.');
 const ids = new Set();
 return input.map(record => {
  const tutor = tutorData(record?.tutor);
  const name = shortText(record?.name, 32);
  const date = Number(record?.date);
  const companion = collection.find(c => c.uid === record?.uid);
  if (!companion || ids.has(record.uid) || !tutor || name.length < 2 ||
      !Object.hasOwn(elements, record.type) || !Number.isFinite(date) || date <= 0 ||
      date > 8640000000000000) throw Error('Cartão de adoção inválido ou duplicado.');
  ids.add(record.uid);
  return {
   uid: record.uid, tutor, name, type: record.type, date,
   dedication: shortText(record.dedication, 160), legacy: record.legacy === true
  };
 });
}
function adoptionRecord(companion, species, tutor, dedication = '', legacy = false) {
 return {
  uid: companion.uid, tutor: {...tutor}, name: species.name, type: species.type,
  date: Date.now(), dedication: shortText(dedication, 160), legacy
 };
}
function updateTutor(input) {
 const tutor = tutorData(input);
 if (!state || !tutor) return false;
 state.tutor = tutor;
 state.playerName = tutor.name;
 commit();
 return true;
}
function validState(x){
 if(!x||typeof x!=='object'||x.version!==1||!Array.isArray(x.collection)||!x.collection.length||x.collection.length>allowed.length+catalogLimit)throw Error('Arquivo não contém uma jornada válida de Dawn of Legends.');
 const catalog = validCatalog(x.catalog);
 const speciesIds = new Set([...allowed, ...catalog.map(entry => entry.id)]);
 const collection=x.collection.map(c=>{
  if(!c||!speciesIds.has(c.species)||typeof c.uid!=='string'||!/^[A-Za-z0-9-]{3,50}$/.test(c.uid))throw Error('Espécie ou registro inválido no arquivo.');
  return {uid:String(c.uid).slice(0,50),species:c.species,level:clamp(c.level,1,50),stage:Math.max(0,Math.min(c.level>=35?2:c.level>=18?1:0,Math.trunc(Number(c.stage)||0))),exp:clamp(c.exp,0,999),hp:clamp(c.hp,0,9999),energy:clamp(c.energy,0,999),bond:clamp(c.bond,0,100),wins:clamp(c.wins,0,99999)};
 });
 if(new Set(collection.map(c=>c.uid)).size!==collection.length||new Set(collection.map(c=>c.species)).size!==collection.length)throw Error('Existem Lendas duplicadas ou corrompidas no arquivo.');
 const tutor = tutorData(x.tutor);
 if (x.tutor != null && !tutor) throw Error('Cadastro de tutor inválido.');
 const adoptions = validAdoptions(x.adoptions, collection);
 const team=Array.isArray(x.team)?[...new Set(x.team.filter(id=>collection.some(c=>c.uid===id)))].slice(0,3):[collection[0].uid];
 const achievements=x.achievements&&typeof x.achievements==='object'?x.achievements:{};
 const stats=x.stats&&typeof x.stats==='object'?x.stats:{};
 const settings=x.settings&&typeof x.settings==='object'?x.settings:{};
 const tournament=x.tournament&&typeof x.tournament==='object'?x.tournament:{};const daily=x.daily&&typeof x.daily==='object'?x.daily:{};const today=new Date().toLocaleDateString('sv-SE');
 const date=daily.date===today?today:today;const same=daily.date===today;
 return {version:1,catalog,tutor,adoptions,playerName:tutor?.name||shortText(x.playerName,22)||'Guardião',createdAt:Number(x.createdAt)||Date.now(),updatedAt:Date.now(),coins:clamp(x.coins,0,999999),shards:clamp(x.shards,0,99999),diamonds:clamp(x.diamonds,0,99999),collection,team:team.length?team:[collection[0].uid],selectedId:collection.some(c=>c.uid===x.selectedId)?x.selectedId:collection[0].uid,achievements:{explores:clamp(achievements.explores,0,99999),lastExplore:clamp(achievements.lastExplore,0,Date.now()),firstVictory:!!achievements.firstVictory},daily:{date,explores:same?clamp(daily.explores,0,999):0,training:same?clamp(daily.training,0,999):0,wins:same?clamp(daily.wins,0,999):0,riftWins:same?clamp(daily.riftWins,0,3):0,claimed:same&&Array.isArray(daily.claimed)?daily.claimed.filter(v=>['explores','training','wins'].includes(v)):[]},tournament:{active:allowedTournament(tournament.active)?tournament.active:null,completed:Array.isArray(tournament.completed)?[...new Set(tournament.completed.filter(id=>['rookie','elemental','aurora','eclipse'].includes(id)))]:[],victories:clamp(tournament.victories,0,9999)},stats:{wins:clamp(stats.wins,0,99999),losses:clamp(stats.losses,0,99999),training:clamp(stats.training,0,99999),tournamentWins:clamp(stats.tournamentWins,0,9999)},settings:{reducedMotion:!!settings.reducedMotion,highContrast:!!settings.highContrast}};
}
let state=null, modalCallback=null, returnFocus=null, storageAvailable=true;
try{const raw=localStorage.getItem(SAVE);if(raw){state=validState(JSON.parse(raw));}}catch(e){console.warn('Falha ao carregar jornada',e);}
let prefs={reducedMotion:false,highContrast:false};try{const s=JSON.parse(localStorage.getItem(SETTINGS)||'null');if(s&&typeof s==='object')prefs={reducedMotion:!!s.reducedMotion,highContrast:!!s.highContrast};}catch(_){}
if(state)prefs={...state.settings};
function settingsApply(){document.body.classList.toggle('reduced-motion',prefs.reducedMotion);document.body.classList.toggle('high-contrast',prefs.highContrast);const m=byId('setting-reduced-motion'),c=byId('setting-high-contrast');if(m)m.checked=prefs.reducedMotion;if(c)c.checked=prefs.highContrast;}
function settingsUpdate(key,v){prefs[key]=!!v;if(state){state.settings={...prefs};commit();}try{localStorage.setItem(SETTINGS,JSON.stringify(prefs));}catch(_){}settingsApply();}
function commit(){if(!state)return false;state.updatedAt=Date.now();try{localStorage.setItem(SAVE,JSON.stringify(state));storageAvailable=true;const n=byId('save-status');if(n)n.textContent='Progresso salvo neste navegador';}catch(e){storageAvailable=false;const n=byId('save-status');if(n)n.textContent='Salvamento indisponível · exporte seu progresso';toast('O navegador bloqueou o salvamento local. Use Exportar progresso.',true);}window.dispatchEvent(new CustomEvent('dol:updated'));return storageAvailable;}
function createJourney(name,species){const now=Date.now();return validState({version:1,playerName:shortText(name,22)||'Guardião',createdAt:now,coins:250,shards:0,diamonds:0,collection:[{uid:`lenda-${species}-${now}`,species,level:5,stage:0,exp:0,hp:999,energy:999,bond:35,wins:0}],team:[`lenda-${species}-${now}`],selectedId:`lenda-${species}-${now}`,stats:{wins:0,losses:0,training:0},achievements:{explores:0,lastExplore:0,firstVictory:false},settings:{...prefs}});}
function setState(x){state=validState(x);prefs={...state.settings};settingsApply();commit();}
function removeState(){state=null;try{localStorage.removeItem(SAVE);}catch(e){}window.dispatchEvent(new CustomEvent('dol:updated'));}
function toast(message,error=false){const host=byId('toast-stack');if(!host)return;const n=document.createElement('div');n.className='toast'+(error?' error':'');n.setAttribute('role',error?'alert':'status');n.textContent=message;host.appendChild(n);while(host.children.length>3)host.firstElementChild.remove();setTimeout(()=>n.remove(),3200);}
function confirm(title,message,onYes,yesLabel='Confirmar'){
 const modal=byId('modal-backdrop');if(!modal)return;returnFocus=document.activeElement;byId('modal-title').textContent=title;byId('modal-message').textContent=message;byId('modal-confirm').textContent=yesLabel;modal.hidden=false;modalCallback=onYes;byId('modal-cancel').focus();
}
function closeModal(accept=false){const modal=byId('modal-backdrop');if(modal.hidden)return;modal.hidden=true;const fn=modalCallback;modalCallback=null;if(returnFocus&&returnFocus.isConnected&&returnFocus.offsetParent!==null)returnFocus.focus();returnFocus=null;if(accept&&typeof fn==='function')fn();}
function exportProgress(){if(!state){toast('Comece uma jornada antes de exportar.',true);return;}const file=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const link=document.createElement('a');const url=URL.createObjectURL(file);link.href=url;link.download=`dawn-of-legends-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Backup da jornada preparado para download.');}
function importFile(file,onComplete){if(!file)return;if(file.size>512*1024){toast('Arquivo muito grande para um progresso de Dawn of Legends.',true);return;}const r=new FileReader();r.onload=()=>{try{const x=validState(JSON.parse(r.result));confirm('Importar jornada?',`Isto substituirá a jornada atual pelo progresso de ${x.playerName}. Confirma?`,()=>{setState(x);toast('Jornada importada com sucesso.');onComplete?.();},'Importar');}catch(e){toast(`Falha na importação: ${e.message}`,true);}};r.onerror=()=>toast('Não foi possível ler o arquivo.',true);r.readAsText(file,'utf-8');}
function selected(){return state?.collection.find(c=>c.uid===state.selectedId)||state?.collection[0]||null;}
function byUid(uid){return state?.collection.find(c=>c.uid===uid)||null;}
function dailySync(){if(!state)return;const date=new Date().toLocaleDateString('sv-SE');if(state.daily.date!==date)state.daily={date,explores:0,training:0,wins:0,riftWins:0,claimed:[]};}
function recordDaily(key){if(!state)return;dailySync();if(['explores','training','wins','riftWins'].includes(key))state.daily[key]=Math.min(key==='riftWins'?3:999,(state.daily[key]||0)+1);}
const quests={explores:{goal:4,diamonds:5,title:'Explorar o Observatório 4 vezes'},training:{goal:3,diamonds:5,title:'Treinar suas Lendas 3 vezes'},wins:{goal:2,diamonds:8,title:'Vencer 2 batalhas normais'}};
function claimQuest(key){if(!state||!quests[key])return false;dailySync();if(state.daily.claimed.includes(key)||state.daily[key]<quests[key].goal)return false;state.daily.claimed.push(key);state.diamonds+=quests[key].diamonds;commit();return true;}
function transaction(coinsDelta,shardsDelta=0,diamondsDelta=0){if(!state)return false;if(state.coins+coinsDelta<0||state.shards+shardsDelta<0||state.diamonds+diamondsDelta<0)return false;state.coins=clamp(state.coins+coinsDelta,0,999999);state.shards=clamp(state.shards+shardsDelta,0,99999);state.diamonds=clamp(state.diamonds+diamondsDelta,0,99999);commit();return true;}
window.DOL={Core:{get state(){return state;},get prefs(){return {...prefs};},get storageAvailable(){return storageAvailable;},byId,shortText,clamp,searchKey,escapeHTML,elements,catalogLimit,tutorData,entryData,adoptionRecord,updateTutor,validState,createJourney,setState,removeState,commit,settingsApply,settingsUpdate,toast,confirm,closeModal,exportProgress,importFile,selected,byUid,transaction,dailySync,recordDaily,claimQuest,quests}};
})();
