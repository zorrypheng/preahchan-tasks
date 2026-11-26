// Shared helpers for the Preahchan Tasks server hooks.
// PocketBase runs each hook in its own sandbox, so every hook loads this file with require().

const TZ_OFFSET_HOURS = 7 // Cambodia (UTC+7, no daylight saving)

const TEXT = {
  en: {
    delreq: "{by} asks to delete the task <b>{title}</b>.{reason}",
    delok: "{by} deleted <b>{title}</b>, as you asked.",
    delno: "{by} kept <b>{title}</b>. Your delete request was declined.",
    reasonL: "\nReason: {r}", btnDel: "Delete task", btnKeep: "Keep task", taskDeleted: "Task deleted", taskKept: "Task kept", delGone: "This request was already handled.",
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
    kpi: "This week: {n} of {kpi} stages finished · {h} of {cap} hours logged.",
    finish: "Finish: {s}", turn: "{by} finished {prev}. Your turn: <b>{title}</b> · {s}\nDue {due}",
    pickInApp: "Open the app to choose who does the next stage.", finishedStage: "Finished {s} · {h} h logged", finishedRec: "Finished {s}",
    nudge: "Today you logged {h} h across {n} stages.", nudgeNone: "You haven't logged any hours today. Anything missing?", nudgeOk: "Thanks! Anything missing? You can still log it in the app.",
    hoursNeeded: "Enter the hours you spent.", nextNeeded: "Choose who does the next stage.", notYours: "Only the person on this stage, or a manager, can finish it.",
    next: "Next: {s}", movedTo: "Moved to {s}", cantMove: "Your position can't move tasks to {s}.", lastStep: "This task is already at its last status.",
    handoff: "<b>{title}</b> is now at {s}. Open the app to hand it to someone who handles {s}."
  },
  km: {
    delreq: "{by} សុំលុបភារកិច្ច <b>{title}</b>។{reason}",
    delok: "{by} បានលុប <b>{title}</b> តាមសំណើរបស់អ្នក។",
    delno: "{by} បានរក្សាទុក <b>{title}</b>។ សំណើលុបរបស់អ្នកមិនត្រូវបានយល់ព្រមទេ។",
    reasonL: "\nមូលហេតុ៖ {r}", btnDel: "លុបភារកិច្ច", btnKeep: "រក្សាទុកភារកិច្ច", taskDeleted: "បានលុបភារកិច្ច", taskKept: "បានរក្សាទុកភារកិច្ច", delGone: "សំណើនេះត្រូវបានដោះស្រាយរួចហើយ។",
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
    kpi: "សប្តាហ៍នេះ៖ បានបញ្ចប់ {n} នៃ {kpi} ដំណាក់កាល · បានកត់ត្រា {h} នៃ {cap} ម៉ោង។",
    finish: "បញ្ចប់៖ {s}", turn: "{by} បានបញ្ចប់ {prev}។ វេនរបស់អ្នក៖ <b>{title}</b> · {s}\nកំណត់ {due}",
    pickInApp: "បើកកម្មវិធីដើម្បីជ្រើសអ្នកធ្វើដំណាក់កាលបន្ទាប់។", finishedStage: "បានបញ្ចប់ {s} · បានកត់ត្រា {h} ម៉ោង", finishedRec: "បានបញ្ចប់ {s}",
    nudge: "ថ្ងៃនេះអ្នកបានកត់ត្រា {h} ម៉ោង ក្នុង {n} ដំណាក់កាល។", nudgeNone: "ថ្ងៃនេះអ្នកមិនទាន់កត់ត្រាម៉ោងទេ។ មានអ្វីខ្វះទេ?", nudgeOk: "អរគុណ! មានអ្វីខ្វះទេ? អ្នកនៅតែអាចកត់ត្រាក្នុងកម្មវិធី។",
    hoursNeeded: "សូមបញ្ចូលម៉ោងដែលអ្នកបានចំណាយ។", nextNeeded: "សូមជ្រើសអ្នកធ្វើដំណាក់កាលបន្ទាប់។", notYours: "មានតែអ្នកនៅដំណាក់កាលនេះ ឬអ្នកគ្រប់គ្រងទេ ដែលអាចបញ្ចប់វាបាន។",
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
    const logs = app.findRecordsByFilter("work_logs", "user = {:u} && day >= {:a} && day <= {:b} && hours > 0", "day,at", 2000, 0, { u: userId, a: week, b: end })
    const open = app.findRecordsByFilter("tasks", "assignee = {:u} && status != 'done'", "", 1000, 0, { u: userId })
    const today = this.ict().date
    const est = (l) => { try { const k = app.findRecordById("tasks", l.getString("task_id")); const p = jsonOf(k, "est_plan") || {}; return parseFloat(p[l.getString("stage")]) || 0 } catch (e) { return 0 } }
    return {
      items: logs.map((l) => ({ title: l.getString("title") + (l.getString("stage") ? " · " + this.stageName(app, l.getString("stage"), "en") : ""), client: l.getString("client"), est: est(l), spent: l.getFloat("hours"), doneAt: l.getString("day") })),
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
    if (!nx) return null
    const cur = this.flow(app, task.getString("type")).find((s) => s.id === task.getString("stage"))
    const name = cur ? ((lang === "km" && cur.getString("name_km")) || cur.getString("name")) : ((lang === "km" && nx.getString("name_km")) || nx.getString("name"))
    return [{ text: fill(this.t(lang, cur ? "finish" : "next"), { s: name }), callback_data: "n:" + task.id }]
  },

  // ---------- Stage work: finishing a stage logs the work and hands the task to the next person ----------
  // How hours are asked when a stage is finished: "required", "optional" or "none" (record who did it)
  hoursMode(app, stage, flow) {
    const v = stage.getString("hours")
    if (v) return v
    if (stage.getBool("done")) return "none"
    return flow.length && flow[0].id === stage.id ? "none" : "required"
  },
  planOf(task) { return jsonOf(task, "plan") || {} },
  // actor: the user clicking Finish. opts: { hours, note, to }
  finishStage(app, actor, task, opts) {
    opts = opts || {}
    const lang = this.lang(actor)
    const flow = this.flow(app, task.getString("type"))
    const cur = flow.find((s) => s.id === task.getString("stage"))
    if (!cur || cur.getBool("done") || task.getString("status") === "done") throw new BadRequestError(this.t(lang, "lastStep"))
    const i = flow.findIndex((s) => s.id === cur.id), nx = flow[i + 1]
    if (!nx) throw new BadRequestError(this.t(lang, "lastStep"))
    const worker = task.getString("assignee"), role = actor.getString("role")
    let allowed = worker === actor.id || role === "admin" || role === "manager" || role === "assistant"
    if (!allowed && role === "supervisor") { try { allowed = app.findRecordById("users", worker).getStringSlice("supervisors").indexOf(actor.id) >= 0 } catch (e) {} }
    if (!allowed) throw new ForbiddenError(this.t(lang, "notYours"))
    const mode = this.hoursMode(app, cur, flow)
    let hours = Math.round((parseFloat(opts.hours) || 0) * 100) / 100
    if (mode === "none") hours = 0
    if (hours < 0 || hours > 24) throw new BadRequestError(this.t(lang, "hoursNeeded"))
    if (mode === "required" && !(hours > 0)) throw new BadRequestError(this.t(lang, "hoursNeeded"))
    const plan = this.planOf(task)
    let to = ""
    if (!nx.getBool("done")) {
      to = String(opts.to || plan[nx.id] || "")
      if (!to) throw new BadRequestError(this.t(lang, "nextNeeded"))
      try { const u = app.findRecordById("users", to); if (!u.getBool("active")) throw new Error("inactive") } catch (e) { throw new BadRequestError(this.t(lang, "nextNeeded")) }
    }
    const now = this.ict()
    // time in this stage: since the previous finish on this task, or since the task was created
    let since = String(task.getString("created") || "")
    try {
      const prev = app.findRecordsByFilter("work_logs", "task_id = {:t}", "-created", 1, 0, { t: task.id })
      if (prev.length) since = prev[0].getString("created")
    } catch (e) {}
    let waitH = 0
    try { const ms = Date.now() - new Date(since.replace(" ", "T")).getTime(); if (ms > 0) waitH = Math.round(ms / 36000) / 100 } catch (e) {}
    const log = new Record(app.findCollectionByNameOrId("work_logs"))
    log.set("task", task.id); log.set("task_id", task.id); log.set("stage", cur.id)
    log.set("user", worker); log.set("by", actor.id)
    log.set("hours", hours); log.set("note", String(opts.note || "").substring(0, 300))
    log.set("day", now.date); log.set("at", now.stamp); log.set("wait_h", waitH)
    log.set("title", task.getString("title").substring(0, 200)); log.set("client", task.getString("client")); log.set("type", task.getString("type"))
    app.save(log)
    task.set("stage", nx.id)
    task.set("timer", null)
    if (to) { plan[nx.id] = to; task.set("plan", plan); task.set("assignee", to) }
    if (nx.getBool("done")) {
      let total = 0
      app.findRecordsByFilter("work_logs", "task_id = {:t}", "", 500, 0, { t: task.id }).forEach((l) => { total += l.getFloat("hours") })
      task.set("spent", Math.round(total * 100) / 100)
      task.set("done_at", now.date)
    }
    app.save(task)
    return { log: log.id, stage: nx.id, stageName: (lang === "km" && nx.getString("name_km")) || nx.getString("name"), done: nx.getBool("done"), to: to, hours: hours, from: cur.id,
      fromName: (lang === "km" && cur.getString("name_km")) || cur.getString("name") }
  },

  // Hours and finished stages per person for a date range (the leaderboard and KPI tiles); no titles, so it is safe for everyone
  boardStats(app, from, to) {
    const out = {}
    app.findRecordsByFilter("work_logs", "day >= {:a} && day <= {:b} && user != ''", "day", 20000, 0, { a: from, b: to }).forEach((l) => {
      const u = l.getString("user"); (out[u] = out[u] || []).push({ d: l.getString("day"), h: l.getFloat("hours"), w: l.getFloat("wait_h") })
    })
    return out
  },

  // A log for an older client that marked a task done with hours but no stage log (extension, older app)
  legacyLog(app, task, stageId) {
    const n = app.findRecordsByFilter("work_logs", "task_id = {:t}", "", 1, 0, { t: task.id }).length
    if (n || !(task.getFloat("spent") > 0)) return
    const log = new Record(app.findCollectionByNameOrId("work_logs"))
    log.set("task", task.id); log.set("task_id", task.id); log.set("stage", stageId || task.getString("stage"))
    log.set("user", task.getString("assignee")); log.set("by", task.getString("assignee"))
    log.set("hours", task.getFloat("spent")); log.set("day", task.getString("done_at") || this.ict().date); log.set("at", this.ict().stamp)
    log.set("title", task.getString("title").substring(0, 200)); log.set("client", task.getString("client")); log.set("type", task.getString("type"))
    app.save(log)
  },

  // Daily nudge at 17:30, Monday to Saturday
  nudge(app) {
    const today = this.ict().date
    this.activeUsers(app).forEach((u) => {
      try {
        if (!u.getString("tg_chat") || u.getString("role") === "admin") return
        const logs = app.findRecordsByFilter("work_logs", "user = {:u} && day = {:d}", "", 200, 0, { u: u.id, d: today })
        const lang = this.lang(u), h = logs.reduce((a, l) => a + l.getFloat("hours"), 0)
        const text = logs.length ? fill(this.t(lang, "nudge"), { h: round2(h), n: logs.length }) + "\n" + this.t(lang, "nudgeOk") : this.t(lang, "nudgeNone")
        const rows = []
        const open = this.openButton(app, lang); if (open) rows.push(open)
        this.send(u, text, rows)
      } catch (e) { console.log("nudge failed for " + u.id + ": " + e) }
    })
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
    } else if (kind === "turn") {
      const k = task(); if (!k) return
      text = fill(this.t(lang, "turn"), { by: by, prev: esc(this.stageName(app, data.prev, lang)), title: esc(k.getString("title")), s: esc(this.stageName(app, k.getString("stage"), lang)), due: this.shortDate(k.getString("due")) })
      const nb = this.nextButton(app, k, lang); if (nb) rows.push(nb)
    } else if (kind === "delreq" || kind === "delok" || kind === "delno") {
      const k = task()
      const title = k ? k.getString("title") : (data.title || "")
      const reason = kind === "delreq" && data.reason ? fill(this.t(lang, "reasonL"), { r: esc(data.reason) }) : ""
      text = fill(this.t(lang, kind), { by: by, title: esc(title), reason: reason })
      if (kind === "delreq" && k && k.getString("del_by")) rows.push([{ text: this.t(lang, "btnDel"), callback_data: "dx:" + k.id }, { text: this.t(lang, "btnKeep"), callback_data: "dk:" + k.id }])
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
    const done = app.findRecordsByFilter("work_logs", "user = {:u} && day >= {:a} && day <= {:b} && hours > 0", "", 2000, 0, { u: user.id, a: ws, b: we })
    const h = done.reduce((a, k) => a + k.getFloat("hours"), 0)
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
        if (role === "manager" || role === "admin" || role === "supervisor" || role === "assistant") {
          // managers: all late staff work; supervisors: their own team's late work
          const late = role === "supervisor"
            ? app.findRecordsByFilter("tasks", "status != 'done' && due < {:d} && assignee.active = true && assignee.supervisors.id ?= {:me}", "due", 30, 0, { d: today, me: u.id })
            : app.findRecordsByFilter("tasks", "status != 'done' && due < {:d} && assignee.role != 'admin' && assignee.role != 'manager' && assignee.active = true", "due", 30, 0, { d: today })
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

  // Finished tasks that nobody has changed for 6 months are removed (with their comments and attachments).
  // Weekly reports keep their own copy of the numbers, so past reports are not affected.
  cleanupDone(app) {
    const cutoff = new Date(Date.now() - 182 * 86400000).toISOString().replace("T", " ")
    let total = 0
    for (let round = 0; round < 20; round++) {
      const old = app.findRecordsByFilter("tasks", "status = 'done' && updated < {:c}", "updated", 200, 0, { c: cutoff })
      if (!old.length) break
      old.forEach((k) => { try { app.delete(k); total++ } catch (e) { console.log("cleanup: could not delete task " + k.id + ": " + e) } })
      if (old.length < 200) break
    }
    if (total) console.log("cleanup: deleted " + total + " finished tasks unchanged since " + cutoff)
    return total
  },

  // ---------- Delete requests ----------
  // Who may delete a task: its creator, admins and managers, and a supervisor of the person doing it
  canDelete(app, user, task) {
    const role = user.getString("role")
    if (role === "admin" || role === "manager" || role === "assistant" || task.getString("creator") === user.id) return true
    if (role !== "supervisor") return false
    try { return app.findRecordById("users", task.getString("assignee")).getStringSlice("supervisors").indexOf(user.id) >= 0 } catch (e) { return false }
  },
  // Who is asked: managers (admins if there are none) and the supervisors of the person doing the task
  delApprovers(app, task, askerId) {
    let ids = app.findRecordsByFilter("users", "active = true && role = 'manager'", "", 100, 0).map((u) => u.id)
    if (!ids.length) ids = app.findRecordsByFilter("users", "active = true && role = 'admin'", "", 100, 0).map((u) => u.id)
    try { app.findRecordById("users", task.getString("assignee")).getStringSlice("supervisors").forEach((id) => ids.push(id)) } catch (e) {}
    return ids.filter((id, i) => id && id !== askerId && ids.indexOf(id) === i)
  },
  // Checks and notices for a task update that sets or clears a delete request (runs inside the request hook)
  delRequestCheck(app, r, auth) {
    const o = r.original(), nb = r.getString("del_by"), ob = o.getString("del_by")
    if (nb === ob) return null
    const me = auth && auth.collection().name === "users" ? auth : null
    if (nb) {
      if (me && nb !== me.id) throw new ForbiddenError("You can only ask to delete a task in your own name.")
      r.set("del_at", this.ict().stamp)
      return () => this.delApprovers(app, r, nb).forEach((id) => this.notify(app, id, "delreq", { by: nb, task: r.id, title: r.getString("title"), reason: r.getString("del_reason").substring(0, 300) }))
    }
    if (me && ob !== me.id && !this.canDelete(app, me, o)) throw new ForbiddenError("Only a manager can decline this delete request.")
    r.set("del_reason", ""); r.set("del_at", "")
    if (me && ob !== me.id) return () => this.notify(app, ob, "delno", { by: me.id, task: r.id, title: r.getString("title") })
    return null
  },

  // ---------- Labour cost ----------
  // Hourly cost = monthly salary / paid hours a month (weekly hours x 52 / 12),
  // using the salary in force on the day the task was finished.
  hourlyRate(app, userId, day) {
    let monthly = 0, cap = 44
    try { cap = app.findRecordById("users", userId).getFloat("cap") || 44 } catch (e) {}
    try {
      const s = app.findRecordsByFilter("salaries", "user = {:u} && from <= {:d}", "-from,-created", 1, 0, { u: userId, d: day })
      if (s.length) monthly = s[0].getFloat("monthly")
    } catch (e) {}
    const rate = monthly > 0 ? monthly / (cap * 52 / 12) : 0
    return { monthly: monthly, rate: Math.round(rate * 10000) / 10000 }
  },
  // One task_costs row per work log: the log's hours at the worker's hourly cost on that day
  syncLogCost(app, log) {
    let row = null
    try { row = app.findFirstRecordByFilter("task_costs", "log = {:l}", { l: log.id }) } catch (e) {}
    const user = log.getString("user"), day = log.getString("day"), hours = log.getFloat("hours")
    if (!user) { if (row) app.delete(row); return }
    const r = this.hourlyRate(app, user, day)
    if (!row) { row = new Record(app.findCollectionByNameOrId("task_costs")); row.set("log", log.id) }
    row.set("task", log.getString("task_id")); row.set("stage", log.getString("stage")); row.set("user", user)
    row.set("client", log.getString("client")); row.set("type", log.getString("type")); row.set("title", log.getString("title"))
    row.set("day", day); row.set("hours", hours); row.set("rate", r.rate); row.set("monthly", r.monthly)
    row.set("cost", Math.round(hours * r.rate * 100) / 100)
    app.save(row)
  },
  removeLogCost(app, logId) {
    try { app.delete(app.findFirstRecordByFilter("task_costs", "log = {:l}", { l: logId })) } catch (e) {}
  },
  // A task deleted by a person: its work logs go too (each log takes its cost row with it)
  removeTaskWork(app, taskId) {
    app.findRecordsByFilter("work_logs", "task_id = {:t}", "", 1000, 0, { t: taskId }).forEach((l) => { try { app.delete(l) } catch (e) {} })
    app.findRecordsByFilter("task_costs", "task = {:t}", "", 1000, 0, { t: taskId }).forEach((c) => { try { app.delete(c) } catch (e) {} })
  },
  // Total hours on a finished task follow its logs
  syncTaskSpent(app, taskId) {
    try {
      const k = app.findRecordById("tasks", taskId)
      if (k.getString("status") !== "done") return
      let total = 0
      app.findRecordsByFilter("work_logs", "task_id = {:t}", "", 500, 0, { t: taskId }).forEach((l) => { total += l.getFloat("hours") })
      k.set("spent", Math.round(total * 100) / 100)
      app.saveNoValidate(k)
    } catch (e) {}
  },

  // ---------- Link previews (Open Graph), Pinterest-style cards ----------
  // Refuse addresses on the local network, so a link can't make the server read internal pages
  safeURL(url) {
    let m = String(url || "").match(/^(https?):\/\/([^\/?#:]+)(:\d+)?([\/?#].*)?$/i)
    if (!m) return false
    const host = m[2].toLowerCase()
    if (host === "localhost" || host.indexOf(".") < 0 || /\.(local|lan|internal|home|arpa)$/.test(host)) return false
    if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      const o = host.split(".").map(Number)
      if (o[0] === 10 || o[0] === 127 || o[0] === 0 || (o[0] === 169 && o[1] === 254) || (o[0] === 172 && o[1] >= 16 && o[1] <= 31) || (o[0] === 192 && o[1] === 168) || (o[0] === 100 && o[1] >= 64 && o[1] <= 127)) return false
    }
    if (host.indexOf("[") >= 0 || host.indexOf(":") >= 0) return false
    return true
  },
  absURL(base, u) {
    if (!u) return ""
    u = String(u).trim().replace(/&amp;/g, "&")
    if (/^https?:\/\//i.test(u)) return u
    if (u.indexOf("//") === 0) return "https:" + u
    const m = String(base).match(/^(https?:\/\/[^\/]+)(\/[^?#]*)?/i)
    if (!m) return ""
    if (u.charAt(0) === "/") return m[1] + u
    const dir = (m[2] || "/").replace(/[^\/]*$/, "")
    return m[1] + dir + u
  },
  linkPreview(url) {
    const out = { title: "", image: "", site: "" }
    if (!this.safeURL(url)) return out
    try { out.site = String(url).match(/^https?:\/\/([^\/?#:]+)/i)[1].replace(/^www\./, "") } catch (e) {}
    // YouTube: the thumbnail address is known without fetching the page
    const yt = String(url).match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
    if (yt) out.image = "https://img.youtube.com/vi/" + yt[1] + "/hqdefault.jpg"
    let html = ""
    try {
      const res = $http.send({ url: url, method: "GET", timeout: 8, headers: {
        "user-agent": "Mozilla/5.0 (compatible; PreahchanTasksLinkPreview/1.0; +https://d.preahchan.com)",
        "accept": "text/html,application/xhtml+xml", "accept-language": "en,km;q=0.8" } })
      if (res.statusCode >= 200 && res.statusCode < 400) {
        try { html = toString(res.body) } catch (e) { html = res.raw || "" }
      }
    } catch (e) { console.log("link preview fetch failed for " + url + ": " + e) }
    if (html) {
      html = html.substring(0, 400000)
      const meta = (keys) => {
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i].replace(/[:]/g, "\\:")
          let m = html.match(new RegExp('<meta[^>]+(?:property|name)=["\']' + k + '["\'][^>]*content=["\']([^"\']+)["\']', "i"))
          if (!m) m = html.match(new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]*(?:property|name)=["\']' + k + '["\']', "i"))
          if (m && m[1]) return m[1]
        }
        return ""
      }
      const decode = (t) => String(t || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim()
      out.title = decode(meta(["og:title", "twitter:title"]) || ((html.match(/<title[^>]*>([^<]{1,300})<\/title>/i) || [])[1] || "")).substring(0, 300)
      if (!out.image) out.image = this.absURL(url, meta(["og:image:secure_url", "og:image", "og:image:url", "twitter:image", "twitter:image:src"]))
      const site = decode(meta(["og:site_name"]))
      if (site) out.site = site.substring(0, 120)
    }
    if (out.image && !this.safeURL(out.image)) out.image = ""
    return out
  },
  // Save the preview on a link attachment: title, site and a copy of the image
  storePreview(app, att) {
    if (att.getString("kind") !== "link" || !att.getString("url")) return
    const p = this.linkPreview(att.getString("url"))
    if (p.title) att.set("preview_title", p.title)
    if (p.site) att.set("preview_site", p.site)
    if (p.image) {
      att.set("preview_url", p.image)
      try { att.set("preview_image", $filesystem.fileFromURL(p.image, 10)) } catch (e) { console.log("preview image download failed: " + e) }
    }
    try { app.save(att) } catch (e) {
      // the image may be too big or not really an image: keep the title and the remote address
      console.log("saving preview failed, retrying without the image copy: " + e)
      try { att.set("preview_image", null); app.save(att) } catch (e2) { console.log("saving preview failed: " + e2) }
    }
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
    const tryFinish = (k, hours) => {
      try {
        const r = this.finishStage(app, user, k, { hours: hours })
        const done = r.hours > 0 ? fill(this.t(lang, "finishedStage"), { s: r.fromName, h: round2(r.hours) }) : fill(this.t(lang, "finishedRec"), { s: r.fromName })
        answer(done)
        if (chat && mid) this.tg("editMessageText", { chat_id: chat, message_id: mid, parse_mode: "HTML", text: esc(k.getString("title")) + "\n" + esc(done) + (r.done ? "" : "\n" + fill(this.t(lang, "movedTo"), { s: esc(r.stageName) })) })
      } catch (err) { answer(String((err && err.message) || err).substring(0, 190)) }
    }
    if (parts[0] === "n" || parts[0] === "d") {
      const k = ownTask(parts[1]); if (!k) { answer(this.t(lang, "notAllowed")); return }
      const flow = this.flow(app, k.getString("type")), cur = flow.find((s) => s.id === k.getString("stage")), nx = this.nextOf(app, k)
      if (!cur || !nx || k.getString("status") === "done") { answer(this.t(lang, "lastStep")); return }
      if (!nx.getBool("done") && !this.planOf(k)[nx.id]) {
        answer(this.t(lang, "pickInApp"))
        const open = this.openButton(app, lang)
        this.tg("sendMessage", { chat_id: chat, parse_mode: "HTML", text: esc(k.getString("title")) + "\n" + this.t(lang, "pickInApp"), reply_markup: { inline_keyboard: open ? [open] : [] } })
        return
      }
      const mode = this.hoursMode(app, cur, flow)
      if (mode === "none") { tryFinish(k, 0); return }
      // ask for the hours first
      let est = 0
      try { est = round2(parseFloat((jsonOf(k, "est_plan") || {})[cur.id]) || 0) } catch (e) {}
      const opts = [0.5, 1, 2, 3, 4]
      if (est > 0 && opts.indexOf(est) < 0) opts.push(est)
      opts.sort((a, b) => a - b)
      const btns = opts.map((h) => ({ text: h + " h", callback_data: "h:" + k.id + ":" + h }))
      const kb = [btns.slice(0, 3), btns.slice(3)]
      if (mode === "optional") kb.push([{ text: "0 h", callback_data: "h:" + k.id + ":0" }])
      answer("")
      this.tg("sendMessage", { chat_id: chat, parse_mode: "HTML", text: fill(this.t(lang, "hoursQ"), { title: esc(k.getString("title") + " · " + ((lang === "km" && cur.getString("name_km")) || cur.getString("name"))) }), reply_markup: { inline_keyboard: kb.filter((r) => r.length) } })
      return
    }
    if (parts[0] === "h") {
      const k = ownTask(parts[1]); const h = parseFloat(parts[2])
      if (!k || !(h >= 0)) { answer(this.t(lang, "notAllowed")); return }
      tryFinish(k, h)
      return
    }
    if (parts[0] === "dx" || parts[0] === "dk") {
      let k = null
      try { k = app.findRecordById("tasks", parts[1]) } catch (e) {}
      const clear = () => { if (chat && mid) this.tg("editMessageReplyMarkup", { chat_id: chat, message_id: mid, reply_markup: { inline_keyboard: [] } }) }
      if (!k || !k.getString("del_by")) { answer(this.t(lang, "delGone")); clear(); return }
      if (!this.canDelete(app, user, k)) { answer(this.t(lang, "notAllowed")); return }
      const asker = k.getString("del_by"), title = k.getString("title")
      if (parts[0] === "dx") {
        this.removeTaskWork(app, k.id)
        app.delete(k)
        if (asker !== user.id) this.notify(app, asker, "delok", { by: user.id, title: title })
        answer(this.t(lang, "taskDeleted"))
      } else {
        k.set("del_by", ""); k.set("del_reason", ""); k.set("del_at", "")
        app.save(k)
        if (asker !== user.id) this.notify(app, asker, "delno", { by: user.id, task: k.id, title: title })
        answer(this.t(lang, "taskKept"))
      }
      clear()
      return
    }
    if (parts[0] === "ra") {
      let r = null
      try { r = app.findRecordById("reports", parts[1]) } catch (e) {}
      const role = user.getString("role")
      let ownerRole = ""
      try { ownerRole = app.findRecordById("users", r.getString("user")).getString("role") } catch (e) {}
      const allowed = r && r.getString("user") !== user.id && (role === "admin" || (role === "manager" && ["staff", "supervisor", "assistant"].indexOf(ownerRole) >= 0))
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
