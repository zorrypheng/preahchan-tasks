# Preahchan Tasks

Internal task, weekly KPI and hours app for the Preahchan team, running on PocketBase 0.26.

## What is in this folder

| Folder | Goes to on the server | What it does |
|---|---|---|
| `pb_public/` | PocketBase `pb_public` | The web app staff open in the browser |
| `pb_hooks/` | PocketBase `pb_hooks` | Server code: notifications, report numbers, weekly repeating tasks, note reminders, Telegram bot, 8:00 morning summary |
| `pb_migrations/` | PocketBase `pb_migrations` | Creates the tables on a fresh PocketBase. Does nothing if they already exist |
| `schema/` | not deployed | The table design, for reference |
| `src/`, `tools/`, `vendor/` | not deployed | Source of the web app. `python3 tools/build.py` rebuilds `pb_public/index.html` |

## Install or update on ZimaOS

1. In ZimaOS **Files**, open the folder that holds PocketBase's `pb_data` (for example `/DATA/AppData/pocketbase/`).
2. Copy the contents of `pb_public`, `pb_hooks` and `pb_migrations` into the folders of the same name there. Keep any files already in `pb_migrations`.
3. Restart the PocketBase app.
4. Check `https://<your-address>/api/pc/status`. It should show `"app":"preahchan-tasks"`.

Your data lives in `pb_data` and is never touched by an update.

## Telegram bot

Add the environment variable `TELEGRAM_BOT_TOKEN` (from @BotFather) to the PocketBase app and restart.
The Application URL in PocketBase settings must be the public `https://` address; the bot registers itself on start.

## Times

Scheduled jobs use Cambodia time (UTC+7) whatever the server's timezone: the morning summary runs at 08:00 Monday to Saturday, note reminders every minute.
