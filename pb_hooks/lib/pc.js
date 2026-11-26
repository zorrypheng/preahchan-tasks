// Shared helpers for the Preahchan Tasks server hooks.
// PocketBase runs each hook in its own sandbox, so every hook loads this file with require().

const TZ_OFFSET_HOURS = 7 // Cambodia (UTC+7, no daylight saving)

const TEXT = {
  en: {
    assigned: "New task from {by}: <b>{title}</b>\nDue {due} · Est {est} h",
    comment: "{by} commented on <b>{title}</b>:\n{text}",
    file: "{by} shared a company file: <b>{name}</b>",
    note: "{by} shared a note with you: <b>{title}</b>",
    rep: "{by} submitted a weekly report for {week}: {n} tasks · {h} h.",
    repok: "{by} approved your weekly report for {week}.",
    repback: "{by} sent back your weekly report for {week}:\n<b>{comment}</b>",
    noteRemind: "Note reminder: <b>{title}</b>",
    overdue: "Overdue: <b>{title}</b>",
    dueTom: "Due tomorrow: <b>{title}</b>",
    morning: "Good morning, {name}. Here is your day:",
    nothing: "Nothing due today.",
    overdueTag: "(overdue)",
    team: "Overdue in your team:",
    start: "Start", done: "Mark as done", open: "Open the app", approve: "Approve",
    hoursQ: "How many hours did you spend on <b>{title}</b>?",
    markedDone: "Marked as done · {h} h logged",
    started: "Started",
    linked: "Connected. Hi {name}, you will get your tasks, reminders and reports here.",
    unknown: "Open the Preahchan Tasks app, tap your avatar, then Connect Telegram. Send the code it shows you here.",
    badCode: "That code did not work. Open the app and tap Connect Telegram again for a new code.",
    approved: "Approved", notAllowed: "You can't do that.",
    kpi: "This week: {n} of {kpi} tasks done · {h} of {cap} hours logged.",
    next: "Next: {s}", movedTo: "Moved to {s}", cantMove: "Your position can't move tasks to {s}.", lastStep: "This task is already at its last status.",
    handoff: "<b>{title}</b> is now at {s}. Open the app to hand it to someone who handles {s}."
  },
  km: {
    assigned: "ភារកិច្ចថ្មីពី {by}៖ <b>{title}</b>\nកំណត់ {due} · ប៉ាន់ស្មាន {est} ម៉ោង",
    comment: "{by} បានផ្តល់មតិលើ <b>{title}</b>៖\n{text}",
    file: "{by} បានចែករំលែកឯកសារក្រុមហ៊ុន៖ <b>{name}</b>",
    note: "{by} បានចែករំលែកកំណត់ចំណាំជាមួយអ្នក៖ <b>{title}</b>",
    rep: "{by} បានដាក់របាយការណ៍ប្រចាំសប្តាហ៍សម្រាប់ {week}៖ ភារកិច្ច {n} · {h} ម៉ោង។",
    repok: "{by} បានអនុម័តរបាយការណ៍របស់អ្នកសម្រាប់ {week}។",
    repback: "{by} បានបញ្ជូនរបាយការណ៍របស់អ្នកសម្រាប់ {week} ត្រឡប់៖\n<b>{comment}</b>",
    noteRemind: "រំលឹកកំណត់ចំណាំ៖ <b>{title}</b>",
    overdue: "ហួសកំណត់៖ <b>{title}</b>",
    dueTom: "កំណត់ថ្ងៃស្អែក៖ <b>{title}</b>",
    morning: "អរុណសួស្តី {name}។ នេះជាការងារថ្ងៃនេះ៖",
    nothing: "គ្មានភារកិច្ចកំណត់ថ្ងៃនេះទេ។",
    overdueTag: "(ហួសកំណត់)",
    team: "ភារកិច្ចហួសកំណត់ក្នុងក្រុមរបស់អ្នក៖",
    start: "ចាប់ផ្តើម", done: "សម្គាល់ថារួចរាល់", open: "បើកកម្មវិធី", approve: "អនុម័ត",
    hoursQ: "តើអ្នកចំណាយពេលប៉ុន្មានម៉ោងលើ <b>{title}</b>?",
    markedDone: "បានសម្គាល់ថារួចរាល់ · បានកត់ត្រា {h} ម៉ោង",
    started: "បានចាប់ផ្តើម",
    linked: "បានភ្ជាប់ហើយ។ សួស្តី {name} អ្នកនឹងទទួលភារកិច្ច ការរំលឹក និងរបាយការណ៍នៅទីនេះ។",
    unknown: "បើកកម្មវិធី Preahchan Tasks ចុចរូបគណនី រួចចុច ភ្ជាប់ Telegram។ ផ្ញើលេខកូដដែលវាបង្ហាញមកទីនេះ។",
    badCode: "លេខកូដនេះមិនដំណើរការទេ។ សូមបើកកម្មវិធី ហើយចុច ភ្ជាប់ Telegram ម្តងទៀត។",
    approved: "បានអនុម័ត", notAllowed: "អ្នកមិនអាចធ្វើបែបនេះបានទេ។",
    kpi: "សប្តាហ៍នេះ៖ បានបញ្ចប់ {n} នៃ {kpi} ភារកិច្ច · បានកត់ត្រា {h} នៃ {cap} ម៉ោង។",
    next: "បន្ទាប់៖ {s}", movedTo: "បានផ្លាស់ទៅ {s}", cantMove: "តួនាទីរបស់អ្នកមិនអាចផ្លាស់ភារកិច្ចទៅ {s} បានទេ។", lastStep: "ភារកិច្ចនេះនៅស្ថានភាពចុងក្រោយហើយ។",
    handoff: "<b>{title}</b> ឥឡូវនៅ {s}។ សូមបើកកម្មវិធីដើម្បីប្រគល់ទៅអ្នកទទួលខុសត្រូវ {s}។"
  }
}

function esc(s) { return String(s == null ? "" : s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])) }
function fill(tpl, vals) { return tpl.replace(/\{(\w+)\}/g, (m, k) => (vals[k] == null ? "" : String(vals[k]))) }
function round2(n) { return Math.round((n || 0) * 100) / 100 }
// JSON fields come back from records as raw JSON text
function jsonOf(rec, field) { try { const s = rec.getString(field); return s ? JSON.parse(s) : null } catch (e) { return null } }

module.exports = {
  esc, fill, round2, jsonOf,

  // Current time in Cambodia, independent of the server's timezone
  ict() {
    const d = new Date(Date.now() + TZ_OFFSET_HOURS * 3600000)
    const s = d.toISOString()
    return { date: s.slice(0, 10), hm: s.slice(11, 16), stamp: s.slice(0, 10) + "T" + s.slice(11, 16), dow: d.getUTCDay(), hour: d.getUTCHours() }
  },
  addDays(dateStr, n) { const d = new Date(dateStr + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10) },
  weekStart(dateStr) { const d = new Date(dateStr + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10) },
  shortDate(dateStr) {
    const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    if (!dateStr) return ""
    return parseInt(dateStr.slice(8, 10), 10) + " " + m[parseInt(dateStr.slice(5, 7), 10) - 1]
  },
  weekLabel(week) { return this.shortDate(week) + " – " + this.shortDate(this.addDays(week, 6)) },

  t(lang, key) { return (TEXT[lang] || TEXT.en)[key] || TEXT.en[key] || key },
  lang(user) { return user && user.getString("lang") === "km" ? "km" : "en" },

  userName(app, id) {
    try { const u = app.findRecordById("users", id); return u.getString("name") || u.getString("username") } catch (e) { return "" }
  },

  // Create an in-app notification; the notifications hook forwards it to Telegram
  notify(app, userId, kind, data) {
    if (!userId) return
    const col = app.findCollectionByNameOrId("notifications")
    const r = new Record(col)
    r.set("user", userId)
    r.set("kind", kind)
    r.set("data", data || {})
    r.set("read", false)
    app.save(r)
  },

  activeUsers(app) { return app.findRecordsByFilter("users", "active = true", "name", 500, 0) },

  // Numbers for a weekly report, always computed on the server
  buildSnap(app, userId, week) {
    const end = this.addDays(week, 6)
    const user = app.findRecordById("users", userId)
    const done = app.findRecordsByFilter("tasks", "assignee = {:u} && status = 'done' && done_at >= {:a} && done_at <= {:b}", "done_at", 1000, 0, { u: userId, a: week, b: end })
    const open = app.findRecordsByFilter("tasks", "assignee = {:u} && status != 'done'", "", 1000, 0, { u: userId })
    const today = this.ict().date
    return {
      items: done.map((k) => ({ title: k.getString("title"), client: k.getString("client"), est: k.getFloat("est"), spent: k.getFloat("spent"), doneAt: k.getString("done_at") })),
      kpi: user.getInt("kpi"), cap: user.getFloat("cap") || 44,
      open: open.length, overdue: open.filter((k) => k.getString("due") && k.getString("due") < today).length
    }
  },

  // ---------- Workflow: statuses, task types, positions ----------
  flow(app, typeId) {
    let ids = []
    if (typeId) { try { ids = app.findRecordById("task_types", typeId).getStringSlice("statuses") } catch (e) {} }
    const all = app.findRecordsByFilter("statuses", "id != ''", "sort", 200, 0)
    return all.filter((s) => !ids.length || ids.indexOf(s.id) >= 0)
  },
  userSees(app, user, stageId) {
    if (!user || user.getString("role") === "admin") return true
    const pids = user.getStringSlice("positions")
    if (!pids.length) return true
    return app.findRecordsByIds("positions", pids).some((p) => p.getStringSlice("statuses").indexOf(stageId) >= 0)
  },
  stageName(app, id, lang) {
    try { const s = app.findRecordById("statuses", id); return (lang === "km" && s.getString("name_km")) || s.getString("name") } catch (e) { return "" }
  },
  nextOf(app, task) {
    const f = this.flow(app, task.getString("type"))
    const i = f.findIndex((s) => s.id === task.getString("stage"))
    return i >= 0 ? (f[i + 1] || null) : (f[0] || null)
  },
  // Keep the simple done/not-done status in step with the workflow status, for KPI, hours and reports
  syncStage(app, r, isNew) {
    const f = this.flow(app, r.getString("type"))
    if (!f.length) return
    const o = isNew ? null : r.original()
    const statusNow = r.getString("status"), statusBefore = o ? o.getString("status") : ""
    const stageChanged = isNew || r.getString("stage") !== o.getString("stage")
    const doneSt = f.find((s) => s.getBool("done"))
    if (!r.getString("stage")) { r.set("stage", f[0].id) }
    else if (!stageChanged && statusNow !== statusBefore) {
      // an older client changed only the simple status
      if (statusNow === "done" && doneSt) { r.set("stage", doneSt.id); return }
      if (statusBefore === "done" && statusNow !== "done") {
        const open = f.filter((s) => !s.getBool("done"))
        const back = open.length ? open[open.length - 1] : f[0]
        r.set("stage", back.id)
        r.set("status", back.id === f[0].id ? "todo" : "doing")
      }
      return
    }
    const cur = f.find((s) => s.id === r.getString("stage"))
    if (!cur) return
    if (cur.getBool("done")) {
      r.set("status", "done")
      if (!r.getString("done_at")) r.set("done_at", this.ict().date)
    } else {
      r.set("status", cur.id === f[0].id ? "todo" : "doing")
      if (o && o.getString("status") === "done") { r.set("done_at", ""); r.set("spent", 0) }
    }
  },
  // Only people whose position covers the new status may move a task there
  checkMove(app, r, auth) {
    if (!auth || auth.collection().name !== "users" || auth.getString("role") === "admin") return
    const o = r.original()
    let target = ""
    if (r.getString("stage") && r.getString("stage") !== o.getString("stage")) target = r.getString("stage")
    else if (r.getString("status") === "done" && o.getString("status") !== "done") {
      const d = this.flow(app, r.getString("type")).find((s) => s.getBool("done"))
      if (d) target = d.id
    }
    if (target && !this.userSees(app, auth, target)) throw new ForbiddenError("Your position can't move tasks to " + this.stageName(app, target, "en") + ".")
  },
  nextButton(app, task, lang) {
    if (task.getString("status") === "done") return null
    const nx = this.nextOf(app, task)
    return nx ? [{ text: fill(this.t(lang, "next"), { s: (lang === "km" && nx.getString("name_km")) || nx.getString("name") }), callback_data: "n:" + task.id }] : null
  },

  // ---------- Telegram ----------
  token() { return $os.getenv("TELEGRAM_BOT_TOKEN") || "" },
  hookSecret() { const tok = this.token(); return tok ? $security.sha256("preahchan-webhook:" + tok).substring(0, 40) : "" },
  appURL(app) { return String(app.settings().meta.appURL || "").replace(/\/+$/, "") },

  tg(method, payload) {
    const tok = this.token()
    if (!tok) return null
    try {
      const res = $http.send({
        url: "https://api.telegram.org/bot" + tok + "/" + method,
        method: "POST",
        body: JSON.stringify(payload || {}),
        headers: { "content-type": "application/json" },
        timeout: 20
      })
      if (res.statusCode !== 200) console.log("telegram " + method + " failed: " + res.statusCode + " " + res.raw)
      return res.json
    } catch (e) {
      console.log("telegram " + method + " error: " + e)
      return null
    }
  },

  send(user, text, buttons) {
    const chat = user.getString("tg_chat")
    if (!chat || !this.token()) return
    const p = { chat_id: chat, text: text, parse_mode: "HTML", disable_web_page_preview: true }
    if (buttons && buttons.length) p.reply_markup = { inline_keyboard: buttons }
    this.tg("sendMessage", p)
  },

  openButton(app, lang) {
    const url = this.appURL(app)
    return url.indexOf("https://") === 0 ? [{ text: this.t(lang, "open"), url: url }] : null
  },

  // Turn an in-app notification into a Telegram message
  forward(app, notif) {
    const data = jsonOf(notif, "data") || {}
    if (data.quiet) return
    let user
    try { user = app.findRecordById("users", notif.getString("user")) } catch (e) { return }
    if (!user.getString("tg_chat") || !user.getBool("active")) return
    const lang = this.lang(user), kind = notif.getString("kind")
    const by = data.by ? esc(this.userName(app, data.by)) : ""
    const rows = []
    let text = ""
    const task = () => { try { return data.task ? app.findRecordById("tasks", data.task) : null } catch (e) { return null } }
    if (kind === "assigned") {
      const k = task(); if (!k) return
      text = fill(this.t(lang, "assigned"), { by: by, title: esc(k.getString("title")), due: this.shortDate(k.getString("due")), est: round2(k.getFloat("est")) })
      const nb = this.nextButton(app, k, lang); if (nb) rows.push(nb)
    } else if (kind === "comment") {
      const k = task(); if (!k) return
      text = fill(this.t(lang, "comment"), { by: by, title: esc(k.getString("title")), text: esc(data.text || "") })
    } else if (kind === "file") {
      text = fill(this.t(lang, "file"), { by: by, name: esc(data.name) })
    } else if (kind === "note" || kind === "noteRemind") {
      let title = data.title || ""
      try { title = app.findRecordById("notes", data.note).getString("title") || title } catch (e) {}
      text = fill(this.t(lang, kind), { by: by, title: esc(title) })
    } else if (kind === "rep" || kind === "repok" || kind === "repback") {
      let r
      try { r = app.findRecordById("reports", data.rep) } catch (e) { return }
      const snap = jsonOf(r, "snap") || {}
      const items = (snap && snap.items) || []
      const hours = items.reduce((a, x) => a + (x.spent || 0), 0)
      text = fill(this.t(lang, kind), { by: by, week: this.weekLabel(r.getString("week")), n: items.length, h: round2(hours), comment: esc(r.getString("comment")) })
      if (kind === "rep" && r.getString("status") === "pending") rows.push([{ text: this.t(lang, "approve"), callback_data: "ra:" + r.id }])
    } else if (kind === "overdue" || kind === "dueTom") {
      const k = task(); if (!k) return
      text = fill(this.t(lang, kind), { title: esc(k.getString("title")) })
      const nb = this.nextButton(app, k, lang); if (nb) rows.push(nb)
    } else {
      return
    }
    const open = this.openButton(app, lang)
    if (open) rows.push(open)
    this.send(user, text, rows)
  },

  setupWebhook(app) {
    const tok = this.token()
    if (!tok) { console.log("Telegram: TELEGRAM_BOT_TOKEN is not set, bot is off"); return }
    const url = this.appURL(app)
    if (url.indexOf("https://") !== 0) { console.log("Telegram: Application URL must start with https:// for the bot, skipping webhook"); return }
    const res = this.tg("setWebhook", { url: url + "/api/pc/tg/hook/" + this.hookSecret(), allowed_updates: ["message", "callback_query"], drop_pending_updates: false })
    console.log("Telegram webhook: " + JSON.stringify(res))
    this.tg("setMyCommands", { commands: [{ command: "today", description: "My tasks for today" }, { command: "kpi", description: "My week so far" }] })
  },

  todayText(app, user) {
    const lang = this.lang(user), today = this.ict().date
    const list = app.findRecordsByFilter("tasks", "assignee = {:u} && status != 'done' && due <= {:d}", "due", 30, 0, { u: user.id, d: today })
    let text = fill(this.t(lang, "morning"), { name: esc(user.getString("name") || user.getString("username")) }) + "\n"
    if (!list.length) text += this.t(lang, "nothing")
    list.forEach((k) => { text += "\n• " + esc(k.getString("title")) + (k.getString("due") < today ? " " + this.t(lang, "overdueTag") : "") })
    const rows = list.slice(0, 6).map((k) => [{ text: "→ " + k.getString("title").substring(0, 40), callback_data: "n:" + k.id }])
    return { text: text, rows: rows }
  },

  kpiText(app, user) {
    const lang = this.lang(user), today = this.ict().date, ws = this.weekStart(today), we = this.addDays(ws, 6)
    const done = app.findRecordsByFilter("tasks", "assignee = {:u} && status = 'done' && done_at >= {:a} && done_at <= {:b}", "", 1000, 0, { u: user.id, a: ws, b: we })
    const h = done.reduce((a, k) => a + k.getFloat("spent"), 0)
    return fill(this.t(lang, "kpi"), { n: done.length, kpi: user.getInt("kpi"), h: round2(h), cap: user.getFloat("cap") || 44 })
  },

  // Morning summary, Monday to Saturday at 08:00 Cambodia time
  morning(app) {
    const now = this.ict(), today = now.date, yesterday = this.addDays(today, -1), tomorrow = this.addDays(today, 1)
    const users = this.activeUsers(app)
    users.forEach((u) => {
      try {
        // in-app notices: tasks that became overdue yesterday, and tasks due tomorrow
        app.findRecordsByFilter("tasks", "assignee = {:u} && status != 'done' && due = {:d}", "", 100, 0, { u: u.id, d: yesterday })
          .forEach((k) => this.notify(app, u.id, "overdue", { task: k.id, quiet: true }))
        app.findRecordsByFilter("tasks", "assignee = {:u} && status != 'done' && due = {:d}", "", 100, 0, { u: u.id, d: tomorrow })
          .forEach((k) => this.notify(app, u.id, "dueTom", { task: k.id, quiet: true }))
        if (!u.getString("tg_chat")) return
        const lang = this.lang(u)
        const m = this.todayText(app, u)
        let text = m.text
        const role = u.getString("role")
        if (role === "manager" || role === "admin") {
          const late = app.findRecordsByFilter("tasks", "status != 'done' && due < {:d} && assignee.role = 'staff' && assignee.active = true", "due", 30, 0, { d: today })
          if (late.length) {
            text += "\n\n" + this.t(lang, "team")
            late.forEach((k) => { text += "\n• " + esc(this.userName(app, k.getString("assignee"))) + ": " + esc(k.getString("title")) })
          }
        }
        text += "\n\n" + this.kpiText(app, u)
        const rows = m.rows.slice()
        const open = this.openButton(app, lang)
        if (open) rows.push(open)
        this.send(u, text, rows)
      } catch (e) { console.log("morning summary failed for " + u.id + ": " + e) }
    })
  },

  noteReminders(app) {
    const now = this.ict().stamp
    const due = app.findRecordsByFilter("notes", "remind != '' && remind <= {:n} && reminded = false", "remind", 200, 0, { n: now })
    due.forEach((n) => {
      try {
        n.set("reminded", true)
        app.save(n)
        this.notify(app, n.getString("owner"), "noteRemind", { note: n.id, title: n.getString("title") })
      } catch (e) { console.log("note reminder failed: " + e) }
    })
  },

  // ---------- Incoming Telegram updates ----------
  handleUpdate(app, u) {
    if (u.message && u.message.chat) return this.handleMessage(app, u.message)
    if (u.callback_query) return this.handleCallback(app, u.callback_query)
  },

  userByChat(app, chatId) {
    try { return app.findFirstRecordByData("users", "tg_chat", String(chatId)) } catch (e) { return null }
  },

  handleMessage(app, msg) {
    const chat = String(msg.chat.id), text = String(msg.text || "").trim()
    const reply = (s) => this.tg("sendMessage", { chat_id: chat, text: s, parse_mode: "HTML" })
    if (text.indexOf("/start") === 0 || /^[A-Z2-9]{8}$/.test(text)) {
      const code = text.replace("/start", "").trim().toUpperCase()
      if (!code) { reply(this.t("en", "unknown") + "\n\n" + this.t("km", "unknown")); return }
      let user = null
      try { user = app.findFirstRecordByData("users", "tg_code", code) } catch (e) {}
      if (!user || !user.getBool("active")) { reply(this.t("en", "badCode") + "\n\n" + this.t("km", "badCode")); return }
      // one Telegram chat per person
      app.findRecordsByFilter("users", "tg_chat = {:c} && id != {:id}", "", 10, 0, { c: chat, id: user.id }).forEach((o) => { o.set("tg_chat", ""); o.set("tg_on", false); app.save(o) })
      user.set("tg_chat", chat); user.set("tg_on", true); user.set("tg_code", "")
      app.save(user)
      reply(fill(this.t(this.lang(user), "linked"), { name: esc(user.getString("name")) }))
      return
    }
    const user = this.userByChat(app, chat)
    if (!user || !user.getBool("active")) { reply(this.t("en", "unknown") + "\n\n" + this.t("km", "unknown")); return }
    if (text.indexOf("/today") === 0) {
      const m = this.todayText(app, user)
      this.send(user, m.text, m.rows)
    } else if (text.indexOf("/kpi") === 0) {
      this.send(user, this.kpiText(app, user))
    } else {
      const m = this.todayText(app, user)
      this.send(user, m.text, m.rows)
    }
  },

  handleCallback(app, cq) {
    const answer = (s) => this.tg("answerCallbackQuery", { callback_query_id: cq.id, text: s || "" })
    const user = this.userByChat(app, cq.from && cq.from.id)
    if (!user || !user.getBool("active")) { answer(this.t("en", "unknown")); return }
    const lang = this.lang(user), data = String(cq.data || ""), parts = data.split(":")
    const msg = cq.message || {}, chat = msg.chat ? msg.chat.id : null, mid = msg.message_id
    const ownTask = (id) => { try { const k = app.findRecordById("tasks", id); return k.getString("assignee") === user.id ? k : null } catch (e) { return null } }

    if (parts[0] === "s") {
      const k = ownTask(parts[1]); if (!k) { answer(this.t(lang, "notAllowed")); return }
      if (k.getString("status") === "todo") { k.set("status", "doing"); app.save(k) }
      answer(this.t(lang, "started"))
      return
    }
    if (parts[0] === "n") {
      const k = ownTask(parts[1]); if (!k) { answer(this.t(lang, "notAllowed")); return }
      const nx = this.nextOf(app, k)
      if (!nx || k.getString("status") === "done") { answer(this.t(lang, "lastStep")); return }
      const nxName = (lang === "km" && nx.getString("name_km")) || nx.getString("name")
      if (!this.userSees(app, user, nx.id)) { answer(fill(this.t(lang, "cantMove"), { s: nxName })); return }
      if (!nx.getBool("done")) {
        k.set("stage", nx.id); app.save(k)
        answer(fill(this.t(lang, "movedTo"), { s: nxName }))
        if (chat && mid) this.tg("editMessageText", { chat_id: chat, message_id: mid, parse_mode: "HTML", text: esc(k.getString("title")) + "\n" + fill(this.t(lang, "movedTo"), { s: esc(nxName) }) })
        return
      }
      // the next status is the finished one: ask for hours first
      parts[0] = "d"
    }
    if (parts[0] === "d") {
      const k = ownTask(parts[1]); if (!k) { answer(this.t(lang, "notAllowed")); return }
      const dn = this.flow(app, k.getString("type")).find((s) => s.getBool("done"))
      if (dn && !this.userSees(app, user, dn.id)) { answer(fill(this.t(lang, "cantMove"), { s: (lang === "km" && dn.getString("name_km")) || dn.getString("name") })); return }
      const est = round2(k.getFloat("est"))
      const opts = [0.5, 1, 2, 4]
      if (est > 0 && opts.indexOf(est) < 0) opts.push(est)
      opts.sort((a, b) => a - b)
      answer("")
      this.tg("sendMessage", {
        chat_id: chat, parse_mode: "HTML",
        text: fill(this.t(lang, "hoursQ"), { title: esc(k.getString("title")) }),
        reply_markup: { inline_keyboard: [opts.map((h) => ({ text: h + " h", callback_data: "h:" + k.id + ":" + h }))] }
      })
      return
    }
    if (parts[0] === "h") {
      const k = ownTask(parts[1]); const h = parseFloat(parts[2])
      if (!k || !(h > 0)) { answer(this.t(lang, "notAllowed")); return }
      if (k.getString("status") !== "done") {
        k.set("status", "done"); k.set("done_at", this.ict().date); k.set("spent", h)
        app.save(k)
      }
      const doneText = fill(this.t(lang, "markedDone"), { h: h })
      answer(doneText)
      if (chat && mid) this.tg("editMessageText", { chat_id: chat, message_id: mid, parse_mode: "HTML", text: esc(k.getString("title")) + "\n" + doneText })
      return
    }
    if (parts[0] === "ra") {
      let r = null
      try { r = app.findRecordById("reports", parts[1]) } catch (e) {}
      const role = user.getString("role")
      let ownerRole = ""
      try { ownerRole = app.findRecordById("users", r.getString("user")).getString("role") } catch (e) {}
      const allowed = r && r.getString("user") !== user.id && (role === "admin" || (role === "manager" && ownerRole === "staff"))
      if (!allowed) { answer(this.t(lang, "notAllowed")); return }
      if (r.getString("status") === "pending") {
        r.set("status", "approved"); r.set("decided_by", user.id); r.set("decided_at", this.ict().stamp); r.set("comment", "")
        app.save(r)
      }
      answer(this.t(lang, "approved"))
      if (chat && mid) this.tg("editMessageReplyMarkup", { chat_id: chat, message_id: mid, reply_markup: { inline_keyboard: [] } })
      return
    }
    answer("")
  }
}
