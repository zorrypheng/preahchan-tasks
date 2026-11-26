/// <reference path="../pb_data/types.d.ts" />
// Delete requests on tasks: who asked, why and when. Adds the fields if missing; errors are logged.
migrate((app) => {
  try {
    const c = app.findCollectionByNameOrId("tasks")
    if (!c.fields.getByName("del_by")) c.fields.add(new RelationField({ name: "del_by", collectionId: "_pb_users_auth_", maxSelect: 1, cascadeDelete: false }))
    if (!c.fields.getByName("del_reason")) c.fields.add(new TextField({ name: "del_reason", max: 300 }))
    if (!c.fields.getByName("del_at")) c.fields.add(new TextField({ name: "del_at", max: 30 }))
    app.save(c)
  } catch (err) { console.log("delete request migration failed: " + err) }
}, (app) => {})
