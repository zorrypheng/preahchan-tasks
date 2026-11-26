/// <reference path="../pb_data/types.d.ts" />
// Preahchan Tasks: server rules that the browser can't be trusted with,
// in-app notifications, the Telegram bot, and scheduled jobs.

// ---------- Startup: connect the Telegram webhook ----------
onBootstrap((e) => {
  e.next()
  try { require(`${__hooks}/lib/pc.js`).setupWebhook(e.app) } catch (err) { console.log("Telegram setup failed: " + err) }
})

// ---------- Tasks ----------
// Workflow: block moves a position isn't allowed to make (requests from the app, extension or API)
onRecordUpdateRequest((e) => {
  require(`${__hooks}/lib/pc.js`).checkMove(e.app, e.record, e.auth)
  e.next()
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
  } catch (err) { console.log("task create hook: " + err) }
}, "tasks")

onRecordAfterUpdateSuccess((e) => {
  e.next()
  try {
    const pc = require(`${__hooks}/lib/pc.js`)
    const r = e.record, o = r.original()
    // reassigned: tell the new person
    if (r.getString("assignee") !== o.getString("assignee") && r.getString("assignee") !== r.getString("creator")) {
      pc.notify(e.app, r.getString("assignee"), "assigned", { by: r.getString("creator"), task: r.id })
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
      next.set("due", pc.addDays(r.getString("due") || pc.ict().date, 7))
      e.app.save(next)
      // the task no longer repeats itself; its copy carries the repeat on
      r.set("repeat", false)
      e.app.saveNoValidate(r)
    }
  } catch (err) { console.log("task update hook: " + err) }
}, "tasks")

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
    const approverRole = owner.getString("role") === "staff" ? "manager" : "admin"
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
  try { pc.handleUpdate(e.app, e.requestInfo().body) } catch (err) { console.log("telegram update failed: " + err) }
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
})

// Every night at 03:00 Cambodia time: remove finished tasks unchanged for 6 months
cronAdd("pc_cleanup", "0 * * * *", () => {
  const pc = require(`${__hooks}/lib/pc.js`)
  if (pc.ict().hour === 3) pc.cleanupDone($app)
})

cronAdd("pc_note_reminders", "* * * * *", () => {
  require(`${__hooks}/lib/pc.js`).noteReminders($app)
})
