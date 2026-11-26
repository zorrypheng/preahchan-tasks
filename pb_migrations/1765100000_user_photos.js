/// <reference path="../pb_data/types.d.ts" />
// Profile photos on users. Adds the field if missing; errors are logged.
migrate((app) => {
  try {
    const c = app.findCollectionByNameOrId("users")
    if (!c.fields.getByName("avatar")) {
      c.fields.add(new FileField({ name: "avatar", maxSelect: 1, maxSize: 5242880, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["100x100", "256x256"], protected: false }))
      app.save(c)
    }
  } catch (err) { console.log("user photo migration failed: " + err) }
}, (app) => {})
