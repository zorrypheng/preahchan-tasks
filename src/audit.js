/* ---------- Activity log and recycle bin (admins and managers) ---------- */
Object.assign(T.en,{n_audit:"Activity",auditT:"Activity log",auditHelp:"Every change in the last 30 days: who did what, and when. Undo a change or bring back something deleted.",
  aTabLog:"Activity",aTabBin:"Recycle bin",aAll:"Everything",aAnyone:"Anyone",aSystem:"System",aSearch:"Search",
  ac_create:"created",ac_update:"changed",ac_delete:"deleted",ac_restore:"restored",undo:"Undo",restoreB:"Restore",restoredTag:"Restored {a}",
  daysLeftN:"{a} days left",lastDayLeft:"Last day",binHelp:"Deleted items can be brought back for 30 days. Uploaded files themselves can't come back, only their details.",
  binNone:"Nothing deleted in the last 30 days.",logNone:"No activity yet.",loadMore:"Load more",restoredOk:"Restored",restoredMore:"Restored, with {a} related items",
  undoAsk:"Put back the earlier values of this {a}?",restoreAsk:"Bring back this {a}?",openItem:"Open",
  col_tasks:"task",col_clients:"client",col_projects:"project",col_meetings:"meeting note",col_wiki_pages:"wiki page",col_comments:"comment",col_documents:"file",col_attachments:"attachment",
  col_statuses:"status",col_task_types:"task type",col_positions:"position",col_users:"person",col_salaries:"salary",col_work_logs:"work log",col_templates:"template",col_crews:"crew",col_reports:"report",
  f_title:"Title",f_assignee:"Assigned to",f_stage:"Status",f_status:"Status",f_due:"Due",f_priority:"Priority",f_est:"Estimate",f_client:"Client",f_type:"Type",f_project:"Project",
  f_body:"Description",f_desc:"Description",f_spent:"Hours",f_plan:"Stage plan",f_est_plan:"Stage estimates",f_name:"Name",f_hours:"Hours",f_note:"Note",f_monthly:"Salary",f_role:"Role",f_kpi:"KPI",
  f_cap:"Weekly hours",f_active:"Active",f_positions:"Positions",f_text:"Text",f_del_by:"Delete request",f_del_reason:"Delete reason",f_done_at:"Finished on",f_repeat:"Repeats",f_section:"Section",f_pinned:"Pinned"});
Object.assign(T.km,{n_audit:"សកម្មភាព",auditT:"កំណត់ហេតុសកម្មភាព",auditHelp:"ការផ្លាស់ប្តូរទាំងអស់ក្នុង 30 ថ្ងៃចុងក្រោយ៖ អ្នកណាធ្វើអ្វី ពេលណា។ មិនធ្វើវិញ ឬយកមកវិញនូវអ្វីដែលបានលុប។",
  aTabLog:"សកម្មភាព",aTabBin:"ធុងសំរាម",aAll:"ទាំងអស់",aAnyone:"គ្រប់គ្នា",aSystem:"ប្រព័ន្ធ",aSearch:"ស្វែងរក",
  ac_create:"បានបង្កើត",ac_update:"បានកែ",ac_delete:"បានលុប",ac_restore:"បានយកមកវិញ",undo:"មិនធ្វើវិញ",restoreB:"យកមកវិញ",restoredTag:"បានយកមកវិញ {a}",
  daysLeftN:"នៅសល់ {a} ថ្ងៃ",lastDayLeft:"ថ្ងៃចុងក្រោយ",binHelp:"របស់ដែលបានលុបអាចយកមកវិញបានក្នុង 30 ថ្ងៃ។ ឯកសារដែលបានផ្ទុកមិនអាចយកមកវិញបានទេ មានតែព័ត៌មានប៉ុណ្ណោះ។",
  binNone:"មិនមានអ្វីត្រូវបានលុបក្នុង 30 ថ្ងៃចុងក្រោយ។",logNone:"មិនទាន់មានសកម្មភាព។",loadMore:"ផ្ទុកបន្ថែម",restoredOk:"បានយកមកវិញ",restoredMore:"បានយកមកវិញ រួមទាំង {a} ផ្សេងទៀត",
  undoAsk:"ដាក់តម្លៃចាស់នៃ {a} នេះវិញ?",restoreAsk:"យក {a} នេះមកវិញ?",openItem:"បើក",
  col_tasks:"ភារកិច្ច",col_clients:"អតិថិជន",col_projects:"គម្រោង",col_meetings:"កំណត់ត្រាប្រជុំ",col_wiki_pages:"ទំព័រវិគី",col_comments:"មតិ",col_documents:"ឯកសារ",col_attachments:"ឯកសារភ្ជាប់",
  col_statuses:"ស្ថានភាព",col_task_types:"ប្រភេទការងារ",col_positions:"តួនាទី",col_users:"បុគ្គល",col_salaries:"ប្រាក់ខែ",col_work_logs:"កំណត់ត្រាការងារ",col_templates:"គំរូ",col_crews:"ក្រុម",col_reports:"របាយការណ៍",
  f_title:"ចំណងជើង",f_assignee:"ចាត់ឱ្យ",f_stage:"ស្ថានភាព",f_status:"ស្ថានភាព",f_due:"កំណត់",f_priority:"អាទិភាព",f_est:"ម៉ោងប៉ាន់",f_client:"អតិថិជន",f_type:"ប្រភេទ",f_project:"គម្រោង",
  f_body:"ការពិពណ៌នា",f_desc:"ការពិពណ៌នា",f_spent:"ម៉ោង",f_plan:"ផែនការដំណាក់កាល",f_est_plan:"ម៉ោងប៉ាន់តាមដំណាក់កាល",f_name:"ឈ្មោះ",f_hours:"ម៉ោង",f_note:"កំណត់ចំណាំ",f_monthly:"ប្រាក់ខែ",f_role:"តួនាទី",f_kpi:"KPI",
  f_cap:"ម៉ោងប្រចាំសប្តាហ៍",f_active:"សកម្ម",f_positions:"តួនាទី",f_text:"អត្ថបទ",f_del_by:"សំណើលុប",f_del_reason:"មូលហេតុលុប",f_done_at:"បានបញ្ចប់នៅ",f_repeat:"ធ្វើម្តងទៀត",f_section:"ផ្នែក",f_pinned:"ខ្ទាស់"});

NAV.admin.push("audit");NAV.manager.push("audit");
NI.audit='<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>';
Object.assign(S,{aTab:"log",aCol:"",aWho:"",aq:""});
let auditRows=null,auditPage=1,auditMore=false,auditBusy=false;
async function loadAudit(more){
  if(auditBusy)return;auditBusy=true;
  try{auditPage=more?auditPage+1:1;const r=await pb.collection("audit_log").getList(auditPage,200,{sort:"-created"});
    const rows=r.items.map(x=>({id:x.id,col:x.col,rec:x.rec,action:x.action,user:x.user||"",title:x.title||"",before:x.before||{},changed:Array.isArray(x.changed)?x.changed:[],restored:x.restored||"",at:x.created}));
    auditRows=more?(auditRows||[]).concat(rows):rows;auditMore=r.page<r.totalPages}catch(e){auditRows=auditRows||[];fail(e)}
  auditBusy=false;if(S.view==="audit")render();
}
const aAge=a=>Date.now()-new Date(String(a.at).replace(" ","T")).getTime();
const aStamp=a=>{try{const d=new Date(String(a.at).replace(" ","T"));return fmtAt(iso(d)+"T"+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"))}catch(e){return a.at}};
/* a readable value: names instead of ids, short text */
function aVal(f,v){
  if(v===null||v===undefined||v==="")return "–";
  if(Array.isArray(v))return v.map(x=>aVal(f,x)).join(", ")||"–";
  if(typeof v==="object")return "…";
  if(typeof v==="boolean")return v?"✓":"✗";
  const s=String(v);
  if(["assignee","creator","user","owner","author","del_by","created_by","updated_by","by"].includes(f))return (U(s)||{name:s}).name;
  if(f==="client")return C(s)||s;if(f==="stage")return nm(ST(s))||s;if(f==="type")return nm(TT(s))||s;
  if(f==="project"&&typeof projects!=="undefined"){const p=projects.find(x=>x.id===s);return p?p.name:s}
  if(f==="positions")return nm(PO(s))||s;
  if(/<[a-z]/i.test(s)||s.length>60)return s.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,57)+(s.length>60?"…":"");
  return s;
}
function aChanges(a){
  const ch=a.changed.filter(c=>!["desc","status"].includes(c.f)||a.changed.length===1).slice(0,4);
  return ch.map(c=>{const big=["body","plan","est_plan","contacts","package","actions"].includes(c.f);
    return `<span class="achg"><b>${esc(t("f_"+c.f)!==("f_"+c.f)?t("f_"+c.f):c.f)}</b>${big?"":`: <span class="muted">${esc(aVal(c.f,c.from))}</span> → ${esc(aVal(c.f,c.to))}`}</span>`}).join("")+(a.changed.length>4?` <span class="cap muted">+${a.changed.length-4}</span>`:"");
}
const aWho=a=>a.user&&U(a.user)?U(a.user):null;
function aOpenable(a){return a.col==="tasks"&&tasks.some(k=>k.id===a.rec)}
function vAudit(){
  if(auditRows===null){loadAudit(false);return `<div class="head"><h1>${t("auditT")}</h1></div><p class="muted">…</p>`}
  const tab=(v,l)=>`<button data-act="a-tab" data-v="${v}" aria-pressed="${S.aTab===v}">${t(l)}</button>`;
  const cols=[...new Set(auditRows.map(a=>a.col))],who=[...new Set(auditRows.map(a=>a.user))];
  const q=S.aq.trim().toLowerCase();
  const f=a=>(!S.aCol||a.col===S.aCol)&&(!S.aWho||a.user===S.aWho)&&(!q||a.title.toLowerCase().includes(q));
  const filters=`<div class="filters"><label class="f">${t("type")}<select data-af="aCol"><option value="">${t("aAll")}</option>${cols.map(c=>`<option value="${c}" ${S.aCol===c?"selected":""}>${esc(t("col_"+c))}</option>`).join("")}</select></label>
    <label class="f">${t("colPerson")}<select data-af="aWho"><option value="">${t("aAnyone")}</option>${who.map(u=>`<option value="${u}" ${S.aWho===u?"selected":""}>${esc(u?(U(u)||{name:u}).name:t("aSystem"))}</option>`).join("")}</select></label>
    <label class="f">${t("aSearch")}<input type="search" id="a-q" value="${esc(S.aq)}" autocomplete="off"></label></div>`;
  const person=a=>{const u=aWho(a);return `<span class="av">${u?avIn(u):"⚙"}</span><span class="awho"><b>${esc(u?u.name:t("aSystem"))}</b> ${t("ac_"+a.action)} ${esc(t("col_"+a.col))}</span>`};
  let body;
  if(S.aTab==="bin"){
    const list=auditRows.filter(a=>a.action==="delete"&&!a.restored&&a.col!=="users"&&aAge(a)<30*864e5).filter(f);
    body=`<p class="cap muted">${t("binHelp")}</p>${list.length?`<div class="arows">${list.map(a=>{const left=Math.max(0,30-Math.floor(aAge(a)/864e5));
      return `<div class="arow2">${person(a)}<span class="atitle">${esc(a.title||"–")}</span><span class="cap muted">${esc(aStamp(a))} · ${left<=1?t("lastDayLeft"):fill(t("daysLeftN"),left)}</span>
       <button class="btn small primary" data-act="a-restore" data-id="${a.id}">${t("restoreB")}</button></div>`}).join("")}</div>`:`<p class="empty">${t("binNone")}</p>`}`;
  }else{
    const list=auditRows.filter(f);
    body=list.length?`<div class="arows">${list.map(a=>`<div class="arow2">${person(a)}<span class="atitle">${aOpenable(a)?`<button class="linkbtn" data-act="a-open" data-id="${a.rec}">${esc(a.title||"–")}</button>`:esc(a.title||"–")}</span>
      <span class="cap muted">${esc(aStamp(a))}${a.restored?` · <span class="okline">${fill(t("restoredTag"),"")}</span>`:""}</span>
      ${a.action==="update"&&a.changed.length?`<div class="achgs">${aChanges(a)}</div>`:""}
      ${!a.restored&&aAge(a)<30*864e5&&(a.action==="update"||(a.action==="delete"&&a.col!=="users"))?`<button class="btn small" data-act="a-restore" data-id="${a.id}">${t(a.action==="update"?"undo":"restoreB")}</button>`:""}</div>`).join("")}</div>`:`<p class="empty">${t("logNone")}</p>`;
  }
  return `<div class="head"><h1>${t("auditT")}</h1></div><p class="muted">${t("auditHelp")}</p>
   <div class="tabs" role="group">${tab("log","aTabLog")}${tab("bin","aTabBin")}</div>${filters}${body}
   ${auditMore?`<button class="btn" data-act="a-more" style="align-self:center">${t("loadMore")}</button>`:""}`;
}
document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  if(!["a-tab","a-restore","a-more","a-open","nav"].includes(a))return;
  if(a==="nav"){if(b.dataset.v==="audit")auditRows=null;return}
  e.preventDefault();e.stopImmediatePropagation();
  if(a==="a-tab"){S.aTab=b.dataset.v;render();return}
  if(a==="a-more"){loadAudit(true);return}
  if(a==="a-open"){S.dlg={type:"task",id:b.dataset.id};render();return}
  if(a==="a-restore"){const row=(auditRows||[]).find(x=>x.id===b.dataset.id);if(!row)return;
    if(!confirm(fill(t(row.action==="update"?"undoAsk":"restoreAsk"),t("col_"+row.col))))return;
    b.disabled=true;
    try{const r=await pb.send("/api/pc/audit/restore",{method:"POST",body:{id:row.id}});await refresh(true);auditRows=null;await loadAudit(false);
      toast(r&&r.also?fill(t("restoredMore"),r.also):t("restoredOk"))}catch(x){b.disabled=false;fail(x)}}
},true);
document.addEventListener("change",e=>{const el=e.target;if(!el.dataset||!el.dataset.af)return;e.stopImmediatePropagation();S[el.dataset.af]=el.value;render()},true);
document.addEventListener("input",e=>{const el=e.target;if(el.id!=="a-q")return;S.aq=el.value;const pos=el.selectionStart;render();const n=document.getElementById("a-q");if(n){n.focus();n.setSelectionRange(pos,pos)}});
