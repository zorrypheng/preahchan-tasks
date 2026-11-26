/* ---------- Rename a task, delete it, or ask a manager to delete it ---------- */
Object.assign(T.en,{rename:"Rename",renameT:"Task name",renamed:"Task renamed",nameReq:"Enter a task name.",
  delTask:"Delete task",delConfirm:"Click again to delete",taskDeleted:"Task deleted",reqDel:"Request delete",reqDelT:"Ask a manager to delete this task",
  reqReason:"Why should it be deleted?",reqSend:"Send request",reqSent:"Delete request sent",reqCancel:"Cancel request",reqCancelled:"Delete request cancelled",
  delAsked:"{a} asked to delete this task · {b}",delAskedMe:"You asked to delete this task · {b}",delWait:"Waiting for a manager to decide.",keepTask:"Keep task",kept:"Task kept",
  delChip:"Delete requested",tDelReq:"{a} asks to delete {b}",tDelOk:"{a} deleted {b}, as you asked",tDelNo:"{a} kept {b}; your delete request was declined"});
Object.assign(T.km,{rename:"ប្តូរឈ្មោះ",renameT:"ឈ្មោះភារកិច្ច",renamed:"បានប្តូរឈ្មោះភារកិច្ច",nameReq:"សូមបញ្ចូលឈ្មោះភារកិច្ច។",
  delTask:"លុបភារកិច្ច",delConfirm:"ចុចម្តងទៀតដើម្បីលុប",taskDeleted:"បានលុបភារកិច្ច",reqDel:"សុំលុប",reqDelT:"សុំអ្នកគ្រប់គ្រងលុបភារកិច្ចនេះ",
  reqReason:"ហេតុអ្វីត្រូវលុប?",reqSend:"ផ្ញើសំណើ",reqSent:"បានផ្ញើសំណើលុប",reqCancel:"បោះបង់សំណើ",reqCancelled:"បានបោះបង់សំណើលុប",
  delAsked:"{a} សុំលុបភារកិច្ចនេះ · {b}",delAskedMe:"អ្នកបានសុំលុបភារកិច្ចនេះ · {b}",delWait:"កំពុងរង់ចាំអ្នកគ្រប់គ្រងសម្រេច។",keepTask:"រក្សាទុកភារកិច្ច",kept:"បានរក្សាទុកភារកិច្ច",
  delChip:"សុំលុប",tDelReq:"{a} សុំលុប {b}",tDelOk:"{a} បានលុប {b} តាមសំណើរបស់អ្នក",tDelNo:"{a} បានរក្សាទុក {b}; សំណើលុបរបស់អ្នកមិនត្រូវបានយល់ព្រម"});

/* same rule as the server: creator, admins and managers, and the supervisor of the person doing it */
function canDeleteTask(k){const m=me();if(!m||!k)return false;if(isTaskMgr(m)||k.by===m.id)return true;return m.role==="supervisor"&&((U(k.to)||{}).supervisors||[]).includes(m.id)}
const delChip=k=>k.delBy?`<span class="delchip">${t("delChip")}</span>`:"";

/* title row of the task dialog: name, rename */
function taskTitle(k,chip){
  if(S.dlg.renaming)return `<form class="renamef" data-form="rename"><label class="f">${t("renameT")}<input type="text" id="tk-title" maxlength="120" value="${esc(k.title)}" autocomplete="off"></label>
    <p class="err" id="rn-err" role="alert" hidden></p><div class="acts" style="justify-content:flex-start"><button type="button" class="btn small" data-act="rn-cancel">${t("cancel")}</button><button class="btn small primary">${t("saveT")}</button></div></form>`;
  return `<div class="ttl"><h2>${esc(k.title)}</h2><span class="ttlr">${chip}<button class="btn small" data-act="rn-open">${t("rename")}</button></span></div>`;
}
/* banner shown while a delete request is open */
function delBanner(k){
  if(!k.delBy)return "";const mine=k.delBy===S.me,can=canDeleteTask(k);
  return `<div class="delbanner" role="status"><p><b>${(mine?fill(t("delAskedMe"),"",k.delAt?fmtAt(k.delAt):""):fill(t("delAsked"),esc((U(k.delBy)||{name:"?"}).name),k.delAt?fmtAt(k.delAt):"")).replace(/ · $/,"")}</b>${k.delReason?`<br>${esc(k.delReason)}`:""}${!can?`<br><span class="cap muted">${t("delWait")}</span>`:""}</p>
   <div class="acts" style="justify-content:flex-start">${can?`<button class="btn small ${S.arm==="tdel"?"danger":""}" data-act="tdel">${S.arm==="tdel"?t("delConfirm"):t("delTask")}</button><button class="btn small" data-act="dreq-keep">${t("keepTask")}</button>`:""}
   ${mine&&!can?`<button class="btn small" data-act="dreq-keep">${t("reqCancel")}</button>`:""}</div></div>`;
}
/* buttons at the bottom of the task dialog */
function delActs(k){
  if(k.delBy)return "";
  if(canDeleteTask(k))return `<button class="btn ${S.arm==="tdel"?"danger":""}" data-act="tdel">${S.arm==="tdel"?t("delConfirm"):t("delTask")}</button>`;
  return `<button class="btn" data-act="dreq-open">${t("reqDel")}</button>`;
}
function reqForm(){
  if(!S.dlg.reqDel)return "";
  return `<form class="reqdel" data-form="reqdel"><h3 class="lab">${t("reqDelT")}</h3><label class="f">${t("reqReason")}<textarea id="rd-reason" maxlength="300" rows="3"></textarea></label>
    <div class="acts" style="justify-content:flex-start"><button type="button" class="btn small" data-act="dreq-close">${t("cancel")}</button><button class="btn small primary">${t("reqSend")}</button></div></form>`;
}

document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b||!S.dlg||S.dlg.type!=="task")return;const a=b.dataset.act;
  if(!["rn-open","rn-cancel","tdel","dreq-open","dreq-close","dreq-keep"].includes(a))return;
  e.preventDefault();e.stopImmediatePropagation();
  const k=tasks.find(x=>x.id===S.dlg.id);if(!k)return;
  if(a==="rn-open"){S.dlg.renaming=true;S.dlg.busy=true;render();const i=document.getElementById("tk-title");if(i){i.focus();i.select()}return}
  if(a==="rn-cancel"){S.dlg.renaming=false;S.dlg.busy=!!S.dlg.reqDel;render();return}
  if(a==="dreq-open"){S.dlg.reqDel=true;S.dlg.busy=true;render();document.getElementById("rd-reason")?.focus();return}
  if(a==="dreq-close"){S.dlg.reqDel=false;S.dlg.busy=!!S.dlg.renaming;render();return}
  if(a==="tdel"){if(S.arm!=="tdel"){S.arm="tdel";render();return}S.arm=null;const id=k.id;S.dlg=null;
    run(()=>pb.collection("tasks").delete(id),t("taskDeleted"));return}
  if(a==="dreq-keep"){const mine=k.delBy===S.me;run(()=>pb.collection("tasks").update(k.id,{del_by:""}),t(mine&&!canDeleteTask(k)?"reqCancelled":"kept"));return}
},true);
document.addEventListener("submit",e=>{
  const f=e.target.dataset&&e.target.dataset.form;if(f!=="rename"&&f!=="reqdel")return;e.preventDefault();e.stopImmediatePropagation();
  const k=tasks.find(x=>x.id===S.dlg.id);if(!k)return;
  if(f==="rename"){const v=val("tk-title");if(!v){const er=document.getElementById("rn-err");er.textContent=t("nameReq");er.hidden=false;return}
    S.dlg.renaming=false;S.dlg.busy=!!S.dlg.reqDel;if(v===k.title){render();return}
    run(()=>pb.collection("tasks").update(k.id,{title:v}),t("renamed"));return}
  if(f==="reqdel"){const r=(document.getElementById("rd-reason").value||"").trim().slice(0,300);S.dlg.reqDel=false;S.dlg.busy=!!S.dlg.renaming;
    run(()=>pb.collection("tasks").update(k.id,{del_by:S.me,del_reason:r}),t("reqSent"));return}
},true);
/* any click outside the armed delete button disarms it */
document.addEventListener("click",e=>{if(S.arm==="tdel"&&!e.target.closest('[data-act="tdel"]')){S.arm=null}},false);
