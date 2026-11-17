import { Pool } from "pg";

declare global {
  var _pgPool: Pool | undefined;
}

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
  });
}

export const pool = globalThis._pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalThis._pgPool = pool;
}
