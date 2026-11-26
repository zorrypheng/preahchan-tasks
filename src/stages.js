/* ---------- Stage plan, finishing stages and work logs ----------
   Each task has a plan: the person for every stage. Finishing a stage logs the work (hours when the
   stage asks for them) and passes the task to the next stage's person. KPI and hours come from the logs. */
Object.assign(T.en,{assistant:"Assistant manager",n_time:"Timesheet",time:"Timesheet",
  stagePlan:"Stage plan",stagePlanHelp:"Pick who does each stage. The task moves to the next person when a stage is finished.",
  pickLater:"— choose at hand-off —",suggested:"Suggested",everyone:"Everyone",estH:"Est h",recordOnly:"Record only",hoursOpt:"hours optional",
  crew:"Crew",useCrew:"Use a saved crew…",saveCrew:"Save as crew",crewName:"Name for this crew (for example: Client A crew)",crewSaved:"Crew saved",crewDel:"Delete crew",crewDelAsk:"Delete the crew “{a}”?",crewDeleted:"Crew deleted",
  fromClient:"Filled in from the last task for this client.",
  finishBtn:"Finish: {a}",finishT:"Finish: {a}",hoursQ2:"Hours spent on this stage",hoursOptQ:"Hours spent (optional)",noteQ:"Note (optional)",
  nextIs:"Next: {a}",whoNext:"Who does {a}?",finishesTask:"This finishes the task.",finishGo:"Finish",finishedT:"Finished {a} · {b} logged",finishedR:"Finished {a}",
  hoursNeed:"Enter the hours you spent.",nextNeed:"Choose who does the next stage.",
  stages:"Stages",nowAt:"now",total:"Total",editLog:"Edit",logEditT:"Edit log",logSaved:"Log saved",logDel:"Delete log",logDelAsk:"Delete this log?",logDeleted:"Log deleted",
  timerStart:"Start timer",timerStop:"Stop timer",timerFrom:"Timer: {a}",
  moveStage:"Move to stage",useFinish:"Use Finish to pass this task on.",dup:"Duplicate",copyOf:"Copy of {a}",
  tTurn:"{a} finished {c}. Your turn: {b}",
  tsT:"Timesheet",tsHelp:"Hours logged per person and day. Click a number to see the work behind it.",tsTab:"Timesheet",stTab:"Stages",
  prevWeek:"Previous week",nextWeek:"Next week",weekOf:"Week of {a}",tsTotal:"Total",tsUnder:"Under {a}% of weekly hours",
  stRep:"Average hours and time in each stage for finished stages.",colFinished:"Finished",colAvgWait:"Avg time in stage",colTotalH:"Total hours",days1:"{a} days",hours1:"{a} h",
  logsOf:"{a} · {b}",noLogs:"No work logged.",
  byTask:"By task",colStage:"Stage",colPerson:"Person"});
Object.assign(T.km,{assistant:"ជំនួយការអ្នកគ្រប់គ្រង",n_time:"តារាងម៉ោង",time:"តារាងម៉ោង",
  stagePlan:"ផែនការដំណាក់កាល",stagePlanHelp:"ជ្រើសអ្នកធ្វើដំណាក់កាលនីមួយៗ។ ភារកិច្ចនឹងទៅអ្នកបន្ទាប់ពេលដំណាក់កាលបញ្ចប់។",
  pickLater:"— ជ្រើសពេលប្រគល់ —",suggested:"ណែនាំ",everyone:"ទាំងអស់គ្នា",estH:"ម៉ោងប៉ាន់",recordOnly:"កត់ត្រាតែប៉ុណ្ណោះ",hoursOpt:"ម៉ោងស្រេចចិត្ត",
  crew:"ក្រុមការងារ",useCrew:"ប្រើក្រុមដែលបានរក្សាទុក…",saveCrew:"រក្សាទុកជាក្រុម",crewName:"ឈ្មោះក្រុមនេះ (ឧ. ក្រុមអតិថិជន A)",crewSaved:"បានរក្សាទុកក្រុម",crewDel:"លុបក្រុម",crewDelAsk:"លុបក្រុម “{a}”?",crewDeleted:"បានលុបក្រុម",
  fromClient:"បំពេញពីភារកិច្ចចុងក្រោយសម្រាប់អតិថិជននេះ។",
  finishBtn:"បញ្ចប់៖ {a}",finishT:"បញ្ចប់៖ {a}",hoursQ2:"ម៉ោងចំណាយលើដំណាក់កាលនេះ",hoursOptQ:"ម៉ោងចំណាយ (ស្រេចចិត្ត)",noteQ:"កំណត់ចំណាំ (ស្រេចចិត្ត)",
  nextIs:"បន្ទាប់៖ {a}",whoNext:"អ្នកណាធ្វើ {a}?",finishesTask:"នេះបញ្ចប់ភារកិច្ច។",finishGo:"បញ្ចប់",finishedT:"បានបញ្ចប់ {a} · កត់ត្រា {b}",finishedR:"បានបញ្ចប់ {a}",
  hoursNeed:"សូមបញ្ចូលម៉ោងដែលអ្នកបានចំណាយ។",nextNeed:"សូមជ្រើសអ្នកធ្វើដំណាក់កាលបន្ទាប់។",
  stages:"ដំណាក់កាល",nowAt:"ឥឡូវ",total:"សរុប",editLog:"កែ",logEditT:"កែកំណត់ត្រា",logSaved:"បានរក្សាទុក",logDel:"លុបកំណត់ត្រា",logDelAsk:"លុបកំណត់ត្រានេះ?",logDeleted:"បានលុបកំណត់ត្រា",
  timerStart:"ចាប់ផ្តើមម៉ោង",timerStop:"បញ្ឈប់ម៉ោង",timerFrom:"ម៉ោង៖ {a}",
  moveStage:"ផ្លាស់ទៅដំណាក់កាល",useFinish:"ប្រើ បញ្ចប់ ដើម្បីបញ្ជូនភារកិច្ចនេះបន្ត។",dup:"ចម្លង",copyOf:"ចម្លងនៃ {a}",
  tTurn:"{a} បានបញ្ចប់ {c}។ វេនរបស់អ្នក៖ {b}",
  tsT:"តារាងម៉ោង",tsHelp:"ម៉ោងកត់ត្រាតាមបុគ្គល និងថ្ងៃ។ ចុចលេខដើម្បីមើលការងារ។",tsTab:"តារាងម៉ោង",stTab:"ដំណាក់កាល",
  prevWeek:"សប្តាហ៍មុន",nextWeek:"សប្តាហ៍បន្ទាប់",weekOf:"សប្តាហ៍ {a}",tsTotal:"សរុប",tsUnder:"តិចជាង {a}% នៃម៉ោងប្រចាំសប្តាហ៍",
  stRep:"ម៉ោងមធ្យម និងរយៈពេលក្នុងដំណាក់កាលនីមួយៗ។",colFinished:"បានបញ្ចប់",colAvgWait:"រយៈពេលមធ្យមក្នុងដំណាក់កាល",colTotalH:"ម៉ោងសរុប",days1:"{a} ថ្ងៃ",hours1:"{a} ម៉ោង",
  logsOf:"{a} · {b}",noLogs:"មិនមានការងារកត់ត្រា។",
  byTask:"តាមភារកិច្ច",colStage:"ដំណាក់កាល",colPerson:"បុគ្គល"});

const wlogs=[],crews=[];let board=null;
NAV.assistant=["tasks","team","notes","docs","board"];
NAV.admin.splice(NAV.admin.indexOf("costs")+1,0,"time");
NAV.manager.splice(NAV.manager.indexOf("costs")+1,0,"time");
NI.time='<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>';
BLOCKING.push("finish","editlog","logday");
Object.assign(S,{tsWeek:"",tsTab:"sheet",stPer:"month"});

const isTaskMgr=u=>!!u&&["admin","manager","assistant"].includes(u.role);
const supervises=(uid,who)=>((U(who)||{}).supervisors||[]).includes(uid);
/* how a stage asks for hours: required, optional or none (record who did it) */
function hoursMode(s,typeId){if(!s)return "none";if(s.hours)return s.hours;if(s.done)return "none";const f=flowOf(typeId);return f.length&&f[0].id===s.id?"none":"required"}
const canFinish=k=>!!k&&k.status!=="done"&&!!nextStageOf(k)&&(k.to===S.me||isTaskMgr(me())||supervises(S.me,k.to));
const canPlan=k=>!!k&&(isTaskMgr(me())||k.by===S.me||supervises(S.me,k.to));

async function loadStageData(){
  const since=iso(addDays(new Date(),-200));
  const [l,c,b]=await Promise.all([
    pb.collection("work_logs").getFullList({filter:`day >= "${since}"`,sort:"day,at",batch:1000}).catch(()=>[]),
    pb.collection("crews").getFullList({sort:"name"}).catch(()=>[]),
    pb.send("/api/pc/board",{query:{from:iso(addDays(wk0,-35)),to:WK6}}).catch(()=>null)]);
  wlogs.length=0;l.forEach(r=>wlogs.push({id:r.id,task:r.task_id||r.task||"",stage:r.stage,user:r.user||"",by:r.by||"",hours:r.hours||0,note:r.note||"",day:r.day,at:r.at||"",wait:r.wait_h||0,title:r.title||"",client:r.client||"",type:r.type||""}));
  crews.length=0;c.forEach(r=>crews.push({id:r.id,name:r.name,type:r.type||"",plan:r.plan||{},owner:r.owner}));
  board=b&&typeof b==="object"?b:null;
}
/* finished stages with hours this week, as the old "done tasks" list (doneAt, spent) */
function weekItems(uid){
  if(board)return (board[uid]||[]).filter(x=>x.h>0&&x.d>=WK0&&x.d<=WK6).map(x=>({doneAt:x.d,spent:x.h}));
  return wlogs.filter(l=>l.user===uid&&l.hours>0&&l.day>=WK0&&l.day<=WK6).map(l=>({doneAt:l.day,spent:l.hours}));
}
/* workload shown next to names: hours this week, open tasks */
function loadLabel(u){const h=weekItems(u.id).reduce((a,x)=>a+x.spent,0),n=tasks.filter(k=>k.to===u.id&&k.status!=="done").length;
  return `${u.name} · ${Math.round(h*10)/10}/${u.cap||44} h · ${n} ${t("open")}`}
/* people for a stage: those whose position is the stage's default position or who work on that stage first */
/* people for a stage: only those whose position is ticked for it in Settings (everyone if none is ticked) */
function stageWorkers(s){const w=(s.workers&&s.workers.length)?s.workers:(s.pos?[s.pos]:[]);return w}
function stageCandidates(s){
  const all=users.filter(u=>u.active&&u.role!=="admin"),w=stageWorkers(s);
  if(w.length){const ok=all.filter(u=>(u.positions||[]).some(p=>w.includes(p)));
    if(ok.length){const load=u=>weekItems(u.id).reduce((a,x)=>a+x.spent,0),open=u=>tasks.filter(k=>k.to===u.id&&k.status!=="done").length;
      return {good:ok.sort((a,b)=>load(a)-load(b)||open(a)-open(b)||a.name.localeCompare(b.name)),rest:[],only:true}}}
  const fit=u=>(s.pos&&(u.positions||[]).includes(s.pos))?2:(posOf(u.id).some(p=>p.statuses.includes(s.id))?1:0);
  const load=u=>weekItems(u.id).reduce((a,x)=>a+x.spent,0);
  const open=u=>tasks.filter(k=>k.to===u.id&&k.status!=="done").length;
  const sorted=all.slice().sort((a,b)=>fit(b)-fit(a)||load(a)-load(b)||open(a)-open(b)||a.name.localeCompare(b.name));
  return {good:sorted.filter(u=>fit(u)>0),rest:sorted.filter(u=>fit(u)===0)};
}
function suggestFor(s){const c=stageCandidates(s);return c.good[0]?c.good[0].id:""}
function personOpts(s,cur,allowEmpty){
  const c=stageCandidates(s),o=u=>`<option value="${u.id}" ${u.id===cur?"selected":""}>${esc(loadLabel(u))}</option>`;
  const extra=cur&&!c.good.concat(c.rest).some(u=>u.id===cur)&&U(cur)?o(U(cur)):"";
  if(c.only)return `${allowEmpty?`<option value="">${t("pickLater")}</option>`:""}${extra}${c.good.map(o).join("")}`;
  return `${allowEmpty?`<option value="">${t("pickLater")}</option>`:""}${extra}${c.good.length?`<optgroup label="${t("suggested")}">${c.good.map(o).join("")}</optgroup><optgroup label="${t("everyone")}">${c.rest.map(o).join("")}</optgroup>`:c.rest.map(o).join("")}`;
}
const planStages=typeId=>flowOf(typeId).filter(s=>!s.done);

/* ---------- Add task: the stage plan ---------- */
function defaultPlan(typeId,clientId){
  const st=planStages(typeId),plan={},est={};let from="";
  // B: the last task for this client (and type) with a plan
  if(clientId){const prev=tasks.filter(k=>k.client===clientId&&k.type===typeId&&k.plan&&Object.keys(k.plan).length).slice(-1)[0];
    if(prev){st.forEach(s=>{if(prev.plan[s.id])plan[s.id]=prev.plan[s.id]});from="client"}}
  const can=(s,uid)=>{const c=stageCandidates(s);return !c.only||c.good.some(u=>u.id===uid)};
  st.forEach((s,i)=>{if(!plan[s.id])plan[s.id]=i===0?(S.dlg.assign&&S.expand?S.expand:(can(s,S.me)?S.me:suggestFor(s))):suggestFor(s)});
  if(me().role==="staff"&&st[0])plan[st[0].id]=S.me;
  return {plan,est,from};
}
function planBlock(){
  const typeId=S.dlg.ptype;if(typeId===undefined||typeId===null)return "";
  const st=planStages(typeId==="__none"?"":typeId);if(!st.length)return "";
  const tid=typeId==="__none"?"":typeId,staff=me().role==="staff";
  const myCrews=crews.filter(c=>!c.type||c.type===tid);
  const rows=st.map((s,i)=>{const mode=hoursMode(s,tid),lock=staff&&i===0;
    return `<div class="plrow"><span class="chip sc-${s.color||"gray"}">${esc(nm(s))}</span>
     <select data-plan="${s.id}" aria-label="${esc(nm(s))}" ${lock?"disabled":""}>${lock?`<option value="${S.me}">${esc(me().name)}</option>`:personOpts(s,S.dlg.plan[s.id]||"",i>0)}</select>
     ${mode==="none"?`<span class="cap muted plhint">${t("recordOnly")}</span>`:`<input type="number" min="0" max="99" step="0.25" inputmode="decimal" data-pest="${s.id}" value="${S.dlg.estPlan[s.id]||""}" placeholder="${t("estH")}" aria-label="${t("estH")} ${esc(nm(s))}">`}</div>`}).join("");
  return `<section class="planbox"><div class="plhead"><span class="lab">${t("stagePlan")}</span>
     <span class="plcrew">${myCrews.length?`<select data-x="crew" aria-label="${t("crew")}"><option value="">${t("useCrew")}</option>${myCrews.map(c=>`<option value="${c.id}" ${S.dlg.crew===c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select>`:""}
     ${S.dlg.crew&&(crews.find(c=>c.id===S.dlg.crew)||{}).owner===S.me||S.dlg.crew&&isMgr(me())?`<button type="button" class="btn small" data-act="crew-del">${t("crewDel")}</button>`:""}
     ${!staff?`<button type="button" class="btn small" data-act="crew-save">${t("saveCrew")}</button>`:""}</span></div>
    <p class="cap muted">${S.dlg.planFrom==="client"?t("fromClient"):t("stagePlanHelp")}</p><div class="plrows">${rows}</div></section>`;
}
/* type changed: a fresh plan. Client changed: fill only the stages nobody picked by hand. */
function applyPlanDefaults(keepTouched){
  const tid=S.dlg.ptype==="__none"?"":S.dlg.ptype,cl=val("nt-client");
  const d=defaultPlan(tid,cl&&cl!=="__none"&&cl!=="__new"?cl:"");
  if(keepTouched){const t0=S.dlg.touched||{};Object.keys(d.plan).forEach(k=>{if(!t0[k])S.dlg.plan[k]=d.plan[k]});if(d.from)S.dlg.planFrom=d.from;return}
  S.dlg.plan=d.plan;S.dlg.planFrom=d.from;S.dlg.crew="";S.dlg.touched={};
}

/* ---------- Task dialog: stages timeline, finish, timer ---------- */
const fmtH=h=>(Math.round(h*100)/100)+" h";
function timerText(at){const m=Math.max(0,Math.floor((Date.now()-at)/60000));return Math.floor(m/60)+":"+String(m%60).padStart(2,"0")}
setInterval(()=>document.querySelectorAll("[data-since]").forEach(el=>{el.textContent=timerText(+el.dataset.since)}),20000);
function stageBlock(k){
  const f=flowOf(k.type).filter(s=>!s.done),ci=f.findIndex(s=>s.id===k.stage),done=k.status==="done",plan=k.plan||{},est=k.estPlan||{};
  const logs=wlogs.filter(l=>l.task===k.id),total=logs.reduce((a,l)=>a+l.hours,0),edit=canPlan(k)&&!done;
  const canEditLog=l=>isMgr(me())||(l.user===S.me&&l.day===TODAY);
  const rows=f.map((s,i)=>{
    const mine=logs.filter(l=>l.stage===s.id),cur=!done&&s.id===k.stage,past=done||(ci>=0&&i<ci);
    const mode=hoursMode(s,k.type);
    const logLines=mine.map(l=>`<li><b>${esc((U(l.user)||{name:"?"}).name)}</b> · ${mode==="none"&&!l.hours?t("recordOnly").toLowerCase():fmtH(l.hours)} · <span class="muted">${esc(fmtAt(l.at||l.day+"T00:00"))}</span>${l.note?` · ${esc(l.note)}`:""}
      ${canEditLog(l)?`<button type="button" class="linkbtn" data-act="log-edit" data-id="${l.id}">${t("editLog")}</button>`:""}</li>`).join("");
    let who="";
    if(cur){const tm=k.timer&&k.timer.s===s.id&&k.timer.at?k.timer:null;
      who=`<b>${esc((U(k.to)||{name:"?"}).name)}</b> <span class="nowtag">${t("nowAt")}</span>${est[s.id]?` · ${t("estShort")} ${fmtH(est[s.id])}`:""}
       ${tm?` · <span class="timer">⏱ <span data-since="${tm.at}">${timerText(tm.at)}</span></span> ${k.to===S.me?`<button type="button" class="linkbtn" data-act="timer-stop">${t("timerStop")}</button>`:""}`
         :(k.to===S.me&&mode!=="none"?` <button type="button" class="linkbtn" data-act="timer-start">${t("timerStart")}</button>`:"")}`}
    else if(!past){who=edit?`<select class="plsel" data-replan="${s.id}" aria-label="${esc(nm(s))}">${personOpts(s,plan[s.id]||"",true)}</select>`
      :(plan[s.id]&&U(plan[s.id])?esc(U(plan[s.id]).name):`<span class="muted">${t("pickLater")}</span>`);
      if(est[s.id])who+=` <span class="cap muted">${t("estShort")} ${fmtH(est[s.id])}</span>`}
    return `<li class="tl ${cur?"cur":past?"past":"next"}"><span class="tldot sc-${s.color||"gray"}" aria-hidden="true"></span><div class="tlbody"><span class="tlname">${esc(nm(s))}</span>
      ${who?`<div class="tlwho">${who}</div>`:""}${logLines?`<ul class="tllogs">${logLines}</ul>`:""}</div></li>`}).join("");
  const s=ST(k.stage);
  return `<section class="stagebox"><div class="sbhead"><span class="lab">${t("stages")}</span><span class="cap muted num">${t("total")} ${fmtH(total)}</span></div>
    <ol class="timeline">${rows}</ol>
    ${canFinish(k)&&s?`<button class="btn primary finishbtn" data-act="finish-open" data-id="${k.id}">${fill(t("finishBtn"),esc(nm(s)))} →</button>`:""}</section>`;
}

function dFinish(){
  const k=tasks.find(x=>x.id===S.dlg.id);if(!k)return `<button class="btn" data-act="close">${t("close")}</button>`;
  const s=ST(k.stage),mode=hoursMode(s,k.type),nx=nextStageOf(k),plan=k.plan||{};
  const tm=k.timer&&k.timer.s===k.stage&&k.timer.at?k.timer:null;
  const def=tm?Math.max(0.25,Math.round((Date.now()-tm.at)/900000)/4):((k.estPlan||{})[k.stage]||"");
  return `<h2>${fill(t("finishT"),esc(nm(s)))}</h2><p><b>${esc(k.title)}</b>${tm?`<br><span class="cap muted">${fill(t("timerFrom"),timerText(tm.at))}</span>`:""}</p>
   <form data-form="finish" class="stack" novalidate>
   ${mode==="none"?"":`<label class="f">${t(mode==="optional"?"hoursOptQ":"hoursQ2")}<input type="number" id="fin-h" min="0" max="24" step="0.25" inputmode="decimal" value="${def}"></label>
     <div class="tabs">${[0.5,1,2,3,4].map(h=>`<button type="button" data-act="fin-h" data-h="${h}">${fh(h)}</button>`).join("")}</div>`}
   <label class="f">${t("noteQ")}<input type="text" id="fin-note" maxlength="300" autocomplete="off"></label>
   ${nx&&!nx.done?`<label class="f">${fill(t("whoNext"),esc(nm(nx)))}<select id="fin-to">${personOpts(nx,plan[nx.id]||suggestFor(nx),true)}</select></label>`:`<p class="okline">${t("finishesTask")}</p>`}
   <p class="err" id="fin-err" role="alert" hidden></p>
   <div class="acts"><button type="button" class="btn" data-act="fin-cancel">${t("cancel")}</button><button class="btn primary">${t("finishGo")}</button></div></form>`;
}
async function doFinish(){
  const k=tasks.find(x=>x.id===S.dlg.id),s=ST(k.stage),mode=hoursMode(s,k.type),nx=nextStageOf(k);
  const er=m=>{const el=document.getElementById("fin-err");el.textContent=m;el.hidden=!m};
  const hEl=document.getElementById("fin-h"),h=hEl?parseFloat(hEl.value)||0:0,to=val("fin-to");
  if(mode==="required"&&!(h>0)){er(t("hoursNeed"));hEl&&hEl.focus();return}
  if(h<0||h>24){er(t("hoursNeed"));return}
  if(nx&&!nx.done&&!to){er(t("nextNeed"));return}
  const btn=document.querySelector('[data-form="finish"] .primary');if(btn)btn.disabled=true;
  const u=me(),before=weekItems(S.me).length,back=S.dlg.back;
  try{const r=await pb.send("/api/pc/finish",{method:"POST",body:{task:k.id,hours:h,note:val("fin-note"),to}});
    S.dlg=back&&!r.done&&r.to===S.me?{type:"task",id:k.id}:null;await loadAll();
    const after=weekItems(S.me).length,hit=k.to===S.me&&r.hours>0&&before<u.kpi&&after>=u.kpi;
    S.bump=k.to===S.me&&r.hours>0;S.celebrate=hit;render();
    toast(hit?fill(t("kpiYay"),fh(r.hours)):r.hours>0?fill(t("finishedT"),r.fromName,fh(r.hours)):fill(t("finishedR"),r.fromName));
  }catch(e){if(btn)btn.disabled=false;er((e&&e.response&&e.response.message)||(e&&e.message)||t("error"))}
}

function dEditLog(){
  const l=wlogs.find(x=>x.id===S.dlg.id);if(!l)return `<button class="btn" data-act="close">${t("close")}</button>`;
  return `<h2>${t("logEditT")}</h2><p><b>${esc(l.title)}</b><br><span class="cap muted">${esc(nm(ST(l.stage))||"")} · ${esc((U(l.user)||{name:""}).name)} · ${esc(fmtAt(l.at||l.day+"T00:00"))}</span></p>
   <form data-form="editlog" class="stack" novalidate><label class="f">${t("colHours")}<input type="number" id="el-h" min="0" max="24" step="0.25" value="${l.hours}"></label>
   <label class="f">${t("noteQ")}<input type="text" id="el-note" maxlength="300" value="${esc(l.note)}"></label><p class="err" id="el-err" role="alert" hidden></p>
   <div class="acts">${isMgr(me())?`<button type="button" class="btn ${S.arm==="logdel"?"danger":""}" data-act="log-del">${S.arm==="logdel"?t("delConfirm"):t("logDel")}</button><span class="spacer"></span>`:""}<button type="button" class="btn" data-act="log-back">${t("cancel")}</button><button class="btn primary">${t("saveT")}</button></div></form>`;
}

/* ---------- Timesheet and stage report (admins and managers) ---------- */
function tsWeek(){return S.tsWeek||WK0}
function vTime(){
  const tab=(v,l)=>`<button data-act="ts-tab" data-v="${v}" aria-pressed="${S.tsTab===v}">${t(l)}</button>`;
  return `<div class="head"><h1>${t("tsT")}</h1>${S.tsTab==="sheet"?`<button class="btn" data-act="ts-csv">${t("exportCsv")}</button>`:""}</div>
   <div class="tabs" role="group">${tab("sheet","tsTab")}${tab("stages","stTab")}</div>${S.tsTab==="stages"?vStageReport():vSheet()}`;
}
function vSheet(){
  const w0=tsWeek(),days=[0,1,2,3,4,5,6].map(i=>iso(addDays(new Date(w0+"T00:00:00"),i))),ppl=users.filter(u=>u.active&&u.role!=="admin");
  const hrs=(u,d)=>wlogs.filter(l=>l.user===u&&l.day===d).reduce((a,l)=>a+l.hours,0);
  const dn=t("days");
  const rows=ppl.map(u=>{const vals=days.map(d=>hrs(u.id,d)),tot=vals.reduce((a,b)=>a+b,0),past=days.filter(d=>d<=TODAY&&new Date(d+"T00:00:00").getDay()!==0).length;
    const expect=(u.cap||44)*past/6,under=past>0&&tot<expect*0.8;
    return `<tr><th scope="row">${esc(u.name)}<br><span class="cap muted">${t(u.role)}</span></th>${vals.map((v,i)=>`<td class="num">${v?`<button class="linkbtn num" data-act="ts-cell" data-u="${u.id}" data-d="${days[i]}">${Math.round(v*100)/100}</button>`:`<span class="muted">·</span>`}</td>`).join("")}
      <td class="num ${under?"under":""}" title="${under?esc(fill(t("tsUnder"),80)):""}"><b>${Math.round(tot*100)/100}</b> / ${u.cap||44}</td></tr>`}).join("");
  return `<p class="muted">${t("tsHelp")}</p>
   <div class="wknav"><button class="btn small" data-act="ts-wk" data-d="-7" aria-label="${t("prevWeek")}">‹</button><b>${fill(t("weekOf"),esc(fmtDay(w0)))}</b><button class="btn small" data-act="ts-wk" data-d="7" aria-label="${t("nextWeek")}" ${w0>=WK0?"disabled":""}>›</button></div>
   <div class="ctable-wrap"><table class="ctable tsheet"><thead><tr><th scope="col">${t("name")}</th>${days.map((d,i)=>`<th scope="col" class="num ${d===TODAY?"today":""}">${dn[i]}<br><span class="cap muted">${d.slice(8)}</span></th>`).join("")}<th scope="col" class="num">${t("tsTotal")}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function stRange(){const d=new Date(TODAY+"T00:00:00");if(S.stPer==="week")return [WK0,WK6];
  if(S.stPer==="last")return [iso(new Date(d.getFullYear(),d.getMonth()-1,1)),iso(new Date(d.getFullYear(),d.getMonth(),0))];
  return [iso(new Date(d.getFullYear(),d.getMonth(),1)),iso(new Date(d.getFullYear(),d.getMonth()+1,0))]}
function vStageReport(){
  const [a,b]=stRange(),list=wlogs.filter(l=>l.day>=a&&l.day<=b);
  const per=(v,l)=>`<button data-act="st-per" data-v="${v}" aria-pressed="${S.stPer===v}">${t(l)}</button>`;
  const rows=sortedSt().filter(s=>!s.done).map(s=>{const l=list.filter(x=>x.stage===s.id);if(!l.length)return "";
    const wh=l.filter(x=>x.hours>0),tot=wh.reduce((a,x)=>a+x.hours,0),wait=l.reduce((a,x)=>a+x.wait,0)/l.length;
    return `<tr><th scope="row"><span class="kdot sc-${s.color||"gray"}"></span> ${esc(nm(s))}</th><td class="num">${l.length}</td><td class="num">${wh.length?Math.round(tot/wh.length*100)/100:"–"}</td><td class="num">${Math.round(tot*10)/10}</td>
      <td class="num">${wait>=24?fill(t("days1"),Math.round(wait/24*10)/10):fill(t("hours1"),Math.round(wait*10)/10)}</td></tr>`}).join("");
  return `<p class="muted">${t("stRep")}</p><div class="tabs" role="group">${per("week","pThisWeek")}${per("month","pThisMonth")}${per("last","pLastMonth")}</div>
   ${rows?`<div class="ctable-wrap"><table class="ctable"><thead><tr><th scope="col">${t("colStage")}</th><th scope="col" class="num">${t("colFinished")}</th><th scope="col" class="num">${t("colAvgH")}</th><th scope="col" class="num">${t("colTotalH")}</th><th scope="col" class="num">${t("colAvgWait")}</th></tr></thead><tbody>${rows}</tbody></table></div>`:`<p class="empty">${t("noLogs")}</p>`}`;
}
function dLogDay(){
  const u=U(S.dlg.u),l=wlogs.filter(x=>x.user===S.dlg.u&&x.day===S.dlg.d);
  return `<h2>${fill(t("logsOf"),esc(u?u.name:""),esc(fmtDay(S.dlg.d)))}</h2>
   ${l.length?`<div class="rows">${l.map(x=>`<div class="salrow"><span><b>${esc(x.title)}</b><br><span class="cap muted">${esc(nm(ST(x.stage))||"")} · ${fmtH(x.hours)}${x.client?" · "+esc(C(x.client)):""}${x.note?" · "+esc(x.note):""}</span></span>
     ${isMgr(me())?`<button class="btn small" data-act="log-edit" data-id="${x.id}">${t("editLog")}</button>`:""}</div>`).join("")}</div>`:`<p class="empty">${t("noLogs")}</p>`}
   <div class="acts"><button class="btn" data-act="close">${t("close")}</button></div>`;
}
function sheetCSV(){
  const w0=tsWeek(),w6=iso(addDays(new Date(w0+"T00:00:00"),6)),q=v=>{const s=String(v==null?"":v);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
  const lines=["Date,Person,Stage,Task,Client,Hours,Note"].concat(wlogs.filter(l=>l.day>=w0&&l.day<=w6).map(l=>[l.day,(U(l.user)||{name:l.user}).name,(ST(l.stage)||{name:""}).name,l.title,l.client?C(l.client):"",l.hours,l.note].map(q).join(",")));
  const blob=new Blob(["﻿"+lines.join("\r\n")],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),el=document.createElement("a");
  el.href=url;el.download=`preahchan-timesheet-${w0}.csv`;document.body.appendChild(el);el.click();el.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
}

/* ---------- events ---------- */
document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  const mine=["finish-open","fin-h","fin-cancel","timer-start","timer-stop","log-edit","log-back","log-del","crew-save","crew-del","dup","ts-tab","ts-wk","ts-cell","ts-csv","st-per"];
  if(!mine.includes(a))return;e.preventDefault();e.stopImmediatePropagation();
  if(a==="finish-open"){const k=tasks.find(x=>x.id===b.dataset.id);if(!canFinish(k))return;S.arm=null;S.dlg={type:"finish",id:k.id,back:!!(S.dlg&&S.dlg.type==="task")};render();document.getElementById("fin-h")?.focus();return}
  if(a==="fin-h"){const i=document.getElementById("fin-h");if(i)i.value=b.dataset.h;return}
  if(a==="fin-cancel"){S.dlg=S.dlg.back?{type:"task",id:S.dlg.id}:null;render();return}
  if(a==="timer-start"||a==="timer-stop"){const k=tasks.find(x=>x.id===S.dlg.id);run(()=>pb.collection("tasks").update(k.id,{timer:a==="timer-start"?{u:S.me,s:k.stage,at:Date.now()}:null}));return}
  if(a==="log-edit"){S.arm=null;S.dlg={type:"editlog",id:b.dataset.id,back:S.dlg};render();return}
  if(a==="log-back"){S.dlg=S.dlg.back||null;S.arm=null;render();return}
  if(a==="log-del"){if(S.arm!=="logdel"){S.arm="logdel";render();return}S.arm=null;const id=S.dlg.id,back=S.dlg.back;S.dlg=back||null;run(()=>pb.collection("work_logs").delete(id),t("logDeleted"));return}
  if(a==="crew-save"){const name=(prompt(t("crewName"))||"").trim();if(!name)return;keepPlan();const tid=S.dlg.ptype==="__none"?"":S.dlg.ptype||"";
    const plan={};Object.keys(S.dlg.plan||{}).forEach(k=>{if(S.dlg.plan[k])plan[k]=S.dlg.plan[k]});
    try{const ex=crews.find(c=>c.name.toLowerCase()===name.toLowerCase()&&(c.owner===S.me||isMgr(me())));
      const r=ex?await pb.collection("crews").update(ex.id,{plan,type:tid}):await pb.collection("crews").create({name,type:tid,plan,owner:S.me});
      await loadStageData();S.dlg.crew=r.id;rerenderKeep();toast(t("crewSaved"))}catch(x){fail(x)}return}
  if(a==="crew-del"){const c=crews.find(x=>x.id===S.dlg.crew);if(!c||!confirm(fill(t("crewDelAsk"),c.name)))return;
    try{await pb.collection("crews").delete(c.id);await loadStageData();S.dlg.crew="";rerenderKeep();toast(t("crewDeleted"))}catch(x){fail(x)}return}
  if(a==="dup"){const k=tasks.find(x=>x.id===S.dlg.id);if(!k)return;
    S.dlg={type:"new",body:k.body||(k.desc?esc(k.desc).replace(/\n/g,"<br>"):""),autoTpl:"",ptype:k.type||"__none",plan:Object.assign({},k.plan||{}),estPlan:Object.assign({},k.estPlan||{}),planFrom:"",
      dup:{title:fill(t("copyOf"),k.title).slice(0,120),type:k.type||"__none",client:k.client||"__none",prio:k.prio,est:k.est}};render();return}
  if(a==="ts-tab"){S.tsTab=b.dataset.v;render();return}
  if(a==="ts-wk"){S.tsWeek=iso(addDays(new Date(tsWeek()+"T00:00:00"),+b.dataset.d));if(S.tsWeek>WK0)S.tsWeek=WK0;render();return}
  if(a==="ts-cell"){S.dlg={type:"logday",u:b.dataset.u,d:b.dataset.d};render();return}
  if(a==="ts-csv"){sheetCSV();return}
  if(a==="st-per"){S.stPer=b.dataset.v;render();return}
},true);
/* keep the plan the user picked when the form re-renders */
function keepPlan(){document.querySelectorAll(".dlg [data-plan]").forEach(el=>{if(!el.disabled)S.dlg.plan[el.dataset.plan]=el.value});
  document.querySelectorAll(".dlg [data-pest]").forEach(el=>{S.dlg.estPlan[el.dataset.pest]=el.value})}
document.addEventListener("change",e=>{
  const el=e.target;if(!S.dlg)return;
  if(el.dataset.plan){S.dlg.plan[el.dataset.plan]=el.value;(S.dlg.touched=S.dlg.touched||{})[el.dataset.plan]=1;S.dlg.crew="";return}
  if(el.dataset.x==="crew"){const c=crews.find(x=>x.id===el.value);S.dlg.crew=el.value;if(c){keepPlan();S.dlg.touched=S.dlg.touched||{};Object.keys(c.plan||{}).forEach(k=>{S.dlg.plan[k]=c.plan[k];S.dlg.touched[k]=1});S.dlg.planFrom=""}rerenderKeep();return}
  if(el.dataset.replan){e.stopImmediatePropagation();const k=tasks.find(x=>x.id===S.dlg.id);const plan=Object.assign({},k.plan||{});if(el.value)plan[el.dataset.replan]=el.value;else delete plan[el.dataset.replan];
    run(()=>pb.collection("tasks").update(k.id,{plan}),t("savedT"));return}
  if(el.id==="nt-type"||el.id==="nt-client"){if(el.id==="nt-client"&&el.value==="__new")return;keepPlan();const typeChanged=el.id==="nt-type";S.dlg.ptype=val("nt-type");
    if(S.dlg.ptype)applyPlanDefaults(!typeChanged);rerenderKeep();return}
});
document.addEventListener("input",e=>{const el=e.target;if(!S.dlg||!el.dataset.pest)return;S.dlg.estPlan[el.dataset.pest]=el.value;
  const tot=Object.values(S.dlg.estPlan).reduce((a,v)=>a+(parseFloat(v)||0),0),est=document.getElementById("nt-est");if(est&&tot>0){est.value=Math.round(tot*100)/100;est.setAttribute("aria-invalid","false")}});
document.addEventListener("submit",e=>{const f=e.target.dataset&&e.target.dataset.form;if(f!=="finish"&&f!=="editlog")return;e.preventDefault();e.stopImmediatePropagation();
  if(f==="finish"){doFinish();return}
  const l=wlogs.find(x=>x.id===S.dlg.id),h=parseFloat(val("el-h")),er=document.getElementById("el-err");
  if(!(h>=0&&h<=24)){er.textContent=t("hoursNeed");er.hidden=false;return}
  const back=S.dlg.back;S.dlg=back||null;run(()=>pb.collection("work_logs").update(l.id,{hours:h,note:val("el-note")}),t("logSaved"));
},true);
