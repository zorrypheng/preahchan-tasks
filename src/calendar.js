/* ---------- Calendar: due dates, posting dates (content calendar), meetings, milestones, holidays ----------
   Month, Week and Agenda views. Drag a task to another day to move it (creator, managers, supervisors).
   Click an empty part of a day to add a task due that day. One client's month of posts exports as a PDF. */
Object.assign(T.en,{n_calendar:"Calendar",calT:"Calendar",cMonth:"Month",cWeek:"Week",cAgenda:"Agenda",cToday:"Today",cPrev:"Previous",cNext:"Next",
  cEveryone:"Everyone",cJustMe:"Just me",cAllClients:"All clients",k_task:"Due dates",k_post:"Posts",k_meet:"Meetings",k_ms:"Milestones",
  cNothing:"Nothing planned for these days.",cMore:"+{a} more",cDragHint:"Drag a task to another day to move it. Click an empty part of a day to add a task.",
  postAt:"Post date and time",platformsT:"Platforms",pf_facebook:"Facebook",pf_instagram:"Instagram",pf_tiktok:"TikTok",pf_telegram:"Telegram",
  postSaved:"Posting date saved",moved:"Moved to {a}",projEnds:"{a} ends",meetNext:"Next meeting",exportPlan:"Content plan PDF",planTitle:"Content plan · {a}",
  planNone:"No posts planned for this client this month.",planCols:"Date|Time|Platforms|Post|Status",holidaysT:"Holidays",holidayAdd:"Add holiday",holidayDate:"Date",
  holidayName:"Name",holidayNameKm:"Name in Khmer",holidaySaved:"Holiday saved",holidayDeleted:"Holiday deleted",holidaysHelp:"Public holidays show on the calendar, and the 08:00 and 17:30 Telegram messages are skipped. Check moving (lunar) dates against the official announcement each year.",
  tPost:"Post today: {b} · {a}"});
Object.assign(T.km,{n_calendar:"ប្រតិទិន",calT:"ប្រតិទិន",cMonth:"ខែ",cWeek:"សប្តាហ៍",cAgenda:"បញ្ជីថ្ងៃ",cToday:"ថ្ងៃនេះ",cPrev:"មុន",cNext:"បន្ទាប់",
  cEveryone:"គ្រប់គ្នា",cJustMe:"តែខ្ញុំ",cAllClients:"អតិថិជនទាំងអស់",k_task:"ថ្ងៃកំណត់",k_post:"ប៉ុស្តិ៍",k_meet:"ប្រជុំ",k_ms:"ដំណាក់កាលសំខាន់",
  cNothing:"គ្មានអ្វីគ្រោងទុកសម្រាប់ថ្ងៃទាំងនេះ។",cMore:"+{a} ទៀត",cDragHint:"អូសភារកិច្ចទៅថ្ងៃផ្សេងដើម្បីផ្លាស់។ ចុចកន្លែងទំនេរនៃថ្ងៃដើម្បីបន្ថែមភារកិច្ច។",
  postAt:"ថ្ងៃ និងម៉ោងប៉ុស្តិ៍",platformsT:"បណ្តាញ",pf_facebook:"Facebook",pf_instagram:"Instagram",pf_tiktok:"TikTok",pf_telegram:"Telegram",
  postSaved:"បានរក្សាទុកថ្ងៃប៉ុស្តិ៍",moved:"បានផ្លាស់ទៅ {a}",projEnds:"{a} បញ្ចប់",meetNext:"ប្រជុំបន្ទាប់",exportPlan:"ផែនការមាតិកា PDF",planTitle:"ផែនការមាតិកា · {a}",
  planNone:"គ្មានប៉ុស្តិ៍គ្រោងទុកសម្រាប់អតិថិជននេះខែនេះ។",planCols:"កាលបរិច្ឆេទ|ម៉ោង|បណ្តាញ|ប៉ុស្តិ៍|ស្ថានភាព",holidaysT:"ថ្ងៃឈប់សម្រាក",holidayAdd:"បន្ថែមថ្ងៃឈប់សម្រាក",holidayDate:"កាលបរិច្ឆេទ",
  holidayName:"ឈ្មោះ",holidayNameKm:"ឈ្មោះជាខ្មែរ",holidaySaved:"បានរក្សាទុកថ្ងៃឈប់សម្រាក",holidayDeleted:"បានលុបថ្ងៃឈប់សម្រាក",holidaysHelp:"ថ្ងៃឈប់សម្រាកបង្ហាញលើប្រតិទិន ហើយសារ Telegram ម៉ោង 08:00 និង 17:30 ត្រូវបានរំលង។ សូមពិនិត្យថ្ងៃតាមចន្ទគតិជាមួយសេចក្តីប្រកាសផ្លូវការរៀងរាល់ឆ្នាំ។",
  tPost:"ប៉ុស្តិ៍ថ្ងៃនេះ៖ {b} · {a}"});

const holidays=[];const PLATFORMS=["facebook","instagram","tiktok","telegram"],PF_SHORT={facebook:"FB",instagram:"IG",tiktok:"TT",telegram:"TG"};
for(const r of ["staff","supervisor","assistant","manager"])NAV[r].splice(NAV[r].indexOf("tasks")+1,0,"calendar");
NAV.admin.splice(NAV.admin.indexOf("projects")+1,0,"calendar");
NI.calendar='<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>';
Object.assign(S,{calView:(typeof innerWidth!=="undefined"&&innerWidth<700)?"agenda":"month",calDate:"",calClient:"",calWho:"",calKinds:{task:1,post:1,meet:1,ms:1},hol:{date:"",name:"",name_km:""}});
async function loadCalData(){try{const r=await pb.collection("holidays").getFullList({sort:"date"});holidays.length=0;r.forEach(x=>holidays.push({id:x.id,date:x.date,name:x.name,name_km:x.name_km||""}))}catch(e){}}
const holOn=d=>holidays.filter(h=>h.date===d);
const pfBadges=k=>(k.platforms||[]).map(p=>`<span class="pf pf-${p}" title="${t("pf_"+p)}">${PF_SHORT[p]||p}</span>`).join("");
function postChip(k){if(!k.postAt)return "";return `<span class="postchip">📣 ${esc(fmt(k.postAt.slice(0,10)))}${k.postAt.length>10?" "+esc(k.postAt.slice(11,16)):""} ${pfBadges(k)}</span>`}

/* everything on the calendar between two dates */
function calEvents(a,b){
  const out=[],cl=S.calClient,who=S.calWho==="me"?S.me:S.calWho,K=S.calKinds;
  const okTask=k=>(!cl||k.client===cl)&&(!who||isOn(k,who));
  if(K.task)tasks.forEach(k=>{if(k.status==="done"||!k.due||k.due<a||k.due>b||!okTask(k))return;
    out.push({day:k.due,kind:"task",cls:k.due<TODAY?"late":"p-"+k.prio,title:k.title,sub:(U(k.to)||{name:""}).name,act:"open",id:k.id,drag:canPlan(k)?k.id:""})});
  if(K.post)tasks.forEach(k=>{if(!k.postAt)return;const d=k.postAt.slice(0,10);if(d<a||d>b||!okTask(k))return;
    out.push({day:d,kind:"post",cls:k.status==="done"?"posted":"post",title:(k.status==="done"?"✓ ":"")+k.title,sub:(k.postAt.slice(11,16)||"")+" "+(k.platforms||[]).map(p=>PF_SHORT[p]).join(" "),act:"open",id:k.id,drag:canPlan(k)?k.id:"",post:1,pf:k.platforms||[]})});
  if(K.meet&&typeof meetings!=="undefined")meetings.forEach(m=>{if(cl&&m.client!==cl)return;if(who&&!m.attendees.includes(who))return;
    [[m.date,""],[m.next,t("meetNext")+": "]].forEach(([d,pre])=>{if(d&&d>=a&&d<=b)out.push({day:d,kind:"meet",cls:"meet",title:pre+m.title,sub:C(m.client)||"",act:"mt-open",id:m.id})})});
  if(K.ms&&typeof projects!=="undefined")projects.forEach(p=>{if(cl&&p.client!==cl)return;if(p.status==="done")return;
    if(who&&!tasks.some(k=>k.project===p.id&&isOn(k,who))&&p.lead!==who)return;
    (p.milestones||[]).forEach(x=>{if(x.due&&x.due>=a&&x.due<=b)out.push({day:x.due,kind:"ms",cls:"ms",title:"◆ "+x.name,sub:p.name,act:"p-open",id:p.id})});
    if(p.end&&p.end>=a&&p.end<=b)out.push({day:p.end,kind:"ms",cls:"ms",title:"🏁 "+fill(t("projEnds"),p.name),sub:C(p.client)||"",act:"p-open",id:p.id})});
  const order={meet:0,post:1,ms:2,task:3};return out.sort((x,y)=>x.day.localeCompare(y.day)||order[x.kind]-order[y.kind]);
}
const evChip=e=>`<button class="ev ev-${e.cls}" data-act="${e.act}" data-id="${e.id}" ${e.drag?`draggable="true" data-drag="${e.drag}" data-post="${e.post?1:""}"`:""} title="${esc(e.title)}${e.sub?" · "+esc(e.sub):""}">
  <span class="evt">${esc(e.title)}</span>${e.pf&&e.pf.length?`<span class="evpf">${e.pf.map(p=>`<span class="pf pf-${p}">${PF_SHORT[p]}</span>`).join("")}</span>`:""}</button>`;

function calAnchor(){return S.calDate||TODAY}
function monthStartOf(d){return d.slice(0,8)+"01"}
function mondayOf(d){const x=new Date(d+"T00:00:00");return iso(addDays(x,-((x.getDay()+6)%7)))}
function vCalendar(){
  const A=calAnchor(),view=S.calView,dn=t("days");
  const seg=`<div class="tabs" role="group">${["month","week","agenda"].map(v=>`<button data-act="cal-view" data-v="${v}" aria-pressed="${view===v}">${t("c"+v[0].toUpperCase()+v.slice(1))}</button>`).join("")}</div>`;
  let a,b,title,body;
  if(view==="month"){const ms=monthStartOf(A),first=mondayOf(ms),me0=new Date(ms+"T00:00:00");me0.setMonth(me0.getMonth()+1);me0.setDate(0);const mEnd=iso(me0);
    a=first;b=iso(addDays(new Date(mondayOf(mEnd)+"T00:00:00"),6));
    title=new Date(ms+"T00:00:00").toLocaleDateString(S.lang==="km"?"km-KH":"en-GB",{month:"long",year:"numeric"});
    const ev=calEvents(a,b),cells=[];for(let d=new Date(a+"T00:00:00");iso(d)<=b;d=addDays(d,1))cells.push(iso(d));
    body=`<div class="cgridm"><div class="cwk">${dn.map(x=>`<span>${x}</span>`).join("")}</div><div class="cdays">${cells.map(d=>{const es=ev.filter(e=>e.day===d),hs=holOn(d),out=d.slice(0,7)!==ms.slice(0,7);
      return `<div class="cday ${out?"out":""} ${d===TODAY?"today":""} ${hs.length?"hol":""} ${S.calSel===d?"sel":""}" data-act="cal-day" data-day="${d}">
        <span class="cdn num">${+d.slice(8)}</span>${hs.map(h=>`<span class="holname">${esc(S.lang==="km"&&h.name_km?h.name_km:h.name)}</span>`).join("")}
        <div class="cevs">${es.slice(0,4).map(evChip).join("")}${es.length>4?`<span class="cap muted">${fill(t("cMore"),es.length-4)}</span>`:""}</div>
        ${es.length?`<span class="cdots">${es.slice(0,6).map(e=>`<i class="dot ev-${e.cls}"></i>`).join("")}</span>`:""}</div>`}).join("")}</div></div>
      ${S.calSel&&S.calSel>=a&&S.calSel<=b?`<div class="cselday">${dayList(S.calSel,ev)}</div>`:""}`;
  }else if(view==="week"){a=mondayOf(A);b=iso(addDays(new Date(a+"T00:00:00"),6));
    title=`${fmt(a)} – ${fmt(b)}`;const ev=calEvents(a,b);
    body=`<div class="cweek">${[0,1,2,3,4,5,6].map(i=>{const d=iso(addDays(new Date(a+"T00:00:00"),i)),hs=holOn(d);
      return `<div class="cwcol ${d===TODAY?"today":""} ${hs.length?"hol":""}" data-act="cal-day" data-day="${d}"><b class="num">${dn[i]} ${+d.slice(8)}</b>${hs.map(h=>`<span class="holname">${esc(S.lang==="km"&&h.name_km?h.name_km:h.name)}</span>`).join("")}
        <div class="cevs">${ev.filter(e=>e.day===d).map(evChip).join("")}</div></div>`}).join("")}</div>`;
  }else{a=A;b=iso(addDays(new Date(A+"T00:00:00"),30));title=`${fmt(a)} – ${fmt(b)}`;const ev=calEvents(a,b);
    const days=[...new Set(ev.map(e=>e.day).concat(holidays.filter(h=>h.date>=a&&h.date<=b).map(h=>h.date)))].sort();
    body=days.length?`<div class="cagenda">${days.map(d=>dayList(d,ev)).join("")}</div>`:`<p class="empty">${t("cNothing")}</p>`;
  }
  const cls=[...new Set(tasks.map(k=>k.client).filter(Boolean))].map(id=>clients.find(c=>c.id===id)).filter(Boolean).sort((x,y)=>x.name.localeCompare(y.name));
  const kind=k=>`<label class="kchip ev-${k==="task"?"p-normal":k}"><input type="checkbox" data-ck="${k}" ${S.calKinds[k]?"checked":""}>${t("k_"+k)}</label>`;
  return `<div class="head"><div class="rhead"><h1>${t("calT")}</h1></div>${S.calClient&&view==="month"?`<button class="btn" data-act="cal-pdf">${t("exportPlan")}</button>`:""}</div>
   <div class="calbar">${seg}<div class="calnav"><button class="btn small" data-act="cal-move" data-d="-1" aria-label="${t("cPrev")}">‹</button><button class="btn small" data-act="cal-today">${t("cToday")}</button><button class="btn small" data-act="cal-move" data-d="1" aria-label="${t("cNext")}">›</button><b class="caltitle">${esc(title)}</b></div></div>
   <div class="calfil"><select data-cal="calClient" aria-label="${t("client")}"><option value="">${t("cAllClients")}</option>${cls.map(c=>`<option value="${c.id}" ${S.calClient===c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select>
    <select data-cal="calWho" aria-label="${t("colPerson")}"><option value="">${t("cEveryone")}</option><option value="me" ${S.calWho==="me"?"selected":""}>${t("cJustMe")}</option>${users.filter(u=>u.active&&u.role!=="admin"&&u.id!==S.me).map(u=>`<option value="${u.id}" ${S.calWho===u.id?"selected":""}>${esc(u.name)}</option>`).join("")}</select>
    <span class="kchips">${["task","post","meet","ms"].map(kind).join("")}</span></div>
   ${view!=="agenda"?`<p class="note-hint">${t("cDragHint")}</p>`:""}${body}`;
}
function dayList(d,ev){const es=ev.filter(e=>e.day===d),hs=holOn(d),dt=new Date(d+"T00:00:00");
  return `<section class="cdaylist ${d===TODAY?"today":""}" data-act="cal-day" data-day="${d}"><h3>${esc(dt.toLocaleDateString(S.lang==="km"?"km-KH":"en-GB",{weekday:"long",day:"numeric",month:"long"}))}</h3>
   ${hs.map(h=>`<span class="holname">🎌 ${esc(S.lang==="km"&&h.name_km?h.name_km:h.name)}</span>`).join("")}
   <div class="cevs">${es.map(e=>`${evChip(e)}${e.sub?`<span class="evsub cap muted">${esc(e.sub)}</span>`:""}`).join("")}</div></section>`}

/* E: one client's posts for the month as a PDF */
async function contentPlanPdf(){
  const c=clients.find(x=>x.id===S.calClient);if(!c)return;const ms=monthStartOf(calAnchor()),me0=new Date(ms+"T00:00:00");me0.setMonth(me0.getMonth()+1);me0.setDate(0);const mEnd=iso(me0);
  const posts=tasks.filter(k=>k.client===c.id&&k.postAt&&k.postAt.slice(0,10)>=ms&&k.postAt.slice(0,10)<=mEnd).sort((a,b)=>a.postAt.localeCompare(b.postAt));
  const month=new Date(ms+"T00:00:00").toLocaleDateString("en-GB",{month:"long",year:"numeric"}),cols=t("planCols").split("|"),td="padding:8px 10px;border-bottom:1px solid #e3ddcf;vertical-align:top";
  const html=`<div style="width:794px;padding:48px;box-sizing:border-box;background:#ffffff;color:#14213d;font-family:'Kantumruy Pro',system-ui,sans-serif">
   <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #f2b632;padding-bottom:12px;margin-bottom:18px"><div><div style="font-size:12px;color:#55607a">Preahchan Digital</div><div style="font-size:24px;font-weight:700">${esc(fill(t("planTitle"),c.name))}</div></div><div style="font-size:16px;font-weight:600">${esc(month)}</div></div>
   ${posts.length?`<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>${cols.map(h=>`<th style="${td};text-align:left;background:#f7f4ec">${esc(h)}</th>`).join("")}</tr></thead><tbody>${posts.map(k=>`<tr>
     <td style="${td};white-space:nowrap">${esc(new Date(k.postAt.slice(0,10)+"T00:00:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"}))}</td><td style="${td}">${esc(k.postAt.slice(11,16)||"–")}</td>
     <td style="${td}">${esc((k.platforms||[]).map(p=>t("pf_"+p)).join(", ")||"–")}</td><td style="${td}"><b>${esc(k.title)}</b>${k.desc?`<div style="color:#55607a;margin-top:4px">${esc(k.desc.slice(0,220))}${k.desc.length>220?"…":""}</div>`:""}</td>
     <td style="${td}">${esc(k.status==="done"?t("done"):nm(ST(k.stage))||"")}</td></tr>`).join("")}</tbody></table>`:`<p>${esc(t("planNone"))}</p>`}</div>`;
  await Promise.all([loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")]);
  const holder=document.createElement("div");holder.style.cssText="position:fixed;left:-10000px;top:0;z-index:-1";holder.innerHTML=html;document.body.appendChild(holder);
  try{try{await document.fonts.ready}catch(e){}
    const canvas=await window.html2canvas(holder.firstElementChild,{scale:2,backgroundColor:"#ffffff",logging:false});
    const pdf=new window.jspdf.jsPDF({unit:"pt",format:"a4"}),pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight(),pxPerPt=canvas.width/pw,pageH=Math.floor(ph*pxPerPt);
    for(let y=0,i=0;y<canvas.height;y+=pageH,i++){const sh=Math.min(pageH,canvas.height-y),cv=document.createElement("canvas");cv.width=canvas.width;cv.height=sh;const ctx=cv.getContext("2d");ctx.fillStyle="#ffffff";ctx.fillRect(0,0,cv.width,sh);ctx.drawImage(canvas,0,y,canvas.width,sh,0,0,canvas.width,sh);if(i)pdf.addPage();pdf.addImage(cv.toDataURL("image/jpeg",0.92),"JPEG",0,0,pw,sh/pxPerPt)}
    pdf.save(`content-plan-${c.name.replace(/[^\wក-៿-]+/g,"-")}-${ms.slice(0,7)}.pdf`)}catch(e){fail(e)}finally{holder.remove()}
}

/* Add task and task window: posting date and platforms */
function postFields(px,k,dp){const at=k?k.postAt:(dp&&dp.postAt)||"",pf=k?(k.platforms||[]):[];
  return `<div class="two postf"><label class="f">${t("postAt")}<input type="datetime-local" id="${px}-post" value="${esc(at)}"></label>
   <div class="f"><span class="lab">${t("platformsT")}</span><div class="pfs">${PLATFORMS.map(p=>`<label class="c pfc"><input type="checkbox" id="${px}-pf-${p}" value="${p}" ${pf.includes(p)?"checked":""}><span class="pf pf-${p}">${PF_SHORT[p]}</span>${t("pf_"+p)}</label>`).join("")}</div></div></div>`}
const readPlatforms=px=>PLATFORMS.filter(p=>{const c=document.getElementById(px+"-pf-"+p);return c&&c.checked});

/* holidays (Settings tab, admins) */
function holidaysTab(){const years=[...new Set(holidays.map(h=>h.date.slice(0,4)))].sort();
  return `<p class="muted">${t("holidaysHelp")}</p>
   <div class="holadd"><label class="f">${t("holidayDate")}<input type="date" data-hol="date" value="${esc(S.hol.date)}"></label><label class="f">${t("holidayName")}<input type="text" data-hol="name" maxlength="120" value="${esc(S.hol.name)}"></label>
    <label class="f">${t("holidayNameKm")}<input type="text" data-hol="name_km" maxlength="120" value="${esc(S.hol.name_km)}"></label><button class="btn primary" data-act="hol-add">${t("holidayAdd")}</button></div>
   ${years.map(y=>`<h3 class="msh">${y}</h3><div class="rows">${holidays.filter(h=>h.date.startsWith(y)).map(h=>`<div class="salrow"><span><b class="num">${esc(fmt(h.date))}</b> · ${esc(h.name)}${h.name_km?` <span class="cap muted">· ${esc(h.name_km)}</span>`:""}</span><button class="btn small" data-act="hol-del" data-id="${h.id}">${t("deleteT")}</button></div>`).join("")}</div>`).join("")}`}

/* ---------- events ---------- */
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  if(!["cal-view","cal-move","cal-today","cal-day","cal-pdf","hol-add","hol-del"].includes(a))return;
  if(a==="cal-day"&&e.target.closest(".ev"))return;
  e.preventDefault();e.stopImmediatePropagation();
  switch(a){
    case "cal-view":S.calView=b.dataset.v;render();return;
    case "cal-today":S.calDate=TODAY;S.calSel="";render();return;
    case "cal-move":{const d=+b.dataset.d,A=calAnchor();let x=new Date(A+"T00:00:00");
      if(S.calView==="month"){x=new Date(x.getFullYear(),x.getMonth()+d,1)}else if(S.calView==="week")x=addDays(x,7*d);else x=addDays(x,30*d);S.calDate=iso(x);S.calSel="";render();return}
    case "cal-day":{const d=b.dataset.day;
      if(S.calView==="month"&&innerWidth<700&&S.calSel!==d){S.calSel=d;render();return}
      S.dlg={type:"new",dup:{title:"",client:S.calClient||"",type:"",prio:"",est:"",due:d}};if(S.calClient)S.dlg.pclient=S.calClient;render();return}
    case "cal-pdf":contentPlanPdf();return;
    case "hol-add":{const h=S.hol;if(!h.date||!h.name.trim()){toast(t("nameReq"));return}
      run(async()=>{await pb.collection("holidays").create({date:h.date,name:h.name.trim(),name_km:h.name_km.trim()});S.hol={date:"",name:"",name_km:""}},t("holidaySaved"));return}
    case "hol-del":run(()=>pb.collection("holidays").delete(b.dataset.id),t("holidayDeleted"));return;
  }
},true);
document.addEventListener("change",e=>{const el=e.target;
  if(el.dataset&&el.dataset.cal){e.stopImmediatePropagation();S[el.dataset.cal]=el.value;render();return}
  if(el.dataset&&el.dataset.ck){e.stopImmediatePropagation();S.calKinds[el.dataset.ck]=el.checked?1:0;render();return}
  if(el.id&&/^tk-(post|pf-)/.test(el.id)&&S.dlg&&S.dlg.id){e.stopImmediatePropagation();run(()=>pb.collection("tasks").update(S.dlg.id,{post_at:val("tk-post")||"",platforms:readPlatforms("tk")}),t("postSaved"));return}
},true);
document.addEventListener("input",e=>{const el=e.target;if(el.dataset&&el.dataset.hol)S.hol[el.dataset.hol]=el.value});
/* A: drag a task or post to another day */
let calDrag=null;
document.addEventListener("dragstart",e=>{const c=e.target.closest&&e.target.closest(".ev[data-drag]");if(!c)return;calDrag={id:c.dataset.drag,post:!!c.dataset.post};try{e.dataTransfer.setData("text/plain",calDrag.id);e.dataTransfer.effectAllowed="move"}catch(x){}});
document.addEventListener("dragover",e=>{if(!calDrag)return;const d=e.target.closest&&e.target.closest("[data-day]");if(!d)return;e.preventDefault();document.querySelectorAll(".cdrop").forEach(x=>x!==d&&x.classList.remove("cdrop"));d.classList.add("cdrop")});
document.addEventListener("dragend",()=>{calDrag=null;document.querySelectorAll(".cdrop").forEach(x=>x.classList.remove("cdrop"))});
document.addEventListener("drop",e=>{if(!calDrag)return;const d=e.target.closest&&e.target.closest("[data-day]");if(!d)return;e.preventDefault();
  const k=tasks.find(x=>x.id===calDrag.id),day=d.dataset.day,isPost=calDrag.post;calDrag=null;document.querySelectorAll(".cdrop").forEach(x=>x.classList.remove("cdrop"));
  if(!k)return;const data=isPost?{post_at:day+(k.postAt&&k.postAt.length>10?k.postAt.slice(10):"T09:00")}:{due:day};
  run(()=>pb.collection("tasks").update(k.id,data),fill(t("moved"),fmt(day)))});
