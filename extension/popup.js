import { DEFAULT_SERVER, session, login, logout, openTasks, weekNumbers, unreadCount, finishTask, addTask, addNote, today, addDays, updateBadge } from "./api.js";

const T = {
  en: {
    signIn: "Sign in", username: "Username", password: "Password", server: "Server address", advanced: "Server settings",
    signInHelp: "Use the same username and password as the Preahchan Tasks app.", badLogin: "Wrong username or password, or the account is turned off.",
    offline: "Can't reach the server. Check your connection.", needBoth: "Enter your username and password.",
    tasks: "Tasks", add: "Add task", note: "Note", openApp: "Open the app", signOut: "Sign out",
    week: "{a} of {b} tasks this week", hours: "{a} of {b} hours logged", unread: "{a} new notifications", unread1: "1 new notification",
    none: "Nothing open. Add a task or enjoy the moment.", due: "Due", today: "Due today", tomorrow: "Due tomorrow", overdue: "{a} days overdue", overdue1: "1 day overdue",
    done: "Done", cancel: "Cancel", hoursQ: "Hours spent:", high: "High", normal: "Normal", low: "Low", est: "Est",
    title: "Title", dueDate: "Due date", estH: "Estimate (h)", prio: "Priority", save: "Save task", saved: "Task added", titleReq: "Enter a title.", estReq: "Enter a time estimate in hours.",
    noteTitle: "Title", noteText: "Note", withLink: "Add this page's link", saveNote: "Save note", noteSaved: "Note saved", noteReq: "Write something first.",
    logged: "Marked as done. {a} h logged.", allTasks: "See all tasks", error: "Something went wrong. Try again."
  },
  km: {
    signIn: "ចូល", username: "ឈ្មោះអ្នកប្រើ", password: "ពាក្យសម្ងាត់", server: "អាសយដ្ឋានម៉ាស៊ីនមេ", advanced: "ការកំណត់ម៉ាស៊ីនមេ",
    signInHelp: "ប្រើឈ្មោះអ្នកប្រើ និងពាក្យសម្ងាត់ដូចក្នុងកម្មវិធី Preahchan Tasks។", badLogin: "ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ ឬគណនីត្រូវបានបិទ។",
    offline: "មិនអាចភ្ជាប់ទៅម៉ាស៊ីនមេបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត។", needBoth: "សូមបញ្ចូលឈ្មោះអ្នកប្រើ និងពាក្យសម្ងាត់។",
    tasks: "ភារកិច្ច", add: "បន្ថែមភារកិច្ច", note: "កំណត់ចំណាំ", openApp: "បើកកម្មវិធី", signOut: "ចាកចេញ",
    week: "{a} នៃ {b} ភារកិច្ចសប្តាហ៍នេះ", hours: "បានកត់ត្រា {a} នៃ {b} ម៉ោង", unread: "ការជូនដំណឹងថ្មី {a}", unread1: "ការជូនដំណឹងថ្មី 1",
    none: "គ្មានភារកិច្ចនៅសល់ទេ។", due: "កំណត់", today: "កំណត់ថ្ងៃនេះ", tomorrow: "កំណត់ថ្ងៃស្អែក", overdue: "ហួសកំណត់ {a} ថ្ងៃ", overdue1: "ហួសកំណត់ 1 ថ្ងៃ",
    done: "រួចរាល់", cancel: "បោះបង់", hoursQ: "ម៉ោងបានចំណាយ៖", high: "ខ្ពស់", normal: "ធម្មតា", low: "ទាប", est: "ប៉ាន់ស្មាន",
    title: "ចំណងជើង", dueDate: "ថ្ងៃកំណត់", estH: "ប៉ាន់ស្មាន (ម៉ោង)", prio: "អាទិភាព", save: "រក្សាទុកភារកិច្ច", saved: "បានបន្ថែមភារកិច្ច", titleReq: "សូមបញ្ចូលចំណងជើង។", estReq: "សូមបញ្ចូលរយៈពេលប៉ាន់ស្មានជាម៉ោង។",
    noteTitle: "ចំណងជើង", noteText: "កំណត់ចំណាំ", withLink: "បន្ថែមតំណទំព័រនេះ", saveNote: "រក្សាទុក", noteSaved: "បានរក្សាទុកកំណត់ចំណាំ", noteReq: "សូមសរសេរអ្វីមួយជាមុន។",
    logged: "បានសម្គាល់ថារួចរាល់។ បានកត់ត្រា {a} ម៉ោង។", allTasks: "មើលភារកិច្ចទាំងអស់", error: "មានបញ្ហា។ សូមសាកម្តងទៀត។"
  }
};
let lang = "en";
const t = (k) => (T[lang] || T.en)[k] || T.en[k] || k;
const fill = (s, a, b) => String(s).replace("{a}", a ?? "").replace("{b}", b ?? "");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = (s) => document.querySelector(s);
const main = $("#main");
let st = { tab: "tasks", tasks: [], week: { done: 0, hours: 0 }, unread: 0, open: null, err: "" };

let toastTimer;
function toast(m) { const e = $("#toast"); e.textContent = m; e.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (e.hidden = true), 2400); }
function errText(e) { return e && e.status === 0 ? t("offline") : (e && e.message) || t("error"); }

function dueLabel(due) {
  if (!due) return "";
  const d = Math.round((new Date(due + "T00:00") - new Date(today() + "T00:00")) / 864e5);
  if (d === 0) return t("today"); if (d === 1) return t("tomorrow");
  if (d === -1) return t("overdue1"); if (d < 0) return fill(t("overdue"), -d);
  return t("due") + " " + new Date(due + "T00:00").toLocaleDateString(lang === "km" ? "km-KH" : "en-GB", { day: "numeric", month: "short" });
}
function applyLabels() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t)));
  $("#open-app").title = t("openApp"); $("#sign-out").title = t("signOut");
}

/* ---------- sign in ---------- */
function viewLogin(prefill) {
  $("#open-app").hidden = true; $("#sign-out").hidden = true;
  main.innerHTML = `<h1>${t("signIn")}</h1><p class="muted cap">${t("signInHelp")}</p>
   ${st.err ? `<p class="err" role="alert">${esc(st.err)}</p>` : ""}
   <form id="login" class="stack" style="display:flex;flex-direction:column;gap:10px">
    <label class="f">${t("username")}<input id="u" autocomplete="username" autocapitalize="none" value="${esc(prefill.user || "")}"></label>
    <label class="f">${t("password")}<input id="p" type="password" autocomplete="current-password"></label>
    <details><summary class="cap muted">${t("advanced")}</summary><label class="f" style="margin-top:6px">${t("server")}<input id="s" value="${esc(prefill.server)}"></label></details>
    <button class="btn primary" id="go">${t("signIn")}</button></form>`;
  $("#u").focus();
  $("#login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = $("#u").value.trim().toLowerCase(), pass = $("#p").value, server = ($("#s").value.trim() || DEFAULT_SERVER).replace(/\/+$/, "");
    if (!user || !pass) { st.err = t("needBoth"); viewLogin({ user, server }); return; }
    if (server !== DEFAULT_SERVER) {
      const ok = await chrome.permissions.request({ origins: [server + "/*"] }).catch(() => false);
      if (!ok) { st.err = t("offline"); viewLogin({ user, server }); return; }
    }
    $("#go").disabled = true;
    try {
      const rec = await login(server, user, pass);
      lang = rec.lang === "km" ? "km" : "en"; st.err = "";
      chrome.runtime.sendMessage({ type: "refresh" }).catch(() => {});
      await loadAndShow();
    } catch (err) {
      st.err = err.status === 0 ? t("offline") : t("badLogin");
      viewLogin({ user, server });
    }
  });
}

/* ---------- main ---------- */
async function loadAndShow() {
  const { user } = await session();
  $("#open-app").hidden = false; $("#sign-out").hidden = false;
  applyLabels();
  try {
    const [tasks, week, unread] = await Promise.all([openTasks(user), weekNumbers(user), unreadCount(user)]);
    const order = (k) => (k.due && k.due < today() ? 0 : k.status === "doing" ? 1 : 2);
    st.tasks = tasks.sort((a, b) => order(a) - order(b) || (a.due || "").localeCompare(b.due || ""));
    st.week = week; st.unread = unread;
  } catch (e) {
    if (e.status === 401 || e.status === 403) { await logout(); st.err = ""; return viewLogin({ server: (await session()).server }); }
    toast(errText(e));
  }
  render(user);
  updateBadge().catch(() => {});
}

function summary(user) {
  const kpi = user.kpi || 0, cap = user.cap || 44, pct = kpi ? Math.min(1, st.week.done / kpi) : 0, C = 2 * Math.PI * 24;
  return `<section class="sum" aria-label="${esc(fill(t("week"), st.week.done, kpi))}">
    <div class="ring"><svg viewBox="0 0 56 56" aria-hidden="true"><circle class="trk" cx="28" cy="28" r="24"/><circle class="prg" cx="28" cy="28" r="24" style="stroke-dasharray:${C.toFixed(1)};stroke-dashoffset:${(C * (1 - pct)).toFixed(1)}"/></svg><b>${st.week.done}</b></div>
    <span class="l1">${esc(fill(t("week"), st.week.done, kpi))}</span>
    <span class="l2">${esc(fill(t("hours"), st.week.hours, cap))}</span></section>
    ${st.unread ? `<button class="bell" id="bell" type="button">● ${esc(st.unread === 1 ? t("unread1") : fill(t("unread"), st.unread))}</button>` : ""}`;
}

function taskRow(k) {
  const late = k.due && k.due < today(), cl = k.expand && k.expand.client ? k.expand.client.name : "";
  const opts = [0.5, 1, 2, 4]; if (k.est && !opts.includes(k.est)) opts.push(k.est); opts.sort((a, b) => a - b);
  return `<article class="task" data-id="${esc(k.id)}">
    <div class="top"><span class="t">${esc(k.title)}</span>
     ${st.open === k.id ? "" : `<button class="btn small" data-done="${esc(k.id)}">${t("done")}</button>`}</div>
    <div class="meta"><span class="${late ? "late" : ""}">${esc(dueLabel(k.due))}</span><span class="pr ${esc(k.priority)}">${esc(t(k.priority))}</span>${k.est ? `<span>${t("est")} ${k.est} h</span>` : ""}${cl ? `<span>${esc(cl)}</span>` : ""}</div>
    ${st.open === k.id ? `<div class="hours"><span class="q">${t("hoursQ")}</span>${opts.map((h) => `<button class="chip" data-h="${h}" data-id="${esc(k.id)}">${h} h</button>`).join("")}<button class="link" data-cancel="1">${t("cancel")}</button></div>` : ""}
  </article>`;
}

function render(user) {
  const tab = (id, label) => `<button role="tab" data-tab="${id}" aria-selected="${st.tab === id}">${t(label)}</button>`;
  let body = "";
  if (st.tab === "tasks") {
    body = st.tasks.length ? `<div class="list">${st.tasks.map(taskRow).join("")}</div>` : `<p class="empty">${t("none")}</p>`;
    body += `<div class="foot"><button class="link" id="all">${t("allTasks")}</button><span class="cap muted">${st.tasks.length}</span></div>`;
  } else if (st.tab === "add") {
    body = `<form id="addf" style="display:flex;flex-direction:column;gap:10px">
      <label class="f">${t("title")}<input id="a-title" maxlength="200" autocomplete="off"></label>
      <div class="three"><label class="f">${t("dueDate")}<input id="a-due" type="date" value="${addDays(2)}"></label>
       <label class="f">${t("estH")}<input id="a-est" type="number" min="0.25" step="0.25" max="99" inputmode="decimal"></label>
       <label class="f">${t("prio")}<select id="a-prio"><option value="normal">${t("normal")}</option><option value="high">${t("high")}</option><option value="low">${t("low")}</option></select></label></div>
      <p class="err" id="a-err" role="alert" hidden></p>
      <button class="btn primary">${t("save")}</button></form>`;
  } else {
    body = `<form id="notef" style="display:flex;flex-direction:column;gap:10px">
      <label class="f">${t("noteTitle")}<input id="n-title" maxlength="120" autocomplete="off"></label>
      <label class="f">${t("noteText")}<textarea id="n-text" maxlength="5000"></textarea></label>
      <label class="c"><input type="checkbox" id="n-link" checked>${t("withLink")}</label>
      <p class="err" id="n-err" role="alert" hidden></p>
      <button class="btn primary">${t("saveNote")}</button></form>`;
  }
  main.innerHTML = summary(user) + `<div class="tabs" role="tablist">${tab("tasks", "tasks")}${tab("add", "add")}${tab("note", "note")}</div>` + body;
  if (st.tab === "add") $("#a-title").focus();
  if (st.tab === "note") $("#n-title").focus();
}

async function openApp() { const { server } = await session(); chrome.tabs.create({ url: server + "/" }); window.close(); }

main.addEventListener("click", async (e) => {
  const b = e.target.closest("button"); if (!b) return;
  const { user } = await session();
  if (b.dataset.tab) { st.tab = b.dataset.tab; st.open = null; render(user); return; }
  if (b.id === "bell" || b.id === "all") { openApp(); return; }
  if (b.dataset.done) { st.open = b.dataset.done; render(user); return; }
  if (b.dataset.cancel) { st.open = null; render(user); return; }
  if (b.dataset.h) {
    const id = b.dataset.id, h = parseFloat(b.dataset.h);
    document.querySelectorAll(".chip").forEach((c) => (c.disabled = true));
    try {
      await finishTask(id, h);
      const card = document.querySelector(`.task[data-id="${CSS.escape(id)}"]`);
      if (card) card.classList.add("leaving");
      toast(fill(t("logged"), h));
      setTimeout(() => { st.open = null; loadAndShow(); }, 320);
    } catch (err) { toast(errText(err)); st.open = null; render(user); }
  }
});

main.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { user } = await session();
  if (e.target.id === "addf") {
    const title = $("#a-title").value.trim(), est = parseFloat($("#a-est").value), er = $("#a-err");
    if (!title) { er.textContent = t("titleReq"); er.hidden = false; $("#a-title").focus(); return; }
    if (!(est > 0)) { er.textContent = t("estReq"); er.hidden = false; $("#a-est").focus(); return; }
    try { await addTask(user, { title, due: $("#a-due").value || addDays(2), est, priority: $("#a-prio").value }); toast(t("saved")); st.tab = "tasks"; await loadAndShow(); }
    catch (err) { er.textContent = errText(err); er.hidden = false; }
  }
  if (e.target.id === "notef") {
    const title = $("#n-title").value.trim(); let text = $("#n-text").value.trim(); const er = $("#n-err");
    if ($("#n-link").checked) {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }).catch(() => []);
      if (tab && tab.url && /^https?:/.test(tab.url)) text = (text ? text + "\n\n" : "") + tab.url;
    }
    if (!title && !text) { er.textContent = t("noteReq"); er.hidden = false; return; }
    try { await addNote(user, { title: title || text.split("\n")[0].slice(0, 120), text }); toast(t("noteSaved")); $("#n-title").value = ""; $("#n-text").value = ""; }
    catch (err) { er.textContent = errText(err); er.hidden = false; }
  }
});

$("#open-app").addEventListener("click", openApp);
$("#sign-out").addEventListener("click", async () => { await logout(); st = { tab: "tasks", tasks: [], week: { done: 0, hours: 0 }, unread: 0, open: null, err: "" }; viewLogin({ server: (await session()).server }); });

(async () => {
  const s = await session();
  if (s.user && s.user.lang === "km") lang = "km";
  applyLabels();
  if (s.token && s.user) loadAndShow(); else viewLogin({ server: s.server });
})();
