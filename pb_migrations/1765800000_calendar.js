/// <reference path="../pb_data/types.d.ts" />
// Calendar: posting date/time and platforms on tasks, and a public holidays table (admins edit it in Settings).
// 2026 holidays are filled in; lunar ones should be checked against the official sub-decree. Errors are logged.
migrate((app) => {
  try {
    const c = app.findCollectionByNameOrId("tasks")
    if (!c.fields.getByName("post_at")) c.fields.add(new TextField({ name: "post_at", max: 16 }))
    if (!c.fields.getByName("platforms")) c.fields.add(new SelectField({ name: "platforms", values: ["facebook", "instagram", "tiktok", "telegram"], maxSelect: 4 }))
    app.save(c)
  } catch (err) { console.log("calendar task fields failed: " + err) }
  let fresh = false
  try { app.findCollectionByNameOrId("holidays") } catch (e) {
    try { app.importCollections([{"id": "pc_holidays0001", "name": "holidays", "type": "base", "listRule": "@request.auth.id != \"\"", "viewRule": "@request.auth.id != \"\"", "createRule": "@request.auth.role = \"admin\"", "updateRule": "@request.auth.role = \"admin\"", "deleteRule": "@request.auth.role = \"admin\"", "fields": [{"name": "date", "type": "text", "required": true, "max": 10, "pattern": "^\\d{4}-\\d{2}-\\d{2}$"}, {"name": "name", "type": "text", "required": true, "max": 120}, {"name": "name_km", "type": "text", "max": 120}, {"name": "created", "type": "autodate", "onCreate": true, "onUpdate": false}, {"name": "updated", "type": "autodate", "onCreate": true, "onUpdate": true}], "indexes": ["CREATE INDEX idx_holidays_date ON holidays (date)"]}], false); fresh = true } catch (err) { console.log("holidays migration failed: " + err) }
  }
  if (!fresh) return
  try {
    const col = app.findCollectionByNameOrId("holidays")
    [["2026-01-01", "International New Year's Day", "ទិវាចូលឆ្នាំសកល"], ["2026-01-07", "Victory over Genocide Day", "ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍"], ["2026-03-08", "International Women's Day", "ទិវានារីអន្តរជាតិ"], ["2026-04-14", "Khmer New Year", "ពិធីបុណ្យចូលឆ្នាំខ្មែរ"], ["2026-04-15", "Khmer New Year", "ពិធីបុណ្យចូលឆ្នាំខ្មែរ"], ["2026-04-16", "Khmer New Year", "ពិធីបុណ្យចូលឆ្នាំខ្មែរ"], ["2026-05-01", "International Labour Day · Visak Bochea", "ទិវាពលកម្មអន្តរជាតិ · ពិធីបុណ្យវិសាខបូជា"], ["2026-05-05", "Royal Ploughing Ceremony (check date)", "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល"], ["2026-05-14", "King Norodom Sihamoni's Birthday", "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម"], ["2026-06-18", "Queen Mother's Birthday", "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចម៉ែ"], ["2026-09-24", "Constitution Day", "ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ"], ["2026-10-10", "Pchum Ben", "ពិធីបុណ្យភ្ជុំបិណ្ឌ"], ["2026-10-11", "Pchum Ben", "ពិធីបុណ្យភ្ជុំបិណ្ឌ"], ["2026-10-12", "Pchum Ben", "ពិធីបុណ្យភ្ជុំបិណ្ឌ"], ["2026-10-15", "Commemoration of King Father Norodom Sihanouk", "ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះករុណាព្រះបាទសម្តេចព្រះនរោត្តម សីហនុ"], ["2026-10-29", "King's Coronation Day", "ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិ"], ["2026-11-09", "Independence Day", "ពិធីបុណ្យឯករាជ្យជាតិ"], ["2026-11-23", "Water Festival", "ព្រះរាជពិធីបុណ្យអុំទូក"], ["2026-11-24", "Water Festival", "ព្រះរាជពិធីបុណ្យអុំទូក"], ["2026-11-25", "Water Festival", "ព្រះរាជពិធីបុណ្យអុំទូក"]].forEach((h) => { const r = new Record(col); r.set("date", h[0]); r.set("name", h[1]); r.set("name_km", h[2]); app.save(r) })
  } catch (err) { console.log("holiday list failed: " + err) }
}, (app) => {})
