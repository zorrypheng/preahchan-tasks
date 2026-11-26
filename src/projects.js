/* ---------- Projects: every project with its tasks, health, milestones and lead ---------- */
Object.assign(T.en,{n_projects:"Projects",projectsT:"Projects",projectsHelp:"Every client project with its tasks. Progress is finished tasks out of all tasks.",
  pMine:"My projects",pAllClients:"All clients",projLead:"Project lead",clientReq2:"Choose the client.",projNameReq:"Enter the project name.",
  h_ontrack:"On track",h_risk:"At risk",h_late:"Late",h_new:"No tasks yet",h_done:"Finished",
  milestonesT:"Milestones",milestonesHelp:"Phases such as Concept, Production, Launch. Tasks can be put under a milestone.",msName:"Milestone",addMs:"Add milestone",
  noMs:"No milestone",msOf:"{a} of {b} done",msDue:"due {a}",peopleT:"People",viewList:"List",viewKanban:"Kanban",
  addTaskP:"Add task",moveIn:"Add existing tasks",moveInT:"Add tasks to {a}",moveInHelp:"Tasks for this client that are not in a project yet.",moveInNone:"No other tasks for this client.",
  movedIn:"Tasks added to the project",addSel:"Add selected",pNone:"No projects yet.",pNoneMine:"You have no project tasks yet.",
  progressT:"Progress",daysLeftP:"{a} days left",endsToday:"Ends today",endedAgo:"Ended {a} days ago",milestoneF:"Milestone",openProject:"Open project"});
Object.assign(T.km,{n_projects:"គម្រោង",projectsT:"គម្រោង",projectsHelp:"គម្រោងអតិថិជនទាំងអស់ ជាមួយភារកិច្ច។ វឌ្ឍនភាព = ភារកិច្ចបានបញ្ចប់ ក្នុងចំណោមភារកិច្ចទាំងអស់។",
  pMine:"គម្រោងរបស់ខ្ញុំ",pAllClients:"អតិថិជនទាំងអស់",projLead:"អ្នកដឹកនាំគម្រោង",clientReq2:"សូមជ្រើសអតិថិជន។",projNameReq:"សូមបញ្ចូលឈ្មោះគម្រោង។",
  h_ontrack:"ដំណើរការល្អ",h_risk:"មានហានិភ័យ",h_late:"យឺត",h_new:"មិនទាន់មានភារកិច្ច",h_done:"បានបញ្ចប់",
  milestonesT:"ដំណាក់កាលសំខាន់ៗ",milestonesHelp:"ដំណាក់កាលដូចជា គំនិត ផលិតកម្ម ដាក់ឱ្យប្រើ។ ភារកិច្ចអាចដាក់ក្រោមដំណាក់កាលមួយ។",msName:"ដំណាក់កាល",addMs:"បន្ថែមដំណាក់កាល",
  noMs:"គ្មានដំណាក់កាល",msOf:"បានធ្វើ {a} នៃ {b}",msDue:"កំណត់ {a}",peopleT:"មនុស្ស",viewList:"បញ្ជី",viewKanban:"Kanban",
  addTaskP:"បន្ថែមភារកិច្ច",moveIn:"បន្ថែមភារកិច្ចដែលមានស្រាប់",moveInT:"បន្ថែមភារកិច្ចទៅ {a}",moveInHelp:"ភារកិច្ចសម្រាប់អតិថិជននេះ ដែលមិនទាន់នៅក្នុងគម្រោង។",moveInNone:"មិនមានភារកិច្ចផ្សេងទៀតសម្រាប់អតិថិជននេះទេ។",
  movedIn:"បានបន្ថែមភារកិច្ចទៅគម្រោង",addSel:"បន្ថែមដែលបានជ្រើស",pNone:"មិនទាន់មានគម្រោង។",pNoneMine:"អ្នកមិនទាន់មានភារកិច្ចក្នុងគម្រោងទេ។",
  progressT:"វឌ្ឍនភាព",daysLeftP:"នៅសល់ {a} ថ្ងៃ",endsToday:"បញ្ចប់ថ្ងៃនេះ",endedAgo:"បានបញ្ចប់ {a} ថ្ងៃមុន",milestoneF:"ដំណាក់កាល",openProject:"បើកគម្រោង"});

NAV.staff.splice(NAV.staff.indexOf("clients")+1,0,"projects");NAV.supervisor.splice(NAV.supervisor.indexOf("clients")+1,0,"projects");
NAV.assistant.splice(NAV.assistant.indexOf("clients")+1,0,"projects");NAV.manager.splice(NAV.manager.indexOf("clients")+1,0,"projects");
NAV.admin.splice(NAV.admin.indexOf("clients")+1,0,"projects");
NI.projects='<path d="M2 9h20"/><path d="M2 15h20"/><rect width="20" height="18" x="2" y="3" rx="2"/><path d="M9 3v18"/>';
BLOCKING.push("movein");
Object.assign(S,{pCl:"",pSt:"active",pMine:false,pid:"",pMode:"list"});

const PJ=id=>projects.find(p=>p.id===id);
const dayDiff=(a,b)=>Math.round((new Date(b+"T00:00:00")-new Date(a+"T00:00:00"))/864e5);
/* health: late when past the end date (or 3+ overdue), at risk when anything is overdue or progress lags time */
function projHealth(p,s){
  if(p.status==="done")return "done";if(!s.ks.length)return "new";
  if((p.end&&p.end<TODAY&&s.pct<100)||s.late>=3)return "late";
  if(s.late>0)return "risk";
  if(p.start&&p.end&&p.end>p.start){const span=dayDiff(p.start,p.end),gone=Math.min(span,Math.max(0,dayDiff(p.start,TODAY)));if(gone/span-s.pct/100>0.25)return "risk"}
  return "ontrack";
}
const healthChip=h=>`<span class="hchip h-${h}">${t("h_"+h)}</span>`;
function projPeople(p){const ids=new Set(tasks.filter(k=>k.project===p.id).map(k=>k.to));if(p.lead)ids.add(p.lead);return [...ids].map(U).filter(Boolean)}
function endText(p){if(!p.end||p.status==="done")return "";const d=dayDiff(TODAY,p.end);return d>0?fill(t("daysLeftP"),d):d===0?t("endsToday"):fill(t("endedAgo"),-d)}
const visibleProjects=()=>{const m=me();if(canProj(m)||isTaskMgr(m))return projects.slice();const ids=new Set(tasks.map(k=>k.project).filter(Boolean));return projects.filter(p=>ids.has(p.id)||p.lead===m.id)};

function vProjects(){
  const m=me(),all=visibleProjects();
  const list=all.filter(p=>(S.pSt==="all"||p.status===S.pSt)&&(!S.pCl||p.client===S.pCl)&&(!S.pMine||p.lead===m.id||tasks.some(k=>k.project===p.id&&k.to===m.id)));
  const tab=(v,l)=>`<button data-act="p-st" data-v="${v}" aria-pressed="${S.pSt===v}">${t(l)}</button>`;
  const cls=[...new Set(all.map(p=>p.client))].map(CL).filter(Boolean);
  return `<div class="head"><div class="rhead"><h1>${t("projectsT")}</h1></div>${canProj(m)?`<button class="btn primary" data-act="pj-new">${t("newProject")}</button>`:""}</div>
   <p class="muted">${t("projectsHelp")}</p>
   <div class="cbar2"><div class="tabs" role="group">${tab("active","st_active")}${tab("paused","st_paused")}${tab("done","st_done")}${tab("all","cAll")}</div>
    <select data-pf="pCl" aria-label="${t("client")}"><option value="">${t("pAllClients")}</option>${cls.map(c=>`<option value="${c.id}" ${S.pCl===c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select>
    <label class="c"><input type="checkbox" data-pf-b="pMine" ${S.pMine?"checked":""}>${t("pMine")}</label></div>
   ${list.length?`<div class="cgrid">${list.map(p=>{const s=projStats(p),h=projHealth(p,s),c=CL(p.client)||{name:"?"},ppl=projPeople(p);
     return `<button class="ccard pcard" data-act="p-open" data-id="${p.id}"><span class="cctop">${clientLogo(c)}<span class="ccname"><span class="cap muted">${esc(c.name)}</span><b>${esc(p.name)}</b></span></span>
      <span class="pchips2">${healthChip(h)}${p.lead&&U(p.lead)?`<span class="cap muted">${t("projLead")}: ${esc(U(p.lead).name)}</span>`:""}</span>
      <span class="pprog"><span class="lbbar ${s.pct>=100?"full":""}"><i style="width:${s.pct}%"></i></span><b class="num">${s.pct}%</b></span>
      <span class="cap muted">${fill(t("tasksOf"),s.done,s.ks.length)}${s.late?` · <span class="late">${s.late} ${t("cOverdue")}</span>`:""} · ${p.budget?fill(t("hoursOf"),Math.round(s.hrs*10)/10,p.budget):fill(t("hoursUsed"),Math.round(s.hrs*10)/10)}</span>
      <span class="pfoot"><span class="avstack">${ppl.slice(0,5).map(u=>`<span class="av" title="${esc(u.name)}">${avIn(u)}</span>`).join("")}${ppl.length>5?`<span class="av more">+${ppl.length-5}</span>`:""}</span>
       <span class="cap muted">${p.start?esc(fmt(p.start)):""}${p.end?" – "+esc(fmt(p.end)):""}${endText(p)?` · ${endText(p)}`:""}</span></span></button>`}).join("")}</div>`
     :`<p class="empty">${t(all.length||canProj(m)?"pNone":"pNoneMine")}</p>`}`;
}

function vProject(){
  const p=PJ(S.pid);if(!p){S.view="projects";return vProjects()}
  const m=me(),c=CL(p.client)||{name:"?"},s=projStats(p),h=projHealth(p,s),can=canProj(m),ppl=projPeople(p),mgr=isMgr(m);
  const cost=mgr&&typeof tcosts!=="undefined"?tcosts.filter(x=>s.ks.some(k=>k.id===x.task)).reduce((a,x)=>a+x.cost,0):0;
  const tile=(l,big,rest)=>`<section class="kpi"><span class="lab muted">${l}</span><div class="row"><span class="big num">${big}</span><span>${rest||""}</span></div></section>`;
  const ms=p.milestones||[];
  const msRows=ms.map(x=>{const ks=s.ks.filter(k=>k.milestone===x.id),d=ks.filter(k=>k.status==="done").length,pct=ks.length?Math.round(d/ks.length*100):0,late=x.due&&x.due<TODAY&&pct<100;
    return `<div class="msrow"><span class="msdot ${pct>=100?"ok":late?"bad":""}" aria-hidden="true"></span><span><b>${esc(x.name)}</b><br><span class="cap muted">${fill(t("msOf"),d,ks.length)}${x.due?` · <span class="${late?"late":""}">${fill(t("msDue"),esc(fmt(x.due)))}</span>`:""}</span></span>
      <span class="lbbar ${pct>=100?"full":""}"><i style="width:${pct}%"></i></span><b class="num">${pct}%</b></div>`}).join("");
  const seg=`<div class="tabs" role="group"><button data-act="p-mode" data-v="list" aria-pressed="${S.pMode!=="kanban"}">${t("viewList")}</button><button data-act="p-mode" data-v="kanban" aria-pressed="${S.pMode==="kanban"}">${t("viewKanban")}</button></div>`;
  let tasksHtml;
  if(S.pMode==="kanban")tasksHtml=vKanban(s.ks.filter(k=>k.status!=="done"||(k.doneAt&&k.doneAt>=WK0)),true);
  else{const groups=ms.map(x=>({x,ks:s.ks.filter(k=>k.milestone===x.id)})).concat([{x:null,ks:s.ks.filter(k=>!k.milestone||!ms.some(y=>y.id===k.milestone))}]).filter(g=>g.ks.length);
    tasksHtml=groups.length?groups.map(g=>`${ms.length?`<h3 class="msh">${g.x?esc(g.x.name):t("noMs")}</h3>`:""}<div class="list">${sortT(g.ks.filter(k=>k.status!=="done")).concat(g.ks.filter(k=>k.status==="done")).map(k=>taskCard(k,true)).join("")}</div>`).join(""):`<p class="empty">${t("none")}</p>`}
  return `<button class="linkbtn backlink" data-act="p-back">← ${t("back")}</button>
   <div class="chead">${clientLogo(c,"lg")}<div class="rhead"><button class="linkbtn cap" data-act="cl-open" data-id="${c.id||""}">${esc(c.name)}</button><h1>${esc(p.name)}</h1>
    <span class="chmeta">${healthChip(h)}${stChip(p.status==="done"?"done":p.status)}${p.lead&&U(p.lead)?`<span class="cap muted">${t("projLead")}: ${esc(U(p.lead).name)}</span>`:""}${endText(p)?`<span class="cap muted">${endText(p)}</span>`:""}</span></div>
    ${can?`<button class="btn" data-act="pj-edit" data-id="${p.id}">${t("editT")}</button>`:""}</div>
   ${p.goal?`<p class="pgoal">${esc(p.goal)}</p>`:""}
   <div class="tiles">${tile(t("progressT"),s.pct+"%",fill(t("tasksOf"),s.done,s.ks.length))}${tile(t("cOverdue"),s.late,"")}${tile(t("colHours"),Math.round(s.hrs*10)/10,p.budget?"/ "+p.budget+" h":"")}${mgr?tile(t("colCost"),usd(cost),""):""}</div>
   ${p.budget?`<span class="budgetbar ${s.hrs>p.budget?"over":""}" title="${t("projBudget")}"><i style="width:${Math.min(100,s.hrs/p.budget*100)}%"></i></span>`:""}
   ${ms.length?`<section class="card"><h2>${t("milestonesT")}</h2><div class="msrows">${msRows}</div></section>`:""}
   ${ppl.length?`<section class="pppl"><span class="lab">${t("peopleT")}</span><div class="pplrow">${ppl.map(u=>`<span class="pchip"><span class="av">${avIn(u)}</span>${esc(u.name)} <span class="cap muted num">${s.ks.filter(k=>k.to===u.id&&k.status!=="done").length}</span></span>`).join("")}</div></section>`:""}
   <div class="phead2"><h2>${t("tTasks")}</h2>${seg}<span class="spacer"></span>${can?`<button class="btn small" data-act="p-movein">${t("moveIn")}</button>`:""}<button class="btn primary small" data-act="p-addtask">${t("addTaskP")}</button></div>
   ${tasksHtml}`;
}
function dMoveIn(){const p=PJ(S.dlg.pid),list=tasks.filter(k=>k.client===p.client&&!k.project&&k.status!=="done");
  return `<h2>${fill(t("moveInT"),esc(p.name))}</h2><p class="muted">${t("moveInHelp")}</p>
   ${list.length?`<div class="ppl col">${list.map(k=>`<label class="c"><input type="checkbox" name="mv" value="${k.id}">${esc(k.title)} <span class="cap muted">· ${esc((U(k.to)||{name:""}).name)} · ${dueText(k)}</span></label>`).join("")}</div>`:`<p class="empty">${t("moveInNone")}</p>`}
   ${(p.milestones||[]).length?`<label class="f">${t("milestoneF")}<select id="mv-ms"><option value="">${t("noMs")}</option>${p.milestones.map(x=>`<option value="${x.id}">${esc(x.name)}</option>`).join("")}</select></label>`:""}
   <div class="acts"><button class="btn" data-act="close">${t("cancel")}</button>${list.length?`<button class="btn primary" data-act="mv-save">${t("addSel")}</button>`:""}</div>`}

/* Add task / task dialog: milestone of the chosen project */
function milestoneField(projectId,cur,id){const p=PJ(projectId);if(!p||!(p.milestones||[]).length)return "";
  return `<label class="f">${t("milestoneF")}<select id="${id}" ${id==="tk-ms"?'data-x="setms"':""}><option value="">${t("noMs")}</option>${p.milestones.map(x=>`<option value="${x.id}" ${x.id===cur?"selected":""}>${esc(x.name)}${x.due?" · "+esc(fmt(x.due)):""}</option>`).join("")}</select></label>`}
function projectLink(k){return k.project&&PJ(k.project)?`<button class="btn small" data-act="p-open" data-id="${k.project}" style="align-self:flex-start">${t("openProject")}: ${esc(PJ(k.project).name)}</button>`:""}

document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  if(!["p-st","p-open","p-back","p-mode","p-addtask","p-movein","mv-save"].includes(a))return;e.preventDefault();e.stopImmediatePropagation();
  switch(a){
    case "p-st":S.pSt=b.dataset.v;render();return;
    case "p-open":S.dlg=null;S.view="project";S.pid=b.dataset.id;render();window.scrollTo(0,0);return;
    case "p-back":S.view="projects";render();return;
    case "p-mode":S.pMode=b.dataset.v;render();return;
    case "p-addtask":{const p=PJ(S.pid);S.dlg={type:"new",dup:{title:"",client:p.client,type:"",prio:"",est:""},dupProject:p.id,pclient:p.client};render();return}
    case "p-movein":S.dlg={type:"movein",pid:S.pid};render();return;
    case "mv-save":{const ids=[...document.querySelectorAll('input[name="mv"]:checked')].map(x=>x.value),msv=val("mv-ms")||"",pid=S.dlg.pid;S.dlg=null;
      run(()=>Promise.all(ids.map(id=>pb.collection("tasks").update(id,{project:pid,milestone:msv}))),t("movedIn"));return}
  }
},true);
document.addEventListener("change",e=>{const el=e.target;
  if(el.dataset&&el.dataset.pf){e.stopImmediatePropagation();S[el.dataset.pf]=el.value;render();return}
  if(el.dataset&&el.dataset.pfB){e.stopImmediatePropagation();S[el.dataset.pfB]=el.checked;render();return}
  if(el.dataset&&el.dataset.x==="setms"){e.stopImmediatePropagation();run(()=>pb.collection("tasks").update(S.dlg.id,{milestone:el.value}));return}
  if(el.id==="nt-project"&&S.dlg){S.dlg.dupProject=el.value;rerenderKeep();return}
},true);
