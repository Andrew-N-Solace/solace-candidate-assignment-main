// src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

/**
 * Keep one Postgres pool & one Drizzle client alive across
 * Next.js dev hot-reloads to avoid “too many clients” (53300).
 *
 * In prod every process still gets its own pool,
 * but dev re-executes modules on file change, so we cache on `globalThis`.
 */
//  Augment the NodeJS global object for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var _pgClient: ReturnType<typeof postgres> | undefined;
  // eslint-disable-next-line no-var
  var _db: ReturnType<typeof drizzle> | undefined;
}

function init() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL env var is not set");
    return {
      select: () => ({ from: () => [] }),
    } as unknown as ReturnType<typeof drizzle>;
  }

  if (!global._db) {
    global._pgClient = postgres(process.env.DATABASE_URL, {
      max: 10, // limit pooled connections
      idle_timeout: 60, // seconds before idle client is closed
    });
    global._db = drizzle(global._pgClient);
  }

  return global._db;
}

const db = init();

/* prefer named export, keep default for legacy imports */
export { db };
export default db;
