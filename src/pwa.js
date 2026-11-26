/* ---------- Install on the home screen ---------- */
Object.assign(T.en,{install:"Install app",installT:"Install Preahchan Tasks",installed:"App installed",
  installIOS1:"Open this page in Safari.",installIOS2:"Tap the Share button (the square with an arrow).",installIOS3:"Choose “Add to Home Screen”, then “Add”.",
  installHelp:"The app opens in its own window from your home screen, like other apps."});
Object.assign(T.km,{install:"ដំឡើងកម្មវិធី",installT:"ដំឡើង Preahchan Tasks",installed:"បានដំឡើងកម្មវិធី",
  installIOS1:"បើកទំព័រនេះក្នុង Safari។",installIOS2:"ចុចប៊ូតុង Share (ការ៉េមានព្រួញ)។",installIOS3:"ជ្រើស “Add to Home Screen” រួចចុច “Add”។",
  installHelp:"កម្មវិធីនឹងបើកក្នុងផ្ទាំងផ្ទាល់ខ្លួនពីអេក្រង់ដើម ដូចកម្មវិធីផ្សេងៗ។"});
BLOCKING.push("install");
let installEvt=null;
const isStandalone=()=>{try{return matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}catch(e){return false}};
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installEvt=e;if(S.me)render()});
window.addEventListener("appinstalled",()=>{installEvt=null;if(S.me){render();toast(t("installed"))}});
if("serviceWorker" in navigator&&location.protocol==="https:")window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
function installBtn(){
  if(isStandalone()||(!installEvt&&!isIOS))return "";
  return `<button class="btn small installbtn" data-act="install" aria-label="${t("install")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3"/><path d="m7 10 5 5 5-5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg><span>${t("install")}</span></button>`;
}
function dInstall(){
  return `<h2>${t("installT")}</h2><p class="muted">${t("installHelp")}</p>
   <ol class="installsteps"><li>${t("installIOS1")}</li><li>${t("installIOS2")}</li><li>${t("installIOS3")}</li></ol>
   <div class="acts"><button class="btn" data-act="close">${t("close")}</button></div>`;
}
document.addEventListener("click",async e=>{
  const b=e.target.closest('[data-act="install"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
  if(installEvt){const ev=installEvt;installEvt=null;try{await ev.prompt();await ev.userChoice}catch(x){}render();return}
  S.dlg={type:"install"};render();
},true);
