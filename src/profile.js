/* ---------- Profile photos and dark mode ---------- */
Object.assign(T.en,{photo:"Profile photo",photoHelp:"Shown on your tasks, the team page and the leaderboard.",photoUp:"Upload photo",photoChange:"Change photo",photoDel:"Remove photo",
  photoSaved:"Photo saved",photoRemoved:"Photo removed",photoBad:"Choose a photo (JPG, PNG or WebP).",
  look:"Appearance",lookSys:"Automatic",lookLight:"Light",lookDark:"Dark",lookHelp:"Automatic follows your phone or computer setting."});
Object.assign(T.km,{photo:"រូបថតប្រវត្តិរូប",photoHelp:"បង្ហាញលើភារកិច្ច ទំព័រក្រុម និងតារាងពិន្ទុ។",photoUp:"ផ្ទុករូបថត",photoChange:"ប្តូររូបថត",photoDel:"ដករូបថតចេញ",
  photoSaved:"បានរក្សាទុករូបថត",photoRemoved:"បានដករូបថតចេញ",photoBad:"សូមជ្រើសរូបថត (JPG, PNG ឬ WebP)។",
  look:"រូបរាង",lookSys:"ស្វ័យប្រវត្តិ",lookLight:"ភ្លឺ",lookDark:"ងងឹត",lookHelp:"ស្វ័យប្រវត្តិ តាមការកំណត់ទូរស័ព្ទ ឬកុំព្យូទ័ររបស់អ្នក។"});

/* avatar contents: the photo when there is one, otherwise initials */
function avIn(u){if(!u)return "";return u.photo?`<img class="avimg" src="${esc(u.photo)}" alt="" loading="lazy">`:esc(initials(u.name||""))}

async function shrinkPhoto(file){
  const img=await createImageBitmap(file).catch(()=>null);if(!img)return file;
  const side=Math.min(img.width,img.height),size=Math.min(512,side),c=document.createElement("canvas");c.width=c.height=size;
  c.getContext("2d").drawImage(img,(img.width-side)/2,(img.height-side)/2,side,side,0,0,size,size);
  const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",0.86));return blob?new File([blob],"photo.jpg",{type:"image/jpeg"}):file;
}
function photoCard(){const m=me();
  return `<section class="card"><h2>${t("photo")}</h2><div class="photorow"><span class="av big">${avIn(m)}</span>
   <div class="stack" style="gap:8px"><p class="muted" style="margin:0">${t("photoHelp")}</p><div class="tabs">
   <label class="btn small primary photobtn">${m.photo?t("photoChange"):t("photoUp")}<input type="file" id="ph-file" accept="image/jpeg,image/png,image/webp" hidden></label>
   ${m.photo?`<button class="btn small" data-act="photo-del">${t("photoDel")}</button>`:""}</div></div></div></section>`}
function themeCard(){const v=getTheme(),b=(k,l)=>`<button data-act="theme" data-v="${k}" aria-pressed="${v===k}">${t(l)}</button>`;
  return `<section class="card"><h2>${t("look")}</h2><div class="tabs">${b("system","lookSys")}${b("light","lookLight")}${b("dark","lookDark")}</div><p class="cap muted" style="margin:0">${t("lookHelp")}</p></section>`}

/* theme: system, light or dark, remembered on this device */
function getTheme(){try{return localStorage.getItem("pc-theme")||"system"}catch(e){return "system"}}
function applyTheme(){const v=getTheme(),root=document.documentElement;
  if(v==="system")delete root.dataset.theme;else root.dataset.theme=v;
  const dark=v==="dark"||(v==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?"#0f131b":"#f7f4ec";}
applyTheme();
try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",applyTheme)}catch(e){}

document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  if(a!=="theme"&&a!=="photo-del")return;e.preventDefault();e.stopImmediatePropagation();
  if(a==="theme"){try{localStorage.setItem("pc-theme",b.dataset.v)}catch(x){}applyTheme();render();return}
  if(a==="photo-del")run(()=>pb.collection("users").update(S.me,{avatar:null}),t("photoRemoved"));
},true);
document.addEventListener("change",async e=>{
  const el=e.target;if(el.id!=="ph-file")return;e.stopImmediatePropagation();
  const f=el.files&&el.files[0];el.value="";if(!f)return;
  if(!/^image\/(jpeg|png|webp)$/.test(f.type)){toast(t("photoBad"));return}
  const fd=new FormData();fd.append("avatar",await shrinkPhoto(f));
  run(()=>pb.collection("users").update(S.me,fd),t("photoSaved"));
},true);
