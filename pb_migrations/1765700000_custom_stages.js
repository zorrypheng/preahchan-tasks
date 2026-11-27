/// <reference path="../pb_data/types.d.ts" />
// Custom stages: a task can carry its own list of status ids (tasks.flow) instead of its type's.
migrate((app) => {
  try { const c = app.findCollectionByNameOrId("tasks"); if (!c.fields.getByName("flow")) { c.fields.add(new JSONField({ name: "flow", maxSize: 5000 })); app.save(c) } } catch (err) { console.log("custom stages migration failed: " + err) }
}, (app) => {})
