/* ---------- Custom stages: a task with its own list of stages ----------
   Add task > Type > "Custom stages": start from a type, tick the stages (standard order, Done is added).
   Admins can save the list as a new task type. The task window can add or skip upcoming stages. */
Object.assign(T.en,{customType:"✏️ Custom stages",customT:"Custom stages",startFrom:"Start from",startBlank:"Nothing ticked",customHelp:"Tick the stages this task goes through. They keep the standard order, and Done is added at the end.",
  saveAsType:"Save as task type",typeName:"Name for the new task type",typeSaved:"Task type saved",customLabel:"Custom",needStage:"Tick at least one stage.",
  editStages:"Edit stages",editStagesHelp:"Add or skip upcoming stages. Finished and current stages stay.",stagesSaved:"Stages updated"});
Object.assign(T.km,{customType:"✏️ ដំណាក់កាលផ្ទាល់ខ្លួន",customT:"ដំណាក់កាលផ្ទាល់ខ្លួន",startFrom:"ចាប់ផ្តើមពី",startBlank:"មិនធីកអ្វីទាំងអស់",customHelp:"ធីកដំណាក់កាលដែលភារកិច្ចនេះឆ្លងកាត់។ វារក្សាលំដាប់ធម្មតា ហើយ រួចរាល់ ត្រូវបានបន្ថែមនៅចុង។",
  saveAsType:"រក្សាទុកជាប្រភេទការងារ",typeName:"ឈ្មោះប្រភេទការងារថ្មី",typeSaved:"បានរក្សាទុកប្រភេទការងារ",customLabel:"ផ្ទាល់ខ្លួន",needStage:"សូមធីកយ៉ាងហោចណាស់ដំណាក់កាលមួយ។",
  editStages:"កែដំណាក់កាល",editStagesHelp:"បន្ថែម ឬរំលងដំណាក់កាលខាងមុខ។ ដំណាក់កាលបានបញ្ចប់ និងបច្ចុប្បន្ននៅដដែល។",stagesSaved:"បានធ្វើបច្ចុប្បន្នភាពដំណាក់កាល"});

/* the stages a task goes through: its own list, or its type's */
function taskFlowOf(k){const ids=k&&Array.isArray(k.flow)&&k.flow.length?k.flow:null;if(!ids)return flowOf(k?k.type:"");
  const all=sortedSt(),open=all.filter(s=>!s.done&&ids.includes(s.id)),done=all.find(s=>s.done);return done?open.concat([done]):open}
const customStages=ids=>sortedSt().filter(s=>!s.done&&(ids||[]).includes(s.id));
const typeLabel=k=>k.type&&TT(k.type)?nm(TT(k.type)):(Array.isArray(k.flow)&&k.flow.length?t("customLabel"):"");

/* Add task: the custom stage picker (shown when Type is Custom stages) */
function customBlock(){
  if(S.dlg.ptype!=="__custom")return "";const ids=S.dlg.cflow||[];
  return `<section class="planbox"><div class="plhead"><span class="lab">${t("customT")}</span>
    <label class="f cfrom">${t("startFrom")}<select data-x="cfrom"><option value="">${t("startBlank")}</option>${ttypes.map(x=>`<option value="${x.id}" ${S.dlg.cfrom===x.id?"selected":""}>${esc(nm(x))}</option>`).join("")}</select></label></div>
    <p class="cap muted">${t("customHelp")}</p>
    <div class="ppl">${sortedSt().filter(s=>!s.done).map(s=>`<label class="c"><input type="checkbox" data-cf-st="${s.id}" ${ids.includes(s.id)?"checked":""}><span class="kdot sc-${s.color||"gray"}"></span>${esc(nm(s))}</label>`).join("")}</div>
    ${me().role==="admin"?`<button type="button" class="btn small" data-act="cf-savetype" style="align-self:flex-start">${t("saveAsType")}</button>`:""}</section>`;
}
/* task window (C): add or skip upcoming stages */
function editStagesBlock(k){
  if(!S.dlg.editStages)return canPlan(k)&&k.status!=="done"?`<button type="button" class="btn small" data-act="es-open" style="align-self:flex-start">${t("editStages")}</button>`:"";
  const f=taskFlowOf(k).filter(s=>!s.done),ci=f.findIndex(s=>s.id===k.stage),fixed=new Set(f.slice(0,Math.max(0,ci)+1).map(s=>s.id));
  const cur=new Set(f.map(s=>s.id));
  return `<section class="planbox"><span class="lab">${t("editStages")}</span><p class="cap muted">${t("editStagesHelp")}</p>
   <div class="ppl">${sortedSt().filter(s=>!s.done).map(s=>`<label class="c"><input type="checkbox" data-es-st="${s.id}" ${cur.has(s.id)?"checked":""} ${fixed.has(s.id)?"disabled":""}><span class="kdot sc-${s.color||"gray"}"></span>${esc(nm(s))}</label>`).join("")}</div>
   <div class="acts" style="justify-content:flex-start"><button type="button" class="btn small" data-act="es-cancel">${t("cancel")}</button><button type="button" class="btn small primary" data-act="es-save">${t("saveT")}</button></div></section>`;
}

document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-act]");if(!b||!S.dlg)return;const a=b.dataset.act;
  if(!["cf-savetype","es-open","es-cancel","es-save"].includes(a))return;e.preventDefault();e.stopImmediatePropagation();
  if(a==="cf-savetype"){const ids=customStages(S.dlg.cflow).map(s=>s.id);if(!ids.length){toast(t("needStage"));return}
    const name=(prompt(t("typeName"))||"").trim();if(!name)return;const done=sortedSt().find(s=>s.done);
    try{const r=await pb.collection("task_types").create({name,name_km:"",statuses:ids.concat(done?[done.id]:[]),est:0});await loadAll();
      S.dlg.ptype=r.id;S.dlg.cflow=[];keepPlan();applyPlanDefaults(false);rerenderKeep();const sel=document.getElementById("nt-type");if(sel){sel.value=r.id}toast(t("typeSaved"))}catch(x){fail(x)}return}
  if(a==="es-open"){S.dlg.editStages=true;S.dlg.busy=true;render();return}
  if(a==="es-cancel"){S.dlg.editStages=false;S.dlg.busy=false;render();return}
  if(a==="es-save"){const k=tasks.find(x=>x.id===S.dlg.id),ids=[...document.querySelectorAll(".dlg [data-es-st]")].filter(c=>c.checked).map(c=>c.dataset.esSt);
    if(!ids.length){toast(t("needStage"));return}S.dlg.editStages=false;S.dlg.busy=false;
    run(()=>pb.collection("tasks").update(k.id,{flow:customStages(ids).map(s=>s.id)}),t("stagesSaved"));return}
},true);
document.addEventListener("change",e=>{const el=e.target;if(!S.dlg)return;
  if(el.dataset.cfSt){keepPlan();const ids=[...document.querySelectorAll(".dlg [data-cf-st]")].filter(c=>c.checked).map(c=>c.dataset.cfSt);S.dlg.cflow=ids;applyPlanDefaults(true);rerenderKeep();return}
  if(el.dataset.x==="cfrom"){keepPlan();S.dlg.cfrom=el.value;const tp=TT(el.value);S.dlg.cflow=tp?customStages(tp.statuses.length?tp.statuses:sortedSt().map(s=>s.id)).map(s=>s.id):[];applyPlanDefaults(true);rerenderKeep();return}
},true);
