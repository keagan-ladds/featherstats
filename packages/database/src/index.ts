import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as auth from './schema/auth';
import * as app from './schema/app';

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL has not been specified.")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: pool, schema: { ...auth, ...app } });