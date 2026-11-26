/// <reference path="../pb_data/types.d.ts" />
// Supervisor role: a supervisor sees and assigns tasks for the staff whose "supervisors" list includes them.
// Adds the role value and the field if missing, then sets the access rules. Errors are logged.
migrate((app) => {
  try {
    const users = app.findCollectionByNameOrId("users")
    const role = users.fields.getByName("role")
    if (role && role.values.indexOf("supervisor") < 0) role.values = role.values.concat(["supervisor"])
    if (!users.fields.getByName("supervisors")) users.fields.add(new RelationField({ name: "supervisors", collectionId: users.id, maxSelect: 20, cascadeDelete: false }))
    app.save(users)
  } catch (err) { console.log("supervisor field migration failed: " + err) }
  const rules = {
  "tasks": {
    "listRule": "assignee = @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "assignee = @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)",
    "createRule": "@request.auth.id != \"\" && @request.body.creator = @request.auth.id && (@request.body.assignee = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && @request.body.assignee.supervisors.id ?= @request.auth.id))",
    "updateRule": "(assignee = @request.auth.id || creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)) && @request.body.creator:isset = false",
    "deleteRule": "creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && assignee.supervisors.id ?= @request.auth.id)"
  },
  "comments": {
    "listRule": "task.assignee = @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "task.assignee = @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "createRule": "@request.body.author = @request.auth.id && (@request.body.task.assignee = @request.auth.id || @request.body.task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && @request.body.task.assignee.supervisors.id ?= @request.auth.id))"
  },
  "attachments": {
    "listRule": "task.assignee = @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "viewRule": "task.assignee = @request.auth.id || task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && task.assignee.supervisors.id ?= @request.auth.id)",
    "createRule": "@request.body.owner = @request.auth.id && (@request.body.task.assignee = @request.auth.id || @request.body.task.creator = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\") || (@request.auth.role = \"supervisor\" && @request.body.task.assignee.supervisors.id ?= @request.auth.id))",
    "deleteRule": "owner = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")"
  },
  "documents": {
    "createRule": "@request.body.owner = @request.auth.id && (@request.body.area != \"company\" || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")) && (@request.body.area != \"client\" || @request.body.client != \"\")",
    "updateRule": "owner = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")",
    "deleteRule": "owner = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")"
  },
  "templates": {
    "updateRule": "owner = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")",
    "deleteRule": "owner = @request.auth.id || (@request.auth.role = \"admin\" || @request.auth.role = \"manager\")"
  },
  "reports": {
    "listRule": "user = @request.auth.id || @request.auth.role = \"admin\" || (@request.auth.role = \"manager\" && (user.role = \"staff\" || user.role = \"supervisor\"))",
    "viewRule": "user = @request.auth.id || @request.auth.role = \"admin\" || (@request.auth.role = \"manager\" && (user.role = \"staff\" || user.role = \"supervisor\"))",
    "updateRule": "user != @request.auth.id && (@request.auth.role = \"admin\" || (@request.auth.role = \"manager\" && (user.role = \"staff\" || user.role = \"supervisor\"))) && @request.body.user:isset = false && @request.body.snap:isset = false && @request.body.week:isset = false"
  },
  "users": {
    "updateRule": "@request.auth.role = \"admin\" || (id = @request.auth.id && @request.body.role:isset = false && @request.body.kpi:isset = false && @request.body.cap:isset = false && @request.body.active:isset = false && @request.body.username:isset = false && @request.body.positions:isset = false && @request.body.supervisors:isset = false)"
  }
}
  Object.keys(rules).forEach((name) => {
    try {
      const c = app.findCollectionByNameOrId(name)
      Object.keys(rules[name]).forEach((k) => { c[k] = rules[name][k] })
      app.save(c)
    } catch (err) { console.log("supervisor rules for " + name + " failed: " + err) }
  })
}, (app) => {})
