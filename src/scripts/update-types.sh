#!/usr/bin/env bash
set -euo pipefail

PROJECT_REF="wbqylhxcetnowucuhaqf"

# load .env from project root
if [ -f "$(dirname "$0")/../../.env" ]; then
  export $(grep SUPABASE_ACCESS_TOKEN "$(dirname "$0")/../../.env" | xargs)
fi

ACCESS_TOKEN="${SUPABASE_ACCESS_TOKEN:?Token not set}"

curl -s \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  "https://api.supabase.com/v1/projects/$PROJECT_REF/types/typescript?included_schemas=public" \
  | node -pe 'JSON.parse(fs.readFileSync(0, "utf8")).types' \
  > src/types/database.types.ts

echo "✅ Types updated in src/types/database.types.ts"