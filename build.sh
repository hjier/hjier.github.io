#!/bin/bash
# 静态站构建脚本
set -euo pipefail

cd "$(dirname "$0")"

SITE_URL="${SITE_URL:-}"
if [ -z "$SITE_URL" ] && [ -f ".env" ]; then
    source .env
fi

if [ -z "$SITE_URL" ]; then
    echo "ERROR: SITE_URL not set"
    exit 1
fi

echo ">> Fetching data from $SITE_URL"
node fetch-data.js

echo ">> Generating site"
node generate-site.js

echo ">> Done. Files in dist/"
ls -la dist/
