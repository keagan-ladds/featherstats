import { defineConfig, Config } from 'drizzle-kit';
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured')

export default defineConfig({
  out: './drizzle',
  schema: [
    '../../packages/database/src/schema/app.ts',
    '../../packages/database/src/schema/auth.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config;