import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Singleton pattern: Next.js dev hot-reload re-evaluates modules on every
// edit, which would otherwise spin up a new PrismaClient (and a new
// connection pool) on each request during development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // Runtime queries use the pooled connection string (Supabase: the PgBouncer
  // port, 6543) — this is independent of prisma.config.ts, which uses the
  // direct connection for migrations. Falls back to a placeholder so a build
  // without `DATABASE_URL` set yet still compiles; any real query would fail
  // at connect time, not at build time.
  const adapter = new PrismaPg(
    process.env.DATABASE_URL ?? "postgresql://user:password@localhost:5432/db"
  );
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
