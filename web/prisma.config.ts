import "dotenv/config";
import { defineConfig } from "prisma/config";

// Plain `process.env` access with a fallback, not the strict `env()` helper:
// `env()` throws if the variable is unresolved, which breaks `prisma generate`
// on platforms like Vercel where no `.env` file is shipped (it's gitignored)
// and the variable isn't set as a project variable yet. `generate` only
// needs a syntactically valid datasource, not a working connection, so a
// placeholder keeps the build from failing before the real value is set.
//
// The CLI (migrate, introspect, generate) uses `DIRECT_URL` when present —
// on Supabase that's the same pooler in "session" mode (port 5432),
// required for migrations since the "transaction" mode `DATABASE_URL` runs
// through doesn't support the session-level locking Prisma Migrate needs.
// The app itself never reads this file; `lib/db.ts` builds its own runtime
// connection from `DATABASE_URL` (transaction mode) independently.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url:
      process.env.DIRECT_URL ??
      process.env.DATABASE_URL ??
      "postgresql://user:password@localhost:5432/db",
  },
});
