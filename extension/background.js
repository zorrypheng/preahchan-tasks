import { session, api, updateBadge, refreshAuth, recentUnread, addTask, addNote, addDays, logout } from "./api.js";

const MSG = {
  en: {
    assigned: "You have a new task.", comment: "New comment on one of your tasks.", file: "A new company file was shared.",
    note: "A note was shared with you.", noteRemind: "Note reminder.", rep: "A weekly report is waiting for your approval.",
    repok: "Your weekly report was approved.", repback: "Your weekly report was sent back.", overdue: "A task is overdue.", dueTom: "A task is due tomorrow.",
    other: "You have a new notification.", savedTask: "Added to your tasks.", savedNote: "Saved to your notes.",
    signIn: "Sign in from the Preahchan button in the toolbar first.", failed: "Couldn't save. Check your connection.",
    menuTask: "Add as Preahchan task", menuNote: "Save to Preahchan note"
  },
  km: {
    assigned: "អ្នកមានភារកិច្ចថ្មី។", comment: "មានមតិថ្មីលើភារកិច្ចរបស់អ្នក។", file: "មានឯកសារក្រុមហ៊ុនថ្មី។",
    note: "មានគេចែករំលែកកំណត់ចំណាំជាមួយអ្នក។", noteRemind: "រំលឹកកំណត់ចំណាំ។", rep: "មានរបាយការណ៍ប្រចាំសប្តាហ៍រង់ចាំការអនុម័តពីអ្នក។",
    repok: "របាយការណ៍ប្រចាំសប្តាហ៍របស់អ្នកត្រូវបានអនុម័ត។", repback: "របាយការណ៍ប្រចាំសប្តាហ៍របស់អ្នកត្រូវបានបញ្ជូនត្រឡប់។", overdue: "មានភារកិច្ចហួសកំណត់។", dueTom: "មានភារកិច្ចកំណត់ថ្ងៃស្អែក។",
    other: "អ្នកមានការជូនដំណឹងថ្មី។", savedTask: "បានបន្ថែមទៅភារកិច្ចរបស់អ្នក។", savedNote: "បានរក្សាទុកក្នុងកំណត់ចំណាំ។",
    signIn: "សូមចូលគណនីពីប៊ូតុង Preahchan នៅលើរបារឧបករណ៍ជាមុនសិន។", failed: "មិនអាចរក្សាទុកបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត។",
    menuTask: "បន្ថែមជាភារកិច្ច Preahchan", menuNote: "រក្សាទុកក្នុងកំណត់ចំណាំ Preahchan"
  }
};
const t = (lang, k) => (MSG[lang] || MSG.en)[k] || MSG.en[k];
const langOf = (user) => (user && user.lang === "km" ? "km" : "en");

function toast(id, message) {
  chrome.notifications.create(id || "", { type: "basic", iconUrl: "icons/icon128.png", title: "Preahchan Tasks", message, priority: 0 });
}

async function setupMenus() {
  const { user } = await session();
  const lang = langOf(user);
  await chrome.contextMenus.removeAll();
  chrome.contextMenus.create({ id: "pc-task", title: t(lang, "menuTask"), contexts: ["selection", "page", "link"] });
  chrome.contextMenus.create({ id: "pc-note", title: t(lang, "menuNote"), contexts: ["selection", "page", "link"] });
}

async function poll() {
  const { token, user } = await session();
  if (!token || !user) { await chrome.action.setBadgeText({ text: "" }); return; }
  try {
    await updateBadge();
    const { lastNotif } = await chrome.storage.local.get("lastNotif");
    const items = await recentUnread(user);
    if (items.length) {
      const newest = items[0].created;
      // the first check after signing in only remembers where we are, so old notices don't pop up
      if (lastNotif) items.filter((n) => n.created > lastNotif).slice(0, 3).reverse()
        .forEach((n) => toast("pc-n-" + n.id, t(langOf(user), MSG.en[n.kind] ? n.kind : "other")));
      if (newest > (lastNotif || "")) await chrome.storage.local.set({ lastNotif: newest });
    } else if (!lastNotif) {
      await chrome.storage.local.set({ lastNotif: new Date().toISOString().replace("T", " ") });
    }
  } catch (e) {
    if (e.status === 401 || e.status === 403) { await logout(); await chrome.action.setBadgeText({ text: "!" }); }
  }
}

async function dailyRefresh() {
  const { token } = await session();
  if (!token) return;
  try { await refreshAuth(); await setupMenus(); } catch (e) { if (e.status === 401) await logout(); }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("poll", { periodInMinutes: 5 });
  chrome.alarms.create("refresh", { periodInMinutes: 720 });
  setupMenus(); poll();
});
chrome.runtime.onStartup.addListener(() => { setupMenus(); poll(); });
chrome.alarms.onAlarm.addListener((a) => { if (a.name === "poll") poll(); if (a.name === "refresh") dailyRefresh(); });

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (msg && msg.type === "refresh") { setupMenus().then(poll).then(() => reply({ ok: true })); return true; }
});

chrome.notifications.onClicked.addListener(async (id) => {
  const { server } = await session();
  chrome.tabs.create({ url: server + "/" });
  chrome.notifications.clear(id);
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const { token, user } = await session();
  const lang = langOf(user);
  if (!token || !user) { toast("", t(lang, "signIn")); return; }
  const url = info.linkUrl || info.pageUrl || (tab && tab.url) || "";
  const sel = (info.selectionText || "").trim();
  const title = (sel || (tab && tab.title) || url).replace(/\s+/g, " ").trim();
  try {
    if (info.menuItemId === "pc-task") {
      await addTask(user, { title, desc: sel && sel !== title ? sel + "\n\n" + url : url, due: addDays(2), est: 1 });
      toast("", t(lang, "savedTask"));
      await updateBadge();
    } else if (info.menuItemId === "pc-note") {
      await addNote(user, { title: (tab && tab.title) || title, text: (sel ? sel + "\n\n" : "") + url });
      toast("", t(lang, "savedNote"));
    }
  } catch (e) {
    toast("", t(lang, "failed"));
  }
});
