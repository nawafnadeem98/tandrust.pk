#!/usr/bin/env bash
# Routine production redeploy for tandrustpak.com
# Usage on server: sudo bash deploy/redeploy.sh [--pull]
#   --pull   git pull --ff-only before install/build
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SERVICE="tandrustpak"
PORT="${PORT:-3004}"
NODE_BIN="${NODE_BIN:-/root/.nvm/versions/node/v24.15.0/bin/node}"
NODE_DIR="$(dirname "$NODE_BIN")"
NPM_BIN="$NODE_DIR/npm"
export PATH="$NODE_DIR:$PATH"

PULL=0
for arg in "$@"; do
  case "$arg" in
    --pull) PULL=1 ;;
    -h|--help)
      echo "Usage: sudo bash deploy/redeploy.sh [--pull]"
      echo "  --pull   git pull --ff-only before building"
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg"
      echo "Usage: sudo bash deploy/redeploy.sh [--pull]"
      exit 1
      ;;
  esac
done

if [[ ! -x "$NODE_BIN" ]]; then
  echo "Node not found at $NODE_BIN — set NODE_BIN=/path/to/node"
  exit 1
fi

if [[ ! -f "$ROOT/.env" ]]; then
  echo "Missing $ROOT/.env — copy from .env.production.example and fill secrets first."
  exit 1
fi

echo "==> Redeploy from $ROOT"

if [[ "$PULL" -eq 1 ]]; then
  if [[ ! -d "$ROOT/.git" ]]; then
    echo "ERROR: $ROOT is not a git repo — cannot --pull"
    exit 1
  fi
  echo "==> git fetch + reset to origin/main..."
  # Clean untracked files first so checkout cannot be blocked by leftover
  # rsync copies. Keep secrets and caches (gitignored / excluded).
  git -C "$ROOT" fetch --prune origin main
  git -C "$ROOT" clean -fd \
    --exclude=.env \
    --exclude=.env.local \
    --exclude=.env.production \
    --exclude=node_modules \
    --exclude=.next
  git -C "$ROOT" reset --hard origin/main
  git -C "$ROOT" checkout -B main origin/main
  git -C "$ROOT" branch --set-upstream-to=origin/main main >/dev/null 2>&1 || true
  echo "    now at $(git -C "$ROOT" rev-parse --short HEAD)"
fi

cd "$ROOT"

echo "==> Install dependencies..."
"$NPM_BIN" ci 2>/dev/null || "$NPM_BIN" install

echo "==> Prisma generate + db push..."
"$NPM_BIN" exec prisma generate
"$NPM_BIN" exec prisma db push

echo "==> Build..."
"$NPM_BIN" run build

echo "==> Restart $SERVICE..."
systemctl restart "$SERVICE"

wait_for_http() {
  local url="$1"
  local label="$2"
  local max="${3:-30}"
  for ((i = 1; i <= max; i++)); do
    if curl -sf --max-time 5 "$url" >/dev/null 2>&1; then
      echo "$label: ready (${i}s)"
      return 0
    fi
    sleep 1
  done
  echo "ERROR: $label not responding at $url after ${max}s"
  journalctl -u "$SERVICE" -n 30 --no-pager 2>/dev/null || true
  return 1
}

echo "==> Waiting for app..."
wait_for_http "http://127.0.0.1:${PORT}/" "$SERVICE"

echo ""
echo "Redeploy complete."
echo "  https://tandrustpak.com"
systemctl is-active "$SERVICE"
curl -sf --max-time 5 -o /dev/null -w "  local HTTP %{http_code}\n" "http://127.0.0.1:${PORT}/"
