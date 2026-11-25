#!/bin/sh
# Update Preahchan Tasks from GitHub and restart PocketBase.
# Usage on the ZimaOS terminal:  sh /DATA/AppData/pocketbase/app/update.sh [container-name]
# git runs inside a small Docker image, so nothing needs installing on ZimaOS.
set -e
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
CONTAINER="${1:-pocketbase}"
echo "Pulling the latest version into $APP_DIR ..."
docker run --rm -v "$APP_DIR:/git" alpine/git pull --ff-only
echo "Restarting $CONTAINER ..."
docker restart "$CONTAINER"
echo "Done. Check https://d.preahchan.com/api/pc/status"
