/* ---------- Clients: profile, tasks, projects, meeting notes, wiki ----------
   Only admins and managers create or change clients, projects and meeting notes. Everyone reads meeting
   notes (except "Managers only" ones) and can edit the wiki. Staff see the clients they have tasks for. */
Object.assign(T.en,{n_clients:"Clients",clientsT:"Clients",clientsHelp2:"Every client with their tasks, projects, meeting notes and guidelines.",newClientB:"New client",
  cSearch:"Search clients",cAll:"All",st_active:"Active",st_paused:"Paused",st_ended:"Ended",st_done:"Finished",
  cOpen:"open",cDoneMonth:"done this month",cOverdue:"overdue",cNextDue:"Next due {a}",cNone:"No clients yet.",cNoneMine:"You have no client tasks yet.",
  back:"Back",tOverview:"Overview",tTasks:"Tasks",tProjects:"Projects",tMeetings:"Meeting notes",tWiki:"Wiki",tFiles:"Files",editClient:"Edit client",
  accMgr:"Account manager",contactsT:"Contact people",noContacts:"No contact people yet.",addrT:"Address",notesT:"Notes",
  pkgT:"Monthly package",pkgHelp:"What the client buys each month, counted from finished tasks of that type.",pkgNone:"No package set.",pkgDone:"{a} of {b}",
  hoursMonth:"Hours this month",costMonth:"Cost this month",recent:"Recent work",noRecent:"No work logged yet.",
  cName:"Client name",cStatus:"Status",logoT:"Logo",cRole:"Role",cPhone:"Phone",cTg:"Telegram",cEmail:"Email",addContact:"Add contact",addPkg:"Add package line",
  pkgLabel:"What (e.g. Posts)",pkgType:"Task type",pkgQty:"Per month",anyTypeP:"Any type",removeRow:"Remove",clientSaved2:"Client saved",clientNameReq:"Enter the client's name.",
  allStages:"All",showDone:"Show finished ({a})",hideDone:"Hide finished",anyProject:"Any project",anyone:"Anyone",
  newProject:"New project",projectT:"Project",noProject:"No project",projName:"Project name",projGoal:"Goal",projStart:"Start",projEnd:"End",projBudget:"Hour budget",
  projSaved:"Project saved",projDeleted:"Project deleted",projDel:"Delete project",projNone:"No projects yet.",progress:"{a}% done",tasksOf:"{a} of {b} tasks",hoursOf:"{a} of {b} h",hoursUsed:"{a} h",
  newMeeting:"New meeting note",meetT:"Meeting note",meetTitle:"Title",meetDate:"Date",attendees:"Who attended (team)",guests:"Client people who attended",
  privateM:"Managers only",privateHelp:"Only admins and managers can see this note.",actions:"Action items",addAction:"Add action item",makeTask:"Make task",taskMade:"Task created",
  openTask:"Open task",nextMeet:"Next meeting",meetSaved:"Meeting note saved",meetDeleted:"Meeting note deleted",meetDel:"Delete note",meetNone:"No meeting notes yet.",actionsOpen:"{a} open actions",
  meetTpl:"<h3>Agenda</h3><ul><li><br></li></ul><h3>Discussion</h3><p><br></p><h3>Decisions</h3><ul><li><br></li></ul>",
  newPage:"New page",pageT:"Wiki page",pageTitle:"Page title",section:"Section",pinT:"Pin (shown in Brand guide)",pageSaved:"Page saved",pageDeleted:"Page deleted",pageDel:"Delete page",
  wikiNone:"No pages yet. Start with the brand guideline.",lastEdit:"Edited by {a} · {b}",useTpl:"Use template",
  sec_brand:"Brand guideline",sec_tone:"Tone of voice",sec_dos:"Do's and don'ts",sec_hashtags:"Hashtags",sec_competitors:"Competitors",sec_contacts:"Approval contacts",sec_other:"Other",
  guide:"Brand guide",guideNone:"No pinned wiki pages for this client yet.",filesOf:"{a} client files",openFiles:"Open client files",tMeet:"Meeting with {a} today: {b}"});
Object.assign(T.km,{n_clients:"អតិថិជន",clientsT:"អតិថិជន",clientsHelp2:"អតិថិជននីមួយៗ ជាមួយភារកិច្ច គម្រោង កំណត់ត្រាប្រជុំ និងគោលការណ៍។",newClientB:"អតិថិជនថ្មី",
  cSearch:"ស្វែងរកអតិថិជន",cAll:"ទាំងអស់",st_active:"សកម្ម",st_paused:"ផ្អាក",st_ended:"បញ្ចប់",st_done:"បានបញ្ចប់",
  cOpen:"បើក",cDoneMonth:"បានបញ្ចប់ខែនេះ",cOverdue:"ហួសកំណត់",cNextDue:"កំណត់បន្ទាប់ {a}",cNone:"មិនទាន់មានអតិថិជន។",cNoneMine:"អ្នកមិនទាន់មានភារកិច្ចអតិថិជនទេ។",
  back:"ត្រឡប់",tOverview:"ទិដ្ឋភាពទូទៅ",tTasks:"ភារកិច្ច",tProjects:"គម្រោង",tMeetings:"កំណត់ត្រាប្រជុំ",tWiki:"វិគី",tFiles:"ឯកសារ",editClient:"កែអតិថិជន",
  accMgr:"អ្នកគ្រប់គ្រងគណនី",contactsT:"អ្នកទំនាក់ទំនង",noContacts:"មិនទាន់មានអ្នកទំនាក់ទំនង។",addrT:"អាសយដ្ឋាន",notesT:"កំណត់ចំណាំ",
  pkgT:"កញ្ចប់ប្រចាំខែ",pkgHelp:"អ្វីដែលអតិថិជនទិញរៀងរាល់ខែ រាប់ពីភារកិច្ចបានបញ្ចប់នៃប្រភេទនោះ។",pkgNone:"មិនទាន់កំណត់កញ្ចប់។",pkgDone:"{a} នៃ {b}",
  hoursMonth:"ម៉ោងខែនេះ",costMonth:"ចំណាយខែនេះ",recent:"ការងារថ្មីៗ",noRecent:"មិនទាន់មានការងារកត់ត្រា។",
  cName:"ឈ្មោះអតិថិជន",cStatus:"ស្ថានភាព",logoT:"ឡូហ្គោ",cRole:"តួនាទី",cPhone:"ទូរស័ព្ទ",cTg:"Telegram",cEmail:"អ៊ីមែល",addContact:"បន្ថែមអ្នកទំនាក់ទំនង",addPkg:"បន្ថែមបន្ទាត់កញ្ចប់",
  pkgLabel:"អ្វី (ឧ. ប៉ុស្តិ៍)",pkgType:"ប្រភេទការងារ",pkgQty:"ក្នុងមួយខែ",anyTypeP:"គ្រប់ប្រភេទ",removeRow:"ដកចេញ",clientSaved2:"បានរក្សាទុកអតិថិជន",clientNameReq:"សូមបញ្ចូលឈ្មោះអតិថិជន។",
  allStages:"ទាំងអស់",showDone:"បង្ហាញដែលបានបញ្ចប់ ({a})",hideDone:"លាក់ដែលបានបញ្ចប់",anyProject:"គ្រប់គម្រោង",anyone:"គ្រប់គ្នា",
  newProject:"គម្រោងថ្មី",projectT:"គម្រោង",noProject:"គ្មានគម្រោង",projName:"ឈ្មោះគម្រោង",projGoal:"គោលដៅ",projStart:"ចាប់ផ្តើម",projEnd:"បញ្ចប់",projBudget:"ថវិកាម៉ោង",
  projSaved:"បានរក្សាទុកគម្រោង",projDeleted:"បានលុបគម្រោង",projDel:"លុបគម្រោង",projNone:"មិនទាន់មានគម្រោង។",progress:"បានធ្វើ {a}%",tasksOf:"{a} នៃ {b} ភារកិច្ច",hoursOf:"{a} នៃ {b} ម៉ោង",hoursUsed:"{a} ម៉ោង",
  newMeeting:"កំណត់ត្រាប្រជុំថ្មី",meetT:"កំណត់ត្រាប្រជុំ",meetTitle:"ចំណងជើង",meetDate:"កាលបរិច្ឆេទ",attendees:"អ្នកចូលរួម (ក្រុម)",guests:"អ្នកខាងអតិថិជនដែលចូលរួម",
  privateM:"សម្រាប់អ្នកគ្រប់គ្រងប៉ុណ្ណោះ",privateHelp:"មានតែអ្នកគ្រប់គ្រងប្រព័ន្ធ និងអ្នកគ្រប់គ្រងទេ ដែលអាចមើលកំណត់ត្រានេះ។",actions:"ចំណុចត្រូវធ្វើ",addAction:"បន្ថែមចំណុចត្រូវធ្វើ",makeTask:"បង្កើតភារកិច្ច",taskMade:"បានបង្កើតភារកិច្ច",
  openTask:"បើកភារកិច្ច",nextMeet:"ប្រជុំបន្ទាប់",meetSaved:"បានរក្សាទុកកំណត់ត្រាប្រជុំ",meetDeleted:"បានលុបកំណត់ត្រាប្រជុំ",meetDel:"លុបកំណត់ត្រា",meetNone:"មិនទាន់មានកំណត់ត្រាប្រជុំ។",actionsOpen:"នៅ {a} ចំណុចត្រូវធ្វើ",
  meetTpl:"<h3>របៀបវារៈ</h3><ul><li><br></li></ul><h3>ការពិភាក្សា</h3><p><br></p><h3>សេចក្តីសម្រេច</h3><ul><li><br></li></ul>",
  newPage:"ទំព័រថ្មី",pageT:"ទំព័រវិគី",pageTitle:"ចំណងជើងទំព័រ",section:"ផ្នែក",pinT:"ខ្ទាស់ (បង្ហាញក្នុងគោលការណ៍ម៉ាក)",pageSaved:"បានរក្សាទុកទំព័រ",pageDeleted:"បានលុបទំព័រ",pageDel:"លុបទំព័រ",
  wikiNone:"មិនទាន់មានទំព័រ។ ចាប់ផ្តើមជាមួយគោលការណ៍ម៉ាក។",lastEdit:"កែដោយ {a} · {b}",useTpl:"ប្រើគំរូ",
  sec_brand:"គោលការណ៍ម៉ាក",sec_tone:"សម្លេងនិយាយ",sec_dos:"គួរធ្វើ និងមិនគួរធ្វើ",sec_hashtags:"Hashtag",sec_competitors:"គូប្រកួត",sec_contacts:"អ្នកអនុម័ត",sec_other:"ផ្សេងៗ",
  guide:"គោលការណ៍ម៉ាក",guideNone:"មិនទាន់មានទំព័រវិគីខ្ទាស់សម្រាប់អតិថិជននេះ។",filesOf:"ឯកសារអតិថិជន {a}",openFiles:"បើកឯកសារអតិថិជន",tMeet:"ប្រជុំជាមួយ {a} ថ្ងៃនេះ៖ {b}"});

const projects=[],meetings=[],wiki=[];
const WIKI_SECTIONS=["brand","tone","dos","hashtags","competitors","contacts","other"];
const WIKI_TPL={brand:"<h3>Logo</h3><p>Where the logo files are, and how to use them.</p><h3>Colours</h3><table><thead><tr><th>Name</th><th>Hex</th><th>Use</th></tr></thead><tbody><tr><td><br></td><td><br></td><td><br></td></tr></tbody></table><h3>Fonts</h3><ul><li><br></li></ul>",
  tone:"<h3>Our voice</h3><p><br></p><h3>Words we use</h3><ul><li><br></li></ul><h3>Words we avoid</h3><ul><li><br></li></ul>",
  dos:"<h3>Do</h3><ul><li><br></li></ul><h3>Don't</h3><ul><li><br></li></ul>",hashtags:"<ul><li>#</li></ul>",
  competitors:"<table><thead><tr><th>Competitor</th><th>Page</th><th>What they do well</th></tr></thead><tbody><tr><td><br></td><td><br></td><td><br></td></tr></tbody></table>",
  contacts:"<table><thead><tr><th>Name</th><th>Approves</th><th>Phone / Telegram</th></tr></thead><tbody><tr><td><br></td><td><br></td><td><br></td></tr></tbody></table>",other:""};
NAV.staff.splice(1,0,"clients");NAV.supervisor.splice(2,0,"clients");NAV.assistant.splice(2,0,"clients");
NAV.manager.splice(2,0,"clients");NAV.admin.splice(NAV.admin.indexOf("users")+1,0,"clients");
NI.clients='<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>';
BLOCKING.push("client","project","meeting","wikipage","guide");
Object.assign(S,{cq:"",cst:"active",ctab:"overview",cStage:"",cProj:"",cWho:"",cShowDone:false,wpage:"",openProj:""});

async function loadClientData(){
  const g=(c,o)=>pb.collection(c).getFullList(Object.assign({batch:500},o||{})).catch(()=>[]);
  const [p,m,w]=await Promise.all([g("projects",{sort:"-created"}),g("meetings",{sort:"-date,-created"}),g("wiki_pages",{sort:"-pinned,sort,title"})]);
  projects.length=0;p.forEach(r=>projects.push({id:r.id,client:r.client,name:r.name,goal:r.goal||"",start:r.start||"",end:r.end||"",status:r.status||"active",budget:r.budget_h||0,lead:r.lead||"",milestones:Array.isArray(r.milestones)?r.milestones:[]}));
  meetings.length=0;m.forEach(r=>meetings.push({id:r.id,client:r.client,project:r.project||"",title:r.title,date:r.date||"",attendees:r.attendees||[],guests:r.guests||"",body:r.body||"",actions:Array.isArray(r.actions)?r.actions:[],next:r.next_date||"",private:!!r.private,by:r.created_by}));
  wiki.length=0;w.forEach(r=>wiki.push({id:r.id,client:r.client,title:r.title,section:r.section||"other",body:r.body||"",pinned:!!r.pinned,by:r.created_by,editor:r.updated_by,updated:r.updated||""}));
}
const CL=id=>clients.find(c=>c.id===id);
const monthStart=()=>TODAY.slice(0,8)+"01";
/* staff see the clients they have tasks for; everyone else sees all */
function visibleClients(){const m=me();if(isTaskMgr(m))return clients.slice();const ids=new Set(tasks.map(k=>k.client).filter(Boolean));return clients.filter(c=>ids.has(c.id))}
function clientStats(c){
  const ks=tasks.filter(k=>k.client===c.id),open=ks.filter(k=>k.status!=="done"),ms=monthStart();
  const doneM=ks.filter(k=>k.status==="done"&&k.doneAt&&k.doneAt>=ms).length,late=open.filter(k=>k.due&&k.due<TODAY).length;
  const next=open.map(k=>k.due).filter(Boolean).sort()[0]||"";
  const logs=wlogs.filter(l=>l.client===c.id&&l.day>=ms),hrs=logs.reduce((a,l)=>a+l.hours,0);
  const cost=typeof tcosts!=="undefined"?tcosts.filter(x=>x.client===c.id&&x.day>=ms).reduce((a,x)=>a+x.cost,0):0;
  return {ks,open,doneM,late,next,hrs,cost};
}
const clientLogo=(c,cls)=>`<span class="clogo ${cls||""}">${c.logo?`<img src="${esc(c.logo)}" alt="">`:esc(initials(c.name||"?"))}</span>`;
const stChip=s=>`<span class="cstat cs-${s||"active"}">${t("st_"+(s||"active"))}</span>`;

/* ---------- list ---------- */
function vClients(){
  const m=me(),mgr=isMgr(m),all=visibleClients(),q=S.cq.trim().toLowerCase();
  const list=all.filter(c=>(S.cst==="all"||(c.status||"active")===S.cst)&&(!q||c.name.toLowerCase().includes(q)));
  const tab=(v,l)=>`<button data-act="cst" data-v="${v}" aria-pressed="${S.cst===v}">${t(l)}</button>`;
  return `<div class="head"><div class="rhead"><h1>${t("clientsT")}</h1></div>${mgr?`<button class="btn primary" data-act="cl-new">${t("newClientB")}</button>`:""}</div>
   <p class="muted">${t("clientsHelp2")}</p>
   <div class="cbar2"><input type="search" id="cl-q" placeholder="${t("cSearch")}" aria-label="${t("cSearch")}" value="${esc(S.cq)}" autocomplete="off">
    <div class="tabs" role="group">${tab("active","st_active")}${tab("paused","st_paused")}${tab("ended","st_ended")}${tab("all","cAll")}</div></div>
   ${list.length?`<div class="cgrid">${list.map(c=>{const s=clientStats(c);return `<button class="ccard" data-act="cl-open" data-id="${c.id}">
     <span class="cctop">${clientLogo(c)}<span class="ccname"><b>${esc(c.name)}</b>${stChip(c.status)}</span></span>
     <span class="ccnums"><span><b class="num">${s.open.length}</b> ${t("cOpen")}</span><span><b class="num">${s.doneM}</b> ${t("cDoneMonth")}</span><span class="${s.late?"late":""}"><b class="num">${s.late}</b> ${t("cOverdue")}</span></span>
     <span class="cap muted">${s.next?fill(t("cNextDue"),fmt(s.next)):"&nbsp;"}${c.owner&&U(c.owner)?` · ${esc(U(c.owner).name)}`:""}</span>
     ${mgr?`<span class="cap muted num">${Math.round(s.hrs*10)/10} ${t("hrs")} · ${typeof usd==="function"?usd(s.cost):""}</span>`:""}</button>`}).join("")}</div>`
     :`<p class="empty">${t(all.length||mgr?"cNone":"cNoneMine")}</p>`}`;
}

/* ---------- profile ---------- */
function vClient(){
  const c=CL(S.cid);if(!c){S.view="clients";return vClients()}
  const mgr=isMgr(me()),tab=(v,l)=>`<button data-act="ctab" data-v="${v}" aria-pressed="${S.ctab===v}">${t(l)}</button>`;
  const body={overview:cOverview,tasks:cTasks,projects:cProjects,meetings:cMeetings,wiki:cWiki,files:cFiles}[S.ctab]||cOverview;
  return `<button class="linkbtn backlink" data-act="cl-back">← ${t("back")}</button>
   <div class="chead">${clientLogo(c,"lg")}<div class="rhead"><h1>${esc(c.name)}</h1><span class="chmeta">${stChip(c.status)}${c.owner&&U(c.owner)?`<span class="cap muted">${t("accMgr")}: ${esc(U(c.owner).name)}</span>`:""}</span></div>
    ${mgr?`<button class="btn" data-act="cl-edit">${t("editClient")}</button>`:""}</div>
   <div class="tabs ctabs" role="group">${tab("overview","tOverview")}${tab("tasks","tTasks")}${tab("projects","tProjects")}${tab("meetings","tMeetings")}${tab("wiki","tWiki")}${tab("files","tFiles")}</div>
   ${body(c,mgr)}`;
}
function pkgUsage(c){
  const ms=monthStart();
  return (c.package||[]).filter(p=>p&&p.label).map(p=>{const n=tasks.filter(k=>k.client===c.id&&k.status==="done"&&k.doneAt>=ms&&(!p.type||k.type===p.type)).length;return {label:p.label,n,qty:+p.qty||0}});
}
function cOverview(c,mgr){
  const s=clientStats(c),pk=pkgUsage(c),ms=monthStart();
  const tile=(l,big)=>`<section class="kpi"><span class="lab muted">${l}</span><div class="row"><span class="big num">${big}</span></div></section>`;
  const recent=wlogs.filter(l=>l.client===c.id).slice().sort((a,b)=>(b.at||b.day).localeCompare(a.at||a.day)).slice(0,8);
  return `<div class="tiles">${tile(t("cOpen"),s.open.length)}${tile(t("cDoneMonth"),s.doneM)}${tile(t("cOverdue"),s.late)}${tile(t("hoursMonth"),Math.round(s.hrs*10)/10)}${mgr?tile(t("costMonth"),usd(s.cost)):""}</div>
   <div class="cov">
    <section class="card"><h2>${t("pkgT")}</h2>${pk.length?`<div class="pkgs">${pk.map(p=>`<div class="pkg ${p.qty&&p.n>=p.qty?"full":""}"><span><b>${esc(p.label)}</b><span class="cap muted"> · ${fill(t("pkgDone"),p.n,p.qty)}${p.qty&&p.n>=p.qty?" ✓":""}</span></span><span class="lbbar ${p.qty&&p.n>=p.qty?"full":""}"><i style="width:${p.qty?Math.min(100,p.n/p.qty*100):0}%"></i></span></div>`).join("")}</div>`:`<p class="muted">${t("pkgNone")}</p>`}<p class="cap muted">${t("pkgHelp")}</p></section>
    <section class="card"><h2>${t("contactsT")}</h2>${(c.contacts||[]).length?`<div class="contacts">${c.contacts.map(p=>`<div class="contact"><b>${esc(p.name||"")}</b>${p.role?` <span class="cap muted">· ${esc(p.role)}</span>`:""}
      <span class="cap">${[p.phone?`<a href="tel:${esc(p.phone)}">${esc(p.phone)}</a>`:"",p.tg?`<a href="https://t.me/${esc(String(p.tg).replace(/^@/,""))}" target="_blank" rel="noopener">${esc(p.tg)}</a>`:"",p.email?`<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>`:""].filter(Boolean).join(" · ")}</span></div>`).join("")}</div>`:`<p class="muted">${t("noContacts")}</p>`}
     ${c.address?`<p><span class="lab">${t("addrT")}</span><br>${esc(c.address)}</p>`:""}${c.notes?`<p><span class="lab">${t("notesT")}</span><br>${esc(c.notes)}</p>`:""}</section>
    <section class="card"><h2>${t("recent")}</h2>${recent.length?`<ul class="tllogs">${recent.map(l=>`<li><b>${esc((U(l.user)||{name:"?"}).name)}</b> · ${esc(nm(ST(l.stage))||"")} · ${esc(l.title)}${l.hours?` · ${fh(l.hours)}`:""} <span class="muted">· ${esc(fmt(l.day))}</span></li>`).join("")}</ul>`:`<p class="muted">${t("noRecent")}</p>`}</section>
   </div>`;
}
function cTasks(c){
  const all=tasks.filter(k=>k.client===c.id),open=all.filter(k=>k.status!=="done"),done=all.filter(k=>k.status==="done");
  const counts={};open.forEach(k=>{counts[k.stage]=(counts[k.stage]||0)+1});
  const stages=sortedSt().filter(s=>!s.done&&counts[s.id]);
  const f=k=>(!S.cStage||k.stage===S.cStage)&&(!S.cProj||k.project===S.cProj)&&(!S.cWho||k.to===S.cWho);
  const projs=projects.filter(p=>p.client===c.id),who=[...new Set(all.map(k=>k.to))].map(U).filter(Boolean);
  const list=sortT(open.filter(f));
  return `<div class="stagecounts"><button data-act="cstage" data-v="" aria-pressed="${!S.cStage}">${t("allStages")} <b class="num">${open.length}</b></button>${stages.map(s=>`<button data-act="cstage" data-v="${s.id}" aria-pressed="${S.cStage===s.id}"><span class="kdot sc-${s.color||"gray"}"></span>${esc(nm(s))} <b class="num">${counts[s.id]}</b></button>`).join("")}<span class="donecount">${t("done")} <b class="num">${done.length}</b></span></div>
   <div class="filters"><label class="f">${t("projectT")}<select data-cf="cProj"><option value="">${t("anyProject")}</option>${projs.map(p=>`<option value="${p.id}" ${S.cProj===p.id?"selected":""}>${esc(p.name)}</option>`).join("")}</select></label>
    <label class="f">${t("colPerson")}<select data-cf="cWho"><option value="">${t("anyone")}</option>${who.map(u=>`<option value="${u.id}" ${S.cWho===u.id?"selected":""}>${esc(u.name)}</option>`).join("")}</select></label></div>
   <div class="list">${list.length?list.map(k=>taskCard(k,true)).join(""):`<p class="empty">${t("none")}</p>`}</div>
   ${done.length?`<button class="btn small" data-act="cdone">${S.cShowDone?t("hideDone"):fill(t("showDone"),done.filter(f).length)}</button>${S.cShowDone?`<div class="list">${done.filter(f).sort((a,b)=>(b.doneAt||"").localeCompare(a.doneAt||"")).map(k=>taskCard(k,true)).join("")}</div>`:""}`:""}`;
}
function projStats(p){const ks=tasks.filter(k=>k.project===p.id),done=ks.filter(k=>k.status==="done").length,late=ks.filter(k=>k.status!=="done"&&k.due&&k.due<TODAY).length;
  const ids=new Set(ks.map(k=>k.id)),hrs=wlogs.filter(l=>ids.has(l.task)).reduce((a,l)=>a+l.hours,0);return {ks,done,late,hrs,pct:ks.length?Math.round(done/ks.length*100):0}}
function cProjects(c,mgr){
  const list=projects.filter(p=>p.client===c.id);
  return `${canProj(me())?`<div class="acts" style="justify-content:flex-start"><button class="btn primary small" data-act="pj-new">${t("newProject")}</button></div>`:""}
   ${list.length?`<div class="projs">${list.map(p=>{const s=projStats(p),open=S.openProj===p.id;return `<section class="proj">
     <button class="projhead" data-act="pj-toggle" data-id="${p.id}" aria-expanded="${open}"><span><b>${esc(p.name)}</b> ${stChip(p.status==="done"?"done":p.status)}<br><span class="cap muted">${p.start?esc(fmt(p.start)):""}${p.end?" – "+esc(fmt(p.end)):""}${p.goal?` · ${esc(p.goal)}`:""}</span></span>
      <span class="projnums"><span class="num"><b>${s.pct}%</b></span><span class="cap muted">${fill(t("tasksOf"),s.done,s.ks.length)}${s.late?` · <span class="late">${s.late} ${t("cOverdue")}</span>`:""} · ${p.budget?fill(t("hoursOf"),Math.round(s.hrs*10)/10,p.budget):fill(t("hoursUsed"),Math.round(s.hrs*10)/10)}</span></span></button>
     <span class="lbbar ${s.pct>=100?"full":""}"><i style="width:${s.pct}%"></i></span>
     ${p.budget?`<span class="budgetbar ${s.hrs>p.budget?"over":""}"><i style="width:${Math.min(100,s.hrs/p.budget*100)}%"></i></span>`:""}
     ${open?`<div class="list">${s.ks.length?sortT(s.ks).map(k=>taskCard(k,true)).join(""):`<p class="empty">${t("none")}</p>`}</div>${canProj(me())?`<button class="btn small" data-act="pj-edit" data-id="${p.id}">${t("editT")}</button>`:""}`:""}</section>`}).join("")}</div>`:`<p class="empty">${t("projNone")}</p>`}`;
}
function cMeetings(c,mgr){
  const list=meetings.filter(m=>m.client===c.id);
  return `${mgr?`<div class="acts" style="justify-content:flex-start"><button class="btn primary small" data-act="mt-new">${t("newMeeting")}</button></div>`:""}
   ${list.length?`<div class="rows">${list.map(m=>{const open=(m.actions||[]).filter(a=>a&&a.text&&!a.done).length;return `<button class="mrow" data-act="mt-open" data-id="${m.id}"><span class="mdate num">${m.date?esc(fmt(m.date)):"–"}</span>
     <span><b>${esc(m.title)}</b>${m.private?` <span class="cstat cs-paused">🔒 ${t("privateM")}</span>`:""}<br><span class="cap muted">${m.attendees.map(U).filter(Boolean).map(u=>esc(u.name)).join(", ")}${open?` · ${fill(t("actionsOpen"),open)}`:""}${m.next?` · ${t("nextMeet")}: ${esc(fmt(m.next))}`:""}</span></span></button>`}).join("")}</div>`:`<p class="empty">${t("meetNone")}</p>`}`;
}
function cWiki(c,mgr){
  const list=wiki.filter(w=>w.client===c.id),cur=list.find(w=>w.id===S.wpage)||list.find(w=>w.pinned)||list[0];
  const groups=WIKI_SECTIONS.map(s=>({s,items:list.filter(w=>(w.section||"other")===s)})).filter(g=>g.items.length);
  return `<div class="acts" style="justify-content:flex-start"><button class="btn primary small" data-act="wk-new">${t("newPage")}</button></div>
   ${list.length?`<div class="wiki"><nav class="wikinav" aria-label="${t("tWiki")}">${groups.map(g=>`<span class="lab">${t("sec_"+g.s)}</span>${g.items.map(w=>`<button data-act="wk-page" data-id="${w.id}" aria-current="${cur&&cur.id===w.id?"page":"false"}">${w.pinned?"📌 ":""}${esc(w.title)}</button>`).join("")}`).join("")}</nav>
    <article class="wikipage">${cur?`<div class="wphead"><div><h2>${esc(cur.title)}</h2><span class="cap muted">${t("sec_"+(cur.section||"other"))} · ${fill(t("lastEdit"),esc((U(cur.editor)||U(cur.by)||{name:"?"}).name),esc(fmtStamp(cur.updated)))}</span></div><button class="btn small" data-act="wk-edit" data-id="${cur.id}">${t("editT")}</button></div>
     <div class="rt-view">${cleanHTML(cur.body)||`<p class="muted">—</p>`}</div>`:""}</article></div>`:`<p class="empty">${t("wikiNone")}</p>`}`;
}
function fmtStamp(s){if(!s)return "";try{const d=new Date(s.replace(" ","T"));return fmt(iso(d))}catch(e){return s.slice(0,10)}}
function cFiles(c){const n=docs.filter(d=>d.area==="client"&&d.client===c.id).length;
  return `<section class="card"><p>${fill(t("filesOf"),n)}</p><button class="btn primary" data-act="gofiles" data-c="${c.id}" style="align-self:flex-start">${t("openFiles")}</button></section>`}

/* ---------- dialogs ---------- */
function dClient(){
  const d=S.dlg.draft,mgrs=users.filter(u=>u.active&&u.role!=="staff");
  const row=(arr,i,keys,kind)=>`<div class="erow">${keys.map(([k,l,type])=>type==="type"?`<label class="f">${t(l)}<select data-${kind}="${i}:${k}"><option value="">${t("anyTypeP")}</option>${ttypes.map(x=>`<option value="${x.id}" ${arr[i][k]===x.id?"selected":""}>${esc(nm(x))}</option>`).join("")}</select></label>`
    :`<label class="f">${t(l)}<input type="${type||"text"}" data-${kind}="${i}:${k}" value="${esc(arr[i][k]||"")}" ${type==="number"?'min="0" max="999"':'maxlength="120"'}></label>`).join("")}<button type="button" class="btn small" data-act="cd-rm" data-k="${kind==="cc"?"contacts":"package"}" data-i="${i}">${t("removeRow")}</button></div>`;
  return `<h2>${d.id?t("editClient"):t("newClientB")}</h2><p class="err" id="cd-err" role="alert" hidden></p>
   <div class="two"><label class="f">${t("cName")}<input type="text" data-cd="name" value="${esc(d.name)}" maxlength="60"></label>
    <label class="f">${t("cStatus")}<select data-cd="status">${["active","paused","ended"].map(s=>`<option value="${s}" ${d.status===s?"selected":""}>${t("st_"+s)}</option>`).join("")}</select></label></div>
   <div class="two"><label class="f">${t("accMgr")}<select data-cd="owner"><option value="">—</option>${mgrs.map(u=>`<option value="${u.id}" ${d.owner===u.id?"selected":""}>${esc(u.name)}</option>`).join("")}</select></label>
    <label class="f">${t("logoT")}<input type="file" id="cd-logo" accept="image/jpeg,image/png,image/webp,image/svg+xml"></label></div>
   <label class="f">${t("addrT")}<input type="text" data-cd="address" value="${esc(d.address)}" maxlength="300"></label>
   <label class="f">${t("notesT")}<textarea data-cd="notes" rows="2" maxlength="2000">${esc(d.notes)}</textarea></label>
   <div class="stack" style="gap:6px"><span class="lab">${t("contactsT")}</span>${d.contacts.map((x,i)=>row(d.contacts,i,[["name","name"],["role","cRole"],["phone","cPhone","tel"],["tg","cTg"],["email","cEmail","email"]],"cc")).join("")}<button type="button" class="btn small" data-act="cd-add" data-k="contacts" style="align-self:flex-start">${t("addContact")}</button></div>
   <div class="stack" style="gap:6px"><span class="lab">${t("pkgT")}</span><span class="cap muted">${t("pkgHelp")}</span>${d.package.map((x,i)=>row(d.package,i,[["label","pkgLabel"],["type","pkgType","type"],["qty","pkgQty","number"]],"cp")).join("")}<button type="button" class="btn small" data-act="cd-add" data-k="package" style="align-self:flex-start">${t("addPkg")}</button></div>
   <div class="acts"><button class="btn" data-act="close">${t("cancel")}</button><button class="btn primary" data-act="cd-save">${t("saveT")}</button></div>`;
}
const canProj=u=>!!u&&["admin","manager","assistant"].includes(u.role);
function dProject(){const d=S.dlg.draft,leads=users.filter(u=>u.active);
  return `<h2>${d.id?t("editT")+": "+esc(d.name):t("newProject")}</h2><p class="err" id="pj-err" role="alert" hidden></p>
   ${!d.id&&d.pickClient?`<label class="f">${t("client")}<select data-pd="client"><option value="">${t("pickOne")}</option>${clients.filter(c=>(c.status||"active")!=="ended").map(c=>`<option value="${c.id}" ${d.client===c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select></label>`:""}
   <label class="f">${t("projName")}<input type="text" data-pd="name" value="${esc(d.name)}" maxlength="120"></label>
   <label class="f">${t("projGoal")}<textarea data-pd="goal" rows="2" maxlength="1000">${esc(d.goal)}</textarea></label>
   <div class="two"><label class="f">${t("projStart")}<input type="date" data-pd="start" value="${esc(d.start)}"></label><label class="f">${t("projEnd")}<input type="date" data-pd="end" value="${esc(d.end)}"></label></div>
   <div class="two"><label class="f">${t("cStatus")}<select data-pd="status">${["active","paused","done"].map(s=>`<option value="${s}" ${d.status===s?"selected":""}>${t("st_"+s)}</option>`).join("")}</select></label>
    <label class="f">${t("projBudget")}<input type="number" min="0" step="0.5" data-pd="budget" value="${d.budget||""}"></label></div>
   <label class="f">${t("projLead")}<select data-pd="lead"><option value="">—</option>${leads.map(u=>`<option value="${u.id}" ${d.lead===u.id?"selected":""}>${esc(u.name)}</option>`).join("")}</select></label>
   <div class="stack" style="gap:6px"><span class="lab">${t("milestonesT")}</span><span class="cap muted">${t("milestonesHelp")}</span>
    ${(d.milestones||[]).map((m,i)=>`<div class="arow ms"><span class="cap muted num">${i+1}</span><input type="text" data-ms="${i}:name" value="${esc(m.name||"")}" maxlength="80" placeholder="${t("msName")}" aria-label="${t("msName")}"><input type="date" data-ms="${i}:due" value="${esc(m.due||"")}" aria-label="${t("due")}"><button type="button" class="btn small" data-act="ms-rm" data-i="${i}" aria-label="${t("removeRow")}">×</button></div>`).join("")}
    <button type="button" class="btn small" data-act="ms-add" style="align-self:flex-start">${t("addMs")}</button></div>
   <div class="acts">${d.id?`<button class="btn ${S.arm==="pjdel"?"danger":""}" data-act="pj-del">${S.arm==="pjdel"?t("delConfirm"):t("projDel")}</button><span class="spacer"></span>`:""}<button class="btn" data-act="close">${t("cancel")}</button><button class="btn primary" data-act="pj-save">${t("saveT")}</button></div>`}
function dMeeting(){
  const d=S.dlg.draft,mgr=isMgr(me()),c=CL(d.client);
  if(!mgr){const m=d;return `<h2>${esc(m.title)}</h2><p class="meta"><span>${esc(c?c.name:"")}</span><span>${m.date?esc(fmt(m.date)):""}</span>${m.private?`<span>🔒 ${t("privateM")}</span>`:""}</p>
   ${m.attendees.length||m.guests?`<p class="cap muted">${m.attendees.map(U).filter(Boolean).map(u=>esc(u.name)).join(", ")}${m.guests?` · ${esc(m.guests)}`:""}</p>`:""}
   <div class="rt-view">${cleanHTML(m.body)}</div>
   ${m.actions.length?`<div class="stack"><span class="lab">${t("actions")}</span><ul class="actlist">${m.actions.map(a=>`<li class="${a.done?"isdone":""}">${a.done?"✓ ":"○ "}${esc(a.text)}${a.task&&tasks.some(k=>k.id===a.task)?` <button class="linkbtn" data-act="mt-task" data-id="${a.task}">${t("openTask")}</button>`:""}</li>`).join("")}</ul></div>`:""}
   ${m.next?`<p><b>${t("nextMeet")}:</b> ${esc(fmt(m.next))}</p>`:""}<div class="acts"><button class="btn" data-act="close">${t("close")}</button></div>`}
  const projs=projects.filter(p=>p.client===d.client&&p.status!=="done"||p.id===d.project);
  return `<h2>${d.id?t("meetT"):t("newMeeting")}</h2><p class="err" id="mt-err" role="alert" hidden></p>
   <div class="two"><label class="f">${t("meetTitle")}<input type="text" data-md="title" value="${esc(d.title)}" maxlength="160"></label><label class="f">${t("meetDate")}<input type="date" data-md="date" value="${esc(d.date)}"></label></div>
   <label class="f">${t("projectT")}<select data-md="project"><option value="">${t("noProject")}</option>${projs.map(p=>`<option value="${p.id}" ${d.project===p.id?"selected":""}>${esc(p.name)}</option>`).join("")}</select></label>
   <div class="stack" style="gap:4px"><span class="lab">${t("attendees")}</span><div class="ppl">${users.filter(u=>u.active).map(u=>`<label class="c"><input type="checkbox" data-mat="${u.id}" ${d.attendees.includes(u.id)?"checked":""}>${esc(u.name)}</label>`).join("")}</div></div>
   <label class="f">${t("guests")}<input type="text" data-md="guests" value="${esc(d.guests)}" maxlength="500"></label>
   <label class="c"><input type="checkbox" data-md-b="private" ${d.private?"checked":""}>🔒 ${t("privateM")} <span class="cap muted">· ${t("privateHelp")}</span></label>
   <div class="stack" style="gap:6px"><span class="lab">${t("notesT")}</span>${rtEditor("mt-body",S.dlg.body||"")}</div>
   <div class="stack" style="gap:6px"><span class="lab">${t("actions")}</span>${d.actions.map((a,i)=>`<div class="arow"><input type="checkbox" data-ma-done="${i}" ${a.done?"checked":""} aria-label="${t("done")}"><input type="text" data-ma="${i}" value="${esc(a.text||"")}" maxlength="300">
     ${a.task&&tasks.some(k=>k.id===a.task)?`<button type="button" class="btn small" data-act="mt-task" data-id="${a.task}">${t("openTask")}</button>`:d.id&&a.text?`<button type="button" class="btn small" data-act="mt-maketask" data-i="${i}">${t("makeTask")}</button>`:""}
     <button type="button" class="btn small" data-act="ma-rm" data-i="${i}" aria-label="${t("removeRow")}">×</button></div>`).join("")}
    <button type="button" class="btn small" data-act="ma-add" style="align-self:flex-start">${t("addAction")}</button></div>
   <label class="f">${t("nextMeet")}<input type="date" data-md="next" value="${esc(d.next)}" style="max-width:220px"></label>
   <div class="acts">${d.id?`<button class="btn ${S.arm==="mtdel"?"danger":""}" data-act="mt-del">${S.arm==="mtdel"?t("delConfirm"):t("meetDel")}</button><span class="spacer"></span>`:""}<button class="btn" data-act="close">${t("cancel")}</button><button class="btn primary" data-act="mt-save">${t("saveT")}</button></div>`;
}
function dWikiPage(){const d=S.dlg.draft,canDel=d.id&&(isMgr(me())||d.by===S.me);
  return `<h2>${d.id?t("editT"):t("newPage")}</h2><p class="err" id="wk-err" role="alert" hidden></p>
   <div class="two"><label class="f">${t("pageTitle")}<input type="text" data-wd="title" value="${esc(d.title)}" maxlength="160"></label>
    <label class="f">${t("section")}<select data-wd="section">${WIKI_SECTIONS.map(s=>`<option value="${s}" ${d.section===s?"selected":""}>${t("sec_"+s)}</option>`).join("")}</select></label></div>
   <label class="c"><input type="checkbox" data-wd-b="pinned" ${d.pinned?"checked":""}>📌 ${t("pinT")}</label>
   <div class="stack" style="gap:6px"><span class="lab">${t("notesT")} ${WIKI_TPL[d.section]?`<button type="button" class="linkbtn" data-act="wk-tpl">${t("useTpl")}</button>`:""}</span>${rtEditor("wk-body",S.dlg.body||"")}</div>
   <div class="acts">${canDel?`<button class="btn ${S.arm==="wkdel"?"danger":""}" data-act="wk-del">${S.arm==="wkdel"?t("delConfirm"):t("pageDel")}</button><span class="spacer"></span>`:""}<button class="btn" data-act="close">${t("cancel")}</button><button class="btn primary" data-act="wk-save">${t("saveT")}</button></div>`}
function dGuide(){const c=CL(S.dlg.cid),pages=wiki.filter(w=>w.client===S.dlg.cid&&w.pinned);
  return `<h2>${t("guide")}: ${esc(c?c.name:"")}</h2>${pages.length?pages.map(w=>`<section class="guidepage"><h3>${esc(w.title)}</h3><div class="rt-view">${cleanHTML(w.body)}</div></section>`).join(""):`<p class="empty">${t("guideNone")}</p>`}
   <div class="acts"><button class="btn" data-act="guide-wiki" data-c="${S.dlg.cid}">${t("tWiki")}</button><button class="btn" data-act="guide-back">${t("close")}</button></div>`}

/* add task / task dialog: project picker, brand guide */
function projectField(clientId,cur,id){const ps=projects.filter(p=>p.client===clientId&&(p.status!=="done"||p.id===cur));if(!clientId||!ps.length)return "";
  return `<label class="f">${t("projectT")}<select id="${id}" ${id==="tk-project"?'data-x="setproj"':""}><option value="">${t("noProject")}</option>${ps.map(p=>`<option value="${p.id}" ${p.id===cur?"selected":""}>${esc(p.name)}</option>`).join("")}</select></label>`}
function guideBtn(k){return k.client&&wiki.some(w=>w.client===k.client&&w.pinned)?`<button class="btn small" data-act="guide" data-c="${k.client}" style="align-self:flex-start">📘 ${t("guide")}</button>`:""}
/* called by Add task after a task is saved: link it back to the meeting action it came from */
async function afterTaskCreated(task){const fm=S.fromMeeting;S.fromMeeting=null;if(!fm)return;const m=meetings.find(x=>x.id===fm.id);if(!m)return;
  const actions=m.actions.map((a,i)=>i===fm.i?Object.assign({},a,{task:task.id}):a);try{await pb.collection("meetings").update(m.id,{actions})}catch(e){}}

/* ---------- events ---------- */
const draftClient=c=>({id:c?c.id:null,name:c?c.name:"",status:c?(c.status||"active"):"active",owner:c?(c.owner||""):"",address:c?(c.address||""):"",notes:c?(c.notes||""):"",
  contacts:JSON.parse(JSON.stringify(c&&c.contacts||[])),package:JSON.parse(JSON.stringify(c&&c.package||[]))});
document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  const mine=["cst","cl-new","cl-open","cl-back","cl-edit","ctab","cstage","cdone","cd-add","cd-rm","cd-save","pj-new","pj-toggle","pj-edit","pj-save","pj-del","ms-add","ms-rm","mt-new","mt-open","mt-save","mt-del","ma-add","ma-rm","mt-maketask","mt-task",
    "wk-new","wk-page","wk-edit","wk-save","wk-del","wk-tpl","guide","guide-back","guide-wiki"];
  if(!mine.includes(a))return;e.preventDefault();e.stopImmediatePropagation();
  const c=CL(S.cid),id=b.dataset.id;
  switch(a){
    case "cst":S.cst=b.dataset.v;render();return;
    case "cl-new":S.dlg={type:"client",draft:draftClient(null)};render();return;
    case "cl-open":S.view="client";S.cid=id;S.ctab="overview";S.cStage="";S.cProj="";S.cWho="";S.wpage="";render();window.scrollTo(0,0);return;
    case "cl-back":S.view="clients";render();return;
    case "cl-edit":S.dlg={type:"client",draft:draftClient(c)};render();return;
    case "ctab":S.ctab=b.dataset.v;render();return;
    case "cstage":S.cStage=b.dataset.v;render();return;
    case "cdone":S.cShowDone=!S.cShowDone;render();return;
    case "cd-add":S.dlg.draft[b.dataset.k].push(b.dataset.k==="contacts"?{name:"",role:"",phone:"",tg:"",email:""}:{label:"",type:"",qty:""});render();return;
    case "cd-rm":S.dlg.draft[b.dataset.k].splice(+b.dataset.i,1);render();return;
    case "cd-save":{const d=S.dlg.draft,er=document.getElementById("cd-err");if(!d.name.trim()){er.textContent=t("clientNameReq");er.hidden=false;return}
      if(!d.id&&clients.some(x=>x.name.toLowerCase()===d.name.trim().toLowerCase())){er.textContent=t("clientDup");er.hidden=false;return}
      const fd=new FormData();fd.append("name",d.name.trim());fd.append("status",d.status);fd.append("owner",d.owner);fd.append("address",d.address);fd.append("notes",d.notes);
      fd.append("contacts",JSON.stringify(d.contacts.filter(x=>x.name||x.phone||x.email||x.tg)));fd.append("package",JSON.stringify(d.package.filter(x=>x.label).map(x=>({label:x.label,type:x.type,qty:+x.qty||0}))));
      const lf=document.getElementById("cd-logo").files[0];if(lf)fd.append("logo",await shrinkPhoto(lf).catch(()=>lf));
      if(!d.id)fd.append("created_by",S.me);
      b.disabled=true;try{const r=d.id?await pb.collection("clients").update(d.id,fd):await pb.collection("clients").create(fd);S.dlg=null;if(!d.id){S.view="client";S.cid=r.id;S.ctab="overview"}await refresh(true);toast(t("clientSaved2"))}
      catch(x){b.disabled=false;er.textContent=(x&&x.message)||t("error");er.hidden=false}return}
    case "pj-new":{const fromList=S.view==="projects";S.arm=null;S.dlg={type:"project",draft:{id:null,client:fromList?"":S.cid,pickClient:fromList,name:"",goal:"",start:TODAY,end:"",status:"active",budget:"",lead:S.me,milestones:[]}};render();return}
    case "ms-add":S.dlg.draft.milestones=S.dlg.draft.milestones||[];S.dlg.draft.milestones.push({id:"m"+Date.now().toString(36),name:"",due:""});render();return;
    case "ms-rm":S.dlg.draft.milestones.splice(+b.dataset.i,1);render();return;
    case "pj-toggle":S.openProj=S.openProj===id?"":id;render();return;
    case "pj-edit":{const p=projects.find(x=>x.id===id);S.arm=null;S.dlg={type:"project",draft:Object.assign({},p,{milestones:JSON.parse(JSON.stringify(p.milestones||[]))})};render();return}
    case "pj-save":{const d=S.dlg.draft,er=document.getElementById("pj-err");
      if(!d.id&&!d.client){er.textContent=t("clientReq2");er.hidden=false;return}
      if(!d.name.trim()){er.textContent=t("projNameReq");er.hidden=false;return}
      const data={name:d.name.trim(),goal:d.goal,start:d.start,end:d.end,status:d.status,budget_h:parseFloat(d.budget)||0,lead:d.lead||"",
        milestones:(d.milestones||[]).filter(m=>m.name&&m.name.trim()).map(m=>({id:m.id||("m"+Math.random().toString(36).slice(2,8)),name:m.name.trim(),due:m.due||""}))};
      const fromList=!!d.pickClient;S.dlg=null;
      run(async()=>{const r=d.id?await pb.collection("projects").update(d.id,data):await pb.collection("projects").create(Object.assign(data,{client:d.client,created_by:S.me}));if(fromList){S.view="project";S.pid=r.id}},t("projSaved"));return}
    case "pj-del":{if(S.arm!=="pjdel"){S.arm="pjdel";render();return}S.arm=null;const pid=S.dlg.draft.id;S.dlg=null;run(()=>pb.collection("projects").delete(pid),t("projDeleted"));return}
    case "mt-new":S.arm=null;S.dlg={type:"meeting",body:t("meetTpl"),draft:{id:null,client:S.cid,project:"",title:"",date:TODAY,attendees:[S.me],guests:"",actions:[{text:"",done:false}],next:"",private:false}};render();return;
    case "mt-open":{const m=meetings.find(x=>x.id===id);S.arm=null;S.dlg={type:"meeting",body:m.body,draft:JSON.parse(JSON.stringify(m))};render();return}
    case "ma-add":keepMeet();S.dlg.draft.actions.push({text:"",done:false});render();return;
    case "ma-rm":keepMeet();S.dlg.draft.actions.splice(+b.dataset.i,1);render();return;
    case "mt-save":{keepMeet();const d=S.dlg.draft,er=document.getElementById("mt-err");if(!d.title.trim()){er.textContent=t("nameReq");er.hidden=false;return}
      const data={title:d.title.trim(),date:d.date,project:d.project,attendees:d.attendees,guests:d.guests,body:cleanHTML(S.dlg.body||""),actions:d.actions.filter(x=>x.text&&x.text.trim()),next_date:d.next,private:!!d.private};
      S.dlg=null;run(()=>d.id?pb.collection("meetings").update(d.id,data):pb.collection("meetings").create(Object.assign(data,{client:d.client,created_by:S.me})),t("meetSaved"));return}
    case "mt-del":{if(S.arm!=="mtdel"){S.arm="mtdel";render();return}S.arm=null;const mid=S.dlg.draft.id;S.dlg=null;run(()=>pb.collection("meetings").delete(mid),t("meetDeleted"));return}
    case "mt-maketask":{keepMeet();const d=S.dlg.draft,i=+b.dataset.i,act=d.actions[i];
      try{await pb.collection("meetings").update(d.id,{actions:d.actions,body:cleanHTML(S.dlg.body||"")});await loadClientData()}catch(x){}
      S.fromMeeting={id:d.id,i};S.dlg={type:"new",dup:{title:act.text.slice(0,120),client:d.client,type:"",prio:"",est:""},dupProject:d.project||""};render();return}
    case "mt-task":S.dlg={type:"task",id};render();return;
    case "wk-new":S.arm=null;S.dlg={type:"wikipage",body:WIKI_TPL.brand,draft:{id:null,client:S.cid,title:"",section:"brand",pinned:false}};render();return;
    case "wk-page":S.wpage=id;render();return;
    case "wk-edit":{const w=wiki.find(x=>x.id===id);S.arm=null;S.dlg={type:"wikipage",body:w.body,draft:{id:w.id,client:w.client,title:w.title,section:w.section,pinned:w.pinned,by:w.by}};render();return}
    case "wk-tpl":{const area=document.querySelector(".dlg [data-rta]"),html=WIKI_TPL[S.dlg.draft.section]||"";if(area){area.innerHTML=cleanHTML(html);S.dlg.body=area.innerHTML}return}
    case "wk-save":{const d=S.dlg.draft,er=document.getElementById("wk-err");if(!d.title.trim()){er.textContent=t("nameReq");er.hidden=false;return}
      const data={title:d.title.trim(),section:d.section,pinned:!!d.pinned,body:cleanHTML(S.dlg.body||""),updated_by:S.me};
      S.dlg=null;run(async()=>{const r=d.id?await pb.collection("wiki_pages").update(d.id,data):await pb.collection("wiki_pages").create(Object.assign(data,{client:d.client,created_by:S.me}));S.wpage=r.id},t("pageSaved"));return}
    case "wk-del":{if(S.arm!=="wkdel"){S.arm="wkdel";render();return}S.arm=null;const wid=S.dlg.draft.id;S.dlg=null;S.wpage="";run(()=>pb.collection("wiki_pages").delete(wid),t("pageDeleted"));return}
    case "guide":S.dlg={type:"guide",cid:b.dataset.c,back:S.dlg};render();return;
    case "guide-back":S.dlg=S.dlg.back||null;render();return;
    case "guide-wiki":S.dlg=null;S.view="client";S.cid=b.dataset.c;S.ctab="wiki";render();return;
  }
},true);
function keepMeet(){const d=S.dlg&&S.dlg.draft;if(!d)return;document.querySelectorAll(".dlg [data-ma]").forEach(el=>{d.actions[+el.dataset.ma].text=el.value});
  document.querySelectorAll(".dlg [data-ma-done]").forEach(el=>{d.actions[+el.dataset.maDone].done=el.checked});
  const area=document.querySelector(".dlg [data-rta]");if(area)S.dlg.body=area.innerHTML}
document.addEventListener("input",e=>{const el=e.target;if(!S.dlg||!S.dlg.draft){if(el.id==="cl-q"){S.cq=el.value;const pos=el.selectionStart;render();const n=document.getElementById("cl-q");if(n){n.focus();n.setSelectionRange(pos,pos)}}return}
  const d=S.dlg.draft;
  if(el.dataset.cd){d[el.dataset.cd]=el.value;return}
  if(el.dataset.cc){const [i,k]=el.dataset.cc.split(":");d.contacts[+i][k]=el.value;return}
  if(el.dataset.cp){const [i,k]=el.dataset.cp.split(":");d.package[+i][k]=el.value;return}
  if(el.dataset.pd){d[el.dataset.pd]=el.value;return}
  if(el.dataset.ms){const [i,k]=el.dataset.ms.split(":");d.milestones[+i][k]=el.value;return}
  if(el.dataset.md){d[el.dataset.md]=el.value;return}
  if(el.dataset.wd){d[el.dataset.wd]=el.value;return}
},true);
document.addEventListener("change",e=>{const el=e.target;
  if(el.dataset.cf){e.stopImmediatePropagation();S[el.dataset.cf]=el.value;render();return}
  if(el.dataset.x==="setproj"){e.stopImmediatePropagation();run(()=>pb.collection("tasks").update(S.dlg.id,{project:el.value,milestone:""}));return}
  if(!S.dlg||!S.dlg.draft)return;const d=S.dlg.draft;
  if(el.dataset.cd){d[el.dataset.cd]=el.value;return}
  if(el.dataset.cp){const [i,k]=el.dataset.cp.split(":");d.package[+i][k]=el.value;return}
  if(el.dataset.pd){d[el.dataset.pd]=el.value;return}
  if(el.dataset.md){d[el.dataset.md]=el.value;return}
  if(el.dataset.mdB){d[el.dataset.mdB]=el.checked;return}
  if(el.dataset.mat){const u=el.dataset.mat;if(el.checked){if(!d.attendees.includes(u))d.attendees.push(u)}else d.attendees=d.attendees.filter(x=>x!==u);return}
  if(el.dataset.wd){d[el.dataset.wd]=el.value;if(el.dataset.wd==="section")render();return}
  if(el.dataset.wdB){d[el.dataset.wdB]=el.checked;return}
},true);
