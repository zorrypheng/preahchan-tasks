/// <reference path="../pb_data/types.d.ts" />
// Projects module: a project lead and milestones on projects, a milestone on tasks, and assistant managers
// may create and edit projects. Adds what is missing; errors are logged.
migrate((app) => {
  try {
    const p = app.findCollectionByNameOrId("projects")
    if (!p.fields.getByName("lead")) p.fields.add(new RelationField({ name: "lead", collectionId: "_pb_users_auth_", maxSelect: 1, cascadeDelete: false }))
    if (!p.fields.getByName("milestones")) p.fields.add(new JSONField({ name: "milestones", maxSize: 50000 }))
    const rules = {"createRule": "(@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\") && @request.body.created_by = @request.auth.id", "updateRule": "(@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\")", "deleteRule": "(@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"assistant\")"}
    Object.keys(rules).forEach((k) => { p[k] = rules[k] })
    app.save(p)
  } catch (err) { console.log("projects migration failed: " + err) }
  try {
    const t = app.findCollectionByNameOrId("tasks")
    if (!t.fields.getByName("milestone")) { t.fields.add(new TextField({ name: "milestone", max: 30 })); app.save(t) }
  } catch (err) { console.log("task milestone migration failed: " + err) }
}, (app) => {})
