import { build } from 'esbuild';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: resolve(__dirname, '../.env.local') });
}

// Get the base URL from environment variable or use default
const baseUrl = process.env.FEATHERSTATS_CLIENT_BASE_URL || 'https://featherstats.com';
console.log(`Building tracker with base URL: ${baseUrl}`);

build({
  entryPoints: ['public/js/featherstats.ts'],
  bundle: true,
  minify: true,
  outfile: 'public/js/featherstats.min.js',
  format: 'iife',
  platform: 'browser',
  define: {
    FEATHERSTATS_BASE_URL: `"${baseUrl}"`,
  },
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
