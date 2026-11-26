/* ===== Live data: every change goes to PocketBase; realtime events refresh the screens ===== */
Object.assign(T.en,{loginReq:"Enter your username and password.",badlogin2:"Wrong username or password, or this account is turned off. Ask your admin if you need help.",
 newPw:"New password for {a} (at least 8 characters)",pwShort:"The password needs at least 8 characters.",userBad:"Usernames use only lowercase letters, numbers, dots and underscores.",uploading:"Uploading {a}… keep this page open.",
 tgStep2:"Tap the button to open the bot in Telegram, then tap Start. If it does not open, search for @{a} in Telegram and send this code:",tgOpen:"Open Telegram",
 tgCheck:"I tapped Start",noRep:"No report for last week",repLast:"Last week's report: {a}",offline:"Can't reach the server. Check your connection.",pdfPending:"Preparing the PDF…",noteRemindN:"Note reminder: {b}"});
Object.assign(T.km,{loginReq:"សូមបញ្ចូលឈ្មោះអ្នកប្រើ និងពាក្យសម្ងាត់។",badlogin2:"ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ ឬគណនីនេះត្រូវបានបិទ។ សូមសួរអ្នកគ្រប់គ្រងប្រព័ន្ធ។",
 newPw:"ពាក្យសម្ងាត់ថ្មីសម្រាប់ {a} (យ៉ាងតិច 8 តួអក្សរ)",pwShort:"ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច 8 តួអក្សរ។",userBad:"ឈ្មោះអ្នកប្រើប្រើតែអក្សរតូច លេខ ចំណុច និង _ ប៉ុណ្ណោះ។",uploading:"កំពុងផ្ទុក {a}… សូមកុំបិទទំព័រនេះ។",
 tgStep2:"ចុចប៊ូតុងដើម្បីបើក bot ក្នុង Telegram រួចចុច Start។ បើវាមិនបើក សូមស្វែងរក @{a} ក្នុង Telegram ហើយផ្ញើលេខកូដនេះ៖",tgOpen:"បើក Telegram",
 tgCheck:"ខ្ញុំបានចុច Start ហើយ",noRep:"មិនទាន់មានរបាយការណ៍សប្តាហ៍មុន",repLast:"របាយការណ៍សប្តាហ៍មុន៖ {a}",offline:"មិនអាចភ្ជាប់ទៅម៉ាស៊ីនមេបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត។",pdfPending:"កំពុងរៀបចំ PDF…",noteRemindN:"រំលឹកកំណត់ចំណាំ៖ {b}"});

const pb=new PocketBase(window.PB_URL||location.origin);
pb.autoCancellation(false);
function notify(){}                       /* notifications are created on the server */
const locStamp=s=>{if(!s)return "";const d=new Date(String(s).replace(" ","T"));if(isNaN(d))return String(s).slice(0,16);return iso(d)+"T"+pad(d.getHours())+":"+pad(d.getMinutes())};
const docGroups={};
async function loadAll(){
  const g=(c,o)=>pb.collection(c).getFullList(Object.assign({batch:500},o||{}));
  const [us,cl,ts,cm,dc,nt,nf,rp,sts,tts,pos,att]=await Promise.all([g("users",{sort:"name"}),g("clients",{sort:"name"}),g("tasks",{sort:"due"}),g("comments",{sort:"created"}),
    g("documents",{sort:"-created"}),g("notes",{sort:"-updated"}),pb.collection("notifications").getList(1,100,{sort:"-created"}).then(r=>r.items),g("reports",{sort:"created"}),
    g("statuses",{sort:"sort"}).catch(()=>[]),g("task_types",{sort:"name"}).catch(()=>[]),g("positions",{sort:"name"}).catch(()=>[]),
    g("attachments",{sort:"created"}).catch(()=>[]),ensureFileToken(),loadTemplates(),loadCosts(),loadStageData(),loadClientData()]);
  statuses.length=0;sts.forEach(r=>statuses.push({id:r.id,name:r.name,name_km:r.name_km||"",color:r.color||"gray",sort:r.sort||0,done:!!r.done,hours:r.hours||"",pos:r.pos||"",workers:r.workers||[]}));
  ttypes.length=0;tts.forEach(r=>ttypes.push({id:r.id,name:r.name,name_km:r.name_km||"",statuses:r.statuses||[],est:r.est||0}));
  positions.length=0;pos.forEach(r=>positions.push({id:r.id,name:r.name,name_km:r.name_km||"",types:r.types||[],statuses:r.statuses||[]}));
  users.length=0;us.forEach(r=>users.push({id:r.id,name:r.name||r.username,username:r.username,role:r.role||"staff",kpi:r.kpi||0,cap:r.cap||44,active:!!r.active,lang:r.lang||"",tg:!!r.tg_on,positions:r.positions||[],supervisors:r.supervisors||[],photo:r.avatar?pb.files.getURL(r,r.avatar,{thumb:"256x256"}):""}));
  clients.length=0;cl.forEach(r=>clients.push({id:r.id,name:r.name,by:r.created_by,status:r.status||"active",logo:r.logo?pb.files.getURL(r,r.logo,{thumb:"256x256"}):"",
    contacts:Array.isArray(r.contacts)?r.contacts:[],package:Array.isArray(r.package)?r.package:[],address:r.address||"",notes:r.notes||"",owner:r.owner||""}));
  const known=new Set(users.map(u=>u.id));
  tasks.length=0;ts.forEach(r=>{if(!known.has(r.assignee)||!known.has(r.creator))return;
    tasks.push({id:r.id,title:r.title,desc:r.desc||"",to:r.assignee,by:r.creator,client:r.client||"",due:r.due||TODAY,prio:r.priority||"normal",status:r.status||"todo",
      est:r.est||0,spent:r.status==="done"?(r.spent||0):null,doneAt:r.status==="done"?(r.done_at||TODAY):null,repeat:!!r.repeat,comments:[],type:r.type||"",stage:r.stage||"",body:r.body||"",delBy:r.del_by||"",delReason:r.del_reason||"",delAt:r.del_at||"",plan:r.plan||{},estPlan:r.est_plan||{},timer:r.timer||null,project:r.project||"",milestone:r.milestone||""})});
  attachments.length=0;att.forEach(r=>attachments.push({id:r.id,task:r.task,owner:r.owner,kind:r.kind,url:r.url||"",name:r.name||r.file||"",size:r.size||0,rec:r}));
  cm.forEach(c=>{const k=tasks.find(x=>x.id===c.task);if(k&&known.has(c.author))k.comments.push({by:c.author,text:c.text,at:locStamp(c.created)})});
  docs.length=0;for(const k in docGroups)delete docGroups[k];
  dc.forEach(r=>{if(!known.has(r.owner))return;const key=[r.area,r.client||"",r.area==="mine"?r.owner:"",r.name.toLowerCase()].join("|");
    (docGroups[key]=docGroups[key]||[]).push(r.id);if(docGroups[key].length>1)return;
    docs.push({id:r.id,area:r.area,client:r.client||"",name:r.name,size:r.size||0,by:r.owner,at:locStamp(r.created),ver:r.version||1,key,rec:r})});
  notes.length=0;nt.forEach(r=>{if(!known.has(r.owner))return;notes.push({id:r.id,owner:r.owner,title:r.title||"",text:r.text||"",items:Array.isArray(r.items)?r.items:[],color:r.color||"yellow",
    pinned:!!r.pinned,label:r.label||"",share:r.share||"private",people:r.people||[],remind:r.remind||""})});
  notifs.length=0;nf.forEach(r=>notifs.push({id:r.id,to:r.user,kind:r.kind,p:r.data||{},at:locStamp(r.created),read:!!r.read}));
  reports.length=0;rp.forEach(r=>{if(!known.has(r.user))return;reports.push({id:r.id,uid:r.user,wk:r.week,snap:r.snap&&r.snap.items?r.snap:{items:[],kpi:0,cap:44,open:0,overdue:0},
    note:r.note||"",status:r.status,by:r.decided_by,at:locStamp(r.created),at2:r.decided_at||"",comment:r.comment||"",rec:r})});
}
const BLOCKING=["new","user","note","log"];
let stale=false;
async function refresh(force){
  if(!S.me)return;
  if(!force&&S.dlg&&(BLOCKING.includes(S.dlg.type)||S.dlg.editing||S.dlg.busy)){stale=true;return}
  try{await loadAll();stale=false}catch(e){if(e&&e.status===401){signOut();return}console.error(e);if(!e||!e.status)toast(t("offline"))}
  render();
}
setInterval(()=>{if(stale&&!(S.dlg&&(BLOCKING.includes(S.dlg.type)||S.dlg.editing||S.dlg.busy)))refresh()},1500);
function fail(e){
  console.error(e);let m=(e&&e.response&&e.response.message)||(e&&e.message)||"Error";
  const d=e&&e.response&&e.response.data;if(d&&typeof d==="object"){const k=Object.keys(d)[0];if(k&&d[k]&&d[k].message)m=k+": "+d[k].message}
  if(e&&e.status===0)m=t("offline");toast(m);
}
async function run(fn,okMsg){try{await fn();await refresh(true);if(okMsg)toast(okMsg)}catch(e){fail(e)}}

/* auth */
let subscribed=false,rtTimer=null;
function subscribeAll(){
  if(subscribed)return;subscribed=true;
  ["tasks","comments","notes","notifications","reports","documents","clients","users"].forEach(c=>pb.collection(c).subscribe("*",()=>{clearTimeout(rtTimer);rtTimer=setTimeout(()=>refresh(),350)}).catch(()=>{}));
}
async function afterAuth(){
  const r=pb.authStore.record;S.me=r.id;
  let stored=null;try{stored=localStorage.getItem("pc-lang")}catch(e){}
  if(!stored&&(r.lang==="km"||r.lang==="en"))S.lang=r.lang;
  S.view="";S.expand=null;S.err="";S.dlg=null;
  await loadAll();render();subscribeAll();
}
function signOut(){pb.authStore.clear();try{pb.realtime.unsubscribe()}catch(e){}subscribed=false;S.me=null;S.dlg=null;S.menu=false;S.fn=false;render()}
async function doLogin(){
  const u=val("li-user").toLowerCase(),p=document.getElementById("li-pw").value;S.lastUser=u;
  if(!u||!p){S.err=t("loginReq");render();return}
  const btn=document.querySelector(".login .primary");if(btn)btn.disabled=true;
  try{await pb.collection("users").authWithPassword(u,p);await afterAuth()}
  catch(e){S.err=e&&e.status===0?t("offline"):t("badlogin2");render()}
}
function vLogin(){
  return `<div class="login2 ${R.le?"enter":""}"><aside class="lhero"><div class="moonart" aria-hidden="true"></div><p class="lname">Preahchan</p><p class="ltag">${t("loginTag")}</p></aside><div class="login"><img src="${LOGO}" alt="Preahchan Digital">
   <div><h1>${t("signin")}</h1><p class="muted">${t("loginHelp")}</p></div>
   ${S.err?`<p class="err" role="alert">${S.err}</p>`:""}
   <form data-form="login"><label class="f">${t("username")}<input type="text" id="li-user" autocomplete="username" autocapitalize="none" value="${esc(S.lastUser||"")}"></label>
   <label class="f">${t("password")}<input type="password" id="li-pw" autocomplete="current-password"></label>
   <button class="btn primary">${t("signin")}</button></form>
   <button class="btn small" data-act="lang" style="align-self:flex-start">${S.lang==="en"?"ភាសាខ្មែរ":"English"}</button></div></div>`;
}

/* Team rows show last week's report instead of the old KPI confirmation */
function repChip(uid){const r=reports.filter(x=>x.uid===uid&&x.wk===LWK).slice(-1)[0];
  return ` · <span class="${r&&r.status==="approved"?"conf":r&&r.status==="returned"?"late":""}">${r?fill(t("repLast"),stText(r.status)):t("noRep")}</span>`}


/* Account: real Telegram linking */
function vAccount(){
  const m=me(),L=S.tgLink;
  return `<div class="head"><h1>${t("account")}</h1></div>
   <section class="card"><div class="who"><span class="av" style="width:48px;height:48px">${avIn(m)}</span><span><b>${esc(m.name)}</b><br><span class="cap muted">@${esc(m.username)} · ${t(m.role)}</span></span></div>
    <div class="stack" style="gap:8px"><span class="lab">${t("language")}</span><div class="tabs"><button data-act="setlang" data-v="en" aria-pressed="${S.lang==="en"}">English</button><button data-act="setlang" data-v="km" aria-pressed="${S.lang==="km"}">ភាសាខ្មែរ</button></div></div>
    <button class="btn" data-act="signout" style="align-self:flex-start">${t("signout")}</button></section>
   ${photoCard()}${themeCard()}
   <section class="card"><h2>${t("tgTitle")}</h2><p class="muted">${t("tgHelp")}</p>
    ${m.tg?`<p class="okline">${t("tgLinked")}</p><button class="btn" data-act="tg-off" style="align-self:flex-start">${t("tgDisconnect")}</button>`
     :L?`<a class="btn primary" href="${esc(L.url)}" target="_blank" rel="noopener" style="align-self:flex-start;display:inline-flex;align-items:center;text-decoration:none">${t("tgOpen")}</a>
        <p>${fill(t("tgStep2"),esc(L.bot))}</p><p class="code num">${esc(L.code)}</p><button class="btn" data-act="tg-confirm" style="align-self:flex-start">${t("tgCheck")}</button>`
     :`<button class="btn primary" data-act="tg-connect" style="align-self:flex-start">${t("tgConnect")}</button>`}</section>`;
}

/* Files */
function dlObj(){return {save:async({filename,data})=>{const u=URL.createObjectURL(data);const a=document.createElement("a");a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000);return {status:"saved"}}}}
async function uploadLive(input){
  const f=input.files[0];input.value="";if(!f)return;
  if(f.size>2*1073741824){toast(t("tooBig"));return}
  const area=S.dTab==="clients"?"client":S.dTab==="company"?"company":"mine",client=area==="client"?S.dClient:"";
  const key=[area,client,area==="mine"?S.me:"",f.name.toLowerCase()].join("|"),ex=docs.find(d=>d.key===key);
  const fd=new FormData();fd.append("name",f.name);fd.append("file",f);fd.append("area",area);if(client)fd.append("client",client);
  fd.append("owner",S.me);fd.append("version",String(ex?ex.ver+1:1));fd.append("size",String(f.size));
  toast(fill(t("uploading"),f.name));
  await run(()=>pb.collection("documents").create(fd),ex?t("newVersion"):t("uploaded"));
}
async function downloadDoc(id){
  const d=docs.find(x=>x.id===id);if(!d)return;
  try{const tok=await pb.files.getToken();const url=pb.files.getURL(d.rec,d.rec.file,{token:tok,download:1});
    const a=document.createElement("a");a.href=url;a.rel="noopener";document.body.appendChild(a);a.click();a.remove()}catch(e){fail(e)}
}

/* PDF as a Blob, for downloading and for attaching to a submitted report */
async function makePdfBlob(uid,wk,r,sn){
  await Promise.all([loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")]);
  const holder=document.createElement("div");holder.style.cssText="position:fixed;left:-10000px;top:0;z-index:-1";
  holder.innerHTML=pdfPage(uid,wk,r,sn);document.body.appendChild(holder);
  try{
    try{await document.fonts.ready}catch(e){}
    const canvas=await window.html2canvas(holder.firstElementChild,{scale:2,backgroundColor:"#ffffff",logging:false});
    const pdf=new window.jspdf.jsPDF({unit:"pt",format:"a4"}),pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight();
    const pxPerPt=canvas.width/pw,pageH=Math.floor(ph*pxPerPt);
    for(let y=0,i=0;y<canvas.height;y+=pageH,i++){
      const sh=Math.min(pageH,canvas.height-y),c=document.createElement("canvas");c.width=canvas.width;c.height=sh;
      const ctx=c.getContext("2d");ctx.fillStyle="#ffffff";ctx.fillRect(0,0,c.width,sh);ctx.drawImage(canvas,0,y,canvas.width,sh,0,0,canvas.width,sh);
      if(i)pdf.addPage();pdf.addImage(c.toDataURL("image/jpeg",0.92),"JPEG",0,0,pw,sh/pxPerPt);
    }
    return pdf.output("blob");
  }finally{holder.remove()}
}
async function makePdf(uid,wk,repId,btn){
  if(pdfBusy)return;pdfBusy=true;if(btn)btn.disabled=true;toast(t("pdfPending"));
  try{const r=repId?reports.find(x=>x.id===repId):null,sn=r?r.snap:buildReport(uid,wk);
    const blob=await makePdfBlob(uid,wk,r,sn);await dlObj().save({filename:pdfName(uid,wk),data:blob});toast(t("pdfSaved"))}
  catch(e){console.error(e);toast(t("pdfFail"))}
  finally{pdfBusy=false;if(btn)btn.disabled=false}
}

/* Notes */
async function saveNoteLive(){
  const d=S.dlg.draft,pending=document.getElementById("nd-new")?.value.trim();if(pending)d.items.push({t:pending,done:false});
  d.items=d.items.filter(x=>x.t.trim());
  if(!d.title.trim()&&!d.text.trim()&&!d.items.length){S.dlg=null;render();return}
  const orig=d.id?notes.find(x=>x.id===d.id):null;
  const data={title:d.title.trim(),text:d.text,items:d.items.map(x=>({t:x.t.trim(),done:!!x.done,task:!!x.task})),color:d.color||"yellow",pinned:!!d.pinned,label:(d.label||"").trim(),remind:d.remind||""};
  if(!orig||orig.remind!==data.remind)data.reminded=false;
  if(!orig||orig.owner===S.me){data.owner=d.owner||S.me;data.share=d.share||"private";data.people=d.share==="people"?d.people:[]}
  S.dlg=null;S.arm=null;
  await run(()=>orig?pb.collection("notes").update(d.id,data):pb.collection("notes").create(data),t("noteSaved"));
}

/* Hours dialog: save, then play the finishing animation */
async function logDone(){
  const h=parseFloat(document.getElementById("lg-h").value),er=document.getElementById("lg-err");
  if(!(h>0)){er.textContent=t("spentReq");er.hidden=false;document.getElementById("lg-h").focus();return}
  const k=tasks.find(x=>x.id===S.dlg.id),back=!!S.dlg.back,u=U(k.to),before=doneWeek(k.to).length;
  const stg=S.dlg.stage||(typeof doneStageOf==="function"&&doneStageOf(k.type)?doneStageOf(k.type).id:"");
  S.dlg=S.dlg.back?{type:"task",id:k.id,focused:true}:null;
  const save=pb.collection("tasks").update(k.id,Object.assign({status:"done",done_at:TODAY,spent:h},stg?{stage:stg}:{}));
  const commit=async()=>{
    try{await save}catch(e){fail(e);await refresh(true);return}
    try{await loadAll()}catch(e){}
    S.bump=k.to===S.me;const hit=k.to===S.me&&before<u.kpi&&before+1>=u.kpi;S.celebrate=hit;render();toast(fill(t(hit?"kpiYay":"loggedToast"),fh(h)));
  };
  if(!back){render();const card=document.querySelector(`.check[data-id="${k.id}"]`)?.closest(".task");
    if(card&&!matchMedia("(prefers-reduced-motion: reduce)").matches){card.classList.add("completing");setTimeout(commit,650);return}}
  commit();
}

/* Capture-phase handlers: data-changing actions go to the server; everything else falls through to the screen handlers */
document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-act]");if(!b)return;
  const a=b.dataset.act,id=b.dataset.id,stop=()=>{e.stopImmediatePropagation();e.preventDefault()};
  if(!S.me)return;
  switch(a){
    case "toggle":{const k=tasks.find(x=>x.id===id);if(k&&k.status==="done"){stop();run(()=>pb.collection("tasks").update(id,{status:"todo",done_at:"",spent:0}),t("reopened"))}return}
    case "reopen":stop();run(()=>pb.collection("tasks").update(id,{status:"todo",done_at:"",spent:0}),t("reopened"));return;
    case "status":{const v=b.dataset.v;if(v==="done")return;stop();run(()=>pb.collection("tasks").update(S.dlg.id,{status:v,done_at:"",spent:0}));return}
    case "resetpw":{stop();const u=U(id),p=window.prompt(fill(t("newPw"),u.name));if(!p)return;if(p.length<8){toast(t("pwShort"));return}
      run(()=>pb.collection("users").update(id,{password:p,passwordConfirm:p}),t("pwReset")+" "+u.name);return}
    case "rep-submit":{stop();const wk=b.dataset.wk,note=(document.getElementById("rp-note")?.value||"").trim();b.disabled=true;
      try{const snap=buildReport(S.me,wk),fd=new FormData();fd.append("user",S.me);fd.append("week",wk);fd.append("snap",JSON.stringify(snap));fd.append("note",note);fd.append("status","pending");
        const pdf=await makePdfBlob(S.me,wk,{status:"pending",at:stamp(),note},snap).catch(err=>{console.error(err);return null});
        if(pdf)fd.append("pdf",new File([pdf],pdfName(S.me,wk),{type:"application/pdf"}));
        await pb.collection("reports").create(fd);S.repNote="";await refresh(true);scrollTo(0,0);toast(t("submittedT"))}
      catch(err){fail(err)}finally{b.disabled=false}return}
    case "rep-ok":stop();run(()=>pb.collection("reports").update(id,{status:"approved",comment:"",decided_by:S.me,decided_at:stamp()}),t("approvedToast"));return;
    case "rep-back":{stop();const c=(document.getElementById("rp-back")?.value||"").trim();
      if(!c){const er=document.getElementById("rp-err");er.textContent=t("backReq");er.hidden=false;document.getElementById("rp-back").focus();return}
      run(()=>pb.collection("reports").update(id,{status:"returned",comment:c,decided_by:S.me,decided_at:stamp()}),t("returnedToast"));return}
    case "markall":stop();run(async()=>{for(const n of notifs.filter(n=>!n.read))await pb.collection("notifications").update(n.id,{read:true})});return;
    case "nopen":{const n=notifs.find(x=>x.id===id);if(n&&!n.read){n.read=true;pb.collection("notifications").update(id,{read:true}).catch(()=>{})}return}
    case "kpi-confirm":stop();return;
    case "dl":stop();downloadDoc(id);return;
    case "ddel":{if(S.arm!==id)return;stop();S.arm=null;const d=docs.find(x=>x.id===id),ids=d?(docGroups[d.key]||[id]):[id];
      run(async()=>{for(const x of ids)await pb.collection("documents").delete(x)},t("deleted"));return}
    case "ntick":{stop();const n=notes.find(x=>x.id===id);if(!n)return;const items=JSON.parse(JSON.stringify(n.items)),i=+b.dataset.i;items[i].done=!items[i].done;n.items=items;render();
      pb.collection("notes").update(id,{items}).catch(err=>{fail(err);refresh(true)});return}
    case "nd-task":{stop();const i=+b.dataset.i,x=S.dlg.draft.items[i];if(!x||!x.t.trim())return;
      try{await pb.collection("tasks").create({title:x.t.trim(),assignee:S.me,creator:S.me,due:off(2),priority:"normal",status:"todo",est:1});x.task=true;
        await loadAll();render();toast(t("taskMade"))}catch(err){fail(err)}return}
    case "nd-delnote":{if(S.arm!=="note")return;stop();const nid=S.dlg.draft.id;S.arm=null;S.dlg=null;run(()=>pb.collection("notes").delete(nid),t("noteDeleted"));return}
    case "nd-save":stop();saveNoteLive();return;
    case "tg-connect":stop();try{S.tgLink=await pb.send("/api/pc/tg/link",{method:"POST"});render()}catch(err){fail(err)}return;
    case "tg-confirm":stop();S.tgLink=null;await refresh(true);return;
    case "tg-off":stop();S.tgLink=null;run(()=>pb.send("/api/pc/tg/unlink",{method:"POST"}));return;
    case "signout":stop();signOut();return;
    case "setlang":pb.collection("users").update(S.me,{lang:b.dataset.v}).catch(()=>{});return;
  }
},true);
document.addEventListener("submit",async e=>{
  const f=e.target.dataset.form;if(!f)return;
  const stop=()=>{e.preventDefault();e.stopImmediatePropagation()};
  if(f==="login"){stop();doLogin();return}
  if(!S.me)return;
  if(f==="task"){stop();const title=val("nt-title"),er=m=>{const el=document.getElementById("nt-err");el.textContent=m;el.hidden=false};
    if(!title){er(t("titleReq"));return}
    const est=parseFloat(val("nt-est"));
    const need=[["nt-type","type",!!val("nt-type")],["nt-client","client",!!val("nt-client")],["nt-due","due",!!val("nt-due")],["nt-est","est",est>0],["nt-prio","prio",!!val("nt-prio")]];
    need.forEach(([id,,ok])=>{const el=document.getElementById(id);if(el)el.setAttribute("aria-invalid",ok?"false":"true")});
    const miss=need.filter(x=>!x[2]);if(miss.length){er(fill(t("fillIn"),miss.map(x=>t(x[1])).join(", ")));document.getElementById(miss[0][0]).focus();return}
    const btn=e.target.querySelector(".primary");if(btn)btn.disabled=true;
    try{let client=val("nt-client");if(client==="__none")client="";
      if(client==="__new"){const n=val("nt-newclient");if(!n){er(t("clientReq"));if(btn)btn.disabled=false;return}
        const ex=clients.find(c=>c.name.toLowerCase()===n.toLowerCase());client=ex?ex.id:(await pb.collection("clients").create({name:n,created_by:S.me})).id}
      const type=val("nt-type")==="__none"?"":val("nt-type");keepPlan();
      // the stage plan: the first stage's person gets the task; the others get it as each stage is finished
      const st=planStages(type),plan={},estPlan={};
      st.forEach(s=>{const p=(S.dlg.plan||{})[s.id];if(p)plan[s.id]=p;const h=parseFloat((S.dlg.estPlan||{})[s.id]);if(h>0)estPlan[s.id]=h});
      if(me().role==="staff"&&st[0])plan[st[0].id]=S.me;
      const first=st[0]||null,assignee=(first&&plan[first.id])||S.me;
      const body=cleanHTML(S.dlg.body||""),pend=(S.dlg.pend||[]).slice();
      const created=await pb.collection("tasks").create({title,body,desc:plainText(body).slice(0,2000),assignee,creator:S.me,client:client||"",due:val("nt-due")||off(2),
        priority:val("nt-prio")||"normal",status:"todo",est,repeat:document.getElementById("nt-rep").checked,type,stage:first?first.id:"",plan,est_plan:estPlan,project:val("nt-project")||"",milestone:val("nt-ms")||""});
      if(typeof afterTaskCreated==="function")await afterTaskCreated(created);
      for(const p of pend){try{toast(fill(t("uploadingA"),p.name));await uploadAttachment(created.id,p)}catch(x){fail(x)}}
      S.dlg=null;render();await refresh(true);toast(t("saved"))}
    catch(err){if(btn)btn.disabled=false;fail(err)}return}
  if(f==="client"){stop();const n=val("cl-name");if(!n)return;if(clients.some(c=>c.name.toLowerCase()===n.toLowerCase())){toast(t("clientDup"));return}
    run(()=>pb.collection("clients").create({name:n,created_by:S.me}),t("clientSaved"));return}
  if(f==="comment"){stop();const text=val("cm-text");if(!text)return;run(()=>pb.collection("comments").create({task:S.dlg.id,author:S.me,text}));return}
  if(f==="user"){stop();const name=val("nu-name"),un=val("nu-user").toLowerCase(),pw=document.getElementById("nu-pw").value;
    const uerr=m=>{let el=document.querySelector(".dlg .err");if(!el){el=document.createElement("p");el.className="err";el.setAttribute("role","alert");document.querySelector(".dlg h2").after(el)}el.textContent=m};
    if(!name||!un||!pw){uerr(t("userReq"));return}
    if(!/^[a-z0-9._]{2,30}$/.test(un)){uerr(t("userBad"));return}
    if(pw.length<8){uerr(t("pwShort"));return}
    if(users.some(u=>u.username===un)){uerr(t("userDup"));return}
    try{await pb.collection("users").create({name,username:un,password:pw,passwordConfirm:pw,role:val("nu-role"),kpi:Math.max(0,+val("nu-kpi")||0),
        cap:Math.max(1,Math.min(80,+val("nu-cap")||44)),active:true,lang:S.lang,positions:[...document.querySelectorAll('input[name="nu-pos"]:checked')].map(x=>x.value)});S.dlg=null;S.err="";await refresh(true);toast(t("userMade"))}
    catch(err){uerr((err&&err.response&&err.response.data&&err.response.data.username)?t("userDup"):((err&&err.message)||"Error"))}return}
  if(f==="log"){stop();logDone();return}
  if(f==="qnote"){stop();const el=document.getElementById("qn-text"),v=el.value.trim();if(!v)return;
    try{await pb.collection("notes").create({owner:S.me,title:v,text:"",items:[],color:"yellow",pinned:false,share:"private"});await loadAll();render();
      document.getElementById("qn-text")?.focus();toast(t("noteAdded"))}catch(err){fail(err)}return}
},true);
document.addEventListener("change",e=>{
  const el=e.target,c=el.dataset.ch,x=el.dataset.x;if(!S.me)return;
  if(c==="setclient"){e.stopImmediatePropagation();run(()=>pb.collection("tasks").update(S.dlg.id,{client:el.value}));return}
  if(c==="reassign"){e.stopImmediatePropagation();const k=tasks.find(x=>x.id===S.dlg.id);run(()=>pb.collection("tasks").update(S.dlg.id,{assignee:el.value,plan:Object.assign({},k.plan||{},k.stage?{[k.stage]:el.value}:{})}));return}
  if(["role","kpi","cap","active"].includes(c)){e.stopImmediatePropagation();const id=el.dataset.id,data={};
    if(c==="role")data.role=el.value;if(c==="kpi")data.kpi=Math.max(0,Math.min(99,+el.value||0));if(c==="cap")data.cap=Math.max(1,Math.min(80,+el.value||44));if(c==="active")data.active=el.checked;
    run(()=>pb.collection("users").update(id,data),t("kpiSaved"));return}
  if(x==="upload"){e.stopImmediatePropagation();uploadLive(el);return}
},true);

/* Start */
setTimeout(()=>{DL=dlObj();},0);
(async()=>{
  setTimeout(()=>{DL=dlObj()},50);
  if(pb.authStore.isValid&&pb.authStore.record&&pb.authStore.record.collectionName==="users"){
    try{await pb.collection("users").authRefresh();await afterAuth();return}catch(e){if(e&&e.status)pb.authStore.clear()}
  }
  render();
})();
