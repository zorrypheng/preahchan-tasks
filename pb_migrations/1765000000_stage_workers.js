/// <reference path="../pb_data/types.d.ts" />
// Which positions work on each stage (the people offered in the stage plan). Adds the field if missing; errors are logged.
migrate((app) => {
  try {
    const c = app.findCollectionByNameOrId("statuses")
    if (!c.fields.getByName("workers")) { c.fields.add(new RelationField({ name: "workers", collectionId: "pc_positions001", maxSelect: 50, cascadeDelete: false })); app.save(c) }
  } catch (err) { console.log("stage workers migration failed: " + err) }
}, (app) => {})
