/// <reference path="../pb_data/types.d.ts" />
// Preahchan Tasks: server rules that the browser can't be trusted with,
// in-app notifications, the Telegram bot, and scheduled jobs.

// ---------- Activity log (all collections; pc.audit keeps only the ones listed in pc.AUDITED) ----------
// Request hooks remember who is acting; model hooks write the log, so changes made by the server
// (finishing a stage, cascades, clean-ups) are logged too.
onRecordCreateRequest((e) => { const pc = require(`${__hooks}/lib/pc.js`); pc.setActor(e.auth && e.auth.collection().name === "users" ? e.auth.id : ""); try { e.next() } finally { pc.setActor("") } })
onRecordUpdateRequest((e) => { const pc = require(`${__hooks}/lib/pc.js`); pc.setActor(e.auth && e.auth.collection().name === "users" ? e.auth.id : ""); try { e.next() } finally { pc.setActor("") } })
onRecordDeleteRequest((e) => { const pc = require(`${__hooks}/lib/pc.js`); pc.setActor(e.auth && e.auth.collection().name === "users" ? e.auth.id : ""); try { e.next() } finally { pc.setActor("") } })
onRecordCreate((e) => {
  e.next()
  try { require(`${__hooks}/lib/pc.js`).audit(e.app, "create", e.record, null) } catch (err) { console.log("audit create: " + err) }
})
onRecordUpdate((e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  let before = null
  try { if (pc.AUDITED.indexOf(e.record.collection().name) >= 0) before = pc.snap(e.record.original()) } catch (err) {}
  e.next()
  if (before) { try { pc.audit(e.app, "update", e.record, before) } catch (err) { console.log("audit update: " + err) } }
})
onRecordDelete((e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  let before = null
  try { if (pc.AUDITED.indexOf(e.record.collection().name) >= 0) before = pc.snap(e.record) } catch (err) {}
  e.next()
  if (before) { try { pc.audit(e.app, "delete", e.record, before) } catch (err) { console.log("audit delete: " + err) } }
})
// Restore a deleted item or undo a change (admins and managers, within 30 days)
routerAdd("POST", "/api/pc/audit/restore", (e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const role = e.auth.getString("role")
  if (role !== "admin" && role !== "manager") throw new ForbiddenError("Only admins and managers can restore.")
  const body = e.requestInfo().body || {}
  let entry
  try { entry = e.app.findRecordById("audit_log", String(body.id || "")) } catch (err) { throw new NotFoundError("Log entry not found.") }
  try { return e.json(200, pc.restore(e.app, entry, e.auth.id)) } finally { pc.setActor("") }
}, $apis.requireAuth("users"))
// Keep the log for 30 days
cronAdd("pc_audit_cleanup", "0 * * * *", () => {
  const pc = require(`${__hooks}/lib/pc.js`)
  if (pc.ict().hour === 4) pc.auditCleanup($app)
})

// ---------- Startup: connect the Telegram webhook ----------
onBootstrap((e) => {
  e.next()
  try { require(`${__hooks}/lib/pc.js`).setupWebhook(e.app) } catch (err) { console.log("Telegram setup failed: " + err) }
})

// ---------- Tasks ----------
// Workflow: block moves a position isn't allowed to make (requests from the app, extension or API)
onRecordUpdateRequest((e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  pc.checkMove(e.app, e.record, e.auth)
  // asking to delete a task, or answering such a request
  const after = pc.delRequestCheck(e.app, e.record, e.auth)
  e.next()
  if (after) { try { after() } catch (err) { console.log("delete request notice: " + err) } }
}, "tasks")
// Keep the simple done/not-done status in step with the workflow status, on every save
onRecordCreate((e) => {
  try { require(`${__hooks}/lib/pc.js`).syncStage(e.app, e.record, true) } catch (err) { console.log("stage sync (create): " + err) }
  e.next()
}, "tasks")
onRecordUpdate((e) => {
  try { require(`${__hooks}/lib/pc.js`).syncStage(e.app, e.record, false) } catch (err) { console.log("stage sync (update): " + err) }
  e.next()
}, "tasks")

onRecordAfterCreateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const r = e.record, a = r.getString("assignee"), c = r.getString("creator")
    if (a && a !== c) pc.notify(e.app, a, "assigned", { by: c, task: r.id })
    if (r.getString("status") === "done") pc.legacyLog(e.app, r, r.getString("stage"))
  } catch (err) { console.log("task create hook: " + err) }
}, "tasks")

onRecordAfterUpdateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const r = e.record, o = r.original()
    // an older app or the extension marked the task done with hours but no stage log: keep the hours as one log
    if (r.getString("status") === "done" && o.getString("status") !== "done") {
      try { pc.legacyLog(e.app, r, o.getString("stage")) } catch (err) { console.log("legacy log: " + err) }
    }
    // the task moved to the next stage and its person: "your turn"; otherwise a plain reassignment
    if (r.getString("assignee") !== o.getString("assignee")) {
      if (r.getString("stage") !== o.getString("stage") && o.getString("assignee")) {
        pc.notify(e.app, r.getString("assignee"), "turn", { by: o.getString("assignee"), task: r.id, prev: o.getString("stage") })
      } else if (r.getString("assignee") !== r.getString("creator")) {
        pc.notify(e.app, r.getString("assignee"), "assigned", { by: r.getString("creator"), task: r.id })
      }
    }
    // a weekly task was finished: create next week's copy
    if (r.getBool("repeat") && r.getString("status") === "done" && o.getString("status") !== "done") {
      const next = new Record(r.collection())
      next.set("title", r.getString("title"))
      next.set("desc", r.getString("desc"))
      next.set("assignee", r.getString("assignee"))
      next.set("creator", r.getString("creator"))
      next.set("client", r.getString("client"))
      next.set("priority", r.getString("priority"))
      next.set("status", "todo")
      next.set("est", r.getFloat("est"))
      next.set("repeat", true)
      next.set("type", r.getString("type"))
      next.set("plan", r.get("plan"))
      next.set("est_plan", r.get("est_plan"))
      // the copy starts again with the person planned for the first stage
      try { const f = pc.flow(e.app, r.getString("type")); const p0 = f.length ? pc.planOf(r)[f[0].id] : ""; if (p0) next.set("assignee", p0) } catch (err) {}
      next.set("due", pc.addDays(r.getString("due") || pc.ict().date, 7))
      e.app.save(next)
      // the task no longer repeats itself; its copy carries the repeat on
      r.set("repeat", false)
      e.app.saveNoValidate(r)
    }
  } catch (err) { console.log("task update hook: " + err) }
}, "tasks")

// A task deleted by a person (not the 6-month clean-up) takes its cost record with it
onRecordDeleteRequest((e) => {
  const id = e.record.id, asker = e.record.getString("del_by"), title = e.record.getString("title")
  e.next()
  const pc = require(`${__hooks}/lib/pc.js`)
  try { pc.removeTaskWork(e.app, id) } catch (err) { console.log("task work delete: " + err) }
  // the person who asked for the deletion hears that it was done
  try {
    if (asker && e.auth && e.auth.collection().name === "users" && e.auth.id !== asker) pc.notify(e.app, asker, "delok", { by: e.auth.id, title: title })
  } catch (err) { console.log("delete request notice: " + err) }
}, "tasks")

// ---------- Work logs (one per finished stage) ----------
onRecordAfterCreateSuccess((e) => {
  e.next()
  try { require(`${__hooks}/lib/pc.js`).syncLogCost(e.app, e.record) } catch (err) { console.log("log cost: " + err) }
}, "work_logs")
onRecordAfterUpdateSuccess((e) => {
  e.next()
  const pc = require(`${__hooks}/lib/pc.js`)
  try { pc.syncLogCost(e.app, e.record) } catch (err) { console.log("log cost: " + err) }
  pc.syncTaskSpent(e.app, e.record.getString("task_id"))
}, "work_logs")
onRecordAfterDeleteSuccess((e) => {
  e.next()
  const pc = require(`${__hooks}/lib/pc.js`)
  try { pc.removeLogCost(e.app, e.record.id) } catch (err) { console.log("log cost delete: " + err) }
  pc.syncTaskSpent(e.app, e.record.getString("task_id"))
}, "work_logs")
// Staff can correct their own log on the same day; managers any time
onRecordUpdateRequest((e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const role = e.auth && e.auth.collection().name === "users" ? e.auth.getString("role") : "admin"
  if (role !== "admin" && role !== "manager" && e.record.original().getString("day") !== pc.ict().date) throw new ForbiddenError("You can only change a log on the day it was made. Ask a manager.")
  const h = e.record.getFloat("hours")
  if (h < 0 || h > 24) throw new BadRequestError("Hours must be between 0 and 24.")
  e.next()
}, "work_logs")

// Finish the current stage: log the work and pass the task to the next person
routerAdd("POST", "/api/pc/finish", (e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const body = e.requestInfo().body || {}
  const actor = e.app.findRecordById("users", e.auth.id)
  let task
  try { task = e.app.findRecordById("tasks", String(body.task || "")) } catch (err) { throw new NotFoundError("Task not found.") }
  pc.setActor(actor.id)
  try { return e.json(200, pc.finishStage(e.app, actor, task, { hours: body.hours, note: body.note, to: body.to })) } finally { pc.setActor("") }
}, $apis.requireAuth("users"))

// Leaderboard and KPI numbers: finished stages and hours per person
routerAdd("GET", "/api/pc/board", (e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const q = e.request.url.query(), ok = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d)
  const from = String(q.get("from") || ""), to = String(q.get("to") || "")
  if (!ok(from) || !ok(to)) throw new BadRequestError("from and to must be dates (YYYY-MM-DD).")
  return e.json(200, pc.boardStats(e.app, from, to))
}, $apis.requireAuth("users"))

// ---------- Comments ----------
onRecordAfterCreateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const c = e.record, author = c.getString("author")
    const k = e.app.findRecordById("tasks", c.getString("task"))
    const to = [k.getString("assignee"), k.getString("creator")].filter((v, i, a) => v && v !== author && a.indexOf(v) === i)
    to.forEach((u) => pc.notify(e.app, u, "comment", { by: author, task: k.id, text: c.getString("text").substring(0, 300) }))
  } catch (err) { console.log("comment hook: " + err) }
}, "comments")

// ---------- Company files: tell everyone ----------
onRecordAfterCreateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const d = e.record
    if (d.getString("area") !== "company") return
    const owner = d.getString("owner")
    pc.activeUsers(e.app).forEach((u) => { if (u.id !== owner) pc.notify(e.app, u.id, "file", { by: owner, name: d.getString("name") }) })
  } catch (err) { console.log("document hook: " + err) }
}, "documents")

// ---------- Notes: tell people when a note is newly shared with them ----------
onRecordAfterCreateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const share = e.record.getString("share"), owner = e.record.getString("owner")
    let ids = []
    if (share === "team") ids = pc.activeUsers(e.app).map((u) => u.id).filter((id) => id !== owner)
    else if (share === "people") ids = e.record.getStringSlice("people").filter((id) => id !== owner)
    ids.forEach((id) => pc.notify(e.app, id, "note", { by: owner, note: e.record.id }))
  } catch (err) { console.log("note create hook: " + err) }
}, "notes")
onRecordAfterUpdateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const list = (rec) => {
      const share = rec.getString("share"), owner = rec.getString("owner")
      if (share === "team") return pc.activeUsers(e.app).map((u) => u.id).filter((id) => id !== owner)
      if (share === "people") return rec.getStringSlice("people").filter((id) => id !== owner)
      return []
    }
    const before = list(e.record.original())
    list(e.record).filter((id) => before.indexOf(id) < 0).forEach((id) => pc.notify(e.app, id, "note", { by: e.record.getString("owner"), note: e.record.id }))
  } catch (err) { console.log("note update hook: " + err) }
}, "notes")

// ---------- Weekly reports ----------
// The numbers are always computed here, never trusted from the browser
onRecordCreateRequest((e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const r = e.record
  r.set("status", "pending")
  r.set("decided_by", "")
  r.set("decided_at", "")
  r.set("comment", "")
  try { r.set("snap", pc.buildSnap(e.app, r.getString("user"), r.getString("week"))) } catch (err) { console.log("report snapshot: " + err) }
  e.next()
}, "reports")

onRecordAfterCreateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const r = e.record, uid = r.getString("user")
    const owner = e.app.findRecordById("users", uid)
    const approverRole = ["staff", "supervisor", "assistant"].indexOf(owner.getString("role")) >= 0 ? "manager" : "admin"
    e.app.findRecordsByFilter("users", "active = true && role = {:r} && id != {:u}", "", 100, 0, { r: approverRole, u: uid })
      .forEach((m) => pc.notify(e.app, m.id, "rep", { by: uid, rep: r.id }))
  } catch (err) { console.log("report create hook: " + err) }
}, "reports")

// Approving or sending back: record who did it and when, on the server
onRecordUpdateRequest((e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const r = e.record, o = r.original()
  if (r.getString("status") !== o.getString("status")) {
    // only app accounts can be recorded as the approver (not the PocketBase superuser)
    if (e.auth && e.auth.collection().name === "users") r.set("decided_by", e.auth.id)
    r.set("decided_at", pc.ict().stamp)
    if (r.getString("status") === "returned" && !r.getString("comment").trim()) throw new BadRequestError("A comment is required to send a report back.")
  }
  e.next()
}, "reports")

onRecordAfterUpdateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const r = e.record, o = r.original(), st = r.getString("status")
    if (st === o.getString("status")) return
    if (st === "approved") pc.notify(e.app, r.getString("user"), "repok", { by: r.getString("decided_by"), rep: r.id })
    if (st === "returned") pc.notify(e.app, r.getString("user"), "repback", { by: r.getString("decided_by"), rep: r.id })
  } catch (err) { console.log("report update hook: " + err) }
}, "reports")

// ---------- Link previews ----------
// A new link attachment gets its preview image and title
onRecordAfterCreateSuccess((e) => {
  e.next()
  try { require(`${__hooks}/lib/pc.js`).storePreview(e.app, e.record) } catch (err) { console.log("link preview: " + err) }
}, "attachments")
// Preview a link before it is saved (used by the Add task form)
routerAdd("GET", "/api/pc/preview", (e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const url = String(e.request.url.query().get("url") || "")
  if (!pc.safeURL(url)) return e.json(200, { title: "", image: "", site: "" })
  return e.json(200, pc.linkPreview(url))
}, $apis.requireAuth("users"))

// ---------- Every new notification also goes to Telegram ----------
onRecordAfterCreateSuccess((e) => {
  e.next()
  try { require(`${__hooks}/lib/pc.js`).forward(e.app, e.record) } catch (err) { console.log("telegram forward: " + err) }
}, "notifications")

// ---------- Telegram linking and webhook ----------
routerAdd("POST", "/api/pc/tg/link", (e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  if (!pc.token()) throw new BadRequestError("The Telegram bot is not set up on the server yet. Ask your admin to add TELEGRAM_BOT_TOKEN.")
  const me = pc.tg("getMe", {})
  const bot = me && me.result && me.result.username
  if (!bot) throw new BadRequestError("The Telegram bot token is not working. Ask your admin to check it.")
  const code = $security.randomStringWithAlphabet(8, "ABCDEFGHJKLMNPQRSTUVWXYZ23456789")
  const u = e.app.findRecordById("users", e.auth.id)
  u.set("tg_code", code)
  e.app.save(u)
  return e.json(200, { bot: bot, code: code, url: "https://t.me/" + bot + "?start=" + code })
}, $apis.requireAuth("users"))

routerAdd("POST", "/api/pc/tg/unlink", (e) => {
  const u = e.app.findRecordById("users", e.auth.id)
  u.set("tg_chat", "")
  u.set("tg_on", false)
  u.set("tg_code", "")
  e.app.save(u)
  return e.json(200, { ok: true })
}, $apis.requireAuth("users"))

routerAdd("POST", "/api/pc/tg/hook/{secret}", (e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const secret = pc.hookSecret()
  if (!secret || e.request.pathValue("secret") !== secret) return e.json(403, { ok: false })
  try { pc.handleUpdate(e.app, e.requestInfo().body) } catch (err) { console.log("telegram update failed: " + err) } finally { pc.setActor("") }
  return e.json(200, { ok: true })
})

// Quick health check for setup: GET /api/pc/status
routerAdd("GET", "/api/pc/status", (e) => {
  const pc = require(`${__hooks}/lib/pc.js`)
  return e.json(200, { app: "preahchan-tasks", version: "1.0.0", telegram: !!pc.token(), time: pc.ict().stamp })
})

// ---------- Scheduled jobs (times are Cambodia time, checked inside) ----------
cronAdd("pc_morning", "0 * * * *", () => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const now = pc.ict()
  if (now.hour === 8 && now.dow !== 0) pc.morning($app)
  if (now.hour === 8) { try { pc.meetingReminders($app) } catch (err) { console.log("meeting reminders: " + err) } }
})

// Every night at 03:00 Cambodia time: remove finished tasks unchanged for 6 months
cronAdd("pc_cleanup", "0 * * * *", () => {
  const pc = require(`${__hooks}/lib/pc.js`)
  if (pc.ict().hour === 3) pc.cleanupDone($app)
})

// 17:30 Cambodia time, Monday to Saturday: "how many hours did you log today?"
cronAdd("pc_nudge", "30 * * * *", () => {
  const pc = require(`${__hooks}/lib/pc.js`)
  const now = pc.ict()
  if (now.hour === 17 && now.dow !== 0) pc.nudge($app)
})

cronAdd("pc_note_reminders", "* * * * *", () => {
  require(`${__hooks}/lib/pc.js`).noteReminders($app)
})
