/* ---------- Salaries and labour cost (admin and manager only) ---------- */
Object.assign(T.en,{n_costs:"Costs",costs:"Costs",costsHelp:"Labour cost of finished work. Hourly cost = monthly salary ÷ paid hours a month (weekly hours × 52 ÷ 12).",
  costsFrom:"Costs are recorded when a task is marked done.",pThisWeek:"This week",pThisMonth:"This month",pLastMonth:"Last month",pCustom:"Custom",pFrom:"From",pTo:"To",
  costLogged:"Labour cost logged",hoursLogged:"Hours logged",paidPeriod:"Salaries for this period",utilT:"Paid hours logged",
  byClient:"By client",byType:"By task type",byPerson:"By person",colTasks:"Tasks",colHours:"Hours",colCost:"Cost",colAvgH:"Avg hours",colAvgC:"Avg cost",
  colSalary:"Monthly salary",colRate:"Per hour",colPaid:"Paid in period",colUtil:"Logged",noSalary:"No salary set",setSalary:"Salary",
  exportCsv:"Export CSV",noCosts:"No finished tasks with logged hours in this period.",perMonth:"/month",perHour:"/h",
  salaryT:"Salary: {a}",salaryHelp:"Enter the monthly salary in USD and the date it starts. Earlier entries are kept, so past costs don't change.",
  salMonthly:"Monthly salary (USD)",salFrom:"Starts from",salNote:"Note (optional)",salSave:"Save salary",salSaved:"Salary saved",salDel:"Delete",
  salDelAsk:"Delete the salary entry from {a}?",salDeleted:"Salary entry deleted",salHist:"Salary history",salNone:"No salary entered yet.",
  salAmountReq:"Enter the monthly salary.",salDateReq:"Choose the start date.",salRateIs:"{a} per hour at {b} h a week",costLine:"Cost {a}",noType2:"No type",
  csvHead:"Date,Person,Client,Task type,Task,Hours,Hourly cost (USD),Cost (USD)"});
Object.assign(T.km,{n_costs:"ចំណាយ",costs:"ចំណាយ",costsHelp:"ចំណាយពលកម្មលើការងារដែលបានបញ្ចប់។ ចំណាយក្នុងមួយម៉ោង = ប្រាក់ខែ ÷ ម៉ោងបង់ប្រាក់ក្នុងមួយខែ (ម៉ោងក្នុងសប្តាហ៍ × 52 ÷ 12)។",
  costsFrom:"ចំណាយត្រូវបានកត់ត្រានៅពេលភារកិច្ចត្រូវបានសម្គាល់ថារួចរាល់។",pThisWeek:"សប្តាហ៍នេះ",pThisMonth:"ខែនេះ",pLastMonth:"ខែមុន",pCustom:"កំណត់ខ្លួនឯង",pFrom:"ពី",pTo:"ដល់",
  costLogged:"ចំណាយពលកម្មដែលបានកត់ត្រា",hoursLogged:"ម៉ោងដែលបានកត់ត្រា",paidPeriod:"ប្រាក់ខែសម្រាប់រយៈពេលនេះ",utilT:"ម៉ោងបង់ប្រាក់ដែលបានកត់ត្រា",
  byClient:"តាមអតិថិជន",byType:"តាមប្រភេទការងារ",byPerson:"តាមបុគ្គល",colTasks:"ភារកិច្ច",colHours:"ម៉ោង",colCost:"ចំណាយ",colAvgH:"ម៉ោងមធ្យម",colAvgC:"ចំណាយមធ្យម",
  colSalary:"ប្រាក់ខែ",colRate:"ក្នុងមួយម៉ោង",colPaid:"បានបង់ក្នុងរយៈពេល",colUtil:"បានកត់ត្រា",noSalary:"មិនទាន់កំណត់ប្រាក់ខែ",setSalary:"ប្រាក់ខែ",
  exportCsv:"នាំចេញ CSV",noCosts:"មិនមានភារកិច្ចបានបញ្ចប់ដែលមានម៉ោងកត់ត្រាក្នុងរយៈពេលនេះទេ។",perMonth:"/ខែ",perHour:"/ម៉ោង",
  salaryT:"ប្រាក់ខែ៖ {a}",salaryHelp:"បញ្ចូលប្រាក់ខែប្រចាំខែជាដុល្លារ និងថ្ងៃចាប់ផ្តើម។ ទិន្នន័យចាស់ត្រូវបានរក្សាទុក ដូច្នេះចំណាយកន្លងមកមិនប្រែប្រួលទេ។",
  salMonthly:"ប្រាក់ខែប្រចាំខែ (USD)",salFrom:"ចាប់ពី",salNote:"កំណត់ចំណាំ (ស្រេចចិត្ត)",salSave:"រក្សាទុកប្រាក់ខែ",salSaved:"បានរក្សាទុកប្រាក់ខែ",salDel:"លុប",
  salDelAsk:"លុបប្រាក់ខែចាប់ពី {a}?",salDeleted:"បានលុបប្រាក់ខែ",salHist:"ប្រវត្តិប្រាក់ខែ",salNone:"មិនទាន់បញ្ចូលប្រាក់ខែ។",
  salAmountReq:"សូមបញ្ចូលប្រាក់ខែ។",salDateReq:"សូមជ្រើសថ្ងៃចាប់ផ្តើម។",salRateIs:"{a} ក្នុងមួយម៉ោង សម្រាប់ {b} ម៉ោងក្នុងមួយសប្តាហ៍",costLine:"ចំណាយ {a}",noType2:"គ្មានប្រភេទ",
  csvHead:"Date,Person,Client,Task type,Task,Hours,Hourly cost (USD),Cost (USD)"});

const salaries=[],tcosts=[];
NAV.admin.splice(NAV.admin.indexOf("reports")+1,0,"costs");
NAV.manager.splice(NAV.manager.indexOf("reports")+1,0,"costs");
NI.costs='<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>';
BLOCKING.push("salary");
Object.assign(S,{cPer:"month",cFrom:"",cTo:""});

async function loadCosts(){
  const r=pb.authStore.record;salaries.length=0;tcosts.length=0;
  if(!r||!["admin","manager"].includes(r.role))return;
  try{const [s,c]=await Promise.all([pb.collection("salaries").getFullList({sort:"from"}),pb.collection("task_costs").getFullList({sort:"day",batch:1000})]);
    s.forEach(x=>salaries.push({id:x.id,user:x.user,monthly:x.monthly||0,from:x.from,note:x.note||""}));
    c.forEach(x=>tcosts.push({task:x.task,user:x.user,client:x.client||"",type:x.type||"",title:x.title||"",day:x.day,hours:x.hours||0,rate:x.rate||0,cost:x.cost||0}));
  }catch(e){}
}
const usd=n=>"$"+(Math.round((n||0)*100)/100).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const paidHoursMonth=u=>(u.cap||44)*52/12;
function salaryAt(uid,day){let m=null;salaries.forEach(s=>{if(s.user===uid&&s.from<=day&&(!m||s.from>=m.from))m=s});return m}
function rateAt(uid,day){const u=U(uid),s=salaryAt(uid,day);return u&&s&&s.monthly>0?s.monthly/paidHoursMonth(u):0}

/* the period shown on the Costs page, as [from,to] dates */
function costRange(){
  const d=new Date(TODAY+"T00:00:00"),first=new Date(d.getFullYear(),d.getMonth(),1);
  if(S.cPer==="week")return [WK0,WK6];
  if(S.cPer==="last"){const a=new Date(d.getFullYear(),d.getMonth()-1,1),b=new Date(d.getFullYear(),d.getMonth(),0);return [iso(a),iso(b)]}
  if(S.cPer==="custom"&&S.cFrom&&S.cTo)return S.cFrom<=S.cTo?[S.cFrom,S.cTo]:[S.cTo,S.cFrom];
  return [iso(first),iso(new Date(d.getFullYear(),d.getMonth()+1,0))];
}
/* salary owed for the days in the range that have passed, and the paid hours in them (days with a salary only) */
function paidIn(u,a,b){
  const end=b<TODAY?b:TODAY;let money=0,days=0;
  for(let d=new Date(a+"T00:00:00");iso(d)<=end;d=addDays(d,1)){const s=salaryAt(u.id,iso(d));if(s&&s.monthly>0){days++;money+=s.monthly*12/365}}
  return {money,hours:(u.cap||44)*days/7};
}
function costPeople(){const ids=new Set(salaries.map(s=>s.user));return users.filter(u=>u.active&&(u.role!=="admin"||ids.has(u.id)))}

function vCosts(){
  const [a,b]=costRange(),rows=tcosts.filter(c=>c.day>=a&&c.day<=b);
  const sum=(l,f)=>l.reduce((x,c)=>x+(f(c)||0),0),tot=sum(rows,c=>c.cost),hrs=sum(rows,c=>c.hours);
  const ppl=costPeople().map(u=>{const mine=rows.filter(c=>c.user===u.id),p=paidIn(u,a,b),s=salaryAt(u.id,TODAY);
    return {u,s,rate:rateAt(u.id,TODAY),paid:p.money,paidH:p.hours,h:sum(mine,c=>c.hours),cost:sum(mine,c=>c.cost),n:mine.length}});
  const paid=sum(ppl,p=>p.paid),paidH=sum(ppl,p=>p.paidH),hrsPaid=sum(ppl.filter(p=>p.paidH>0),p=>p.h);
  const pct=(x,y)=>y>0?Math.round(x/y*100)+"%":"–";
  const group=key=>{const m=new Map();rows.forEach(c=>{const k=c[key]||"";const g=m.get(k)||{k,n:0,h:0,cost:0};g.n++;g.h+=c.hours;g.cost+=c.cost;m.set(k,g)});return [...m.values()].sort((x,y)=>y.cost-x.cost)};
  const bar=v=>`<span class="cbar" aria-hidden="true"><i style="width:${tot>0?Math.max(2,v/tot*100):0}%"></i></span>`;
  const tile=(l,big,rest)=>`<section class="kpi"><span class="lab muted">${l}</span><div class="row"><span class="big num">${big}</span><span>${rest||""}</span></div></section>`;
  const per=(v,l)=>`<button data-act="cper" data-v="${v}" aria-pressed="${S.cPer===v}">${t(l)}</button>`;
  const clientRows=group("client"),typeRows=group("type");
  const table=(head,body)=>`<div class="ctable-wrap"><table class="ctable"><thead><tr>${head.map((h,i)=>`<th scope="col" class="${i?"num":""}">${h}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>`;
  return `<div class="head"><div class="rhead"><h1>${t("costs")}</h1></div><button class="btn" data-act="ccsv" ${rows.length?"":"disabled"}>${t("exportCsv")}</button></div>
   <p class="muted">${t("costsHelp")} ${t("costsFrom")}</p>
   <div class="tabs" role="group">${per("week","pThisWeek")}${per("month","pThisMonth")}${per("last","pLastMonth")}${per("custom","pCustom")}</div>
   ${S.cPer==="custom"?`<div class="crange"><label class="f">${t("pFrom")}<input type="date" id="c-from" data-ch="crange" value="${esc(S.cFrom||a)}"></label><label class="f">${t("pTo")}<input type="date" id="c-to" data-ch="crange" value="${esc(S.cTo||b)}"></label></div>`:""}
   <p class="cap muted">${esc(fmtDay(a))} – ${esc(fmtDay(b))}</p>
   <div class="tiles">${tile(t("costLogged"),usd(tot),`${rows.length} ${t("colTasks").toLowerCase()}`)}${tile(t("hoursLogged"),Math.round(hrs*10)/10,t("hrs"))}${tile(t("paidPeriod"),usd(paid),"")}${tile(t("utilT"),pct(hrsPaid,paidH),`${Math.round(hrsPaid)} / ${Math.round(paidH)} ${t("hrs")}`)}</div>
   <section class="csec"><h2>${t("byClient")}</h2>${clientRows.length?table([t("client"),t("colTasks"),t("colHours"),t("colCost"),""],clientRows.map(g=>`<tr><th scope="row">${g.k?esc(C(g.k)||"–"):`<span class="muted">${t("noClient")}</span>`}</th><td class="num">${g.n}</td><td class="num">${Math.round(g.h*100)/100}</td><td class="num"><b>${usd(g.cost)}</b></td><td>${bar(g.cost)}</td></tr>`).join("")):`<p class="empty">${t("noCosts")}</p>`}</section>
   <section class="csec"><h2>${t("byType")}</h2>${typeRows.length?table([t("type"),t("colTasks"),t("colAvgH"),t("colAvgC"),t("colCost")],typeRows.map(g=>{const x=TT(g.k);return `<tr><th scope="row">${x?esc(nm(x)):`<span class="muted">${t("noType2")}</span>`}</th><td class="num">${g.n}</td><td class="num">${Math.round(g.h/g.n*100)/100}</td><td class="num">${usd(g.cost/g.n)}</td><td class="num"><b>${usd(g.cost)}</b></td></tr>`}).join("")):`<p class="empty">${t("noCosts")}</p>`}</section>
   <section class="csec"><h2>${t("byPerson")}</h2>${table([t("name"),t("colSalary"),t("colRate"),t("colPaid"),t("colHours"),t("colCost"),t("colUtil"),""],ppl.map(p=>`<tr><th scope="row">${esc(p.u.name)}<br><span class="cap muted">${t(p.u.role)} · ${p.u.cap||44} ${t("hrs")}/wk</span></th>
     <td class="num">${p.s&&p.s.monthly>0?usd(p.s.monthly):`<span class="tag warn">${t("noSalary")}</span>`}</td><td class="num">${p.rate?usd(p.rate):"–"}</td><td class="num">${usd(p.paid)}</td>
     <td class="num">${Math.round(p.h*100)/100}</td><td class="num"><b>${usd(p.cost)}</b></td><td class="num">${pct(p.h,p.paidH)}</td>
     <td><button class="btn small" data-act="sal-open" data-id="${p.u.id}">${t("setSalary")}</button></td></tr>`).join(""))}</section>`;
}
function fmtDay(d){try{return new Date(d+"T00:00:00").toLocaleDateString(S.lang==="km"?"km-KH":"en-GB",{day:"numeric",month:"short",year:"numeric"})}catch(e){return d}}

function dSalary(){
  const u=U(S.dlg.id);if(!u)return `<button class="btn" data-act="close">${t("close")}</button>`;
  const hist=salaries.filter(s=>s.user===u.id).sort((x,y)=>y.from.localeCompare(x.from));
  return `<h2>${fill(t("salaryT"),esc(u.name))}</h2><p class="muted">${t("salaryHelp")}</p><p class="err" id="sal-err" role="alert" hidden></p>
   <div class="two"><label class="f">${t("salMonthly")}<input type="number" id="sal-amt" min="0" step="1" inputmode="decimal" data-x="salamt"></label>
   <label class="f">${t("salFrom")}<input type="date" id="sal-from" value="${TODAY}"></label></div>
   <label class="f">${t("salNote")}<input type="text" id="sal-note" maxlength="200" autocomplete="off"></label>
   <p class="cap muted" id="sal-rate" aria-live="polite"></p>
   <div class="acts" style="justify-content:flex-start"><button class="btn primary" data-act="sal-save">${t("salSave")}</button></div>
   <h3 class="lab">${t("salHist")}</h3>
   ${hist.length?`<div class="rows">${hist.map(s=>`<div class="salrow"><span><b class="num">${usd(s.monthly)}</b>${t("perMonth")} · <span class="num">${usd(s.monthly/paidHoursMonth(u))}</span>${t("perHour")}<br><span class="cap muted">${t("salFrom")} ${esc(fmtDay(s.from))}${s.note?" · "+esc(s.note):""}</span></span>
     <button class="btn small" data-act="sal-del" data-id="${s.id}">${t("salDel")}</button></div>`).join("")}</div>`:`<p class="empty">${t("salNone")}</p>`}
   <div class="acts"><button class="btn" data-act="close">${t("close")}</button></div>`;
}

/* finished tasks show their labour cost to admins and managers */
function timeMeta(k){
  const c=isMgr(me())&&k.status==="done"?tcosts.find(x=>x.task===k.id):null;
  const cost=c&&c.cost>0?` · ${fill(t("costLine"),usd(c.cost))}`:"";
  if(k.status==="done"&&k.spent!=null)return `<span class="num">${t("spent")} ${fh(k.spent)}${k.est?` · ${t("estShort")} ${fh(k.est)}`:""}${cost}</span>`;
  return k.est?`<span class="num">${t("estShort")} ${fh(k.est)}</span>`:"";
}

function costCSV(){
  const [a,b]=costRange(),q=v=>{const s=String(v==null?"":v);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
  const lines=[t("csvHead")].concat(tcosts.filter(c=>c.day>=a&&c.day<=b).map(c=>{const x=TT(c.type);
    return [c.day,U(c.user)?U(c.user).name:c.user,c.client?C(c.client):"",x?x.name:"",c.title,c.hours,c.rate,c.cost].map(q).join(",")}));
  const blob=new Blob(["﻿"+lines.join("\r\n")],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),el=document.createElement("a");
  el.href=url;el.download=`preahchan-costs-${a}-to-${b}.csv`;document.body.appendChild(el);el.click();el.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
}

document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  if(!["cper","ccsv","sal-open","sal-save","sal-del"].includes(a))return;
  e.preventDefault();e.stopImmediatePropagation();
  if(a==="cper"){S.cPer=b.dataset.v;if(S.cPer==="custom"&&!S.cFrom){const [x,y]=costRange();S.cFrom=x;S.cTo=y}render();return}
  if(a==="ccsv"){costCSV();return}
  if(a==="sal-open"){S.dlg={type:"salary",id:b.dataset.id};render();return}
  if(a==="sal-save"){const er=m=>{const el=document.getElementById("sal-err");el.textContent=m;el.hidden=!m};
    const amt=parseFloat(val("sal-amt")),from=val("sal-from");
    if(!(amt>=0)||val("sal-amt")==="")return er(t("salAmountReq"));if(!from)return er(t("salDateReq"));
    b.disabled=true;
    try{const same=salaries.find(s=>s.user===S.dlg.id&&s.from===from);
      if(same)await pb.collection("salaries").update(same.id,{monthly:amt,note:val("sal-note")});
      else await pb.collection("salaries").create({user:S.dlg.id,monthly:amt,from,note:val("sal-note"),created_by:S.me});
      await loadCosts();render();toast(t("salSaved"))}catch(x){er(x&&x.message?x.message:t("error"));b.disabled=false}return}
  if(a==="sal-del"){const s=salaries.find(x=>x.id===b.dataset.id);if(!s||!confirm(fill(t("salDelAsk"),fmtDay(s.from))))return;
    try{await pb.collection("salaries").delete(s.id);await loadCosts();render();toast(t("salDeleted"))}catch(x){fail(x)}return}
},true);
document.addEventListener("change",e=>{const el=e.target;if(el.dataset&&el.dataset.ch==="crange"){e.stopImmediatePropagation();S.cFrom=val("c-from");S.cTo=val("c-to");render()}},true);
document.addEventListener("input",e=>{const el=e.target;if(el.id!=="sal-amt"||!S.dlg)return;const u=U(S.dlg.id),v=parseFloat(el.value),out=document.getElementById("sal-rate");
  if(out)out.textContent=u&&v>0?fill(t("salRateIs"),usd(v/paidHoursMonth(u)),u.cap||44):""});
