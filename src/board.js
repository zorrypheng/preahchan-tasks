/* ---------- Leaderboard: % of weekly KPI, podium, stickers ---------- */
Object.assign(T.en,{lbHelp:"This week, ranked by % of each person's weekly KPI (finished stages with hours).",daysLeft:"{a} days left this week",lastDay:"Last day this week",
  youRank:"You're #{a}",reached:"KPI reached! Can you hit 150%?",overDone:"Amazing — {a}% of your KPI!",needMore:"{a} more stages to reach 100%",needOne:"1 more stage to reach 100%",
  toPass:"{a} more to pass {b}",toPass1:"1 more to pass {b}",youLead:"You're leading the team. Keep it up!",noKpi:"No KPI set",
  stickers:"Stickers",st_champ:"Last week's champion",st_kpi:"KPI reached",st_star:"150% club",st_streak:"{a}-day streak",st_fast:"Fastest finisher",st_hours:"Most hours",st_up:"Most improved",
  st_champH:"Top % last week",st_kpiH:"100% of weekly KPI",st_starH:"150% or more of weekly KPI",st_streakH:"Finished stages 3+ working days in a row",st_fastH:"Shortest average time in stage this week",st_hoursH:"Most hours logged this week",st_upH:"Biggest jump from last week",
  stagesN:"{a} of {b} stages",hoursN:"{a} h"});
Object.assign(T.km,{lbHelp:"សប្តាហ៍នេះ តម្រៀបតាម % នៃ KPI ប្រចាំសប្តាហ៍របស់មនុស្សម្នាក់ៗ (ដំណាក់កាលបានបញ្ចប់ដែលមានម៉ោង)។",daysLeft:"នៅសល់ {a} ថ្ងៃក្នុងសប្តាហ៍នេះ",lastDay:"ថ្ងៃចុងក្រោយនៃសប្តាហ៍",
  youRank:"អ្នកលេខ {a}",reached:"សម្រេច KPI ហើយ! តើអាចដល់ 150% ទេ?",overDone:"អស្ចារ្យ — {a}% នៃ KPI!",needMore:"នៅ {a} ដំណាក់កាលទៀតដើម្បីដល់ 100%",needOne:"នៅ 1 ដំណាក់កាលទៀតដើម្បីដល់ 100%",
  toPass:"នៅ {a} ទៀតដើម្បីឈ្នះ {b}",toPass1:"នៅ 1 ទៀតដើម្បីឈ្នះ {b}",youLead:"អ្នកកំពុងនាំមុខក្រុម។ បន្តទៀត!",noKpi:"មិនទាន់កំណត់ KPI",
  stickers:"ស្ទីកឃ័រ",st_champ:"ជើងឯកសប្តាហ៍មុន",st_kpi:"សម្រេច KPI",st_star:"ក្លឹប 150%",st_streak:"{a} ថ្ងៃជាប់គ្នា",st_fast:"បញ្ចប់លឿនបំផុត",st_hours:"ម៉ោងច្រើនបំផុត",st_up:"រីកចម្រើនខ្លាំង",
  st_champH:"% ខ្ពស់បំផុតសប្តាហ៍មុន",st_kpiH:"100% នៃ KPI ប្រចាំសប្តាហ៍",st_starH:"150% ឬច្រើនជាងនៃ KPI",st_streakH:"បញ្ចប់ដំណាក់កាល 3+ ថ្ងៃធ្វើការជាប់គ្នា",st_fastH:"រយៈពេលមធ្យមក្នុងដំណាក់កាលខ្លីបំផុតសប្តាហ៍នេះ",st_hoursH:"ម៉ោងកត់ត្រាច្រើនបំផុតសប្តាហ៍នេះ",st_upH:"កើនឡើងខ្លាំងជាងសប្តាហ៍មុន",
  stagesN:"{a} នៃ {b} ដំណាក់កាល",hoursN:"{a} ម៉ោង"});

const STICKERS={champ:"👑",star:"🌟",kpi:"🎯",streak:"🔥",fast:"⚡",hours:"💪",up:"📈"};
function boardItems(uid){return board?(board[uid]||[]):wlogs.filter(l=>l.user===uid).map(l=>({d:l.day,h:l.hours,w:l.wait}))}
function lbStats(u){
  const it=boardItems(u.id),lw0=iso(addDays(wk0,-7)),lw6=iso(addDays(wk0,-1));
  const wk=it.filter(x=>x.d>=WK0&&x.d<=WK6&&x.h>0),last=it.filter(x=>x.d>=lw0&&x.d<=lw6&&x.h>0).length;
  const n=wk.length,kpi=u.kpi||0,pct=kpi?Math.round(n/kpi*100):0,lpct=kpi?Math.round(last/kpi*100):0,hrs=wk.reduce((a,x)=>a+x.h,0);
  // streak: working days (Monday to Saturday) in a row with a finished stage, counting back from today
  const days=new Set(it.filter(x=>x.h>0).map(x=>x.d));let streak=0,d=new Date(TODAY+"T00:00:00");if(!days.has(TODAY))d=addDays(d,-1);
  for(let i=0;i<60;i++){if(d.getDay()===0){d=addDays(d,-1);continue}if(days.has(iso(d))){streak++;d=addDays(d,-1)}else break}
  const ws=it.filter(x=>x.d>=WK0&&x.d<=WK6&&x.w>0),speed=ws.length>=2?ws.reduce((a,x)=>a+x.w,0)/ws.length:null;
  return {u,n,kpi,pct,lpct,hrs,streak,speed,st:[]};
}
function lbAll(){
  const list=people().map(lbStats),ranked=list.filter(s=>s.kpi>0).sort((a,b)=>b.pct-a.pct||b.n-a.n||(a.speed??1e9)-(b.speed??1e9)||a.u.name.localeCompare(b.u.name));
  const top=(f,ok)=>{const c=ranked.filter(ok);if(!c.length)return [];const best=Math.max(...c.map(f));return c.filter(s=>f(s)===best)};
  top(s=>s.lpct,s=>s.lpct>0).forEach(s=>s.st.push(["champ"]));
  ranked.forEach(s=>{if(s.pct>=150)s.st.push(["star"]);else if(s.pct>=100)s.st.push(["kpi"]);if(s.streak>=3)s.st.push(["streak",s.streak])});
  top(s=>-s.speed,s=>s.speed!=null).slice(0,1).forEach(s=>s.st.push(["fast"]));
  top(s=>s.hrs,s=>s.hrs>0).slice(0,1).forEach(s=>s.st.push(["hours"]));
  top(s=>s.pct-s.lpct,s=>s.pct-s.lpct>=20).slice(0,1).forEach(s=>s.st.push(["up"]));
  return {ranked,rest:list.filter(s=>!s.kpi)};
}
const stickerChip=(k,a,big)=>`<span class="stk ${big?"big":""}" title="${esc(fill(t("st_"+k),a))}: ${esc(t("st_"+k+"H"))}"><span aria-hidden="true">${STICKERS[k]}</span><span class="stkl">${esc(fill(t("st_"+k),a))}</span></span>`;
const avatar=(u,cls)=>`<span class="lbav ${cls||""}">${esc(initials(u.name))}</span>`;
function vBoard(){
  const {ranked,rest}=lbAll(),meI=ranked.findIndex(s=>s.u.id===S.me),meS=ranked[meI];
  const dow=new Date(TODAY+"T00:00:00").getDay(),left=dow===0?0:6-dow;
  let hero="";
  if(meS){const need=Math.max(0,meS.kpi-meS.n);let msg;
    if(meS.pct>=150)msg=fill(t("overDone"),meS.pct);else if(meS.pct>=100)msg=t("reached");else msg=need===1?t("needOne"):fill(t("needMore"),need);
    let chase="";if(meI>0){const ah=ranked[meI-1],gap=Math.max(1,Math.floor(ah.pct*meS.kpi/100)-meS.n+1);chase=gap===1?fill(t("toPass1"),"",esc(ah.u.name)):fill(t("toPass"),gap,esc(ah.u.name))}else chase=t("youLead");
    hero=`<section class="lbme"><div class="lbring" style="--p:${Math.min(100,meS.pct)}"><b class="num">${meS.pct}%</b></div>
      <div class="lbmetext"><span class="eyebrow">${fill(t("youRank"),meI+1)} · ${fill(t("stagesN"),meS.n,meS.kpi)}</span><b>${msg}</b><span class="muted">${chase}</span>
      ${meS.st.length?`<div class="stks">${meS.st.map(x=>stickerChip(x[0],x[1],true)).join("")}</div>`:""}</div></section>`}
  const pod=ranked.slice(0,3),order=[1,0,2].filter(i=>pod[i]);
  const podium=pod.length?`<div class="podium">${order.map(i=>{const s=pod[i];return `<div class="pod p${i+1} ${s.u.id===S.me?"me":""}"><span class="medal" aria-hidden="true">${["🥇","🥈","🥉"][i]}</span>${avatar(s.u,"lg")}
      <b class="pname">${esc(s.u.name)}</b><span class="ppct num">${s.pct}%</span><span class="cap muted">${fill(t("stagesN"),s.n,s.kpi)}</span>
      ${s.st.length?`<div class="stks">${s.st.map(x=>`<span class="stk" title="${esc(fill(t("st_"+x[0]),x[1]))}" aria-label="${esc(fill(t("st_"+x[0]),x[1]))}">${STICKERS[x[0]]}</span>`).join("")}</div>`:""}
      <span class="step" aria-hidden="true">${i+1}</span></div>`}).join("")}</div>`:"";
  const row=(s,i)=>`<div class="lbrow ${s.u.id===S.me?"me":""}"><span class="lbrank num">${i!=null?i+1:"–"}</span>${avatar(s.u)}
    <span class="lbname"><b>${esc(s.u.name)}</b>${s.st.length?`<span class="stks">${s.st.map(x=>stickerChip(x[0],x[1])).join("")}</span>`:""}</span>
    <span class="lbbar ${s.pct>=100?"full":""}" role="img" aria-label="${s.pct}%"><i style="width:${Math.min(100,s.pct)}%"></i></span>
    <span class="lbpct num"><b>${s.kpi?s.pct+"%":"–"}</b><span class="cap muted">${s.kpi?fill(t("stagesN"),s.n,s.kpi):t("noKpi")}</span></span></div>`;
  const used=new Set(ranked.flatMap(s=>s.st.map(x=>x[0])));
  return `<div class="head"><div class="rhead"><p class="eyebrow">${left?fill(t("daysLeft"),left):t("lastDay")}</p><h1>${t("board")}</h1></div></div>
   <p class="muted">${t("lbHelp")}</p>${hero}${podium}
   <div class="lbrows">${ranked.map((s,i)=>row(s,i)).join("")}${rest.map(s=>row(s,null)).join("")}</div>
   <section class="lblegend"><span class="lab">${t("stickers")}</span><div class="stks">${Object.keys(STICKERS).map(k=>`<span class="stk ${used.has(k)?"":"off"}" title="${esc(t("st_"+k+"H"))}"><span aria-hidden="true">${STICKERS[k]}</span>${esc(fill(t("st_"+k),3))} <span class="cap muted">· ${esc(t("st_"+k+"H"))}</span></span>`).join("")}</div></section>`;
}
