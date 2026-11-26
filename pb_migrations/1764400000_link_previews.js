/// <reference path="../pb_data/types.d.ts" />
// Link previews on attachments: title, site name, image address and a stored copy of the image.
// Adds only the fields that are missing; errors are logged.
migrate((app) => {
  try {
    const c = app.findCollectionByNameOrId("attachments")
    let changed = false
    if (!c.fields.getByName("preview_title")) { c.fields.add(new TextField({ name: "preview_title", max: 300 })); changed = true }
    if (!c.fields.getByName("preview_site")) { c.fields.add(new TextField({ name: "preview_site", max: 120 })); changed = true }
    if (!c.fields.getByName("preview_url")) { c.fields.add(new URLField({ name: "preview_url" })); changed = true }
    if (!c.fields.getByName("preview_image")) {
      c.fields.add(new FileField({ name: "preview_image", maxSelect: 1, maxSize: 8388608, protected: true, thumbs: ["400x0"],
        mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"] }))
      changed = true
    }
    if (changed) app.save(c)
  } catch (err) { console.log("link preview migration failed: " + err) }
}, (app) => {})
