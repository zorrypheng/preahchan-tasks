/// <reference path="../pb_data/types.d.ts" />
// Stage work: a person planned for every stage, a work log for every finished stage, saved crews,
// the Assistant manager role, and per-log labour cost. Then the hours already logged on finished
// tasks become one work log each. Safe to run again; errors are logged.
migrate((app) => {
  const addFields = (name, fields) => {
    try {
      const c = app.findCollectionByNameOrId(name)
      fields.forEach((f) => {
        if (c.fields.getByName(f.name)) return
        if (f.type === "json") c.fields.add(new JSONField({ name: f.name, maxSize: f.maxSize || 20000 }))
        else if (f.type === "text") c.fields.add(new TextField({ name: f.name, max: f.max || 0 }))
        else if (f.type === "select") c.fields.add(new SelectField({ name: f.name, values: f.values, maxSelect: 1 }))
        else if (f.type === "relation") c.fields.add(new RelationField({ name: f.name, collectionId: f.collectionId, maxSelect: 1, cascadeDelete: false }))
      })
      app.save(c)
    } catch (err) { console.log("stage work fields on " + name + " failed: " + err) }
  }
  try {
    const users = app.findCollectionByNameOrId("users"), role = users.fields.getByName("role")
    if (role && role.values.indexOf("assistant") < 0) { role.values = role.values.concat(["assistant"]); app.save(users) }
  } catch (err) { console.log("assistant role failed: " + err) }
  addFields("statuses", [{"name": "hours", "type": "select", "values": ["required", "optional", "none"], "maxSelect": 1}, {"name": "pos", "type": "relation", "collectionId": "pc_positions001", "maxSelect": 1, "cascadeDelete": false}])
  addFields("tasks", [{"name": "plan", "type": "json", "maxSize": 20000}, {"name": "est_plan", "type": "json", "maxSize": 20000}, {"name": "timer", "type": "json", "maxSize": 2000}])
  addFields("task_costs", [{"name": "log", "type": "text", "max": 30}, {"name": "stage", "type": "text", "max": 30}])
  try { const c = app.findCollectionByNameOrId("task_costs"); c.indexes = ["CREATE INDEX idx_task_costs_task ON task_costs (task)", "CREATE UNIQUE INDEX idx_task_costs_log ON task_costs (log) WHERE log != ''", "CREATE INDEX idx_task_costs_day ON task_costs (day)"]; app.save(c) } catch (err) { console.log("task_costs indexes failed: " + err) }
  ;[{"id": "pc_worklogs0001", "name": "work_logs", "type": "base", "listRule": "user = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && user.supervisors.id ?= @request.auth.id) || task.assignee = @request.auth.id || task.creator = @request.auth.id", "viewRule": "user = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && user.supervisors.id ?= @request.auth.id) || task.assignee = @request.auth.id || task.creator = @request.auth.id", "createRule": null, "updateRule": "(user = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")) && @request.body.user:isset = false && @request.body.task:isset = false && @request.body.task_id:isset = false && @request.body.stage:isset = false && @request.body.day:isset = false && @request.body.at:isset = false", "deleteRule": "(@request.auth.role = \"admin\" || @request.auth.role = \"manager\")", "fields": [{"name": "task", "type": "relation", "collectionId": "pc_tasks0000001", "maxSelect": 1, "cascadeDelete": false, "required": false}, {"name": "task_id", "type": "text", "max": 30}, {"name": "stage", "type": "text", "max": 30}, {"name": "user", "type": "relation", "collectionId": "_pb_users_auth_", "maxSelect": 1, "cascadeDelete": false, "required": false}, {"name": "by", "type": "text", "max": 30}, {"name": "hours", "type": "number", "min": 0, "max": 24}, {"name": "note", "type": "text", "max": 300}, {"name": "day", "type": "text", "max": 10}, {"name": "at", "type": "text", "max": 20}, {"name": "wait_h", "type": "number"}, {"name": "title", "type": "text", "max": 200}, {"name": "client", "type": "text", "max": 30}, {"name": "type", "type": "text", "max": 30}, {"name": "created", "type": "autodate", "onCreate": true, "onUpdate": false}, {"name": "updated", "type": "autodate", "onCreate": true, "onUpdate": true}], "indexes": ["CREATE INDEX idx_work_logs_user_day ON work_logs (user, day)", "CREATE INDEX idx_work_logs_task ON work_logs (task_id)", "CREATE INDEX idx_work_logs_day ON work_logs (day)"]}, {"id": "pc_crews0000001", "name": "crews", "type": "base", "listRule": "@request.auth.id != \"\"", "viewRule": "@request.auth.id != \"\"", "createRule": "@request.body.owner = @request.auth.id && @request.auth.role != \"staff\"", "updateRule": "owner = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")", "deleteRule": "owner = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")", "fields": [{"name": "name", "type": "text", "required": true, "max": 80}, {"name": "type", "type": "text", "max": 30}, {"name": "plan", "type": "json", "maxSize": 20000}, {"name": "owner", "type": "relation", "collectionId": "_pb_users_auth_", "maxSelect": 1, "cascadeDelete": false}, {"name": "created", "type": "autodate", "onCreate": true, "onUpdate": false}, {"name": "updated", "type": "autodate", "onCreate": true, "onUpdate": true}]}].forEach((c) => {
    try { app.findCollectionByNameOrId(c.name); return } catch (e) {}
    try { app.importCollections([c], false) } catch (err) { console.log(c.name + " migration failed: " + err) }
  })
  const rules = {
  "tasks": {
    "listRule": "assignee = @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "assignee = @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)",
    "createRule": "@request.auth.id != \"\" && @request.body.creator = @request.auth.id && (@request.body.assignee = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && @request.body.assignee.supervisors.id ?= @request.auth.id))",
    "updateRule": "(assignee = @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)) && @request.body.creator:isset = false",
    "deleteRule": "creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)"
  },
  "comments": {
    "listRule": "task.assignee = @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "task.assignee = @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "createRule": "@request.body.author = @request.auth.id && (@request.body.task.assignee = @request.auth.id || @request.body.task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && @request.body.task.assignee.supervisors.id ?= @request.auth.id))"
  },
  "attachments": {
    "listRule": "task.assignee = @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "task.assignee = @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "createRule": "@request.body.owner = @request.auth.id && (@request.body.task.assignee = @request.auth.id || @request.body.task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && @request.body.task.assignee.supervisors.id ?= @request.auth.id))",
    "deleteRule": "owner = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\")"
  },
  "reports": {
    "listRule": "user = @request.auth.id || @request.auth.role = \"admin\" || (@request.auth.role = \"manager\" && (user.role = \"staff\" || user.role = \"supervisor\" || user.role = \"assistant\"))",
    "viewRule": "user = @request.auth.id || @request.auth.role = \"admin\" || (@request.auth.role = \"manager\" && (user.role = \"staff\" || user.role = \"supervisor\" || user.role = \"assistant\"))",
    "updateRule": "user != @request.auth.id && (@request.auth.role = \"admin\" || (@request.auth.role = \"manager\" && (user.role = \"staff\" || user.role = \"supervisor\" || user.role = \"assistant\"))) && @request.body.user:isset = false && @request.body.snap:isset = false && @request.body.week:isset = false"
  }
}
  Object.keys(rules).forEach((name) => {
    try { const c = app.findCollectionByNameOrId(name); Object.keys(rules[name]).forEach((k) => { c[k] = rules[name][k] }); app.save(c) }
    catch (err) { console.log("stage work rules for " + name + " failed: " + err) }
  })
  // existing finished tasks: their hours become one work log for the person who finished them
  try {
    const logs = app.findCollectionByNameOrId("work_logs"), costs = app.findCollectionByNameOrId("task_costs")
    const salaryAt = (uid, day) => { try { const s = app.findRecordsByFilter("salaries", "user = {:u} && from <= {:d}", "-from", 1, 0, { u: uid, d: day }); return s.length ? s[0].getFloat("monthly") : 0 } catch (e) { return 0 } }
    const done = app.findRecordsByFilter("tasks", "status = 'done' && spent > 0", "", 20000, 0)
    let n = 0
    done.forEach((k) => {
      if (app.findRecordsByFilter("work_logs", "task_id = {:t}", "", 1, 0, { t: k.id }).length) return
      const day = k.getString("done_at") || String(k.getString("created")).slice(0, 10), uid = k.getString("assignee"), h = k.getFloat("spent")
      const l = new Record(logs)
      l.set("task", k.id); l.set("task_id", k.id); l.set("stage", k.getString("stage")); l.set("user", uid); l.set("by", uid)
      l.set("hours", h); l.set("day", day); l.set("at", day + "T17:00")
      l.set("title", k.getString("title").substring(0, 200)); l.set("client", k.getString("client")); l.set("type", k.getString("type"))
      app.save(l)
      // replace an older per-task cost row with one tied to this log
      app.findRecordsByFilter("task_costs", "task = {:t} && log = ''", "", 100, 0, { t: k.id }).forEach((c) => app.delete(c))
      if (!app.findRecordsByFilter("task_costs", "log = {:l}", "", 1, 0, { l: l.id }).length) {
        let cap = 44
        try { cap = app.findRecordById("users", uid).getFloat("cap") || 44 } catch (e) {}
        const monthly = salaryAt(uid, day), rate = monthly > 0 ? monthly / (cap * 52 / 12) : 0
        const c = new Record(costs)
        c.set("log", l.id); c.set("task", k.id); c.set("stage", k.getString("stage")); c.set("user", uid); c.set("client", k.getString("client")); c.set("type", k.getString("type"))
        c.set("title", k.getString("title").substring(0, 200)); c.set("day", day); c.set("hours", h); c.set("rate", Math.round(rate * 10000) / 10000); c.set("monthly", monthly); c.set("cost", Math.round(h * rate * 100) / 100)
        app.save(c)
      }
      n++
    })
    if (n) console.log("stage work: " + n + " finished tasks now have a work log")
  } catch (err) { console.log("stage work backfill failed: " + err) }
}, (app) => {})
