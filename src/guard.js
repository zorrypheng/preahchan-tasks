/* ---------- Don't lose typing: clicking outside a form or pressing Escape asks first ----------
   A form counts as changed once something is typed or picked in it. Fields that save on their own
   (the selects in the task window) don't count. Cancel and Close still close straight away. */
Object.assign(T.en,{discardAsk:"Close without saving? What you typed will be lost."});
Object.assign(T.km,{discardAsk:"បិទដោយមិនរក្សាទុក? អ្វីដែលអ្នកបានវាយនឹងបាត់។"});
let dlgKey="",dlgDirty=false;
const dlgKeyNow=()=>S.dlg?S.dlg.type+":"+(S.dlg.id||""):"";
function trackDlg(){const k=dlgKeyNow();if(k!==dlgKey){dlgKey=k;dlgDirty=false}}
/* fields in the task window that save by themselves */
function autosaves(el){const d=el.dataset||{};return !!(d.ch||d.replan||d.af||d.cf||d.pf||["stage","ttype","setproj","setms","move"].includes(d.x)||/^tk-(stage|type|client|project|ms|rep|repn|repu|post|pf-.+)$/.test(el.id||"")||el.id==="re-to")}
function markDirty(e){const el=e.target;if(!el.closest||!el.closest(".dlg")||el.type==="file"||autosaves(el))return;trackDlg();dlgDirty=true}
document.addEventListener("input",markDirty,true);
document.addEventListener("change",markDirty,true);
const askDiscard=()=>{trackDlg();return !dlgDirty||confirm(t("discardAsk"))};
/* runs before the app's own handlers (window capture), so a "no" stops the close */
window.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-act="scrim"]');if(!b||e.target!==b||!S.dlg)return;
  if(!askDiscard()){e.preventDefault();e.stopImmediatePropagation();const d=document.querySelector(".dlg");if(d){d.classList.remove("nudge");void d.offsetWidth;d.classList.add("nudge")}}},true);
window.addEventListener("keydown",e=>{if(e.key!=="Escape"||!S.dlg)return;if(!askDiscard()){e.preventDefault();e.stopImmediatePropagation()}},true);
/* closing the dialog any other way (saving, Cancel) starts clean */
const _renderBase=render;render=function(){if(!S.dlg){dlgKey="";dlgDirty=false}return _renderBase.apply(this,arguments)};
/* leaving or reloading the page with unsaved typing */
window.addEventListener("beforeunload",e=>{if(S.dlg){trackDlg();if(dlgDirty){e.preventDefault();e.returnValue=""}}});
