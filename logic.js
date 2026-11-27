// GENERATED from index.html by tools/build-logic.py. Do not edit by hand.
export function makeLogic(uid){
// ===== LOGIC START =====
const DAYMS=864e5;
const pad=n=>String(n).padStart(2,'0');
const DAYN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function isoOf(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function todayISO(){return isoOf(new Date());}
function parseISO(iso){const p=iso.split('-').map(Number);return new Date(Date.UTC(p[0],p[1]-1,p[2]));}
function fromUTC(dt){return dt.getUTCFullYear()+'-'+pad(dt.getUTCMonth()+1)+'-'+pad(dt.getUTCDate());}
function addDays(iso,n){return fromUTC(new Date(parseISO(iso).getTime()+n*DAYMS));}
function dowOf(iso){return parseISO(iso).getUTCDay();}
function mondayMs(iso){const dt=parseISO(iso);return dt.getTime()-((dt.getUTCDay()+6)%7)*DAYMS;}
function mondayISO(iso){return fromUTC(new Date(mondayMs(iso)));}
function fmtDate(iso){const d=parseISO(iso);return DAYN[d.getUTCDay()]+' '+d.getUTCDate()+' '+MONN[d.getUTCMonth()];}
function fmtShort(iso){const d=parseISO(iso);return d.getUTCDate()+' '+MONN[d.getUTCMonth()];}
function mins(t){if(!t)return null;const m=/^(\d{1,2}):(\d{2})$/.exec(t);return m?(+m[1])*60+(+m[2]):null;}
function hm(x){const n=((Math.round(x)%1440)+1440)%1440;return pad(Math.floor(n/60))+':'+pad(n%60);}

const AISLES=['Fruit & veg','Meat & fish','Dairy & eggs','Bakery','Tins & dry goods','Frozen','Sauces & spices','Drinks','Household','Other'];
const AISLE_WORDS=[
 ['Fruit & veg',['green bean','runner bean','bean sprout','sweet potato','spring onion','pak choi']],
 ['Household',['toilet roll','toilet paper','kitchen roll','loo roll','washing up','dishwasher','bin bag','tissues','sponge','bleach','detergent','toothpaste','shampoo','soap']],
 ['Frozen',['frozen','ice cream']],
 ['Tins & dry goods',['tin','tinned','can','canned','pasta','rice','noodle','flour','sugar','lentil','chickpea','bean','oat','couscous','quinoa','stock','passata','coconut milk','puree','breadcrumb','cereal','polenta','spaghetti','penne','fusilli','tagliatelle','lasagne','gnocchi','bulgur','cornflour','tortilla chip','nut','almond','cashew','raisin','dried']],
 ['Sauces & spices',['black pepper','chilli flake','salt','cumin','paprika','turmeric','oregano','cinnamon','curry','garam','masala','soy','vinegar','oil','mustard','ketchup','mayo','mayonnaise','sauce','honey','syrup','stock cube','spice','seasoning','pesto','harissa','tahini','miso','sriracha','worcestershire','bay leaf','nutmeg','cayenne','paste']],
 ['Meat & fish',['chicken','beef','pork','lamb','mince','bacon','sausage','ham','salmon','cod','prawn','tuna','fish','steak','turkey','chorizo','duck','haddock','fillet']],
 ['Dairy & eggs',['milk','cheese','butter','cream','yoghurt','yogurt','egg','mozzarella','parmesan','cheddar','feta','halloumi','creme fraiche','mascarpone','ricotta','paneer']],
 ['Bakery',['bread','bun','wrap','tortilla','pitta','pita','naan','bagel','roll','baguette','sourdough','brioche','muffin']],
 ['Fruit & veg',['onion','garlic','tomato','pepper','chilli','carrot','potato','courgette','aubergine','broccoli','spinach','lettuce','salad','cucumber','mushroom','lemon','lime','apple','banana','avocado','ginger','coriander','parsley','basil','mint','thyme','rosemary','leek','celery','cabbage','kale','pea','corn','squash','pumpkin','herb','berry','orange','beetroot','fennel','asparagus','shallot','radish','rocket','cauliflower','sprout','mango','pineapple','pear','peach','plum']],
 ['Drinks',['wine','beer','juice','water','coffee','tea','cola','soda']],
 ['Household',['foil','kitchen roll','washing','bin bag','cling','baking paper','bag']]
];
const AISLE_RX=AISLE_WORDS.map(function(a){return [a[0],a[1].map(function(w){return new RegExp('\\b'+w+'(e?s)?\\b');})];});
function guessAisle(name){const n=String(name||'').toLowerCase();for(const a of AISLE_RX){for(const rx of a[1]){if(rx.test(n))return a[0];}}return 'Other';}

const UNIT_MAP={g:'g',gram:'g',grams:'g',gr:'g',kg:'kg',kilo:'kg',kilos:'kg',kilogram:'kg',kilograms:'kg',ml:'ml',millilitre:'ml',millilitres:'ml',milliliter:'ml',milliliters:'ml',l:'l',litre:'l',litres:'l',liter:'l',liters:'l',tsp:'tsp',teaspoon:'tsp',teaspoons:'tsp',tbsp:'tbsp',tbs:'tbsp',tablespoon:'tbsp',tablespoons:'tbsp',cup:'cup',cups:'cup',oz:'oz',ounce:'oz',ounces:'oz',lb:'lb',lbs:'lb',pound:'lb',pounds:'lb',clove:'clove',cloves:'clove',tin:'tin',tins:'tin',can:'can',cans:'can',jar:'jar',jars:'jar',pinch:'pinch',bunch:'bunch',handful:'handful',slice:'slice',slices:'slice',pack:'pack',packet:'pack',sprig:'sprig',sprigs:'sprig',stick:'stick',sticks:'stick'};
const FR={'½':.5,'¼':.25,'¾':.75,'⅓':1/3,'⅔':2/3,'⅛':.125};
function numVal(t){
  t=t.trim();let tot=0,m;
  const f=t.match(/[½¼¾⅓⅔⅛]/);
  if(f){tot+=FR[f[0]];t=t.replace(f[0],'').trim();}
  if((m=/^(\d+)\s+(\d+)\/(\d+)$/.exec(t))){return tot+(+m[1])+(+m[2])/(+m[3]);}
  if((m=/^(\d+)\/(\d+)$/.exec(t))){return tot+(+m[1])/(+m[2]);}
  if(t==='')return tot;
  const n=parseFloat(t);return isNaN(n)?tot:tot+n;
}
function parseIng(line){
  let s=String(line||'').replace(/^[\s\-•*·\u2022]+/,'').trim();
  if(!s)return null;
  let q=null,u='';
  const m=s.match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?\s*[½¼¾⅓⅔⅛]?|[½¼¾⅓⅔⅛])(?:\s*(?:-|–|to)\s*(\d+(?:\.\d+)?))?\s*/);
  if(m){q=m[2]?Math.max(numVal(m[1]),parseFloat(m[2])):numVal(m[1]);s=s.slice(m[0].length);}
  const um=s.match(/^([A-Za-z]+)\.?(?=\s|$)/);
  if(q!=null&&um&&UNIT_MAP[um[1].toLowerCase()]){u=UNIT_MAP[um[1].toLowerCase()];s=s.slice(um[0].length).trim();}
  s=s.replace(/^of\s+/i,'');
  if(q!=null){
    if(u==='kg'){q*=1000;u='g';}else if(u==='l'){q*=1000;u='ml';}
    else if(u==='oz'){q*=28.35;u='g';}else if(u==='lb'){q*=453.6;u='g';}else if(u==='cup'){q*=240;u='ml';}
    if(u==='g'||u==='ml')q=Math.round(q);else q=Math.round(q*100)/100;
  }
  const ci=s.indexOf(',');
  const name=(ci>=0?s.slice(0,ci):s).trim();
  const note=ci>=0?s.slice(ci+1).trim():'';
  if(!name)return null;
  return {q:q,u:u,n:name,note:note,aisle:guessAisle(name)};
}
function nice(q){
  const r=Math.round(q*100)/100;const w=Math.floor(r+1e-9);const f=r-w;
  const sym=[[.5,'½'],[.25,'¼'],[.75,'¾'],[1/3,'⅓'],[2/3,'⅔']];
  for(const s of sym){if(Math.abs(f-s[0])<.02)return (w?String(w):'')+s[1];}
  return String(r);
}
const uk=function(u){return u==='can'?'tin':(u||'');};
const PLURAL_U={clove:1,tin:1,can:1,jar:1,pack:1,bunch:1,slice:1,sprig:1,stick:1};
function fmtQ(q,u){
  if(q==null)return '';
  if(u==='g'&&q>=1000)return (Math.round(q/10)/100)+' kg';
  if(u==='ml'&&q>=1000)return (Math.round(q/10)/100)+' l';
  if(!u)return nice(q);
  const lbl=PLURAL_U[u]&&q>1?(u==='bunch'?'bunches':u+'s'):u;
  return nice(q)+(u==='g'||u==='ml'?'':' ')+lbl;
}
function ingLine(i){return (i.q!=null?nice(i.q)+(i.u?' '+i.u:'')+' ':'')+i.n+(i.note?', '+i.note:'');}
function ingKey(n){
  let k=String(n||'').toLowerCase().replace(/\(.*?\)/g,'').replace(/[^a-z\s]/g,' ').replace(/\s+/g,' ').trim();
  k=k.replace(/\b(fresh|large|small|medium|ripe|chopped|diced|sliced|finely|roughly)\b/g,'').replace(/\s+/g,' ').trim();
  return k.split(' ').map(function(w){
    if(w.length>3&&/ies$/.test(w))return w.slice(0,-3)+'y';
    if(w.length>4&&/oes$/.test(w))return w.slice(0,-2);
    if(w.length>3&&/s$/.test(w)&&!/ss$/.test(w))return w.slice(0,-1);
    return w;}).join(' ');
}

const DEF={
  commute:30,dinnerTime:'18:30',cookBuffer:45,
  vAnchor:'2026-11-23',vAnchorType:'early',vDays:[1,2,3,4,5],
  vEarlyStart:'08:00',vEarlyEnd:'16:30',vLateStart:'11:30',vLateEnd:'20:00',vPacked:true,
  takeaway:true,jFactor:1.3,vFactor:1,jStore:'Sainsbury’s / Lidl / Aldi',vStore:'Tesco',jCommute:30,pickupLead:20,pickupOff:'15:00',pickupDefault:'julian',everyday:'Greek yoghurt, Sourdough, Eggs, Milk',
  staples:'salt, pepper, black pepper, olive oil, vegetable oil, oil, water',
  presets:[
    {id:'pls-fri-early',name:'PLS Friday early',match:'pls, premier league',days:[5],leave:'08:00',ret:'18:00',food:false,away:false},
    {id:'pls-fri-late',name:'PLS Friday late',match:'pls, premier league',days:[5],leave:'16:00',ret:'23:00',food:false,away:false},
    {id:'pls-sat',name:'PLS Saturday',match:'pls, premier league',days:[6],leave:'08:30',ret:'21:00',food:false,away:false},
    {id:'tnt',name:'TNT Sports',match:'tnt, ucl, uel, uecl, champions, europa, conference',days:[2,3,4],leave:'13:00',ret:'23:00',food:false,away:false},
    {id:'ob',name:'OB (overnight)',match:'ob',days:[],leave:'',ret:'',food:true,away:true}
  ]
};
function mergeSettings(doc){
  const s=JSON.parse(JSON.stringify(DEF));
  if(doc){for(const k in doc){if(doc[k]!==undefined&&doc[k]!==null)s[k]=doc[k];}}
  return s;
}

function jOf(S,iso){const sh=S.shifts[iso];return (sh&&sh.julian)?sh.julian:{state:'off'};}
function vOf(S,iso){
  const st=S.settings,sh=S.shifts[iso],ov=sh&&sh.viv;
  const early={state:'work',type:'early',start:st.vEarlyStart,end:st.vEarlyEnd};
  const late={state:'work',type:'late',start:st.vLateStart,end:st.vLateEnd};
  if(ov&&ov.type){
    if(ov.type==='early')return early;
    if(ov.type==='late')return late;
    if(ov.type==='custom')return {state:'work',type:'custom',start:ov.start,end:ov.end};
    if(ov.type==='away')return {state:'away',type:'away'};
    return {state:'off',type:ov.type};
  }
  const jh=sh&&sh.julian;
  if(jh&&jh.state==='off'&&/holiday/i.test(jh.title||''))return {state:'off',type:'holiday'};
  if(!(st.vDays||[]).includes(dowOf(iso)))return {state:'off',type:'off'};
  const wk=Math.round((mondayMs(iso)-mondayMs(st.vAnchor))/(7*DAYMS));
  const even=((wk%2)+2)%2===0;
  const anchorEarly=st.vAnchorType==='early';
  return (even?anchorEarly:!anchorEarly)?early:late;
}
function packedFlags(S,iso){
  const f=packedAuto(S,iso),o=(S.settings.lunchOv||{})[iso];
  if(o){if(typeof o.julian==='boolean')f.julian=o.julian;if(typeof o.viv==='boolean')f.viv=o.viv;}
  return f;
}
function packedAuto(S,iso){
  const J=jOf(S,iso),V=vOf(S,iso);
  return {
    julian:(function(){
      if(J.state!=='work'||J.food)return false;
      const l=mins(J.leave),r=mins(J.ret);
      // needs a packed meal only if out at lunchtime: leaves by 11:30 and not back before 13:00
      return l!=null&&l<=690&&(r==null||r<=l||r>=780);
    })(),
    viv:V.state==='work'&&!!S.settings.vPacked
  };
}
function dayInfo(S,iso){
  const st=S.settings,J=jOf(S,iso),V=vOf(S,iso);
  const jl=mins(J.leave),jr=mins(J.ret);
  const j={state:J.state||'off',leave:J.leave||'',ret:J.ret||'',food:!!J.food,title:J.title||'',retNext:false,needsTimes:false};
  let jHomeAt=0;
  if(j.state==='work'){
    if(jl==null&&jr==null){j.needsTimes=true;jHomeAt=22*60;}
    else if(jr==null){jHomeAt=22*60;}
    else{jHomeAt=(jl!=null&&jr<=jl)?jr+1440:jr;j.retNext=jHomeAt>=1440;}
  }
  const jAtDinner=j.state!=='away';
  const v={state:V.state,type:V.type,start:V.start||'',end:V.end||''};
  const vHomeAt=V.state==='work'?(mins(V.end)==null?17*60:mins(V.end))+st.commute:0;
  const pf=packedFlags(S,iso);
  let cook,cookAt;
  const vAtDinner=V.state!=='away';
  if(!jAtDinner&&!vAtDinner){cook='viv';cookAt=0;}
  else if(!jAtDinner){cook='viv';cookAt=vHomeAt;}
  else if(!vAtDinner){cook='julian';cookAt=jHomeAt;}
  else if(jHomeAt<vHomeAt){cook='julian';cookAt=jHomeAt;}
  else if(jHomeAt>vHomeAt){cook='viv';cookAt=vHomeAt;}
  else{cook='either';cookAt=vHomeAt;}
  const base=mins(st.dinnerTime)||1110;
  let dinnerAt=cookAt<=0?base:Math.max(cookAt+st.cookBuffer,base);
  dinnerAt=Math.ceil(dinnerAt/15)*15;
  const eaters=(vAtDinner?['viv']:[]).concat(jAtDinner?['julian']:[]);
  const nx=packedFlags(S,addDays(iso,1));
  const packedTomorrow=[];
  if(nx.viv&&vAtDinner)packedTomorrow.push('viv');
  if(nx.julian&&jAtDinner)packedTomorrow.push('julian');
  const nl=S.plan[addDays(iso,1)];
  if(nl&&nl.lunch&&nl.lunch.kind==='recipe'&&nl.lunch.rid)packedTomorrow.length=0; // tomorrow's lunch has its own recipe
  const nxJulianLost=nx.julian&&!jAtDinner;
  const portions=eaters.length+packedTomorrow.length;
  const jLate=jAtDinner&&j.state==='work'?(jHomeAt>dinnerAt+60?jHomeAt:0):0;
  const busy=(vHomeAt>=20*60&&jAtDinner&&jHomeAt>=21*60)?(vHomeAt+jHomeAt):0;
  return {iso:iso,j:j,v:v,jHomeAt:jHomeAt,vHomeAt:vHomeAt,cook:cook,dinnerAt:dinnerAt,eaters:eaters,packedToday:pf,packedTomorrow:packedTomorrow,nxJulianLost:nxJulianLost,portions:portions,jLate:jLate,busy:busy};
}
function takeawaySuggestion(S,iso,from){
  if(!S.settings.takeaway)return null;
  const mon=mondayISO(iso);let best=null,score=0;
  for(let i=0;i<7;i++){
    const d=addDays(mon,i),p=S.plan[d];
    if(p&&p.kind==='takeaway')return null;
    if(from&&d<from)continue;
    const inf=dayInfo(S,d);
    let sc=inf.busy;
    if(!sc&&inf.j.state==='work'&&inf.v.state==='work'){if(Math.min(inf.jHomeAt,inf.vHomeAt)>=1110)sc=inf.jHomeAt+inf.vHomeAt;}
    if(sc>score){score=sc;best=d;}
  }
  if(!best)return null;
  const p=S.plan[best];
  if(p&&p.kind)return null;
  return best;
}
function dinnerCovers(S,iso){
  const p=S.plan[iso];
  if(!p||!p.kind)return 'none';
  return p.kind==='recipe'?'recipe':'nocook';
}

function isStaple(name,staples){
  if(/\b(peppers|(red|green|yellow|orange|bell|sweet|roasted|jalapeno|chilli) pepper|water chestnuts?)\b/i.test(String(name||'')))return false;
  const k=ingKey(name);
  return String(staples||'').split(',').map(function(x){return ingKey(x);}).filter(Boolean).some(function(s){
    return k===s||new RegExp('\\b'+s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b').test(k);});
}
// ---- Pickup reminder: what's missing for tonight (and tomorrow), who picks it up, and when ----
function fmtMin(m){m=Math.max(0,Math.round(m));return String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
function pickupPlan(S,today,nowMin){
  const st=S.settings||{},tomorrow=addDays(today,1);
  const flat=function(d){const o={};d.aisles.forEach(function(a){a.items.forEach(function(i){o[i.key]=i;});});return o;};
  const tonightHas=mealsOn(S,today).length>0;
  const A=flat(buildShopping(S,[today])),B=flat(buildShopping(S,[today,tomorrow]));
  const info=dayInfo(S,today);
  const items=[];
  const hideTonight=nowMin!=null&&info.dinnerAt&&nowMin>info.dinnerAt;
  Object.keys(A).forEach(function(k){if(!hideTonight)items.push({name:A[k].name,q:B[k]&&B[k].q!=null?B[k].q:A[k].q,u:A[k].u,when:'tonight'});}); // buy enough for both nights in one go
  Object.keys(B).forEach(function(k){if(!A[k])items.push({name:B[k].name,q:B[k].q,u:B[k].u,when:'tomorrow'});});
  const out={items:items,who:null,at:null,store:'',skip:''};
  if(!items.length)return out;
  let who=info.cook;if(who!=='julian'&&who!=='viv')who=st.pickupDefault==='viv'?'viv':'julian';
  out.who=who;out.store=(who==='viv'?st.vStore:st.jStore)||'';
  const lead=Number(st.pickupLead)>=0?Number(st.pickupLead):20,sh=who==='viv'?vOf(S,today):jOf(S,today);
  let leaveWork=null;
  if(who==='viv'&&sh.state==='work')leaveWork=(mins(sh.end)==null?17*60:mins(sh.end));
  else if(who==='julian'&&sh.state==='work'&&info.jHomeAt)leaveWork=info.jHomeAt-(Number(st.jCommute)>=0?Number(st.jCommute):30);
  if(leaveWork!=null){
    if(leaveWork>=21*60+30){out.skip='late';return out;}
    out.at=Math.max(7*60,leaveWork-lead);
  }else out.at=mins(st.pickupOff)==null?15*60:mins(st.pickupOff);
  return out;
}
function pickupText(P,names){
  const nm=function(i){return i.name+(i.q!=null?' ('+fmtQ(i.q,i.u)+')':'');};
  const t=P.items.filter(function(i){return i.when==='tonight';}).map(nm),n=P.items.filter(function(i){return i.when==='tomorrow';}).map(nm);
  let s='';
  if(t.length)s+='Tonight: '+t.join(', ')+'. ';
  if(n.length)s+='For tomorrow: '+n.join(', ')+'. ';
  return s.trim();
}
function mealWeight(S,iso,slot){
  const st=S.settings||{},jf=Number(st.jFactor)>0?Number(st.jFactor):1.3,vf=Number(st.vFactor)>0?Number(st.vFactor):1;
  const avg=(jf+vf)/2;
  if(slot==='lunch')return avg;
  const inf=dayInfo(S,iso),who=inf.eaters.concat(inf.packedTomorrow);
  if(!who.length)return avg;
  return who.reduce(function(n,w){return n+(w==='julian'?jf:vf);},0)/who.length;
}
function mealsOn(S,iso){
  const p=S.plan[iso],out=[];
  if(!p)return out;
  if(p.kind==='recipe'&&p.rid){
    const info=dayInfo(S,iso);
    out.push({key:iso+':'+p.rid,slot:'dinner',date:iso,rid:p.rid,portions:(p.portions!=null&&p.portions!=='')?p.portions:info.portions});
  }
  if(p.lunch&&p.lunch.kind==='recipe'&&p.lunch.rid)out.push({key:'L'+iso+':'+p.lunch.rid,slot:'lunch',date:iso,rid:p.lunch.rid,portions:(p.lunch.portions!=null&&p.lunch.portions!=='')?p.lunch.portions:2});
  return out;
}
function buildShopping(S,dates){
  const map=new Map(),spd=(S.shop&&S.shop.shopped)||{};
  for(const iso of dates){
   for(const m of mealsOn(S,iso)){
    const pl=S.plan[iso]||{},cd=m.slot==='lunch'?(pl.lunch&&pl.lunch.cooked):pl.cooked;
    if(cd)continue; // cooked meals already came out of the fridge
    const r=S.recipes[m.rid];if(!r)continue;
    const portions=m.portions;
    const f=portions*mealWeight(S,iso,m.slot)/(r.servings||2);
    for(const ing of (r.ingredients||[])){
      const key=ingKey(ing.n)+'|'+uk(ing.u);
      let it=map.get(key);
      if(!it){it={key:key,name:ing.n,u:ing.u||'',q:null,aisle:ing.aisle||guessAisle(ing.n),from:[]};map.set(key,it);}
      if(ing.q!=null)it.q=(it.q||0)+ing.q*f;
      if(it.from.indexOf(r.name)<0)it.from.push(r.name);
    }
   }
  }
  const out={},staples=[];
  // what's already at home (fridge + pantry) comes off the list; shared pool so two lines can't use the same stock twice
  const pool=((S.fridge&&S.fridge.items)||[]).filter(function(f){return f.q!=null&&f.q>0;}).map(function(f){return {name:f.name,u:uk(f.u),q:f.q};});
  // an item with no amount (everyday items) only counts as at home for 5 days after it was bought
  const tdy=todayISO(),homeAll=((S.fridge&&S.fridge.items)||[]).filter(function(f){return f.q!=null?f.q>0:!!(f.added&&f.added>=addDays(tdy,-5));});
  const eq=(S.settings&&S.settings.unitEq)||{},sure=(S.shop&&S.shop.sure)||{},unsure=[];
  map.forEach(function(it){
    const stp=isStaple(it.name,S.settings.staples);
    // no amount on one side (everyday items): having the item at all counts as covered
    if(!stp&&homeAll.some(function(f){return (it.q==null||f.q==null)&&nameMatch(f.name,it.name)>0;})){it.have=1;it.covered=true;return;}
    if(it.q!=null&&!stp){
      const orig=it.q,dd=drawDown(pool,it.name,it.u,it.q,eq),rem=dd.rem,maybe=dd.maybe;
      if(rem>1e-9&&maybe&&sure[it.key]!=='no'){
        unsure.push({key:it.key,name:it.name,need:roundNeed(rem,it.u),u:it.u,haveQ:maybe.q,haveU:maybe.u,haveName:maybe.name});
        return;
      }
      if(rem<orig-1e-9){it.have=(it.have||0)+(orig-rem);it.q=rem;if(rem<orig*0.05)it.q=0;}
    }
    if(it.q!=null&&it.have&&(it.u==='g'||it.u==='ml')&&it.q<10)it.q=0;
    const pk=it.q>0?packFor(it.name,it.u):null;
    if(pk){it.need=it.q;it.pack=pk;it.q=Math.ceil(it.q/pk-1e-9)*pk;}
    else if(it.q!=null){
      it.q=roundNeed(it.q,it.u);
    }
    if(isStaple(it.name,S.settings.staples)){staples.push(it);return;}
    if(it.q!=null&&it.have&&!(it.q>0))return;
    const a=AISLES.indexOf(it.aisle)>=0?it.aisle:'Other';
    (out[a]=out[a]||[]).push(it);
  });
  const aisles=AISLES.filter(function(a){return out[a];}).map(function(a){return {aisle:a,items:out[a].sort(function(x,y){return x.name.localeCompare(y.name);})};});
  return {aisles:aisles,staples:staples.sort(function(x,y){return x.name.localeCompare(y.name);}),unsure:unsure};
}

function icsDate(v){
  const m=/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/.exec(v);
  if(!m)return null;
  if(m[7]){
    const dt=new Date(Date.UTC(+m[1],+m[2]-1,+m[3],+m[4],+m[5],+(m[6]||0)));
    const parts={};
    new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(dt).forEach(function(p){parts[p.type]=p.value;});
    return {date:parts.year+'-'+parts.month+'-'+parts.day,time:parts.hour+':'+parts.minute};
  }
  return {date:m[1]+'-'+m[2]+'-'+m[3],time:m[4]?m[4]+':'+m[5]:null};
}
function parseICS(text){
  const lines=String(text).replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n').replace(/\n[ \t]/g,'').split('\n').map(function(l){return l.trim();});
  const evs=[];let cur=null;
  for(const ln of lines){
    if(/^BEGIN:VEVENT$/i.test(ln)){cur={};continue;}
    if(/^END:VEVENT$/i.test(ln)){if(cur)evs.push(cur);cur=null;continue;}
    if(!cur)continue;
    const i=ln.indexOf(':');if(i<0)continue;
    const name=ln.slice(0,i).split(';')[0].toUpperCase(),val=ln.slice(i+1).trim();
    if(name==='SUMMARY')cur.title=val.replace(/\\,/g,',').replace(/\\n/g,' ').replace(/\\;/g,';');
    else if(name==='DTSTART')cur.s=val;
    else if(name==='DTEND')cur.e=val;
    else if(name==='STATUS')cur.status=val;
  }
  const byDate={};
  for(const ev of evs){
    if(!ev.s||ev.status==='CANCELLED')continue;
    const sd=icsDate(ev.s);if(!sd)continue;
    const ed=ev.e?icsDate(ev.e):null;
    let last=sd.date;
    if(ed){
      if(!sd.time&&!ed.time)last=addDays(ed.date,-1);
      else last=(ed.time==='00:00')?addDays(ed.date,-1):ed.date;
    }
    if(last<sd.date)last=sd.date;
    let d=sd.date,n=0;
    while(d<=last&&n<60){
      const o=byDate[d]||(byDate[d]={date:d,titles:[]});
      if(ev.title&&o.titles.indexOf(ev.title)<0)o.titles.push(ev.title);
      d=addDays(d,1);n++;
    }
  }
  return Object.keys(byDate).sort().map(function(k){return {date:k,title:byDate[k].titles.join(' / ')};});
}
function diagnose(t){
  const s=String(t||'').trim();
  if(!s)return 'The file or box was empty.';
  if(/^(https?:|webcal:)/i.test(s)&&s.indexOf('\n')<0)return 'That is the calendar link, not its contents. Open the link in a browser, then copy all the text it shows, or save the file it downloads.';
  if(/<html|<!doctype/i.test(s.slice(0,300)))return 'That looks like a web page, not a calendar. Open the link in a browser and copy the calendar text instead.';
  if(!/BEGIN:VCALENDAR/i.test(s))return 'This doesn’t look like calendar data. It should start with BEGIN:VCALENDAR. What I received starts with: '+s.slice(0,80);
  const n=(s.match(/BEGIN:VEVENT/gi)||[]).length;
  if(!n)return 'The calendar is valid but has no events in it ('+s.length+' characters read). The schedule may be empty right now.';
  return 'Found '+n+' events but couldn’t read their dates. Send the first few lines to Claude so the reader can be fixed.';
}
function presetCandidates(title,dow,presets){
  const t=String(title||'').toLowerCase();
  const kw=presets.filter(function(p){
    return String(p.match||'').split(',').map(function(s){return s.trim().toLowerCase();}).filter(Boolean).some(function(k){
      return new RegExp('(^|[^a-z0-9])'+k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^a-z0-9]|$)').test(t);});
  });
  const pool=kw.length?kw:presets;
  const byDay=pool.filter(function(p){return !p.days||!p.days.length||p.days.indexOf(dow)>=0;});
  return {cands:byDay.length?byDay:pool,matched:kw.length>0};
}
function julianFromPreset(p,title){
  return {state:p.away?'away':'work',leave:p.leave||'',ret:p.ret||'',food:!!p.food,title:title||'',preset:p.id};
}
// Built-in shift presets (kept in code on purpose, no editor)
function builtinPreset(titleOf,iso,dowOf_){
  const t=String(titleOf(iso)||'').toLowerCase();
  if(!t)return null;
  const dow=dowOf_(iso);
  const prev=String(titleOf(addDays(iso,-1))||'').toLowerCase();
  const next=String(titleOf(addDays(iso,1))||'').toLowerCase();
  if(/^\s*standby\s*$/.test(t))return {state:'off',leave:'',ret:'',food:false};
  const tntLike=/(^|[^a-z0-9])(tnt|ucl|uel|uecl|europa|champions|conference)([^a-z0-9]|$)/.test(t);
  if(/amazon/.test(t)){
    const first=!/amazon/.test(prev),last=!/amazon/.test(next);
    if(last&&!first){
      if(tntLike&&[2,3,4].indexOf(dow)>=0)return {state:'work',leave:'13:00',ret:'23:00',food:true};
      return {state:'work',leave:'',ret:'18:00',food:true};
    }
    if(first&&last)return {state:'work',leave:'',ret:'',food:true};
    return {state:'away',leave:'',ret:'',food:true};
  }
  if(/ufc/.test(t)){
    if(/ufc/.test(prev))return {state:'work',leave:'07:00',ret:'18:00',food:false};
    return {state:'work',leave:'14:00',ret:'17:00',food:false};
  }
  if(/(^|[^a-z0-9])pls([^a-z0-9]|$)|premier league/.test(t)){
    if(dow===6)return {state:'work',leave:'08:30',ret:'21:00',food:false};
    if([2,3,4].indexOf(dow)>=0)return {state:'work',leave:'16:00',ret:'23:00',food:false};
    return null;
  }
  if(tntLike&&[2,3,4].indexOf(dow)>=0)return {state:'work',leave:'13:00',ret:'23:00',food:false};
  if(/fa cup|(^|[^a-z0-9])ob([^a-z0-9]|$)/.test(t))return {state:'work',leave:'',ret:'',food:true};
  return null;
}
// ---- fridge ----
const SHELF={'Fruit & veg':7,'Meat & fish':3,'Dairy & eggs':7,'Bakery':4,'Frozen':90,'Tins & dry goods':365,'Sauces & spices':180,'Drinks':90,'Household':0,'Other':30};
const LONGLIFE={'Frozen':1,'Tins & dry goods':1,'Sauces & spices':1,'Drinks':1,'Household':1};
const USEBY=[
 [/\b(salmon|cod|haddock|sea ?bass|bass|prawn|fish|trout|mackerel|scallop|squid)/,2],
 [/\b(mince|chicken|turkey|beef|steak|pork|lamb|duck|fillet|meatball)/,3],
 [/\b(sausage|chorizo)/,5],[/\bbacon|\bham\b/,7],[/\bmilk\b/,5],[/yoghurt|yogurt|cream\b|creme/,7],[/\begg/,21],[/\bbutter\b/,28],
 [/cheese|cheddar|parmesan|mozzarella|feta|halloumi/,14],
 [/parsley|coriander|basil|mint|dill|chive|thyme|rosemary|herb/,5],
 [/lettuce|spinach|salad|rocket|watercress|kale|pak choi/,4],[/mushroom/,5],[/avocado|banana|berry|berries|strawberr|raspberr/,4],
 [/tomato/,6],[/asparagus|green bean|\bpeas?\b|sweetcorn/,4],[/cucumber|pepper|courgette|aubergine|broccoli|cauliflower|celery|leek/,8],
 [/carrot|cabbage|beetroot|parsnip|swede|turnip/,14],[/potato|onion|squash|pumpkin|apple|lemon|lime|orange/,21],[/garlic|ginger/,30],[/kimchi/,60]
];
function useByGuess(name,aisle,from){
  const a=aisle||guessAisle(name),n=String(name||'').toLowerCase();
  let d=null;
  if(!LONGLIFE[a]){for(const k of USEBY){if(k[0].test(n)){d=k[1];break;}}}
  if(d==null)d=SHELF[a]!=null?SHELF[a]:30;
  return d?addDays(from,d):null;
}
const PANTRYISH=/\b(onions?|shallots?|potato(es)?|garlic|squash|pumpkin|bananas?|bread|loaf|buns?|brioche|bagels?|sourdough|eggs?)\b/i;
function locOf(i){
  if(i.loc==='fridge'||i.loc==='pantry')return i.loc;
  const n=String(i.name||'');
  if(/spring onion|green onion/i.test(n))return 'fridge';
  if(PANTRYISH.test(n))return 'pantry';
  return LONGLIFE[i.aisle]&&i.aisle!=='Frozen'?'pantry':'fridge';
}
// One line per item: adding something already in stock never creates a second line.
function addFridgeItems(items,recs,sum){
  const out=items.slice(),res={added:0,merged:0,skipped:[]};
  recs.forEach(function(r){
    const i=out.findIndex(function(f){return nameMatch(f.name,r.name)===2;});
    if(i<0){out.push(r);res.added++;return;}
    const f=out[i];
    if(sum&&f.q!=null&&r.q!=null&&uk(f.u)===uk(r.u)){out[i]=Object.assign({},f,{q:Math.round((f.q+r.q)*100)/100,added:r.added,use:r.use||f.use,est:!!(f.est||r.est)});res.merged++;}
    else if(sum&&(f.q==null||r.q==null)){out[i]=Object.assign({},f,{added:r.added,use:r.use||f.use});res.merged++;}
    else res.skipped.push(r.name);
  });
  return {items:out,added:res.added,merged:res.merged,skipped:res.skipped};
}
const SYN={yogurt:'yoghurt',yoghourt:'yoghurt',zucchini:'courgette',eggplant:'aubergine',cilantro:'coriander',scallion:'spring onion',scallions:'spring onion'};
function fridgeSearch(items,q){
  const toks=String(q||'').toLowerCase().split(/[^a-z]+/).filter(Boolean).map(function(t){return SYN[t]||t;});
  if(!toks.length)return [];
  return items.filter(function(i){
    const n=String(i.name||'').toLowerCase();
    return toks.every(function(t){return n.indexOf(t)>=0||(t.length>3&&t.slice(-1)==='s'&&n.indexOf(t.slice(0,-1))>=0)||(t.length>3&&t.slice(-2)==='es'&&n.indexOf(t.slice(0,-2))>=0);});
  }).sort(function(a,b){
    const t=toks[0],x=String(a.name).toLowerCase().indexOf(t)===0?0:1,y=String(b.name).toLowerCase().indexOf(t)===0?0:1;
    return x-y||String(a.name).localeCompare(String(b.name));
  });
}
function fridgeDedupe(items){
  const out=[];
  items.forEach(function(it){
    const j=out.findIndex(function(f){return nameMatch(f.name,it.name)===2;});
    if(j<0){out.push(it);return;}
    const f=out[j];
    let m=f;
    if(f.q!=null&&it.q!=null&&uk(f.u)===uk(it.u))m=Object.assign({},f,{q:Math.round((f.q+it.q)*100)/100});
    else if(f.q==null&&it.q!=null)m=Object.assign({},f,{q:it.q,u:it.u||''});
    if(locOf(f)!==locOf(it))m=Object.assign({},m,{loc:locOf({name:m.name,aisle:m.aisle})});
    out[j]=m;
  });
  return out;
}
// Grams per one unit, per ingredient (cross-type conversions: count/can/jar/clove/tbsp -> grams). ml is treated as g for the rest.
const UNITG=[
  [/\bgarlic\b/,{clove:5,'':50}],
  [/\b(chopped|plum|tinned|canned) tomatoes\b/,{can:400}],[/\bcoconut milk\b/,{can:400}],[/\bbaked beans\b/,{can:400}],
  [/\b(chickpeas|kidney beans|black beans|cannellini beans|butter beans|borlotti beans)\b/,{can:400}],[/\btuna\b/,{can:145}],[/\bsweetcorn\b/,{can:160}],
  [/\bcapers\b/,{jar:100,tbsp:10,tsp:3.5}],[/\bpesto\b/,{jar:190}],[/\bolives\b/,{jar:230,can:150}],[/\b(jam|chutney|pickle)\b/,{jar:340}],
  [/\bsweet potato(es)?\b/,{'':250}],[/\bspring onions?\b/,{'':15,bunch:100}],[/\bshallots?\b/,{'':40}],[/\bonions?\b/,{'':150}],[/\bpotato(es)?\b/,{'':200}],
  [/\bcarrots?\b/,{'':80}],[/\bcourgettes?\b/,{'':200}],[/\baubergines?\b/,{'':250}],[/\bpeppers?\b/,{'':150}],[/\btomato(es)?\b/,{'':100}],
  [/\bcucumbers?\b/,{'':300}],[/\bleeks?\b/,{'':150}],[/\blemons?\b/,{'':60}],[/\blimes?\b/,{'':45}],[/\bavocados?\b/,{'':150}],[/\bbananas?\b/,{'':120}],[/\bapples?\b/,{'':150}],
  [/\beggs?\b/,{'':55}],[/\bchicken breasts?\b/,{'':170}],[/\bchicken thighs?\b/,{'':110}],[/\b(salmon|cod|haddock|seabass|sea bass) fillets?\b/,{'':120}],[/\bsausages?\b/,{'':60}],
  [/\b(bacon|rashers?)\b/,{slice:25,'':25}],[/\bbread\b/,{slice:35}],[/\bbutter\b/,{tbsp:14,tsp:5}],[/\bflour\b/,{tbsp:8,cup:125}],[/\bsugar\b/,{tbsp:12,cup:200}],
  [/\brice\b/,{cup:185}],[/\boats\b/,{cup:90}],[/\bhoney\b/,{tbsp:21}]
];
const UF={g:1,kg:1000,oz:28.35,lb:453.6,ml:1,l:1000,tsp:5,tbsp:15,cup:240};
function unitG(name,u){
  const n=String(name||'').toLowerCase(),uu=u==='tin'?'can':(u||'');
  for(const t of UNITG){if(t[0].test(n)&&t[1][uu]!=null)return t[1][uu];}
  if(UF[uu]!=null)return UF[uu];
  if(uu==='pack'){for(const p of PACKS){if(p[0].test(n))return (p[2]==='g'||p[2]==='ml')?p[1]:null;}}
  return null;
}
// Standard shop pack sizes: [name pattern, size, unit]. Shopping rounds UP to whole packs; stock is consumed by recipe amounts.
const PACKS=[
  [/\b(parmesan|pecorino|grana padano)\b/,150,'g'],[/\b(soft cheese|cream cheese|philadelphia)\b/,250,'g'],[/\bcottage cheese\b/,300,'g'],
  [/\bcheddar\b/,200,'g'],[/\bfeta\b/,200,'g'],[/\bhalloumi\b/,225,'g'],[/\bmozzarella\b/,125,'g'],[/\bmascarpone\b/,250,'g'],[/\bricotta\b/,250,'g'],
  [/\bbutter\b/,250,'g'],[/\b(double |single )?cream\b/,300,'ml'],[/\bcreme fraiche\b/,300,'g'],[/\b(greek )?yoghurt\b/,500,'g'],
  [/\b(beef )?mince\b/,500,'g'],[/\bchicken (breast|thigh)s?\b/,600,'g'],[/\b(bacon|lardons|pancetta)\b/,200,'g'],[/\bprawns?\b/,200,'g'],[/\bchorizo\b/,225,'g'],
  [/\b(salmon|cod|haddock|seabass|sea bass) fillets?\b/,2,''],[/\bsteaks?\b/,2,''],[/\bsausages?\b/,6,''],
  [/\bspinach\b/,200,'g'],[/\bmushrooms?\b/,250,'g'],[/\bcherry tomatoes\b/,250,'g'],[/\bkale\b/,200,'g'],
  [/\b(spaghetti|linguine|penne|fusilli|tagliatelle|rigatoni|pasta|orzo|couscous|lentils?)\b/,500,'g'],
  [/\b(basmati|jasmine|long grain)?\s*rice\b/,1000,'g'],[/\bnoodles\b/,300,'g'],[/\bflour\b/,1500,'g'],[/\bsugar\b/,1000,'g'],[/\boats\b/,1000,'g']
];
function roundNeed(q,u){
  if(u==='g'||u==='ml')return q>=50?Math.round(q/5)*5:Math.round(q);
  if(!u||PLURAL_U[u])return Math.ceil(q-1e-9);
  return Math.ceil(q*2-1e-9)/2;
}
function packFor(name,u){
  const n=String(name||'').toLowerCase(),uu=uk(u);
  for(const p of PACKS){if(p[0].test(n))return p[2]===uu?p[1]:null;}
  return null;
}
// Educated guess when an item has no amount: one standard pack if we know it, else one can / jar / pack.
function guessAmount(name,aisle){
  const n=String(name||'').toLowerCase();
  for(const p of PACKS){if(p[0].test(n))return {q:p[1],u:p[2]};}
  if(/\b(tinned|canned|chopped tomatoes|plum tomatoes|baked beans|chickpeas|kidney beans|coconut milk|sweetcorn)\b/.test(n))return {q:1,u:'can'};
  if(/\b(sauce|pesto|chutney|jam|pickle|paste|curry|dressing|mayo|mayonnaise|ketchup|mustard)\b/.test(n))return {q:1,u:'jar'};
  for(const t of UNITG){if(t[0].test(n)&&t[1]['']!=null){
    if(/\bgarlic\b/.test(n))return {q:1,u:''};
    return {q:Math.max(1,Math.min(/\begg/.test(n)?6:4,Math.round(450/t[1][''])),),u:''};}}
  return {q:1,u:'pack'};
}
function fridgeFill(S){
  let n=0;
  (S.fridge.items||[]).forEach(function(i){
    if(i.q==null&&!isEveryday(S,i.name)){const g=guessAmount(i.name,i.aisle);i.q=g.q;i.u=g.u;i.est=true;n++;}
    else if(i.est&&i.u==='pack'&&i.q===1){const g=guessAmount(i.name,i.aisle);if(g.u!=='pack'){i.q=g.q;i.u=g.u;n++;}} // upgrade an earlier lazy guess
  });
  return n;
}
function fridgeRec(name,q,u,aisle,today,use,loc,exempt){
  const a=aisle||(u==='tin'||u==='can'?'Tins & dry goods':guessAisle(name));
  const r={id:uid('f'),name:name,q:q==null?null:q,u:u||'',aisle:a,added:today,use:use!==undefined?use:useByGuess(name,a,today)};
  if(r.q==null&&!exempt){const g=guessAmount(name,a);r.q=g.q;r.u=g.u;r.est=true;}
  r.loc=loc==='fridge'||loc==='pantry'?loc:locOf(r);
  return r;
}
function fridgeFromShopping(S,dates,today){
  const data=buildShopping(S,dates),ck=(S.shop&&S.shop.checked)||{};
  let all=[];data.aisles.forEach(function(a){a.items.forEach(function(i){all.push(i);});});
  const ticked=all.filter(function(i){return ck[i.key];});
  const bought=ticked; // only what was actually ticked off counts as bought
  return bought.map(function(i){
    const home=(S.fridge&&S.fridge.items||[]).filter(function(f){return nameMatch(f.name,i.name)===2;})[0];
    return fridgeRec(i.name,i.q,i.u,i.aisle,today,undefined,home?locOf(home):undefined);
  });
}
function keyWords(n){return ingKey(n).split(' ').filter(Boolean);}
function everydayList(S){return String(S.settings&&S.settings.everyday||'').split(',').map(function(x){return x.trim();}).filter(Boolean);}
function isEveryday(S,name){return everydayList(S).some(function(n){return nameMatch(n,name)>0;});}
function boughtLabel(iso,today){
  if(!iso)return '';
  const n=Math.round((parseISO(today)-parseISO(iso))/DAYMS);
  return n<=0?'Bought today':n===1?'Bought yesterday':'Bought '+n+' days ago';
}
const GENERIC=/^(cheese|pasta|chicken|beef|pork|lamb|fish|meat|milk|butter|cream|stock|sauce|oil|juice)$/;
const PREPARED=/\b(soup|meal|ravioli|tortellini|lasagne|pie|pizza|sandwich)\b|&/i;
function nameMatch(a,b){
  const x=keyWords(a),y=keyWords(b);if(!x.length||!y.length)return 0;
  if(x.join(' ')===y.join(' '))return 2;
  const sx=x.length<=y.length,s=sx?x:y,l=sx?y:x,rs=String(sx?a:b),rl=String(sx?b:a);
  if(!s.every(function(w){return l.indexOf(w)>=0;}))return 0;
  // a loose "contains" match must not turn "pasta" into a ready meal, or "milk" into "coconut milk"
  if(s.length===1&&GENERIC.test(s[0]))return 0;
  if(PREPARED.test(rl)&&!PREPARED.test(rs))return 0;
  return 1;
}
// Take `need` (in unit u) of ingredient `name` out of the stock list, converting units where we can.
// Used by BOTH the shopping list and cooking, so they always agree. Returns what's still needed and any
// stocked item we couldn't convert.
function drawDown(list,name,u,need,eq,touched){
  const ru=uk(u);let rem=need,maybe=null;
  for(const lvl of [2,1]){
    for(const f of list){
      if(!(rem>1e-9))break;
      if(!(f.q>0)||nameMatch(f.name,name)!==lvl)continue;
      const fu=uk(f.u),pu=eq&&eq[ingKey(f.name)+'|'+fu+'|'+ru];
      if(fu===ru){const t=Math.min(f.q,rem);f.q-=t;rem-=t;}
      else if(pu>0){const t=Math.min(f.q*pu,rem);f.q-=t/pu;rem-=t;}
      else{
        const g1=unitG(f.name,f.u),g2=unitG(name,u);
        if(g1&&g2){const t=Math.min(f.q*g1,rem*g2);f.q-=t/g1;rem-=t/g2;}
        else{if(!maybe)maybe=f;continue;}
      }
      if(touched)touched.add(f);
    }
  }
  return {rem:rem,maybe:maybe};
}
function fridgeConsume(items,ings,f,eq){
  const out=items.map(function(i){return Object.assign({},i);}),touched=new Set();
  const order=out.slice().sort(function(a,b){return String(a.use||'9999').localeCompare(String(b.use||'9999'));});
  let hits=0;
  (ings||[]).forEach(function(ing){
    if(ing.q==null)return;
    const need=ing.q*f;if(!(need>0))return;
    const before=touched.size,r=drawDown(order,ing.n,ing.u,need,eq,touched);
    if(touched.size>before||r.rem<need-1e-9)hits++;
  });
  touched.forEach(function(i){if(i.u==='g'||i.u==='ml')i.q=Math.round(i.q);else i.q=Math.round(i.q*100)/100;});
  return {items:out.filter(function(i){return i.q==null||i.q>1e-9;}),hits:hits};
}
function pendingMeals(S,today){
  const from=(S.fridge&&S.fridge.from)||today,lo=addDays(today,-14),out=[];
  Object.keys(S.plan).sort().forEach(function(d){
    if(d<from||d>=today||d<lo)return;
    const p=S.plan[d];if(!p)return;
    if(p.kind==='recipe'&&p.rid&&!p.cooked&&S.recipes[p.rid])out.push({date:d,slot:'dinner',rid:p.rid,portions:mealsOn(S,d).filter(function(m){return m.key===d+':'+p.rid;}).map(function(m){return m.portions;})[0]||2});
    if(p.lunch&&p.lunch.kind==='recipe'&&p.lunch.rid&&!p.lunch.cooked&&S.recipes[p.lunch.rid])out.push({date:d,slot:'lunch',rid:p.lunch.rid,portions:(p.lunch.portions!=null&&p.lunch.portions!=='')?p.lunch.portions:2});
  });
  return out;
}
function fridgeGroups(items,today,loc,ev){
  const soon=addDays(today,3),g={every:[],soon:[],fresh:[],freezer:[],cupboard:[]};
  items.filter(function(i){return !loc||locOf(i)===loc;}).slice().sort(function(a,b){return String(a.use||'9999').localeCompare(String(b.use||'9999'))||a.name.localeCompare(b.name);}).forEach(function(i){
    if(ev&&ev(i.name))g.every.push(i);
    else if(i.use&&i.use<=soon&&!LONGLIFE[i.aisle])g.soon.push(i);
    else if(i.aisle==='Frozen')g.freezer.push(i);
    else if(LONGLIFE[i.aisle]&&locOf(i)==='pantry')g.cupboard.push(i);
    else g.fresh.push(i);
  });
  return g;
}
const CAT_LABEL={every:'Everyday',soon:'Use soon',meat:'Meat & fish',meals:'Ready meals & desserts',dairy:'Dairy & eggs',veg:'Fruit & veg',bread:'Bread & bakery',other:'Other',sauces:'Sauces & jars',freezer:'Freezer',breakfast:'Breakfast',dry:'Rice, pasta & tins',baking:'Baking',snacks:'Snacks & treats',supp:'Drinks & supplements',spices:'Spices & seasonings'};
// Fastest to go off or get used up first, slowest last.
const CAT_ORDER={fridge:['every','soon','meat','dairy','veg','bread','snacks','meals','other','sauces','freezer'],pantry:['every','soon','bread','veg','dairy','breakfast','dry','baking','snacks','supp','sauces','spices','meals','other']};
function fridgeCat(i){
  const n=String(i.name||'').toLowerCase();
  if(i.aisle==='Frozen')return 'freezer';
  if(/\b(soup|crumble|custard|trifle|pudding|dessert|ready meal|lasagne|leftover)/.test(n))return 'meals';
  if(/\b(whey|protein|creatine|supplement)/.test(n))return 'supp';
  if(/\b(oat|porridge|weetabix|cereal|granola|muesli|chia|honey|syrup|jam|marmalade|peanut butter|nutella)/.test(n))return 'breakfast';
  if(/\b(flour|cocoa|baking|sugar|yeast|cornflour|icing)/.test(n))return 'baking';
  if(/\b(cookies?|biscuits?|crisps?|crackers?|chocolate|sweets|snacks?|popcorn)/.test(n))return 'snacks';
  const pantry=locOf(i)==='pantry';
  switch(i.aisle||guessAisle(i.name)){
    case 'Meat & fish':return 'meat';
    case 'Dairy & eggs':return 'dairy';
    case 'Fruit & veg':return 'veg';
    case 'Bakery':return 'bread';
    case 'Sauces & spices':return pantry&&/(cinnamon|nutmeg|cumin|turmeric|pepper|paprika|thyme|parsley|bay|oregano|basil|salt|seeds|chilli|cayenne|herb|spice|seasoning|powder|ginger|rosemary|sage|coriander|cardamom|clove)/.test(n)?'spices':'sauces';
    case 'Tins & dry goods':return pantry?'dry':'other';
    case 'Drinks':return 'supp';
  }
  return 'other';
}
function fridgeSections(items,today,loc,ev){
  const g=fridgeGroups(items,today,loc,ev),by={every:g.every,soon:g.soon};
  g.fresh.concat(g.freezer,g.cupboard).forEach(function(i){const k=fridgeCat(i);(by[k]=by[k]||[]).push(i);});
  return CAT_ORDER[loc==='pantry'?'pantry':'fridge'].filter(function(k){return by[k]&&by[k].length;}).map(function(k){return {k:k,label:CAT_LABEL[k],items:by[k]};});
}
function useLabel(use,today){
  if(!use)return '';
  const n=Math.round((parseISO(use)-parseISO(today))/DAYMS);
  if(n<0)return 'Went off '+(-n===1?'yesterday':(-n)+' days ago');
  if(n===0)return 'Use today';
  if(n===1)return 'Use by tomorrow';
  if(n<=6)return 'Use within '+n+' days';
  return 'Use by '+fmtShort(use);
}

return {pickupPlan,pickupText,mergeSettings,fridgeDedupe,fridgeFill,fmtMin};
}
