# Preahchan Tasks: notes for working on this repository

Internal task, weekly KPI, hours, files, notes and weekly-report app for the Preahchan team.
Runs on PocketBase 0.26.6 (`argonptg/pocketbase:0.26.6`) on the owner's ZimaOS NAS, public at https://d.preahchan.com.

## Layout
- `src/prototype.html`: the approved screens (UI, styles, Khmer and English text). Edit screens here.
- `src/live.js`: the PocketBase data layer added on top of the screens (loading, saving, realtime, login, uploads, PDF).
- `src/workflow.js`, `rich.js`, `costs.js`, `pwa.js`, `taskedit.js`, `stages.js`, `board.js`, `profile.js`, `clients.js`, `audit.js` (+ `workflow.css`): later features, inserted by the build in that order. `stages.js` holds the stage plan, Finish, work logs, timesheet and the Assistant manager role.
- Hours and KPI come from `work_logs` (one row per finished stage), not from `tasks.spent`. Finishing goes through `POST /api/pc/finish` (`pc.finishStage`).
- `tools/build.py`: builds `pb_public/index.html` from the two files above. Always run `python3 tools/build.py` after editing `src/` and commit the built file.
- `pb_hooks/main.pb.js` + `pb_hooks/lib/pc.js`: server code (notifications, report numbers, repeating tasks, Telegram bot, 08:00 summary, note reminders). Each hook must `require()` the lib inside the handler.
- `pb_migrations/`: database changes. Never edit a migration that has shipped; add a new file with a higher timestamp for every schema change.
- `schema/`: reference copy of the tables and rules.

## Releasing
1. Change, rebuild, test, commit, push to `main`.
2. The owner runs on the NAS: `sudo sh /DATA/AppData/pocketbase/app/update.sh pocketbase` (git pull + container restart).
3. Data lives in `/DATA/AppData/pocketbase/pb_data` and is never touched by updates.

## Rules
- Times for jobs are Cambodia time (UTC+7), computed in `pc.ict()`, never from the server clock.
- Never put tokens or passwords in the repository. The Telegram token is the container env var `TELEGRAM_BOT_TOKEN`.
