// Talks to the Preahchan Tasks PocketBase server over its REST API.
export const DEFAULT_SERVER = "https://d.preahchan.com";

const pad = (n) => String(n).padStart(2, "0");
export const isoDate = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
export const today = () => isoDate(new Date());
export const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return isoDate(d); };
export const weekStart = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return isoDate(d); };
const q = (s) => encodeURIComponent(s);
// filter values are always record ids or yyyy-mm-dd dates; strip quotes anyway
const v = (s) => String(s).replace(/['"\\]/g, "");

export async function session() {
  const s = await chrome.storage.local.get(["server", "token", "user"]);
  return { server: s.server || DEFAULT_SERVER, token: s.token || "", user: s.user || null };
}

export async function api(path, { method = "GET", body } = {}) {
  const { server, token } = await session();
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = token;
  let res;
  try {
    res = await fetch(server + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  } catch (e) {
    const err = new Error("offline"); err.status = 0; throw err;
  }
  let data = null;
  try { data = await res.json(); } catch (e) {}
  if (!res.ok) {
    const err = new Error((data && data.message) || "HTTP " + res.status);
    err.status = res.status; err.data = data; throw err;
  }
  return data;
}

export async function login(server, identity, password) {
  await chrome.storage.local.set({ server });
  const d = await api("/api/collections/users/auth-with-password", { method: "POST", body: { identity, password } });
  await chrome.storage.local.set({ token: d.token, user: d.record, lastNotif: "" });
  return d.record;
}

export async function refreshAuth() {
  const d = await api("/api/collections/users/auth-refresh", { method: "POST" });
  await chrome.storage.local.set({ token: d.token, user: d.record });
  return d.record;
}

export async function logout() {
  await chrome.storage.local.remove(["token", "user", "lastNotif"]);
  try { await chrome.action.setBadgeText({ text: "" }); } catch (e) {}
}

export async function openTasks(user) {
  const f = `assignee='${v(user.id)}' && status!='done'`;
  const r = await api(`/api/collections/tasks/records?perPage=100&sort=due&expand=client&filter=${q(f)}`);
  return r.items;
}

export async function weekNumbers(user) {
  const f = `assignee='${v(user.id)}' && status='done' && done_at>='${v(weekStart())}'`;
  const r = await api(`/api/collections/tasks/records?perPage=500&fields=id,spent&filter=${q(f)}`);
  return { done: r.items.length, hours: Math.round(r.items.reduce((a, k) => a + (k.spent || 0), 0) * 100) / 100 };
}

export async function unreadCount(user) {
  const r = await api(`/api/collections/notifications/records?perPage=1&fields=id&filter=${q(`user='${v(user.id)}' && read=false`)}`);
  return r.totalItems;
}

export async function dueCount(user) {
  const f = `assignee='${v(user.id)}' && status!='done' && due<='${v(today())}'`;
  const r = await api(`/api/collections/tasks/records?perPage=1&fields=id&filter=${q(f)}`);
  return r.totalItems;
}

export async function recentUnread(user) {
  const r = await api(`/api/collections/notifications/records?perPage=5&sort=-created&filter=${q(`user='${v(user.id)}' && read=false`)}`);
  return r.items;
}

export const finishTask = (id, hours, stage) => api(`/api/collections/tasks/records/${v(id)}`, { method: "PATCH", body: Object.assign({ status: "done", done_at: today(), spent: hours }, stage ? { stage } : {}) });
export const moveStage = (id, stage) => api(`/api/collections/tasks/records/${v(id)}`, { method: "PATCH", body: { stage } });

// Workflow: statuses, task types and positions
export async function loadWorkflow() {
  const get = (c) => api(`/api/collections/${c}/records?perPage=500`).then((r) => r.items).catch(() => []);
  const [statuses, types, positions] = await Promise.all([get("statuses"), get("task_types"), get("positions")]);
  statuses.sort((a, b) => (a.sort || 0) - (b.sort || 0));
  return { statuses, types, positions };
}
export function flowOf(wf, typeId) {
  const tp = wf.types.find((x) => x.id === typeId);
  return wf.statuses.filter((s) => !tp || !(tp.statuses || []).length || tp.statuses.includes(s.id));
}
export function nextOf(wf, task) {
  const f = flowOf(wf, task.type), i = f.findIndex((s) => s.id === task.stage);
  return i >= 0 ? (f[i + 1] || null) : (f[0] || null);
}
export function canMoveTo(wf, user, stageId) {
  if (user.role === "admin") return true;
  const ps = wf.positions.filter((p) => (user.positions || []).includes(p.id));
  if (!ps.length) return true;
  return ps.some((p) => (p.statuses || []).includes(stageId));
}
export const startTask = (id) => api(`/api/collections/tasks/records/${v(id)}`, { method: "PATCH", body: { status: "doing" } });

export function addTask(user, { title, desc = "", due, est, priority = "normal" }) {
  return api("/api/collections/tasks/records", { method: "POST", body: {
    title: title.slice(0, 200), desc: desc.slice(0, 2000), assignee: user.id, creator: user.id,
    due: due || addDays(2), priority, status: "todo", est: est || 1
  } });
}

export function addNote(user, { title, text = "" }) {
  return api("/api/collections/notes/records", { method: "POST", body: {
    owner: user.id, title: title.slice(0, 120), text: text.slice(0, 5000), items: [], color: "yellow", pinned: false, share: "private"
  } });
}

// Toolbar badge: tasks due today or overdue
export async function updateBadge() {
  const { token, user } = await session();
  if (!token || !user) { await chrome.action.setBadgeText({ text: "" }); return null; }
  const n = await dueCount(user);
  await chrome.action.setBadgeBackgroundColor({ color: "#a33f06" });
  await chrome.action.setBadgeTextColor?.({ color: "#ffffff" });
  await chrome.action.setBadgeText({ text: n ? String(Math.min(n, 99)) : "" });
  return n;
}
