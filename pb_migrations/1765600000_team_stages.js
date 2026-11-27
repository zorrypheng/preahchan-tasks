/// <reference path="../pb_data/types.d.ts" />
// Team stages: a status can take several people at once (statuses.team); the extra people on the task's
// current stage are tasks.helpers, and they can see and work on the task like its assignee.
migrate((app) => {
  try { const c = app.findCollectionByNameOrId("statuses"); if (!c.fields.getByName("team")) { c.fields.add(new BoolField({ name: "team" })); app.save(c) } } catch (err) { console.log("team stage migration failed: " + err) }
  try { const c = app.findCollectionByNameOrId("tasks"); if (!c.fields.getByName("helpers")) { c.fields.add(new RelationField({ name: "helpers", collectionId: "_pb_users_auth_", maxSelect: 30, cascadeDelete: false })); app.save(c) } } catch (err) { console.log("task helpers migration failed: " + err) }
  const rules = {
  "tasks": {
    "listRule": "assignee = @request.auth.id || helpers.id ?= @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "assignee = @request.auth.id || helpers.id ?= @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)",
    "updateRule": "(assignee = @request.auth.id || helpers.id ?= @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)) && @request.body.creator:isset = false"
  },
  "comments": {
    "listRule": "task.assignee = @request.auth.id || task.helpers.id ?= @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "task.assignee = @request.auth.id || task.helpers.id ?= @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "createRule": "@request.body.author = @request.auth.id && (@request.body.task.assignee = @request.auth.id || @request.body.task.helpers.id ?= @request.auth.id || @request.body.task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && @request.body.task.assignee.supervisors.id ?= @request.auth.id))"
  },
  "attachments": {
    "listRule": "task.assignee = @request.auth.id || task.helpers.id ?= @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "task.assignee = @request.auth.id || task.helpers.id ?= @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "createRule": "@request.body.owner = @request.auth.id && (@request.body.task.assignee = @request.auth.id || @request.body.task.helpers.id ?= @request.auth.id || @request.body.task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && @request.body.task.assignee.supervisors.id ?= @request.auth.id))"
  },
  "work_logs": {
    "listRule": "user = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && user.supervisors.id ?= @request.auth.id) || task.assignee = @request.auth.id || task.helpers.id ?= @request.auth.id || task.creator = @request.auth.id",
    "viewRule": "user = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") || (@request.auth.role = \"supervisor\" && user.supervisors.id ?= @request.auth.id) || task.assignee = @request.auth.id || task.helpers.id ?= @request.auth.id || task.creator = @request.auth.id"
  }
}
  Object.keys(rules).forEach((name) => {
    try { const c = app.findCollectionByNameOrId(name); Object.keys(rules[name]).forEach((k) => { c[k] = rules[name][k] }); app.save(c) }
    catch (err) { console.log("team stage rules for " + name + " failed: " + err) }
  })
}, (app) => {})
