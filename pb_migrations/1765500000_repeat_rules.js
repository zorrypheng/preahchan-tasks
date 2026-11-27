/// <reference path="../pb_data/types.d.ts" />
// How a repeating task repeats: "weekly", "monthly" or "N:days|weeks|months" (empty = weekly, as before).
migrate((app) => {
  try {
    const c = app.findCollectionByNameOrId("tasks")
    if (!c.fields.getByName("repeat_rule")) { c.fields.add(new TextField({ name: "repeat_rule", max: 40 })); app.save(c) }
  } catch (err) { console.log("repeat rule migration failed: " + err) }
}, (app) => {})
